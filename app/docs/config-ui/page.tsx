import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Settings, Info, Lightbulb, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Configuration UI - ChatRAG Documentation",
  description: "Visual configuration dashboard for managing ChatRAG settings, API keys, models, and features without editing code.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/config-ui',
  },
  openGraph: {
    title: 'Configuration UI - ChatRAG Documentation',
    description: 'Visual configuration dashboard for managing ChatRAG settings, API keys, models, and features without editing code.',
    url: 'https://www.chatrag.ai/docs/config-ui',
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

export default function ConfigUIPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Configuration UI Guide</h1>
        <p className="text-xl text-muted-foreground">
          The visual configuration UI provides a web interface for all ChatRAG settings - no code editing required.
        </p>
      </div>

      <Alert>
        <Settings className="h-4 w-4" />
        <AlertTitle>Important Note</AlertTitle>
        <AlertDescription>
          For the RAG System Prompt editor to work, keep the main app running in another terminal.
          The Config UI proxies to <code className="bg-muted px-1.5 py-0.5 rounded">http://localhost:3000</code>.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Accessing Config UI */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Accessing the Config UI</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>Launch the configuration dashboard with:</p>

            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`npm run config
# Opens http://localhost:3333`}</code>
            </pre>

            <Alert className="mt-4">
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Development Workflow</AlertTitle>
              <AlertDescription>
                Keep both terminals running simultaneously:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Terminal 1:</strong> <code className="bg-muted px-1.5 py-0.5 rounded">npm run dev</code> (port 3000) - Main application</li>
                  <li><strong>Terminal 2:</strong> <code className="bg-muted px-1.5 py-0.5 rounded">npm run config</code> (port 3333) - Config dashboard</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Configuration Sections */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Configuration Sections</h2>

          <div className="space-y-4">
            {/* API Keys Tab */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">API Keys Tab</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage all service API keys in one place
                  </p>
                </div>
              </div>

              <div className="ml-11 space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Configure:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Supabase credentials (URL, Anon Key, Service Role Key)</li>
                  <li>OpenAI API key for embeddings and models</li>
                  <li>OpenRouter API key for 100+ AI models</li>
                  <li>LlamaCloud API key for document processing</li>
                  <li>FAL.ai, Replicate for media generation</li>
                  <li>ElevenLabs for voice features</li>
                  <li>Exa for web search</li>
                  <li>Stripe/Polar for payments</li>
                </ul>
                <Alert className="mt-3">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Keys are automatically validated when saved. Invalid keys will show error messages.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Features Tab */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Features Tab</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enable or disable ChatRAG features
                  </p>
                </div>
              </div>

              <div className="ml-11 space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Toggle features:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Authentication system</li>
                  <li>RAG document system</li>
                  <li>Image generation (OpenAI, FAL, Replicate)</li>
                  <li>Video generation</li>
                  <li>3D model generation</li>
                  <li>WhatsApp integration</li>
                  <li>MCP tools</li>
                  <li>Web search</li>
                  <li>Reasoning models</li>
                  <li>Embed widget</li>
                </ul>
              </div>
            </div>

            {/* Branding Tab */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Branding Tab</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Customize your ChatRAG instance appearance
                  </p>
                </div>
              </div>

              <div className="ml-11 space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Customize:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>App name and title</li>
                  <li>Favicon URL</li>
                  <li>Header logo (text or image)</li>
                  <li>AI response avatar logo</li>
                  <li>Logo sizes and borders</li>
                  <li>Custom colors and themes</li>
                  <li>Welcome messages and text</li>
                  <li>UI preferences</li>
                </ul>
              </div>
            </div>

            {/* System Prompts */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">RAG System Prompt</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure how AI uses your documents
                  </p>
                </div>
              </div>

              <div className="ml-11 space-y-2 text-sm text-muted-foreground">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Critical Requirement</AlertTitle>
                  <AlertDescription>
                    Your prompt MUST include <code className="bg-muted px-1.5 py-0.5 rounded">{`{{context}}`}</code> exactly. Without it, RAG won't work.
                  </AlertDescription>
                </Alert>

                <div className="mt-3">
                  <p className="font-semibold text-foreground">Features:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Pre-configured templates (helpful, professional, educational, technical)</li>
                    <li>Industry-specific templates (sales, support, research, code assistant)</li>
                    <li>WhatsApp-optimized template (concise, conversational)</li>
                    <li>AI translation support for multilingual prompts</li>
                    <li>Pre-context and post-context configuration</li>
                    <li>Real-time preview</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Model Management */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Model Management</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add, remove, and configure AI models
                  </p>
                </div>
              </div>

              <div className="ml-11 space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Capabilities:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Add/remove OpenAI models</li>
                  <li>Add/remove OpenRouter models</li>
                  <li>Fetch latest models from OpenRouter API</li>
                  <li>Set default models per feature</li>
                  <li>Configure reasoning parameters (effort, tokens)</li>
                  <li>Mark models as free or open source</li>
                </ul>
              </div>
            </div>

            {/* WhatsApp Configuration */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  6
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">WhatsApp Configuration</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Set up WhatsApp integration
                  </p>
                </div>
              </div>

              <div className="ml-11 space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Configure:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Provider selection (Fly.io or Koyeb)</li>
                  <li>Provider URL and API key</li>
                  <li>Webhook URL and secret</li>
                  <li>Enable MCP tools in WhatsApp</li>
                  <li>Enable web search in WhatsApp</li>
                  <li>Default model for WhatsApp</li>
                  <li>Session limits</li>
                  <li>Message queue settings</li>
                </ul>
              </div>
            </div>

            {/* MCP Management */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  7
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">MCP Management</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage Model Context Protocol integrations
                  </p>
                </div>
              </div>

              <div className="ml-11 space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Features:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Configure Zapier MCP endpoint</li>
                  <li>Add custom MCP servers</li>
                  <li>Test server connections</li>
                  <li>Health monitoring</li>
                  <li>YOLO mode toggle (auto-approve tools)</li>
                  <li>Enable/disable in chat or embed</li>
                  <li>Discover available tools</li>
                </ul>
              </div>
            </div>

            {/* Admin Tools */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  8
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Admin Tools</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    User and system management
                  </p>
                </div>
              </div>

              <div className="ml-11 space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Access to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>User management and admin access</li>
                  <li>Database inspection tools</li>
                  <li>Prompt testing interface</li>
                  <li>Document reprocessing</li>
                  <li>System health checks</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Saving Configuration */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Saving & Applying Changes</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>After making configuration changes:</p>

            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Click <strong>"Save Settings"</strong> or <strong>"Save All Changes"</strong> in the Config UI</li>
              <li>Configuration is written to <code className="bg-muted px-1.5 py-0.5 rounded">.env.local</code></li>
              <li>Some settings are also synced to Supabase <code className="bg-muted px-1.5 py-0.5 rounded">admin_settings</code> table</li>
              <li>Restart your development server to apply changes:</li>
            </ol>

            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-3">
              <code>{`# In your dev terminal:
Ctrl+C  # Stop the server
npm run dev  # Start again`}</code>
            </pre>

            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Configuration Persistence</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Changes are saved to <code className="bg-muted px-1.5 py-0.5 rounded">.env.local</code></li>
                  <li>Next.js reads environment variables on startup</li>
                  <li>Restart required to reload environment changes</li>
                  <li>Config UI validates settings before saving</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Real-time Preview */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Real-time Testing</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>Test your configuration changes in real-time:</p>

            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <div>
                  <p className="font-semibold text-foreground">Make changes in Config UI</p>
                  <p className="text-sm">Update any settings, API keys, or features</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <div>
                  <p className="font-semibold text-foreground">Save configuration</p>
                  <p className="text-sm">Click save and wait for confirmation</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <div>
                  <p className="font-semibold text-foreground">Restart dev server</p>
                  <p className="text-sm">Reload environment variables</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-bold mr-2">4.</span>
                <div>
                  <p className="font-semibold text-foreground">Test in main app</p>
                  <p className="text-sm">Visit <code className="bg-background px-1.5 py-0.5 rounded">http://localhost:3000</code> to verify changes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Production Deployment */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Production Deployment</h2>
          <div className="space-y-3 text-muted-foreground">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Config UI is Development Only</AlertTitle>
              <AlertDescription>
                The Config UI is a local tool for development. For production, set environment variables directly in your hosting provider (Vercel, etc.).
              </AlertDescription>
            </Alert>

            <div className="border rounded-lg p-4 mt-4">
              <p className="font-semibold text-foreground mb-2">For production deployment:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Configure everything locally using the Config UI</li>
                <li>Copy your finalized <code className="bg-muted px-1.5 py-0.5 rounded">.env.local</code> settings</li>
                <li>Paste environment variables into your hosting provider's dashboard (e.g., Vercel Environment Variables)</li>
                <li>Deploy your application</li>
              </ol>
            </div>
          </div>
        </section>
      </div>

      <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <Lightbulb className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-900 dark:text-green-100">Pro Tips</AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200">
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Use the Config UI's "Fetch Models" button to automatically discover new OpenRouter models</li>
            <li>Test your RAG system prompt with the preview feature before saving</li>
            <li>Keep a backup of your <code className="bg-muted px-1.5 py-0.5 rounded">.env.local</code> file with working settings</li>
            <li>Use the validation features to catch configuration errors before deployment</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/api-keys" className="text-primary hover:underline flex items-center">
            ← Previous: API Keys
          </a>
          <a href="/docs/system-prompt" className="text-primary hover:underline flex items-center">
            Next: System Prompt →
          </a>
        </div>
      </div>
    </div>
  );
}
