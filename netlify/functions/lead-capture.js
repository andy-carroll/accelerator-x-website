// Netlify Function: submission-created
// Triggered by: Netlify Forms webhook on every form submission
// Handles: lead-capture-form only → Slack #website-leads + Airtable CRM
// NOT responsible for: newsletter signups (handled by newsletter-subscribe.js directly)
// Env vars required: SLACK_WEBHOOK_URL, AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// Airtable configuration via environment variables
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE;

const AIRTABLE_API_URL = AIRTABLE_BASE_ID && AIRTABLE_TABLE
  ? `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`
  : null;

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // CORS headers for direct browser POSTs
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Reject oversized payloads before parsing
  if (event.body && event.body.length > 10_000) {
    return { statusCode: 413, headers, body: JSON.stringify({ error: 'Payload too large' }) };
  }

  let body;
  try {
    // Parse form data - accept both direct JSON and Netlify webhook format
    body = JSON.parse(event.body);
  } catch (parseError) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  try {
    const data = body.payload?.data || body;

    // Honeypot / spam check
    if (data._honeypot) {
      return { statusCode: 200, headers, body: JSON.stringify({ skipped: 'spam' }) };
    }

    // Route by form name — only handle lead-capture-form
    const formName = data['form-name'] || data.form_name || '';
    if (formName !== 'lead-capture-form') {
      return { statusCode: 200, headers, body: JSON.stringify({ skipped: 'different form' }) };
    }

    const safeTrim = (val = '', maxLen = Infinity) => String(val).trim().slice(0, maxLen);

    // Normalize website: prepend https:// if missing
    const normalizeWebsite = (val = '') => {
      const v = safeTrim(val, 320);
      if (!v) return '';
      if (/^https?:\/\//i.test(v)) return v;
      return `https://${v}`;
    };

    // Slack mrkdwn treats &, <, > as markup — escape before interpolating user input
    // (https://api.slack.com/reference/surfaces/formatting#escaping)
    const escapeSlack = (val = '') => String(val).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const name = safeTrim(data.name, 200);
    const email = safeTrim(data.email, 320);
    const company = safeTrim(data.company, 200);
    const website = normalizeWebsite(data.website);
    const role = safeTrim(data.role, 200);
    const timelineRaw = safeTrim(data.timeline);
    const problem = safeTrim(data.problem || '', 500);
    const interestRaw = safeTrim(data.interest || '', 200);
    const source = safeTrim(data.source || '', 200);
    const consentGiven = data.consent_given === true;
    const consentTimestamp = safeTrim(data.consent_timestamp || new Date().toISOString());

    // Required fields guard
    if (!name || !email || !company || !website || !role) {
      return { statusCode: 200, headers, body: JSON.stringify({ skipped: 'missing required fields' }) };
    }

    // Basic domain validation post-normalization (allows bare domains once https:// is added)
    const domainPattern = /^https?:\/\/[\w.-]+\.[A-Za-z]{2,}.*$/;
    if (!domainPattern.test(website)) {
      return { statusCode: 200, headers, body: JSON.stringify({ skipped: 'invalid website' }) };
    }

    // Format timeline for readability
    const timelineLabels = {
      'immediately': 'Immediately',
      'within-1-month': 'Within 1 month',
      '1-3-months': '1-3 months',
      'exploring': 'Just exploring'
    };
    const timeline = timelineLabels[timelineRaw] || timelineRaw || 'Not specified';

    // Mirrors the live offering keys/names in content/data/offerings.json + "just-exploring".
    // Intentionally hardcoded (not require()'d from the JSON) to keep this GNG-1 money path
    // free of a file-load failure mode for what is only a cosmetic Slack/Airtable label.
    // Drift is guarded instead by a CI test (tests/functions/lead-capture.test.js) that fails
    // if these fall out of sync with offerings.json. Fallback behaviour: an unknown KEY shows
    // the raw slug; a key whose NAME changed in the JSON (but not here) would show the stale
    // name until the test catches it — which is why the test, not runtime coupling, is the guard.
    const interestLabels = {
      'company-enablement': 'Company Enablement',
      'leadership-activation': 'Leadership Team AI Activation',
      'senior-leader-acceleration': '1:1 Exec AI Fast Track Coaching',
      'leadership-cohort': 'Open Cohort AI Bootcamp for Business Leaders',
      'just-exploring': 'Just exploring'
    };
    const interest = interestLabels[interestRaw] || interestRaw || 'Not specified';

    // Build Slack Block Kit message
    const slackMessage = {
      text: 'New Accelerator X Application',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🎯 New Accelerator X Application',
            emoji: true
          }
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Name:*\n${escapeSlack(name) || 'N/A'}` },
            { type: 'mrkdwn', text: `*Email:*\n${escapeSlack(email) || 'N/A'}` },
            { type: 'mrkdwn', text: `*Company:*\n${escapeSlack(company) || 'N/A'}` },
            { type: 'mrkdwn', text: `*Website:*\n${escapeSlack(website) || 'N/A'}` },
            { type: 'mrkdwn', text: `*Role:*\n${escapeSlack(role) || 'N/A'}` },
            { type: 'mrkdwn', text: `*Timeline:*\n${escapeSlack(timeline)}` }
          ]
        }
      ]
    };

    if (interestRaw || source) {
      slackMessage.blocks.push({
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Service interest:*\n${escapeSlack(interest)}` },
          { type: 'mrkdwn', text: `*Source:*\n${escapeSlack(source) || 'Website'}` }
        ]
      });
    }

    // Add problem block if present
    if (problem) {
      slackMessage.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Trying to solve:*\n>${escapeSlack(problem).replace(/\n/g, '\n>')}`
        }
      });
    }
    
    // Add timestamp and divider
    const timestamp = new Date().toISOString();
    slackMessage.blocks.push(
      { type: 'divider' },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `🕐 ${timestamp} | Submitted via accelerator-x.ai`
          }
        ]
      }
    );
    
    // Send to Slack first (preserve existing behaviour)
    if (!SLACK_WEBHOOK_URL) {
      console.warn('SLACK_WEBHOOK_URL not set — skipping Slack notification');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Skipped — Slack webhook not configured', airtable: 'skipped' })
      };
    }
    
    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackMessage)
    });
    
    if (!slackResponse.ok) {
      throw new Error(`Slack webhook error: ${slackResponse.status}`);
    }

    // Attempt Airtable insert; do not fail the whole request if Airtable is down
    let airtableStatus = 'skipped';
    if (AIRTABLE_API_URL && AIRTABLE_TOKEN) {
      const airtablePayload = {
        fields: {
          'Primary Contact Name': name,
          Email: email,
          Company: company,
          Website: website,
          'Primary Contact Role': role,
          Timeline: timeline,
          Notes: [
            interestRaw ? `Service interest: ${interest}` : '',
            source ? `Source detail: ${source}` : '',
            problem ? `Trying to solve: ${problem}` : ''
          ].filter(Boolean).join('\n\n'),
          Source: 'Accelerator-X Website',
          'Consent Given': consentGiven,
          'Consent Timestamp': consentTimestamp
        }
      };

      try {
        const airtableResponse = await fetch(AIRTABLE_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AIRTABLE_TOKEN}`
          },
          body: JSON.stringify(airtablePayload)
        });

        if (!airtableResponse.ok) {
          const text = await airtableResponse.text();
          throw new Error(`Airtable error: ${airtableResponse.status} ${text}`);
        }
        airtableStatus = 'created';
      } catch (airtableError) {
        airtableStatus = 'failed';
        console.error('Airtable insert error:', airtableError.message);

        // GNG-1 is the go/no-go consent-capture gate — a silent Airtable failure here
        // means we accepted a lead without a defensible consent record. Alert loudly
        // (distinct message) rather than let the fails-soft 200 mask it.
        try {
          await fetch(SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: `⚠️ CONSENT WRITE FAILED — lead from ${escapeSlack(email) || 'unknown'} saved to Slack only. Airtable insert errored: ${escapeSlack(airtableError.message)}. GNG-1 path degraded — check Airtable manually.`
            })
          });
        } catch (alertError) {
          console.error('GNG-1 failure alert Slack post error:', alertError.message);
        }
      }
    } else {
      console.warn('Airtable env vars missing; skipping Airtable insert');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Notification sent to Slack', airtable: airtableStatus })
    };

  } catch (error) {
    console.error('submission-created error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
