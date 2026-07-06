const assert = require('assert');
const {
  SESSION_BLOCK_START,
  SESSION_BLOCK_END,
  matchesAnyPattern,
  resolveProfileOperatingMode,
  extractNotesSection,
  extractSessionSummary,
  extractReviewResult,
  ensureNextSessionBlock,
  upsertSessionProtocolBlock
} = require('./session-protocol-utils');

function testMatchesAnyPattern() {
  assert.strictEqual(matchesAnyPattern('main', ['main', 'feat/*']), true, 'main should match main');
  assert.strictEqual(matchesAnyPattern('feat/session-protocol', ['main', 'feat/*']), true, 'feat/* wildcard should match');
  assert.strictEqual(matchesAnyPattern('chore/docs', ['main', 'feat/*']), false, 'non-allowed branch should not match');
}

function testEnsureNextSessionBlock() {
  const input = '# CLAUDE\n\n## Current State\n';
  const first = ensureNextSessionBlock(input);
  assert.strictEqual(first.changed, true, 'should add next session block when missing');
  assert.ok(first.content.includes('## Next Session Priorities'), 'output should include next session priorities');

  const second = ensureNextSessionBlock(first.content);
  assert.strictEqual(second.changed, false, 'should be idempotent when block already exists');
  assert.strictEqual(second.content, first.content, 'content should remain unchanged on re-run');
}

function testUpsertSessionProtocolBlock() {
  const base = '# Notes\n\nSome content.\n';
  const first = upsertSessionProtocolBlock(base, {
    sessionId: '20260329-200000',
    date: '2026-03-29T20:00:00.000Z',
    mode: 'write'
  });

  assert.strictEqual(first.changed, true, 'first upsert should modify content');
  assert.ok(first.content.includes(SESSION_BLOCK_START), 'block start marker should be present');
  assert.ok(first.content.includes(SESSION_BLOCK_END), 'block end marker should be present');
  assert.ok(first.content.includes('Session ID: 20260329-200000'), 'session id should be written');

  const second = upsertSessionProtocolBlock(first.content, {
    sessionId: '20260329-200001',
    date: '2026-03-29T20:00:01.000Z',
    mode: 'write'
  });

  const startCount = (second.content.match(new RegExp(SESSION_BLOCK_START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  const endCount = (second.content.match(new RegExp(SESSION_BLOCK_END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;

  assert.strictEqual(startCount, 1, 'upsert should keep exactly one block start marker');
  assert.strictEqual(endCount, 1, 'upsert should keep exactly one block end marker');
  assert.ok(second.content.includes('Session ID: 20260329-200001'), 'second upsert should replace block contents');
  assert.ok(!second.content.includes('Session ID: 20260329-200000'), 'old session id should be replaced');
}

function testResolveProfileOperatingMode() {
  const baseProfile = {
    version: 1,
    operatingMode: 'team',
    strictMode: false,
    git: { allowedBranchPatterns: ['main'] },
    quality: { requiredCommands: ['npm run build'], optionalCommands: ['npm run check'] },
    sessionEnd: { autoPushAllowed: false, allowedChangedPathPatterns: ['scripts/*'] },
    operatingModes: {
      team: {
        strictMode: true,
        quality: { requiredCommands: ['npm run build', 'npm run check'], optionalCommands: [] },
        sessionEnd: { allowedChangedPathPatterns: ['.claude/sessions/*.md'] }
      }
    }
  };

  const resolved = resolveProfileOperatingMode(baseProfile);
  assert.ok(!resolved.error, 'mode resolution should not error for valid mode override');
  assert.strictEqual(resolved.activeMode, 'team', 'active mode should be reported');
  assert.strictEqual(resolved.profile.strictMode, true, 'team override should apply strictMode');
  assert.deepStrictEqual(
    resolved.profile.quality.requiredCommands,
    ['npm run build', 'npm run check'],
    'team override should replace requiredCommands'
  );
  assert.deepStrictEqual(
    resolved.profile.sessionEnd.allowedChangedPathPatterns,
    ['.claude/sessions/*.md'],
    'team override should replace allowlist patterns'
  );

  const invalid = resolveProfileOperatingMode({
    version: 1,
    operatingMode: 'team',
    operatingModes: { team: 'invalid' }
  });
  assert.ok(invalid.error, 'invalid mode override shape should return error');
}

function testExtractNotesSection() {
  const notes = '## Summary\nShipped the thing.\n\n## Review\n<!-- guidance -->\nClean — no blocking findings.\nOne nit fixed inline.\n\n## Decisions\n- Decided X.\n';
  assert.strictEqual(
    extractNotesSection(notes, 'Review'),
    'Clean — no blocking findings.\nOne nit fixed inline.',
    'section body should be captured up to the next h2, with HTML comments stripped'
  );
  assert.strictEqual(extractNotesSection(notes, 'Deferred'), null, 'missing section should return null');
  assert.strictEqual(
    extractNotesSection('## Review\n<!-- only guidance, never filled in -->\n', 'Review'),
    null,
    'a section that is only template comments should count as empty'
  );
  assert.strictEqual(
    extractNotesSection('## Review\n<!-- truncated template with no closing marker\n', 'Review'),
    null,
    'an unterminated template comment should not count as evidence'
  );
  assert.strictEqual(
    extractNotesSection('## C++ (notes)\nbody text\n', 'C++ (notes)'),
    'body text',
    'headings containing regex metacharacters should match literally, not throw'
  );
  assert.strictEqual(extractNotesSection('', 'Review'), null, 'empty content should return null');
}

function testExtractSessionSummary() {
  assert.strictEqual(
    extractSessionSummary('## Summary\nBuilt the funnel page; 3 blockers logged.\n\n## Review\nClean.\n'),
    'Built the funnel page; 3 blockers logged.',
    'real summary line should be extracted'
  );
  assert.strictEqual(
    extractSessionSummary('## Summary\n_One sentence: what was shipped._\n'),
    null,
    'italic template placeholder should be rejected'
  );
  assert.strictEqual(extractSessionSummary('no summary heading here'), null, 'missing heading should return null');
}

function testExtractReviewResult() {
  assert.strictEqual(
    extractReviewResult('## Summary\nDid work.\n\n## Review\nClean — /code-review found no blocking findings.\n\n## Decisions\n- X\n'),
    'Clean — /code-review found no blocking findings.',
    'recorded review outcome should be extracted'
  );
  assert.strictEqual(
    extractReviewResult('## Review\nSkipped — docs-only session, no reviewable code diff.\n'),
    'Skipped — docs-only session, no reviewable code diff.',
    'an honest skip with a reason should count as recorded evidence'
  );
  assert.strictEqual(
    extractReviewResult('## Summary\nDid work.\n\n## Review\n_Run the independent review, then record its outcome here._\n'),
    null,
    'untouched template placeholder should be rejected'
  );
  assert.strictEqual(
    extractReviewResult('## Review\n_Run the independent review, then record its outcome here._\nClean — reviewed, 0 blocking findings.\n'),
    'Clean — reviewed, 0 blocking findings.',
    'a real outcome appended below a leftover placeholder line should still count'
  );
  assert.strictEqual(
    extractReviewResult('## Summary\nDid work.\n\n## Decisions\n- X\n'),
    null,
    'notes without a Review section should be rejected'
  );
}

function runAllTests() {
  testMatchesAnyPattern();
  testExtractNotesSection();
  testExtractSessionSummary();
  testExtractReviewResult();
  testEnsureNextSessionBlock();
  testUpsertSessionProtocolBlock();
  testResolveProfileOperatingMode();
  console.log('✅ session protocol tests passed');
}

runAllTests();
