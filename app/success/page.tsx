"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import confetti from "canvas-confetti";

function SuccessContent() {
  const params = useSearchParams();
  const checkoutId = params.get("checkout_id");

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Fire from the left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FE6416', '#FF8C42', '#FFA726', '#FFB74D', '#FFCC80']
      });
      
      // Fire from the right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FE6416', '#FF8C42', '#FFA726', '#FFB74D', '#FFCC80']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-orange-950/10">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated success icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50 animate-pulse">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent leading-tight">
            Thank you for your purchase! 🎉
          </h1>
          <p className="text-xl text-muted-foreground/90">
            Your checkout was completed successfully
          </p>
        </div>

        {/* Reference ID */}
        {checkoutId && (
          <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground mb-1">Reference ID</p>
            <p className="font-mono text-sm text-orange-400 break-all">{checkoutId}</p>
          </div>
        )}

        {/* Info cards */}
        <div className="grid gap-4 mt-8">
          <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/10 rounded-xl p-6 backdrop-blur-sm text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📧</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Check Your Email</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You'll receive an email with your Discord invite, GitHub repository access, and download links within the next few minutes.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border border-orange-500/10 rounded-xl p-6 backdrop-blur-sm text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Get Started</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join the Discord community, access your repository, and start building your AI chatbots today!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-6">
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
            asChild
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center">Loading…</div>}>
      <SuccessContent />
    </Suspense>
  );
}
