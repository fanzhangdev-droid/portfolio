'use client';

import { useEffect, useRef, useState, useLayoutEffect } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms for stagger effect */
  delayMs?: number;
  /** Duration in ms */
  durationMs?: number;
  /** Y offset in px (max 12px recommended) */
  y?: number;
  /** Only enable on mobile (< 768px). Desktop shows content immediately */
  mobileOnly?: boolean;
}

/**
 * Progressive enhancement scroll reveal:
 * - SSR & initial hydration: Always visible (no hydration mismatch)
 * - After mount on mobile: Elements below viewport animate in when scrolled to
 * - Desktop (>=768px): Always visible, no animation
 * - Respects prefers-reduced-motion
 */
export default function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
  durationMs = 380,
  y = 8,
  mobileOnly = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Start with null to indicate "not yet determined" - renders as visible
  const [revealState, setRevealState] = useState<'visible' | 'hidden' | 'revealing' | null>(null);

  // Use useLayoutEffect to avoid flash (runs before paint)
  // Falls back to useEffect on server (no-op)
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check conditions
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Desktop or reduced-motion: stay visible, no animation
    if (prefersReducedMotion || (mobileOnly && !isMobile)) {
      setRevealState('visible');
      return;
    }

    // Mobile: check if element is in or above viewport
    const rect = el.getBoundingClientRect();
    const isInOrAboveViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInOrAboveViewport) {
      // Already visible to user, don't animate
      setRevealState('visible');
      return;
    }

    // Element is below viewport - set up reveal animation
    setRevealState('hidden');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealState('revealing');
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mobileOnly]);

  // Determine styles based on state
  // null (SSR/initial) and 'visible' = no special styles (fully visible)
  // 'hidden' = opacity 0, translated
  // 'revealing' = transitioning to visible
  const getStyle = (): React.CSSProperties => {
    if (revealState === null || revealState === 'visible') {
      // No inline styles - fully visible, no animation
      return {};
    }

    if (revealState === 'hidden') {
      return {
        opacity: 0,
        transform: `translateY(${y}px)`,
      };
    }

    // 'revealing' - animate to visible
    return {
      opacity: 1,
      transform: 'translateY(0)',
      transitionProperty: 'opacity, transform',
      transitionDuration: `${durationMs}ms`,
      transitionTimingFunction: 'ease-out',
      transitionDelay: `${delayMs}ms`,
    };
  };

  return (
    <div ref={ref} className={className} style={getStyle()}>
      {children}
    </div>
  );
}
