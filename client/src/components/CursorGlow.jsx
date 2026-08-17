import { useCursorGlow } from '../hooks/useCursorGlow';

/**
 * Signature cursor glow — fixed golden orb with mix-blend-mode: screen.
 * Desktop-only, disabled on touch and prefers-reduced-motion.
 */
export default function CursorGlow() {
  const glowRef = useCursorGlow();

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      aria-hidden="true"
      style={{
        width: '100px',
        height: '100px',
        opacity: 0,
        background: 'radial-gradient(circle, rgba(245,214,122,0.85) 0%, rgba(212,175,55,0.5) 30%, rgba(138,109,31,0.15) 65%, transparent 100%)',
        filter: 'blur(8px)',
        marginLeft: '-50px',
        marginTop: '-50px',
      }}
    />
  );
}
