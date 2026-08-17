import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

const HERO_BG = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=85';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-hidden="true"
      />
      {/* Multi-layer gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,11,13,0.45) 0%, rgba(11,11,13,0.6) 40%, rgba(11,11,13,0.88) 80%, rgba(11,11,13,1) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Subtle gold radial glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container-lg text-center px-4 pt-32 pb-20">
        {/* Gold badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400 text-xs font-body font-medium tracking-widest uppercase mb-6"
        >
          <Sparkles size={12} />
          Nagpur's Premier Event Decorators
          <Sparkles size={12} />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display font-bold leading-tight mb-6"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 5rem)',
            lineHeight: 1.12,
          }}
        >
          Turning Your Celebrations Into{' '}
          <span className="text-gold-gradient">Golden Memories</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body font-light text-charcoal-300 max-w-2xl mx-auto mb-10"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
        >
          From intimate birthdays to grand weddings, corporate galas to baby showers —
          we craft extraordinary experiences with every detail dipped in gold.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            id="hero-cta-quote"
            href="#contact"
            className="group relative px-8 py-3.5 rounded-full font-body font-semibold text-charcoal-950 bg-gold-gradient overflow-hidden transition-all duration-300 hover:shadow-gold-lg hover:scale-105 active:scale-95"
            style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}
          >
            <span className="relative z-10">Get a Free Quote</span>
            {/* Shimmer sweep on hover */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
              aria-hidden="true"
            />
          </a>

          <a
            id="hero-cta-gallery"
            href="#gallery"
            className="px-8 py-3.5 rounded-full font-body font-semibold border border-gold-500/60 text-gold-400 hover:bg-gold-500/10 hover:border-gold-400 hover:text-gold-300 transition-all duration-300 hover:shadow-gold-sm"
            style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}
          >
            View Our Work
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-16 mb-6"
        >
          {[
            { value: '500+', label: 'Events Decorated' },
            { value: '10+',  label: 'Years of Excellence' },
            { value: '100%', label: 'Custom Designs' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-gold-400 text-2xl sm:text-3xl leading-none">
                {stat.value}
              </div>
              <div className="text-charcoal-400 text-xs font-body mt-1 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-charcoal-400 hover:text-gold-400 transition-colors cursor-pointer"
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to services"
      >
        <span className="text-[10px] font-body tracking-widest uppercase">Explore</span>
        <ChevronDown size={20} className="animate-scroll-bounce" />
      </motion.div>
    </section>
  );
}
