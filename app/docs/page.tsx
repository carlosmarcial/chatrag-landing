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
          Get your RAG-powered AI chatbot up and running in minutes. Follow our step-by-step guide to go from repository access to a fully working ChatRAG instance.
        </p>
      </div>

      {/* Featured Quick Start Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-lg p-8">
        <div className="flex items-start gap-6">
          <div className="hidden sm:block">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">🚀 Start Here: Quick Start Guide</h2>
              <p className="text-lg text-muted-foreground">
                New to ChatRAG? Follow our comprehensive 12-step guide to set up your RAG-powered chatbot in hours, not months.
              </p>
            </div>
            <Link href="/docs/quick-start">
              <Button size="lg" className="text-lg">
                Get Started Now →
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Essential Documentation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Essential Guides</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/docs/prerequisites">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <Settings className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Prerequisites</h3>
              <p className="text-muted-foreground">
                Required software and API keys you'll need before starting with ChatRAG.
              </p>
            </Card>
          </Link>

          <Link href="/docs/config-ui">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <Settings className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Configuration UI</h3>
              <p className="text-muted-foreground">
                Use the visual dashboard to configure API keys, features, and branding.
              </p>
            </Card>
          </Link>

          <Link href="/docs/rag-system">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <Zap className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">RAG System</h3>
              <p className="text-muted-foreground">
                Learn about document processing and HNSW-optimized vector search.
              </p>
            </Card>
          </Link>

          <Link href="/docs/deployment">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <Code className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Deployment</h3>
              <p className="text-muted-foreground">
                Deploy your ChatRAG application to Vercel or other cloud platforms.
              </p>
            </Card>
          </Link>
        </div>
      </div>

      <div className="border-t pt-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold mb-2">Advanced Features</h3>
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
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/docs/troubleshooting" className="hover:text-foreground">
                  → Troubleshooting Guide
                </Link>
              </li>
              <li>
                <Link href="/docs/faq" className="hover:text-foreground">
                  → Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}