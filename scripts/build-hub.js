const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// Configuration
const CONTENT_DIR = path.join(__dirname, '../content/articles');
const AUTHORS_PATH = path.join(__dirname, '../content/data/authors.json');
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

function loadAuthors() {
  if (!fs.existsSync(AUTHORS_PATH)) {
    console.warn(`⚠️ Authors data not found: ${AUTHORS_PATH}. Continuing without author profiles.`);
    return [];
  }

  try {
    const raw = fs.readFileSync(AUTHORS_PATH, 'utf-8');
    const authors = JSON.parse(raw);
    return Array.isArray(authors) ? authors : [];
  } catch (error) {
    console.warn(`⚠️ Failed to parse authors data at ${AUTHORS_PATH}. Continuing without author profiles.`);
    return [];
  }
}

function resolveAuthorProfile(authorName, authors) {
  if (!authorName) {
    return null;
  }

  return authors.find((author) => author.name === authorName) || null;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatArticleDate(value) {
  if (!value) {
    return '';
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(parsed);
}

function renderAuthorMeta(authorName, authorProfile, articleDate) {
  if (!authorProfile) {
    return `
      <div class="article-author-meta flex items-center gap-4 text-muted border-b border-surface pb-8">
        <span class="font-medium text-navy">${escapeHtml(authorName)}</span>
      </div>
    `;
  }

  const image = authorProfile.headshot?.png || authorProfile.headshot?.jpg || null;
  const webpSrcset = authorProfile.headshot?.webp?.srcset || '';
  const imageSrc = image?.src || '';
  const imageSrcset = image?.srcset || '';
  const imageAlt = authorProfile.headshot?.alt || authorProfile.name || authorName;
  const role = authorProfile.role || '';
  const bio = authorProfile.shortBio || '';

  return `
    <div class="article-author-card border-b border-surface pb-8">
      <div class="article-author-card__inner">
        <picture class="article-author-card__picture">
          ${webpSrcset ? `<source type="image/webp" srcset="${escapeHtml(webpSrcset)}" sizes="56px" />` : ''}
          ${imageSrc ? `<img src="${escapeHtml(imageSrc)}" srcset="${escapeHtml(imageSrcset)}" sizes="56px" alt="${escapeHtml(imageAlt)}" width="56" height="56" loading="lazy" decoding="async" class="article-author-card__image" />` : ''}
        </picture>
        <div class="article-author-card__body">
          <div class="article-author-card__header">
            <div>
              <p class="article-author-card__name">${escapeHtml(authorProfile.name || authorName)}</p>
              ${role ? `<p class="article-author-card__role">${escapeHtml(role)}</p>` : ''}
            </div>
          </div>
          ${bio ? `<p class="article-author-card__bio">${escapeHtml(bio)}</p>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderArticleDate(articleDate) {
  const formattedDate = formatArticleDate(articleDate);

  if (!formattedDate) {
    return '';
  }

  return `<p class="article-date-meta">${escapeHtml(formattedDate)}</p>`;
}

function renderSharePanel(article, siteUrl) {
  const articleUrl = `${siteUrl}/insights/articles/${article.slug}.html`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(article.title || 'Accelerator X Insight');

  return `
    <div class="article-share-panel" aria-label="Share this article">
      <div class="article-share-panel__icons">
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="article-share-panel__link" aria-label="Share on LinkedIn">LI</a>
        <a href="https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}" target="_blank" rel="noopener noreferrer" class="article-share-panel__link" aria-label="Share on X">X</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="article-share-panel__link" aria-label="Share on Facebook">FB</a>
      </div>
    </div>
  `;
}

async function build() {
  console.log('🚀 Starting Content Hub Build Engine...');

  const siteUrl = resolveSiteUrl();
  const authors = loadAuthors();
  
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
    const authorProfile = resolveAuthorProfile(frontmatter.author, authors);
    
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
    safeReplace('author_meta', renderAuthorMeta(frontmatter.author, authorProfile, frontmatter.date));
    safeReplace('article_date', renderArticleDate(frontmatter.date));
    safeReplace('share_panel', renderSharePanel({ ...frontmatter, slug }, siteUrl));
    
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
      authorProfile,
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
