// Netlify Function: Triggered on form submission
// Forwards lead data to Slack #website-leads channel
// Form name must match: lead-capture-form

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse form data from Netlify submission
    // Netlify outgoing webhooks wrap submission data under payload.data
    const body = JSON.parse(event.body);
    const submission = body.payload || body;
    const data = submission.data || submission;

    // Basic spam/validity checks
    if (data['form-name'] && data['form-name'] !== 'lead-capture-form') {
      return { statusCode: 200, body: JSON.stringify({ skipped: 'different form' }) };
    }
    if (data.form_name && data.form_name !== 'lead-capture-form') {
      return { statusCode: 200, body: JSON.stringify({ skipped: 'different form' }) };
    }
    if (data._honeypot) {
      return { statusCode: 200, body: JSON.stringify({ skipped: 'spam' }) };
    }

    const safeTrim = (val = '') => String(val).trim();

    // Normalize website: prepend https:// if missing
    const normalizeWebsite = (val = '') => {
      const v = safeTrim(val);
      if (!v) return '';
      if (/^https?:\/\//i.test(v)) return v;
      return `https://${v}`;
    };

    const name = safeTrim(data.name);
    const email = safeTrim(data.email);
    const company = safeTrim(data.company);
    const website = normalizeWebsite(data.website);
    const role = safeTrim(data.role);
    const timelineRaw = safeTrim(data.timeline);
    const message = safeTrim(data.message || '');

    // Required fields guard
    if (!name || !email || !company || !website || !role) {
      return { statusCode: 200, body: JSON.stringify({ skipped: 'missing required fields' }) };
    }

    // Basic domain validation post-normalization
    const domainPattern = /^https?:\/\/[\w.-]+\.[A-Za-z]{2,}.*$/;
    if (!domainPattern.test(website)) {
      return { statusCode: 200, body: JSON.stringify({ skipped: 'invalid website' }) };
    }

    // Format timeline for readability
    const timelineLabels = {
      'immediately': 'Immediately',
      'within-1-month': 'Within 1 month',
      '1-3-months': '1-3 months',
      'exploring': 'Just exploring'
    };
    const timeline = timelineLabels[timelineRaw] || timelineRaw || 'Not specified';
    
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
            { type: 'mrkdwn', text: `*Name:*\n${name || 'N/A'}` },
            { type: 'mrkdwn', text: `*Email:*\n${email || 'N/A'}` },
            { type: 'mrkdwn', text: `*Company:*\n${company || 'N/A'}` },
            { type: 'mrkdwn', text: `*Website:*\n${website || 'N/A'}` },
            { type: 'mrkdwn', text: `*Role:*\n${role || 'N/A'}` },
            { type: 'mrkdwn', text: `*Timeline:*\n${timeline}` }
          ]
        }
      ]
    };
    
    // Add message block if present
    if (message) {
      slackMessage.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Message:*\n>${message.replace(/\n/g, '\n>')}`
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
    
    // Send to Slack
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackMessage)
    });
    
    if (!response.ok) {
      throw new Error(`Slack webhook error: ${response.status}`);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Notification sent to Slack' })
    };
    
  } catch (error) {
    console.error('submission-created error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
