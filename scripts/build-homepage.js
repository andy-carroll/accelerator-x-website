const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_PATH = path.join(ROOT, '_templates/homepage.html');
const TESTIMONIALS_PARTIAL_PATH = path.join(ROOT, '_templates/homepage-testimonials.html');
const TRUST_PARTIAL_PATH = path.join(ROOT, '_templates/homepage-trust.html');
const OUTPUT_PATH = path.join(ROOT, 'index.html');
const TESTIMONIALS_TOKEN = '{{homepageTestimonials}}';
const TRUST_TOKEN = '{{homepageTrust}}';

function readRequiredFile(filePath, description) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${description} not found: ${filePath}`);
  }

  return fs.readFileSync(filePath, 'utf8');
}

function main() {
  const sourceTemplate = readRequiredFile(SOURCE_PATH, 'Homepage source template');
  const testimonialsPartial = readRequiredFile(TESTIMONIALS_PARTIAL_PATH, 'Homepage testimonials partial');
  const trustPartial = readRequiredFile(TRUST_PARTIAL_PATH, 'Homepage trust partial');

  const withTestimonials = sourceTemplate.replace(TESTIMONIALS_TOKEN, testimonialsPartial);
  const source = withTestimonials.replace(TRUST_TOKEN, trustPartial);

  if (withTestimonials === sourceTemplate) {
    throw new Error(`Homepage template token missing: ${TESTIMONIALS_TOKEN}`);
  }

  if (source === withTestimonials) {
    throw new Error(`Homepage template token missing: ${TRUST_TOKEN}`);
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
