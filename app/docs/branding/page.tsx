import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Palette, Info, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Branding & UI - ChatRAG Documentation",
  description: "Customize ChatRAG's appearance with your brand identity, logos, and colors",
};

export default function BrandingPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Branding & UI Customization</h1>
        <p className="text-xl text-muted-foreground">
          Customize ChatRAG to match your brand with logos, colors, welcome messages, and UI preferences.
        </p>
      </div>

      <Alert>
        <Palette className="h-4 w-4" />
        <AlertTitle>White-Label Ready</AlertTitle>
        <AlertDescription>
          ChatRAG supports complete branding customization through environment variables and the visual Config UI - no code changes required.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* App Identity */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">App Identity</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">App Name & Title</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_APP_NAME=ChatRAG
NEXT_PUBLIC_SITE_TITLE=Your AI Assistant
NEXT_PUBLIC_FAVICON_URL=/favicon.ico`}</code>
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                App name appears in the header, page titles, and meta tags
              </p>
            </div>
          </div>
        </section>

        {/* Logo Configuration */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Logo Configuration</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Header Logo</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Choose between text or image logo for the header:
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`# Option 1: Text Logo
NEXT_PUBLIC_HEADER_LOGO_TYPE=text
NEXT_PUBLIC_HEADER_LOGO_TEXT=ChatRAG

# Option 2: Image Logo
NEXT_PUBLIC_HEADER_LOGO_TYPE=image
NEXT_PUBLIC_HEADER_LOGO_URL=/logos/header-logo.png`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font_semibold mb-2">AI Response Avatar</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Customize the logo that appears with AI messages:
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_AI_RESPONSE_LOGO_URL=/logos/ai-avatar.png
NEXT_PUBLIC_AI_RESPONSE_LOGO_BORDER=true
NEXT_PUBLIC_AI_RESPONSE_LOGO_SIZE=md  # sm, md, or lg`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Logo Best Practices</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Use PNG format with transparency for best results</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Header logo: 120-150px wide recommended</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>AI avatar: 40x40px or 80x80px for sharp display</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Place logos in <code className="bg-muted px-1 py-0.5 rounded">/public/logos/</code> directory</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Welcome Messages */}
        <section className="border-l-4 border-purple-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Welcome Messages</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Welcome Text</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_WELCOME_TEXT=What can I help with?
