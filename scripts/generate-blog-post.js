const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const EXA_API_KEY = process.env.EXA_API_KEY || 'adef5c67-4044-4897-bc44-ed0a89a142c2';
const EXA_API_URL = 'https://api.exa.ai/search';
const FAL_API_KEY = process.env.FAL_API_KEY;
const FAL_API_URL = 'https://fal.run/fal-ai/bytedance/seedream/v4/text-to-image';
const INDEXNOW_API_KEY = '621d113283d442c3a7e0b270dcbcb8a9';
const INDEXNOW_URL = 'https://www.bing.com/indexnow';

// Configuration
const CONFIG = {
  writingModel: 'x-ai/grok-4', // Grok 4 for writing
  blogContentPath: path.join(__dirname, '../content/blog'),
  blogImagesPath: path.join(__dirname, '../public/images/blog'),
  topicsFilePath: path.join(__dirname, 'topics.json')
};

/**
 * Load topics from JSON file
 */
async function loadTopics() {
  try {
    const fileContents = await fs.readFile(CONFIG.topicsFilePath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading topics file:', error.message);
    throw new Error('Failed to load topics.json. Make sure the file exists in the scripts folder.');
  }
}

/**
 * Save topics back to JSON file
 */
async function saveTopics(topicsData) {
  await fs.writeFile(CONFIG.topicsFilePath, JSON.stringify(topicsData, null, 2), 'utf-8');
}

/**
 * Select an unused topic (or reset if all topics are used)
 */
async function selectTopic() {
  const topicsData = await loadTopics();

  // Get available topics (not yet used)
  let availableTopics = topicsData.topics.filter(
    topic => !topicsData.usedTopics.includes(topic)
  );

  // If all topics have been used, reset the usedTopics array
  if (availableTopics.length === 0) {
    console.log('🔄 All topics have been used! Resetting topic pool...');
    topicsData.usedTopics = [];
    availableTopics = topicsData.topics;
  }

  // Select a random topic from available topics
  const selectedTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)];

  // Mark topic as used
  topicsData.usedTopics.push(selectedTopic);
  await saveTopics(topicsData);

  console.log(`📊 Topics used: ${topicsData.usedTopics.length}/${topicsData.topics.length}`);

  return selectedTopic;
}

/**
 * Call OpenRouter API
 */
