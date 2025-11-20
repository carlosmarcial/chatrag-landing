"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Script from "next/script";
import { DollarSign, Users, TrendingUp, Award, Gift, Zap, Check } from "lucide-react";
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between h-16">
            <div className="-ml-6">
              <Logo />
            </div>
            <Button
              variant="outline"
              className="border-2 border-[#4080FF] text-[#4080FF] hover:text-white hover:bg-[#4080FF] transition-colors"
              asChild
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-[#FF6417]/10 border border-[#FF6417]/20 rounded-full">
              <span className="text-sm font-semibold text-[#FF6417]">Earn 30% Commission</span>
            </div>
          </div>

          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-black leading-tight pb-2`}>
            Join ChatRAG's <span className="text-[#FF6417]">Affiliate Program</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Earn commissions on every sale by recommending the best AI chatbot boilerplate to your audience.
          </p>
          
          <div className="pt-4">
            <Button
              size="lg"
              className="px-8 py-6 text-base md:text-lg font-semibold group bg-[#FF6417] text-black hover:bg-[#ff7a3a] focus-visible:ring-[#FF6417]/40 shadow-[0_10px_30px_-10px_rgba(255,100,23,0.6)] hover:shadow-[0_16px_40px_-12px_rgba(255,100,23,0.75)] transform-gpu gpu-smooth transition-[box-shadow,transform,background-color,color,border-color] duration-200"
              onClick={() => {
                document.getElementById('refgrow')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Earning Now
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 border bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20 rounded-xl hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-[#FF6417] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-3 text-foreground`}>30% Commission</h3>
            <p className="text-muted-foreground text-lg">
              Earn generous commissions on every ChatRAG license sale through your referral link.
            </p>
          </div>

          <div className="p-8 border bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20 rounded-xl hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-[#FF6417] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-3 text-foreground`}>45-Day Cookie</h3>
            <p className="text-muted-foreground text-lg">
              First-touch attribution - earn credit for purchases within 45 days of the initial referral click.
            </p>
          </div>

          <div className="p-8 border bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20 rounded-xl hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-[#FF6417] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-3 text-foreground`}>Easy Integration</h3>
            <p className="text-muted-foreground text-lg">
              Simple setup with unique referral links and a dedicated affiliate dashboard to track your success.
            </p>
          </div>
        </div>
      </section>

      {/* Affiliate Dashboard Widget */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-background border border-border/40 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF6417] via-[#FFB001] to-[#4080FF]"></div>
            <div className="text-center mb-10">
              <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-bold mb-4 text-foreground`}>
                Your Affiliate Dashboard
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Sign up below to get your unique referral link and start earning immediately.
              </p>
            </div>

            {/* Refgrow Widget */}
            <div
              id="refgrow"
              data-project-id="490"
              data-lang="en"
              className="min-h-[400px]"
            />
            <Script
              src="https://scripts.refgrowcdn.com/page.js"
              strategy="afterInteractive"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-bold text-center mb-16 text-foreground`}>
            How It Works
          </h2>

          <div className="space-y-12">
            <div className="flex gap-6 items-start group">
              <div className="w-12 h-12 bg-[#FF6417] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Sign Up</h3>
                <p className="text-muted-foreground text-lg">
                  Create your affiliate account in seconds. No approval process required - get your unique referral link instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="w-12 h-12 bg-[#FF6417] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Share Your Link</h3>
                <p className="text-muted-foreground text-lg">
                  Promote ChatRAG to your audience through blog posts, videos, social media, newsletters, or direct recommendations.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="w-12 h-12 bg-[#FF6417] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Earn Commissions</h3>
                <p className="text-muted-foreground text-lg">
                  Receive 30% commission on every sale. Track your clicks, conversions, and earnings in real-time through your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 mb-16">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20 border border-orange-200 dark:border-orange-900/50 rounded-3xl p-12 md:p-16 shadow-2xl">
          <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-bold mb-6 text-foreground`}>
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join hundreds of affiliates earning passive income with ChatRAG. It's free to join and takes less than a minute.
          </p>
          <Button
            size="lg"
            className="px-10 py-8 text-lg font-semibold group bg-[#FF6417] text-black hover:bg-[#ff7a3a] focus-visible:ring-[#FF6417]/40 shadow-[0_10px_30px_-10px_rgba(255,100,23,0.6)] hover:shadow-[0_16px_40px_-12px_rgba(255,100,23,0.75)] transform-gpu gpu-smooth transition-[box-shadow,transform,background-color,color,border-color] duration-200"
            onClick={() => {
              document.getElementById('refgrow')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-muted/10">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ChatRAG. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
