import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

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
    url: 'https://chatrag.ai',
    siteName: 'ChatRAG',
    title: 'Build AI chatbots in hours, not months | ChatRAG',
    description: 'The Next.js & AI SDK boilerplate for turning data into profit with RAG (Retrieval Augmented Generation). Build, launch, and monetize custom chatbot-based SaaS products.',
    images: [
      {
        url: '/images/heroChatRag.png',
        width: 1200,
        height: 630,
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
    images: ['/images/heroChatRag.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  metadataBase: new URL('https://chatrag.ai'),
  alternates: {
    canonical: 'https://chatrag.ai',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Meta viewport for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Resource hints for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
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
      </head>
      <body className="overflow-y-scroll" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}