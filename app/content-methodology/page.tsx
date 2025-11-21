import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How We Create Our Content | ChatRAG',
  description: 'Learn about ChatRAG\'s content creation process, our editorial standards, and how we combine human expertise with AI assistance to deliver accurate, helpful technical content.',
  alternates: {
    canonical: 'https://www.chatrag.ai/content-methodology',
  },
  openGraph: {
    title: 'How We Create Our Content | ChatRAG',
    description: 'Learn about ChatRAG\'s content creation process, our editorial standards, and how we combine human expertise with AI assistance.',
    type: 'website',
    url: 'https://www.chatrag.ai/content-methodology',
    siteName: 'ChatRAG',
  },
};

export default function ContentMethodologyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-lg hover:text-gray-300 transition">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-4">How We Create Our Content</h1>
        <p className="text-gray-400 mb-12">Last updated: November 2025</p>

        {/* Mission Statement */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            At ChatRAG, we&apos;re dedicated to helping developers and entrepreneurs build powerful AI chatbot solutions.
            Our content aims to demystify Retrieval-Augmented Generation (RAG) technology, provide practical implementation
            guides, and showcase real-world applications across industries.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We believe that accurate, well-researched technical content is essential for the developer community.
            That&apos;s why we&apos;ve developed a rigorous content creation process that combines human expertise
            with AI-assisted research and drafting.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Editorial Team</h2>
          <div className="space-y-6">
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Carlos Marcial</h3>
              <p className="text-orange-500 mb-3">Founder & Technical Writer, ChatRAG</p>
              <p className="text-gray-300">
                Carlos is the founder of ChatRAG and serves as the primary writer and editor,
                bringing expertise in AI/ML systems, developer tools, and RAG architectures.
                He reviews all content for technical accuracy, clarity, and tone before publication.
              </p>
              <Link
                href="/author/carlos-marcial"
                className="inline-block mt-4 text-blue-500 hover:text-blue-400 transition"
              >
                View author profile →
              </Link>
            </div>
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">AI Research Assistance</h3>
              <p className="text-orange-500 mb-3">Perplexity, Claude, and GPT-4</p>
              <p className="text-gray-300">
                We leverage AI tools for initial research, drafting assistance, and fact-checking.
                These tools help us gather current information, identify trends, and ensure comprehensive
                coverage of technical topics.
              </p>
            </div>
          </div>
        </section>

        {/* Content Creation Process */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Content Creation Process</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-1">Topic Research & Planning</h3>
                <p className="text-gray-400">We identify topics based on developer needs, industry trends, and gaps in existing RAG documentation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-1">AI-Assisted Research</h3>
                <p className="text-gray-400">We use AI tools to gather current information, academic papers, and industry best practices.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-1">Draft Generation</h3>
                <p className="text-gray-400">AI assists in creating initial drafts based on research findings and our content guidelines.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-semibold mb-1">Human Expert Review</h3>
                <p className="text-gray-400">Our technical writer reviews all content for accuracy, completeness, and alignment with our quality standards.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-semibold mb-1">Technical Verification</h3>
                <p className="text-gray-400">Code examples are tested, claims are verified against primary sources, and statistics are fact-checked.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">6</div>
              <div>
                <h3 className="font-semibold mb-1">Editorial Polish</h3>
                <p className="text-gray-400">Content is refined for clarity, readability, and consistency with the ChatRAG voice and style.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">7</div>
              <div>
                <h3 className="font-semibold mb-1">Publication & Monitoring</h3>
                <p className="text-gray-400">Published content is monitored for reader feedback, and updates are made as technology evolves.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence Quality */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Evidence & Quality Standards</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">✓</span>
              <span>Technical claims are supported by documentation, research papers, or verified implementations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">✓</span>
              <span>Code examples are tested in real development environments</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">✓</span>
              <span>Industry trends are sourced from reputable publications and official announcements</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">✓</span>
              <span>Best practices align with official documentation and community consensus</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">✓</span>
              <span>Content is regularly reviewed and updated to reflect current best practices</span>
            </li>
          </ul>
        </section>

        {/* AI Disclosure */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">AI Disclosure</h2>
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
            <p className="text-gray-300 leading-relaxed mb-4">
              We believe in transparency about our content creation process. ChatRAG uses AI tools as part of our
              editorial workflow—not as a replacement for human judgment, but as a powerful research and drafting assistant.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              AI helps us:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Research and synthesize information from multiple sources</li>
              <li>Generate initial drafts that our editors refine</li>
              <li>Identify relevant technical details and edge cases</li>
              <li>Ensure comprehensive coverage of complex topics</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              All content is reviewed, verified, and approved by our human editorial team before publication.
              We take responsibility for the accuracy and quality of everything we publish.
            </p>
          </div>
        </section>

        {/* Independence Statement */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Editorial Independence</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            ChatRAG maintains full editorial independence. Our content is created to serve our readers—developers,
            entrepreneurs, and technical professionals building AI solutions.
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span>We do not accept paid placements or sponsored content without clear disclosure</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span>Product mentions are based on merit and relevance to our audience</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span>Our recommendations reflect genuine assessment, not commercial relationships</span>
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Have questions about our content or want to suggest a topic? We&apos;d love to hear from you.
          </p>
          <a
            href="mailto:hello@chatrag.ai"
            className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
          >
            Contact: hello@chatrag.ai
          </a>
        </section>

        {/* Back to Blog */}
        <div className="pt-8 border-t border-gray-800">
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-400 transition"
          >
            ← Browse our blog articles
          </Link>
        </div>
      </main>
    </div>
  );
}
