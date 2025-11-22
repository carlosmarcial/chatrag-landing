"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DocsThemeToggle } from "@/components/docs-theme-toggle";
import { cn } from "@/lib/utils";
import { BookOpen, Database, Settings, Zap, Rocket, HelpCircle, Code, Cloud, FileText, Building2, Users } from "lucide-react";

const navigation = [
  {
    title: "Getting Started",
    icon: Rocket,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Deployment Modes", href: "/docs/deployment-mode" },
      { title: "Prerequisites", href: "/docs/prerequisites" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Configuration",
    icon: Settings,
    items: [
      { title: "Database Setup", href: "/docs/database-setup" },
      { title: "API Keys", href: "/docs/api-keys" },
      { title: "Configuration UI", href: "/docs/config-ui" },
      { title: "System Prompt", href: "/docs/system-prompt" },
    ],
  },
  {
    title: "Features",
    icon: Zap,
    items: [
      { title: "RAG System", href: "/docs/rag-system" },
      { title: "Document Processing", href: "/docs/document-processing" },
      { title: "AI Models", href: "/docs/ai-models" },
      { title: "Authentication", href: "/docs/authentication" },
      { title: "Media Generation", href: "/docs/media-generation" },
    ],
  },
  {
    title: "Multi-Tenant",
    icon: Building2,
    items: [
      { title: "Multi-Tenant Setup", href: "/docs/multi-tenant" },
    ],
  },
  {
    title: "Advanced",
    icon: Code,
    items: [
      { title: "MCP Integration", href: "/docs/mcp-integration" },
      { title: "WhatsApp Integration", href: "/docs/whatsapp" },
      { title: "Branding & UI", href: "/docs/branding" },
      { title: "Deployment", href: "/docs/deployment" },
    ],
  },
  {
    title: "Support",
    icon: HelpCircle,
    items: [
      { title: "Troubleshooting", href: "/docs/troubleshooting" },
      { title: "FAQ", href: "/docs/faq" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background" data-docs-theme-root>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center pl-6">
            <Logo />
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[280px_minmax(0,1fr)] md:gap-24 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-32">
        {/* Sidebar */}
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full overflow-y-auto py-6 lg:py-8">
            <nav className="space-y-6 pl-6 pr-6">
              {navigation.map((section) => (
                <div key={section.title}>
                  <div className="flex items-center mb-3 text-base font-semibold">
                    <section.icon className="w-5 h-5 mr-2" />
                    {section.title}
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block pl-7 py-2 text-base transition-colors hover:text-foreground whitespace-normal leading-relaxed",
                          pathname === item.href
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative py-6 lg:gap-10 lg:py-8 pl-20 lg:pl-24">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}