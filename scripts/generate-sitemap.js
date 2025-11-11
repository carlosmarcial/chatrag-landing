#!/usr/bin/env node

/**
 * Generate sitemap.xml with all pages including blog posts
 * Resolves Google Search Console indexing issues
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://www.chatrag.ai';
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const BLOG_DIR = path.join(__dirname, '../content/blog');

// Static pages configuration
const staticPages = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/docs', changefreq: 'weekly', priority: '0.9' },
  { loc: '/blog', changefreq: 'daily', priority: '0.9' },

  // Documentation pages
  { loc: '/docs/quick-start', changefreq: 'weekly', priority: '0.9' },
  { loc: '/docs/prerequisites', changefreq: 'monthly', priority: '0.7' },
  { loc: '/docs/database-setup', changefreq: 'monthly', priority: '0.8' },
  { loc: '/docs/authentication', changefreq: 'monthly', priority: '0.7' },
  { loc: '/docs/api-keys', changefreq: 'monthly', priority: '0.7' },
  { loc: '/docs/config-ui', changefreq: 'monthly', priority: '0.7' },
  { loc: '/docs/ai-models', changefreq: 'monthly', priority: '0.7' },
  { loc: '/docs/system-prompt', changefreq: 'monthly', priority: '0.7' },
  { loc: '/docs/branding', changefreq: 'monthly', priority: '0.6' },
  { loc: '/docs/rag-system', changefreq: 'weekly', priority: '0.9' },
  { loc: '/docs/document-processing', changefreq: 'monthly', priority: '0.8' },
  { loc: '/docs/media-generation', changefreq: 'monthly', priority: '0.6' },
  { loc: '/docs/whatsapp', changefreq: 'monthly', priority: '0.7' },
  { loc: '/docs/mcp-integration', changefreq: 'monthly', priority: '0.7' },
  { loc: '/docs/payments', changefreq: 'monthly', priority: '0.8' },
  { loc: '/docs/deployment', changefreq: 'monthly', priority: '0.8' },
  { loc: '/docs/troubleshooting', changefreq: 'weekly', priority: '0.7' },
  { loc: '/docs/faq', changefreq: 'monthly', priority: '0.7' },

  // AI Discovery Files
  { loc: '/llms.txt', changefreq: 'monthly', priority: '0.8' },
  { loc: '/llms-full.txt', changefreq: 'monthly', priority: '0.8' },
];

/**
 * Get all blog posts from markdown files
 */
function getBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.warn('Blog directory does not exist:', BLOG_DIR);
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);

    // Only include published posts
    if (data.published === false) continue;

    const slug = file.replace(/\.md$/, '');
    const date = data.date || new Date().toISOString();

    posts.push({
      loc: `/blog/${slug}`,
      lastmod: date,
      changefreq: 'monthly',
      priority: '0.8',
    });
  }

  return posts.sort((a, b) => b.lastmod.localeCompare(a.lastmod));
}

/**
 * Format date to W3C datetime format
 */
function formatDate(date) {
  if (typeof date === 'string') {
    // If it's already a date string, parse it
    const d = new Date(date);
    return d.toISOString();
  }
  return new Date().toISOString();
}

/**
 * Generate sitemap XML
 */
function generateSitemap() {
  const blogPosts = getBlogPosts();
  const allPages = [...staticPages, ...blogPosts];

  console.log(`Generating sitemap with ${allPages.length} pages...`);
  console.log(`- Static pages: ${staticPages.length}`);
  console.log(`- Blog posts: ${blogPosts.length}`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages.map(page => {
  const lastmod = page.lastmod ? `
    <lastmod>${formatDate(page.lastmod)}</lastmod>` : `
    <lastmod>${formatDate(new Date())}</lastmod>`;

  return `  <url>
    <loc>${SITE_URL}${page.loc}</loc>${lastmod}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, xml);
  console.log(`✓ Sitemap generated successfully at: ${SITEMAP_PATH}`);

  // Generate blog post URLs list for reference
  if (blogPosts.length > 0) {
    console.log('\nBlog posts included:');
    blogPosts.forEach(post => console.log(`  - ${SITE_URL}${post.loc}`));
  }
}

// Run the generator
try {
  generateSitemap();
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
