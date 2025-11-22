import { Metadata } from "next";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Info, User, Building2, Users, Shield, Crown, Eye, Settings, Mail, Database, Zap, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Multi-Tenant Setup - ChatRAG Documentation",
  description: "Complete guide to setting up ChatRAG in multi-tenant mode with isolated workspaces, team collaboration, role-based access, and subscription tiers.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/multi-tenant',
  },
  openGraph: {
    title: 'Multi-Tenant Setup - ChatRAG Documentation',
    description: 'Complete guide to setting up ChatRAG in multi-tenant mode with isolated workspaces, team collaboration, role-based access, and subscription tiers.',
    url: 'https://www.chatrag.ai/docs/multi-tenant',
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

export default function MultiTenantPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Multi-Tenant Setup</h1>
        <p className="text-xl text-muted-foreground">
          Build SaaS RAG products with isolated workspaces, team collaboration, role-based access control, and subscription management.
        </p>
      </div>

      <Alert className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
        <Building2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        <AlertTitle className="text-purple-900 dark:text-purple-100">Production Ready</AlertTitle>
        <AlertDescription className="text-purple-800 dark:text-purple-200">
          Multi-tenant mode is fully implemented with 100% core feature completion. It powers isolated workspaces with complete data separation via Row Level Security (RLS).
        </AlertDescription>
      </Alert>

      {/* Quick Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quick Setup</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">1</span>
              Configure Mode
            </h3>
            <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
              <code>{`npm run config
# Select "Multi-Tenant" in deployment mode`}</code>
            </pre>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">2</span>
              Environment Variables
            </h3>
            <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
              <code>{`NEXT_PUBLIC_CHATRAG_DEPLOYMENT_MODE=multi-tenant
ENABLE_ORGANIZATIONS=true
ENABLE_TEAM_INVITES=true`}</code>
            </pre>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">3</span>
              Setup Database
            </h3>
            <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
              <code>{`# Run in Supabase SQL Editor:
supabase/multi-tenant-setup.sql`}</code>
            </pre>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">4</span>
              Start App
            </h3>
            <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
              <code>{`npm run dev
# Sign up - personal workspace auto-created!`}</code>
            </pre>
          </Card>
        </div>
      </div>

      {/* How It Works */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">How Multi-Tenant Mode Works</h2>

        <div className="bg-muted rounded-lg p-6">
          <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
{`User signs up → Personal workspace auto-created → Ready to use!
                     ↓
         Create personal projects (optional)
                     ↓
         Enable collaboration → Invite team members
                     ↓
         Switch between workspaces seamlessly
         Each workspace has isolated documents & chats`}
          </pre>
        </div>

        <p className="text-muted-foreground">
          When a user signs up, they automatically receive a personal workspace. From there, they can create personal projects for organization, or enable collaboration to invite team members. Each workspace maintains complete data isolation.
        </p>
      </div>

      {/* Key Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Key Features</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Organizations & Workspaces */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-8 h-8 text-purple-500" />
              <h3 className="text-xl font-semibold">3-Tier Workspace Architecture</h3>
            </div>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-3">
                <h4 className="font-medium">Personal Workspace (Flat)</h4>
                <p className="text-sm text-muted-foreground">Auto-created on signup, user_id isolation only</p>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <h4 className="font-medium">Personal Projects</h4>
                <p className="text-sm text-muted-foreground">User-created, owner only, organized workspace</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-3">
                <h4 className="font-medium">Collaborative Projects</h4>
                <p className="text-sm text-muted-foreground">Multi-member collaboration with invitations</p>
              </div>
            </div>
          </Card>

          {/* Role-Based Access */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-blue-500" />
              <h3 className="text-xl font-semibold">Role-Based Access Control</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-muted rounded-lg">
                <Crown className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                <p className="text-sm font-medium">Owner</p>
                <p className="text-xs text-muted-foreground">Full control</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <Shield className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">Team management</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <User className="w-6 h-6 mx-auto mb-1 text-green-500" />
                <p className="text-sm font-medium">Member</p>
                <p className="text-xs text-muted-foreground">Regular access</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <Eye className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                <p className="text-sm font-medium">Viewer</p>
                <p className="text-xs text-muted-foreground">Read-only</p>
              </div>
            </div>
          </Card>

          {/* Team Invitations */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-8 h-8 text-green-500" />
              <h3 className="text-xl font-semibold">Email Invitations</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span>Token-based security with 7-day expiration</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span>Role selection at invite time</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span>Resend or revoke pending invitations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span>Automatic workspace access on accept</span>
              </li>
            </ul>
          </Card>

          {/* AI Customization */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-8 h-8 text-orange-500" />
              <h3 className="text-xl font-semibold">Workspace AI Customization</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span>Per-workspace system prompt overrides</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span>Split mode (pre/post context) or full override</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span>Legal teams: formal responses</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span>Creative teams: exploratory AI behavior</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Data Isolation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Complete Data Isolation</h2>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-red-500" />
            <h3 className="text-xl font-semibold">Row Level Security (RLS)</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Data isolation is enforced at the database level, not application level. Even if application code has bugs, the database prevents data leakage.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium mb-2">Documents</h4>
              <p className="text-xs text-muted-foreground">Isolated per workspace. Users only see documents from workspaces they belong to.</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium mb-2">Chats</h4>
              <p className="text-xs text-muted-foreground">Private per user within workspace. Chat history stays in workspace context.</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium mb-2">RAG Search</h4>
              <p className="text-xs text-muted-foreground">Vector search automatically filters by workspace. No cross-workspace data leakage.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Subscription Tiers */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Subscription Tiers</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted">
                <th className="text-left py-3 px-4 font-semibold">Tier</th>
                <th className="text-center py-3 px-4 font-semibold">Storage</th>
                <th className="text-center py-3 px-4 font-semibold">Documents</th>
                <th className="text-center py-3 px-4 font-semibold">Team Members</th>
                <th className="text-center py-3 px-4 font-semibold">Monthly Messages</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Free</td>
                <td className="py-3 px-4 text-center">1 GB</td>
                <td className="py-3 px-4 text-center">50</td>
                <td className="py-3 px-4 text-center">1 (solo)</td>
                <td className="py-3 px-4 text-center">100</td>
              </tr>
              <tr className="border-b bg-muted/50">
                <td className="py-3 px-4 font-medium">Pro</td>
                <td className="py-3 px-4 text-center">10 GB</td>
                <td className="py-3 px-4 text-center">500</td>
                <td className="py-3 px-4 text-center">10</td>
                <td className="py-3 px-4 text-center">1,000</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Enterprise</td>
                <td className="py-3 px-4 text-center">100 GB</td>
                <td className="py-3 px-4 text-center">5,000</td>
                <td className="py-3 px-4 text-center">100</td>
                <td className="py-3 px-4 text-center">10,000</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Custom</td>
                <td className="py-3 px-4 text-center" colSpan={4}>Fully customizable limits</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Payment Integrations</AlertTitle>
          <AlertDescription>
            Multi-tenant mode includes Stripe and Polar payment integrations. Configure them in the Config UI under the Payments tab.
          </AlertDescription>
        </Alert>
      </div>

      {/* Use Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Use Cases</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">NotebookLM-Style App</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Every user gets isolated workspace on signup. Upload personal documents and chat with AI privately.
            </p>
            <div className="bg-muted rounded p-3 text-xs">
              User signs up → Personal workspace → Uploads PDFs → Chats privately
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">Enterprise RAG Deployment</h3>
            <p className="text-sm text-muted-foreground mb-3">
              500-person company with departments: Marketing, Legal, Engineering, HR - each with private workspaces.
            </p>
            <div className="bg-muted rounded p-3 text-xs">
              Create workspace per dept → Invite members → Complete isolation
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">Agency Platform</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Marketing agency manages 20 clients, each with their own knowledge base and team access.
            </p>
            <div className="bg-muted rounded p-3 text-xs">
              Workspace per client → Track usage → Bill per workspace
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">Educational Platform</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Online school with 50 classes. Teachers (admins) upload materials, students (members) access them.
            </p>
            <div className="bg-muted rounded p-3 text-xs">
              Class A workspace → Teacher + 30 students → Isolated from Class B
            </div>
          </Card>
        </div>
      </div>

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">API Endpoints</h2>

        <div className="space-y-3">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Organizations (6 endpoints)</h3>
            <div className="grid gap-2 text-xs font-mono">
              <div className="flex gap-2">
                <span className="bg-green-100 dark:bg-green-900 px-2 py-0.5 rounded">POST</span>
                <span>/api/organizations</span>
                <span className="text-muted-foreground">- Create team organization</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded">GET</span>
                <span>/api/organizations</span>
                <span className="text-muted-foreground">- List user's organizations</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded">GET</span>
                <span>/api/organizations/[id]</span>
                <span className="text-muted-foreground">- Get organization details</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-yellow-100 dark:bg-yellow-900 px-2 py-0.5 rounded">PATCH</span>
                <span>/api/organizations/[id]</span>
                <span className="text-muted-foreground">- Update organization</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-red-100 dark:bg-red-900 px-2 py-0.5 rounded">DELETE</span>
                <span>/api/organizations/[id]</span>
                <span className="text-muted-foreground">- Delete organization</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">Members (4 endpoints)</h3>
            <div className="grid gap-2 text-xs font-mono">
              <div className="flex gap-2">
                <span className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded">GET</span>
                <span>/api/organizations/[id]/members</span>
                <span className="text-muted-foreground">- List members</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-green-100 dark:bg-green-900 px-2 py-0.5 rounded">POST</span>
                <span>/api/organizations/[id]/members</span>
                <span className="text-muted-foreground">- Add member</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-yellow-100 dark:bg-yellow-900 px-2 py-0.5 rounded">PATCH</span>
                <span>/api/organizations/[id]/members/[userId]</span>
                <span className="text-muted-foreground">- Update role</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-red-100 dark:bg-red-900 px-2 py-0.5 rounded">DELETE</span>
                <span>/api/organizations/[id]/members/[userId]</span>
                <span className="text-muted-foreground">- Remove member</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">Invitations (4 endpoints)</h3>
            <div className="grid gap-2 text-xs font-mono">
              <div className="flex gap-2">
                <span className="bg-green-100 dark:bg-green-900 px-2 py-0.5 rounded">POST</span>
                <span>/api/organizations/[id]/invites</span>
                <span className="text-muted-foreground">- Create invitation</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded">GET</span>
                <span>/api/organizations/[id]/invites</span>
                <span className="text-muted-foreground">- List invitations</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-red-100 dark:bg-red-900 px-2 py-0.5 rounded">DELETE</span>
                <span>/api/organizations/[id]/invites/[token]</span>
                <span className="text-muted-foreground">- Revoke invitation</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-green-100 dark:bg-green-900 px-2 py-0.5 rounded">POST</span>
                <span>/api/invites/[token]</span>
                <span className="text-muted-foreground">- Accept invitation</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Database Schema */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Database Schema</h2>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Multi-Tenant Tables</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="border rounded-lg p-3">
              <h4 className="font-medium">organizations</h4>
              <p className="text-xs text-muted-foreground">Workspaces/tenants with subscription info</p>
            </div>
            <div className="border rounded-lg p-3">
              <h4 className="font-medium">organization_members</h4>
              <p className="text-xs text-muted-foreground">Team with roles (owner/admin/member/viewer)</p>
            </div>
            <div className="border rounded-lg p-3">
              <h4 className="font-medium">team_invitations</h4>
              <p className="text-xs text-muted-foreground">Token-based invitation system</p>
            </div>
            <div className="border rounded-lg p-3">
              <h4 className="font-medium">documents + organization_id</h4>
              <p className="text-xs text-muted-foreground">Documents isolated per workspace</p>
            </div>
            <div className="border rounded-lg p-3">
              <h4 className="font-medium">document_chunks + organization_id</h4>
              <p className="text-xs text-muted-foreground">Vector embeddings isolated per workspace</p>
            </div>
            <div className="border rounded-lg p-3">
              <h4 className="font-medium">chats + organization_id</h4>
              <p className="text-xs text-muted-foreground">Chats scoped to workspace</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Internationalization */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Internationalization</h2>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-semibold">18 Languages Supported</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            All multi-tenant UI components are fully translated. Workspace management, invitations, and AI customization work in your user's preferred language.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            {['English', 'Spanish', 'French', 'German', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Croatian', 'Lithuanian', 'Slovenian', 'Serbian', 'Swahili', 'Yoruba', 'Amharic'].map((lang) => (
              <span key={lang} className="bg-muted px-2 py-1 rounded">{lang}</span>
            ))}
          </div>
        </Card>
      </div>

      {/* Troubleshooting */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Troubleshooting</h2>

        <div className="space-y-3">
          <Card className="p-4">
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">"This feature requires multi-tenant mode"</h3>
            <p className="text-sm text-muted-foreground mb-2">Set the environment variable:</p>
            <pre className="bg-muted p-2 rounded text-xs">
              <code>NEXT_PUBLIC_CHATRAG_DEPLOYMENT_MODE=multi-tenant</code>
            </pre>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">"infinite recursion detected"</h3>
            <p className="text-sm text-muted-foreground mb-2">Run the RLS fix script:</p>
            <pre className="bg-muted p-2 rounded text-xs">
              <code>supabase/fix-multi-tenant-rls.sql</code>
            </pre>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">"organization_id is required"</h3>
            <p className="text-sm text-muted-foreground">
              Ensure a workspace is selected before uploading documents. The organization switcher in the sidebar lets users pick their active workspace.
            </p>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <Link href="/docs/deployment-mode" className="text-primary hover:underline flex items-center">
            ← Previous: Deployment Modes
          </Link>
          <Link href="/docs/database-setup" className="text-primary hover:underline flex items-center">
            Next: Database Setup →
          </Link>
        </div>
      </div>
    </div>
  );
}
