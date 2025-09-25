"use client";
import React from "react";
import { SmallLogo } from "@/components/small-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import clsx from "clsx";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function DocsPage() {
  const quickStart = `# 1) Clone your private repository
git clone <YOUR_PRIVATE_REPO_URL>
cd chatrag

# 2) Install dependencies
npm install

# 3) Start the app (creates .env.local baseline)
npm run dev

# 4) Start the Config UI (http://localhost:3333)
npm run config

# 5) Add Supabase, OpenAI, OpenRouter, and LlamaCloud in the Config UI
#    Then restart the dev server (Ctrl+C, then npm run dev)`;

  const supabaseCreds = `NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;

  const openaiKeys = `# Required for embeddings and some models
OPENAI_API_KEY=sk-...
OPENAI_EMBEDDING_MODEL=text-embedding-3-small`;

  const openrouterKeys = `# Access to 100+ AI models
OPENROUTER_API_KEY=sk-or-...`;

  const ragPrompt = `RAG_SYSTEM_PROMPT=You are an AI assistant.

Context:
{{context}}

Answer based on the context above...`;

  const vercelEnv = `NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
OPENAI_API_KEY=...
OPENROUTER_API_KEY=...
NEXT_PUBLIC_SITE_URL=https://your-domain.com`;

  const sections = [
    { id: "prerequisites", label: "Overview" },
    { id: "quickstart", label: "Quick Start" },
    { id: "db-setup", label: "Database" },
    { id: "documents", label: "Documents" },
    { id: "prompt", label: "System Prompt" },
    { id: "keys", label: "API Keys" },
    { id: "config-ui", label: "Config UI" },
    { id: "features", label: "Features" },
    { id: "verification", label: "Verification" },
    { id: "troubleshooting", label: "Troubleshooting" },
    { id: "deployment", label: "Deployment" },
    { id: "support", label: "Support" },
  ];

  // Multi-open accordion with persistence
  const [open, setOpen] = React.useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("docsOpen");
        if (saved) return JSON.parse(saved) as string[];
      } catch {}
    }
    return ["quickstart"];
  });

  React.useEffect(() => {
    try {
      localStorage.setItem("docsOpen", JSON.stringify(open));
    } catch {}
  }, [open]);

  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    // No hash updates, no programmatic scroll for stability
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main two-column layout: left sidebar nav (with icon), right content */}
      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left sidebar navigation */}
          <aside className="md:col-span-3 lg:col-span-3">
            <div className="sticky top-6">
              {/* Icon-only back to ChatRAG */}
              <a
                href="/"
                aria-label="Back to ChatRAG"
                className="inline-flex items-center p-2 rounded-md hover:bg-muted/40"
              >
                <SmallLogo />
              </a>

              <div className="mt-4 mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                Documentation
              </div>

              <nav className="space-y-1">
                {sections.map((s) => {
                  const active = open.includes(s.id);
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={handleNavClick(s.id)}
                      className={clsx(
                        "block px-3 py-2 rounded-md text-sm md:text-base transition-colors",
                        active
                          ? "bg-muted/50 text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      )}
                      aria-current={active ? "true" : undefined}
                    >
                      {s.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right content as multi-open accordion */}
          <section className="md:col-span-9 space-y-4">
            <Accordion
              type="multiple"
              value={open}
              onValueChange={(v) => setOpen(v as string[])}
              className="w-full"
            >
              {/* Overview */}
              <AccordionItem value="prerequisites" className="border rounded-md">
                <AccordionTrigger className="px-4 py-3 text-left">
                  <h2 id="prerequisites" className="scroll-mt-24 text-lg md:text-xl font-bold">
                    Overview
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5">
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Node.js 18+ and npm</li>
                    <li>Git</li>
                    <li>Accounts/API Keys: Supabase, OpenAI, OpenRouter, LlamaCloud</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Quick Start */}
              <AccordionItem value="quickstart" className="border rounded-md">
                <AccordionTrigger className="px-4 py-3 text-left">
                  <h2 id="quickstart" className="scroll-mt-24 text-lg md:text-xl font-bold">
                    Quick Start
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5">
                  <p className="text-muted-foreground mb-4">
                    Use the visual Config UI for the fastest setup. Keep both servers running:
                    the app at http://localhost:3000 and the Config UI at http://localhost:3333.
                  </p>
                  <CodeBlock language="bash" code={quickStart} />
                  <p className="text-sm text-muted-foreground mt-3">
                    .env.local is auto-created with a complete baseline. Fill credentials via the Config UI and restart the dev server.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Database */}
              <AccordionItem value="db-setup" className="border rounded-md">
                <AccordionTrigger className="px-4 py-3 text-left">
                  <h2 id="db-setup" className="scroll-mt-24 text-lg md:text-xl font-bold">
                    Database Setup (Supabase)
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 space-y-4">
                  <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                    <li>Create a project in Supabase</li>
                    <li>Open SQL Editor and paste the contents of supabase/complete_setup.sql</li>
                    <li>Run once per project to enable pgvector, HNSW indexes, tables, storage, and RLS</li>
                  </ol>
                  <div>
                    <h3 className="text-base font-semibold mb-2">Credentials</h3>
                    <CodeBlock language="bash" code={supabaseCreds} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Documents */}
              <AccordionItem value="documents" className="border rounded-md">
                <AccordionTrigger className="px-4 py-3 text-left">
                  <h2 id="documents" className="scroll-mt-24 text-lg md:text-xl font-bold">
                    Document Processing &amp; Management
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5">
                  <p className="text-muted-foreground mb-3">
                    Manage documents via the in-app Document Dashboard (recommended) or the admin-oriented Config UI.
                    Supported formats: PDF, DOCX, TXT, HTML, RTF, EPUB.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>LlamaCloud parses and chunks uploads</li>
                    <li>OpenAI generates embeddings</li>
                    <li>Chunks are stored with HNSW vector indexes for fast search</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* System Prompt */}
              <AccordionItem value="prompt" className="border rounded-md">
                <AccordionTrigger className="px-4 py-3 text-left">
                  <h2 id="prompt" className="scroll-mt-24 text-lg md:text-xl font-bold">
                    System Prompt Configuration
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 space-y-3">
                  <p className="text-muted-foreground">
                    Critical: include <code className="px-1 py-0.5 rounded bg-muted/50">{"{{context}}"}</code> exactly, or RAG won&apos;t work.
                    Edit in the visual dashboard while the app is running.
                  </p>
                  <CodeBlock language="bash" code={ragPrompt} />
                </AccordionContent>
              </AccordionItem>

              {/* API Keys */}
              <AccordionItem value="keys" className="border rounded-md">
                <AccordionTrigger className="px-4 py-3 text-left">
                  <h2 id="keys" className="scroll-mt-24 text-lg md:text-xl font-bold">
                    Essential API Keys
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-4">
                      <h3 className="font-semibold mb-2">OpenAI (Required)</h3>
                      <CodeBlock language="bash" code={openaiKeys} />
                    </Card>
                    <Card className="p-4">
                      <h3 className="font-semibold mb-2">OpenRouter (Recommended)</h3>
                      <CodeBlock language="bash" code={openrouterKeys} />
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Features */}
              <AccordionItem value="features" className="border rounded-md">
                <AccordionTrigger className="px-4 py-3 text-left">
                  <h2 id="features" className="scroll-mt-24 text-lg md:text-xl font-bold">
                    Essential Features
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 space-y-6">
                  <div>
                    <h3 className="text-base font-semibold mb-2">RAG</h3>
                    <p className="text-muted-foreground mb-2">
                      Defaults are optimized. Ensure the system prompt includes <code className="px-1 py-0.5 rounded bg-muted/50">{"{{context}}"}</code>.
                    </p>
                    <CodeBlock
                      language="bash"
                      code={`RAG_ADAPTIVE_RETRIEVAL=true
RAG_MULTI_PASS=true
RAG_FINAL_RESULT_COUNT=25`}
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-2">AI Models</h3>
                    <p className="text-muted-foreground">
                      OpenRouter recommended (wide model access). Direct OpenAI/Anthropic/Google also supported.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-2">Document Processing</h3>
                    <p className="text-muted-foreground">
                      Upload → parse/chunk (LlamaCloud) → embed (OpenAI) → vector search (HNSW).
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Verification */}
              <AccordionItem value="verification" className="border rounded-md">
                <AccordionTrigger className="px-4 py-3 text-left">
                  <h2 id="verification" className="scroll-mt-24 text-lg md:text-xl font-bold">
                    Verification
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5">
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Chat at http://localhost:3000</li>
                    <li>Upload a sample PDF and query a unique sentence</li>
                    <li>Restart and confirm settings persist in .env.local</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Troubleshooting */}
              <AccordionItem value="troubleshooting" className="border rounded-md">
                <AccordionTrigger className="px-4 py-3 text-left">
                  <h2 id="troubleshooting" className="scroll-mt-24 text-lg md:text-xl font-bold">
                    Troubleshooting
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5">
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      <strong>RAG not using documents:</strong> Verify <code className="px-1 py-0.5 rounded bg-muted/50">{"{{context}}"}</code> in prompt; ensure processing completed; check embedding model.
                    </li>
                    <li><strong>Database connection failed:</strong> Confirm credentials; ensure complete_setup.sql executed; project not paused.</li>
                    <li><strong>API key invalid:</strong> Check formatting and permissions.</li>
                    <li><strong>Configuration not saving:</strong> Service role key set; admin_settings table exists; restart after changes.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Deployment */}
              <AccordionItem value="deployment" className="border rounded-md">
                <AccordionTrigger className="px-4 py-3 text-left">
                  <h2 id="deployment" className="scroll-mt-24 text-lg md:text-xl font-bold">
                    Deployment (Vercel)
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 space-y-3">
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Create Vercel project from your repo</li>
                    <li>Set required environment variables</li>
                    <li>Build and deploy (Node 18+). Update Supabase Auth redirect URLs.</li>
                  </ul>
                  <CodeBlock language="bash" code={vercelEnv} />
                  <p className="text-sm text-muted-foreground">
                    Tip: After configuring locally via the Config UI, mirror your working .env.local in Vercel Environment Variables.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Support */}
              <AccordionItem value="support" className="border rounded-md">
                <AccordionTrigger className="px-4 py-3 text-left">
                  <h2 id="support" className="scroll-mt-24 text-lg md:text-xl font-bold">
                    Support Resources
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5">
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Config UI: http://localhost:3333</li>
                    <li>Main App: http://localhost:3000</li>
                    <li>GitHub Issues &amp; Community Discord</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>
    </div>
  );
}