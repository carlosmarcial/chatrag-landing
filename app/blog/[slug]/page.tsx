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
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-500 prose-a:no-underline hover:prose-a:text-blue-400
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
            prose-tr:border-b prose-tr:border-gray-800"
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
