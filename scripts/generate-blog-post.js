const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const FAL_API_KEY = process.env.FAL_API_KEY;
const FAL_API_URL = 'https://fal.run/fal-ai/bytedance/seedream/v4/text-to-image';

// Configuration
const CONFIG = {
  researchModel: 'perplexity/sonar-pro-search', // Perplexity for research
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
async function callOpenRouter(model, messages, temperature = 0.7) {
  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://chatrag.ai',
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
  return data.choices[0].message.content;
}

/**
 * Research a topic using Perplexity
 */
async function researchTopic(topic) {
  console.log(`🔍 Researching: ${topic}`);

  const messages = [
    {
      role: 'user',
      content: `Research the following topic in depth and provide key insights, recent developments, best practices, and important facts. Focus on information that would be valuable for a technical blog post aimed at developers and SaaS founders.

Topic: ${topic}

Provide a comprehensive research summary with:
- Key concepts and definitions
- Recent trends and developments
- Best practices and recommendations
- Real-world examples or case studies
- Common challenges and solutions
- Technical details where relevant`
    }
  ];

  const research = await callOpenRouter(CONFIG.researchModel, messages, 0.3);
  console.log('✅ Research completed');
  return research;
}

/**
 * Generate blog post using writing model
 */
async function generateBlogPost(topic, research) {
  console.log(`✍️  Writing blog post about: ${topic}`);

  const messages = [
    {
      role: 'user',
      content: `You are a technical blog writer for ChatRAG, a Next.js boilerplate for launching chatbot-agent SaaS businesses. Write an engaging, informative blog post based on the research provided.

Topic: ${topic}

Research:
${research}

Guidelines:
- Write a compelling headline (make it SEO-friendly and engaging)
- Include a brief meta description (150-160 characters)
- Write in a professional but approachable tone
- Use markdown formatting (headers, lists, code blocks where appropriate)
- Aim for 1200-1800 words
- Include practical examples and actionable insights
- Add a strong conclusion with key takeaways
- Naturally mention ChatRAG in the body where relevant, but don't make it overly promotional
- ALWAYS end with the following exact CTA section (after your conclusion):

---

## Ready to Build Your Own RAG-Powered Application?

If you're looking to implement RAG (Retrieval-Augmented Generation) for your own use case, [**ChatRAG**](https://www.chatrag.ai) provides a complete Next.js boilerplate to launch your chatbot or AI agent SaaS in minutes. Skip months of development and focus on what makes your application unique.

**Learn more at [chatrag.ai](https://www.chatrag.ai)**

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
- Abstract or conceptual representation (NO text, NO people, NO faces)
- Clean, minimalist style suitable for a SaaS blog
- Focus on technology, AI, data visualization, or abstract concepts
- Use colors that work well with a dark theme (blacks, blues, purples, oranges)

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
 * Main function
 */
async function main() {
  try {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY environment variable is not set');
    }

    if (!FAL_API_KEY) {
      console.warn('⚠️  FAL_API_KEY not set - images will not be generated');
    }

    // Select a topic (non-repeating until all are used)
    const topic = await selectTopic();
    console.log(`\n🎯 Selected topic: ${topic}\n`);

    // Step 1: Research the topic
    const research = await researchTopic(topic);

    // Step 2: Generate blog post
    const blogPost = await generateBlogPost(topic, research);

    // Step 3: Parse the post
    const parsedPost = parseBlogPost(blogPost);

    // Step 4: Generate image (if FAL_API_KEY is set)
    let imagePath = null;
    if (FAL_API_KEY) {
      const slug = createSlug(parsedPost.title);
      const imagePrompt = await generateImagePrompt(parsedPost.title, parsedPost.excerpt);
      imagePath = await generateImage(imagePrompt, slug);
    }

    // Step 5: Save the post
    const { filename } = await saveBlogPost(parsedPost, imagePath);

    console.log(`\n✨ Successfully generated blog post: ${filename}`);
    if (imagePath) {
      console.log(`🖼️  Hero image: ${imagePath}\n`);
    }

  } catch (error) {
    console.error('❌ Error generating blog post:', error.message);
    process.exit(1);
  }
}

main();
