'use strict';

// Unit coverage for scripts/lib/atomic-write.js (#79) — write-to-temp-then-rename so
// a crash mid-write can never leave a truncated/corrupted committed build output.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { writeFileAtomic } = require('../../scripts/lib/atomic-write');

function makeScratchDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'atomic-write-test-'));
}

test('writes the exact content to the target file', () => {
  const dir = makeScratchDir();
  const target = path.join(dir, 'out.html');
  writeFileAtomic(target, '<html>hi</html>');
  assert.equal(fs.readFileSync(target, 'utf8'), '<html>hi</html>');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('overwrites existing content at the target path', () => {
  const dir = makeScratchDir();
  const target = path.join(dir, 'out.html');
  fs.writeFileSync(target, 'old content');
  writeFileAtomic(target, 'new content');
  assert.equal(fs.readFileSync(target, 'utf8'), 'new content');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('leaves no temp file behind after a successful write', () => {
  const dir = makeScratchDir();
  const target = path.join(dir, 'out.html');
  writeFileAtomic(target, 'content');
  const remaining = fs.readdirSync(dir);
  assert.deepEqual(remaining, ['out.html']);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('refuses to write empty content, leaving any existing target file untouched', () => {
  const dir = makeScratchDir();
  const target = path.join(dir, 'out.html');
  fs.writeFileSync(target, 'existing content');
  assert.throws(() => writeFileAtomic(target, ''), /empty/);
  assert.equal(fs.readFileSync(target, 'utf8'), 'existing content');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('a failed rename (e.g. target directory does not exist) throws and leaves no temp file, target file (if any) untouched', () => {
  const dir = makeScratchDir();
  const missingDir = path.join(dir, 'does-not-exist');
  const target = path.join(missingDir, 'out.html');
  assert.throws(() => writeFileAtomic(target, 'content'));
  // The tmp file was written into missingDir's parent (dir) alongside the basename
  // logic uses path.dirname(filePath), which is missingDir itself — since missingDir
  // doesn't exist, writeFileSync to it fails too, so nothing should be left in `dir`.
  assert.deepEqual(fs.readdirSync(dir), []);
  fs.rmSync(dir, { recursive: true, force: true });
});
