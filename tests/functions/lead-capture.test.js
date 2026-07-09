// Unit tests for netlify/functions/lead-capture.js — the GNG-1 consent-capture money path.
// Run: node --test tests/
//
// The function reads env vars + fetch at module load / call time, so each test resets
// process.env and clears the require cache before re-requiring the handler.

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

const MODULE_PATH = path.join(__dirname, '..', '..', 'netlify', 'functions', 'lead-capture.js');
const OFFERINGS_PATH = path.join(__dirname, '..', '..', 'content', 'data', 'offerings.json');
const APPLYFORM_PATH = path.join(__dirname, '..', '..', '_templates', 'components', 'ApplyForm.html');

const ENV_KEYS = ['SLACK_WEBHOOK_URL', 'AIRTABLE_TOKEN', 'AIRTABLE_BASE_ID', 'AIRTABLE_TABLE'];

function withEnv(overrides, fn) {
  const saved = {};
  for (const key of ENV_KEYS) saved[key] = process.env[key];
  for (const key of ENV_KEYS) delete process.env[key];
  Object.assign(process.env, overrides);
  delete require.cache[require.resolve(MODULE_PATH)];
  try {
    return fn(require(MODULE_PATH));
  } finally {
    for (const key of ENV_KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
    delete require.cache[require.resolve(MODULE_PATH)];
  }
}

const VALID_FIELDS = {
  'form-name': 'lead-capture-form',
  name: 'Jane Doe',
  email: 'jane@example.com',
  company: 'Acme Ltd',
  website: 'acme.com',
  role: 'CEO',
  timeline: 'immediately',
  consent_given: true,
  consent_timestamp: '2026-07-04T00:00:00.000Z',
};

function makeEvent(fields, { method = 'POST', bodyOverride } = {}) {
  return {
    httpMethod: method,
    body: bodyOverride !== undefined ? bodyOverride : JSON.stringify(fields),
  };
}

// Records every fetch call so assertions can inspect exact payloads sent to Slack/Airtable.
function makeFetchStub(responses) {
  const calls = [];
  const fn = async (url, opts) => {
    calls.push({ url, opts, body: opts?.body ? JSON.parse(opts.body) : undefined });
    const match = responses.find((r) => url.includes(r.match));
    if (!match) throw new Error(`Unstubbed fetch call to ${url}`);
    if (match.throws) throw new Error(match.throws);
    return {
      ok: match.status === undefined || (match.status >= 200 && match.status < 300),
      status: match.status ?? 200,
      text: async () => match.text ?? '',
    };
  };
  fn.calls = calls;
  return fn;
}

test('honeypot submissions are skipped as spam, no external calls', async () => {
  await withEnv({ SLACK_WEBHOOK_URL: 'https://hooks.slack.test/x' }, async (mod) => {
    global.fetch = makeFetchStub([]); // any call here throws "unstubbed" and fails the test
    const res = await mod.handler(makeEvent({ _honeypot: 'bot-filled-this' }));
    assert.equal(res.statusCode, 200);
    assert.deepEqual(JSON.parse(res.body), { skipped: 'spam' });
  });
});

test('non-lead-capture form names are skipped', async () => {
  await withEnv({}, async (mod) => {
    global.fetch = makeFetchStub([]);
    const res = await mod.handler(makeEvent({ ...VALID_FIELDS, 'form-name': 'some-other-form' }));
    assert.equal(res.statusCode, 200);
    assert.deepEqual(JSON.parse(res.body), { skipped: 'different form' });
  });
});

test('missing required fields are skipped', async () => {
  await withEnv({}, async (mod) => {
    global.fetch = makeFetchStub([]);
    const { name, ...rest } = VALID_FIELDS;
    const res = await mod.handler(makeEvent(rest));
    assert.equal(res.statusCode, 200);
    assert.deepEqual(JSON.parse(res.body), { skipped: 'missing required fields' });
  });
});

test('oversized payload is rejected with 413 before parsing', async () => {
  await withEnv({}, async (mod) => {
    global.fetch = makeFetchStub([]);
    const res = await mod.handler(makeEvent(null, { bodyOverride: 'x'.repeat(10_001) }));
    assert.equal(res.statusCode, 413);
    assert.equal(JSON.parse(res.body).error, 'Payload too large');
  });
});

test('malformed JSON returns 400, not a generic 500', async () => {
  await withEnv({}, async (mod) => {
    global.fetch = makeFetchStub([]);
    const res = await mod.handler(makeEvent(null, { bodyOverride: '{not valid json' }));
    assert.equal(res.statusCode, 400);
    assert.equal(JSON.parse(res.body).error, 'Invalid JSON');
  });
});

test('valid submission: Slack message is escaped and Airtable carries the GNG-1 consent fields exactly', async () => {
  await withEnv(
    {
      SLACK_WEBHOOK_URL: 'https://hooks.slack.test/lead',
      AIRTABLE_TOKEN: 'tok',
      AIRTABLE_BASE_ID: 'appTest',
      AIRTABLE_TABLE: 'Prospects',
    },
    async (mod) => {
      const fetchStub = makeFetchStub([
        { match: 'hooks.slack.test', status: 200 },
        { match: 'api.airtable.com', status: 200 },
      ]);
      global.fetch = fetchStub;

      const fields = {
        ...VALID_FIELDS,
        name: '<script>alert(1)</script> & friends',
      };
      const res = await mod.handler(makeEvent(fields));

      assert.equal(res.statusCode, 200);
      const resBody = JSON.parse(res.body);
      assert.equal(resBody.success, true);
      assert.equal(resBody.airtable, 'created');

      const slackCall = fetchStub.calls.find((c) => c.url.includes('hooks.slack.test'));
      const nameField = slackCall.body.blocks[1].fields[0].text;
      assert.ok(nameField.includes('&lt;script&gt;'), 'HTML must be escaped in Slack mrkdwn');
      assert.ok(nameField.includes('&amp; friends'), 'ampersand must be escaped in Slack mrkdwn');
      assert.ok(!nameField.includes('<script>'), 'raw script tag must not reach Slack');

      const airtableCall = fetchStub.calls.find((c) => c.url.includes('api.airtable.com'));
      assert.equal(airtableCall.body.fields['Consent Given'], true);
      assert.equal(airtableCall.body.fields['Consent Timestamp'], '2026-07-04T00:00:00.000Z');
      assert.equal(airtableCall.body.fields.Email, 'jane@example.com');
    }
  );
});

test('service-interest slug is mapped to a readable label in Slack + Airtable Notes; problem text flows into Notes and its own Slack block', async () => {
  await withEnv(
    {
      SLACK_WEBHOOK_URL: 'https://hooks.slack.test/lead',
      AIRTABLE_TOKEN: 'tok',
      AIRTABLE_BASE_ID: 'appTest',
      AIRTABLE_TABLE: 'Prospects',
    },
    async (mod) => {
      const fetchStub = makeFetchStub([
        { match: 'hooks.slack.test', status: 200 },
        { match: 'api.airtable.com', status: 200 },
      ]);
      global.fetch = fetchStub;

      const fields = {
        ...VALID_FIELDS,
        interest: 'leadership-activation',
        problem: 'Our leadership team has no shared AI vocabulary',
      };
      const res = await mod.handler(makeEvent(fields));
      assert.equal(res.statusCode, 200);

      const slackCall = fetchStub.calls.find((c) => c.url.includes('hooks.slack.test'));
      const slackText = JSON.stringify(slackCall.body);
      assert.ok(slackText.includes('Leadership Team AI Activation'), 'raw slug must be mapped to its display name');
      assert.ok(slackText.includes('Trying to solve'));
      assert.ok(slackText.includes('no shared AI vocabulary'));

      const airtableCall = fetchStub.calls.find((c) => c.url.includes('api.airtable.com'));
      assert.ok(airtableCall.body.fields.Notes.includes('Service interest: Leadership Team AI Activation'));
      assert.ok(airtableCall.body.fields.Notes.includes('Trying to solve: Our leadership team has no shared AI vocabulary'));
    }
  );
});

test('unrecognised interest slug falls back to showing the raw value, not a blank or thrown error', async () => {
  await withEnv(
    { SLACK_WEBHOOK_URL: 'https://hooks.slack.test/lead' },
    async (mod) => {
      global.fetch = makeFetchStub([{ match: 'hooks.slack.test', status: 200 }]);
      const res = await mod.handler(makeEvent({ ...VALID_FIELDS, interest: 'some-future-offering' }));
      assert.equal(res.statusCode, 200);
      const slackCall = global.fetch.calls.find((c) => c.url.includes('hooks.slack.test'));
      assert.ok(JSON.stringify(slackCall.body).includes('some-future-offering'));
    }
  );
});

// Drift guard: the function's interestLabels map hardcodes offering display names, which
// Check #10 does NOT scan (it only covers _templates/). This test is the guard instead —
// it parses the interest slugs the ApplyForm actually offers and asserts each renders its
// offerings.json name through the function, so form ⇄ function ⇄ offer-canon can't silently desync.
test('every ApplyForm interest slug maps to its offerings.json name via the function (no silent label drift)', async () => {
  const offerings = JSON.parse(fs.readFileSync(OFFERINGS_PATH, 'utf8')).offerings;
  const applyForm = fs.readFileSync(APPLYFORM_PATH, 'utf8');
  const slugs = [...applyForm.matchAll(/name="interest"\s+value="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(slugs.length >= 2, 'expected to find interest radio values in ApplyForm.html');

  for (const slug of slugs) {
    if (slug === 'just-exploring') continue; // not an offering — has its own literal label
    const offering = offerings.find((o) => o.key === slug);
    assert.ok(offering, `ApplyForm offers interest "${slug}" but offerings.json has no matching key`);

    await withEnv({ SLACK_WEBHOOK_URL: 'https://hooks.slack.test/lead' }, async (mod) => {
      global.fetch = makeFetchStub([{ match: 'hooks.slack.test', status: 200 }]);
      await mod.handler(makeEvent({ ...VALID_FIELDS, interest: slug }));
      const slackCall = global.fetch.calls.find((c) => c.url.includes('hooks.slack.test'));
      assert.ok(
        JSON.stringify(slackCall.body).includes(offering.name),
        `interest "${slug}" should render offerings.json name "${offering.name}" — the function's interestLabels map has drifted from the canon`
      );
    });
  }
});

test('missing interest with a source present falls back to "Not specified" and still captures the lead', async () => {
  await withEnv(
    {
      SLACK_WEBHOOK_URL: 'https://hooks.slack.test/lead',
      AIRTABLE_TOKEN: 'tok',
      AIRTABLE_BASE_ID: 'appTest',
      AIRTABLE_TABLE: 'Prospects',
    },
    async (mod) => {
      global.fetch = makeFetchStub([
        { match: 'hooks.slack.test', status: 200 },
        { match: 'api.airtable.com', status: 200 },
      ]);
      // VALID_FIELDS carries no `interest`; add a source so the interest/source block renders.
      const res = await mod.handler(makeEvent({ ...VALID_FIELDS, source: 'homepage-hero' }));
      assert.equal(res.statusCode, 200);
      assert.equal(JSON.parse(res.body).airtable, 'created', 'a lead without interest must still be captured, not rejected');
      const slackCall = global.fetch.calls.find((c) => c.url.includes('hooks.slack.test'));
      assert.ok(JSON.stringify(slackCall.body).includes('Not specified'));
    }
  );
});

test('Airtable write failure fires a distinct GNG-1 alert and still returns success:true (fails-soft)', async () => {
  await withEnv(
    {
      SLACK_WEBHOOK_URL: 'https://hooks.slack.test/lead',
      AIRTABLE_TOKEN: 'tok',
      AIRTABLE_BASE_ID: 'appTest',
      AIRTABLE_TABLE: 'Prospects',
    },
    async (mod) => {
      const fetchStub = makeFetchStub([
        { match: 'hooks.slack.test', status: 200 },
        { match: 'api.airtable.com', status: 422, text: 'INVALID_REQUEST' },
      ]);
      global.fetch = fetchStub;

      const res = await mod.handler(makeEvent(VALID_FIELDS));
      assert.equal(res.statusCode, 200);
      const resBody = JSON.parse(res.body);
      assert.equal(resBody.success, true, 'must stay fails-soft for the user');
      assert.equal(resBody.airtable, 'failed');

      const slackCalls = fetchStub.calls.filter((c) => c.url.includes('hooks.slack.test'));
      assert.equal(slackCalls.length, 2, 'expected the normal lead notification + a distinct GNG-1 failure alert');
      const alert = slackCalls[1].body;
      assert.ok(alert.text.includes('CONSENT WRITE FAILED'));
      assert.ok(alert.text.includes('GNG-1'));
    }
  );
});
