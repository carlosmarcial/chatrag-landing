"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Script from "next/script";
import { DollarSign, Users, TrendingUp, Award, Gift, Zap } from "lucide-react";

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-orange-950/10">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between h-16">
            <div className="-ml-6">
              <Logo />
            </div>
            <Button
              variant="outline"
              className="border-orange-500/20 hover:bg-orange-500/10 hover:text-orange-400 transition-colors"
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
            <div className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-full">
              <span className="text-sm font-semibold text-orange-400">Earn 30% Commission</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent leading-tight pb-2">
            Join ChatRAG's Affiliate Program
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Earn recurring commissions by recommending the best AI chatbot boilerplate to your audience
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">30% Commission</h3>
            <p className="text-muted-foreground">
              Earn generous commissions on every ChatRAG license sale through your referral link
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">45-Day Cookie Tracking</h3>
            <p className="text-muted-foreground">
              First-touch attribution - earn credit for purchases within 45 days of the initial referral click
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">Easy Integration</h3>
            <p className="text-muted-foreground">
              Simple setup with unique referral links and a dedicated affiliate dashboard
            </p>
          </div>
        </div>
      </section>

      {/* Affiliate Dashboard Widget */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Your Affiliate Dashboard
              </h2>
              <p className="text-muted-foreground text-lg">
                Sign up below to get your unique referral link and start earning
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
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            How It Works
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Sign Up</h3>
                <p className="text-muted-foreground">
                  Create your affiliate account and get your unique referral link instantly
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Share Your Link</h3>
                <p className="text-muted-foreground">
                  Promote ChatRAG to your audience through blog posts, videos, social media, or newsletters
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Earn Commissions</h3>
                <p className="text-muted-foreground">
                  Receive 30% commission on every sale. Track your earnings in real-time through your dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of affiliates earning passive income with ChatRAG
          </p>
          <Button
            size="lg"
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
            onClick={() => {
              document.getElementById('refgrow')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ChatRAG. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
