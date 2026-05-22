'use strict';

const fs = require('fs');
const path = require('path');
const { resolveComponentTokens } = require('./build-components');

const ROOT = path.resolve(__dirname, '..');

const PAGES = [
  { template: '_templates/what-we-do.html',  output: 'what-we-do/index.html'  },
  { template: '_templates/how-we-work.html', output: 'how-we-work/index.html' },
  { template: '_templates/about.html',       output: 'about/index.html'       },
  { template: '_templates/contact.html',     output: 'contact/index.html'     },
  // Offering detail pages
  { template: '_templates/offerings/company-enablement.html',         output: 'what-we-do/company-enablement/index.html'         },
  { template: '_templates/offerings/leadership-cohort.html',          output: 'what-we-do/leadership-cohort/index.html'          },
  { template: '_templates/offerings/leadership-activation.html',      output: 'what-we-do/leadership-activation/index.html'      },
  { template: '_templates/offerings/senior-leader-acceleration.html', output: 'what-we-do/senior-leader-acceleration/index.html' },
  // Standalone pages
  { template: '_templates/talks-events.html', output: 'talks-events/index.html' },
  // Funnel pages — conversion-engineered landing pages, separate from offering detail pages
  { template: '_templates/programmes/leadership-cohort.html', output: 'programmes/leadership-cohort/index.html' },
];

function main() {
  let built = 0;
  let skipped = 0;

  for (const page of PAGES) {
    const templatePath = path.join(ROOT, page.template);
    const outputPath   = path.join(ROOT, page.output);
    const outputDir    = path.dirname(outputPath);

    if (!fs.existsSync(templatePath)) {
      console.error(`✗ Template not found: ${page.template}`);
      process.exit(1);
    }

    const source   = fs.readFileSync(templatePath, 'utf8');
    const resolved = resolveComponentTokens(source);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const existing = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';

    if (existing === resolved) {
      console.log(`ℹ️  Unchanged: ${page.output}`);
      skipped++;
    } else {
      fs.writeFileSync(outputPath, resolved, 'utf8');
      console.log(`✅ Built: ${page.output}`);
      built++;
    }
  }

  console.log(`\nInner pages: ${built} built, ${skipped} unchanged.`);
}

main();
