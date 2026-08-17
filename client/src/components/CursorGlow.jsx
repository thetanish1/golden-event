import { useEffect } from 'react';

/**
 * StarCursor — spawns golden star particles that trail behind the cursor.
 * Desktop-only, disabled on touch and prefers-reduced-motion.
 */
export default function CursorGlow() {
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    // SVG star paths for variety
    const STARS = ['★', '✦', '✧', '⋆', '✶', '✵'];
    const COLORS = [
      '#FFD700', '#FFF0A0', '#F5D67A', '#FFB800',
      '#FFFACD', '#E6C96A', '#FFC947', '#FFFFFF',
    ];

    let lastX = -1000;
    let lastY = -1000;
    const MIN_DIST = 12; // px between spawns to avoid too many particles

    function spawnStar(x, y) {
      const el = document.createElement('span');
      const char = STARS[Math.floor(Math.random() * STARS.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = 10 + Math.random() * 18; // 10–28 px
      const angle = Math.random() * 360;
      const spread = 30 + Math.random() * 40;
      const dx = Math.cos((angle * Math.PI) / 180) * spread;
      const dy = Math.sin((angle * Math.PI) / 180) * spread - 30; // bias upward
      const duration = 600 + Math.random() * 500; // 600–1100 ms
      const delay = 0;
      const rotate = -30 + Math.random() * 60;

      el.textContent = char;
      el.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${size}px;
        color: ${color};
        pointer-events: none;
        z-index: 99999;
        user-select: none;
        line-height: 1;
        text-shadow: 0 0 6px ${color}, 0 0 14px rgba(255,215,0,0.6);
        will-change: transform, opacity;
        animation: starFly ${duration}ms ease-out ${delay}ms forwards;
        --dx: ${dx}px;
        --dy: ${dy}px;
        --rot: ${rotate}deg;
        transform-origin: center center;
      `;

      document.body.appendChild(el);
      setTimeout(() => el.remove(), duration + delay + 50);
    }

    function onMouseMove(e) {
      const { clientX: x, clientY: y } = e;
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist < MIN_DIST) return;
      lastX = x;
      lastY = y;
      // Spawn 1–2 stars per move
      const count = Math.random() < 0.4 ? 2 : 1;
      for (let i = 0; i < count; i++) spawnStar(x, y);
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return null;
}
