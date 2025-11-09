const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const INDEXNOW_API_KEY = '621d113283d442c3a7e0b270dcbcb8a9';
const INDEXNOW_URL = 'https://www.bing.com/indexnow';
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

/**
 * Parse sitemap.xml and extract all URLs
 */
async function parseSitemap() {
  try {
    const sitemapContent = await fs.readFile(SITEMAP_PATH, 'utf-8');
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);

    if (!urlMatches) {
      throw new Error('No URLs found in sitemap');
    }

    const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
    console.log(`📋 Found ${urls.length} URLs in sitemap`);
    return urls;
  } catch (error) {
    console.error('Error reading sitemap:', error.message);
    throw error;
  }
}

/**
 * Submit URLs to Bing IndexNow
 */
async function submitToIndexNow(urls) {
  console.log(`🔔 Submitting ${urls.length} URLs to Bing IndexNow...`);

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
      console.log('✅ Successfully submitted all URLs to Bing IndexNow');
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
 * Submit URLs in batches (IndexNow supports up to 10,000 URLs per request)
 */
async function submitInBatches(urls, batchSize = 100) {
  const batches = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }

  console.log(`📦 Submitting ${batches.length} batch(es) of URLs...`);

  const results = [];
  for (let i = 0; i < batches.length; i++) {
    console.log(`\n🔄 Processing batch ${i + 1}/${batches.length}...`);
    const success = await submitToIndexNow(batches[i]);
    results.push(success);

    // Add delay between batches to avoid rate limiting
    if (i < batches.length - 1) {
      console.log('⏳ Waiting 2 seconds before next batch...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  const successCount = results.filter(r => r).length;
  console.log(`\n📊 Results: ${successCount}/${batches.length} batches submitted successfully`);

  return successCount === batches.length;
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting IndexNow submission for chatrag.ai sitemap\n');

  try {
    // Parse sitemap
    const urls = await parseSitemap();

    // Submit to IndexNow
    await submitInBatches(urls);

    console.log('\n✅ Done! Your URLs have been submitted to Bing for instant indexing.');
    console.log('💡 Note: Google doesn\'t support IndexNow. For Google, submit the sitemap manually in Search Console.');
  } catch (error) {
    console.error('\n❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
