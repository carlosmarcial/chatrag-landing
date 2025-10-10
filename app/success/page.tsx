"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const checkoutId = params.get("checkout_id");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-3xl font-bold">Thank you for your purchase!</h1>
        <p className="text-muted-foreground">
          Your checkout was completed successfully.
          {checkoutId ? (
            <>
              {" "}
              Reference ID: <span className="font-mono">{checkoutId}</span>
            </>
          ) : null}
        </p>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Check your email for Discord invite, GitHub repository access, and download links.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/">Back to home</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://polar.sh/purchases" target="_blank" rel="noopener noreferrer">
                Manage Subscription
              </a>
            </Button>
          </div>
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
