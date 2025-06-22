import { useEffect, useState, RefObject, useRef } from 'react';

export function useScrollTrigger(
  chatSectionRef: RefObject<Element | null>,  // For the symmetric widget zone logic
  benefitsSectionRef: RefObject<Element | null>  // Still needed for the ref
) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationState, setAnimationState] = useState<'hidden' | 'appearing' | 'visible' | 'disappearing'>('hidden');
  
  // Refs to track timeouts and state
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isShowingRef = useRef(false);

  useEffect(() => {
    if (!chatSectionRef.current) return;

    // Clear any existing timeout to prevent conflicts
    const clearExistingTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    // Single observer that defines the complete "widget zone"
    // Zone: 2000px before Chat section (early show) to 400px after Chat section (original hide)
    const symmetricZoneObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        if (entry.isIntersecting && !isShowingRef.current) {
          // Entering the widget zone → Show widget (works from any direction)
          clearExistingTimeout();
          isShowingRef.current = true;
          setAnimationState('appearing');
          
          timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            setAnimationState('visible');
            timeoutRef.current = null;
          }, 100);
          
        } else if (!entry.isIntersecting && isShowingRef.current) {
          // Leaving the widget zone → Hide widget (works from any direction)
          clearExistingTimeout();
          isShowingRef.current = false;
          setAnimationState('disappearing');
          
          timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            setAnimationState('hidden');
            timeoutRef.current = null;
          }, 300);
        }
      },
      {
        root: null,
        // Perfect zone: Early show (2000px before) + Disappear at end of Demo section
        rootMargin: '25px 0px 0px 0px',
        threshold: 0
      }
    );

    // Start observing the chat section
    symmetricZoneObserver.observe(chatSectionRef.current);
    
    return () => {
      symmetricZoneObserver.disconnect();
      // Cleanup timeout on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [chatSectionRef, benefitsSectionRef]);

  return { isVisible, animationState };
} 