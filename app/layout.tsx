import './globals.css';
import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import Script from 'next/script';
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: 'Build AI chatbots in hours, not months | ChatRAG',
  description: 'The Next.js & AI SDK boilerplate for turning data into profit with RAG (Retrieval Augmented Generation). Build, launch, and monetize custom chatbot-based SaaS products.',
  keywords: ['AI chatbot builder', 'RAG implementation', 'Next.js boilerplate', 'AI SDK', 'chatbot SaaS', 'vector database', 'OpenAI', 'Supabase', 'LlamaCloud'],
  authors: [{ name: 'Carlos Marcial', url: 'https://x.com/carlosmarcialt' }],
  creator: 'Carlos Marcial',
  publisher: 'ChatRAG',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.chatrag.ai',
    siteName: 'ChatRAG',
    title: 'Build AI chatbots in hours, not months | ChatRAG',
    description: 'The Next.js & AI SDK boilerplate for turning data into profit with RAG (Retrieval Augmented Generation). Build, launch, and monetize custom chatbot-based SaaS products.',
    images: [
      {
        url: 'https://www.chatrag.ai/images/heroChatRag.png?v=2',
        width: 2166,
        height: 2017,
        alt: 'ChatRAG - AI Chatbot Builder Platform with RAG Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@carlosmarcialt',
    creator: '@carlosmarcialt',
    title: 'Build AI chatbots in hours, not months | ChatRAG',
    description: 'The Next.js & AI SDK boilerplate for turning data into profit with RAG (Retrieval Augmented Generation).',
    images: ['https://www.chatrag.ai/images/heroChatRag.png?v=2'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/favicon-48x48.svg', sizes: '48x48', type: 'image/svg+xml' },
      { url: '/favicon-64x64.svg', sizes: '64x64', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  metadataBase: new URL('https://www.chatrag.ai'),
  alternates: {
    canonical: 'https://www.chatrag.ai',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enhanced JSON-LD structured data for AI and search engines
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ChatRAG",
    "url": "https://www.chatrag.ai",
    "logo": "https://www.chatrag.ai/favicon.svg",
    "description": "The Next.js & AI SDK boilerplate for building production-ready AI chatbots with RAG (Retrieval Augmented Generation). Build, launch, and monetize custom chatbot-based SaaS products.",
    "founder": {
      "@type": "Person",
      "name": "Carlos Marcial",
      "url": "https://x.com/carlosmarcialt"
    },
    "sameAs": [
      "https://x.com/carlosmarcialt",
      "https://github.com/carlosmarcial"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "url": "https://www.chatrag.ai"
    }
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ChatRAG",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Cross-platform",
    "url": "https://www.chatrag.ai",
    "description": "Next.js & AI SDK boilerplate for building RAG-powered AI chatbots with document understanding, multi-LLM support, vector search, and built-in monetization.",
    "offers": {
      "@type": "Offer",
      "price": "99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "softwareVersion": "1.0",
    "featureList": [
      "RAG (Retrieval Augmented Generation)",
      "Next.js 14+ App Router",
      "Multiple LLM providers (OpenAI, Claude, Gemini, Llama)",
      "Supabase Vector Database with HNSW indexes",
      "Document processing (PDF, DOCX, TXT)",
      "Built-in authentication",
      "Stripe and Polar payment integration",
      "WhatsApp integration",
      "AI image and video generation",
      "White-label customization",
      "TypeScript support",
      "Production-ready infrastructure"
    ],
    "screenshot": "https://www.chatrag.ai/images/heroChatRag.png",
    "creator": {
      "@type": "Person",
      "name": "Carlos Marcial",
      "url": "https://x.com/carlosmarcialt"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ChatRAG",
    "url": "https://www.chatrag.ai",
    "description": "Build AI chatbots in hours, not months. Complete Next.js boilerplate with RAG, vector search, multi-LLM support, and monetization.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.chatrag.ai/docs?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.chatrag.ai"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Documentation",
        "item": "https://www.chatrag.ai/docs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Pricing",
        "item": "https://www.chatrag.ai/#pricing"
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning style={{ backgroundColor: '#020408' }}>
      <head>
        {/* Meta viewport for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Theme color for browser UI - matches dark background */}
        <meta name="theme-color" content="#020408" />

        {/* Resource hints for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data for AI and Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {/* Font face declarations for immediate availability */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Arial';
              src: local('Arial'), local('ArialMT');
              font-display: swap;
              font-weight: normal;
            }
            @font-face {
              font-family: 'Arial Black';
              src: local('Arial Black'), local('Arial-Black');
              font-display: swap;
              font-weight: 900;
            }

            /* Critical CSS for logo to prevent any flash */
            .logo-svg, .small-logo-svg {
              opacity: 1 !important;
              visibility: visible !important;
            }
          `
        }} />

        {/* DataFast Analytics */}
        <Script
          defer
          data-website-id="dfid_52F58Fgk2yFHPiAVw869k"
          data-domain="www.chatrag.ai"
          src="https://datafa.st/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="overflow-y-auto" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Analytics />
        {/* ChatRAG Production Widget from chatrag-demo.vercel.app */}
        <script
          id="chatrag-embed-loader"
          dangerouslySetInnerHTML={{ __html: `
            (function(){
              var WIDGET_URL='https://chatrag-demo.vercel.app/embed/chat.js';
              var COLOR='#ff6417';
              function injectScript(){
                if (window.ChatRAGWidget || document.getElementById('chatrag-embed-script')) return;
                var s=document.createElement('script');
                s.id='chatrag-embed-script';
                s.src=WIDGET_URL+'?v='+Date.now();
                s.async=true;
                s.setAttribute('data-primary-color',COLOR);
                s.setAttribute('data-title','ChatRAG Assistant');
                s.onerror=function(){
                  console.error('Failed to load ChatRAG widget script');
                };
                document.body.appendChild(s);
              }
              if (document.readyState==='loading'){
                document.addEventListener('DOMContentLoaded',injectScript);
              } else { injectScript(); }
            })();
          ` }}
        />
      </body>
    </html>
  );
}
