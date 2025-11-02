import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, AlertTriangle, Info, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "System Prompt - ChatRAG Documentation",
  description: "Configure how ChatRAG's AI uses your documents for retrieval-augmented generation",
};

export default function SystemPromptPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">System Prompt Configuration</h1>
        <p className="text-xl text-muted-foreground">
          The system prompt controls how the AI uses your documents. Configure it in the visual dashboard to customize AI behavior.
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Critical Requirement</AlertTitle>
        <AlertDescription>
          Your prompt MUST include <code className="bg-muted px-1.5 py-0.5 rounded font-bold">{`{{context}}`}</code> exactly. Without it, RAG will not work.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Prompt Structure */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Prompt Structure</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>The system prompt is divided into three parts:</p>

            <div className="space-y-4 mt-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-semibold text-foreground mb-2">1. Pre-Context</h3>
                <p>Global instructions, tone, guardrails, and format guidelines that appear before the document context.</p>
                <div className="bg-muted p-3 rounded-lg mt-2">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`You are a helpful AI assistant.
Be professional and concise.
Use bullet points when appropriate.`}</code>
                  </pre>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Context (Required)</h3>
                <p>The <code className="bg-muted px-1.5 py-0.5 rounded font-bold">{`{{context}}`}</code> placeholder where retrieved document chunks are automatically injected at runtime.</p>
                <div className="bg-muted p-3 rounded-lg mt-2">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`Context:
{{context}}

Use the context above to answer questions.`}</code>
                  </pre>
                </div>
                <Alert className="mt-3">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This exact string <code className="bg-muted px-1.5 py-0.5 rounded font-bold">{`{{context}}`}</code> must appear in your prompt.
                    Do not modify, encode, or remove it.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Post-Context</h3>
                <p>Follow-up rules that tell the AI how to cite documents, refuse out-of-scope queries, and format answers.</p>
                <div className="bg-muted p-3 rounded-lg mt-2">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`If you can't find the answer in the context, say so.
Always cite document sources when possible.
Format code blocks with proper syntax highlighting.`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-configured Templates */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Pre-configured Templates</h2>
          <p className="text-muted-foreground mb-4">
            ChatRAG includes ready-to-use templates optimized for different use cases. All templates include the required <code className="bg-muted px-1.5 py-0.5 rounded">{`{{context}}`}</code> placeholder.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Helpful</h3>
              <p className="text-sm text-muted-foreground">General-purpose, friendly assistant tone</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Professional</h3>
              <p className="text-sm text-muted-foreground">Formal business communication style</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Educational</h3>
              <p className="text-sm text-muted-foreground">Explanatory teaching approach</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Technical</h3>
              <p className="text-sm text-muted-foreground">Detailed technical documentation style</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">ChatRAG Sales</h3>
              <p className="text-sm text-muted-foreground">Product-focused sales assistance</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Customer Support</h3>
              <p className="text-sm text-muted-foreground">Empathetic support agent tone</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Research Assistant</h3>
              <p className="text-sm text-muted-foreground">Academic research and analysis</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Code Assistant</h3>
              <p className="text-sm text-muted-foreground">Programming help and code examples</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Legal Analyst</h3>
              <p className="text-sm text-muted-foreground">Legal document analysis</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Medical Information</h3>
              <p className="text-sm text-muted-foreground">Healthcare information provider</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">WhatsApp Conversational</h3>
              <p className="text-sm text-muted-foreground">Concise, mobile-optimized responses</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Best Practices</h2>
          <div className="space-y-3 text-muted-foreground">
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Keep Pre-Context Concise</p>
                  <p className="text-sm">Be explicit about how to use the Context. Avoid overly long instructions.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Instruct Citation Behavior</p>
                  <p className="text-sm">In Post-Context, tell the AI to cite or reference documents and how to respond when answers aren't found.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Optimize for WhatsApp</p>
                  <p className="text-sm">If using WhatsApp, start with the whatsappConversational template and keep responses brief.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Test Before Deploying</p>
                  <p className="text-sm">Use the preview feature in the Config UI to test your prompt with sample queries.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Include Guardrails</p>
                  <p className="text-sm">Add instructions about what the AI should NOT do or answer.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Saving & Applying */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Saving & Applying</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>To apply your system prompt configuration:</p>

            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Open the Config UI at <code className="bg-muted px-1.5 py-0.5 rounded">http://localhost:3333</code></li>
              <li>Navigate to the System Prompt section</li>
              <li>Choose a template or write a custom prompt</li>
              <li>Ensure <code className="bg-muted px-1.5 py-0.5 rounded font-bold">{`{{context}}`}</code> is present</li>
              <li>Click <strong>Save</strong></li>
              <li>Restart the dev server to guarantee the latest .env.local is loaded:</li>
            </ol>

            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-3">
              <code>{`# In your dev terminal:
Ctrl+C
npm run dev`}</code>
            </pre>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Troubleshooting</h2>
          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Documents found but not used</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Solution: Verify <code className="bg-muted px-1.5 py-0.5 rounded">{`{{context}}`}</code> is present and unencoded in your prompt.
              </p>
              <p className="text-sm">
                Use <code className="bg-muted px-1.5 py-0.5 rounded">scripts/rag/decode-rag-prompt.js</code> to check what's stored in .env.local.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">AI ignoring instructions</h3>
              <p className="text-sm text-muted-foreground">
                Solution: Make instructions more explicit and direct. Place critical instructions in both Pre-Context and Post-Context for emphasis.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Responses too long or too short</h3>
              <p className="text-sm text-muted-foreground">
                Solution: Add length guidelines like "Keep responses under 3 sentences" or "Provide detailed explanations with examples."
              </p>
            </div>
          </div>
        </section>

        {/* AI Translation */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">AI Translation Support</h2>
          <p className="text-muted-foreground mb-3">
            The Config UI includes translation tools to help you create multilingual prompts:
          </p>

          <div className="border rounded-lg p-4">
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Select your desired target language from the dropdown</li>
              <li>Click "Translate with AI" button</li>
              <li>Review the translated prompt</li>
              <li>Make any necessary adjustments</li>
              <li>Save the translated version</li>
            </ol>
          </div>

          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              The <code className="bg-muted px-1.5 py-0.5 rounded">{`{{context}}`}</code> placeholder is automatically preserved during translation.
            </AlertDescription>
          </Alert>
        </section>
      </div>

      <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
        <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-900 dark:text-amber-100">Example Complete Prompt</AlertTitle>
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <pre className="text-xs overflow-x-auto mt-2 bg-background/50 p-3 rounded">
            <code>{`You are a helpful AI assistant. Be concise and professional.

Context:
{{context}}

Based on the context provided above, answer the user's question.
If you cannot find the answer in the context, say so clearly.
Always cite sources when referencing specific information.`}</code>
          </pre>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/config-ui" className="text-primary hover:underline flex items-center">
            ← Previous: Configuration UI
          </a>
          <a href="/docs/rag-system" className="text-primary hover:underline flex items-center">
            Next: RAG System →
          </a>
        </div>
      </div>
    </div>
  );
}
