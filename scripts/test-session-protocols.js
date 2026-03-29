const assert = require('assert');
const {
  SESSION_BLOCK_START,
  SESSION_BLOCK_END,
  matchesAnyPattern,
  resolveProfileOperatingMode,
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

function runAllTests() {
  testMatchesAnyPattern();
  testEnsureNextSessionBlock();
  testUpsertSessionProtocolBlock();
  testResolveProfileOperatingMode();
  console.log('✅ session protocol tests passed');
}

runAllTests();
