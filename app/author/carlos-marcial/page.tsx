import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Carlos Marcial - Founder & Technical Writer | ChatRAG',
  description: 'Carlos Marcial is the Founder of ChatRAG, specializing in AI/ML systems, developer tools, and RAG architectures. Explore articles on Retrieval-Augmented Generation.',
  alternates: {
    canonical: 'https://www.chatrag.ai/author/carlos-marcial',
  },
  openGraph: {
    title: 'Carlos Marcial - Founder & Technical Writer | ChatRAG',
    description: 'Founder of ChatRAG, specializing in AI/ML systems, developer tools, and RAG architectures.',
    type: 'profile',
    url: 'https://www.chatrag.ai/author/carlos-marcial',
    siteName: 'ChatRAG',
  },
};

export default async function AuthorPage() {
  // Get all posts and filter by Carlos Marcial
  const allPosts = await getAllPosts();
  const authorPosts = allPosts.filter(post => post.author === 'Carlos Marcial').slice(0, 10);

  // JSON-LD for Person schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Carlos Marcial',
    jobTitle: 'Founder & Technical Writer',
    worksFor: {
      '@type': 'Organization',
      name: 'ChatRAG',
      url: 'https://www.chatrag.ai',
    },
    url: 'https://www.chatrag.ai/author/carlos-marcial',
    sameAs: [
      'https://twitter.com/carlosmarcialt',
    ],
    description: 'Founder of ChatRAG, specializing in AI/ML systems, developer tools, and RAG architectures.',
  };

  return (
    <>
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

        <main className="max-w-4xl mx-auto px-4 py-16">
          {/* Author Profile */}
          <div className="mb-12">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-4xl font-bold">
                CM
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Carlos Marcial</h1>
                <p className="text-xl text-orange-500 mb-4">Founder & Technical Writer, ChatRAG</p>
                <a
                  href="https://twitter.com/carlosmarcialt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  @carlosmarcialt
                </a>
              </div>
            </div>

            {/* Bio */}
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Carlos is the founder of ChatRAG, a Next.js boilerplate that helps developers and entrepreneurs
                build AI-powered chatbot solutions. With deep expertise in AI/ML systems, developer tools, and
                modern software architectures, he&apos;s passionate about making Retrieval-Augmented Generation (RAG)
                technology accessible to everyone.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                His articles combine rigorous technical accuracy with clear, actionable guidance—covering
                RAG applications across industries from enterprise documentation search to specialized solutions
                in healthcare, finance, manufacturing, and beyond.
              </p>
            </div>
          </div>

          {/* Expertise */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Areas of Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {[
                'Retrieval-Augmented Generation',
                'Vector Databases',
                'Large Language Models',
                'AI/ML Systems',
                'Developer Tools',
                'Next.js',
                'Enterprise AI',
                'SaaS Development',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Content Methodology Link */}
          <section className="mb-12 p-6 bg-gray-900 border border-gray-800 rounded-lg">
            <h2 className="text-xl font-bold mb-3">About Our Content</h2>
            <p className="text-gray-400 mb-4">
              Learn about how we create our content, our editorial standards, and our commitment to accuracy.
            </p>
            <Link
              href="/content-methodology"
              className="text-orange-500 hover:text-orange-400 transition font-medium"
            >
              Read our content methodology →
            </Link>
          </section>

          {/* Recent Articles */}
          {authorPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
              <div className="space-y-6">
                {authorPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block p-6 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition"
                  >
                    <h3 className="text-xl font-semibold mb-2 hover:text-orange-500 transition">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <time>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <div className="flex gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-800 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/blog"
                  className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
                >
                  View All Articles
                </Link>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
