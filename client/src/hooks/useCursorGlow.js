import { useEffect, useRef, useCallback } from 'react';

/**
 * Cursor glow hook — lerp-eased gold orb following the mouse.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 * Returns a ref to attach to the glow div.
 */
export function useCursorGlow() {
  const glowRef = useRef(null);
  const pos     = useRef({ x: -200, y: -200 });
  const target  = useRef({ x: -200, y: -200 });
  const rafId   = useRef(null);
  const isHover = useRef(false);

  // Linear interpolation
  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = useCallback(() => {
    pos.current.x = lerp(pos.current.x, target.current.x, 0.08);
    pos.current.y = lerp(pos.current.y, target.current.y, 0.08);

    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
    }
    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Disable on touch devices
    const isTouch = window.matchMedia('(hover: none)').matches;
    // Disable on reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReduced) return;

    const handleMouseMove = (e) => {
      target.current.x = e.clientX - (isHover.current ? 75 : 50);
      target.current.y = e.clientY - (isHover.current ? 75 : 50);
    };

    const handleMouseOver = (e) => {
      const el = e.target;
      const isInteractive =
        el.tagName === 'BUTTON' ||
        el.tagName === 'A' ||
        el.closest('button') ||
        el.closest('a') ||
        el.closest('[data-hover="true"]');

      if (isInteractive !== isHover.current) {
        isHover.current = !!isInteractive;
        if (glowRef.current) {
          const size = isHover.current ? '160px' : '100px';
          glowRef.current.style.width  = size;
          glowRef.current.style.height = size;
          glowRef.current.style.opacity = isHover.current ? '0.9' : '0.65';
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    // Show glow
    if (glowRef.current) glowRef.current.style.opacity = '0.65';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return glowRef;
}
