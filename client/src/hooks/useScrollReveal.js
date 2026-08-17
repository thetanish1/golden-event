import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, inView] — attach ref to the element you want to observe.
 * `inView` becomes true once the element enters the viewport and stays true.
 */
export function useScrollReveal(options = {}) {
  const ref    = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el); // Trigger once
        }
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, inView];
}
