const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// Configuration
const CONTENT_DIR = path.join(__dirname, '../content/articles');
const OUTPUT_DIR = path.join(__dirname, '../insights');
const TEMPLATES_DIR = path.join(__dirname, '../_templates');

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(path.join(OUTPUT_DIR, 'articles'))) {
  fs.mkdirSync(path.join(OUTPUT_DIR, 'articles'), { recursive: true });
}
if (!fs.existsSync(TEMPLATES_DIR)) {
  fs.mkdirSync(TEMPLATES_DIR, { recursive: true });
}

// Helper: load template from file system
function loadTemplate(filename) {
  const templatePath = path.join(TEMPLATES_DIR, filename);
  if (!fs.existsSync(templatePath)) {
    console.warn(`⚠️ Template not found: ${templatePath}. Using fallback.`);
    if (filename === 'article.html') {
      return `<!DOCTYPE html><html lang="en"><head><title>{{title}}</title></head><body><h1>{{title}}</h1>{{content}}</body></html>`;
    }
    return `<!DOCTYPE html><html lang="en"><head><title>Insights Index</title></head><body><h1>Insights Index</h1><ul>{{articlesList}}</ul></body></html>`;
  }
  return fs.readFileSync(templatePath, 'utf-8');
}

function resolveSiteUrl() {
  const raw = process.env.SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://accelerator-x.ai';
  return String(raw).replace(/\/$/, '');
}

async function build() {
  console.log('🚀 Starting Content Hub Build Engine...');

  const siteUrl = resolveSiteUrl();
  
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn(`⚠️ Content directory not found: ${CONTENT_DIR}. Creating it...`);
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    return;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));
  const articles = [];

  for (const file of files) {
    const rawContent = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    
    // Parse frontmatter and content
    const { data: frontmatter, content } = matter(rawContent);
    const slug = frontmatter.slug || file.replace('.md', '');
    
    console.log(`- Building: ${frontmatter.title || file}`);
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(content);
    
    // Load fresh template for every article
    let articleHtml = loadTemplate('article.html');

    // Safe replace function handling undefined tokens
    const safeReplace = (token, val) => {
      // Create a global regex for the token
      const regex = new RegExp(`{{${token}}}`, 'g');
      // If a value exists, inject it. Otherwise, inject empty string so the raw token isn't visible.
      articleHtml = articleHtml.replace(regex, val || '');
    };
    
    // Inject Standard Tokens
    safeReplace('title', frontmatter.title);
    safeReplace('author', frontmatter.author);
    safeReplace('date', frontmatter.date);
    safeReplace('category', frontmatter.category);
    safeReplace('excerpt', frontmatter.excerpt);
    safeReplace('slug', slug);
    safeReplace('site_url', siteUrl);
    safeReplace('content', htmlContent);
    
    // Inject Dynamic Conversion Tokens (10/10 UX elements)
    safeReplace('bluf', frontmatter.bluf);
    safeReplace('lead_magnet_cta', frontmatter.lead_magnet_cta);
    safeReplace('next_article_url', frontmatter.next_article_url);
    safeReplace('next_article_title', frontmatter.next_article_title);
      
    // Save to /insights/articles/[slug].html
    const outPath = path.join(OUTPUT_DIR, 'articles', `${slug}.html`);
    fs.writeFileSync(outPath, articleHtml);
    
    // Store metadata for the index page
    articles.push({
      ...frontmatter,
      slug,
      url: `/insights/articles/${slug}.html`
    });
  }

  // Generate Hub Index
  console.log('Generating Feed Index...');
  
  // Sort articles by date descending
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  let indexHtml = loadTemplate('index.html');

  indexHtml = indexHtml.replace(/{{site_url}}/g, siteUrl);
  
  // Enhanced category mapping for filtering/visuals
  const categoryMap = {
    'AI Strategy': { id: 'strategy', label: 'C-Suite', color: 'text-primary' },
    'The Implementation Gap': { id: 'implementation', label: 'Operations', color: 'text-amber' },
    'Capability Building': { id: 'capability', label: 'Teams', color: 'text-accent' },
    'Default': { id: 'all', label: 'Framework', color: 'text-primary' }
  };

  const articlesListHtml = articles.map(article => {
    const catInfo = categoryMap[article.category] || categoryMap['Default'];
    const typeLabel = article.type || 'Dispatch';
    const typeIcon = article.type === 'Video' ? 'play_circle' : 
                     article.type === 'Podcast' ? 'mic' : 
                     article.type === 'Webinar' ? 'videocam' : 
                     article.type === 'Case Study' ? 'assignment' : 'arrow_forward';
    
    return `
    <a href="${article.url}" data-category="${catInfo.id}" class="article-card card card-hoverable block transition-all overflow-hidden">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-bold uppercase tracking-wider ${catInfo.color}">${article.category || 'Focus'}</span>
        <span class="text-[10px] font-bold uppercase tracking-widest text-muted/60 bg-surface px-2 py-0.5 rounded border border-surface-2">${typeLabel}</span>
      </div>
      <h3 class="font-display text-xl font-bold text-navy transition-colors mb-3 h-14 line-clamp-2">${article.title}</h3>
      <p class="text-muted leading-relaxed line-clamp-2 text-sm h-10">${article.excerpt}</p>
      <div class="mt-6 flex items-center justify-between text-sm text-muted">
        <span>${article.date}</span>
        <span class="flex items-center text-primary font-medium">Read Article <span class="material-symbols-outlined ml-1 text-sm">${typeIcon}</span></span>
      </div>
    </a>
    `;
  }).join('');
  
  indexHtml = indexHtml.replace(/{{articlesList}}/g, articlesListHtml);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexHtml);

  console.log('\n✅ Build complete! Assets generated in /insights');
}

build();
