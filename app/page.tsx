"use client";

import Image from "next/image";
import { Bot, Menu, X, Database, CreditCard, Cpu, Settings, Code, Palette, FileText, Zap, Users, Workflow, Star, Gift, Globe, Video, Share, Mic, Smartphone, FileDown, History, Languages, Type, Code2, Crown, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Logo } from "@/components/logo";
import { SmallLogo } from "@/components/small-logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FeaturesShowcase } from "@/components/sections/features-showcase";
import { ChatWidgetCurvedTextOverlay } from "@/components/chat-widget-curved-text-overlay";
import { LicenseModal } from "@/components/license-modal";
import { Space_Grotesk } from 'next/font/google';
import { useState, useRef, useEffect } from 'react';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

// Dynamic logo data extracted from filenames
const techProviders = [
  { filename: 'openai', displayName: 'OpenAI', description: 'Powers embeddings for semantic search and GPT models for intelligent AI conversations' },
  { filename: 'stripe', displayName: 'Stripe', description: 'Secure payment processing and subscription management for monetizing your chatbots' },
  { filename: 'nextjs', displayName: 'Next.js', description: 'Full-stack React framework providing the foundation for your chatbot application' },
  { filename: 'supabase', displayName: 'Supabase', description: 'Vector database for RAG storage, user authentication, and real-time data sync' },
  { filename: 'mcp', displayName: 'MCP', description: 'Connects your chatbot to external tools like Zapier and N8N for automation' },
  { filename: 'typescript', displayName: 'TypeScript', description: 'Type safety and enhanced developer experience across the entire codebase' },
  { filename: 'polar', displayName: 'Polar', description: 'Alternative payment platform for selling and distributing your ChatRAG products' },
  { filename: 'falai', displayName: 'fal.ai', description: 'Generates AI images and videos on-demand within your chatbot conversations' },
  { filename: 'llamacloud', displayName: 'LlamaCloud', description: 'Intelligently parses PDFs, Word docs, and more into RAG-ready chunks' },
  { filename: 'tailwind', displayName: 'Tailwind CSS', description: 'Utility-first CSS framework for rapidly styling beautiful responsive UIs' },
  { filename: 'replicate', displayName: 'Replicate', description: 'Advanced AI models for image generation, voice cloning, and more via API' },
  { filename: 'openrouter', displayName: 'OpenRouter', description: 'Access to 200+ LLMs including Claude, Gemini, and Llama with unified pricing' },
  { filename: 'resend-icon-white', displayName: 'Resend', description: 'Transactional emails for notifications, password resets, and user updates' },
];

