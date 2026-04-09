const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_PATH = path.join(ROOT, '_templates/homepage.html');
const OUTPUT_PATH = path.join(ROOT, 'index.html');

function main() {
  if (!fs.existsSync(SOURCE_PATH)) {
    throw new Error(`Homepage source template not found: ${SOURCE_PATH}`);
  }

  const source = fs.readFileSync(SOURCE_PATH, 'utf8');
  const existing = fs.existsSync(OUTPUT_PATH) ? fs.readFileSync(OUTPUT_PATH, 'utf8') : '';

  if (existing === source) {
    console.log('ℹ️ Homepage unchanged: index.html');
    return;
  }

  fs.writeFileSync(OUTPUT_PATH, source, 'utf8');
  console.log('✅ Homepage assembled: index.html ← _templates/homepage.html');
}

main();
