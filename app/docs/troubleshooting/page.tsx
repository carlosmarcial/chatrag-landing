import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wrench, Info, AlertTriangle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Troubleshooting - ChatRAG Documentation",
  description: "Common issues and solutions for ChatRAG setup, configuration, RAG system, authentication, and deployment problems.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/troubleshooting',
  },
  openGraph: {
    title: 'Troubleshooting - ChatRAG Documentation',
    description: 'Common issues and solutions for ChatRAG setup, configuration, RAG system, authentication, and deployment problems.',
    url: 'https://www.chatrag.ai/docs/troubleshooting',
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

export default function TroubleshootingPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Troubleshooting</h1>
        <p className="text-xl text-muted-foreground">
          Common issues and solutions for ChatRAG setup, configuration, and operation.
        </p>
      </div>

      <Alert>
        <Wrench className="h-4 w-4" />
        <AlertTitle>Need Help?</AlertTitle>
        <AlertDescription>
          If you can't find a solution here, check the GitHub issues or join our Discord community for support.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* RAG Issues */}
        <section className="border-l-4 border-red-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">RAG System Issues</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                <h3 className="font-semibold">RAG Not Using Documents</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Symptoms:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>AI doesn't reference uploaded documents</li>
                  <li>Responses don't include document content</li>
                </ul>
                <p className="font-semibold text-foreground mt-3">Solutions:</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Verify <code className="bg-muted px-1 py-0.5 rounded">{`{{context}}`}</code> is in RAG_SYSTEM_PROMPT</li>
                  <li>Check embeddings were generated (OpenAI API key configured)</li>
                  <li>Verify document_chunks table has data in Supabase</li>
                  <li>Run diagnostic: <code className="bg-muted px-1 py-0.5 rounded">node scripts/rag/check-rag-flow.js</code></li>
                  <li>Check system prompt: <code className="bg-muted px-1 py-0.5 rounded">node scripts/rag/decode-rag-prompt.js</code></li>
                </ol>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                <h3 className="font-semibold">Slow Search Performance</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verify HNSW indexes exist in Supabase (m=64, ef=200)</li>
                  <li>Check index parameters in complete_setup.sql</li>
                  <li>Use text-embedding-3-small for embeddings</li>
                  <li>Reduce RAG_FINAL_RESULT_COUNT if too high</li>
                  <li>Enable RAG_CACHE_ENABLED=true</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                <h3 className="font-semibold">Document Upload Failing</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Check NEXT_PUBLIC_LLAMA_CLOUD_API_KEY is set</li>
                  <li>Verify LlamaCloud API key is valid</li>
                  <li>Check file format is supported (PDF, DOCX, TXT, HTML, RTF, EPUB)</li>
                  <li>Ensure Supabase storage buckets exist</li>
                  <li>Check browser console for errors</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Database Issues */}
        <section className="border-l-4 border-blue-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Database Issues</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                <h3 className="font-semibold">Database Connection Failed</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verify NEXT_PUBLIC_SUPABASE_URL is correct</li>
                  <li>Check NEXT_PUBLIC_SUPABASE_ANON_KEY is set</li>
                  <li>Ensure SUPABASE_SERVICE_ROLE_KEY is configured</li>
                  <li>Verify Supabase project is not paused</li>
                  <li>Check network connectivity to Supabase</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                <h3 className="font-semibold">Tables or Functions Missing</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Run complete_setup.sql in Supabase SQL Editor</li>
                  <li>Check for SQL execution errors in editor</li>
                  <li>Verify pgvector extension is enabled</li>
                  <li>Ensure all 14 tables were created</li>
                  <li>Check HNSW indexes exist on document_chunks</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration Issues */}
        <section className="border-l-4 border-purple-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Configuration Issues</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                <h3 className="font-semibold">Configuration Not Saving</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verify SUPABASE_SERVICE_ROLE_KEY is set</li>
                  <li>Check admin_settings table exists in Supabase</li>
                  <li>Ensure .env.local file is writable</li>
                  <li>Restart dev server after saving</li>
                  <li>Check Config UI console for errors</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                <h3 className="font-semibold">Models Not Appearing</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verify JSON syntax in all 5 model locations</li>
                  <li>Clear browser localStorage</li>
                  <li>Restart dev server</li>
                  <li>Check browser console for parsing errors</li>
                  <li>Use Config UI to re-fetch models from OpenRouter</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                <h3 className="font-semibold">Config UI Not Loading</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ensure port 3333 is not in use</li>
                  <li>Check scripts/config-server.js exists</li>
                  <li>Verify Node.js 18+ is installed</li>
                  <li>Run <code className="bg-muted px-1 py-0.5 rounded">npm install</code> to ensure dependencies</li>
                  <li>Check terminal for error messages</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Issues */}
        <section className="border-l-4 border-green-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">WhatsApp Integration Issues</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <h3 className="font-semibold">QR Code Not Generating</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verify Bailey's is deployed at FLYIO_BAILEYS_URL</li>
                  <li>Check Fly.io app status: <code className="bg-muted px-1 py-0.5 rounded">flyctl status</code></li>
                  <li>View logs: <code className="bg-muted px-1 py-0.5 rounded">flyctl logs</code></li>
                  <li>Restart app: <code className="bg-muted px-1 py-0.5 rounded">flyctl apps restart</code></li>
                  <li>Verify WHATSAPP_PROVIDER is set correctly</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <h3 className="font-semibold">Messages Not Reaching ChatRAG</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verify WHATSAPP_WEBHOOK_URL is publicly accessible</li>
                  <li>Check webhook secret matches on both sides</li>
                  <li>Test webhook: <code className="bg-muted px-1 py-0.5 rounded">curl https://your-webhook/api/whatsapp/webhook</code></li>
                  <li>Use ngrok for local development webhooks</li>
                  <li>Check ChatRAG logs for webhook errors</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <h3 className="font-semibold">Connection Keeps Dropping</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verify persistent volume is mounted in Fly.io</li>
                  <li>Check app isn't sleeping (scale to prevent auto-sleep)</li>
                  <li>Ensure phone has stable internet</li>
                  <li>Don't logout of WhatsApp Web on other devices</li>
                  <li>Check session data is being persisted</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MCP Issues */}
        <section className="border-l-4 border-orange-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">MCP Integration Issues</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-orange-500 flex-shrink-0" />
                <h3 className="font-semibold">Tools Not Appearing</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verify NEXT_PUBLIC_MCP_SYSTEM_ENABLED=true</li>
                  <li>Check MCP endpoint URL is correct</li>
                  <li>Click "Discover Tools" in Config UI</li>
                  <li>Check browser console for connection errors</li>
                  <li>Test server health endpoint</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-orange-500 flex-shrink-0" />
                <h3 className="font-semibold">Tool Execution Fails</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verify authentication credentials are correct</li>
                  <li>Check server health and availability</li>
                  <li>Review approval prompt for parameter issues</li>
                  <li>Check MCP server logs for errors</li>
                  <li>Test tool individually before workflows</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* API & Authentication */}
        <section className="border-l-4 border-yellow-500 pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">API & Authentication Issues</h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                <h3 className="font-semibold">API Key Invalid</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verify keys are correctly formatted (no extra spaces)</li>
                  <li>Check for missing characters when copying</li>
                  <li>Ensure keys have necessary permissions</li>
                  <li>Regenerate keys if compromised</li>
                  <li>Check provider dashboard for key status</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                <h3 className="font-semibold">Authentication Not Working</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Update NEXT_PUBLIC_SITE_URL to correct URL</li>
                  <li>Add redirect URLs in Supabase Auth settings</li>
                  <li>Check OAuth provider callback URLs</li>
                  <li>Verify email configuration</li>
                  <li>Check Supabase Auth logs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Debug Commands */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Debug Commands</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Check Environment</h3>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>cat .env.local</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Test Database</h3>
              <p className="text-xs text-muted-foreground">
                Start dev server and check browser console for database errors
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Check RAG Flow</h3>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>node scripts/rag/check-rag-flow.js</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Decode RAG Prompt</h3>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>node scripts/rag/decode-rag-prompt.js</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Fly.io Logs</h3>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>flyctl logs</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Fly.io Status</h3>
              <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>flyctl status</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Performance Issues */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Performance Issues</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Slow Response Times</h3>
              <p className="text-sm text-muted-foreground mb-2">Solutions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Use faster models (GPT-4o-mini vs GPT-4)</li>
                <li>Reduce max tokens setting</li>
                <li>Enable RAG caching</li>
                <li>Optimize chunk retrieval count</li>
                <li>Use WhatsApp-optimized prompts for mobile</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">High API Costs</h3>
              <p className="text-sm text-muted-foreground mb-2">Solutions:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Switch to cost-effective models</li>
                <li>Reduce WHATSAPP_MAX_TOKENS</li>
                <li>Limit reasoning token usage</li>
                <li>Use free tier models for testing</li>
                <li>Enable usage alerts in provider dashboards</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">Still Need Help?</AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <ul className="list-disc list-inside space-y-1 text-sm mt-2">
            <li>Check GitHub Issues for similar problems and solutions</li>
            <li>Join our Discord community for real-time support</li>
            <li>Review the complete DOCUMENTATION.md file</li>
            <li>Check Supabase and provider status pages</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/deployment" className="text-primary hover:underline flex items-center">
            ← Previous: Deployment
          </a>
          <a href="/docs/faq" className="text-primary hover:underline flex items-center">
            Next: FAQ →
          </a>
        </div>
      </div>
    </div>
  );
}
