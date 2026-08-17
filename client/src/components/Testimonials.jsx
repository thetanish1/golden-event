import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { getTestimonials } from '../services/api';

// Fallback testimonials if API unavailable
const FALLBACK_TESTIMONIALS = [
  {
    _id: '1',
    clientName: 'Priya & Rahul Sharma',
    eventType: 'Wedding Management',
    rating: 5,
    message: 'Golden Star Events transformed our wedding into an absolute dream. Every detail — from the mandap floral arrangements to the evening lighting — was breathtaking. Our guests are still talking about it months later!',
  },
  {
    _id: '2',
    clientName: 'Anjali Deshmukh',
    eventType: 'Birthday Party',
    rating: 5,
    message: 'They decorated my daughter\'s 5th birthday party and it was absolutely magical. The balloon arch, the theme setup, the little touches everywhere — everything was perfect. Will definitely hire them again!',
  },
  {
    _id: '3',
    clientName: 'Vikram Joshi',
    eventType: 'Corporate Event',
    rating: 5,
    message: 'We hired Golden Star Events for our annual company conference. Professional, punctual, and the stage decoration was stunning. Highly recommended for any corporate event.',
  },
  {
    _id: '4',
    clientName: 'Sunita & Manoj Patel',
    eventType: 'Baby Shower',
    rating: 5,
    message: 'The baby shower décor was gorgeous — soft pastels, beautiful balloon arrangements, floral accents everywhere. Golden Star Events made the most special day of our lives even more memorable.',
  },
  {
    _id: '5',
    clientName: 'Meera Agrawal',
    eventType: 'Flower Decoration',
    rating: 5,
    message: 'The fresh flower decoration for our engagement ceremony was absolutely stunning. The rose wall backdrop was a showstopper — every photo looks like a magazine shoot!',
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [current, setCurrent]  = useState(0);
  const [direction, setDirection] = useState(1);
  const autoRef = useRef(null);

  useEffect(() => {
    getTestimonials()
      .then((res) => {
        const data = res.data.data;
        if (data?.length) setTestimonials(data);
      })
      .catch(() => {});
  }, []);

  const goTo = useCallback((idx, dir = 1) => {
    setDirection(dir);
    setCurrent((idx + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => goTo(current - 1, -1);
  const next = () => goTo(current + 1,  1);

  // Auto-advance every 5 s
  useEffect(() => {
    autoRef.current = setInterval(() => goTo(current + 1, 1), 5000);
    return () => clearInterval(autoRef.current);
  }, [current, goTo]);

  const t = testimonials[current];

  const variants = {
    enter:  (dir) => ({ x: dir > 0 ? 80  : -80,  opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir) => ({ x: dir > 0 ? -80 :  80, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="section-pad relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0B0B0D 0%, #141414 100%)' }}>
      {/* Background radial */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-lg relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-gold-500 font-body text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Client Love
          </p>
          <h2 className="font-display font-bold text-charcoal-50" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            What Our <span className="text-gold-gradient">Clients Say</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mt-4" />
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Giant quote mark */}
          <Quote
            size={80}
            className="absolute -top-6 -left-4 text-gold-700/20 fill-gold-700/20"
            aria-hidden="true"
          />

          {/* Card */}
          <div
            className="relative overflow-hidden rounded-2xl px-8 py-10 md:px-14 md:py-12"
            style={{
              background: 'rgba(20,20,20,0.8)',
              border: '1px solid rgba(212,175,55,0.2)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 40px rgba(0,0,0,0.5), 0 0 1px rgba(212,175,55,0.3) inset',
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t._id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-gold-400 fill-gold-400" />
                  ))}
                </div>

                {/* Message */}
                <p className="font-body text-charcoal-200 leading-relaxed text-base mb-7 italic">
                  "{t.message}"
                </p>

                {/* Client info */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-charcoal-950 text-sm flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #8A6D1F)' }}
                  >
                    {t.clientName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-body font-semibold text-charcoal-100 text-sm">{t.clientName}</div>
                    <div className="text-gold-600 text-xs font-body">{t.eventType}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              id="testimonial-prev"
              onClick={prev}
              className="p-2.5 rounded-full border border-gold-700/40 text-charcoal-400 hover:text-gold-400 hover:border-gold-500 hover:bg-gold-500/10 transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === current
                      ? 'linear-gradient(90deg, #D4AF37, #F5D67A)'
                      : 'rgba(212,175,55,0.25)',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              id="testimonial-next"
              onClick={next}
              className="p-2.5 rounded-full border border-gold-700/40 text-charcoal-400 hover:text-gold-400 hover:border-gold-500 hover:bg-gold-500/10 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
