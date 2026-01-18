'use client';

import { useEffect, useRef, useState } from 'react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;     // 例如 0 / 120 / 220
  durationMs?: number;  // 例如 600 / 800 / 1000
  y?: number;           // 位移像素，默认 12
};

export default function Reveal({
  children,
  className = '',
  delayMs = 0,
  durationMs = 700,
  y = 12,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      {
        // 让触发点更“明显”：进入到屏幕中部附近再触发
        threshold: 0.35,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        'will-change-transform will-change-opacity',
        shown ? 'opacity-100 translate-y-0' : `opacity-0 translate-y-[${y}px]`,
        className,
      ].join(' ')}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', // 比 ease-out 更“顺”
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
