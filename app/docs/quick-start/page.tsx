import { Metadata } from "next";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Info, Lightbulb, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Quick Start - ChatRAG Documentation",
  description: "Step-by-step guide to set up a basic RAG-powered AI chatbot with ChatRAG in 12 simple steps",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/quick-start',
  },
  openGraph: {
    title: 'Quick Start - ChatRAG Documentation',
    description: 'Step-by-step guide to set up a basic RAG-powered AI chatbot with ChatRAG in 12 simple steps',
    url: 'https://www.chatrag.ai/docs/quick-start',
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

export default function QuickStartPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Quick Start Guide</h1>
        <p className="text-xl text-muted-foreground">
          Set up a basic RAG-powered AI chatbot with ChatRAG in 12 simple steps
        </p>
      </div>

      <Alert className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950">
        <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        <AlertTitle className="text-orange-900 dark:text-orange-100">First: Choose Your Deployment Mode</AlertTitle>
        <AlertDescription className="text-orange-800 dark:text-orange-200">
          Before starting, decide between <strong>Single-Tenant</strong> (shared knowledge base) or <strong>Multi-Tenant</strong> (isolated workspaces).
          This affects which database schema you'll use.{" "}
          <Link href="/docs/deployment-mode" className="underline font-medium">
            Learn about deployment modes →
          </Link>
        </AlertDescription>
      </Alert>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Watch the Video Tutorial</AlertTitle>
        <AlertDescription>
          For a visual walkthrough, check out our{" "}
          <a
            href="https://www.youtube.com/watch?v=CRUlv97HDPI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            step-by-step video guide
          </a>.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Step 1 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              1
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Access the Repository</h2>
            </div>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>After purchasing ChatRAG, you'll receive an invitation to a private repository (e.g., GitHub).</p>
            <p>Clone the repository to your local machine:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
              <code>git clone &lt;repo-url&gt;</code>
            </pre>
            <p className="text-sm">Or download the codebase directly from the repository.</p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              2
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Install Dependencies</h2>
            </div>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>Open your IDE and navigate to the ChatRAG codebase directory.</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
              <code>npm install</code>
            </pre>
            <p className="text-sm">This will install all required packages for your project.</p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              3
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Run the Development Server</h2>
            </div>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>In a new terminal window, start the development server:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
              <code>npm run dev</code>
            </pre>
            <p className="text-sm">
              The first run will generate a local configuration file where you will set all necessary environment variables.
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              4
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Open the Configuration Dashboard</h2>
            </div>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>Run the configuration dashboard to easily manage API keys and features:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
              <code>npm run config</code>
            </pre>
            <p className="text-sm">
              This opens a visual configuration dashboard where you can input and manage API keys and toggle features.
            </p>
            <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-3 mt-3">
              <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Important: Choose Your Deployment Mode
              </p>
              <p className="text-xs text-purple-800 dark:text-purple-200 mt-1">
                The first tab is <strong>Deployment Mode</strong>. Select either <strong>Single-Tenant</strong> (shared knowledge base) or <strong>Multi-Tenant</strong> (isolated workspaces) before configuring other settings.
              </p>
            </div>
          </div>
        </section>

        {/* Step 5 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              5
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Obtain and Paste API Keys</h2>
            </div>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>Acquire the following API keys and paste them into the configuration dashboard:</p>
            <div className="space-y-3 ml-4">
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-foreground mb-1">Llama Cloud</h3>
                <p className="text-sm">
                  Register at{" "}
                  <a href="https://cloud.llamaindex.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    cloud.llamaindex.ai
                  </a>{" "}
                  and generate a secret key for document parsing (offered by LlamaIndex).
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-foreground mb-1">OpenAI</h3>
                <p className="text-sm">
                  Generate an API key at{" "}
                  <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    platform.openai.com
                  </a>{" "}
                  to be used for embeddings (and optionally for model access).
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-foreground mb-1">OpenRouter</h3>
                <p className="text-sm">
                  Generate an API key at{" "}
                  <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    openrouter.ai
                  </a>{" "}
                  to access multiple LLMs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 6 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              6
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Set Up the Vector Database (Supabase)</h2>
            </div>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>Sign up or log in to Supabase and create a new project:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>
                Visit{" "}
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  supabase.com
                </a>{" "}
                and create a new project
              </li>
              <li>
                <strong>Choose the correct SQL file based on your deployment mode:</strong>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li><code className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded text-xs">supabase/single-tenant-setup.sql</code> for Single-Tenant</li>
                  <li><code className="bg-purple-100 dark:bg-purple-900 px-1.5 py-0.5 rounded text-xs">supabase/multi-tenant-setup.sql</code> for Multi-Tenant</li>
                </ul>
              </li>
              <li>Copy the contents of your chosen SQL file</li>
              <li>Go to your Supabase project's SQL Editor, paste the code, and run it to create the necessary tables</li>
              <li>Once successful, retrieve your Supabase project URL, <code className="bg-muted px-1 py-0.5 rounded">anon</code> public key, and service role key from the API section</li>
              <li>Paste these values into the configuration dashboard</li>
            </ol>
          </div>
        </section>

        {/* Step 7 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              7
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Save Configuration</h2>
            </div>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>Click "Save All Changes" to ensure all keys and settings are stored.</p>
          </div>
        </section>

        {/* Step 8 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              8
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Start the Chatbot</h2>
            </div>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>Run the development server again to launch the local server:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
              <code>npm run dev</code>
            </pre>
            <p className="text-sm">Access your chatbot on <code className="bg-muted px-1 py-0.5 rounded">localhost:3000</code>.</p>
            <p className="text-sm">Sign up using your email and confirm the authentication via the link sent to your email.</p>
          </div>
        </section>

        {/* Step 9 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              9
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Upload Documents</h2>
            </div>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>Go to the dashboard's document processing section.</p>
            <p>Upload a file (e.g., a PDF) to test ingestion into the RAG pipeline.</p>
            <p className="text-sm">
              The system processes and chunks the document, storing data in the vector database.
            </p>
          </div>
        </section>

        {/* Step 10 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              10
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Test Your Chatbot</h2>
            </div>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>Once a document is uploaded and processed, use the ChatRAG chat interface to query content stored in your vector database.</p>
            <p className="text-sm">
              Try asking questions about the uploaded document to verify the RAG system is working correctly.
            </p>
          </div>
        </section>

        {/* Step 11 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              11
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Basic Customization</h2>
            </div>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>Use the visual dashboard to modify:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Product name and branding</li>
              <li>Greeting message</li>
              <li>Color theme</li>
              <li>Language settings (support for multiple languages)</li>
            </ul>
          </div>
        </section>

        {/* Step 12 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              12
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
            </div>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>Explore integrations and advanced features using the dashboard and the codebase:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>WhatsApp integration</li>
              <li>Additional AI providers</li>
              <li>Advanced customization options</li>
              <li>Deployment to production (Vercel, Fly.io, or other cloud platforms)</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Tips Section */}
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">Tips for Success</AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200 space-y-2">
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>The basic setup leverages free tiers on LlamaCloud, Supabase, OpenAI, and OpenRouter. You can experiment before scaling up.</li>
            <li>Advanced customization (authentication system, branding/UI, integrations) is accessible from the dashboard and the codebase.</li>
            <li>Need code snippets or walkthroughs for any step? Check our detailed documentation sections.</li>
            <li>For deployment help to Vercel, Fly.io, or other cloud platforms, see our <a href="/docs/deployment" className="underline">Deployment Guide</a>.</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/prerequisites" className="text-primary hover:underline flex items-center">
            ← Previous: Prerequisites
          </a>
          <a href="/docs/database-setup" className="text-primary hover:underline flex items-center">
            Next: Database Setup →
          </a>
        </div>
      </div>
    </div>
  );
}
