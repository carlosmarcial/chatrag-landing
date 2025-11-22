import { Metadata } from "next";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Database, AlertTriangle, Info, User, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Database Setup - ChatRAG Documentation",
  description: "Configure your Supabase database with vector search capabilities for ChatRAG. Set up pgvector, HNSW indexes, and production-ready tables.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/database-setup',
  },
  openGraph: {
    title: 'Database Setup - ChatRAG Documentation',
    description: 'Configure your Supabase database with vector search capabilities for ChatRAG. Set up pgvector, HNSW indexes, and production-ready tables.',
    url: 'https://www.chatrag.ai/docs/database-setup',
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

export default function DatabaseSetupPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Database Setup</h1>
        <p className="text-xl text-muted-foreground">
          Configure your Supabase database with vector search capabilities. This section is crucial for a working installation.
        </p>
      </div>

      <Alert className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950">
        <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        <AlertTitle className="text-orange-900 dark:text-orange-100">Choose Your SQL File Based on Deployment Mode</AlertTitle>
        <AlertDescription className="text-orange-800 dark:text-orange-200">
          You must use the correct SQL file for your deployment mode. Using the wrong schema will cause issues.{" "}
          <Link href="/docs/deployment-mode" className="underline font-medium">
            Not sure which mode? Learn more →
          </Link>
        </AlertDescription>
      </Alert>

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
            <p>ChatRAG includes deployment-mode specific database setup files that create all required tables, indexes, and security policies.</p>

            {/* Mode-specific SQL files */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-950/50">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">Single-Tenant Mode</h3>
                </div>
                <p className="text-sm mb-2">Shared knowledge base, user-isolated chats</p>
                <code className="block bg-blue-100 dark:bg-blue-900 px-3 py-2 rounded text-xs font-mono">
                  supabase/single-tenant-setup.sql
                </code>
                <p className="text-xs mt-2 text-blue-700 dark:text-blue-300">~1,383 lines</p>
              </div>

              <div className="border-2 border-purple-200 dark:border-purple-800 rounded-lg p-4 bg-purple-50/50 dark:bg-purple-950/50">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100">Multi-Tenant Mode</h3>
                </div>
                <p className="text-sm mb-2">Isolated workspaces, team collaboration, RBAC</p>
                <code className="block bg-purple-100 dark:bg-purple-900 px-3 py-2 rounded text-xs font-mono">
                  supabase/multi-tenant-setup.sql
                </code>
                <p className="text-xs mt-2 text-purple-700 dark:text-purple-300">~1,143 lines + organizations</p>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-semibold text-foreground">Follow these steps:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li><strong>Open SQL Editor</strong> in your Supabase dashboard</li>
                <li><strong>Copy the entire contents</strong> of the SQL file matching your deployment mode</li>
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
              <h3 className="font-semibold text-foreground mb-3">What Both Modes Create:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span><strong>Core tables</strong> with Row Level Security (RLS) for data isolation</span>
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
              </ul>
            </div>

            <div className="border-2 border-purple-200 dark:border-purple-800 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">Multi-Tenant Mode Adds:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                  <span><strong>organizations</strong> table with subscription tiers & quotas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                  <span><strong>organization_members</strong> with role-based access (owner/admin/member/viewer)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                  <span><strong>team_invitations</strong> for email-based invitations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                  <span><strong>organization_id</strong> columns on documents, chats, and chunks for isolation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                  <span><strong>Auto-personal org</strong> trigger (creates workspace on user signup)</span>
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
