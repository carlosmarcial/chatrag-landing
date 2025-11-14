import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plug, Info, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Integration - ChatRAG Documentation",
  description: "Connect external tools and services to ChatRAG using Model Context Protocol (MCP) with Zapier for Gmail, Calendar, Drive, and custom servers.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/mcp-integration',
  },
  openGraph: {
    title: 'MCP Integration - ChatRAG Documentation',
    description: 'Connect external tools and services to ChatRAG using Model Context Protocol (MCP) with Zapier for Gmail, Calendar, Drive, and custom servers.',
    url: 'https://www.chatrag.ai/docs/mcp-integration',
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

export default function MCPIntegrationPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">MCP Integration</h1>
        <p className="text-xl text-muted-foreground">
          Connect external tools and services to ChatRAG using the Model Context Protocol (MCP).
          Integrate with Zapier for Gmail, Calendar, Drive, and add custom MCP servers.
        </p>
      </div>

      <Alert>
        <Plug className="h-4 w-4" />
        <AlertTitle>What is MCP?</AlertTitle>
        <AlertDescription>
          Model Context Protocol is an open standard for connecting AI applications with external tools and data sources.
          ChatRAG comes pre-configured with Zapier MCP support and allows adding custom MCP servers.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* What MCP Enables */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">What MCP Enables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Tool Execution
              </h3>
              <p className="text-sm text-muted-foreground">
                Execute actions in external services directly from chat conversations
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Data Access
              </h3>
              <p className="text-sm text-muted-foreground">
                Retrieve information from connected services in real-time
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Approval Flows
              </h3>
              <p className="text-sm text-muted-foreground">
                User approval required before executing sensitive operations
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Multi-Step Workflows
              </h3>
              <p className="text-sm text-muted-foreground">
                Chain multiple tool calls to handle complex tasks
              </p>
            </div>
          </div>
        </section>

        {/* Zapier MCP (Pre-configured) */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Zapier MCP (Pre-configured)</h2>
          <p className="text-muted-foreground mb-4">
            ChatRAG comes with Zapier MCP already configured! You just need to add your Zapier MCP endpoint URL to start using it.
          </p>

          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>What's Already Set Up</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Pattern-based intent detection for Zapier tools</li>
                <li>Gmail, Google Calendar, and Google Drive integrations</li>
                <li>Query classification and routing</li>
                <li>Tool caching for 15-minute sessions</li>
                <li>Approval flow UI</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Setup Steps */}
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold">Setup Steps:</h3>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold mr-3 flex-shrink-0">1</span>
                <h4 className="font-semibold">Get Your Zapier MCP Endpoint</h4>
              </div>
              <p className="text-sm text-muted-foreground ml-9 mb-2">
                Visit{" "}
                <a href="https://zapier.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Zapier
                </a>{" "}
                and navigate to the MCP integrations section to get your endpoint URL.
              </p>
              <div className="ml-9 bg-muted p-3 rounded-lg">
                <p className="text-xs font-semibold mb-1">Your endpoint will look like:</p>
                <pre className="text-xs overflow-x-auto">
                  <code>https://mcp.zapier.com/api/mcp/s/[YOUR-TOKEN]/mcp</code>
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold mr-3 flex-shrink-0">2</span>
                <h4 className="font-semibold">Configure in ChatRAG</h4>
              </div>
              <p className="text-sm text-muted-foreground ml-9 mb-2">
                Open the Config UI and add your Zapier MCP endpoint:
              </p>
              <div className="ml-9 space-y-2">
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                  <code>{`npm run config
# Navigate to: MCP → Zapier Configuration
# Paste your endpoint URL
# Click Save`}</code>
                </pre>
                <p className="text-xs text-muted-foreground">
                  Or set directly in .env.local:
                </p>
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                  <code>MCP_ZAPIER_ENDPOINT=https://mcp.zapier.com/api/mcp/s/[YOUR-TOKEN]/mcp</code>
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-sm font-bold mr-3 flex-shrink-0">3</span>
                <h4 className="font-semibold">Enable MCP System</h4>
              </div>
              <p className="text-sm text-muted-foreground ml-9 mb-2">
                Enable MCP in your configuration:
              </p>
              <div className="ml-9 bg-muted p-3 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  <code>{`NEXT_PUBLIC_MCP_SYSTEM_ENABLED=true
NEXT_PUBLIC_MCP_TOOLS_LIST_ENABLED=true`}</code>
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-sm font-bold mr-3 flex-shrink-0">4</span>
                <h4 className="font-semibold">Test Your Integration</h4>
              </div>
              <p className="text-sm text-muted-foreground ml-9 mb-2">
                Restart your dev server and try these queries:
              </p>
              <div className="ml-9 bg-muted p-3 rounded-lg space-y-2">
                <p className="text-xs font-semibold">Example queries:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>"Fetch my last 5 emails"</li>
                  <li>"Check my calendar for tomorrow"</li>
                  <li>"Upload this image to Google Drive"</li>
                  <li>"Draft a reply to the last email"</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Available Zapier Tools */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Pre-configured Zapier Tools</h2>
          <p className="text-muted-foreground mb-4">
            ChatRAG has pattern-based detection for these Zapier MCP tools:
          </p>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">Gmail - Find Email</h3>
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">High Confidence</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Search and retrieve emails from Gmail</p>
              <div className="bg-muted p-2 rounded text-xs">
                <p className="font-semibold mb-1">Example queries:</p>
                <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                  <li>"fetch my last 5 emails"</li>
                  <li>"show recent emails from john@example.com"</li>
                  <li>"check my inbox"</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">Gmail - Create Draft</h3>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Medium Confidence</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Create email drafts in Gmail</p>
              <div className="bg-muted p-2 rounded text-xs">
                <p className="font-semibold mb-1">Example queries:</p>
                <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                  <li>"draft an email to john@example.com"</li>
                  <li>"create a gmail draft about meeting"</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">Gmail - Reply to Email</h3>
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">High Confidence</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Send replies to emails</p>
              <div className="bg-muted p-2 rounded text-xs">
                <p className="font-semibold mb-1">Example queries:</p>
                <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                  <li>"reply to john's email saying yes"</li>
                  <li>"send a reply to the last email"</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">Google Calendar - Find Event</h3>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Medium Confidence</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Search calendar events</p>
              <div className="bg-muted p-2 rounded text-xs">
                <p className="font-semibold mb-1">Example queries:</p>
                <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                  <li>"check my calendar for Monday"</li>
                  <li>"what's scheduled for tomorrow?"</li>
                  <li>"show my meetings this week"</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">Google Drive - Upload File</h3>
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">High Confidence</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Upload files to Google Drive</p>
              <div className="bg-muted p-2 rounded text-xs">
                <p className="font-semibold mb-1">Example queries:</p>
                <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                  <li>"upload this image to drive"</li>
                  <li>"save to google drive"</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Adding Custom MCP Servers */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Adding Custom MCP Servers</h2>
          <p className="text-muted-foreground mb-4">
            Beyond Zapier, you can connect any MCP-compatible server to ChatRAG.
          </p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step-by-Step Guide:</h3>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">1. Open Config UI</h4>
              <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                <code>npm run config</code>
              </pre>
              <p className="text-sm text-muted-foreground mt-2">Navigate to: MCP → Custom Servers</p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">2. Click "Add Server"</h4>
              <p className="text-sm text-muted-foreground mb-3">Fill in the server details:</p>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-2 font-semibold text-xs bg-muted p-2 rounded">
                  <span>Field</span>
                  <span className="col-span-2">Description</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs py-2 border-b">
                  <span className="font-medium">Server Name</span>
                  <span className="col-span-2">Display name (e.g., "Notion API")</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs py-2 border-b">
                  <span className="font-medium">Transport Type</span>
                  <span className="col-span-2">HTTP, SSE, or WebSocket</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs py-2 border-b">
                  <span className="font-medium">Endpoint URL</span>
                  <span className="col-span-2">Your MCP server endpoint</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs py-2 border-b">
                  <span className="font-medium">Auth Method</span>
                  <span className="col-span-2">Bearer, API Key, Basic, or None</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs py-2">
                  <span className="font-medium">Credentials</span>
                  <span className="col-span-2">Token/key based on auth method</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">3. Configure Availability</h4>
              <p className="text-sm text-muted-foreground mb-2">Choose where the server is available:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong>Chat:</strong> Enable in main chat interface</li>
                <li><strong>Embed:</strong> Enable in embedded widget</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">4. Discover Tools</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Click "Discover Tools" to enumerate available tools from the server
              </p>
              <Alert className="mt-2">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Tools are cached for 15 minutes per session for optimal performance
                </AlertDescription>
              </Alert>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">5. Test Connection</h4>
              <p className="text-sm text-muted-foreground">
                Use the "Test Connection" button to verify your server is accessible and responding correctly
              </p>
            </div>
          </div>
        </section>

        {/* MCP Configuration Options */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Configuration Options</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">YOLO Mode</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Auto-approve tool execution without user confirmation
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>NEXT_PUBLIC_MCP_YOLO_MODE_ENABLED=true</code>
              </pre>
              <Alert className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Use carefully! YOLO mode executes tools without approval. Only enable for trusted environments.
                </AlertDescription>
              </Alert>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Tools List</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Show available MCP tools in the UI
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>NEXT_PUBLIC_MCP_TOOLS_LIST_ENABLED=true</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Custom Servers</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Configure multiple custom servers via environment
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`MCP_CUSTOM_SERVERS=[
  {
    "name": "My Custom Server",
    "transport": "http",
    "endpoint": "https://my-server.com/mcp",
    "auth": "bearer",
    "token": "..."
  }
]`}</code>
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
                <p className="font-semibold">Start with Approval Flow</p>
                <p className="text-sm text-muted-foreground">Keep YOLO mode disabled initially to review tool executions before trusting them</p>
              </div>
            </div>

            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Test Tools Individually</p>
                <p className="text-sm text-muted-foreground">Verify each tool works correctly before combining them in workflows</p>
              </div>
            </div>

            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Monitor Tool Usage</p>
                <p className="text-sm text-muted-foreground">Check logs and approval prompts to understand tool behavior</p>
              </div>
            </div>

            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Secure Credentials</p>
                <p className="text-sm text-muted-foreground">Keep API tokens and auth credentials in environment variables, never in code</p>
              </div>
            </div>

            <div className="flex items-start">
              <Lightbulb className="w-5 h-5 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Health Monitoring</p>
                <p className="text-sm text-muted-foreground">Use the health check endpoints to monitor MCP server availability</p>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Troubleshooting</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Tools not appearing</h3>
              <p className="text-sm text-muted-foreground mb-2">Solutions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Verify <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_MCP_SYSTEM_ENABLED=true</code></li>
                <li>Check that your endpoint URL is correct</li>
                <li>Click "Discover Tools" in Config UI</li>
                <li>Check browser console for connection errors</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Tool execution fails</h3>
              <p className="text-sm text-muted-foreground mb-2">Solutions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Verify authentication credentials are correct</li>
                <li>Check the server health endpoint</li>
                <li>Review approval prompt for parameter issues</li>
                <li>Check MCP server logs for errors</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Connection timeout</h3>
              <p className="text-sm text-muted-foreground mb-2">Solutions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Verify the endpoint URL is accessible</li>
                <li>Check firewall and network settings</li>
                <li>Ensure the MCP server is running</li>
                <li>Try increasing timeout settings if needed</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Alert className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
        <Info className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        <AlertTitle className="text-purple-900 dark:text-purple-100">MCP Architecture</AlertTitle>
        <AlertDescription className="text-purple-800 dark:text-purple-200 space-y-2">
          <p className="text-sm">ChatRAG's MCP implementation includes:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Production Router:</strong> Combines discovery, routing, and error handling</li>
            <li><strong>Universal Client:</strong> Handles tool execution and protocol communication</li>
            <li><strong>Smart Router:</strong> Intelligent tool selection and context-aware routing</li>
            <li><strong>Query Classifier:</strong> Pattern-based intent detection</li>
            <li><strong>Session Caching:</strong> 15-minute tool cache for performance</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/media-generation" className="text-primary hover:underline flex items-center">
            ← Previous: Media Generation
          </a>
          <a href="/docs/whatsapp" className="text-primary hover:underline flex items-center">
            Next: WhatsApp Integration →
          </a>
        </div>
      </div>
    </div>
  );
}
