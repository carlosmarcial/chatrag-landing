import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, Info, CheckCircle2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Models - ChatRAG Documentation",
  description: "Configure and manage 100+ AI models for ChatRAG including GPT-4, Claude, Gemini, and reasoning models like o1 and DeepSeek R1.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/ai-models',
  },
  openGraph: {
    title: 'AI Models - ChatRAG Documentation',
    description: 'Configure and manage 100+ AI models for ChatRAG including GPT-4, Claude, Gemini, and reasoning models like o1 and DeepSeek R1.',
    url: 'https://www.chatrag.ai/docs/ai-models',
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

export default function AIModelsPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">AI Models</h1>
        <p className="text-xl text-muted-foreground">
          ChatRAG supports 100+ AI models from multiple providers with reasoning capabilities, multi-modal generation, and flexible configuration.
        </p>
      </div>

      <Alert>
        <Brain className="h-4 w-4" />
        <AlertTitle>Multiple Providers Supported</AlertTitle>
        <AlertDescription>
          Access models from OpenAI, Anthropic, Google, Meta, and more through OpenRouter or direct API integrations.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Model Providers */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Model Providers</h2>

          <div className="space-y-4">
            <div className="border-2 border-primary rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">OpenRouter (Recommended)</h3>
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">100+ Models</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Unified API for accessing models from multiple providers with competitive pricing
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">OpenAI</p>
                  <p className="text-muted-foreground">GPT-4, GPT-4o, o1, o3</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Anthropic</p>
                  <p className="text-muted-foreground">Claude 3.5, 4.1 Opus</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Google</p>
                  <p className="text-muted-foreground">Gemini 2.5 Flash, Thinking</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Meta</p>
                  <p className="text-muted-foreground">Llama 4 Maverick</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Direct Provider APIs</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Connect directly to individual providers for specific features
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">OpenAI:</span> Required for embeddings, optional for chat models
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Anthropic:</span> Direct Claude API access
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Google:</span> Gemini models
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Configured Models */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Pre-configured Models</h2>
          <p className="text-muted-foreground mb-4">
            ChatRAG comes with these models ready to use:
          </p>

          <div className="space-y-3">
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">GPT-4.1 Mini</h3>
                <div className="flex gap-1">
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded">Fast</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">Cost-effective</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Ideal for general chat and quick responses</p>
            </div>

            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Claude Sonnet 4.5</h3>
                <div className="flex gap-1">
                  <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded">🧠 Reasoning</span>
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded">Default</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Extended thinking, excellent for complex tasks</p>
            </div>

            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Gemini 2.5 Flash</h3>
                <div className="flex gap-1">
                  <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-0.5 rounded">Lightning</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Ultra-fast responses, large context window</p>
            </div>

            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Llama 4 Maverick</h3>
                <div className="flex gap-1">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">🔓 Open Source</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Open source, privacy-focused</p>
            </div>

            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Venice: Uncensored</h3>
                <div className="flex gap-1">
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded">🎁 Free</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">🔓 Open</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Uncensored model, free tier available</p>
            </div>
          </div>
        </section>

        {/* Reasoning Models */}
        <section className="border-l-4 border-purple-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Reasoning / Thinking Models</h2>
          <p className="text-muted-foreground mb-4">
            Advanced models that use extended thinking for complex problem-solving:
          </p>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">OpenAI o1/o3 Series</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Reasoning through effort levels (low, medium, high)
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_REASONING_ENABLED=true
NEXT_PUBLIC_DEFAULT_REASONING_EFFORT=medium`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Claude 3.7+ Extended Thinking</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Token-based reasoning (up to 32k reasoning tokens)
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_MAX_REASONING_TOKENS=8000
NEXT_PUBLIC_SHOW_REASONING_BY_DEFAULT=false`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">DeepSeek R1</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Dual method (effort + tokens)
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Gemini Thinking</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Token-based reasoning with configurable limits
              </p>
            </div>
          </div>

          <Alert className="mt-4">
            <Sparkles className="h-4 w-4" />
            <AlertTitle>When to Use Reasoning Models</AlertTitle>
            <AlertDescription className="text-sm">
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Complex problem-solving and analysis</li>
                <li>Mathematical or logical reasoning</li>
                <li>Multi-step planning and strategy</li>
                <li>Code debugging and optimization</li>
              </ul>
            </AlertDescription>
          </Alert>
        </section>

        {/* Adding Models */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Adding Models</h2>
          <p className="text-muted-foreground mb-4">
            Add new models through the Config UI or manually:
          </p>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Via Config UI (Recommended)</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Open <code className="bg-muted px-1 py-0.5 rounded">npm run config</code></li>
                <li>Navigate to Models section</li>
                <li>Click "Fetch Models" to get latest from OpenRouter</li>
                <li>Or manually add model with ID and display name</li>
                <li>Save configuration</li>
                <li>Restart dev server</li>
              </ol>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Manual Configuration</h3>
              <Alert className="mb-3">
                <Info className="h-4 w-4" />
                <AlertTitle>Important: Sync 5 Locations</AlertTitle>
                <AlertDescription className="text-xs">
                  Models must be synchronized across 5 locations:
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>.env.local</li>
                    <li>scripts/init-env.js</li>
                    <li>src/lib/env.ts</li>
                    <li>scripts/config-server.js</li>
                    <li>scripts/config-ui/index.html (3 fallback arrays)</li>
                  </ol>
                </AlertDescription>
              </Alert>

              <p className="text-sm text-muted-foreground mb-2">Model schema:</p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`{
  "id": "openai/gpt-4o",
  "displayName": "GPT-4o",
  "isFree": false,
  "isOpenSource": false,
  "supportsReasoning": false,
  "reasoningMethod": "none",
  "contextLength": 128000,
  "description": "Latest GPT-4 model"
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Model Selection Best Practices */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Model Selection Guide</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">For General Chat</h3>
              <p className="text-sm text-muted-foreground">
                Use <strong>GPT-4o-mini</strong> or <strong>Claude Sonnet 4.5</strong> for balanced performance and cost
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">For RAG Applications</h3>
              <p className="text-sm text-muted-foreground">
                Use <strong>Claude Sonnet 4.5</strong> for best context understanding and citation accuracy
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">For WhatsApp</h3>
              <p className="text-sm text-muted-foreground">
                Use <strong>GPT-4o-mini</strong> or <strong>Gemini Flash</strong> for fast, concise mobile responses
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">For Complex Tasks</h3>
              <p className="text-sm text-muted-foreground">
                Use <strong>o1</strong>, <strong>o3</strong>, or <strong>Claude with extended thinking</strong> for reasoning
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">For Cost Optimization</h3>
              <p className="text-sm text-muted-foreground">
                Use free tier models like <strong>Venice Uncensored</strong> or <strong>Llama 4 Maverick</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Model Configuration</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Default Models</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`# Set default model for chat
NEXT_PUBLIC_DEFAULT_MODEL=anthropic/claude-sonnet-4.5

# WhatsApp specific
WHATSAPP_DEFAULT_MODEL=openai/gpt-4o-mini

# Embed widget
NEXT_PUBLIC_EMBED_MODEL=openai/gpt-4o-mini`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Temperature & Parameters</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Adjust model creativity and randomness (typically set per-request in UI)
              </p>
            </div>
          </div>
        </section>
      </div>

      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">Model Icons in UI</AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <p className="text-sm mb-2">Models display these indicators:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>🧠</strong> = Supports reasoning/thinking (supportsReasoning: true)</li>
            <li><strong>🎁</strong> = Free tier available (isFree: true)</li>
            <li><strong>🔓</strong> = Open source model (isOpenSource: true)</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/document-processing" className="text-primary hover:underline flex items-center">
            ← Previous: Document Processing
          </a>
          <a href="/docs/authentication" className="text-primary hover:underline flex items-center">
            Next: Authentication →
          </a>
        </div>
      </div>
    </div>
  );
}
