import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Database, AlertTriangle, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Database Setup - ChatRAG Documentation",
  description: "Configure your Supabase database with vector search capabilities for ChatRAG",
};

export default function DatabaseSetupPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Database Setup</h1>
        <p className="text-xl text-muted-foreground">
          Configure your Supabase database with vector search capabilities. This section is crucial for a working installation.
        </p>
      </div>

      <Alert>
        <Database className="h-4 w-4" />
        <AlertTitle>Cloud vs Self-Hosted</AlertTitle>
        <AlertDescription>
          ChatRAG is optimized for Supabase Cloud (managed service), which is the easiest path and recommended.
          Supabase is open-source and can run self-hosted (VPS/private/on-prem). Ensure your Postgres has the pgvector extension with HNSW support available.
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
              <h2 className="text-2xl font-bold tracking-tight">Create Supabase Project</h2>
            </div>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>
                Visit{" "}
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  supabase.com
                </a>{" "}
                and create a new project
              </li>
              <li>Choose a region close to your users for optimal performance</li>
              <li>Wait for the project to initialize (~2 minutes)</li>
            </ol>
          </div>
        </section>

        {/* Step 2 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              2
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Configure Database Schema</h2>
            </div>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>ChatRAG includes a complete database setup file that creates all required tables, indexes, and security policies.</p>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-semibold text-foreground">Follow these steps:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li><strong>Open SQL Editor</strong> in your Supabase dashboard</li>
                <li><strong>Copy the entire contents</strong> of <code className="bg-background px-1.5 py-0.5 rounded">supabase/complete_setup.sql</code> from your repository</li>
                <li><strong>Paste and execute</strong> the SQL in the editor</li>
              </ol>
            </div>

            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Run Once Per Project</AlertTitle>
              <AlertDescription>
                The script only needs to be run once per Supabase project. It enables pgvector, creates HNSW indexes, tables, storage buckets, functions, and RLS policies.
              </AlertDescription>
            </Alert>

            <div className="border rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-foreground mb-3">What This Creates:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span><strong>14 production tables</strong> with Row Level Security (RLS) for multi-tenant isolation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span><strong>HNSW vector indexes</strong> (15-28x faster than traditional RAG)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span><strong>Storage buckets</strong> for images, videos, and 3D models</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span><strong>Database functions</strong> for semantic search operations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span><strong>Security policies</strong> for secure multi-tenant data access</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              3
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Get Supabase Credentials</h2>
            </div>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>From your Supabase project settings, retrieve the following credentials:</p>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Project Settings → API</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
                  <code>{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>`}</code>
                </pre>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Project Settings → API → Service Role</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
                  <code>{`# Keep this secret - server-side only!
SUPABASE_SERVICE_ROLE_KEY=<YOUR_SUPABASE_SERVICE_ROLE_KEY>`}</code>
                </pre>

                <Alert className="mt-3">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Security Warning</AlertTitle>
                  <AlertDescription>
                    The Service Role Key bypasses Row Level Security and should never be exposed in the browser.
                    It's only used on the server side for admin operations.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-start mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0">
              4
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Verify Database Setup</h2>
            </div>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>Test your database connection to ensure everything is configured correctly:</p>

            <div className="bg-muted p-4 rounded-lg">
              <pre className="overflow-x-auto">
                <code>{`# 1. Add Supabase credentials to your config
npm run config
# Paste your credentials and save

# 2. Start the development server
npm run dev

# 3. Check browser console for any database errors
# 4. Verify at http://localhost:3000 - you should see the chat interface`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-foreground mb-2">Verification Checklist:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Chat interface loads without errors</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>No database connection errors in browser console</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>User authentication is working (sign up/login)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Tables visible in Supabase Table Editor</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Database Tables Reference */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Database Tables Reference</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>The setup script creates the following core tables:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-foreground">documents</h3>
                <p className="text-sm">Stores uploaded document metadata</p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-foreground">document_chunks</h3>
                <p className="text-sm">Vector embeddings for RAG (1536 dimensions)</p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-foreground">chats</h3>
                <p className="text-sm">Chat conversations and history</p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-foreground">folders</h3>
                <p className="text-sm">Chat organization and categorization</p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-foreground">subscriptions</h3>
                <p className="text-sm">Payment and subscription management</p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-foreground">admin_settings</h3>
                <p className="text-sm">Global configuration and settings</p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-foreground">whatsapp_sessions</h3>
                <p className="text-sm">WhatsApp connection data</p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-foreground">whatsapp_conversations</h3>
                <p className="text-sm">WhatsApp chat history</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">HNSW Vector Search Performance</AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <p className="mb-2">The HNSW (Hierarchical Navigable Small World) indexes provide 15-28x faster search compared to traditional IVFFlat indexes.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Query time: &lt;50ms for semantic search</li>
            <li>Index parameters: m=64, ef_construction=200</li>
            <li>Supports 1536-dimensional vectors (OpenAI embeddings)</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/quick-start" className="text-primary hover:underline flex items-center">
            ← Previous: Quick Start
          </a>
          <a href="/docs/api-keys" className="text-primary hover:underline flex items-center">
            Next: API Keys →
          </a>
        </div>
      </div>
    </div>
  );
}
