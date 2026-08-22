const assert = require('assert');
const fs = require('fs');
const {
  SESSION_BLOCK_START,
  SESSION_BLOCK_END,
  SESSION_LOCK_PATH,
  readSessionLock,
  acquireSessionLock,
  releaseSessionLock,
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

function testExtractorEdgeCases() {
  // CRLF input: \r is stripped up front, so neither extractor leaks a trailing
  // carriage return into the session-log header line (#83 decision: strip, not pin).
  const crlf = '## Summary\r\nDid the work.\r\n\r\n## Review\r\nClean — line one.\r\nLine two.\r\n';
  assert.strictEqual(extractSessionSummary(crlf), 'Did the work.', 'CRLF summary should normalise to a clean line');
  const crlfReview = extractReviewResult(crlf);
  assert.strictEqual(crlfReview, 'Clean — line one.\nLine two.', 'CRLF review body should normalise to LF');
  assert.ok(!crlfReview.includes('\r'), 'no carriage return should survive into the review result');

  // h3-only heading is not an h2 section.
  assert.strictEqual(extractNotesSection('### Review\nbody\n', 'Review'), null, 'an h3 "### Review" should not match the h2 gate');
  assert.strictEqual(extractReviewResult('### Review\nbody\n'), null, 'extractReviewResult should ignore an h3-only Review');

  // Near-miss heading must not match a longer title.
  assert.strictEqual(extractNotesSection('## Review notes\nbody\n', 'Review'), null, '"## Review notes" should not match the "Review" heading');

  // Last section with no trailing newline at EOF.
  assert.strictEqual(
    extractReviewResult('## Summary\nDid it.\n\n## Review\nClean, no findings'),
    'Clean, no findings',
    'a Review section that is the last block with no trailing newline should still be captured'
  );

  // h3 sub-headings inside a section do not terminate it (loadSessionNotes demotes h2→h3).
  assert.strictEqual(
    extractNotesSection('## Review\nOutcome.\n### Sub-point\nMore.\n\n## Decisions\n- x\n', 'Review'),
    'Outcome.\n### Sub-point\nMore.',
    'an embedded h3 should stay inside the section, not end it'
  );

  // Duplicate headings: first occurrence wins.
  assert.strictEqual(
    extractNotesSection('## Review\nFirst outcome.\n\n## Review\nSecond outcome.\n', 'Review'),
    'First outcome.',
    'a duplicated section heading should resolve to the first occurrence'
  );
}

// #85: the session-open lock that lets session-end detect a concurrent session.
// Saves/restores any real lock file so this can run safely against the live repo path.
function testSessionLock() {
  const preExisting = fs.existsSync(SESSION_LOCK_PATH) ? fs.readFileSync(SESSION_LOCK_PATH, 'utf8') : null;
  try {
    if (fs.existsSync(SESSION_LOCK_PATH)) fs.unlinkSync(SESSION_LOCK_PATH);

    assert.strictEqual(readSessionLock(), null, 'no lock file should read as null');

    const first = acquireSessionLock('2026-08-22T10:00:00.000Z');
    assert.strictEqual(first.openCount, 1, 'first acquire should open at count 1');
    assert.strictEqual(fs.existsSync(SESSION_LOCK_PATH), true, 'acquire should create the lock file');

    const second = acquireSessionLock('2026-08-22T11:00:00.000Z');
    assert.strictEqual(second.openCount, 2, 'a second acquire without a release should increment to 2');
    assert.strictEqual(second.firstStartedAt, '2026-08-22T10:00:00.000Z', 'firstStartedAt should be preserved across acquires');

    releaseSessionLock();
    const afterOneRelease = readSessionLock();
    assert.strictEqual(afterOneRelease.openCount, 1, 'releasing one of two should leave count at 1, not delete the file');

    releaseSessionLock();
    assert.strictEqual(fs.existsSync(SESSION_LOCK_PATH), false, 'releasing the last open session should remove the lock file');

    // Releasing with no lock present should be a no-op, not throw.
    releaseSessionLock();

    // A second acquire within the dedup window is the same real session re-orienting
    // (e.g. session-start then session-start:json) — must not inflate openCount, or
    // an ordinary single-session pattern would falsely trip the concurrency guard.
    const burstFirst = acquireSessionLock('2026-08-22T10:00:00.000Z');
    assert.strictEqual(burstFirst.openCount, 1, 'first acquire of a burst should open at count 1');
    const burstSecond = acquireSessionLock('2026-08-22T10:00:30.000Z'); // 30s later
    assert.strictEqual(burstSecond.openCount, 1, 'a repeat acquire within the dedup window should not increment');
    assert.strictEqual(burstSecond.lastStartedAt, '2026-08-22T10:00:30.000Z', 'lastStartedAt should still refresh on a deduped acquire');
    releaseSessionLock();
    assert.strictEqual(fs.existsSync(SESSION_LOCK_PATH), false, 'a single-count lock should be removed by one release even after a deduped re-acquire');
  } finally {
    if (fs.existsSync(SESSION_LOCK_PATH)) fs.unlinkSync(SESSION_LOCK_PATH);
    if (preExisting !== null) fs.writeFileSync(SESSION_LOCK_PATH, preExisting);
  }
}

function runAllTests() {
  testMatchesAnyPattern();
  testExtractNotesSection();
  testExtractSessionSummary();
  testExtractReviewResult();
  testExtractorEdgeCases();
  testEnsureNextSessionBlock();
  testUpsertSessionProtocolBlock();
  testResolveProfileOperatingMode();
  testSessionLock();
  console.log('✅ session protocol tests passed');
}

runAllTests();
