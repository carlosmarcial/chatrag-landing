import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageCircle, Info, CheckCircle2, AlertTriangle, Lightbulb, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "WhatsApp Integration - ChatRAG Documentation",
  description: "Connect ChatRAG to WhatsApp using Bailey's on Fly.io or Koyeb. Enable AI-powered WhatsApp messaging for your business.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/whatsapp',
  },
  openGraph: {
    title: 'WhatsApp Integration - ChatRAG Documentation',
    description: 'Connect ChatRAG to WhatsApp using Bailey\'s on Fly.io or Koyeb. Enable AI-powered WhatsApp messaging for your business.',
    url: 'https://www.chatrag.ai/docs/whatsapp',
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

export default function WhatsAppIntegrationPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">WhatsApp Integration</h1>
        <p className="text-xl text-muted-foreground">
          Connect ChatRAG to WhatsApp using Bailey's (open-source WhatsApp Web API).
          Deploy on Fly.io or Koyeb and start messaging with your AI assistant.
        </p>
      </div>

      <Alert>
        <MessageCircle className="h-4 w-4" />
        <AlertTitle>Ready-to-Deploy Bailey's</AlertTitle>
        <AlertDescription>
          ChatRAG has prepared a Bailey's implementation specifically configured to work seamlessly with the platform.
          Available at: <a href="https://github.com/areia-ai/chatrag" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
            github.com/areia-ai/chatrag <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Provider Selection */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Provider Selection</h2>
          <p className="text-muted-foreground mb-4">
            ChatRAG supports two cloud providers for hosting Bailey's. Choose based on your preference:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-primary rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Fly.io</h3>
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Recommended</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Edge computing platform with global distribution</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Low latency with regional deployments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Generous free tier for testing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Persistent volumes for session storage</span>
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Koyeb</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Serverless platform with auto-scaling</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Free tier available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Simple deployment process</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>GitHub integration</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Setting Up Bailey's on Fly.io */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Setting Up Bailey's on Fly.io</h2>
          <p className="text-muted-foreground mb-4">
            Follow these steps to deploy the ChatRAG-ready Bailey's implementation on Fly.io.
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Install Fly CLI</h3>
                </div>
              </div>

              <div className="ml-11 space-y-3 text-sm text-muted-foreground">
                <p>Install the Fly.io command-line tool:</p>

                <div className="space-y-2">
                  <p className="font-semibold text-foreground">macOS/Linux:</p>
                  <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                    <code>curl -L https://fly.io/install.sh | sh</code>
                  </pre>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Windows:</p>
                  <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                    <code>pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"</code>
                  </pre>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Verify installation:</p>
                  <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                    <code>flyctl version</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Sign Up and Authenticate</h3>
                </div>
              </div>

              <div className="ml-11 space-y-3 text-sm text-muted-foreground">
                <p>Create a Fly.io account and log in:</p>
                <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                  <code>{`# Sign up (opens browser)
flyctl auth signup

# Or log in if you already have an account
flyctl auth login`}</code>
                </pre>
                <Alert className="mt-2">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    You'll need to add a credit card, but Fly.io offers a generous free tier that's sufficient for testing and small-scale deployments.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Clone ChatRAG Bailey's Repository</h3>
                </div>
              </div>

              <div className="ml-11 space-y-3 text-sm text-muted-foreground">
                <p>Clone the ready-to-deploy Bailey's implementation:</p>
                <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                  <code>{`git clone https://github.com/areia-ai/chatrag.git
cd chatrag`}</code>
                </pre>
                <Alert className="mt-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    This repository contains a Bailey's setup specifically configured to work with ChatRAG, including:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Webhook integration</li>
                      <li>Session persistence</li>
                      <li>QR code generation</li>
                      <li>Message handling</li>
                      <li>Connection monitoring</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Launch Fly.io Application</h3>
                </div>
              </div>

              <div className="ml-11 space-y-3 text-sm text-muted-foreground">
                <p>Initialize and deploy your Bailey's instance:</p>
                <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                  <code>{`# Launch the app (follow the prompts)
flyctl launch

# When prompted:
# - App name: choose a unique name (e.g., baileys-chatrag)
# - Region: select closest to your users
# - Postgres: No
# - Redis: No`}</code>
                </pre>

                <Alert className="mt-3">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Configuration Notes</AlertTitle>
                  <AlertDescription className="text-xs space-y-1 mt-2">
                    <p>The repository includes a pre-configured <code className="bg-muted px-1 py-0.5 rounded">fly.toml</code> file with:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li>Node.js runtime settings</li>
                      <li>Volume mounts for session storage</li>
                      <li>Health check endpoints</li>
                      <li>HTTP service configuration</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Step 5 */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Create Persistent Volume</h3>
                </div>
              </div>

              <div className="ml-11 space-y-3 text-sm text-muted-foreground">
                <p>Create a volume to store WhatsApp session data:</p>
                <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                  <code>{`# Create volume for session persistence
flyctl volumes create baileys_data --size 1 --region <your-region>

# Example:
flyctl volumes create baileys_data --size 1 --region iad`}</code>
                </pre>
                <p className="text-xs">
                  This ensures your WhatsApp sessions persist across deployments and restarts.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  6
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Deploy the Application</h3>
                </div>
              </div>

              <div className="ml-11 space-y-3 text-sm text-muted-foreground">
                <p>Deploy your Bailey's instance:</p>
                <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                  <code>{`# Deploy to Fly.io
flyctl deploy

# Your app will be available at:
# https://your-app-name.fly.dev`}</code>
                </pre>
              </div>
            </div>

            {/* Step 7 */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  7
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Configure ChatRAG</h3>
                </div>
              </div>

              <div className="ml-11 space-y-3 text-sm text-muted-foreground">
                <p>Update your ChatRAG configuration with the Fly.io URL:</p>
                <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                  <code>{`# Open Config UI
npm run config

# Set these values:
WHATSAPP_PROVIDER=flyio
FLYIO_BAILEYS_URL=https://your-app-name.fly.dev
FLYIO_API_KEY=  # Optional: set if you configured auth

# Save and restart ChatRAG
npm run dev`}</code>
                </pre>
              </div>
            </div>

            {/* Step 8 */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
                  8
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Set Up Webhook</h3>
                </div>
              </div>

              <div className="ml-11 space-y-3 text-sm text-muted-foreground">
                <p>Configure the webhook so Bailey's can send messages to ChatRAG:</p>

                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-foreground mb-1">For local development (recommended):</p>
                    <p className="text-xs mb-2">Use ngrok to expose your local ChatRAG instance:</p>
                    <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                      <code>{`# Install ngrok: https://ngrok.com
# Start ngrok
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok-free.app)
# Set in Config UI:
WHATSAPP_WEBHOOK_URL=https://abc123.ngrok-free.app
WHATSAPP_WEBHOOK_SECRET=chatrag-whatsapp-secret-2025`}</code>
                    </pre>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground mb-1">For production:</p>
                    <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                      <code>{`WHATSAPP_WEBHOOK_URL=https://your-chatrag-domain.com
WHATSAPP_WEBHOOK_SECRET=your-secure-secret`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Setting Up Bailey's on Koyeb */}
        <section className="border-l-4 border-blue-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Setting Up Bailey's on Koyeb (Alternative)</h2>
          <p className="text-muted-foreground mb-4">
            If you prefer Koyeb over Fly.io, follow these steps:
          </p>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
                <li>Sign up at <a href="https://koyeb.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">koyeb.com</a></li>
                <li>Connect your GitHub account</li>
                <li>Create a new app and select the Bailey's repository</li>
                <li>Configure build settings (Node.js, install dependencies)</li>
                <li>Set environment variables if needed</li>
                <li>Deploy and copy the generated URL</li>
                <li>Configure ChatRAG with <code className="bg-muted px-1 py-0.5 rounded">WHATSAPP_PROVIDER=koyeb</code></li>
              </ol>
            </div>
          </div>
        </section>

        {/* Connecting WhatsApp */}
        <section className="border-l-4 border-green-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Connecting Your WhatsApp Account</h2>
          <p className="text-muted-foreground mb-4">
            Once Bailey's is deployed and configured, connect your WhatsApp account:
          </p>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Step 1: Initiate Connection</h3>
              <p className="text-sm text-muted-foreground mb-2">
                In ChatRAG, navigate to WhatsApp settings and click "Connect WhatsApp"
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Step 2: Scan QR Code</h3>
              <p className="text-sm text-muted-foreground mb-2">
                A QR code will appear. Open WhatsApp on your phone:
              </p>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Go to Settings → Linked Devices</li>
                <li>Tap "Link a Device"</li>
                <li>Scan the QR code displayed in ChatRAG</li>
              </ol>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Step 3: Confirm Connection</h3>
              <p className="text-sm text-muted-foreground">
                Once scanned, your WhatsApp will be connected to ChatRAG. You'll see a "Connected" status.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Step 4: Test Messaging</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Send a test message from WhatsApp to verify the integration:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Send a message to any contact</li>
                <li>ChatRAG should receive and process it</li>
                <li>AI response will be sent back via WhatsApp</li>
              </ul>
            </div>
          </div>
        </section>

        {/* WhatsApp Features */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">WhatsApp Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Multi-Device Support
              </h3>
              <p className="text-sm text-muted-foreground">
                Use WhatsApp on phone while ChatRAG handles messages
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Session Persistence
              </h3>
              <p className="text-sm text-muted-foreground">
                Stay connected across deployments and restarts
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Auto-Reconnection
              </h3>
              <p className="text-sm text-muted-foreground">
                Automatically reconnects if connection drops
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Message Queue
              </h3>
              <p className="text-sm text-muted-foreground">
                Handles message bursts with configurable queue size
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Webhook Delivery
              </h3>
              <p className="text-sm text-muted-foreground">
                Reliable message delivery with tracking
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Health Monitoring
              </h3>
              <p className="text-sm text-muted-foreground">
                Track connection status and uptime
              </p>
            </div>
          </div>
        </section>

        {/* Configuration Options */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Configuration Options</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Basic Settings</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_WHATSAPP_ENABLED=true
WHATSAPP_PROVIDER=flyio  # or koyeb
FLYIO_BAILEYS_URL=https://baileys-chatrag.fly.dev
WHATSAPP_WEBHOOK_URL=https://your-chatrag-url.com
WHATSAPP_WEBHOOK_SECRET=chatrag-whatsapp-secret-2025`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">AI Model Settings</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`WHATSAPP_DEFAULT_MODEL=openai/gpt-4o-mini
WHATSAPP_MAX_TOKENS=2048`}</code>
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                Use concise models for WhatsApp to keep responses brief and mobile-friendly
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Feature Toggles</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`WHATSAPP_ENABLE_MCP=false  # Enable MCP tools in WhatsApp
WHATSAPP_ENABLE_WEB_SEARCH=false  # Enable web search`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Session & Queue Management</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`WHATSAPP_MAX_SESSIONS_PER_USER=5
WHATSAPP_MESSAGE_QUEUE_SIZE=10`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Best Practices</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Use WhatsApp-Optimized Prompts</p>
                <p className="text-sm text-muted-foreground">
                  Configure the "WhatsApp Conversational" system prompt template for concise, mobile-friendly responses
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Monitor Connection Health</p>
                <p className="text-sm text-muted-foreground">
                  Regularly check the connection status in ChatRAG's WhatsApp settings
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Keep Webhook URL Public</p>
                <p className="text-sm text-muted-foreground">
                  Ensure your webhook URL is accessible from the internet (use ngrok for local dev)
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Limit Token Usage</p>
                <p className="text-sm text-muted-foreground">
                  Set WHATSAPP_MAX_TOKENS to a lower value (1024-2048) for faster, cheaper responses
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Backup Session Data</p>
                <p className="text-sm text-muted-foreground">
                  Fly.io volumes persist data, but keep backups of your session credentials
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Troubleshooting</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">QR code not generating</h3>
              <p className="text-sm text-muted-foreground mb-2">Solutions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Verify Bailey's is deployed and accessible at your FLYIO_BAILEYS_URL</li>
                <li>Check Fly.io logs: <code className="bg-muted px-1 py-0.5 rounded">flyctl logs</code></li>
                <li>Ensure the service is running: <code className="bg-muted px-1 py-0.5 rounded">flyctl status</code></li>
                <li>Restart the app: <code className="bg-muted px-1 py-0.5 rounded">flyctl apps restart</code></li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Messages not reaching ChatRAG</h3>
              <p className="text-sm text-muted-foreground mb-2">Solutions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Verify WHATSAPP_WEBHOOK_URL is publicly accessible</li>
                <li>Check webhook secret matches on both sides</li>
                <li>Test webhook endpoint: <code className="bg-muted px-1 py-0.5 rounded">curl https://your-webhook-url/api/whatsapp/webhook</code></li>
                <li>Check ChatRAG logs for webhook errors</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Connection keeps dropping</h3>
              <p className="text-sm text-muted-foreground mb-2">Solutions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Verify persistent volume is mounted correctly</li>
                <li>Check Fly.io app isn't sleeping (scale to prevent auto-sleep)</li>
                <li>Ensure phone has stable internet connection</li>
                <li>Don't log out of WhatsApp Web on other devices</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Responses are too slow</h3>
              <p className="text-sm text-muted-foreground mb-2">Solutions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Lower WHATSAPP_MAX_TOKENS (try 1024-1500)</li>
                <li>Use faster model (gpt-4o-mini instead of gpt-4)</li>
                <li>Use WhatsApp-optimized system prompt</li>
                <li>Deploy Fly.io app in region closer to users</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <MessageCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-900 dark:text-green-100">WhatsApp Integration Architecture</AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200">
          <p className="text-sm mb-2">ChatRAG's WhatsApp integration includes:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Provider Factory:</strong> Automatic provider selection (Fly.io/Koyeb)</li>
            <li><strong>Session Manager:</strong> Persistent WhatsApp Web sessions</li>
            <li><strong>Webhook Handler:</strong> Real-time message processing (27KB handler)</li>
            <li><strong>Message Converter:</strong> Format conversion between WhatsApp and ChatRAG</li>
            <li><strong>Connection Monitor:</strong> Health checks and auto-reconnection</li>
            <li><strong>12 API Endpoints:</strong> Full WhatsApp control (connect, disconnect, QR, status, etc.)</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/mcp-integration" className="text-primary hover:underline flex items-center">
            ← Previous: MCP Integration
          </a>
          <a href="/docs/branding" className="text-primary hover:underline flex items-center">
            Next: Branding & UI →
          </a>
        </div>
      </div>
    </div>
  );
}
