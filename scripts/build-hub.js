const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const matter = require('gray-matter');
const { marked } = require('marked');
const { resolveComponentTokens, resolveSiteTokens, resolveArticleTokens } = require('./build-components');
const { extractFaqPairs, renderFaqJsonLd } = require('./hub-utils');

// Configuration
const CONTENT_DIR = path.join(__dirname, '../content/articles');
const AUTHORS_PATH = path.join(__dirname, '../content/data/authors.json');
const OFFERINGS_PATH = path.join(__dirname, '../content/data/offerings.json');
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

/**
 * Load a template file from the _templates directory.
 * @param {string} filename - Template filename (e.g. 'article.html')
 * @returns {string} Template file contents, or a minimal fallback if not found
 */
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

/**
 * Resolve the canonical site URL from environment variables, falling back to production.
 * @returns {string} Site URL with no trailing slash (e.g. 'https://accelerator-x.ai')
 */
function resolveSiteUrl() {
  const raw = process.env.SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://accelerator-x.ai';
  return String(raw).replace(/\/$/, '');
}

/**
 * Load the authors data file from content/data/authors.json.
 * @returns {Object[]} Array of author objects, or empty array if file is missing/invalid
 */
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

/**
 * Find an author's profile by name from the authors array.
 * @param {string} authorName - Author name as it appears in article frontmatter
 * @param {Object[]} authors - Authors array from loadAuthors()
 * @returns {Object|null} Matching author object, or null if not found
 */
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

const AVG_READING_SPEED_WPM = 200;

function computeReadTime(markdownBody) {
  const wordCount = markdownBody.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / AVG_READING_SPEED_WPM));
  return `${minutes} min read`;
}

// Maps the primary (first) tag to a filter bucket ID used by hub-filter.js.
// Canonical primary tags (Build Plan §10): Strategy | Capability | Tooling | Cases | Opinion
// Cases and Opinion route to existing buckets — no new pathway tile needed.
// Pathway tile href IDs in _templates/index.html must match the values here.
const TAG_FILTER_MAP = {
  'Strategy': 'strategy', 'Leadership': 'strategy', 'C-Suite': 'strategy', 'Opinion': 'strategy',
  'Capability': 'capability', 'Cases': 'capability',
  'Tooling': 'tooling', 'Frameworks': 'tooling', 'Future': 'tooling',
  'Agents': 'tooling', 'Workflows': 'tooling',
};

function resolveFilterTag(tags = [], slug = '') {
  for (const tag of tags) {
    if (TAG_FILTER_MAP[tag]) return TAG_FILTER_MAP[tag];
  }
  const known = Object.keys(TAG_FILTER_MAP).join(', ');
  console.warn(`  ⚠️  No recognised filter tag in [${tags.join(', ')}]${slug ? ` (${slug})` : ''}. Defaulting to 'capability'. Known tags: ${known}`);
  return 'capability';
}

function formatLabel(format) {
  return { article: 'Article', podcast: 'Podcast', video: 'Video' }[format] || 'Article';
}

