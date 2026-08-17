import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryLightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const current = images[currentIndex];

  // Keyboard navigation
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="lightbox-overlay fixed inset-0 z-[999] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Gallery image: ${current.alt}`}
      >
        {/* Inner container — stops click propagation */}
        <div
          className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            id="lightbox-close"
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 text-charcoal-300 hover:text-gold-400 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>

          {/* Image */}
          <motion.img
            key={current.src}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            src={current.src}
            alt={current.alt}
            className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-[0_0_60px_rgba(0,0,0,0.8)]"
            style={{ border: '1px solid rgba(212,175,55,0.2)' }}
          />

          {/* Caption */}
          <p className="mt-3 text-charcoal-400 text-sm font-body text-center">
            {current.alt}
            <span className="ml-3 text-charcoal-600">
              {currentIndex + 1} / {images.length}
            </span>
          </p>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                id="lightbox-prev"
                onClick={onPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 p-3 rounded-full border border-gold-700/40 text-charcoal-300 hover:text-gold-400 hover:border-gold-500 hover:bg-gold-500/10 transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                id="lightbox-next"
                onClick={onNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 p-3 rounded-full border border-gold-700/40 text-charcoal-300 hover:text-gold-400 hover:border-gold-500 hover:bg-gold-500/10 transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
