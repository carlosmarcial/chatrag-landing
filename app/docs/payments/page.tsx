import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, CreditCard, Info, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Integration - ChatRAG Documentation",
  description: "Configure Polar and Stripe payments for your ChatRAG application",
};

export default function PaymentsPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Payment Integration</h1>
        <p className="text-xl text-muted-foreground">
          Set up subscription payments with Polar (recommended) or Stripe for your ChatRAG application.
        </p>
      </div>

      <Alert>
        <CreditCard className="h-4 w-4" />
        <AlertTitle>Why Polar is Recommended</AlertTitle>
        <AlertDescription>
          Polar offers the simplest setup for SaaS subscriptions with no complex webhooks, instant checkout links, 
          and developer-friendly pricing. Perfect for getting payments up and running in minutes.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Polar Integration (Recommended) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Polar Integration</h2>
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">RECOMMENDED</span>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Polar is built for developers selling software. No complex webhook setup required—just create products 
            and copy the checkout links. Setup takes less than 10 minutes.
          </p>

          {/* Step-by-step Guide */}
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6 py-2">
              <h3 className="text-lg font-semibold mb-3">Step 1: Create a Polar Account</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Visit <a href="https://polar.sh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">polar.sh</a></li>
                <li>Sign up with GitHub (takes 2 minutes)</li>
                <li>Create your organization</li>
                <li>Complete your profile and payment settings</li>
              </ol>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2">
              <h3 className="text-lg font-semibold mb-3">Step 2: Create Your Products</h3>
              <p className="text-muted-foreground mb-3">
                Create subscription products for each tier (Starter, Pro, Enterprise). Here's the recommended structure:
              </p>
              
              <div className="bg-muted p-4 rounded-lg space-y-4">
                <div className="border rounded-lg p-3 bg-background">
                  <h4 className="font-semibold text-sm mb-2">Starter Plan</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Price: $9/month</li>
                    <li>• Basic RAG chatbot functionality</li>
                    <li>• Limited messages per day</li>
                    <li>• Public documents only</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-3 bg-background">
                  <h4 className="font-semibold text-sm mb-2">Pro Plan</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Price: $19/month</li>
                    <li>• Unlimited messages</li>
                    <li>• Private document uploads</li>
                    <li>• Priority support</li>
                    <li>• Custom embedding models</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-3 bg-background">
                  <h4 className="font-semibold text-sm mb-2">Enterprise Plan</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Price: $49/month</li>
                    <li>• Team collaboration</li>
                    <li>• Advanced analytics</li>
                    <li>• Custom models</li>
                    <li>• 24/7 Support</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2">
              <h3 className="text-lg font-semibold mb-3">Step 3: Create Checkout Links</h3>
              <p className="text-muted-foreground mb-3">
                For each product in your Polar dashboard:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Navigate to your product</li>
                <li>Click "Create Checkout Link"</li>
                <li>Configure success/cancel URLs (optional)</li>
                <li>Copy both the <strong>Price ID</strong> and <strong>Checkout URL</strong></li>
              </ol>

              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  You'll need BOTH the Price ID and Checkout URL for each plan. Don't skip this step!
                </AlertDescription>
              </Alert>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2">
              <h3 className="text-lg font-semibold mb-3">Step 4: Get Your API Token</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Go to Polar Settings → API Tokens</li>
                <li>Create a new token with appropriate permissions</li>
                <li>Copy the token (starts with <code className="bg-muted px-1.5 py-0.5 rounded">polar_oat_</code>)</li>
              </ol>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2">
              <h3 className="text-lg font-semibold mb-3">Step 5: Configure Environment Variables</h3>
              <p className="text-muted-foreground mb-3">
                Add these variables to your <code className="bg-muted px-1.5 py-0.5 rounded">.env.local</code> file:
              </p>

              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                <code>{`# -----------------------------
# PAYMENTS - POLAR
# -----------------------------
POLAR_ACCESS_TOKEN=polar_oat_your_token_here

# Starter Plan
NEXT_PUBLIC_POLAR_PRICE_ID_STARTER=e5603bf0-d155-4e93-8b89-b32952d6f10d
NEXT_PUBLIC_POLAR_CHECKOUT_STARTER=https://buy.polar.sh/polar_cl_1iIjg4vlfkGHL7gO6nnOECblSfUsKZ6IRcsbq4c1OvJ

# Pro Plan
NEXT_PUBLIC_POLAR_PRICE_ID_PRO=82bef751-c308-4a11-b5b9-2589bc335c25
NEXT_PUBLIC_POLAR_CHECKOUT_PRO=https://buy.polar.sh/polar_cl_pTRx8sbL0NuCcgnhZXmJLEGrTrNs6JFQyeynL1qnID3

# Enterprise Plan
NEXT_PUBLIC_POLAR_PRICE_ID_ENTERPRISE=4836f931-0bf6-47fc-9b96-bb7a49e422a1
NEXT_PUBLIC_POLAR_CHECKOUT_ENTERPRISE=https://buy.polar.sh/polar_cl_kFjdC5Glc2AuRUvvaW9zyAHlZTmOl01yeg0bq39al2h

# Optional - only needed for webhook processing (future use)
POLAR_ORGANIZATION_ID=
POLAR_WEBHOOK_SECRET=
POLAR_ORGANIZATION_SLUG=`}</code>
              </pre>

              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Replace the example values with your actual Price IDs and Checkout URLs from Polar!
                </AlertDescription>
              </Alert>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2">
              <h3 className="text-lg font-semibold mb-3">Step 6: Update Pricing Page</h3>
              <p className="text-muted-foreground mb-3">
                Your <code className="bg-muted px-1.5 py-0.5 rounded">src/app/pricing/page.tsx</code> should automatically 
                pick up these environment variables. Verify the Starter plan uses:
              </p>

              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                <code>{`{
  name: "Starter",
  price: "9",
  description: "Perfect for trying out the RAG chatbot",
  features: [...],
  polarPriceId: process.env.NEXT_PUBLIC_POLAR_PRICE_ID_STARTER || null
}`}</code>
              </pre>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2">
              <h3 className="text-lg font-semibold mb-3">Step 7: Test Your Integration</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Restart your dev server: <code className="bg-muted px-1.5 py-0.5 rounded">npm run dev</code></li>
                <li>Navigate to <code className="bg-muted px-1.5 py-0.5 rounded">http://localhost:3000/pricing</code></li>
                <li>Click "Subscribe" on any plan</li>
                <li>Verify you're redirected to Polar checkout (not signup page)</li>
                <li>Complete a test purchase using Polar's test mode</li>
              </ol>
            </div>
          </div>

          {/* What You Get */}
          <div className="mt-6 bg-muted p-6 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
              What You Get with Polar
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Pre-built checkout pages with branding</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Automatic subscription management</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Customer portal for upgrades/downgrades</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Invoice generation and email notifications</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Developer-friendly dashboard and API</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>No complex webhook setup required</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Stripe Integration (Alternative) */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Stripe Integration (Alternative)</h2>
          <p className="text-muted-foreground mb-4">
            If you prefer Stripe or need more advanced payment features, you can configure Stripe instead of Polar.
          </p>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>When to Choose Stripe</AlertTitle>
            <AlertDescription>
              Choose Stripe if you need: complex invoicing, tax automation, multiple currencies, 
              marketplace features, or already have a Stripe account with existing customers.
            </AlertDescription>
          </Alert>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Stripe Configuration</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
              <code>{`# -----------------------------
# PAYMENTS - STRIPE
# -----------------------------
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRICE_ID_PRO=price_...
NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE=price_...`}</code>
            </pre>

            <p className="text-sm text-muted-foreground">
              Note: Stripe requires webhook configuration and additional setup. Refer to the Stripe documentation 
              for detailed integration steps.
            </p>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Troubleshooting</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h4 className="font-semibold mb-2">Redirected to signup page instead of checkout</h4>
              <p className="text-sm text-muted-foreground">
                This means your Price ID or Checkout URL is missing. Verify all environment variables are set 
                correctly and restart your dev server.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h4 className="font-semibold mb-2">Error: "Checkout link not found"</h4>
              <p className="text-sm text-muted-foreground">
                The pricing page code requires BOTH the Price ID AND Checkout URL for each plan. 
                Double-check your <code className="bg-muted px-1.5 py-0.5 rounded">.env.local</code> file 
                has both variables populated.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h4 className="font-semibold mb-2">Changes not reflecting</h4>
              <p className="text-sm text-muted-foreground">
                Always restart your dev server after modifying environment variables: 
                <code className="bg-muted px-1.5 py-0.5 rounded ml-1">Ctrl+C</code> then 
                <code className="bg-muted px-1.5 py-0.5 rounded ml-1">npm run dev</code>
              </p>
            </div>
          </div>
        </section>

        {/* Production Deployment */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Production Deployment</h2>
          <p className="text-muted-foreground mb-4">
            When deploying to production (Vercel, etc.), remember to:
          </p>

          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>Add all Polar environment variables to your hosting platform's environment settings</li>
            <li>Switch from Polar sandbox to production mode if applicable</li>
            <li>Update <code className="bg-muted px-1.5 py-0.5 rounded">NEXT_PUBLIC_SITE_URL</code> to your production domain</li>
            <li>Test the complete checkout flow in production</li>
            <li>Configure success/cancel redirect URLs in Polar to match your production URLs</li>
          </ul>
        </section>
      </div>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/api-keys" className="text-primary hover:underline flex items-center">
            ← Previous: API Keys
          </a>
          <a href="/docs/deployment" className="text-primary hover:underline flex items-center">
            Next: Deployment →
          </a>
        </div>
      </div>
    </div>
  );
}