// Create logo sets for seamless infinite scroll
const createLogoSet = (providers: typeof techProviders) => 
  providers.map((provider, index) => ({
    ...provider,
    key: `${provider.filename}-${index}`,
    src: `/images/chatrag_techprovider_${provider.filename}.png`,
  }));

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  // Handler for checkout button clicks - works better on mobile
  const handleCheckout = async (productId: string) => {
    try {
      const response = await fetch(`/api/checkout?products=${productId}`, { cache: 'no-store' });
      // If server returned HTML (e.g. due to redirect logic), fall back to full-page nav
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        window.location.href = `/api/checkout?products=${productId}`;
        return;
      }
      const data = await response.json();

      if (data.url) {
        window.location.assign(data.url);
      } else if (data.error) {
        console.error('Checkout error:', data.error);
        // Fallback to server-side redirect path
        window.location.href = `/api/checkout?products=${productId}`;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // Fallback to server-side redirect path if fetch/json parsing fails
      window.location.href = `/api/checkout?products=${productId}`;
    }
  };

  // Create logo set
  const logos = createLogoSet(techProviders);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ChatRAG",
    "description": "The Next.js & AI SDK boilerplate for turning data into profit with RAG (Retrieval Augmented Generation). Build, launch, and monetize custom chatbot-based SaaS products.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "url": "https://chatrag.ai",
    "screenshot": "https://chatrag.ai/images/heroChatRag.png",
    "softwareVersion": "1.0",
    "offers": {
      "@type": "Offer",
      "price": "269",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-27",
      "priceValidUntil": "2025-12-31"
    },
    "creator": {
      "@type": "Person",
      "name": "Carlos Marcial",
      "url": "https://x.com/carlosmarcialt"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ChatRAG",
      "url": "https://chatrag.ai"
    },
    "featureList": [
      "Next.js full-stack framework",
      "Vercel AI SDK",
      "RAG implementation with LlamaCloud",
      "OpenAI embeddings",
      "Supabase Vector Database",
      "Stripe/Polar payments",
      "MCP Tools integration",
      "Multi-language support",
      "Mobile responsive design"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "ratingCount": "250"
    }
  };

  // Refs for scroll trigger sections
  const benefitsSectionRef = useRef<HTMLDivElement>(null);

  // Sync isPaused state with ref
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // JavaScript-controlled carousel animation with persistent position
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let lastTime = Date.now();
    const viewportWidth = window.innerWidth;
    const baseSpeed = viewportWidth < 768 ? 0.5 : 1.5; // Adjust speed based on screen size

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      
      if (!isPausedRef.current) {
        // Get all logo containers
        const logoContainers = carousel.querySelectorAll('.logo-container');
        if (logoContainers.length > 0) {
          // Calculate the width of one complete set (half of all logos)
          const halfCount = Math.floor(logoContainers.length / 2);
          const gap = window.innerWidth < 768 ? 96 : 160; // gap-24 = 96px, gap-40 = 160px
          let setWidth = 0;
          
          // Sum up the width of half the logos plus gaps
          for (let i = 0; i < halfCount; i++) {
            const logo = logoContainers[i] as HTMLElement;
            setWidth += logo.getBoundingClientRect().width;
            // Add gap width after every logo (including the last one for seamless loop)
            setWidth += gap;
          }
          
          // Normalize speed to 60fps (16.67ms per frame)
          const speed = baseSpeed * (deltaTime / 16.67);
          
          positionRef.current -= speed;
          
          // Reset when exactly one set width has scrolled
          if (Math.abs(positionRef.current) >= setWidth) {
            positionRef.current = positionRef.current % setWidth;
          }
          
          carousel.style.transform = `translateX(${positionRef.current}px)`;
        }
      }
      
      lastTime = currentTime;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []); // Empty dependency array - only run once

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-background">
        <div className="w-full bg-background">
      {/* Navigation */}
      <nav className="relative">
        <div className="container mx-auto pr-4 pl-0 h-20 pt-1">
          <div className="flex items-center justify-between h-full">
            {/* Logo and Navigation - Left */}
            <div className="flex items-center -ml-10 space-x-0">
              <div className="-mr-4">
                <Logo />
              </div>
              <Button variant="ghost" className="hover:text-foreground text-base hidden md:flex -mt-2" asChild>
                <a href="#pricing">Pricing</a>
              </Button>
              <Button variant="ghost" className="hover:text-foreground text-base hidden md:flex -mt-2" asChild>
                <a href="#faq">FAQ</a>
              </Button>
              <Button variant="ghost" className="hover:text-foreground text-base hidden md:flex -mt-2" asChild>
                <a href="/docs">Documentation</a>
              </Button>
              <Button variant="ghost" className="hover:text-foreground text-base hidden" asChild>
                <a href="#testimonials">Testimonials</a>
              </Button>
            </div>

            {/* Mobile Menu Button - Right */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative z-50"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <Button
                variant="ghost"
                className="text-2xl hover:text-foreground"
                asChild
                onClick={() => setMobileMenuOpen(false)}
              >
                <a href="#pricing">Pricing</a>
              </Button>
              <Button
                variant="ghost"
                className="text-2xl hover:text-foreground"
                asChild
                onClick={() => setMobileMenuOpen(false)}
              >
                <a href="#faq">FAQ</a>
              </Button>
              <Button
                variant="ghost"
                className="text-2xl hover:text-foreground"
                asChild
                onClick={() => setMobileMenuOpen(false)}
              >
                <a href="/docs">Documentation</a>
              </Button>
              <Button
                variant="ghost"
                className="text-2xl hover:text-foreground hidden"
                asChild
                onClick={() => setMobileMenuOpen(false)}
              >
                <a href="#testimonials">Testimonials</a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* SVG Gradient Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="gift-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4080FF" />
            <stop offset="50%" stopColor="#FFB001" />
            <stop offset="100%" stopColor="#F44335" />
          </linearGradient>
        </defs>
      </svg>

      {/* Hero Section */}
      <section id="hero-section" className="container mx-auto px-4 pt-6 pb-8 md:pt-8 md:pb-16 lg:pt-10 xl:pt-12 lg:pb-20 bg-background">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-relaxed md:leading-loose lg:leading-loose xl:leading-[1.4] mb-6 md:mb-8`}>
            Ship AI chatbots in <span className="slanted-gradient-box">hours</span>, not months
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 md:mb-12 max-w-3xl mx-auto">
            The complete Next.js boilerplate for launching your chatbot-agent SaaS business. <strong>Pay once, own forever.</strong> Turn your data or that of your clients into recurring revenue. Deploy unlimited RAG-powered chatbots that monetize your expertise. Charge subscriptions, keep all the profits. Your AI business in a box.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* Primary CTA - high-contrast brand orange */}
            <Button
              size="lg"
              className="px-8 py-6 text-base md:text-lg font-semibold group hero-button-width bg-[#FF6417] text-black hover:bg-[#ff7a3a] focus-visible:ring-[#FF6417]/40 shadow-[0_10px_30px_-10px_rgba(255,100,23,0.6)] hover:shadow-[0_16px_40px_-12px_rgba(255,100,23,0.75)] transform-gpu gpu-smooth transition-[box-shadow,transform,background-color,color,border-color] duration-200"
              onClick={() => handleCheckout('c9cb30b2-3c43-44fc-9070-19c9cc02a24d')}
            >
              <div className="group-hover:-rotate-12 transition-transform duration-200 transform-gpu">
                <SmallLogo />
              </div>
              <span className="ml-2">Get ChatRAG</span>
            </Button>
            {/* Secondary CTA - vivid electric blue outline */}
            <Button
              size="lg"
              className="px-8 py-6 text-base md:text-lg font-semibold group hero-button-width border-2 border-[#4080FF] text-[#4080FF] hover:text-white bg-transparent hover:bg-transparent focus-visible:ring-[#4080FF]/40 shadow-[0_10px_30px_-10px_rgba(64,128,255,0.45)] transform-gpu gpu-smooth transition-[box-shadow,transform,background-color,color,border-color] duration-200"
              variant="outline"
              asChild
            >
              <a href="https://chatrag-demo.vercel.app/" target="_blank" rel="noopener noreferrer">
                <div className="group-hover:-rotate-12 transition-transform duration-200 transform-gpu">
                  <span className="text-lg md:text-xl">👀</span>
                </div>
                <span className="ml-2">View Demo</span>
              </a>
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-16 -mt-2">
            <Gift className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', color: '#FF8C00' }} />
            <span><span style={{ color: '#FF8C00' }}>$100 off</span> for the first 5,000 customers</span>
          </div>
          
          {/* Social Proof - Hidden until we have actual clients */}
          <div className="hidden flex items-center justify-center space-x-4">
            {/* Avatar circles */}
            <div className="flex -space-x-4">
              <Image
                src="/images/chatrag_customer1.jpg"
                alt="AI developer satisfied with ChatRAG boilerplate"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-background object-cover hover:scale-110 transition-transform duration-200 cursor-pointer relative z-10"
              />
              <Image
                src="/images/chatrag_customer2.jpg"
                alt="Entrepreneur using ChatRAG for chatbot development"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-background object-cover hover:scale-110 transition-transform duration-200 cursor-pointer relative z-20"
              />
              <Image
                src="/images/chatrag_customer3.jpg"
                alt="SaaS founder building AI chatbots with ChatRAG"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-background object-cover hover:scale-110 transition-transform duration-200 cursor-pointer relative z-30"
              />
              <Image
                src="/images/chatrag_customer4.jpg"
                alt="Developer creating RAG-powered applications"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-background object-cover hover:scale-110 transition-transform duration-200 cursor-pointer relative z-40"
              />
              <Image
                src="/images/chatrag_customer5.jpg"
                alt="AI agency owner scaling chatbot solutions"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-background object-cover hover:scale-110 transition-transform duration-200 cursor-pointer relative z-50"
              />
            </div>
            
            {/* Stars and text */}
            <div className="flex flex-col">
              <div className="flex space-x-1 mb-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">250+</strong> AI developers & entrepreneurs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="container mx-auto px-4 -mt-16 pb-6 md:-mt-20 md:pb-8 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="relative w-full overflow-hidden rounded-sm" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/CRUlv97HDPI"
              title="ChatRAG Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              suppressHydrationWarning
            ></iframe>
          </div>
        </div>
      </section>

      {/* Logo Stripe Section */}
      <section className="pt-6 md:pt-8 pb-2 md:pb-4 bg-background">
        {/* Animated Logo Stripe */}
        <div className="relative w-full overflow-hidden py-8">
          <div ref={carouselRef} className="flex gap-24 md:gap-40 pb-16">
            {/* Render all logos in one continuous flow for consistent spacing */}
            {[...logos, ...logos].map((provider, index) => (
              <div 
                key={`${index}-${provider.filename}`} 
                className="relative group logo-container flex-shrink-0"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <Image
                  src={provider.src}
                  alt={`${provider.displayName} - ${provider.description}`}
                  width={128}
                  height={64}
                  className="w-24 h-12 md:w-32 md:h-16 object-contain opacity-80"
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-black text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg" style={{zIndex: 50, minWidth: '180px', maxWidth: '280px', marginTop: '8px'}}>
                  <div className="font-semibold text-sm mb-1">{provider.displayName}</div>
                  <div className="text-xs text-gray-300 leading-tight">{provider.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <FeaturesShowcase />

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">Pay once, own forever!</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't get left behind in the AI revolution! 🤖
            </p>
          </div>
          <div className="pricing-section-grid">
            <Card className="p-6 border bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20 hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4 pt-6">
                <h3 className="text-2xl font-bold mb-6">ChatRAG Starter</h3>
                <div className="flex items-baseline mb-6">
                  <div className="flex items-center">
                    <span className="text-muted-foreground line-through mr-2">$299</span>
                    <span className="text-4xl font-bold">$199</span>
                  </div>
                  <span className="text-muted-foreground ml-2">USD</span>
                </div>
                <ul className="space-y-3 mb-10">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Complete Next.js RAG boilerplate
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    LlamaCloud + OpenAI + Supabase Vector DB
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Stripe & Polar monetization built-in
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    200+ AI models via OpenRouter
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Zapier MCP ready
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Authentication & user management
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Production-ready UI with Tailwind & shadcn
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2">✗</span>
                    Discord community
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2">✗</span>
                    Lifetime updates
                  </li>
                </ul>
                <Button className="w-full px-8 py-6 text-base font-semibold group bg-[#FF6417] text-black hover:bg-[#ff7a3a] focus-visible:ring-[#FF6417]/40 shadow-[0_10px_30px_-10px_rgba(255,100,23,0.6)] hover:shadow-[0_16px_40px_-12px_rgba(255,100,23,0.75)] transform-gpu gpu-smooth transition-[box-shadow,transform,background-color,color,border-color] duration-200" size="lg" onClick={() => handleCheckout('1fccb238-c09e-41fd-9875-d7eba1167467')}>
                  <div className="group-hover:-rotate-12 transition-transform duration-200 transform-gpu">
                    <SmallLogo />
                  </div>
                  <span className="ml-2">Get ChatRAG</span>
                </Button>
                <p className="text-center text-sm text-foreground font-medium mt-3">
                  Pay once. Build unlimited chatbots!
                </p>
              </div>
            </Card>

            <Card className="p-6 relative overflow-hidden border bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20 hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-4 right-4 bg-[#FE6416] text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                Most Popular
              </div>
              <div className="mb-4 pt-6">
                <h3 className="text-2xl font-bold mb-6">ChatRAG Complete</h3>
                <div className="flex items-baseline mb-6">
                  <div className="flex items-center">
                    <span className="text-muted-foreground line-through mr-2">$369</span>
                    <span className="text-4xl font-bold">$269</span>
                  </div>
                  <span className="text-muted-foreground ml-2">USD</span>
                </div>
                <ul className="space-y-3 mb-10">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Complete Next.js RAG boilerplate
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    LlamaCloud + OpenAI + Supabase Vector DB
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Stripe & Polar monetization built-in
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    200+ AI models via OpenRouter
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Zapier MCP ready
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Authentication & user management
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Production-ready UI with Tailwind & shadcn
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Discord community
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Lifetime updates
                    <div className="inline-flex items-center bg-[#FE6416] text-white px-2.5 py-1 rounded-full text-xs font-medium ml-3">
                      Updated 2 days ago
                    </div>
                  </li>
                </ul>
                <Button className="w-full px-8 py-6 text-base font-semibold group bg-[#FF6417] text-black hover:bg-[#ff7a3a] focus-visible:ring-[#FF6417]/40 shadow-[0_10px_30px_-10px_rgba(255,100,23,0.6)] hover:shadow-[0_16px_40px_-12px_rgba(255,100,23,0.75)] transform-gpu gpu-smooth transition-[box-shadow,transform,background-color,color,border-color] duration-200" size="lg" variant="default" onClick={() => handleCheckout('c9cb30b2-3c43-44fc-9070-19c9cc02a24d')}>
                  <div className="group-hover:-rotate-12 transition-transform duration-200 transform-gpu">
                    <SmallLogo />
                  </div>
                  <span className="ml-2">Get ChatRAG</span>
                </Button>
                <p className="text-center text-sm text-foreground font-medium mt-3">
                  Pay once. Build unlimited chatbots!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ChatRAG vs Others Comparison Section */}
      <section id="comparison" className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
              <span className="animate-pulse-glow-light">ChatRAG</span> vs Others
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Why pay monthly subscriptions when you can own your chatbot infrastructure forever?
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-background rounded-lg shadow-lg border">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 md:p-3 font-semibold text-sm md:text-base border-r w-1/2">Feature</th>
                    <th className="text-center p-2 md:p-3 font-semibold text-sm md:text-base bg-green-50 dark:bg-green-950/20 border-r w-1/4">
                      <div className="flex flex-col items-center">
                        <SmallLogo />
                        <span className="mt-1 text-xs md:text-sm">ChatRAG</span>
                      </div>
                    </th>
                    <th className="text-center p-2 md:p-3 font-semibold text-sm md:text-base w-1/4">Chatbase</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Pay once, build forever</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">$40-500/mo</div>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Unlimited chats</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Unlimited messages</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">100-40K/mo</div>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Ownership of chatbots</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">Self-hosted</div>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">SaaS only</div>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Lose access if company disappears</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✗</span>
                      <div className="text-[10px] md:text-xs text-green-600 dark:text-green-400 mt-0.5 font-medium">You own it</div>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✓</span>
                      <div className="text-[10px] md:text-xs text-red-600 dark:text-red-400 mt-0.5">Vendor lock-in</div>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Full ChatGPT/Claude-like web interface</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">Widget only</div>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Connect WhatsApp without Business account</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Charge subscriptions to your chatbots (Stripe/Polar)</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                      <div className="text-[10px] md:text-xs text-green-600 dark:text-green-400 mt-0.5 font-medium">Monetize it!</div>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Create images, videos & 3D assets</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">fal.ai, Replicate</div>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Connect any MCP you want</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">Zapier, N8N, etc.</div>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Web search combined with RAG</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Connect to any AI model with API</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">200+ via OpenRouter</div>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">Limited selection</div>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Create artifacts from code</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">Claude Artifacts</div>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Shareable conversation links</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Download conversation as PDF</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Add AI responses to knowledge base (manual memory)</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Speech-to-text & text-to-speech</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm border-r">Incognito chats</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-muted/50 transition-colors">
                    <td className="p-2 md:p-3 text-xs md:text-sm font-semibold border-r">Full control of your data & database</td>
                    <td className="p-2 md:p-3 text-center bg-green-50 dark:bg-green-950/20 border-r">
                      <span className="text-green-600 dark:text-green-400 text-lg md:text-xl">✓</span>
                      <div className="text-[10px] md:text-xs text-green-600 dark:text-green-400 mt-0.5 font-medium">You own everything</div>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <span className="text-red-600 dark:text-red-400 text-lg md:text-xl">✗</span>
                      <div className="text-[10px] md:text-xs text-red-600 dark:text-red-400 mt-0.5">Hosted by Chatbase</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <Button
                size="lg"
                className="px-8 py-6 text-base md:text-lg font-semibold group bg-[#FF6417] text-black hover:bg-[#ff7a3a] focus-visible:ring-[#FF6417]/40 shadow-[0_10px_30px_-10px_rgba(255,100,23,0.6)] hover:shadow-[0_16px_40px_-12px_rgba(255,100,23,0.75)] transform-gpu gpu-smooth transition-[box-shadow,transform,background-color,color,border-color] duration-200"
                onClick={() => handleCheckout('c9cb30b2-3c43-44fc-9070-19c9cc02a24d')}
              >
                <div className="group-hover:-rotate-12 transition-transform duration-200 transform-gpu">
                  <SmallLogo />
                </div>
                <span className="ml-2">Get ChatRAG Now</span>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Stop paying monthly fees. Own your chatbot infrastructure forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Hidden until we have actual customers */}
      <section id="testimonials" className="hidden py-12 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="mb-4">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-muted-foreground mb-4">
                "ChatRAG helped us launch our customer support bot in just two days. The RAG implementation is solid and the documentation is excellent."
              </p>
              <div className="flex items-center">
                <div>
                  <p className="font-medium">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">CTO, TechStart</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="mb-4">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-muted-foreground mb-4">
                "The boilerplate saved us weeks of development time. The Stripe integration was seamless, and we were able to start monetizing immediately."
              </p>
              <div className="flex items-center">
                <div>
                  <p className="font-medium">Mark Thompson</p>
                  <p className="text-sm text-muted-foreground">Founder, AIConsult</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="mb-4">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-muted-foreground mb-4">
                "Best investment we've made this quarter. The customization options are extensive, and the support has been outstanding."
              </p>
              <div className="flex items-center">
                <div>
                  <p className="font-medium">Lisa Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Product Lead, DataFlow</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full [&>div>h3>button]:text-xl [&>div>h3>button]:md:text-2xl [&>div>h3>button]:text-left [&>div>div>div]:text-lg [&>div>div>div]:md:text-xl">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is RAG (Retrieval Augmented Generation)?</AccordionTrigger>
              <AccordionContent>
                RAG is a technique that enhances AI language models by combining them with a knowledge base of relevant information, allowing for more accurate and contextual responses. Think of it like adding memory to your AI. A chatbot that has memory can do so much more for you and your clients!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How many chatbots can I build with ChatRAG?</AccordionTrigger>
              <AccordionContent>
                As many as you want! Whether you have 1 client or 1,000 clients, you can build them all with ChatRAG. There are absolutely no limits on the number of chatbots you can create and deploy!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do I need technical experience?</AccordionTrigger>
              <AccordionContent>
                Not much! As long as you have basic tech skills and can copy and paste API keys, you can deploy the standard chatbot right away. If you can vibe-code with Cursor, you'll be able to customize your chatbots further and add new features. If you know some TypeScript, you could probably use ChatRAG as the basis to build the next Lovable or Bolt.new company that makes millions of dollars in ARR!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What's included in the boilerplate?</AccordionTrigger>
              <AccordionContent>
                You get a complete Next.js project with AI integration, authentication, payment processing, and database setup. Everything you need to launch your AI chatbot.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I customize the chatbot's appearance?</AccordionTrigger>
              <AccordionContent>
                Absolutely! You can easily use the developer dashboard to upload your logo or your client's logos, and change the color of the chat widget. With a bit of knowledge on how to use Cursor, you can customize it to your heart's content - you can customize it as much as you want!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>So there are no subscriptions, does that mean I own the chatbots I create?</AccordionTrigger>
              <AccordionContent>
                Yes, you completely own the AI chatbots you create with your own data, and you can freely monetize them as you want. That's why there is a Stripe and Polar payments integration, for you to charge access to your chatbots!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>How often is ChatRAG updated?</AccordionTrigger>
              <AccordionContent>
                I use ChatRAG for my own clients, so that means I'm completely obsessed with the latest AI technology, and I'm constantly updating it to offer new features to my own clients!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>What do you plan to add in the future to ChatRAG?</AccordionTrigger>
              <AccordionContent>
                Exciting features are on the roadmap! <strong>Realtime voice conversations</strong> will let users talk directly to your knowledge base instead of typing—imagine having natural voice conversations with your AI assistant. <strong>Memory capabilities</strong> will be a game-changer alongside RAG, allowing the chatbot to remember user preferences and context over time for increasingly personalized answers with each interaction. The chatbot will learn and adapt to each user's needs automatically. <strong>Browser automation integration</strong> is also coming—imagine your chatbot not just answering questions, but actually controlling a browser to complete tasks for you. An AI agent with RAG knowledge and memory is exponentially more powerful and useful than one starting from zero every time. This is exactly why getting <strong>ChatRAG Complete</strong> is such a smart investment—you'll get lifetime access to all these powerful features as they roll out, without paying extra!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>What's the best reason for getting ChatRAG?</AccordionTrigger>
              <AccordionContent>
                I built ChatRAG because I needed it. When clients started asking me for AI chatbot solutions, I searched everywhere for a boilerplate that had all the features I needed—and found nothing. So I created it myself. I'm ChatRAG's first user, deploying it for real clients every day. This isn't just a product I'm selling; it's the tool I depend on for my own business. When you get ChatRAG, you're getting battle-tested software that's proven in the real world. Here's the real advantage: <strong>you focus on getting clients</strong>—finding people and companies with valuable knowledge bases that can be monetized—while <strong>we handle all the technical complexity</strong> of improving the RAG pipeline, keeping up with the latest AI advancements, and maintaining the infrastructure. Your time is spent on what actually makes you money: sales and client relationships, not debugging vector embeddings.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t py-12 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left side - Branding */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Logo />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Ship AI chatbots in hours, not months
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Made with <span className="animated-gradient-heart">❤️</span> by <a href="https://x.com/carlosmarcialt" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors duration-200">Carlos Marcial</a>
                </p>
                <p className="text-sm text-muted-foreground">
                  © 2025 ChatRAG. All rights reserved.
                </p>
              </div>

              {/* Right side - Links */}
              <div className="grid grid-cols-2 gap-8 md:justify-end">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Product</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <LicenseModal />
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="https://docs.chatrag.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                        Documentation
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Widget - Now using production widget from chatrag-demo.vercel.app via layout.tsx */}

      {/* Curved "Try me!" text overlay for production widget */}
      <ChatWidgetCurvedTextOverlay />
        </div>
      </div>
    </>
  );
}
