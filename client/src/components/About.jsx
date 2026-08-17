import { motion } from 'framer-motion';
import StatsCounter from './StatsCounter';
import { CheckCircle2, Award, Users, Sparkles } from 'lucide-react';

const ABOUT_IMG = 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=900&q=80';

const STATS = [
  { value: '500+', label: 'Events Decorated',    suffix: '' },
  { value: '10+',  label: 'Years of Excellence', suffix: '' },
  { value: '100%', label: 'Custom Designs',      suffix: '' },
  { value: '50+',  label: 'Expert Team Members', suffix: '' },
];

const REASONS = [
  { icon: Award,      text: 'Decade of mastery in luxury event decoration across Nagpur' },
  { icon: Sparkles,   text: 'Fully bespoke designs — no two events are ever the same' },
  { icon: Users,      text: 'Dedicated team of artists, florists, and lighting specialists' },
  { icon: CheckCircle2, text: 'End-to-end management — from concept to cleanup' },
];

export default function About() {
  return (
    <section id="about" className="section-pad bg-charcoal-950 relative overflow-hidden">
      {/* Decorative radial */}
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-lg">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-gold-500 font-body text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Our Story
          </p>
          <h2 className="font-display font-bold text-charcoal-50" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Why Choose <span className="text-gold-gradient">Golden Star?</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(212,175,55,0.2)', boxShadow: '0 0 40px rgba(212,175,55,0.1)' }}
            >
              <img
                src={ABOUT_IMG}
                alt="Elegant tent and lighting setup by Golden Star Events"
                loading="lazy"
                className="w-full h-80 lg:h-[480px] object-cover"
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 60%)' }}
                aria-hidden="true"
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #8A6D1F)',
                boxShadow: '0 8px 32px rgba(212,175,55,0.4)',
              }}
            >
              <span className="font-display font-bold text-charcoal-950 text-3xl block leading-none">10+</span>
              <span className="font-body text-charcoal-800 text-xs mt-1 block">Years of Excellence</span>
            </div>
          </motion.div>

          {/* Right — text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="font-body text-charcoal-300 leading-relaxed mb-6 text-base">
              Golden Star Events is Nagpur's most trusted name in premium event decoration and management.
              Founded over a decade ago, we have transformed thousands of celebrations — from intimate
              family gatherings to grand weddings — with our signature attention to detail and unwavering
              commitment to excellence.
            </p>
            <p className="font-body text-charcoal-400 leading-relaxed mb-8 text-sm">
              Our team of talented decorators, florists, and lighting artists work together to create
              immersive environments that capture the essence of each client's vision. We don't just
              decorate spaces — we craft memories that last a lifetime.
            </p>

            {/* Reasons list */}
            <ul className="space-y-4 mb-8">
              {REASONS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}
                  >
                    <Icon size={15} className="text-gold-400" strokeWidth={2} />
                  </span>
                  <span className="font-body text-charcoal-300 text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-body font-semibold text-sm text-charcoal-950 bg-gold-gradient hover:shadow-gold-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-20">
          {STATS.map((stat) => (
            <StatsCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