function renderArticleTile(article) {
  const format = article.format || 'article';
  const filterTag = resolveFilterTag(article.tags, article.slug);
  const primaryTag = article.tags?.[0] || '';
  const formattedDate = formatArticleDate(article.published);
  const playBtn = `<div class="ax-article-tile__play" aria-hidden="true"><div class="ax-article-tile__play-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></div></div>`;
  const coverHtml = article.hero
    ? `\n  <div class="ax-article-tile__cover">\n    <img src="${escapeHtml(article.hero)}" alt="" loading="lazy" width="600" height="400">\n    ${format !== 'article' ? playBtn : ''}\n  </div>`
    : '';

  return `<article class="ax-article-tile" data-format="${escapeHtml(format)}" data-variant="standard" data-tag="${escapeHtml(filterTag)}">${coverHtml}
  <div class="ax-article-tile__body">
    <div class="ax-article-tile__meta">
      <span class="ax-article-tile__format">${escapeHtml(formatLabel(format))}</span>${primaryTag ? `\n      <span class="ax-article-tile__category">· ${escapeHtml(primaryTag)}</span>` : ''}
    </div>
    <h3 class="ax-article-tile__heading"><a href="${escapeHtml(article.url)}">${escapeHtml(article.title)}</a></h3>
    <p class="ax-article-tile__sub">${escapeHtml(article.excerpt || '')}</p>
    <div class="ax-article-tile__byline">
      <span class="ax-article-tile__author-date">${escapeHtml(article.author || '')}${formattedDate ? ` · ${formattedDate}` : ''}</span>
      <span class="ax-article-tile__duration">${escapeHtml(article.readTime || '')}</span>
    </div>
  </div>
</article>`;
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

/**
 * Render the LinkedIn + X share panel HTML for an article.
 * @param {Object} article - Article object with slug and title fields
 * @param {string} siteUrl - Canonical site URL (no trailing slash)
 * @returns {string} HTML string for the share panel
 */
function renderSharePanel(article, siteUrl) {
  const articleUrl = `${siteUrl}/insights/articles/${article.slug}.html`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(article.title || 'Accelerator X Insight');

  const linkedInSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
  const xSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;

  return `
    <div class="article-share-panel" aria-label="Share this article">
      <p class="article-share-panel__label">Share</p>
      <div class="article-share-panel__icons">
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="article-share-panel__link" aria-label="Share on LinkedIn">${linkedInSvg}</a>
        <a href="https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}" target="_blank" rel="noopener noreferrer" class="article-share-panel__link" aria-label="Share on X">${xSvg}</a>
      </div>
    </div>
  `;
}

/**
 * Main build entry point. Reads all Markdown articles, renders them via the article
 * template, generates the hub index page, and writes sitemap.xml.
 * @returns {Promise<void>}
 */
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
    if (frontmatter.author && !authorProfile) {
      const available = authors.map((a) => a.name).join(', ') || '(none loaded)';
      console.warn(`  ⚠️  Author "${frontmatter.author}" not found in authors.json (${file}). Available: ${available}`);
    }

    console.log(`- Building: ${frontmatter.title || file}`);

    // Validate OG description length (LinkedIn/Facebook minimum = 100 chars)
    const excerptLen = (frontmatter.excerpt || '').replace(/^"|"$/g, '').length;
    if (excerptLen < 100) {
      console.warn(`  ⚠️  OG description too short (${excerptLen} chars, min 100): ${file}`);
    }
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(content);

    // FAQPage JSON-LD (#43): derived from the article's own question-led H2s +
    // the answer prose directly below them, so the schema can never drift from
    // the visible content. Articles without question H2s simply get no block.
    const faqPairs = extractFaqPairs(content);
    if (faqPairs.length > 0) {
      console.log(`  ↳ FAQPage JSON-LD: ${faqPairs.length} Q&A pair(s)`);
    }

    // Load fresh template for every article
    let articleHtml = loadTemplate('article.html');

    const articleTokens = {
      title: frontmatter.title,
      author: frontmatter.author,
      published: frontmatter.published,
      format: frontmatter.format || 'article',
      category: frontmatter.tags?.[0] || '',
      read_time: computeReadTime(content),
      excerpt: frontmatter.excerpt,
      slug,
      site_url: siteUrl,
      content: htmlContent,
      author_meta: renderAuthorMeta(frontmatter.author, authorProfile, frontmatter.published),
      article_date: renderArticleDate(frontmatter.published),
      share_panel: renderSharePanel({ ...frontmatter, slug }, siteUrl),
      og_image: `${siteUrl}/assets/images/og-image-1200.png`,
      og_url: `${siteUrl}/insights/articles/${slug}.html`,
      author_linkedin: authorProfile ? authorProfile.linkedin || frontmatter.author : frontmatter.author,
      // Dynamic conversion tokens (10/10 UX elements) — lead_magnet_cta is required
      // (it renders a real CTA card as of #94; an empty value silently shipped a
      // blank pitch, and the token-substitution gate couldn't catch that). The
      // others remain optional, empty allowed.
      bluf: frontmatter.bluf,
      lead_magnet_cta: frontmatter.lead_magnet_cta,
      next_article_url: frontmatter.next_article_url,
      next_article_title: frontmatter.next_article_title,
      faq_jsonld: renderFaqJsonLd(faqPairs),
    };

    articleHtml = resolveArticleTokens(articleHtml, articleTokens, {
      required: ['title', 'author', 'published', 'excerpt', 'content', 'slug', 'site_url', 'lead_magnet_cta'],
      context: `Article "${frontmatter.title || file}"`,
    });

    // Save to /insights/articles/[slug].html
    const outPath = path.join(OUTPUT_DIR, 'articles', `${slug}.html`);
    fs.writeFileSync(outPath, resolveSiteTokens(resolveComponentTokens(articleHtml)));
    
    // Store metadata for the index page
    articles.push({
      ...frontmatter,
      authorProfile,
      slug,
      url: `/insights/articles/${slug}.html`,
      readTime: computeReadTime(content),
    });
  }

  // Generate Hub Index
  console.log('Generating Feed Index...');
  
  // Sort articles by published date descending
  articles.sort((a, b) => new Date(b.published) - new Date(a.published));

  let indexHtml = loadTemplate('index.html');

  indexHtml = indexHtml.replace(/{{site_url}}/g, siteUrl);

  const articlesListHtml = articles.map(article => renderArticleTile(article)).join('\n');

  indexHtml = indexHtml.replace(/{{articlesList}}/g, articlesListHtml);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), resolveSiteTokens(resolveComponentTokens(indexHtml)));

  // Generate sitemap.xml
  generateSitemap(articles, siteUrl);

  console.log('\n✅ Build complete! Assets generated in /insights');
}

