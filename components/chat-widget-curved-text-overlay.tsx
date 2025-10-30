'use client';

import React, { useEffect, useState } from 'react';
import { CurvedText } from '@/components/curved-text';

/**
 * Overlay component that adds curved "Try me!" text around the production chat widget button
 * This component detects when the chat widget is open/closed and shows/hides the text accordingly
 */
export function ChatWidgetCurvedTextOverlay() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  useEffect(() => {
    // Function to check if the widget is open by looking for the chat window element
    const checkWidgetState = () => {
      // The production widget creates a container with specific characteristics when open
      // We'll look for the chat window container
      const chatWindow = document.querySelector('[class*="chat"][class*="window"], [class*="widget"][class*="open"], iframe[src*="chatrag"]');
      const chatButton = document.querySelector('button[id*="chatrag"], button[aria-label*="chat"]');

      // If we find a chat window or an open indicator, the widget is open
      if (chatWindow) {
        setIsWidgetOpen(true);
      } else {
        setIsWidgetOpen(false);
      }
    };

    // Check initial state
    const initialCheckTimer = setTimeout(checkWidgetState, 1000);

    // Set up a MutationObserver to watch for DOM changes
    const observer = new MutationObserver(() => {
      checkWidgetState();
    });

    // Observe the entire document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'aria-expanded']
    });

    // Also check periodically as a fallback
    const interval = setInterval(checkWidgetState, 500);

    return () => {
      clearTimeout(initialCheckTimer);
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Don't render if widget is open
  if (isWidgetOpen) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed z-[999998]"
      style={{
        bottom: '24px',
        right: '50px',
      }}
    >
      <CurvedText
        text="Try me!"
        radius={70}
        color="#FF6417"
        fontSize={28}
        animate={true}
      />
    </div>
  );
}
