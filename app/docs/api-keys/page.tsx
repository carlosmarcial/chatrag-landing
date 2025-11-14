import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Key, AlertTriangle, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "API Keys - ChatRAG Documentation",
  description: "Essential API keys and configuration for ChatRAG functionality including OpenAI, Supabase, OpenRouter, and LlamaCloud.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/api-keys',
  },
  openGraph: {
    title: 'API Keys - ChatRAG Documentation',
    description: 'Essential API keys and configuration for ChatRAG functionality including OpenAI, Supabase, OpenRouter, and LlamaCloud.',
    url: 'https://www.chatrag.ai/docs/api-keys',
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

export default function APIKeysPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">API Keys Configuration</h1>
        <p className="text-xl text-muted-foreground">
          Configure essential API keys through the visual config UI to enable ChatRAG's full functionality.
        </p>
      </div>

      <Alert>
        <Key className="h-4 w-4" />
        <AlertTitle>Using the Config UI</AlertTitle>
        <AlertDescription>
          All API keys can be managed visually through the Configuration Dashboard at <code className="bg-muted px-1.5 py-0.5 rounded">http://localhost:3333</code>.
          Run <code className="bg-muted px-1.5 py-0.5 rounded">npm run config</code> to access it.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {/* Essential Keys Section */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Essential API Keys</h2>
          <p className="text-muted-foreground mb-4">
            These keys are required for core functionality and must be configured before running ChatRAG.
          </p>

          <div className="space-y-4">
            {/* OpenAI */}
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                OpenAI API Key
                <span className="ml-2 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-0.5 rounded">REQUIRED</span>
              </h3>
              <p className="text-muted-foreground mb-3">
                Required for document embeddings and reasoning models. Embeddings are essential for the RAG system to work.
              </p>

              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div>
                  <p className="font-semibold text-sm mb-1">How to get it:</p>
                  <ol className="list-decimal list-inside text-sm space-y-1 ml-2">
                    <li>Visit <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com</a></li>
                    <li>Sign up or log in to your account</li>
                    <li>Navigate to API Keys section</li>
                    <li>Generate a new secret key</li>
                    <li>Add billing information (pay-as-you-go pricing)</li>
                  </ol>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-1">Environment variable:</p>
                  <pre className="bg-background p-3 rounded overflow-x-auto text-xs">
                    <code>{`OPENAI_API_KEY=sk-proj-...`}</code>
                  </pre>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-1">Recommended model:</p>
                  <pre className="bg-background p-3 rounded overflow-x-auto text-xs">
                    <code>{`OPENAI_EMBEDDING_MODEL=text-embedding-3-small`}</code>
                  </pre>
                </div>
              </div>

              <Alert className="mt-3">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  The text-embedding-3-small model provides the best balance of performance and cost for RAG applications.
                  It generates 1536-dimensional vectors optimized for HNSW search.
                </AlertDescription>
              </Alert>
            </div>

            {/* OpenRouter */}
            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                OpenRouter API Key
                <span className="ml-2 text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-0.5 rounded">RECOMMENDED</span>
              </h3>
              <p className="text-muted-foreground mb-3">
                Access 100+ AI models from multiple providers through a unified API. Provides the best flexibility for model selection.
              </p>

              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div>
                  <p className="font-semibold text-sm mb-1">How to get it:</p>
                  <ol className="list-decimal list-inside text-sm space-y-1 ml-2">
                    <li>Visit <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">openrouter.ai</a></li>
                    <li>Create an account</li>
                    <li>Navigate to Keys section in dashboard</li>
                    <li>Generate a new API key</li>
                    <li>Add credits or connect payment method</li>
                  </ol>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-1">Environment variable:</p>
                  <pre className="bg-background p-3 rounded overflow-x-auto text-xs">
                    <code>{`OPENROUTER_API_KEY=sk-or-v1-...`}</code>
                  </pre>
                </div>

                <div className="border rounded-lg p-3 bg-background">
                  <p className="font-semibold text-sm mb-2">Available Models Include:</p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>OpenAI GPT-4, GPT-4o, o1, o3</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Anthropic Claude 3.5 Sonnet, Claude 4.1 Opus</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Google Gemini 2.5 Flash, Gemini Thinking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Meta Llama 4 Maverick</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>DeepSeek R1 (reasoning)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* LlamaCloud */}
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                LlamaCloud API Key
                <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded">REQUIRED</span>
              </h3>
              <p className="text-muted-foreground mb-3">
                Required for PDF/DOCX processing and RAG functionality. Powers the document parsing and chunking system.
              </p>

              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div>
                  <p className="font-semibold text-sm mb-1">How to get it:</p>
                  <ol className="list-decimal list-inside text-sm space-y-1 ml-2">
                    <li>Visit <a href="https://cloud.llamaindex.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cloud.llamaindex.ai</a></li>
                    <li>Sign up for a free account</li>
                    <li>Navigate to API Keys section</li>
                    <li>Generate a new secret key</li>
                  </ol>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-1">Environment variable:</p>
                  <pre className="bg-background p-3 rounded overflow-x-auto text-xs">
                    <code>{`NEXT_PUBLIC_LLAMA_CLOUD_API_KEY=llx-...`}</code>
                  </pre>
                </div>

                <div className="border rounded-lg p-3 bg-background">
                  <p className="font-semibold text-sm mb-2">What it enables:</p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>Intelligent PDF parsing with layout preservation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>DOCX and other document format support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>Smart semantic chunking for optimal retrieval</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>Table and image extraction</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Alert className="mt-3">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  LlamaCloud offers a generous free tier perfect for testing and small projects. Check their pricing page for production usage limits.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>

        {/* Minimum Configuration */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Minimum Required Configuration</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="font-semibold mb-4">To run ChatRAG locally, you must have:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span><code className="bg-background px-1.5 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code></span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span><code className="bg-background px-1.5 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span><code className="bg-background px-1.5 py-0.5 rounded">SUPABASE_SERVICE_ROLE_KEY</code> (server-only secret; never expose in browser)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span><code className="bg-background px-1.5 py-0.5 rounded">OPENAI_API_KEY</code> (required for embeddings)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span><code className="bg-background px-1.5 py-0.5 rounded">OPENROUTER_API_KEY</code> or direct OpenAI models</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span><code className="bg-background px-1.5 py-0.5 rounded">NEXT_PUBLIC_LLAMA_CLOUD_API_KEY</code></span>
              </li>
            </ul>
          </div>
        </section>

        {/* Optional Keys */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Optional API Keys</h2>
          <p className="text-muted-foreground mb-4">
            These keys enable additional features and can be configured as needed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">FAL.ai API Key</h3>
              <p className="text-sm text-muted-foreground mb-2">
                For image, video, and 3D generation
              </p>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>FAL_API_KEY=...</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Replicate API Token</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Alternative for media generation
              </p>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>REPLICATE_API_TOKEN=...</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">ElevenLabs API Key</h3>
              <p className="text-sm text-muted-foreground mb-2">
                For text-to-speech and voice features
              </p>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>ELEVENLABS_API_KEY=...</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Exa API Key</h3>
              <p className="text-sm text-muted-foreground mb-2">
                For web search functionality
              </p>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>EXA_API_KEY=...</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                Polar Payments
                <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded">RECOMMENDED</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Easiest payment setup for SaaS subscriptions
              </p>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>{`POLAR_ACCESS_TOKEN=...
NEXT_PUBLIC_POLAR_PRICE_ID_STARTER=...
NEXT_PUBLIC_POLAR_CHECKOUT_STARTER=...
NEXT_PUBLIC_POLAR_PRICE_ID_PRO=...
NEXT_PUBLIC_POLAR_CHECKOUT_PRO=...
NEXT_PUBLIC_POLAR_PRICE_ID_ENTERPRISE=...
NEXT_PUBLIC_POLAR_CHECKOUT_ENTERPRISE=...`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Stripe Keys</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Alternative payment processing
              </p>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">GitHub OAuth</h3>
              <p className="text-sm text-muted-foreground mb-2">
                For GitHub authentication
              </p>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Security Best Practices</AlertTitle>
          <AlertDescription className="space-y-2">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Variables prefixed with <code className="bg-muted px-1.5 py-0.5 rounded">NEXT_PUBLIC_</code> are exposed to the browser</li>
              <li>All other variables remain server-side only</li>
              <li>Never commit <code className="bg-muted px-1.5 py-0.5 rounded">.env.local</code> to version control</li>
              <li>Service role keys should never be exposed client-side</li>
              <li>Rotate keys regularly and use separate keys for development/production</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* How to Apply */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Applying Configuration</h2>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              After configuring your API keys through the Config UI:
            </p>

            <div className="border-l-4 border-primary pl-4 space-y-2">
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Click <strong>"Save Settings"</strong> in the Config UI</li>
                <li>Values are written to <code className="bg-muted px-1.5 py-0.5 rounded">.env.local</code></li>
                <li>Restart your development server: <code className="bg-muted px-1.5 py-0.5 rounded">Ctrl+C</code> then <code className="bg-muted px-1.5 py-0.5 rounded">npm run dev</code></li>
                <li>Verify configuration is loaded by checking the console for any missing key warnings</li>
              </ol>
            </div>

            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Pro Tip</AlertTitle>
              <AlertDescription>
                Keep the Config UI (<code className="bg-muted px-1.5 py-0.5 rounded">npm run config</code>) running alongside your dev server for quick configuration changes during development.
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/database-setup" className="text-primary hover:underline flex items-center">
            ← Previous: Database Setup
          </a>
          <a href="/docs/config-ui" className="text-primary hover:underline flex items-center">
            Next: Configuration UI →
          </a>
        </div>
      </div>
    </div>
  );
}