/**
 * Load the URL paths of live offerings from offerings.json, so new offering
 * pages join the sitemap automatically instead of drifting out of it (the
 * five service-line pages were entirely missing from the sitemap until
 * 2026-08-05, #81 — the exact drift this derivation prevents).
 * @returns {string[]} Site-relative paths (e.g. '/what-we-do/company-enablement/')
 */
function loadLiveOfferingPaths() {
  try {
    const { offerings = [] } = JSON.parse(fs.readFileSync(OFFERINGS_PATH, 'utf-8'));
    return offerings
      .filter((o) => o.status === 'live' && typeof o.slug === 'string' && o.slug.startsWith('/'))
      .map((o) => o.slug);
  } catch (error) {
    console.warn(`⚠️ Could not read offerings for sitemap (${error.message}). Offering pages will be missing from sitemap.xml.`);
    return [];
  }
}

/**
 * Resolve an honest <lastmod> for a built page: the date of the last commit
 * that touched the file. The previous behaviour stamped every static URL with
 * the build date, which claimed "changed today" on every build — a signal
 * search engines learn to ignore. Files with uncommitted changes (or when git
 * is unavailable) fall back to today, which is then accurate.
 * @param {string} relPath - Repo-relative path of the built page
 * @param {string} repoRoot - Absolute repo root
 * @param {string} fallback - ISO date used when no git date is resolvable
 * @returns {string} ISO date (YYYY-MM-DD)
 */
function resolveLastmod(relPath, repoRoot, fallback) {
  try {
    const gitOpts = { cwd: repoRoot, stdio: ['ignore', 'pipe', 'ignore'] };
    // execFileSync (not execSync): paths come from offerings.json/article slugs —
    // repo-controlled, but arg-array invocation removes the shell-injection class.
    const dirty = execFileSync('git', ['status', '--porcelain', '--', relPath], gitOpts).toString().trim();
    if (dirty) return fallback;
    const committed = execFileSync('git', ['log', '-1', '--format=%cs', '--', relPath], gitOpts).toString().trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(committed) ? committed : fallback;
  } catch {
    return fallback;
  }
}

// Map a site-relative URL path to the built file that backs it.
function pathToFile(urlPath) {
  if (urlPath === '/') return 'index.html';
  return urlPath.endsWith('/') ? `${urlPath.slice(1)}index.html` : urlPath.slice(1);
}

/**
 * Generate and write sitemap.xml to the repo root.
 * @param {Object[]} articles - Array of article metadata objects with slug and date
 * @param {string} siteUrl - Canonical site URL (no trailing slash)
 * @returns {void}
 */
function generateSitemap(articles, siteUrl) {
  const REPO_ROOT = path.join(__dirname, '..');
  const today = new Date().toISOString().split('T')[0];

  const staticPaths = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/what-we-do/', changefreq: 'monthly', priority: '0.9' },
    { path: '/how-we-work/', changefreq: 'monthly', priority: '0.9' },
    ...loadLiveOfferingPaths().map((p) => ({ path: p, changefreq: 'monthly', priority: '0.8' })),
    // Door 2 lane hub — a real indexable money page, but not an offering, so it
    // can't derive from offerings.json (doors carry no slug). Caught missing by
    // the 2026-08-05 fresh-eyes review after the offerings-only derivation landed.
    { path: '/what-we-do/leadership-ai-coaching/', changefreq: 'monthly', priority: '0.8' },
    { path: '/about/', changefreq: 'monthly', priority: '0.8' },
    { path: '/contact/', changefreq: 'monthly', priority: '0.8' },
    { path: '/insights/', changefreq: 'weekly', priority: '0.8' },
    { path: '/faq/', changefreq: 'monthly', priority: '0.6' },
    // Cohort funnel page — public conversion page, deliberately indexable
    { path: '/programmes/leadership-cohort/', changefreq: 'monthly', priority: '0.6' },
    { path: '/privacy.html', changefreq: 'yearly', priority: '0.3' },
    { path: '/terms.html', changefreq: 'yearly', priority: '0.3' },
  ];

  const staticPages = staticPaths.map(({ path: urlPath, changefreq, priority }) => ({
    loc: `${siteUrl}${urlPath}`,
    changefreq,
    priority,
    lastmod: resolveLastmod(pathToFile(urlPath), REPO_ROOT, today),
  }));

  // Fallback is today, not frontmatter `published`: a dirty article file was just
  // (re)written by this build, so "changed today" is the accurate claim — the #93
  // quality refresh rewrote five articles while lastmod kept asserting their
  // original publish dates, which is the stale-lastmod failure #40 flagged.
  const articlePages = articles.map(article => ({
    loc: `${siteUrl}/insights/articles/${article.slug}.html`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: resolveLastmod(`insights/articles/${article.slug}.html`, REPO_ROOT, today),
  }));

  const allPages = [...staticPages, ...articlePages];

  const urlEntries = allPages.map(p => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

  const outPath = path.join(REPO_ROOT, 'sitemap.xml');
  fs.writeFileSync(outPath, xml);
  console.log(`  Sitemap: ${allPages.length} URL(s) written to sitemap.xml`);
}

build();
