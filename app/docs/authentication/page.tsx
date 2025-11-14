import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, Info, CheckCircle2, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Authentication - ChatRAG Documentation",
  description: "Configure authentication providers and user management for ChatRAG using Supabase Auth with OAuth, magic links, and email/password.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/authentication',
  },
  openGraph: {
    title: 'Authentication - ChatRAG Documentation',
    description: 'Configure authentication providers and user management for ChatRAG using Supabase Auth with OAuth, magic links, and email/password.',
    url: 'https://www.chatrag.ai/docs/authentication',
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

export default function AuthenticationPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Authentication</h1>
        <p className="text-xl text-muted-foreground">
          Secure user authentication powered by Supabase Auth with support for multiple providers.
        </p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Supabase Auth</AlertTitle>
        <AlertDescription>
          ChatRAG uses Supabase Auth for secure, scalable authentication with built-in support for OAuth providers, magic links, and email/password.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Auth Providers */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Supported Auth Methods</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <Github className="w-5 h-5 mr-2" />
                GitHub OAuth
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Allow users to sign in with their GitHub account
              </p>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Google OAuth
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Sign in with Google accounts
              </p>
              <p className="text-xs text-muted-foreground">
                Configure in Supabase Dashboard → Authentication → Providers
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Email / Password
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Traditional email and password authentication
              </p>
              <p className="text-xs text-muted-foreground">
                Includes email verification and password reset
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Magic Links
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Passwordless email authentication
              </p>
              <p className="text-xs text-muted-foreground">
                One-click sign in via email link
              </p>
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Basic Configuration</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Enable Authentication</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_AUTH_ENABLED=true
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Update for production`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">GitHub OAuth Setup</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-3">
                <li>Create OAuth App at github.com/settings/developers</li>
                <li>Set Authorization callback URL to: <code className="bg-muted px-1 py-0.5 rounded text-xs">https://your-project.supabase.co/auth/v1/callback</code></li>
                <li>Copy Client ID and Client Secret</li>
                <li>Add to Supabase Dashboard → Authentication → Providers → GitHub</li>
                <li>Set environment variables in ChatRAG</li>
              </ol>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Admin Access */}
        <section className="border-l-4 border-orange-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Admin Access Control</h2>
          <p className="text-muted-foreground mb-4">
            Designate specific users as admins with elevated permissions:
          </p>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Adding Admin Users</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Ensure <code className="bg-muted px-1 py-0.5 rounded">SUPABASE_SERVICE_ROLE_KEY</code> is set</li>
                <li>Open Config UI at <code className="bg-muted px-1 py-0.5 rounded">http://localhost:3333</code></li>
                <li>Navigate to Admin section</li>
                <li>Enter the user's email address</li>
                <li>Click "Add Admin"</li>
              </ol>
              <Alert className="mt-3">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  The email must match an existing Supabase user. Users must sign up first through the main app.
                </AlertDescription>
              </Alert>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Admin Privileges</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Access to Config UI document management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>View and manage all user documents</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Perform bulk document operations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Access system configuration tools</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Row Level Security */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Row Level Security (RLS)</h2>
          <p className="text-muted-foreground mb-4">
            ChatRAG uses Supabase RLS for multi-tenant data isolation:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">User Data Isolation</h3>
              <p className="text-sm text-muted-foreground">
                Users can only access their own:
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 mt-2">
                <li>Chat conversations</li>
                <li>Documents and embeddings</li>
                <li>Folders and organization</li>
                <li>WhatsApp sessions</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Admin Override</h3>
              <p className="text-sm text-muted-foreground">
                Admins can bypass RLS using the service role key for:
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 mt-2">
                <li>System-wide operations</li>
                <li>Data migration</li>
                <li>Bulk updates</li>
                <li>Support tasks</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Email Configuration */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Email Configuration</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Resend (Default)</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Simple email sending for authentication emails
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>RESEND_API_KEY=your_resend_api_key</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Custom SMTP (Optional)</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Use your own SMTP server for full control
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_CUSTOM_SMTP_ENABLED=true
NEXT_PUBLIC_SMTP_FROM_NAME=ChatRAG
NEXT_PUBLIC_SMTP_FROM_EMAIL=noreply@yourdomain.com`}</code>
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                Configure SMTP settings in Supabase Dashboard → Project Settings → Auth
              </p>
            </div>
          </div>
        </section>

        {/* Production Setup */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Production Setup</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Update Site URL</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Set your production URL in both ChatRAG and Supabase:
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto mb-2">
                <code>NEXT_PUBLIC_SITE_URL=https://your-domain.com</code>
              </pre>
              <p className="text-xs text-muted-foreground">
                Also update in: Supabase Dashboard → Authentication → URL Configuration
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Configure Redirect URLs</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Add allowed redirect URLs in Supabase:
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                <li>https://your-domain.com/*</li>
                <li>http://localhost:3000/* (for development)</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Email Templates</h3>
              <p className="text-sm text-muted-foreground">
                Customize email templates in: Supabase Dashboard → Authentication → Email Templates
              </p>
            </div>
          </div>
        </section>

        {/* Security Best Practices */}
        <section className="border-l-4 border-red-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Security Best Practices</h2>

          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Keep Service Role Key Secret</p>
                <p className="text-sm text-muted-foreground">
                  Never expose SUPABASE_SERVICE_ROLE_KEY in client-side code
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Use HTTPS in Production</p>
                <p className="text-sm text-muted-foreground">
                  Always use HTTPS for production URLs to secure authentication tokens
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Enable Email Verification</p>
                <p className="text-sm text-muted-foreground">
                  Require email confirmation for new signups (enabled by default)
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Rotate OAuth Secrets</p>
                <p className="text-sm text-muted-foreground">
                  Regularly rotate GitHub and other OAuth credentials
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Monitor Auth Logs</p>
                <p className="text-sm text-muted-foreground">
                  Check Supabase logs for suspicious authentication attempts
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-900 dark:text-green-100">Authentication Architecture</AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200">
          <ul className="list-disc list-inside space-y-1 text-sm mt-2">
            <li><strong>Auth Provider:</strong> src/components/providers/auth-provider.tsx (5KB)</li>
            <li><strong>Supabase Auth:</strong> src/lib/supabase-auth.ts (3KB)</li>
            <li><strong>RLS Policies:</strong> Defined in supabase/complete_setup.sql</li>
            <li><strong>Admin Table:</strong> admin_users for elevated permissions</li>
            <li><strong>Session Management:</strong> JWT tokens with automatic refresh</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/ai-models" className="text-primary hover:underline flex items-center">
            ← Previous: AI Models
          </a>
          <a href="/docs/media-generation" className="text-primary hover:underline flex items-center">
            Next: Media Generation →
          </a>
        </div>
      </div>
    </div>
  );
}
