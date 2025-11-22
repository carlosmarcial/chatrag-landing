import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, Database, Settings, Zap, Code, HelpCircle, Building2, User, Users, Shield, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation - ChatRAG",
  description: "Complete documentation for ChatRAG - Build AI chatbots in hours, not months",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs',
  },
  openGraph: {
    title: 'Documentation - ChatRAG',
    description: 'Complete documentation for ChatRAG - Build AI chatbots in hours, not months',
    url: 'https://www.chatrag.ai/docs',
    siteName: 'ChatRAG',
    type: 'website',
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

export default function DocsPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-8">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">ChatRAG Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Get your RAG-powered AI chatbot up and running in minutes. Follow our step-by-step guide to go from repository access to a fully working ChatRAG instance.
        </p>
      </div>

      {/* Deployment Mode Decision - FIRST */}
      <Alert className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950">
        <Info className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        <AlertTitle className="text-orange-900 dark:text-orange-100 text-lg">First Decision: Choose Your Deployment Mode</AlertTitle>
        <AlertDescription className="text-orange-800 dark:text-orange-200">
          ChatRAG supports two deployment modes from a single codebase. Choose your mode before starting setup - this determines your database schema and features.
        </AlertDescription>
      </Alert>

      {/* Deployment Mode Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 border-2 hover:border-blue-500 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Single-Tenant Mode</h3>
              <p className="text-sm text-muted-foreground">Shared Knowledge Base</p>
            </div>
          </div>
          <p className="text-muted-foreground mb-4">
            All users share the same knowledge base. Perfect for AI assistants, chatbots, and product documentation where everyone accesses the same content.
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span>Shared documents for all users</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span>User-isolated chat history</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span>Simple setup and configuration</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Best for: AI Twins, Product Docs, Customer Support Bots
          </p>
        </Card>

        <Card className="p-6 border-2 hover:border-purple-500 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Multi-Tenant Mode</h3>
              <p className="text-sm text-muted-foreground">Isolated Workspaces</p>
            </div>
          </div>
          <p className="text-muted-foreground mb-4">
            Each user/team gets isolated workspaces with private knowledge bases. Perfect for SaaS products, enterprises, and agencies managing multiple clients.
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span>Isolated knowledge bases per workspace</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span>Team collaboration with roles</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span>Subscription tiers & quotas</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Best for: SaaS RAG Products, Enterprise, Agencies
          </p>
        </Card>
      </div>

      <div className="text-center">
        <Link href="/docs/deployment-mode">
          <Button variant="outline" size="lg">
            Learn More About Deployment Modes →
          </Button>
        </Link>
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
                New to ChatRAG? Follow our comprehensive guide to set up your RAG-powered chatbot in hours, not months.
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
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <h3 className="font-semibold mb-2">Multi-Tenant Features</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/docs/deployment-mode" className="hover:text-foreground">
                  → Deployment Modes Guide
                </Link>
              </li>
              <li>
                <Link href="/docs/multi-tenant" className="hover:text-foreground">
                  → Multi-Tenant Setup
                </Link>
              </li>
            </ul>
          </div>
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