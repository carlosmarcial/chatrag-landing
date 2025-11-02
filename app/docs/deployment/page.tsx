import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, Info, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Deployment - ChatRAG Documentation",
  description: "Deploy ChatRAG to production on Vercel or other platforms",
};

export default function DeploymentPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Deployment Guide</h1>
        <p className="text-xl text-muted-foreground">
          Deploy ChatRAG to production on Vercel (recommended) or other Next.js-compatible platforms.
        </p>
      </div>

      <Alert>
        <Rocket className="h-4 w-4" />
        <AlertTitle>Vercel Deployment Recommended</AlertTitle>
        <AlertDescription>
          ChatRAG is optimized for Vercel with zero-configuration deployment. Other platforms like Coolify, Docker, and VPS hosting also work.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Vercel Deployment */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Deploying to Vercel</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold mr-3 flex-shrink-0">1</span>
                <h3 className="font-semibold">Prepare Your Repository</h3>
              </div>
              <div className="ml-9 space-y-2 text-sm text-muted-foreground">
                <p>Push your ChatRAG code to GitHub, GitLab, or Bitbucket</p>
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                  <code>{`git add .
git commit -m "Ready for deployment"
git push origin main`}</code>
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold mr-3 flex-shrink-0">2</span>
                <h3 className="font-semibold">Create Vercel Project</h3>
              </div>
              <div className="ml-9 space-y-2 text-sm text-muted-foreground">
                <ol className="list-decimal list-inside space-y-1">
                  <li>Visit <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">vercel.com</a> and sign in</li>
                  <li>Click "New Project"</li>
                  <li>Import your ChatRAG repository</li>
                  <li>Select the repository and click "Import"</li>
                </ol>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-sm font-bold mr-3 flex-shrink-0">3</span>
                <h3 className="font-semibold">Configure Environment Variables</h3>
              </div>
              <div className="ml-9 space-y-3 text-sm text-muted-foreground">
                <p>Add all environment variables from your local <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> to Vercel:</p>

                <div className="border rounded-lg p-3 bg-muted">
                  <p className="font-semibold text-foreground mb-2">Required Variables:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li><code>NEXT_PUBLIC_SUPABASE_URL</code></li>
                    <li><code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                    <li><code>SUPABASE_SERVICE_ROLE_KEY</code></li>
                    <li><code>OPENAI_API_KEY</code></li>
                    <li><code>OPENROUTER_API_KEY</code></li>
                    <li><code>NEXT_PUBLIC_LLAMA_CLOUD_API_KEY</code></li>
                    <li><code>NEXT_PUBLIC_SITE_URL</code> (your production domain)</li>
                  </ul>
                </div>

                <Alert className="mt-3">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Pro Tip</AlertTitle>
                  <AlertDescription className="text-xs">
                    After configuring locally via Config UI, copy the contents of your finalized <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> and paste them into Vercel's Environment Variables section.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-sm font-bold mr-3 flex-shrink-0">4</span>
                <h3 className="font-semibold">Deploy</h3>
              </div>
              <div className="ml-9 space-y-2 text-sm text-muted-foreground">
                <p>Click "Deploy" and wait for the build to complete (~2-3 minutes)</p>
                <p>Vercel will automatically:</p>
                <ul className="list-disc list-inside space-y-1 text-xs ml-4">
                  <li>Install dependencies</li>
                  <li>Build the Next.js application</li>
                  <li>Deploy to edge network</li>
                  <li>Provide a production URL</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-sm font-bold mr-3 flex-shrink-0">5</span>
                <h3 className="font-semibold">Configure Custom Domain (Optional)</h3>
              </div>
              <div className="ml-9 space-y-2 text-sm text-muted-foreground">
                <ol className="list-decimal list-inside space-y-1">
                  <li>In Vercel project settings, go to Domains</li>
                  <li>Add your custom domain (e.g., chatbot.yourdomain.com)</li>
                  <li>Follow DNS configuration instructions</li>
                  <li>Update <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_SITE_URL</code> to your custom domain</li>
                </ol>
              </div>
            </div>

            <div className="border-l-4 border-gray-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-500 text-white text-sm font-bold mr-3 flex-shrink-0">6</span>
                <h3 className="font-semibold">Update Supabase Settings</h3>
              </div>
              <div className="ml-9 space-y-2 text-sm text-muted-foreground">
                <p>In Supabase Dashboard → Authentication → URL Configuration:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Add your production URL to allowed redirect URLs</li>
                  <li>Update site URL to production domain</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Post-Deployment Configuration */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Post-Deployment Configuration</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Update Site URL</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Set your production URL in environment variables:
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Configure OAuth Providers</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Update OAuth callback URLs for GitHub, Google, etc.:
              </p>
              <p className="text-xs text-muted-foreground">
                Callback URL format: <code className="bg-muted px-1 py-0.5 rounded">https://your-project.supabase.co/auth/v1/callback</code>
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Enable Production Features</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Enable authentication if using</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Configure payment webhooks (Stripe/Polar)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Set up email provider (Resend/SMTP)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Alternative Platforms */}
        <section className="border-l-4 border-blue-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Alternative Deployment Platforms</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Self-Hosting (Docker/VPS)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Deploy on your own infrastructure using Docker, PM2, or similar tools
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-xs font-semibold mb-2">Requirements:</p>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                  <li>Node.js 18+</li>
                  <li>Environment variables configured</li>
                  <li>Reverse proxy (nginx/Apache)</li>
                  <li>SSL certificate for HTTPS</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Coolify</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Open-source self-hosting platform
              </p>
              <p className="text-xs text-muted-foreground">
                Supports Next.js deployment with automatic SSL and environment management
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Other Next.js Platforms</h3>
              <p className="text-sm text-muted-foreground">
                ChatRAG should work on any platform that supports Next.js 15+:
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 mt-2">
                <li>Netlify</li>
                <li>Railway</li>
                <li>Render</li>
                <li>AWS (Amplify, EC2)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Important Production Notes</h2>

          <div className="space-y-3">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Config UI is Development Only</AlertTitle>
              <AlertDescription className="text-sm">
                Do NOT deploy the Config UI (<code className="bg-muted px-1 py-0.5 rounded">config-server.js</code>) to production.
                The Config UI runs locally only. Manage production environment variables via your hosting provider's dashboard or a secure secret manager.
              </AlertDescription>
            </Alert>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Protected Routes</AlertTitle>
              <AlertDescription className="text-sm">
                <code className="bg-muted px-1 py-0.5 rounded">vercel.json</code> automatically returns 404 for these routes in production:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><code>/scripts/*</code></li>
                  <li><code>/config</code></li>
                  <li><code>/config-ui/*</code></li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Monitoring & Maintenance */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Monitoring & Maintenance</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Vercel Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Enable Vercel Analytics to track performance, visitors, and errors
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Supabase Monitoring</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Monitor database performance and usage:
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                <li>Database size and growth</li>
                <li>API request volume</li>
                <li>Authentication logs</li>
                <li>Storage usage</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">API Cost Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Set up usage alerts in provider dashboards:
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                <li>OpenAI API usage</li>
                <li>OpenRouter credits</li>
                <li>LlamaCloud document processing</li>
                <li>FAL.ai/Replicate media generation</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Regular Updates</h3>
              <p className="text-sm text-muted-foreground">
                Keep dependencies and platform up to date:
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto mt-2">
                <code>{`# Update dependencies
npm update

# Redeploy
git push origin main`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Troubleshooting Deployment */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Common Deployment Issues</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Build fails on Vercel</h3>
              <p className="text-sm text-muted-foreground mb-2">Solutions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Check build logs for missing dependencies</li>
                <li>Verify Node.js version (18+ required)</li>
                <li>Ensure all environment variables are set</li>
                <li>Check for TypeScript errors</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Database connection errors</h3>
              <p className="text-sm text-muted-foreground mb-2">Solutions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Verify Supabase credentials are correct</li>
                <li>Check service role key is set</li>
                <li>Ensure Supabase project is active (not paused)</li>
                <li>Verify allowed origins in Supabase settings</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Authentication not working</h3>
              <p className="text-sm text-muted-foreground mb-2">Solutions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Update NEXT_PUBLIC_SITE_URL to production URL</li>
                <li>Add production URL to Supabase redirect URLs</li>
                <li>Update OAuth provider callback URLs</li>
                <li>Check email provider configuration</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-900 dark:text-green-100">Deployment Checklist</AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200">
          <ul className="list-disc list-inside space-y-1 text-sm mt-2">
            <li>✓ All environment variables configured in Vercel</li>
            <li>✓ Production domain set in NEXT_PUBLIC_SITE_URL</li>
            <li>✓ Supabase redirect URLs updated</li>
            <li>✓ OAuth providers configured with production callback URLs</li>
            <li>✓ Database schema applied (complete_setup.sql)</li>
            <li>✓ Email provider configured for production</li>
            <li>✓ API usage monitoring enabled</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/branding" className="text-primary hover:underline flex items-center">
            ← Previous: Branding & UI
          </a>
          <a href="/docs/troubleshooting" className="text-primary hover:underline flex items-center">
            Next: Troubleshooting →
          </a>
        </div>
      </div>
    </div>
  );
}
