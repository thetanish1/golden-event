import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Animated count-up number. Counts from 0 to `target` when `start` is true.
 */
export default function StatsCounter({ value, label, suffix = '' }) {
  const [ref, inView] = useScrollReveal({ threshold: 0.3 });
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  // Parse numeric target from value string (e.g. "500+", "10+", "100%")
  const numeric = parseInt(value.replace(/\D/g, ''), 10);
  const symbol  = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!inView) return;

    const duration   = 1800; // ms
    const startTime  = performance.now();

    const step = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [inView, numeric]);

  return (
    <div
      ref={ref}
      className="text-center group"
    >
      <div
        className="inline-flex flex-col items-center px-8 py-6 rounded-2xl transition-all duration-300 group-hover:shadow-gold-md"
        style={{
          background: 'rgba(212,175,55,0.06)',
          border: '1px solid rgba(212,175,55,0.2)',
        }}
      >
        <span className="stat-number font-display font-bold text-gold-gradient text-4xl lg:text-5xl leading-none">
          {count}{symbol}
        </span>
        <span className="font-body text-charcoal-400 text-sm mt-2 tracking-wide">
          {label}
        </span>
      </div>
    </div>
  );
}
