'use strict';

const fs = require('fs');
const path = require('path');
const { resolveComponentTokens } = require('./build-components');

const ROOT = path.resolve(__dirname, '..');
const SHELL_PATH = path.join(ROOT, '_templates/design-system.html');
const SECTIONS_DIR = path.join(ROOT, '_templates/design-system');
const OUTPUT_DIR = path.join(ROOT, 'design-system');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'index.html');

const SECTION_TOKENS = {
  '{{sectionPrimitives}}': 'primitives.html',
  '{{sectionChrome}}':     'chrome.html',
  '{{sectionContent}}':    'content.html',
  '{{sectionInteractive}}': 'interactive.html',
};

function readRequiredFile(filePath, description) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${description} not found: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}

function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let source = readRequiredFile(SHELL_PATH, 'Design system shell');

  for (const [token, filename] of Object.entries(SECTION_TOKENS)) {
    const partialPath = path.join(SECTIONS_DIR, filename);
    const partial = readRequiredFile(partialPath, `Design system section '${filename}'`);

    if (!source.includes(token)) {
      throw new Error(`Design system shell token missing: ${token}`);
    }

    source = source.replace(token, partial);
  }

  source = resolveComponentTokens(source);

  const existing = fs.existsSync(OUTPUT_PATH) ? fs.readFileSync(OUTPUT_PATH, 'utf8') : '';

  if (existing === source) {
    console.log('ℹ️  Design system unchanged: design-system/index.html');
    return;
  }

  fs.writeFileSync(OUTPUT_PATH, source, 'utf8');
  console.log('✅ Design system assembled: design-system/index.html');
}

main();
