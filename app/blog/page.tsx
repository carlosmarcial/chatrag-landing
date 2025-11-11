import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog | ChatRAG',
  description: 'Latest insights on AI chatbots, RAG systems, and building successful SaaS businesses with ChatRAG.',
  alternates: {
    canonical: 'https://www.chatrag.ai/blog',
  },
  openGraph: {
    title: 'Blog | ChatRAG',
    description: 'Latest insights on AI chatbots, RAG systems, and building successful SaaS businesses with ChatRAG.',
    url: 'https://www.chatrag.ai/blog',
    siteName: 'ChatRAG',
    type: 'website',
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
