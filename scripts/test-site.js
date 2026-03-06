const fs = require('fs');
const path = require('path');

function read(relativePath) {
  const filePath = path.join(__dirname, '..', relativePath);
  return fs.readFileSync(filePath, 'utf8');
}

function assertIncludes(content, expected, message) {
  if (!content.includes(expected)) {
    throw new Error(message + `\nMissing: ${expected}`);
  }
}

function run() {
  const homepage = read('index.html');
  const insightsIndex = read('insights/index.html');
  const article = read('insights/articles/building-the-ai-native-team.html');
  const privacy = read('privacy.html');
  const terms = read('terms.html');

  assertIncludes(homepage, '/assets/images/toby-green-shirt-400.png', 'Homepage founder headshot regression check failed for Toby.');
  assertIncludes(homepage, '/assets/images/andy-black-t-400.jpg', 'Homepage founder headshot regression check failed for Andy.');
  assertIncludes(article, 'article-author-card__image', 'Insights article author card did not render.');
  assertIncludes(article, 'Andy Carroll', 'Insights article author name missing.');
  assertIncludes(article, 'Co-founder', 'Insights article author role missing.');
  assertIncludes(homepage, 'https://www.google.com/preferences/interests/yourresults?tab=source_preferences&hl=en-GB#source=accelerator-x.ai', 'Homepage preferred source CTA missing.');
  assertIncludes(insightsIndex, 'Add Accelerator X as a preferred Google source.', 'Insights index preferred source CTA missing.');
  assertIncludes(privacy, 'Accelerator X Ltd is a company registered in England and Wales under company number 16974247.', 'Privacy fallback legal identity missing.');
  assertIncludes(terms, 'The website is operated by Accelerator X Ltd, a company registered in England and Wales under company number 16974247.', 'Terms fallback legal identity missing.');

  console.log('✅ Site regression checks passed');
}

run();
