"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clipboard, Check } from "lucide-react";
import clsx from "clsx";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";

// Register a small set of common languages
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("typescript", typescript);

type CodeBlockProps = {
  code: string;
  language?: string;
  className?: string;
  showHeader?: boolean;
};

export function CodeBlock({ code, language = "bash", className, showHeader = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const highlighted = useMemo(() => {
    try {
      if (language) {
        return hljs.highlight(code, { language }).value;
      }
      return hljs.highlightAuto(code).value;
    } catch {
      // Fallback to escaped text
      return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }, [code, language]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className={clsx("relative rounded-lg border bg-muted/40", className)}>
      {showHeader && (
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">{language}</span>
          <Button variant="ghost" size="sm" className="gap-2" onClick={onCopy}>
            {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code
          className={`hljs language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>

      {/* Minimal, subtle highlight.js theme (dark + light aware) */}
      <style jsx global>{`
        .hljs {
          background: transparent;
          color: hsl(var(--foreground));
        }
        .hljs-comment,
        .hljs-quote {
          color: hsl(var(--muted-foreground));
        }
        .hljs-keyword,
        .hljs-selector-tag,
        .hljs-subst {
          color: #8ab4f8;
        }
        .hljs-string,
        .hljs-title,
        .hljs-name,
        .hljs-type,
        .hljs-attribute {
          color: #a1e3a1;
        }
        .hljs-number,
        .hljs-literal,
        .hljs-symbol,
        .hljs-bullet {
          color: #f28b82;
        }
        .hljs-section {
          color: #fdd663;
        }
        .hljs-built_in,
        .hljs-builtin-name,
        .hljs-meta {
          color: #80cbc4;
        }
        .hljs-emphasis { font-style: italic; }
        .hljs-strong { font-weight: 600; }
      `}</style>
    </div>
  );
}