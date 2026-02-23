const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

// Configuration
const CONTENT_DIR = path.join(__dirname, "../content/articles");
const OUTPUT_DIR = path.join(__dirname, "../insights");
const TEMPLATES_DIR = path.join(__dirname, "../_templates");

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(path.join(OUTPUT_DIR, "articles"))) {
  fs.mkdirSync(path.join(OUTPUT_DIR, "articles"), { recursive: true });
}

// Ensure templates directory exists (create a dummy one if it doesn't)
if (!fs.existsSync(TEMPLATES_DIR)) {
  fs.mkdirSync(TEMPLATES_DIR, { recursive: true });
}

// Simple base template parser since we haven't built the real UI templates yet
const getTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{title}} | Accelerator X Insights</title>
  <meta name="description" content="{{excerpt}}">
  <meta property="og:title" content="{{title}}">
  <meta property="og:description" content="{{excerpt}}">
</head>
<body style="font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem;">
  <nav><a href="/insights/index.html">← Back to Insights</a></nav>
  <header>
    <h1>{{title}}</h1>
    <p><strong>By {{author}}</strong> | {{date}} | Category: {{category}}</p>
  </header>
  <hr>
  <main>
    {{content}}
  </main>
</body>
</html>
`;

// Simple index template
const getIndexTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Accelerator X Insights | The Authority Engine</title>
</head>
<body style="font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem;">
  <header>
    <h1>Accelerator X Insights</h1>
    <p>Deep strategy, real implementation.</p>
  </header>
  <hr>
  <main>
    <h2>Latest Articles</h2>
    <ul>
      {{articlesList}}
    </ul>
  </main>
</body>
</html>
`;

async function build() {
  console.log("🚀 Starting Content Hub Build Engine...");

  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn(
      `⚠️ Content directory not found: ${CONTENT_DIR}. Creating it...`,
    );
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    return;
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"));
  const articles = [];

  for (const file of files) {
    const rawContent = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");

    // Parse frontmatter and content
    const { data: frontmatter, content } = matter(rawContent);
    const slug = frontmatter.slug || file.replace(".md", "");

    console.log(`- Building: ${frontmatter.title || file}`);

    // Convert markdown to HTML
    const htmlContent = marked.parse(content);

    // Generate the page
    let finalHtml = getTemplate()
      .replace(/{{title}}/g, frontmatter.title || "Untitled")
      .replace(/{{author}}/g, frontmatter.author || "Accelerator X")
      .replace(/{{date}}/g, frontmatter.date || "")
      .replace(/{{category}}/g, frontmatter.category || "Dispatch")
      .replace(/{{excerpt}}/g, frontmatter.excerpt || "")
      .replace(/{{content}}/g, htmlContent);

    // Save to /insights/articles/[slug].html
    const outPath = path.join(OUTPUT_DIR, "articles", `${slug}.html`);
    fs.writeFileSync(outPath, finalHtml);

    // Store metadata for the index page
    articles.push({
      ...frontmatter,
      slug,
      url: `/insights/articles/${slug}.html`,
    });
  }

  // Generate Hub Index
  console.log("Generating Feed Index...");

  // Sort articles by date descending
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));

  const articlesListHtml = articles
    .map(
      (article) => `
    <li>
      <h3><a href="${article.url}">${article.title}</a></h3>
      <p><em>${article.date} — ${article.category}</em></p>
      <p>${article.excerpt}</p>
    </li>
  `,
    )
    .join("");

  const indexHtml = getIndexTemplate().replace(
    "{{articlesList}}",
    articlesListHtml,
  );
  fs.writeFileSync(path.join(OUTPUT_DIR, "index.html"), indexHtml);

  console.log("\n✅ Build complete! Assets generated in /insights");
}

build();
