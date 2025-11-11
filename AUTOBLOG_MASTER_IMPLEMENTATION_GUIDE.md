# 🤖 Complete AI Blog Automation System - Master Implementation Guide v2.0

**Everything needed to implement an automated blog with AI research, writing, image generation, and smart topic management**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Requirements](#requirements)
3. [File Structure](#file-structure)
4. [Complete File Contents](#complete-file-contents)
5. [Setup Instructions](#setup-instructions)
6. [Configuration Guide](#configuration-guide)
7. [Managing Topics](#managing-topics)
8. [Testing & Verification](#testing--verification)
9. [Troubleshooting](#troubleshooting)

---

## Overview

### What This System Does

Automatically generates blog posts with:
- ✅ **Research** via Perplexity (real-time web data)
- ✅ **Writing** via Grok or any AI model (via OpenRouter)
- ✅ **Images** via Fal.ai FLUX (hero images)
- ✅ **Smart Topics** - No repeats until all topics are used
- ✅ **Publishing** via GitHub Actions (CRON-based)
- ✅ **Display** via Next.js 16 App Router

### Key Features

🎯 **Smart Topic Management**
- Topics in separate easy-to-edit file
- No repeats until all topics covered
- Automatic tracking and reset
- Progress indicator

🎨 **AI-Powered Content**
- Perplexity for research
- Grok for writing
- Fal.ai for images
- Fully automated

⚡ **Production Ready**
- Next.js 16 App Router
- TypeScript support
- SEO optimized
- Responsive design

### Technologies Used

- **Next.js 16** (App Router)
- **TypeScript** for blog utilities
- **Node.js** for generator script
- **GitHub Actions** for automation
- **OpenRouter API** (Perplexity + Grok)
- **Fal.ai API** (FLUX image generation)

### Cost

- **Per post**: ~$0.125-0.225
  - Perplexity research: $0.01-0.03
  - Grok writing: $0.06-0.17
  - Fal.ai image: $0.025
- **Monthly** (weekly posts): ~$0.50-1/month
- **Monthly** (daily posts): ~$4-7/month

---

## Requirements

### API Keys Required

1. **OpenRouter API Key**
   - Get from: https://openrouter.ai/
   - Used for: Perplexity (research) + Grok (writing)
   - Add to GitHub Secrets as: `OPENROUTER_API_KEY`

2. **Fal.ai API Key**
   - Get from: https://fal.ai/
   - Used for: FLUX image generation
   - Add to GitHub Secrets as: `FAL_API_KEY`

### NPM Dependencies

Install in project root:
```bash
npm install gray-matter remark remark-html
```

Install in scripts folder:
```bash
cd scripts && npm install
```

### Tech Stack Requirements

- Next.js 16 (App Router)
- Node.js 20+
- GitHub repository with Actions enabled
- Git configured

---

## File Structure

```
your-chatrag-repo/
│
├── .github/
│   └── workflows/
│       └── generate-blog-post.yml       # GitHub Actions CRON workflow
│
├── app/
│   └── blog/
│       ├── page.tsx                     # Blog listing page
│       └── [slug]/
│           └── page.tsx                 # Individual post page
│
├── content/
│   └── blog/
│       └── *.md                         # Auto-generated blog posts
│
├── lib/
│   └── blog.ts                          # Blog utility functions
│
├── public/
│   └── images/
│       └── blog/
│           └── *.png                    # Auto-generated images
│
└── scripts/
    ├── package.json                     # Script dependencies
    ├── topics.json                      # ⭐ YOUR TOPICS HERE (easy to edit!)
    ├── generate-blog-post.js            # Main generator script
    └── test-generate.js                 # Local testing script
```

---

## Complete File Contents

### 1. `.github/workflows/generate-blog-post.yml`

```yaml
name: Generate AI Blog Post

on:
  schedule:
    # Runs every Monday at 9 AM UTC
    - cron: '0 9 * * 1'
  workflow_dispatch: # Allows manual trigger

jobs:
  generate-post:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          cd scripts
          npm install
      
      - name: Generate blog post
        env:
          OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
          FAL_API_KEY: ${{ secrets.FAL_API_KEY }}
        run: |
          cd scripts
          node generate-blog-post.js
      
      - name: Commit and push if changes
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add content/blog/*.md public/images/blog/*.png scripts/topics.json
          git diff --staged --quiet || (git commit -m "🤖 Auto-generated blog post [skip ci]" && git push)
```

---

### 2. `scripts/package.json`

```json
{
  "name": "chatrag-blog-generator",
  "version": "1.0.0",
  "description": "Automated blog post generator using AI",
  "main": "generate-blog-post.js",
  "scripts": {
    "generate": "node generate-blog-post.js"
  },
  "dependencies": {
    "node-fetch": "^2.7.0"
  }
}
```

---

### 3. `scripts/topics.json` ⭐ NEW - YOUR TOPICS HERE!

```json
{
  "topics": [
    "RAG (Retrieval-Augmented Generation) best practices",
    "Building AI chatbots for SaaS businesses",
    "AI agent deployment strategies",
    "Monetizing AI chatbots",
    "Next.js for AI applications",
    "Vector databases for RAG systems",
    "Improving chatbot accuracy with RAG",
    "Customer success with AI chatbots",
    "Scaling AI infrastructure for production",
    "Best practices for chatbot UI/UX design",
    "Implementing authentication in AI applications",
    "Prompt engineering techniques for better results",
    "Comparing LLM providers for production use",
    "Building multi-tenant AI SaaS applications",
    "Cost optimization strategies for AI APIs",
    "Security best practices for AI chatbots",
    "Handling chatbot errors and edge cases",
    "A/B testing strategies for AI features",
    "Building voice-enabled AI assistants",
    "Real-time streaming responses in AI chatbots"
  ],
  "usedTopics": []
}
```

**Important Notes:**
- `topics`: Your master list - edit this to add/remove topics
- `usedTopics`: Automatically managed - don't edit manually
- System prevents repeats until all topics are used
- Auto-resets when all topics covered

---

### 4. `scripts/generate-blog-post.js`

```javascript
const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const FAL_API_KEY = process.env.FAL_API_KEY;
const FAL_API_URL = 'https://fal.run/fal-ai/flux/dev';

// Configuration
const CONFIG = {
  researchModel: 'perplexity/llama-3.1-sonar-large-128k-online', // Perplexity for research
  writingModel: 'x-ai/grok-2-1212', // Grok for writing (or any other model)
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
- Naturally mention ChatRAG where relevant, but don't make it overly promotional
- Use proper markdown syntax

Format your response EXACTLY as follows:

TITLE: [Your headline here]
DESCRIPTION: [Your meta description here]
EXCERPT: [A 2-3 sentence excerpt]
TAGS: [3-5 relevant tags, comma-separated]

---START CONTENT---
[Your full blog post content in markdown]
---END CONTENT---`
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

  return {
    title: titleMatch ? titleMatch[1].trim() : 'Untitled Post',
    description: descMatch ? descMatch[1].trim() : '',
    excerpt: excerptMatch ? excerptMatch[1].trim() : '',
    tags: tagsMatch ? tagsMatch[1].trim().split(',').map(t => t.trim()) : [],
    content: contentMatch ? contentMatch[1].trim() : content
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
        image_size: 'landscape_16_9', // 1024x576 - perfect for blog hero
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        enable_safety_checker: true
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
```

---

### 5. `scripts/test-generate.js`

```javascript
#!/usr/bin/env node

/**
 * Test script to generate a blog post locally
 * Run: OPENROUTER_API_KEY=your_key FAL_API_KEY=your_key node scripts/test-generate.js
 */

require('./generate-blog-post.js');
```

---

### 6. `lib/blog.ts`

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  excerpt: string;
  tags: string[];
  author: string;
  image: string;
  published: boolean;
  content?: string;
}

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        author: data.author || 'ChatRAG AI',
        image: data.image || '',
        published: data.published !== false,
      };
    })
    .filter(post => post.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPostsData;
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      author: data.author || 'ChatRAG AI',
      image: data.image || '',
      published: data.published !== false,
      content: contentHtml,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagsSet = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}
```

---

### 7. `app/blog/page.tsx`

```typescript
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog | ChatRAG',
  description: 'Latest insights on AI chatbots, RAG systems, and building successful SaaS businesses with ChatRAG.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
            ← ChatRAG
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-400">
            Insights on AI, chatbots, and building successful SaaS businesses
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition"
              >
                {post.image && (
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative w-full h-64 bg-gray-900">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                )}
                
                <div className="p-8">
                  <div className="mb-4">
                    <time className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-3xl font-bold mb-3 hover:text-gray-300 transition">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-400 mb-4 text-lg">
                    {post.excerpt || post.description}
                  </p>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-500 hover:text-blue-400 font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
```

---

### 8. `app/blog/[slug]/page.tsx`

```typescript
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | ChatRAG',
    };
  }

  return {
    title: `${post.title} | ChatRAG Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/blog" className="text-lg hover:text-gray-300 transition">
            ← Back to Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Image */}
        {post.image && (
          <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden bg-gray-900">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}

        {/* Meta */}
        <div className="mb-8">
          <time className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.author && (
            <span className="text-sm text-gray-500 ml-4">
              By {post.author}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-white
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-500 prose-a:no-underline hover:prose-a:text-blue-400
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-blue-400 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-gray-700 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        {/* CTA */}
        <div className="mt-16 p-8 bg-gray-900 border border-gray-800 rounded-lg">
          <h3 className="text-2xl font-bold mb-3">Ready to build your AI chatbot SaaS?</h3>
          <p className="text-gray-400 mb-6">
            ChatRAG provides the complete Next.js boilerplate to launch your chatbot-agent business in hours, not months.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
          >
            Get ChatRAG
          </Link>
        </div>
      </article>
    </div>
  );
}
```

---

### 9. Example Blog Post: `content/blog/2025-01-15-getting-started-with-rag.md`

```markdown
---
title: "Getting Started with RAG: A Complete Guide for SaaS Founders"
date: "2025-01-15T10:00:00.000Z"
description: "Learn how Retrieval-Augmented Generation (RAG) can transform your AI chatbot from generic to highly specific and accurate."
excerpt: "Discover how RAG technology can help your AI chatbot provide accurate, contextual responses based on your unique business knowledge."
tags: ["RAG", "AI", "Chatbots", "SaaS"]
author: "ChatRAG AI"
image: ""
published: true
---

# Getting Started with RAG: A Complete Guide for SaaS Founders

If you're building an AI chatbot for your SaaS business, you've probably encountered a fundamental challenge: how do you make your AI understand your specific business, products, and customer needs?

This is where **Retrieval-Augmented Generation (RAG)** comes in.

## What is RAG?

RAG is a technique that enhances large language models (LLMs) by giving them access to your specific knowledge base. Instead of relying solely on the model's training data, RAG allows your chatbot to:

- Search through your documentation
- Reference your product information
- Access your company's knowledge base
- Provide accurate, up-to-date answers

Think of it as giving your AI chatbot a library card to your business's information vault.

## Why RAG Matters for SaaS Businesses

Traditional LLMs are trained on general internet data. They're great at general knowledge but terrible at understanding your specific:

- Product features and pricing
- Company policies and procedures
- Technical documentation
- Customer support processes
- Industry-specific terminology

RAG solves this by allowing your chatbot to retrieve relevant information from your documents before generating a response.

## How RAG Works

The RAG process follows three main steps:

### 1. Indexing Phase

First, you convert your documents into searchable chunks and store them in a vector database.

### 2. Retrieval Phase

When a user asks a question, the system finds the most relevant chunks.

### 3. Generation Phase

The LLM uses the retrieved context to generate an accurate response.

## Best Practices for Implementing RAG

Based on our experience building ChatRAG, here are the key best practices:

### Choose the Right Chunk Size

Too small, and you lose context. Too large, and you dilute relevance. We've found that 500-1000 tokens per chunk works well for most use cases.

### Use Hybrid Search

Combine semantic search (vector embeddings) with keyword search for better retrieval accuracy.

### Implement Reranking

After initial retrieval, use a reranking model to ensure the most relevant chunks are prioritized.

### Monitor and Iterate

Track which queries work well and which don't. Use this data to improve your chunking strategy and retrieval logic.

## Common Pitfalls to Avoid

**Over-reliance on RAG**: Not every query needs document retrieval. Sometimes the LLM's base knowledge is sufficient.

**Poor document quality**: RAG is only as good as your source documents. Invest time in creating clear, well-structured documentation.

**Ignoring latency**: Retrieval adds overhead. Optimize your vector database queries and consider caching.

## Getting Started with ChatRAG

At ChatRAG, we've built a complete Next.js boilerplate that handles all the complex RAG implementation for you.

## Conclusion

RAG transforms generic AI chatbots into knowledgeable experts specific to your business. By combining the power of large language models with your unique knowledge base, you can provide accurate, contextual responses that truly serve your customers.

Ready to build your own RAG-powered chatbot? ChatRAG provides everything you need to launch in hours, not months.
```

---

## Setup Instructions

### Step 1: Install NPM Dependencies

In your Next.js project root:

```bash
npm install gray-matter remark remark-html
```

In the scripts folder:

```bash
cd scripts
npm install
```

### Step 2: Create Directory Structure

```bash
# Create required directories
mkdir -p .github/workflows
mkdir -p app/blog/[slug]
mkdir -p content/blog
mkdir -p lib
mkdir -p public/images/blog
mkdir -p scripts
```

### Step 3: Create All Files

Copy the file contents above into their respective locations:

1. `.github/workflows/generate-blog-post.yml`
2. `scripts/package.json`
3. `scripts/topics.json` ⭐
4. `scripts/generate-blog-post.js`
5. `scripts/test-generate.js`
6. `lib/blog.ts`
7. `app/blog/page.tsx`
8. `app/blog/[slug]/page.tsx`
9. `content/blog/2025-01-15-getting-started-with-rag.md` (example)

### Step 4: Add API Keys to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add two secrets:
   - Name: `OPENROUTER_API_KEY`, Value: [your OpenRouter API key]
   - Name: `FAL_API_KEY`, Value: [your Fal.ai API key]

### Step 5: Add Blog to Navigation

Update your main navigation component to include:

```tsx
<Link href="/blog">Blog</Link>
```

### Step 6: Commit and Push

```bash
git add .
git commit -m "Add automated AI blog system with smart topic management"
git push
```

### Step 7: Test Manually

1. Go to GitHub repository
2. Click **Actions** tab
3. Select "Generate AI Blog Post" workflow
4. Click **Run workflow** > **Run workflow**
5. Wait for completion (~1-2 minutes)
6. Check that new files appear in `content/blog/` and `public/images/blog/`
7. Check that `scripts/topics.json` is updated with used topics

---

## Configuration Guide

### Change CRON Schedule

Edit `.github/workflows/generate-blog-post.yml`:

```yaml
schedule:
  - cron: '0 9 * * 1'  # Monday at 9 AM UTC
```

Common schedules:
- `'0 9 * * 1'` - Every Monday at 9 AM
- `'0 9 * * 1,4'` - Every Monday and Thursday at 9 AM
- `'0 9 1 * *'` - First day of every month at 9 AM
- `'0 9 * * *'` - Every day at 9 AM

### Change AI Models

Edit `scripts/generate-blog-post.js`:

```javascript
const CONFIG = {
  researchModel: 'perplexity/llama-3.1-sonar-large-128k-online',
  writingModel: 'x-ai/grok-2-1212',  // or 'anthropic/claude-3.5-sonnet', 'openai/gpt-4-turbo', etc.
  // ...
};
```

Available models on OpenRouter: https://openrouter.ai/models

### Adjust Image Quality

Edit the `generateImage()` function in `scripts/generate-blog-post.js`:

```javascript
body: JSON.stringify({
  prompt: prompt,
  image_size: 'landscape_16_9',    // 1024x576
  num_inference_steps: 28,          // 20-25: fast, 28-35: balanced, 40-50: high quality
  guidance_scale: 3.5,              // 2-3: creative, 3.5-5: balanced, 7-10: literal
  num_images: 1,
  enable_safety_checker: true
})
```

### Customize Blog Styling

Edit `app/blog/page.tsx` and `app/blog/[slug]/page.tsx` to match your brand colors and styling.

---

## Managing Topics

### ⭐ Where Topics Are Located

**File:** `scripts/topics.json`

This is your topic management file with two arrays:
- `topics`: Your master list (edit this!)
- `usedTopics`: Automatically tracked (don't edit!)

### How the Smart Topic System Works

1. **First Run**: Picks random topic from `topics`, adds to `usedTopics`
2. **Subsequent Runs**: Only picks from topics NOT in `usedTopics`
3. **All Topics Used**: Automatically resets `usedTopics` to `[]`, starts over
4. **Progress Tracking**: Shows `📊 Topics used: 5/20` in logs

### Add Topics (Super Easy!)

**Method 1: Edit File Directly**

1. Open `scripts/topics.json`
2. Add topics to the `topics` array:

```json
{
  "topics": [
    "Existing topic 1",
    "Existing topic 2",
    "Your new topic here!",     ← Add this
    "Another new topic!",       ← Add this
    "Keep adding more!"         ← Add this
  ],
  "usedTopics": ["Existing topic 1"]  ← Don't touch this!
}
```

3. Save and commit to GitHub
4. Done! Next run will include new topics

**Method 2: Via GitHub Web Interface**

1. Go to your repo on GitHub
2. Navigate to `scripts/topics.json`
3. Click pencil icon (Edit)
4. Add topics to the `topics` array
5. Commit directly to main branch

### Topic Examples by Pool Size

**Small Pool (10 topics, weekly)**
→ 10 weeks (2.5 months) before repeating

**Medium Pool (30 topics, weekly)**
→ 30 weeks (7.5 months) before repeating

**Large Pool (52 topics, weekly)**
→ 52 weeks (1 year) before repeating

### Reset Topics Manually

Want to start over before all topics are used?

```json
{
  "topics": [
    // ... your topics
  ],
  "usedTopics": []  ← Empty this array
}
```

### Example: Full topics.json

```json
{
  "topics": [
    "RAG implementation patterns for production",
    "Building real-time AI chatbots",
    "Vector database comparison 2025",
    "Optimizing OpenAI API costs",
    "Multi-tenant AI SaaS architecture",
    "Prompt engineering techniques",
    "AI agent deployment strategies",
    "Security best practices for AI",
    "Measuring AI chatbot ROI",
    "The future of AI agents",
    "Building hybrid search with RAG",
    "Next.js App Router for AI apps",
    "Handling AI rate limits",
    "Fine-tuning vs RAG",
    "Voice-enabled AI assistants",
    "A/B testing AI features",
    "Comparing LLM providers",
    "AI features users want",
    "Scaling AI infrastructure",
    "Complete guide to AI analytics"
  ],
  "usedTopics": []
}
```

### Pro Tips for Topics

✅ **Be Specific**: "How to implement RAG with Pinecone and OpenAI" not "AI stuff"  
✅ **Include Keywords**: Good for SEO and research quality  
✅ **Mix Difficulty**: Beginner, intermediate, advanced topics  
✅ **Vary Content**: Tutorials, guides, comparisons, case studies  

### Important Notes

**DO:**
- ✅ Edit the `topics` array
- ✅ Use descriptive, specific topics
- ✅ Commit changes to GitHub
- ✅ Let system manage `usedTopics`

**DON'T:**
- ❌ Manually edit `usedTopics` (unless resetting)
- ❌ Break JSON syntax
- ❌ Delete `usedTopics` field
- ❌ Make file empty

---

## Testing & Verification

### Local Testing

Test blog generation locally:

```bash
cd scripts
OPENROUTER_API_KEY=your_key FAL_API_KEY=your_key node generate-blog-post.js
```

Expected output:
```
📊 Topics used: 1/20
🎯 Selected topic: RAG best practices
🔍 Researching: RAG best practices
✅ Research completed
✍️  Writing blog post about: RAG best practices
✅ Blog post written
🎨 Generating image prompt...
✅ Image prompt generated
🖼️  Generating image with Fal.ai...
✅ Image generated and saved
✅ Blog post saved: 2025-01-15-rag-best-practices.md
✨ Successfully generated blog post: 2025-01-15-rag-best-practices.md
🖼️  Hero image: /images/blog/rag-best-practices.png
```

Run again to see progress:
```
📊 Topics used: 2/20
🎯 Selected topic: Building AI chatbots (different topic!)
```

### Verify Blog Pages

1. Run development server: `npm run dev`
2. Navigate to `http://localhost:3000/blog`
3. Verify blog listing appears with images
4. Click on a post
5. Verify individual post displays correctly
6. Check that hero image loads

### Check GitHub Actions

1. Go to repository **Actions** tab
2. Verify workflow appears
3. Check for any errors in past runs
4. Verify `topics.json` is committed after each run
5. Verify CRON schedule is set correctly

### Check Topics Tracking

After a few runs, check `scripts/topics.json`:

```json
{
  "topics": [...],
  "usedTopics": [
    "RAG best practices",
    "Building AI chatbots",
    "Vector databases"
  ]
}
```

You should see topics being added to `usedTopics` array!

---

## Troubleshooting

### Posts Not Generating

**Check:**
- GitHub Actions logs for errors
- API keys are set correctly in GitHub Secrets
- Both `OPENROUTER_API_KEY` and `FAL_API_KEY` are present
- You have credits in OpenRouter and Fal.ai accounts
- `topics.json` file exists and is valid JSON

**Solution:**
```bash
# Test locally first
cd scripts
OPENROUTER_API_KEY=xxx FAL_API_KEY=xxx node generate-blog-post.js
```

### Images Not Appearing

**Check:**
- `FAL_API_KEY` is set in GitHub Secrets
- Fal.ai account has credits
- `public/images/blog/` directory exists
- GitHub Actions is committing image files

**Solution:**
- System will continue without images if FAL_API_KEY is missing
- Check GitHub Actions logs for Fal.ai errors

### Topics.json Errors

**Check:**
- File is valid JSON (no syntax errors)
- Both `topics` and `usedTopics` arrays exist
- No duplicate topics in `usedTopics`

**Solution:**
```bash
# Validate JSON syntax
cat scripts/topics.json | python -m json.tool

# Reset if corrupted
echo '{
  "topics": ["Topic 1", "Topic 2"],
  "usedTopics": []
}' > scripts/topics.json
```

### Topic Not Changing

**Check:**
- `topics.json` is being committed by GitHub Actions
- Multiple topics exist in `topics` array
- Not all topics have been used yet

**Solution:**
- Check GitHub Actions workflow commits `scripts/topics.json`
- Verify `usedTopics` is being updated
- Add more topics to the pool

### Blog Pages Not Displaying

**Check:**
- Files are in correct directories
- Dependencies are installed (`gray-matter`, `remark`, `remark-html`)
- TypeScript has no build errors
- Run `npm run dev` and check console

**Solution:**
```bash
# Reinstall dependencies
npm install gray-matter remark remark-html

# Check for build errors
npm run build
```

### Poor Content Quality

**Check:**
- Topics are specific and clear
- Research model is appropriate (Perplexity recommended)
- Writing model is appropriate (Grok, Claude, or GPT-4 recommended)

**Solution:**
- Make topics more specific
- Adjust temperature settings
- Try different models
- Improve topic descriptions

### API Rate Limits

**Check:**
- OpenRouter rate limits
- Fal.ai rate limits

**Solution:**
- Add delays between requests
- Reduce posting frequency
- Upgrade API plans

---

## Summary

This system provides:

✅ **Automated Research** - Perplexity finds latest information  
✅ **AI Writing** - Grok (or any model) creates content  
✅ **Image Generation** - Fal.ai creates hero images  
✅ **Smart Topics** - No repeats until all used, auto-tracking  
✅ **CRON Scheduling** - GitHub Actions runs automatically  
✅ **Next.js Integration** - Beautiful, fast blog pages  
✅ **Full Customization** - Change everything to fit your needs  

**Cost**: ~$0.50-7/month (depending on frequency)  
**Setup Time**: 15-30 minutes  
**Maintenance**: Zero (fully automated)  

---

## Quick Reference

### API Keys
- OpenRouter: https://openrouter.ai/
- Fal.ai: https://fal.ai/

### Model Options
- Research: `perplexity/llama-3.1-sonar-large-128k-online`
- Writing: `x-ai/grok-2-1212`, `anthropic/claude-3.5-sonnet`, `openai/gpt-4-turbo`
- Images: Fal.ai FLUX dev

### Important Files
- **Topics**: `scripts/topics.json` ⭐ (edit this to add topics!)
- Blog content: `content/blog/*.md`
- Blog images: `public/images/blog/*.png`
- Generator script: `scripts/generate-blog-post.js`
- Blog pages: `app/blog/`
- GitHub Actions: `.github/workflows/generate-blog-post.yml`

### Commands
```bash
# Install dependencies
npm install gray-matter remark remark-html
cd scripts && npm install

# Test locally
cd scripts
OPENROUTER_API_KEY=xxx FAL_API_KEY=xxx node generate-blog-post.js

# Run dev server
npm run dev

# Check topics progress
cat scripts/topics.json | grep "usedTopics"
```

### Key Features

🎯 **No Repeats**: Topics won't repeat until all are used  
📊 **Progress Tracking**: See how many topics are left  
🔄 **Auto Reset**: Automatically restarts when all topics used  
📝 **Easy Management**: Simple JSON file for topics  
🖼️ **AI Images**: Beautiful hero images for every post  
⚡ **Fully Automated**: Set it and forget it  

---

**End of Master Implementation Guide v2.0**

This document contains everything needed to implement the complete automated AI blog system with smart topic management, research, writing, and image generation capabilities.
