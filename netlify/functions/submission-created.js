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
    const payload = JSON.parse(event.body);
    const data = payload.data || {};
    
    // Format timeline for readability
    const timelineLabels = {
      'immediately': 'Immediately',
      'within-1-month': 'Within 1 month',
      '1-3-months': '1-3 months',
      'exploring': 'Just exploring'
    };
    const timeline = timelineLabels[data.timeline] || data.timeline || 'Not specified';
    
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
            { type: 'mrkdwn', text: `*Name:*\n${data.name || 'N/A'}` },
            { type: 'mrkdwn', text: `*Email:*\n${data.email || 'N/A'}` },
            { type: 'mrkdwn', text: `*Company:*\n${data.company || 'N/A'}` },
            { type: 'mrkdwn', text: `*Website:*\n${data.website || 'N/A'}` },
            { type: 'mrkdwn', text: `*Role:*\n${data.role || 'N/A'}` },
            { type: 'mrkdwn', text: `*Timeline:*\n${timeline}` }
          ]
        }
      ]
    };
    
    // Add message block if present
    if (data.message && data.message.trim()) {
      slackMessage.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Message:*\n>${data.message.replace(/\n/g, '\n>')}`
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
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
