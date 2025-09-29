import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Database, Settings, Zap, Code, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation - ChatRAG",
  description: "Complete documentation for ChatRAG - Build AI chatbots in hours, not months",
};

export default function DocsPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-8">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">ChatRAG Documentation</h1>
        <p className="text-xl text-muted-foreground">
          For Developers: This guide gets you from repository access to a fully working ChatRAG instance. Watch the companion videos for visual walkthroughs, then use this guide for reference and troubleshooting.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/docs/prerequisites">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
            <Rocket className="w-10 h-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
            <p className="text-muted-foreground">
              Prerequisites and quick start guide to get your ChatRAG instance up and running.
            </p>
          </Card>
        </Link>

        <Link href="/docs/database-setup">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
            <Database className="w-10 h-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Database Setup</h3>
            <p className="text-muted-foreground">
              Configure Supabase with vector search capabilities for RAG functionality.
            </p>
          </Card>
        </Link>

        <Link href="/docs/api-keys">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
            <Settings className="w-10 h-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">API Keys</h3>
            <p className="text-muted-foreground">
              Configure essential API keys for OpenAI, OpenRouter, and LlamaCloud.
            </p>
          </Card>
        </Link>

        <Link href="/docs/rag-system">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
            <Zap className="w-10 h-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">RAG System</h3>
            <p className="text-muted-foreground">
              Learn about RAG implementation with HNSW-optimized vector search.
            </p>
          </Card>
        </Link>

        <Link href="/docs/deployment">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
            <Code className="w-10 h-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Deployment</h3>
            <p className="text-muted-foreground">
              Deploy your ChatRAG application to Vercel or other platforms.
            </p>
          </Card>
        </Link>

        <Link href="/docs/troubleshooting">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
            <HelpCircle className="w-10 h-10 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Troubleshooting</h3>
            <p className="text-muted-foreground">
              Common issues and solutions to help you resolve problems quickly.
            </p>
          </Card>
        </Link>
      </div>

      <div className="border-t pt-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold mb-2">Popular Topics</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/docs/quick-start" className="hover:text-foreground">
                  → Quick Start Guide
                </Link>
              </li>
              <li>
                <Link href="/docs/config-ui" className="hover:text-foreground">
                  → Configuration UI Guide
                </Link>
              </li>
              <li>
                <Link href="/docs/document-processing" className="hover:text-foreground">
                  → Document Processing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Advanced Topics</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/docs/mcp-integration" className="hover:text-foreground">
                  → MCP Tools Integration
                </Link>
              </li>
              <li>
                <Link href="/docs/whatsapp" className="hover:text-foreground">
                  → WhatsApp Integration
                </Link>
              </li>
              <li>
                <Link href="/docs/media-generation" className="hover:text-foreground">
                  → Media Generation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}