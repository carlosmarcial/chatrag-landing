const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const INDEXNOW_API_KEY = '621d113283d442c3a7e0b270dcbcb8a9';
const INDEXNOW_URL = 'https://www.bing.com/indexnow';
const BLOG_CONTENT_PATH = path.join(__dirname, '../content/blog');

/**
 * Get slug from markdown filename
 */
function getSlugFromFilename(filename) {
  // Remove date prefix and .md extension
  // Example: 2025-11-08-blog-title.md -> blog-title
  const match = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
  return match ? match[1] : null;
}

/**
 * Get all blog post URLs
 */
async function getBlogUrls() {
  try {
    const files = await fs.readdir(BLOG_CONTENT_PATH);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    const urls = mdFiles
      .map(file => {
        const slug = getSlugFromFilename(file);
        return slug ? `https://www.chatrag.ai/blog/${slug}` : null;
      })
      .filter(url => url !== null);

    console.log(`📋 Found ${urls.length} blog posts:`);
    urls.forEach((url, index) => {
      console.log(`   ${index + 1}. ${url}`);
    });

    return urls;
  } catch (error) {
    console.error('Error reading blog directory:', error.message);
    throw error;
  }
}

/**
 * Submit URLs to Bing IndexNow
 */
async function submitToIndexNow(urls) {
  console.log(`\n🔔 Submitting ${urls.length} blog URLs to Bing IndexNow...`);

  try {
    const response = await fetch(INDEXNOW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        host: 'www.chatrag.ai',
        key: INDEXNOW_API_KEY,
        keyLocation: `https://www.chatrag.ai/${INDEXNOW_API_KEY}.txt`,
        urlList: urls
      })
    });

    if (response.ok || response.status === 202) {
      console.log('✅ Successfully submitted all blog URLs to Bing IndexNow');
      console.log(`   Status: ${response.status}`);
      return true;
    } else {
      const errorText = await response.text();
      console.error(`❌ IndexNow submission failed: ${response.status}`);
      console.error(`   Error: ${errorText}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to submit to IndexNow:', error.message);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting IndexNow submission for existing blog posts\n');

  try {
    // Get all blog URLs
    const urls = await getBlogUrls();

    if (urls.length === 0) {
      console.log('⚠️  No blog posts found');
      return;
    }

    // Submit to IndexNow
    const success = await submitToIndexNow(urls);

    if (success) {
      console.log('\n✅ Done! Your blog posts have been submitted to Bing for instant indexing.');
      console.log('💡 Note: It may take a few hours to 24 hours for them to appear in Bing search results.');
    } else {
      console.log('\n❌ Submission failed. Please check the error messages above.');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
