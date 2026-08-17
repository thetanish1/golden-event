import { motion } from 'framer-motion';
import { SERVICES } from '../data/services';
import ServiceCard from './ServiceCard';

export default function ServicesGrid() {
  return (
    <section id="services" className="section-pad bg-charcoal-950 relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="container-lg relative">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold-500 font-body text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            What We Create
          </p>
          <h2 className="font-display font-bold text-charcoal-50 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Our{' '}
            <span className="text-gold-gradient">Services</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mb-4" />
          <p className="font-body text-charcoal-400 max-w-xl mx-auto text-sm leading-relaxed">
            Every celebration deserves to be extraordinary. We bring artistry, precision,
            and passion to each and every event we touch.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
