import { motion } from 'framer-motion';

/**
 * Individual service card with gold hover glow, scale lift, and shimmer border.
 */
export default function ServiceCard({ service, index }) {
  const Icon = service.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex flex-col p-4 sm:p-7 rounded-2xl overflow-hidden cursor-default"
      data-hover="true"
      style={{
        background: 'rgba(20,20,20,0.8)',
        border: '1px solid rgba(212,175,55,0.12)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Card inner glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Glowing border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: '0 0 0 1px rgba(212,175,55,0.5) inset, 0 0 24px rgba(212,175,55,0.2)' }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-5 transition-all duration-300 group-hover:shadow-gold-sm"
        style={{
          background: 'rgba(212,175,55,0.1)',
          border: '1px solid rgba(212,175,55,0.2)',
        }}
      >
        <Icon
          size={20}
          className="text-gold-500 group-hover:text-gold-300 transition-colors duration-300 sm:hidden"
          strokeWidth={1.5}
        />
        <Icon
          size={26}
          className="text-gold-500 group-hover:text-gold-300 transition-colors duration-300 hidden sm:block"
          strokeWidth={1.5}
        />
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-sm sm:text-lg text-charcoal-50 mb-1 sm:mb-2 leading-snug group-hover:text-gold-300 transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-body text-xs sm:text-sm text-charcoal-400 leading-relaxed flex-1">
        {service.shortDesc}
      </p>

      {/* Gold underline accent */}
      <div className="mt-3 sm:mt-5 w-8 h-0.5 bg-gold-gradient rounded-full group-hover:w-full transition-all duration-500 ease-out" />
    </motion.article>
  );
}
