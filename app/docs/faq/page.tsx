import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HelpCircle, Info, CheckCircle2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ - ChatRAG Documentation",
  description: "Frequently asked questions about ChatRAG features, setup, licensing, pricing, customization, and technical requirements.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/faq',
  },
  openGraph: {
    title: 'FAQ - ChatRAG Documentation',
    description: 'Frequently asked questions about ChatRAG features, setup, licensing, pricing, customization, and technical requirements.',
    url: 'https://www.chatrag.ai/docs/faq',
    siteName: 'ChatRAG',
    type: 'article',
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

export default function FAQPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Common questions about ChatRAG features, setup, licensing, and usage.
        </p>
      </div>

      <Alert>
        <HelpCircle className="h-4 w-4" />
        <AlertTitle>Can't Find Your Answer?</AlertTitle>
        <AlertDescription>
          Check the full documentation, troubleshooting guide, or join our Discord community for support.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* General Questions */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">General Questions</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">What is ChatRAG?</h3>
              <p className="text-sm text-muted-foreground">
                ChatRAG is a production-ready AI chatbot platform built with Next.js 16, React 19, and TypeScript.
                It features advanced RAG (Retrieval-Augmented Generation) with HNSW vector search, 100+ AI models via OpenRouter,
                multi-modal generation, WhatsApp integration, and MCP support.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">What makes ChatRAG different from other chatbot platforms?</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Key differentiators:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>HNSW Vector Search:</strong> 15-28x faster than traditional RAG</li>
                  <li><strong>Visual Config UI:</strong> No code changes needed for configuration</li>
                  <li><strong>White-Label Ready:</strong> Complete branding customization</li>
                  <li><strong>Multi-Channel:</strong> Web, WhatsApp, embed widget</li>
                  <li><strong>MCP Integration:</strong> Connect external tools (Zapier, custom servers)</li>
                  <li><strong>Reasoning Models:</strong> Support for o1, o3, Claude thinking, DeepSeek R1</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Can I use ChatRAG for commercial projects?</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Yes! ChatRAG has a commercial license that allows you to:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li><CheckCircle2 className="w-4 h-4 inline mr-1 text-green-500" /> Build unlimited chatbots for yourself or clients</li>
                <li><CheckCircle2 className="w-4 h-4 inline mr-1 text-green-500" /> Full white-label customization</li>
                <li><CheckCircle2 className="w-4 h-4 inline mr-1 text-green-500" /> Access to complete source code</li>
                <li className="text-red-600"><strong>Cannot:</strong> Resell as boilerplate/template</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Setup & Configuration */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Setup & Configuration</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">What are the minimum requirements to run ChatRAG?</h3>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Essential requirements:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Node.js 18+ and npm</li>
                  <li>Supabase account (free tier works)</li>
                  <li>OpenAI API key (for embeddings)</li>
                  <li>OpenRouter or direct AI provider API key</li>
                  <li>LlamaCloud API key (for document processing)</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">How long does setup take?</h3>
              <p className="text-sm text-muted-foreground">
                With the Visual Config UI, you can have a working chatbot in 10-15 minutes:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4 mt-2">
                <li>Clone repository: 2 minutes</li>
                <li>Install dependencies: 3 minutes</li>
                <li>Database setup (Supabase): 5 minutes</li>
                <li>Configure API keys: 5 minutes</li>
                <li>Test and verify: 5 minutes</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Do I need to know how to code?</h3>
              <p className="text-sm text-muted-foreground">
                Basic familiarity with command line helps, but the Visual Config UI (<code className="bg-muted px-1 py-0.5 rounded">npm run config</code>)
                allows you to configure everything without editing code. You'll need basic dev skills to:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4 mt-2">
                <li>Run npm commands</li>
                <li>Copy/paste environment variables</li>
                <li>Deploy to Vercel (point and click)</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Can I run ChatRAG locally without deploying?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! ChatRAG works perfectly for local development and testing. Just run <code className="bg-muted px-1 py-0.5 rounded">npm run dev</code> after setup.
                You only need deployment when you want to make it accessible to others online.
              </p>
            </div>
          </div>
        </section>

        {/* RAG & Documents */}
        <section className="border-l-4 border-blue-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">RAG & Documents</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">What file types can I upload?</h3>
              <p className="text-sm text-muted-foreground">
                ChatRAG supports: PDF, DOCX, TXT, HTML, RTF, and EPUB files through LlamaCloud parsing.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">How does the RAG system work?</h3>
              <p className="text-sm text-muted-foreground mb-2">
                ChatRAG's RAG pipeline:
              </p>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Documents uploaded and parsed by LlamaCloud</li>
                <li>Content split into semantic chunks (2500 chars, 992 overlap)</li>
                <li>OpenAI generates 1536-dim embeddings for each chunk</li>
                <li>Stored with HNSW vector index in Supabase</li>
                <li>User queries matched via semantic search (&lt;50ms)</li>
                <li>Relevant chunks injected into AI prompt</li>
                <li>AI generates response based on document context</li>
              </ol>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Why is HNSW faster than traditional RAG?</h3>
              <p className="text-sm text-muted-foreground">
                HNSW (Hierarchical Navigable Small World) is a graph-based index that provides approximate nearest neighbor search
                with logarithmic complexity. This means 15-28x faster queries compared to IVFFlat indexes, especially at scale.
                Query times are typically &lt;50ms even with large document sets.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Can users upload their own documents?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Set <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_READ_ONLY_DOCUMENTS_ENABLED=false</code> to allow user uploads.
                Row Level Security ensures users only see their own documents. For admin-only datasets, set it to true.
              </p>
            </div>
          </div>
        </section>

        {/* AI Models & Providers */}
        <section className="border-l-4 border-purple-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">AI Models & Providers</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">How many AI models does ChatRAG support?</h3>
              <p className="text-sm text-muted-foreground">
                100+ models through OpenRouter, plus direct API support for OpenAI, Anthropic, and Google.
                Includes reasoning models (o1, o3, Claude thinking, DeepSeek R1, Gemini Thinking).
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Which AI model should I use?</h3>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Recommended models by use case:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>General chat:</strong> GPT-4o-mini or Claude Sonnet 4.5</li>
                  <li><strong>RAG:</strong> Claude Sonnet 4.5 (best context understanding)</li>
                  <li><strong>WhatsApp:</strong> GPT-4o-mini or Gemini Flash (fast, concise)</li>
                  <li><strong>Complex reasoning:</strong> o1, o3, or Claude with extended thinking</li>
                  <li><strong>Cost optimization:</strong> Free tier models (Venice, Llama 4)</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Can I add custom models?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Use the Config UI to add models, or manually configure them in 5 locations (.env.local, scripts/init-env.js,
                src/lib/env.ts, scripts/config-server.js, scripts/config-ui/index.html). The Config UI handles this automatically.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">What are reasoning/thinking models?</h3>
              <p className="text-sm text-muted-foreground">
                Reasoning models (like OpenAI's o1/o3, Claude with extended thinking, DeepSeek R1) use additional computation
                to "think" before responding. They're excellent for complex problem-solving, math, code debugging, and multi-step tasks.
              </p>
            </div>
          </div>
        </section>

        {/* WhatsApp Integration */}
        <section className="border-l-4 border-green-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">WhatsApp Integration</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">How does WhatsApp integration work?</h3>
              <p className="text-sm text-muted-foreground">
                ChatRAG uses Bailey's (open-source WhatsApp Web API) deployed on Fly.io or Koyeb. You scan a QR code to link your WhatsApp,
                and messages are routed between WhatsApp and ChatRAG via webhooks.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Do I need a business WhatsApp account?</h3>
              <p className="text-sm text-muted-foreground">
                No! You can use your personal WhatsApp account. Bailey's connects via WhatsApp Web, so any account works.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Which provider should I use - Fly.io or Koyeb?</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Fly.io (recommended)</strong> for edge computing with global distribution, persistent volumes, and low latency.
                <strong>Koyeb</strong> is simpler with auto-scaling and GitHub integration. Both have free tiers.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Where is the Bailey's repository?</h3>
              <p className="text-sm text-muted-foreground">
                ChatRAG provides a ready-to-deploy Bailey's at{" "}
                <a href="https://github.com/areia-ai/chatrag" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                  github.com/areia-ai/chatrag <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                {" "}specifically configured to work with ChatRAG.
              </p>
            </div>
          </div>
        </section>

        {/* MCP Integration */}
        <section className="border-l-4 border-orange-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">MCP Integration</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">What is MCP?</h3>
              <p className="text-sm text-muted-foreground">
                Model Context Protocol (MCP) is an open standard for connecting AI applications with external tools and data sources.
                It allows ChatRAG to execute actions in services like Gmail, Google Calendar, Drive, and custom APIs.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">What comes pre-configured with ChatRAG?</h3>
              <p className="text-sm text-muted-foreground mb-2">
                ChatRAG includes pre-configured Zapier MCP support with pattern detection for:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Gmail (find emails, create drafts, send replies)</li>
                <li>Google Calendar (find events)</li>
                <li>Google Drive (upload files)</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Can I add custom MCP servers?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Use the Config UI to add custom MCP servers with HTTP, SSE, or WebSocket transport.
                Supports Bearer tokens, API keys, and Basic auth.
              </p>
            </div>
          </div>
        </section>

        {/* Deployment & Hosting */}
        <section className="border-l-4 border-red-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Deployment & Hosting</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Where can I deploy ChatRAG?</h3>
              <p className="text-sm text-muted-foreground mb-2">
                ChatRAG is optimized for Vercel (zero-config deployment), but also works on:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Vercel (recommended)</li>
                <li>Self-hosting (Docker, PM2, VPS)</li>
                <li>Coolify</li>
                <li>Netlify, Railway, Render</li>
                <li>AWS (Amplify, EC2)</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">How much does hosting cost?</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Vercel:</strong> Free tier supports hobby projects. Pro starts at $20/month.<br />
                <strong>Supabase:</strong> Free tier includes 500MB database + 1GB storage.<br />
                <strong>API costs vary</strong> based on usage (OpenAI, OpenRouter, etc.).
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Can I self-host completely?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! You can self-host both ChatRAG (Docker/VPS) and Supabase (open-source). You'll still need API keys for
                AI providers (OpenAI, OpenRouter) and LlamaCloud for document processing.
              </p>
            </div>
          </div>
        </section>

        {/* Customization */}
        <section className="border-l-4 border-yellow-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Customization & Branding</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Can I white-label ChatRAG?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Complete branding customization via Config UI:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4 mt-2">
                <li>Custom logos (header, AI avatar)</li>
                <li>App name and titles</li>
                <li>Welcome messages</li>
                <li>Colors and themes</li>
                <li>Custom domain</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Can I modify the code?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! You have full access to the source code. The license allows modifications for your own use and client projects.
                Just can't resell the codebase as a template/boilerplate.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Does ChatRAG support multiple languages?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Users can change the chatbot language in settings. Built-in support for 12+ languages including English, Spanish,
                French, German, Japanese, Chinese, Arabic, and more. Use Config UI translation tools to add new languages.
              </p>
            </div>
          </div>
        </section>

        {/* Support & Community */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Support & Community</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Where can I get help?</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Documentation: Complete guides and troubleshooting</li>
                <li>Discord Community: Real-time support and discussions</li>
                <li>GitHub Issues: Bug reports and feature requests</li>
                <li>Email Support: Direct assistance for purchasers</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Do you offer updates?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! ChatRAG receives regular updates with new features, bug fixes, and improvements. Updates are available through the repository.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Can I contribute to ChatRAG?</h3>
              <p className="text-sm text-muted-foreground">
                We welcome contributions! Fork the repository, make improvements, and submit pull requests.
                Check GitHub for contribution guidelines.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-900 dark:text-green-100">Ready to Get Started?</AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200">
          <p className="text-sm mb-2">Follow the Quick Start guide to set up your ChatRAG instance in minutes:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Clone repository and install dependencies</li>
            <li>Set up Supabase database</li>
            <li>Configure API keys via Config UI</li>
            <li>Start chatting with your AI assistant!</li>
          </ol>
          <p className="text-sm mt-3">
            <a href="/docs/quick-start" className="text-primary hover:underline">
              View Quick Start Guide →
            </a>
          </p>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/troubleshooting" className="text-primary hover:underline flex items-center">
            ← Previous: Troubleshooting
          </a>
          <a href="/docs" className="text-primary hover:underline flex items-center">
            Back to Documentation Home →
          </a>
        </div>
      </div>
    </div>
  );
}
