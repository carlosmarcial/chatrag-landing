import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Prerequisites - ChatRAG Documentation",
  description: "Required software and API keys before starting with ChatRAG",
};

export default function PrerequisitesPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Prerequisites</h1>
        <p className="text-xl text-muted-foreground">
          Before starting, ensure you have the following tools and accounts ready.
        </p>
      </div>

      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Note for Developers</AlertTitle>
        <AlertDescription>
          This guide assumes basic familiarity with Node.js, Git, and command-line interfaces.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Required Software</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold mb-2">Node.js 18+</h3>
              <p className="text-muted-foreground mb-2">
                ChatRAG requires Node.js version 18 or higher. Download from{" "}
                <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  nodejs.org
                </a>
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`# Check your Node.js version
node --version

# Should output v18.0.0 or higher`}</code>
              </pre>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold mb-2">npm (comes with Node.js)</h3>
              <p className="text-muted-foreground mb-2">
                npm is the package manager for Node.js and is installed automatically with Node.js.
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`# Verify npm installation
npm --version`}</code>
              </pre>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold mb-2">Git</h3>
              <p className="text-muted-foreground mb-2">
                Required for cloning the repository. Download from{" "}
                <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  git-scm.com
                </a>
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`# Verify git installation
git --version`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Required API Keys</h2>
          <p className="text-muted-foreground mb-4">
            You'll need to sign up for the following services and obtain API keys:
          </p>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">1. Supabase (Free tier available)</h3>
              <p className="text-muted-foreground mb-2">
                Open-source Firebase alternative with PostgreSQL and vector database capabilities.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2">
                <li>Sign up at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supabase.com</a></li>
                <li>Create a new project</li>
                <li>Note down: Project URL, Anon Key, and Service Role Key</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">2. OpenAI API (Required for embeddings)</h3>
              <p className="text-muted-foreground mb-2">
                Required for document embeddings and AI models.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2">
                <li>Sign up at <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com</a></li>
                <li>Generate an API key from the API section</li>
                <li>Add billing information (pay-as-you-go)</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">3. OpenRouter API (Recommended)</h3>
              <p className="text-muted-foreground mb-2">
                Access 100+ AI models from multiple providers through a unified API.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2">
                <li>Sign up at <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">openrouter.ai</a></li>
                <li>Generate an API key from your dashboard</li>
                <li>Competitive pricing with various model options</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">4. LlamaCloud API (Required for document processing)</h3>
              <p className="text-muted-foreground mb-2">
                Required for PDF/DOCX processing and RAG functionality.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2">
                <li>Sign up at <a href="https://cloud.llamaindex.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cloud.llamaindex.ai</a></li>
                <li>Generate an API key</li>
                <li>Free tier available for testing</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Minimum Requirements Summary</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="font-semibold mb-4">To run ChatRAG locally, you need:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span>NEXT_PUBLIC_SUPABASE_URL</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span>SUPABASE_SERVICE_ROLE_KEY (server-only secret)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span>OPENAI_API_KEY (required for embeddings)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span>OPENROUTER_API_KEY or direct OpenAI models</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                <span>NEXT_PUBLIC_LLAMA_CLOUD_API_KEY</span>
              </li>
            </ul>
          </div>
        </section>

        <Alert>
          <AlertTitle>💡 Pro Tip</AlertTitle>
          <AlertDescription>
            All these services offer generous free tiers for testing. You can start developing with ChatRAG without any upfront costs!
          </AlertDescription>
        </Alert>
      </div>

      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <div></div>
          <a href="/docs/quick-start" className="text-primary hover:underline flex items-center">
            Next: Quick Start Guide →
          </a>
        </div>
      </div>
    </div>
  );
}