# How Automatic Sitemap Generation Works

## Current Status ✅

**Blog Posts in Sitemap:** 9 out of 9
**Total Pages Indexed:** 32 (23 static + 9 blog posts)

All blog posts have been pulled from the remote repository and are now included in the sitemap!

---

## How It Works Automatically

### 1. **Sitemap Generation Script**

Located at: `scripts/generate-sitemap.js`

This script:
- Scans the `content/blog/` directory for all `.md` files
- Reads the frontmatter (metadata) from each markdown file
- Extracts the `date`, `published` status, and filename
- Only includes posts where `published !== false`
- Automatically generates URLs based on filename (slug)
- Sorts posts by date (newest first)
- Combines with static pages (docs, landing, etc.)
- Writes to `public/sitemap.xml`

### 2. **Automatic Execution**

The sitemap regenerates automatically in these scenarios:

#### **Every Production Build** ✅
```json
// package.json
"scripts": {
  "prebuild": "npm run generate:sitemap",  // Runs BEFORE build
  "build": "next build"
}
```

When you run `npm run build`, it:
1. First runs `npm run generate:sitemap` (prebuild hook)
2. Scans `content/blog/` for all blog posts
3. Generates fresh sitemap.xml
4. Then continues with the Next.js build

#### **Manual Generation** ✅
You can also regenerate manually:
```bash
npm run generate:sitemap
```

---

## How Future Blog Posts Are Added

### **Workflow Overview**

```
1. New blog post committed to git
   └─> content/blog/2025-11-12-new-post.md

2. Pushed to remote (GitHub)
   └─> Triggers deployment (Vercel, etc.)

3. Build starts on deployment server
   └─> npm run build

4. Prebuild hook runs
   └─> npm run generate:sitemap

5. Script scans content/blog/
   └─> Finds new-post.md
   └─> Adds to sitemap.xml

6. Next.js build continues
   └─> Generates static pages

7. Deployment completes
   └─> New sitemap.xml live!

8. Google crawls sitemap
   └─> Discovers new blog post
   └─> Indexes it automatically
```

### **Zero Manual Intervention Required**

Once deployed, the process is fully automatic:
- ✅ Add markdown file to `content/blog/`
- ✅ Commit and push
- ✅ Deployment automatically regenerates sitemap
- ✅ Google discovers new post from sitemap

---

## Blog Post Requirements

For a blog post to be included in the sitemap, it must:

### 1. **Be in the correct directory**
```
content/blog/your-post.md
```

### 2. **Have proper frontmatter**
```yaml
---
title: "Your Post Title"
date: "2025-11-12"                    # Used for lastmod in sitemap
description: "Post description"
published: true                        # Must be true (or omitted)
tags: ["tag1", "tag2"]
author: "Author Name"
image: "/images/blog/your-image.jpg"
excerpt: "Short excerpt"
---
```

### 3. **Use `.md` extension**
Only files ending in `.md` are processed.

### 4. **Have `published: true` (or omit the field)**
```yaml
published: true   # ✅ Included in sitemap
published: false  # ❌ Excluded from sitemap
# (omitted)       # ✅ Included (defaults to true)
```

---

## Current Blog Posts in Sitemap

All 9 posts are now included:

1. 2025-11-11: Exploring Physics Frontiers - RAG's Approach to Equation and Theory Retrieval
2. 2025-11-10: Streamlining Chaos - How RAG Tackles Construction Project Documentation
3. 2025-11-10: Crafting Custom Knowledge Paths - RAG's Integration in Personalized Learning Platforms
4. 2025-11-09: Streamlining Factory Floors - How RAG Elevates Quality Control Documentation
5. 2025-11-09: Revolutionizing Aviation Maintenance - How RAG Transforms Documentation
6. 2025-11-08: Revolutionizing Agriculture - Harnessing RAG for Crop and Soil Analysis
7. 2025-11-08: Revolutionizing Environmental Impact Assessments with RAG
8. 2025-11-08: Unlocking Insights - How RAG Revolutionizes Psychology Clinical Case Studies
9. 2025-11-07: Revolutionizing Nonprofit Grant Writing with RAG - A Technical Deep Dive

---

## Verification

### **Check if sitemap is up to date:**
```bash
npm run generate:sitemap
```

Look for output:
```
Generating sitemap with 32 pages...
- Static pages: 23
- Blog posts: 9
✓ Sitemap generated successfully
```

### **View current sitemap:**
```bash
cat public/sitemap.xml | grep "<loc>.*blog"
```

### **Count blog posts in sitemap:**
```bash
ls -1 content/blog/*.md | wc -l
```

---

## Troubleshooting

### **Blog post not showing in sitemap?**

1. **Check if file exists:**
   ```bash
   ls content/blog/your-post.md
   ```

2. **Check published status:**
   ```bash
   grep "published:" content/blog/your-post.md
   ```
   - Should be `true` or omitted
   - If `false`, it's intentionally excluded

3. **Regenerate sitemap:**
   ```bash
   npm run generate:sitemap
   ```

4. **Check sitemap output:**
   ```bash
   grep "your-post" public/sitemap.xml
   ```

### **New post not appearing on production?**

1. **Verify deployment completed:**
   - Check your hosting dashboard (Vercel, Netlify, etc.)

2. **Verify sitemap was rebuilt:**
   - Visit `https://www.chatrag.ai/sitemap.xml`
   - Search for your new post URL

3. **Force Google to re-crawl:**
   - Go to Google Search Console
   - Use "Request Indexing" for the new URL

---

## Key Files

```
chatrag-landing/
├── content/blog/                    # All blog posts (markdown)
│   ├── 2025-11-07-post-1.md
│   ├── 2025-11-08-post-2.md
│   └── ...
│
├── scripts/
│   └── generate-sitemap.js          # Sitemap generator script
│
├── public/
│   └── sitemap.xml                  # Generated sitemap (auto-created)
│
└── package.json                     # Contains prebuild hook
```

---

## Benefits of This Approach

✅ **Fully Automatic** - No manual sitemap updates needed
✅ **Always Current** - Rebuilds on every deployment
✅ **Scalable** - Works with unlimited blog posts
✅ **SEO Optimized** - Google gets immediate updates
✅ **Error Proof** - Can't forget to update sitemap
✅ **Date Accurate** - Uses actual post dates from frontmatter
✅ **Sorted Properly** - Newest posts appear first

---

## Adding New Static Pages

If you add new pages to your site (not blog posts), edit `scripts/generate-sitemap.js`:

```javascript
const staticPages = [
  // ... existing pages ...

  // Add your new page:
  { loc: '/new-page', changefreq: 'weekly', priority: '0.8' },
];
```

---

## Summary

**Question:** Will future blog posts be added to the sitemap?

**Answer:** YES! ✅ Completely automatically.

**How:**
1. Add `.md` file to `content/blog/`
2. Commit and push to repository
3. Deployment triggers build
4. Prebuild hook regenerates sitemap
5. New post is automatically included

**No manual steps required!** 🎉

---

**Last Updated:** November 11, 2025
**Blog Posts Indexed:** 9 / 9
**Total Pages:** 32
