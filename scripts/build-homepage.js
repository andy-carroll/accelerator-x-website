const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_PATH = path.join(ROOT, '_templates/homepage.html');
const TESTIMONIALS_PARTIAL_PATH = path.join(ROOT, '_templates/homepage-testimonials.html');
const OUTPUT_PATH = path.join(ROOT, 'index.html');
const TESTIMONIALS_TOKEN = '{{homepageTestimonials}}';

function readRequiredFile(filePath, description) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${description} not found: ${filePath}`);
  }

  return fs.readFileSync(filePath, 'utf8');
}

function main() {
  const sourceTemplate = readRequiredFile(SOURCE_PATH, 'Homepage source template');
  const testimonialsPartial = readRequiredFile(TESTIMONIALS_PARTIAL_PATH, 'Homepage testimonials partial');
  const source = sourceTemplate.replace(TESTIMONIALS_TOKEN, testimonialsPartial);

  if (source === sourceTemplate) {
    throw new Error(`Homepage template token missing: ${TESTIMONIALS_TOKEN}`);
  }

  const existing = fs.existsSync(OUTPUT_PATH) ? fs.readFileSync(OUTPUT_PATH, 'utf8') : '';

  if (existing === source) {
    console.log('ℹ️ Homepage unchanged: index.html');
    return;
  }

  fs.writeFileSync(OUTPUT_PATH, source, 'utf8');
  console.log('✅ Homepage assembled: index.html ← _templates/homepage.html');
}

main();
