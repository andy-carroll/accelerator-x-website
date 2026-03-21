// Netlify Function: newsletter-subscribe
// Triggered by: direct JSON POST from all newsletter forms (homepage, insights hub, article CTAs)
// Bypasses Netlify Forms — no submission limits, no Netlify dashboard noise
// Actions: add contact to Brevo list #9 + notify Slack #website-leads
// Env vars required: SLACK_WEBHOOK_URL, BREVO_API_KEY
// Contract: returns { success: true } on success — forms.js depends on this shape

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const BREVO_LIST_ID = 9;

exports.handler = async (event) => {
  // CORS headers — allow requests from the live site and local dev
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const email = String(body.email || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Valid email required' }) };
    }

    // Honeypot — bots fill this, humans don't
    if (body._honey) {
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    const source = String(body.source || 'newsletter').trim();
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    // --- Brevo: add contact to list #9 ---
    if (BREVO_API_KEY) {
      try {
        const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'api-key': BREVO_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            listIds: [BREVO_LIST_ID],
            updateEnabled: true  // updates existing contact rather than erroring
          })
        });

        if (!brevoRes.ok) {
          const text = await brevoRes.text();
          // 204 = contact already exists in Brevo — not an error
          if (brevoRes.status !== 204) {
            console.error('Brevo error:', brevoRes.status, text);
          }
        }
      } catch (err) {
        // Log but don't fail — Slack notification still fires
        console.error('Brevo fetch error:', err.message);
      }
    } else {
      console.warn('BREVO_API_KEY not set — skipping Brevo insert');
    }

    // --- Slack: notify #website-leads ---
    if (!SLACK_WEBHOOK_URL) {
      console.warn('SLACK_WEBHOOK_URL not set — skipping Slack notification');
    } else {
      try {
        await fetch(SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            blocks: [
              {
                type: 'rich_text',
                elements: [
                  {
                    type: 'rich_text_section',
                    elements: [
                      { type: 'emoji', name: 'chipmunk' },
                      { type: 'text', text: ' New newsletter signup just scurried in\n' },
                      { type: 'text', text: 'Email: ' },
                      { type: 'link', url: `mailto:${email}`, text: email },
                      { type: 'text', text: `\nSource: ${source}\nTime: ${new Date().toISOString()}` }
                    ]
                  }
                ]
              }
            ]
          })
        });
      } catch (err) {
        console.error('Slack notify error:', err.message);
      }
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };

  } catch (err) {
    console.error('newsletter-subscribe error:', err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) };
  }
};