async function callOpenRouter(model, messages, temperature = 0.7, returnFullResponse = false) {
  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://www.chatrag.ai',
      'X-Title': 'ChatRAG Blog Generator'
    },
    body: JSON.stringify({
      model,
      messages,
      temperature
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();

  // Return full response if requested (to get citations)
  if (returnFullResponse) {
    return data;
  }

  return data.choices[0].message.content;
}

/**
 * Research a topic using Exa.ai
 */
async function researchTopic(topic) {
  console.log(`🔍 Researching with Exa.ai: ${topic}`);

  try {
    // Call Exa API for search with contents
    const response = await fetch(EXA_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': EXA_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `Latest research, best practices, and insights about: ${topic}`,
        numResults: 10,
        text: true,
        highlights: true,
        type: 'neural',
        category: 'blog post'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Exa API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const results = data.results || [];

    console.log(`✅ Found ${results.length} sources from Exa`);

    // Extract content and URLs from results
    let researchContent = `Research findings on "${topic}":\n\n`;
    const sources = [];

    results.forEach((result, index) => {
      // Add to research content
      researchContent += `\n## Source ${index + 1}: ${result.title}\n`;
      researchContent += `URL: ${result.url}\n`;
      if (result.author) {
        researchContent += `Author: ${result.author}\n`;
      }
      if (result.publishedDate) {
        researchContent += `Published: ${new Date(result.publishedDate).toLocaleDateString()}\n`;
      }
      researchContent += `\nContent:\n${result.text || result.highlights?.join('\n') || 'No content available'}\n`;
      researchContent += '\n---\n';

      // Store source URL
      sources.push(result.url);
    });

    console.log(`📚 Compiled research from ${sources.length} verified sources`);

    return {
      content: researchContent,
      sources: sources
    };

  } catch (error) {
    console.error('❌ Exa research failed:', error.message);
    throw error;
  }
}

/**
 * Generate blog post using writing model
 */
async function generateBlogPost(topic, researchData) {
  console.log(`✍️  Writing blog post about: ${topic}`);

  const { content: research, sources } = researchData;

  // Format sources for the prompt
  let sourcesSection = '';
  if (sources && sources.length > 0) {
    sourcesSection = `\n\nSOURCE REFERENCES (VERIFIED URLS - incorporate these links naturally throughout your blog post):
${sources.map((url, index) => `[${index + 1}] ${url}`).join('\n')}

CRITICAL INSTRUCTIONS:
- These URLs are VERIFIED and come directly from Exa's research - they are all real, working links
- You MUST incorporate 5-8 of these source links naturally throughout your blog post
- Use proper markdown link syntax: [descriptive anchor text](url)
- Place them contextually where they add value to support your points
- Use descriptive anchor text that indicates what the link is about
- Distribute links throughout the article, not just at the end
- These are the ONLY external links you should use (besides chatrag.ai)`;
  } else {
    // Fallback when Exa doesn't return results
    sourcesSection = `\n\nCRITICAL LINKING REQUIREMENT:
You MUST include 5-8 external source links to REAL, VERIFIED, WORKING websites in your blog post.

STRICT RULES:
- ONLY use URLs you are 100% CERTAIN exist and are accessible
- Use well-known, established domains (github.com, medium.com, dev.to, official documentation sites)
- For research papers, use arxiv.org, papers.neurips.cc, or ACL anthology
- For tech blogs, use engineering.{company}.com (e.g., engineering.uber.com, netflixtechblog.com)
- For documentation, use official docs sites (docs.python.org, react.dev, nextjs.org)
- DO NOT make up URLs or guess at subdirectories
- DO NOT create fake blog post URLs or non-existent pages
- If unsure about a specific URL, use a more general domain URL instead

BETTER TO HAVE 3 REAL LINKS THAN 8 FAKE ONES.

Use proper markdown link syntax: [descriptive anchor text](url)
Place links naturally where they support your points.`;
  }

  const messages = [
    {
      role: 'user',
      content: `You are a technical blog writer for ChatRAG, a Next.js boilerplate for launching chatbot-agent SaaS businesses. Write an engaging, informative blog post based on the research provided.

Topic: ${topic}

Research:
${research}${sourcesSection}

Guidelines:
- Write a compelling headline (make it SEO-friendly and engaging)

**🚫 FORBIDDEN TITLE WORDS (NEVER USE THESE):**
Revolutionizing, Revolutionize, Revolutionizes, Transforming, Transform, Transforms, Unlocking, Unlock, Elevating, Elevate, Elevates, Streamlining, Streamline, Navigating, Navigate, Decoding, Decode, Mastering, Master, Harnessing, Harness, Powering, Power

**✅ REQUIRED TITLE DIVERSITY:**
Each title MUST use a different structure. Rotate between these styles:
1. Question Format: "Can RAG Solve [Problem] in [Industry]?"
2. Benefit-Driven: "Three Ways RAG Improves [Process]"
3. Comparison: "RAG vs Traditional [Method]: A [Industry] Perspective"
4. Case Study: "How [Industry] Uses RAG for [Outcome]"
5. Technical Deep Dive: "Building [Solution] with Retrieval-Augmented Generation"
6. Problem-Solution: "The [Industry] Challenge RAG Was Built to Solve"
7. Future-Focused: "What RAG Means for the Future of [Field]"
8. Practical Guide: "Implementing RAG in [Industry]: A Developer's Guide"
9. Data-Driven: "Why [X%] of [Industry] Leaders Are Adopting RAG"
10. Story-Driven: "From [Problem] to [Solution]: RAG in [Context]"

- Include a brief meta description (150-160 characters)

**🚫 FORBIDDEN OPENING PHRASES (NEVER START WITH THESE):**
"In the fast-paced world of...", "In an era where...", "In today's...", "In the evolving...", "In the competitive...", "is emerging as a game-changer", "is stepping in to", "offers a game-changing", "stands out as"

**✅ REQUIRED OPENING DIVERSITY:**
Vary your opening paragraphs. Use these approaches:
- Start with a specific statistic or data point
- Begin with a real-world scenario or problem
- Open with a provocative question
- Lead with an industry expert quote
- Start with a concrete example
- Begin with historical context
- Open with a surprising fact

- Write in a professional but approachable tone, varying sentence structure and length
- Use markdown formatting (headers, lists, code blocks where appropriate)
- Aim for 1200-1800 words
- Include practical examples and actionable insights
- Add a strong conclusion with key takeaways
- Naturally mention ChatRAG in the body where relevant, but don't make it overly promotional
- **CRITICAL**: Incorporate 5-8 external source links throughout the blog post using markdown syntax: [descriptive text](url)
- Place links naturally where they support your points (e.g., when mentioning statistics, case studies, or best practices)
- Use descriptive anchor text that indicates what the link is about (e.g., "according to recent research" or "industry best practices")
- Distribute links throughout the article, not just at the end
- **DO NOT** include any CTA sections at the end - the template will add a styled CTA automatically
- Use proper markdown syntax
- DO NOT include word count, character count, or any metadata at the end
- DO NOT add any text after the ---END CONTENT--- marker

Format your response EXACTLY as follows:

TITLE: [Your headline here]
DESCRIPTION: [Your meta description here]
EXCERPT: [A 2-3 sentence excerpt]
TAGS: [3-5 relevant tags, comma-separated]

---START CONTENT---
[Your full blog post content in markdown]
---END CONTENT---

IMPORTANT: Do not add anything after ---END CONTENT---. No word counts, no notes, nothing.`
    }
  ];

  const blogPost = await callOpenRouter(CONFIG.writingModel, messages, 0.8);
  console.log('✅ Blog post written');
  return blogPost;
}

/**
 * Parse the generated blog post
 */
function parseBlogPost(content) {
  const titleMatch = content.match(/TITLE:\s*(.+)/);
  const descMatch = content.match(/DESCRIPTION:\s*(.+)/);
  const excerptMatch = content.match(/EXCERPT:\s*(.+)/);
  const tagsMatch = content.match(/TAGS:\s*(.+)/);
  const contentMatch = content.match(/---START CONTENT---\s*([\s\S]+?)\s*---END CONTENT---/);

  // Extract content and strip word count if present
  let blogContent = contentMatch ? contentMatch[1].trim() : content;

  // Remove word count patterns like "(Word count: 1428)" or "Word count: 1428" from end
  blogContent = blogContent.replace(/\s*\(?\s*[Ww]ord\s+[Cc]ount:\s*\d+\s*\)?\s*$/g, '');

  return {
    title: titleMatch ? titleMatch[1].trim() : 'Untitled Post',
    description: descMatch ? descMatch[1].trim() : '',
    excerpt: excerptMatch ? excerptMatch[1].trim() : '',
    tags: tagsMatch ? tagsMatch[1].trim().split(',').map(t => t.trim()) : [],
    content: blogContent
  };
}

/**
 * Validate that blog post contains external links
 */
function validateBlogPostLinks(content) {
  // Match markdown links [text](url) where url is http/https
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  const links = [...content.matchAll(linkRegex)];

  // Filter out chatrag.ai links (we want external links only)
  const externalLinks = links.filter(match => !match[2].includes('chatrag.ai'));

  const linkCount = externalLinks.length;

  console.log(`🔗 Found ${linkCount} external links in blog post`);

  if (linkCount < 3) {
    console.warn(`⚠️  Warning: Blog post contains only ${linkCount} external links (recommended: 5-8)`);
  } else {
    console.log(`✅ Blog post has sufficient external links`);
  }

  return {
    totalLinks: linkCount,
    links: externalLinks.map(match => ({ text: match[1], url: match[2] }))
  };
}

/**
 * Generate image prompt based on blog post
 */
async function generateImagePrompt(title, excerpt) {
  console.log('🎨 Generating image prompt...');

  const messages = [
    {
      role: 'user',
      content: `Create a detailed image generation prompt for a blog post hero image. The prompt should be suitable for FLUX or Stable Diffusion.

Blog Title: ${title}
Blog Excerpt: ${excerpt}

Requirements:
- Professional, modern, tech-focused aesthetic
- **CRITICAL - 50/50 BALANCE**: Image MUST combine both:
  * 50% ABSTRACT ELEMENTS: Geometric shapes, gradient flows, glowing particles, light rays, digital grids, wave patterns
  * 50% TANGIBLE SUBJECT ELEMENTS: Recognizable objects/icons directly related to the blog topic (e.g., healthcare = medical symbols/stethoscope, manufacturing = factory/machinery, sports = equipment/field, education = books/learning, etc.)
- The tangible elements should be stylized and modern, NOT photorealistic, but clearly recognizable
- Clean, minimalist style suitable for a SaaS blog (NO text, NO people, NO faces, NO numbers, NO letters)
- MUST incorporate the ChatRAG brand gradient colors: vibrant electric blue, warm orange-amber, and bold red tones
- Use these gradient colors as the primary color scheme throughout the image creating a blue-to-orange-to-red gradient flow
- Dark background with glowing gradient accents
- Modern, sleek, and professional appearance
- Absolutely NO TEXT or alphanumeric characters should appear in the image
- The subject-specific elements should be integrated naturally with the abstract elements, not separated

Respond with ONLY the image prompt, no other text. Make it detailed and specific (50-80 words).`
    }
  ];

  const prompt = await callOpenRouter(CONFIG.writingModel, messages, 0.7);
  console.log('✅ Image prompt generated');
  return prompt.trim();
}

/**
 * Generate image using Fal.ai
 */
async function generateImage(prompt, slug) {
  console.log('🖼️  Generating image with Fal.ai...');

  try {
    const response = await fetch(FAL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        width: 1024,
        height: 576,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Fal.ai API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const imageUrl = data.images[0].url;

    // Download the image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.buffer();

    // Save the image
    const filename = `${slug}.png`;
    const filepath = path.join(CONFIG.blogImagesPath, filename);

    // Create images directory if it doesn't exist
    await fs.mkdir(CONFIG.blogImagesPath, { recursive: true });
    await fs.writeFile(filepath, imageBuffer);

    console.log('✅ Image generated and saved');
    return `/images/blog/${filename}`;

  } catch (error) {
    console.error('⚠️  Image generation failed:', error.message);
    console.log('⚠️  Continuing without image...');
    return null;
  }
}

/**
 * Create slug from title
 */
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Save blog post as markdown file
 */
async function saveBlogPost(parsedPost, imagePath = null) {
  const date = new Date().toISOString().split('T')[0];
  const slug = createSlug(parsedPost.title);
  const filename = `${date}-${slug}.md`;
  const filepath = path.join(CONFIG.blogContentPath, filename);

  // Create content/blog directory if it doesn't exist
  await fs.mkdir(CONFIG.blogContentPath, { recursive: true });

  const frontmatter = `---
title: "${parsedPost.title}"
date: "${new Date().toISOString()}"
description: "${parsedPost.description}"
excerpt: "${parsedPost.excerpt}"
tags: [${parsedPost.tags.map(t => `"${t}"`).join(', ')}]
author: "ChatRAG AI"
image: "${imagePath || ''}"
published: true
---

`;

  const fullContent = frontmatter + parsedPost.content;

  await fs.writeFile(filepath, fullContent, 'utf-8');
  console.log(`✅ Blog post saved: ${filename}`);

  return { filename, slug };
}

/**
 * Submit URL to Bing via IndexNow
 */
async function submitToIndexNow(url) {
  console.log(`🔔 Submitting to Bing IndexNow: ${url}`);

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
        urlList: [url]
      })
    });

    if (response.ok) {
      console.log('✅ Successfully submitted to Bing IndexNow');
      return true;
    } else if (response.status === 202) {
      console.log('✅ URL accepted by Bing IndexNow (202)');
      return true;
    } else {
      const errorText = await response.text();
      console.warn(`⚠️  IndexNow submission warning: ${response.status} - ${errorText}`);
      return false;
    }
  } catch (error) {
    console.error('⚠️  Failed to submit to IndexNow:', error.message);
    console.log('⚠️  Continuing without IndexNow submission...');
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY environment variable is not set');
    }

    if (!EXA_API_KEY) {
      throw new Error('EXA_API_KEY is not set');
    }

    if (!FAL_API_KEY) {
      console.warn('⚠️  FAL_API_KEY not set - images will not be generated');
    }

    console.log('🔧 Using Exa.ai for research and Grok 4 for writing\n');

    // Select a topic (non-repeating until all are used)
    const topic = await selectTopic();
    console.log(`\n🎯 Selected topic: ${topic}\n`);

    // Step 1: Research the topic
    const researchData = await researchTopic(topic);

    // Step 2: Generate blog post
    const blogPost = await generateBlogPost(topic, researchData);

    // Step 3: Parse the post
    const parsedPost = parseBlogPost(blogPost);

    // Step 3.5: Validate links in blog post
    const linkValidation = validateBlogPostLinks(parsedPost.content);

    // Step 4: Generate image (if FAL_API_KEY is set)
    let imagePath = null;
    if (FAL_API_KEY) {
      const slug = createSlug(parsedPost.title);
      const imagePrompt = await generateImagePrompt(parsedPost.title, parsedPost.excerpt);
      imagePath = await generateImage(imagePrompt, slug);
    }

    // Step 5: Save the post
    const { filename, slug } = await saveBlogPost(parsedPost, imagePath);

    // Step 6: Submit to Bing IndexNow
    const blogUrl = `https://www.chatrag.ai/blog/${slug}`;
    await submitToIndexNow(blogUrl);

    console.log(`\n✨ Successfully generated blog post: ${filename}`);
    console.log(`🌐 Blog URL: ${blogUrl}`);
    if (imagePath) {
      console.log(`🖼️  Hero image: ${imagePath}`);
    }
    console.log(`🔗 External links: ${linkValidation.totalLinks}`);
    if (linkValidation.totalLinks > 0) {
      console.log(`📚 Sample sources included:`);
      linkValidation.links.slice(0, 3).forEach(link => {
        console.log(`   - ${link.text}: ${link.url}`);
      });
    }
    console.log('');

  } catch (error) {
    console.error('❌ Error generating blog post:', error.message);
    process.exit(1);
  }
}

main();
