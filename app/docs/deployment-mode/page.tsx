import { Metadata } from "next";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Info, User, Building2, Users, Shield, Crown, Eye, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Deployment Modes - ChatRAG Documentation",
  description: "Choose between Single-Tenant and Multi-Tenant deployment modes for ChatRAG. Compare features, use cases, and configuration.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/deployment-mode',
  },
  openGraph: {
    title: 'Deployment Modes - ChatRAG Documentation',
    description: 'Choose between Single-Tenant and Multi-Tenant deployment modes for ChatRAG. Compare features, use cases, and configuration.',
    url: 'https://www.chatrag.ai/docs/deployment-mode',
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

export default function DeploymentModePage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Deployment Modes</h1>
        <p className="text-xl text-muted-foreground">
          ChatRAG supports two deployment modes from a single codebase. Choose the right mode for your use case before starting setup.
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Choose Before Setup</AlertTitle>
        <AlertDescription>
          Your deployment mode determines which database schema to use. While you can migrate between modes later, it's best to choose correctly from the start.
        </AlertDescription>
      </Alert>

      {/* Visual Comparison */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Single-Tenant Card */}
        <Card className="p-6 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <User className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Single-Tenant</h2>
              <p className="text-sm text-muted-foreground">Shared Knowledge Base</p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 mb-4">
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
{`┌─────────────────────────────────────┐
│     SHARED KNOWLEDGE BASE           │
│  • All users see same documents     │
│  • Perfect for chatbots             │
│  • Simple setup                     │
└─────────────────────────────────────┘
    👤 Alice   👤 Bob   👤 Carol
    (all see same documents)`}
            </pre>
          </div>

          <p className="text-muted-foreground mb-4">
            All users share the same knowledge base. User chats are private, but documents are accessible to everyone.
          </p>

          <div className="space-y-2 mb-4">
            <h3 className="font-semibold">Best For:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• AI Twins / Personality Bots</li>
              <li>• Product Documentation Chatbots</li>
              <li>• Customer Support Assistants</li>
              <li>• Healthcare/Legal Assistants with shared guidelines</li>
              <li>• Simple knowledge base applications</li>
            </ul>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground mb-2">Database Schema:</p>
            <code className="text-xs bg-muted px-2 py-1 rounded">supabase/single-tenant-setup.sql</code>
          </div>
        </Card>

        {/* Multi-Tenant Card */}
        <Card className="p-6 border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Multi-Tenant</h2>
              <p className="text-sm text-muted-foreground">Isolated Workspaces</p>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4 mb-4">
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
{`┌──────────┐ ┌──────────┐ ┌──────────┐
│Workspace │ │Workspace │ │Workspace │
│    A     │ │    B     │ │    C     │
│(Private) │ │(Private) │ │(Private) │
└──────────┘ └──────────┘ └──────────┘
👤 Alice     👤 Bob       👤 Carol
(A + B)      (B only)     (C only)`}
            </pre>
          </div>

          <p className="text-muted-foreground mb-4">
            Each user/team gets isolated workspaces with completely private knowledge bases and team collaboration features.
          </p>

          <div className="space-y-2 mb-4">
            <h3 className="font-semibold">Best For:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• SaaS RAG Products (NotebookLM-style)</li>
              <li>• Enterprise Deployments with Departments</li>
              <li>• Agencies Managing Multiple Clients</li>
              <li>• Educational Platforms with Classes</li>
              <li>• Any scenario requiring data isolation</li>
            </ul>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground mb-2">Database Schema:</p>
            <code className="text-xs bg-muted px-2 py-1 rounded">supabase/multi-tenant-setup.sql</code>
          </div>
        </Card>
      </div>

      {/* Feature Comparison Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Feature</th>
                <th className="text-center py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">Single-Tenant</th>
                <th className="text-center py-3 px-4 font-semibold text-purple-600 dark:text-purple-400">Multi-Tenant</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b">
                <td className="py-3 px-4">Knowledge Base</td>
                <td className="py-3 px-4 text-center">Shared globally</td>
                <td className="py-3 px-4 text-center">Per-workspace isolated</td>
              </tr>
              <tr className="border-b bg-muted/50">
                <td className="py-3 px-4">User Chats</td>
                <td className="py-3 px-4 text-center">Private per user</td>
                <td className="py-3 px-4 text-center">Private per user</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Document Isolation</td>
                <td className="py-3 px-4 text-center text-red-500">No</td>
                <td className="py-3 px-4 text-center text-green-500">Yes (via org)</td>
              </tr>
              <tr className="border-b bg-muted/50">
                <td className="py-3 px-4">Collaborative Projects</td>
                <td className="py-3 px-4 text-center text-red-500">No</td>
                <td className="py-3 px-4 text-center text-green-500">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Role-Based Access</td>
                <td className="py-3 px-4 text-center text-red-500">No (admin only)</td>
                <td className="py-3 px-4 text-center text-green-500">Yes (owner/admin/member/viewer)</td>
              </tr>
              <tr className="border-b bg-muted/50">
                <td className="py-3 px-4">Team Invitations</td>
                <td className="py-3 px-4 text-center text-red-500">No</td>
                <td className="py-3 px-4 text-center text-green-500">Yes (email-based)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Storage Quotas</td>
                <td className="py-3 px-4 text-center text-red-500">No</td>
                <td className="py-3 px-4 text-center text-green-500">Yes (per plan)</td>
              </tr>
              <tr className="border-b bg-muted/50">
                <td className="py-3 px-4">Subscription Tiers</td>
                <td className="py-3 px-4 text-center">Optional</td>
                <td className="py-3 px-4 text-center text-green-500">Yes (enforced)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Personal Workspace</td>
                <td className="py-3 px-4 text-center text-red-500">No</td>
                <td className="py-3 px-4 text-center text-green-500">Yes (auto-created)</td>
              </tr>
              <tr className="border-b bg-muted/50">
                <td className="py-3 px-4">AI Customization per Workspace</td>
                <td className="py-3 px-4 text-center text-red-500">No</td>
                <td className="py-3 px-4 text-center text-green-500">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-Tenant Details */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Multi-Tenant Features in Detail</h2>

        {/* Roles Section */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Role-Based Access Control
          </h3>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="border rounded-lg p-4 text-center">
              <Crown className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <h4 className="font-semibold">Owner</h4>
              <p className="text-xs text-muted-foreground">Full control, delete org</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h4 className="font-semibold">Admin</h4>
              <p className="text-xs text-muted-foreground">Team management</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <User className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <h4 className="font-semibold">Member</h4>
              <p className="text-xs text-muted-foreground">Regular access</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <Eye className="w-8 h-8 mx-auto mb-2 text-gray-500" />
              <h4 className="font-semibold">Viewer</h4>
              <p className="text-xs text-muted-foreground">Read-only access</p>
            </div>
          </div>
        </Card>

        {/* Subscription Tiers */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Subscription Tiers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Tier</th>
                  <th className="text-center py-2 px-3">Storage</th>
                  <th className="text-center py-2 px-3">Documents</th>
                  <th className="text-center py-2 px-3">Team Members</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Free</td>
                  <td className="py-2 px-3 text-center">1 GB</td>
                  <td className="py-2 px-3 text-center">50</td>
                  <td className="py-2 px-3 text-center">1 (solo)</td>
                </tr>
                <tr className="border-b bg-muted/50">
                  <td className="py-2 px-3 font-medium">Pro</td>
                  <td className="py-2 px-3 text-center">10 GB</td>
                  <td className="py-2 px-3 text-center">500</td>
                  <td className="py-2 px-3 text-center">10</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Enterprise</td>
                  <td className="py-2 px-3 text-center">100 GB</td>
                  <td className="py-2 px-3 text-center">5,000</td>
                  <td className="py-2 px-3 text-center">100</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Custom</td>
                  <td className="py-2 px-3 text-center" colSpan={3}>Fully customizable limits</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Configuration Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Configuration</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">Single-Tenant Setup</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Environment Variable:</p>
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                  <code>NEXT_PUBLIC_CHATRAG_DEPLOYMENT_MODE=single-tenant</code>
                </pre>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Database Schema:</p>
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                  <code>supabase/single-tenant-setup.sql</code>
                </pre>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-purple-600 dark:text-purple-400">Multi-Tenant Setup</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Environment Variables:</p>
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                  <code>{`NEXT_PUBLIC_CHATRAG_DEPLOYMENT_MODE=multi-tenant
ENABLE_ORGANIZATIONS=true
ENABLE_TEAM_INVITES=true
ENABLE_STORAGE_QUOTAS=true`}</code>
                </pre>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Database Schema:</p>
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                  <code>supabase/multi-tenant-setup.sql</code>
                </pre>
              </div>
            </div>
          </Card>
        </div>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Using Config UI</AlertTitle>
          <AlertDescription>
            Run <code className="bg-muted px-1.5 py-0.5 rounded text-xs">npm run config</code> to open the visual configuration dashboard.
            Deployment Mode is the first tab - select your mode there before configuring other settings.
          </AlertDescription>
        </Alert>
      </div>

      {/* Migration Note */}
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">Can You Migrate Between Modes?</AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <p className="mb-2">Yes! You can switch between modes:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Single → Multi-Tenant:</strong> Existing users get personal orgs auto-created. Documents assigned to admin organization.</li>
            <li><strong>Multi-Tenant → Single:</strong> Export data first. All documents become globally shared.</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Next Steps */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/docs/quick-start" className="block">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full border-2 border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold mb-2">Quick Start Guide</h3>
            <p className="text-muted-foreground text-sm">
              Follow the step-by-step setup guide. Choose your deployment mode in Step 4 when running the Config UI.
            </p>
          </Card>
        </Link>

        <Link href="/docs/multi-tenant" className="block">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full border-2 border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-semibold mb-2">Multi-Tenant Setup</h3>
            <p className="text-muted-foreground text-sm">
              Deep dive into multi-tenant features: organizations, workspaces, team collaboration, and AI customization.
            </p>
          </Card>
        </Link>
      </div>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs" className="text-primary hover:underline flex items-center">
            ← Previous: Introduction
          </a>
          <a href="/docs/quick-start" className="text-primary hover:underline flex items-center">
            Next: Quick Start →
          </a>
        </div>
      </div>
    </div>
  );
}
