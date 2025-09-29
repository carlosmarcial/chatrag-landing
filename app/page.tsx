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
import { ChatWidgetDemo } from "@/components/demos/chat-widget-demo";
import { Space_Grotesk } from 'next/font/google';
import { useState, useRef, useEffect } from 'react';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

// Dynamic logo data extracted from filenames
const techProviders = [
  { filename: 'openai', displayName: 'OpenAI', description: 'Artificial intelligence research' },
  { filename: 'stripe', displayName: 'Stripe', description: 'Online payment processing' },
  { filename: 'nextjs', displayName: 'Next.js', description: 'React framework for production' },
  { filename: 'supabase', displayName: 'Supabase', description: 'Open source Firebase alternative' },
  { filename: 'mcp', displayName: 'MCP', description: 'Model Context Protocol' },
  { filename: 'typescript', displayName: 'TypeScript', description: 'Typed JavaScript' },
  { filename: 'polar', displayName: 'Polar', description: 'Developer monetization platform' },
  { filename: 'falai', displayName: 'fal.ai', description: 'AI media generation platform' },
  { filename: 'llamacloud', displayName: 'LlamaCloud', description: 'Document parsing and processing' },
  { filename: 'tailwind', displayName: 'Tailwind CSS', description: 'Utility-first CSS framework' },
  { filename: 'replicate', displayName: 'Replicate', description: 'Machine learning model hosting' },
  { filename: 'openrouter', displayName: 'OpenRouter', description: 'AI model router and gateway' },
  { filename: 'resend-icon-white', displayName: 'Resend', description: 'Email API for developers' },
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
          let setWidth = 0;
          
          // Sum up the width of half the logos plus gaps
          for (let i = 0; i < halfCount; i++) {
            const logo = logoContainers[i] as HTMLElement;
            setWidth += logo.getBoundingClientRect().width;
            // Add gap width (except after the last logo)
            if (i < halfCount - 1) {
              const gap = window.innerWidth < 768 ? 48 : 80; // gap-12 = 48px, gap-20 = 80px
              setWidth += gap;
            }
          }
          
          // Normalize speed to 60fps (16.67ms per frame)
          const speed = baseSpeed * (deltaTime / 16.67);
          
          positionRef.current -= speed;
          
          // Reset when exactly one set width has scrolled
          if (Math.abs(positionRef.current) >= setWidth) {
            positionRef.current = positionRef.current + setWidth;
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
                <a href="#demo">Dashboards</a>
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
                <a href="#demo">Dashboards</a>
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

      {/* Hero Section */}
      <section id="hero-section" className="container mx-auto px-4 pt-6 pb-8 md:pt-8 md:pb-16 lg:pt-10 xl:pt-12 lg:pb-20 bg-background">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-relaxed md:leading-loose lg:leading-loose xl:leading-[1.4] mb-6 md:mb-8`}>
            Ship AI chatbots in <span className="slanted-gradient-box">hours</span>, not months
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 md:mb-12 max-w-3xl mx-auto">
            The complete Next.js & AI SDK boilerplate for turning data into profit with <strong>Retrieval Augmented Generation (RAG)</strong>. Build and monetize custom chatbot SaaS products for yourself or your clients.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="px-8 py-6 text-lg font-semibold group hero-button-width" variant="outline">
              <div className="group-hover:-rotate-12 transition-transform duration-200">
                <SmallLogo />
              </div>
              <span className="ml-2">Get ChatRAG</span>
            </Button>
            <Button size="lg" className="px-8 py-6 text-lg font-semibold group hero-button-width" variant="outline">
              <div className="group-hover:-rotate-12 transition-transform duration-200">
                <span className="text-xl">👀</span>
              </div>
              <span className="ml-2">View Demo</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-16 -mt-2">
            <Gift className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', color: '#FE6416' }} />
            <span>$100 off for the first 5,000 customers</span>
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
      <section className="container mx-auto px-4 -mt-16 pb-12 md:-mt-20 md:pb-16 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/h-C6NVz1fIY"
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
      <section className="py-12 md:py-16 pb-20 md:pb-24">
        {/* Animated Logo Stripe */}
        <div className="relative w-full overflow-hidden py-8">
          <div ref={carouselRef} className="flex gap-12 md:gap-20 pb-16">
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
                  className="w-24 h-12 md:w-32 md:h-16 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-black text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg" style={{zIndex: 50, minWidth: '120px', maxWidth: '200px', marginTop: '8px'}}>
                  <div className="font-semibold text-sm mb-1">{provider.displayName}</div>
                  <div className="text-xs text-gray-300 leading-tight">{provider.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turn Your Data Into Revenue Section */}
      <section id="monetize-data" className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">ChatRAG is your <span className="animate-pulse-glow-light">AI business in a box</span></h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-4xl mx-auto">
            Do you know businesses drowning in repetitive customer questions? Companies with massive knowledge bases gathering digital dust? Educators who want to scale their teaching to reach thousands more students? Organizations spending thousands on support teams for the same FAQs? Your business—and every business you know—already has valuable data sitting unused: training materials, product documentation, policies, knowledge bases, and course content. ChatRAG transforms this existing content into intelligent chatbots that reduce support costs, improve customer experience, and create new revenue streams. Stop letting your data collect dust and start making it work for you.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Educational Knowledge Scaling</h3>
              <p className="text-muted-foreground">
                Transform your courses, lesson plans, and educational materials into intelligent tutoring bots. Serve thousands of students simultaneously while providing personalized learning support 24/7.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Employee Training Chatbots</h3>
              <p className="text-muted-foreground">
                Transform your training materials and employee handbooks into interactive chatbots. Onboard new hires faster and provide instant policy answers.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Product Knowledge Bots</h3>
              <p className="text-muted-foreground">
                Convert product specs, manuals, and documentation into smart assistants that help customers and sales teams find exactly what they need.
              </p>
            </Card>
          </div>

          <Button size="lg" className="px-14 py-6 text-lg font-semibold bg-black text-white hover:bg-black hover:scale-105 hover:shadow-lg transform transition-all duration-200 group chatrag-gradient-border" variant="default">
            <div className="group-hover:-rotate-12 transition-transform duration-200">
              <SmallLogo />
            </div>
            <span className="ml-2">Start Monetizing Your Data</span>
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="pt-8 pb-12 md:pt-12 md:pb-24 bg-background" ref={benefitsSectionRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Turn your AI chatbot idea into revenue in record time</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Build and deploy chatbots using your proprietary data on Supabase's open-source vector database (or self-host). Own your infrastructure, control costs—no subscriptions, just pay-per-use with OpenAI and OpenRouter. Test risk-free with generous free tiers from Vercel, Supabase, and LlamaCloud.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* All-in-One RAG System */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Database className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy RAG</h3>
              <p className="text-muted-foreground">
                Complete RAG implementation with LlamaCloud, OpenAI embeddings, and Supabase Vector Database. Everything integrated and ready to use.
              </p>
            </Card>

            {/* Easy Documents */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Documents</h3>
              <p className="text-muted-foreground">
                Upload DOC, PDF, HTML, XLS, PPT files through the document dashboard. Automatic parsing, embedding, and vector storage happens instantly.
              </p>
            </Card>

            {/* Easy Monetization */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Monetization</h3>
              <p className="text-muted-foreground">
                Setup Stripe and Polar payments quickly. Start charging for your AI chatbot services with just a few clicks.
              </p>
            </Card>

            {/* No Subscriptions */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">No Subscriptions Ever</h3>
              <p className="text-muted-foreground">
                Pay only for what you use through OpenRouter and OpenAI. Generous free tiers from Vercel, Supabase, and LlamaCloud.
              </p>
            </Card>

            {/* Vercel AI SDK */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Choose Any LLM</h3>
              <p className="text-muted-foreground">
                Switch between GPT-4, Claude, Llama, Gemini, and 200+ models instantly. Vercel AI SDK and OpenRouter give you complete freedom to pick the best model for each use case.
              </p>
            </Card>

            {/* MCP Tools */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Workflow className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">MCP Tools Integration</h3>
              <p className="text-muted-foreground">
                Connect any remote MCP server to extend your chatbot's capabilities. Includes Zapier MCP and n8n MCP out of the box. Create custom automations for you or your clients that trigger through chat commands.
              </p>
            </Card>

            {/* Config Dashboard */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Settings className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Developer Dashboard</h3>
              <p className="text-muted-foreground">
                Configure your chatbot with visual controls, manage API keys securely, and customize behavior through an intuitive interface. Full control, zero coding required.
              </p>
            </Card>

            {/* Beyond RAG */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Video className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Beyond RAG</h3>
              <p className="text-muted-foreground">
                Image, video, and 3D mesh generation integrated. Bring your FAL.AI, OpenAI, or Replicate API keys for AI media generation.
              </p>
            </Card>

            {/* Cursor Rules Ready */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cursor Rules Ready</h3>
              <p className="text-muted-foreground">
                Complete with Cursor rules and project context files. Guide your AI assistant with persistent instructions, domain-specific knowledge, and automated workflows for faster development.
              </p>
            </Card>


            {/* Artifact Sidebar */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Artifact Sidebar</h3>
              <p className="text-muted-foreground">
                Run and visualize code directly in ChatRAG. Write, execute, and debug code snippets with an integrated sidebar that brings your ideas to life instantly.
              </p>
            </Card>

            {/* Search & Sources */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Search & Sources</h3>
              <p className="text-muted-foreground">
                Perform web searches and see all sources in a dedicated sidebar. Your users get transparent, verifiable answers with clear source attribution for every response.
              </p>
            </Card>

            {/* Chat Customization */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Type className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Chat Customization</h3>
              <p className="text-muted-foreground">
                Choose from multiple font families and adjust text sizes for optimal readability. Personalized typography ensures comfortable reading for every user's visual preferences.
              </p>
            </Card>

            {/* Shareable Links */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Share className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Shareable Links</h3>
              <p className="text-muted-foreground">
                Share AI conversations instantly with colleagues via secure, shareable links. Perfect for real-time collaboration and feedback.
              </p>
            </Card>

            {/* PDF Download */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileDown className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">PDF Export</h3>
              <p className="text-muted-foreground">
                Download complete chat conversations as professional PDF reports. Ideal for documentation, client presentations, and record-keeping.
              </p>
            </Card>

            {/* Recent Chats */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <History className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Recent Chats</h3>
              <p className="text-muted-foreground">
                All conversations are automatically saved and searchable. Quickly find past discussions and continue where you left off with full chat history.
              </p>
            </Card>

            {/* Multi-Language Support */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Languages className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-Language</h3>
              <p className="text-muted-foreground">
                Includes English, Spanish, Portuguese, and Lithuanian out of the box. AI-powered language system lets you easily create new language files for global reach.
              </p>
            </Card>

            {/* Text-to-Speech Integration */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mic className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Voice Integration</h3>
              <p className="text-muted-foreground">
                Dictate messages instead of typing and let OpenAI's TTS read responses aloud. Full accessibility support for visually impaired users.
              </p>
            </Card>

            {/* Mobile Ready */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile Ready</h3>
              <p className="text-muted-foreground">
                Responsive design ensures your chatbots work flawlessly on all mobile devices. Your users get the same great experience anywhere.
              </p>
            </Card>

            {/* Perfect for Developers */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Perfect for Developers</h3>
              <p className="text-muted-foreground">
                ChatRAG is your foundation for building the next generation of AI SaaS products. Use our codebase to create unique chatbot solutions the world hasn't seen yet—your competitive advantage starts here.
              </p>
            </Card>

            {/* Perfect for AI Agencies */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Perfect for AI Agencies</h3>
              <p className="text-muted-foreground">
                White-label and deploy chatbots for multiple clients with complete ownership. Charge premium rates while keeping costs predictable—no licensing fees, just pure profit margins.
              </p>
            </Card>

            {/* Perfect for Power Users */}
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border">
              <div className="w-16 h-16 mx-auto mb-6 gradient-icon-border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-8 h-8 gradient-icon" />
              </div>
              <h3 className="text-xl font-bold mb-3">Perfect for Power Users</h3>
              <p className="text-muted-foreground">
                Build your personal AI assistant exactly how you want it. Full customization freedom while controlling your own credit consumption.
              </p>
            </Card>
          </div>
        </div>
      </section>


      {/* Dashboards Section */}
      <section id="demo" className="pt-24 pb-12 md:pt-32 md:pb-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">The <span className="animate-pulse-glow-light">true power</span> of ChatRAG lies in its user-friendly dashboards</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-4xl mx-auto">
            Thanks to these intuitive dashboards, ChatRAG could easily be named <strong className="text-gray-700">EasyRAG</strong>. Build, deploy, and manage your custom chatbots without writing a single line of code. The developer dashboard handles all configurations while the document dashboard makes RAG management effortless.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Developer Dashboard */}
            <Card className="group overflow-hidden rounded-xl shadow-lg border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/images/chatrag_developer_dashboard.png"
                  alt="Developer Dashboard - Complete configuration control without coding"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">Developer Dashboard</h3>
                <span className="text-muted-foreground text-lg">Complete configuration control without coding. If you can copy and paste API keys into an intuitive dashboard, you can deploy your own chatbots. For instance, modify the System Prompt directly to completely transform your AI's personality—from a professional assistant to a witty conversationalist—and fine-tune exactly how it responds to your data without ever touching the codebase.</span>
              </div>
            </Card>
            
            {/* Document Dashboard */}
            <Card className="group overflow-hidden rounded-xl shadow-lg border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/images/chatrag_document_dashboard01.png"
                  alt="Document Dashboard - Effortless RAG system management"
                  fill
                  className="object-cover scale-110 group-hover:scale-[1.155] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">Document Dashboard</h3>
                <span className="text-muted-foreground text-lg">Effortless RAG system management. Simply drop your documents and ChatRAG handles all the processing automatically in the background. Once you've configured your LlamaCloud, OpenAI, and Supabase API keys, you never have to think about document parsing, intelligent chunking, embeddings generation, or vector database storage—it all happens seamlessly behind the scenes.</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Don't get left behind in the AI revolution! 🤖</h2>
          <div className="pricing-section-grid">
            <Card className="p-6 pricing-card-smooth border">
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">ChatRAG Starter</h3>
                <div className="flex items-baseline mb-6">
                  <div className="flex items-center">
                    <span className="text-muted-foreground line-through mr-2">$299</span>
                    <span className="text-4xl font-bold">$199</span>
                  </div>
                  <span className="text-muted-foreground ml-2">USD</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Next.js full-stack framework
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Vercel AI SDK
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Stripe / Polar Payments
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    LlamaCloud for document parsing
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    OpenAI Embeddings
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    OpenRouter LLMs
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Supabase Vector DB
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Supabase Auth
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    MCP Tools (Zapier & N8N out of the box)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Resend emails
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Tailwind CSS & shadcn/ui components
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Cursor rules for AI-assisted development
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2">✗</span>
                    Discord community
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2">✗</span>
                    1-year updates
                  </li>
                </ul>
                <Button className="w-full bg-black text-white hover:bg-black hover:scale-[1.03] hover:shadow-lg transform transition-all duration-150 group" size="lg">
                  <div className="group-hover:-rotate-12 transition-transform duration-150">
                    <SmallLogo />
                  </div>
                  <span className="ml-2">Get ChatRAG</span>
                </Button>
                <p className="text-center text-sm text-foreground font-medium mt-3">
                  Pay once. Build unlimited chatbots!
                </p>
              </div>
            </Card>

            <Card className="p-6 relative overflow-hidden gradient-card-border border">
              <div className="absolute top-4 right-4 bg-[#FE6416] text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">ChatRAG Complete</h3>
                <div className="flex items-baseline mb-6">
                  <div className="flex items-center">
                    <span className="text-muted-foreground line-through mr-2">$369</span>
                    <span className="text-4xl font-bold">$269</span>
                  </div>
                  <span className="text-muted-foreground ml-2">USD</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Next.js full-stack framework
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Vercel AI SDK
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Stripe / Polar Payments
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    LlamaCloud for document parsing
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    OpenAI Embeddings
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    OpenRouter LLMs
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Supabase Vector DB
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Supabase Auth
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    MCP Tools (Zapier & N8N out of the box)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Resend emails
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Tailwind CSS & shadcn/ui components
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Cursor rules for AI-assisted development
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Discord community
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    1-year updates
                    <div className="inline-flex items-center bg-[#FE6416] text-white px-2.5 py-1 rounded-full text-xs font-medium ml-3">
                      Updated 2 days ago
                    </div>
                  </li>
                </ul>
                <Button className="w-full bg-black text-white hover:bg-black hover:scale-[1.03] hover:shadow-lg transform transition-all duration-150 group" size="lg" variant="default">
                  <div className="group-hover:-rotate-12 transition-transform duration-150">
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
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full [&>div>h3>button]:text-lg [&>div>div>div]:text-base">
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
              <AccordionTrigger>What's the best reason for getting ChatRAG?</AccordionTrigger>
              <AccordionContent>
                I built ChatRAG because I needed it. When clients started asking me for AI chatbot solutions, I searched everywhere for a boilerplate that had all the features I needed—and found nothing. So I created it myself. I'm ChatRAG's first user, deploying it for real clients every day. This isn't just a product I'm selling; it's the tool I depend on for my own business. When you get ChatRAG, you're getting battle-tested software that's proven in the real world.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t py-12 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Logo />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Ship AI chatbots in hours, not months
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Made with <span className="animated-gradient-heart">❤️</span> by <a href="https://x.com/carlosmarcialt" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors duration-200">Carlos Marcial</a>
              </p>
              <p className="text-sm text-muted-foreground">
                © 2025 ChatRAG. All rights reserved.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">Features</Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">Pricing</Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">Documentation</Button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">About</Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">Blog</Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">Contact</Button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">Privacy Policy</Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">Terms of Service</Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* True Floating Chat Widget - Live Demo */}
      <ChatWidgetDemo 
        position="bottom-right"
        primaryColor="#FF6417"
        title="ChatRAG Assistant"
        showDemoBadge={true}
        isVisible={true}
        animationState="visible"
      />
        </div>
      </div>
    </>
  );
}