NEXT_PUBLIC_WELCOME_TEXT_MODE=custom  # or "ai_generated"
NEXT_PUBLIC_WELCOME_TEXT_GRADIENT=none  # or gradient style`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Welcome Messages Array</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Rotating welcome messages with dynamic user name:
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_WELCOME_MESSAGES=[
  "Hey, {Username}! What can I help you with today?",
  "Hello {Username}! Ready to assist you.",
  "Hi there! How can I help?"
]`}</code>
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                Use <code className="bg-muted px-1 py-0.5 rounded">{`{Username}`}</code> placeholder for personalization
              </p>
            </div>
          </div>
        </section>

        {/* Suggestions */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Suggestions Configuration</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Enable Suggestions</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_SHOW_SUGGESTIONS=true
NEXT_PUBLIC_SUGGESTION_GROUPS=[
  {
    "title": "Getting Started",
    "suggestions": [
      "How do I upload documents?",
      "What models are available?",
      "How does RAG work?"
    ]
  },
  {
    "title": "Features",
    "suggestions": [
      "Generate an image",
      "Create a video",
      "Search my documents"
    ]
  }
]`}</code>
              </pre>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Use the Config UI's Suggestion helpers to quickly generate on-brand prompts per group.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* UI Preferences */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">UI Preferences</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Chat Input Size</h3>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>NEXT_PUBLIC_CHAT_INPUT_TEXT_SIZE=md</code>
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                Options: sm, md, lg
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Document Dashboard</h3>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>NEXT_PUBLIC_HIDE_DOCUMENT_DASHBOARD=false</code>
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                Show/hide document upload interface
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Read-Only Documents</h3>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>NEXT_PUBLIC_READ_ONLY_DOCUMENTS_ENABLED=false</code>
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                Prevent user uploads (admin-only)
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Performance Flags</h3>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_DISABLE_DEBUG_LOGS=false
NEXT_PUBLIC_REDUCED_MOTION=false`}</code>
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                Optional: Use temporarily for profiling
              </p>
            </div>
          </div>
        </section>

        {/* Embed Widget Customization */}
        <section className="border-l-4 border-blue-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Embed Widget Branding</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Widget Appearance</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_EMBED_ENABLED=true
NEXT_PUBLIC_EMBED_TITLE=ChatRAG
NEXT_PUBLIC_EMBED_PRIMARY_COLOR=#6366f1
NEXT_PUBLIC_EMBED_POSITION=bottom-right  # or bottom-left, top-right, top-left
NEXT_PUBLIC_EMBED_AUTO_OPEN=false
NEXT_PUBLIC_EMBED_GREETING=Como te puedo ayudar?`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Widget Access Control</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_EMBED_ALLOWED_DOMAINS=*  # or "domain1.com,domain2.com"
EMBED_REQUIRE_AUTH=false`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Language & Localization */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Language & Localization</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-3">
                Users can change the chatbot language in User Settings. Built-in languages include:
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 text-xs">
                <div className="bg-muted p-2 rounded text-center">English</div>
                <div className="bg-muted p-2 rounded text-center">Spanish</div>
                <div className="bg-muted p-2 rounded text-center">Portuguese</div>
                <div className="bg-muted p-2 rounded text-center">French</div>
                <div className="bg-muted p-2 rounded text-center">German</div>
                <div className="bg-muted p-2 rounded text-center">Italian</div>
                <div className="bg-muted p-2 rounded text-center">Dutch</div>
                <div className="bg-muted p-2 rounded text-center">Japanese</div>
                <div className="bg-muted p-2 rounded text-center">Korean</div>
                <div className="bg-muted p-2 rounded text-center">Chinese</div>
                <div className="bg-muted p-2 rounded text-center">Hindi</div>
                <div className="bg-muted p-2 rounded text-center">Arabic</div>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Adding New Languages</AlertTitle>
              <AlertDescription className="text-sm">
                Use the Config UI's System Prompts → Translate feature to create prompts in additional languages.
                The translation tools automatically preserve the <code className="bg-muted px-1 py-0.5 rounded">{`{{context}}`}</code> placeholder.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Name Extraction */}
        <section className="border-l-4 border-orange-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">User Name Extraction</h2>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-3">
              Automatically extract and use user names for personalization:
            </p>
            <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
              <code>{`NEXT_PUBLIC_NAME_EXTRACTION_ENABLED=true
NEXT_PUBLIC_NAME_EXTRACTION_MODEL=gpt-4o-mini`}</code>
            </pre>
            <p className="text-xs text-muted-foreground mt-2">
              When enabled, ChatRAG will try to learn the user's name from conversation and use it in welcome messages with the <code className="bg-muted px-1 py-0.5 rounded">{`{Username}`}</code> placeholder.
            </p>
          </div>
        </section>

        {/* Applying Changes */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Applying Branding Changes</h2>

          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="font-semibold mb-2">Via Config UI (Recommended)</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Open <code className="bg-muted px-1 py-0.5 rounded">npm run config</code></li>
                <li>Navigate to Branding section</li>
                <li>Update logos, colors, and text</li>
                <li>Click "Save Settings"</li>
                <li>Restart dev server: <code className="bg-muted px-1 py-0.5 rounded">npm run dev</code></li>
              </ol>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold mb-2">Manual Configuration</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Edit <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> directly and restart server
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Branding Best Practices</h2>

          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Consistent Brand Identity</p>
                <p className="text-sm text-muted-foreground">
                  Use the same colors, fonts, and tone across all customizable elements
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Optimize Images</p>
                <p className="text-sm text-muted-foreground">
                  Compress logos and use appropriate sizes to maintain fast load times
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Test Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Ensure your logos and colors work well in both light and dark themes
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Mobile-Friendly</p>
                <p className="text-sm text-muted-foreground">
                  Test branding on mobile devices to ensure readability and proper scaling
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/whatsapp" className="text-primary hover:underline flex items-center">
            ← Previous: WhatsApp Integration
          </a>
          <a href="/docs/deployment" className="text-primary hover:underline flex items-center">
            Next: Deployment →
          </a>
        </div>
      </div>
    </div>
  );
}
