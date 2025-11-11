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

  const canonicalUrl = `https://www.chatrag.ai/blog/${slug}`;
  const imageUrl = post.image?.startsWith('http')
    ? post.image
    : `https://www.chatrag.ai${post.image || '/images/heroChatRag.png'}`;

  return {
    title: `${post.title} | ChatRAG Blog`,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: canonicalUrl,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: imageUrl }],
      siteName: 'ChatRAG',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
      creator: '@carlosmarcialt',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get all posts for related posts
  const allPosts = await getAllPosts();

  // Find related posts based on shared tags
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug) // Exclude current post
    .map((p) => {
      // Calculate relevance score based on shared tags
      const sharedTags = p.tags.filter((tag) => post.tags.includes(tag));
      return { post: p, score: sharedTags.length };
    })
    .filter((item) => item.score > 0) // Only posts with shared tags
    .sort((a, b) => b.score - a.score) // Sort by relevance
    .slice(0, 3) // Take top 3
    .map((item) => item.post);

  // Fallback to latest posts if no related posts found
  const postsToShow = relatedPosts.length > 0
    ? relatedPosts
    : allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Generate JSON-LD structured data for Article schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image ? `https://www.chatrag.ai${post.image}` : 'https://www.chatrag.ai/og-image.png',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://www.chatrag.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ChatRAG',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.chatrag.ai/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.chatrag.ai/blog/${slug}`,
    },
    keywords: post.tags.join(', '),
  };

  // Social share URLs
  const shareUrl = `https://www.chatrag.ai/blog/${slug}`;
  const shareText = post.title;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&via=carlosmarcialt`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

          {/* Social Share Buttons */}
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-800">
            <span className="text-sm text-gray-500">Share this article:</span>
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition text-sm"
              aria-label="Share on Twitter/X"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter/X
            </a>
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition text-sm"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition text-sm"
              aria-label="Share on Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
          </div>

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-white
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-blue-500 prose-a:underline hover:prose-a:text-blue-400 prose-a:cursor-pointer
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-blue-400 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-pre:p-4 prose-pre:rounded prose-pre:overflow-x-auto
              prose-ul:text-gray-300 prose-ul:my-6 prose-ul:space-y-2
              prose-ol:text-gray-300 prose-ol:my-6 prose-ol:space-y-2
              prose-li:mb-2 prose-li:text-gray-300
              prose-blockquote:border-l-4 prose-blockquote:border-gray-700 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400 prose-blockquote:my-6
              prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-table:text-sm
              prose-thead:border-b-2 prose-thead:border-gray-700
              prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-white prose-th:bg-gray-900
              prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-gray-800 prose-td:text-gray-300
              prose-tr:border-b prose-tr:border-gray-800
              [&_a]:text-blue-500 [&_a]:underline [&_a]:cursor-pointer hover:[&_a]:text-blue-400 [&_a]:font-medium"
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

          {/* Related Posts Section */}
          {postsToShow.length > 0 && (
            <div className="mt-16 pt-16 border-t border-gray-800">
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {postsToShow.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block p-6 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition"
                  >
                    {relatedPost.image && (
                      <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-gray-800">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-500 transition line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </>
  );
}
