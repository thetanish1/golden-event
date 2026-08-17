import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getGallery } from '../services/api';
import { SERVICE_CATEGORIES } from '../data/services';
import GalleryLightbox from './GalleryLightbox';

// Static fallback if API is unavailable
const FALLBACK = [
  { id: 1,  category: 'Birthday Party',     src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', alt: 'Birthday balloons decoration' },
  { id: 2,  category: 'Birthday Party',     src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Elegant birthday table setup' },
  { id: 3,  category: 'Wedding Management', src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', alt: 'Grand wedding decoration' },
  { id: 4,  category: 'Wedding Management', src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80', alt: 'Bridal floral arch' },
  { id: 5,  category: 'Wedding Management', src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80', alt: 'Wedding reception hall' },
  { id: 6,  category: 'Corporate Event',    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', alt: 'Corporate event setup' },
  { id: 7,  category: 'Corporate Event',    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', alt: 'Conference hall decoration' },
  { id: 8,  category: 'Tents & Lighting',   src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80', alt: 'Tent with fairy lights' },
  { id: 9,  category: 'Tents & Lighting',   src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Golden light canopy' },
  { id: 10, category: 'Flower Decoration',  src: 'https://images.unsplash.com/photo-1490750967868-88df5691cc79?w=800&q=80', alt: 'Rose wall backdrop' },
  { id: 11, category: 'Flower Decoration',  src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80', alt: 'Floral centerpiece arrangement' },
  { id: 12, category: 'Cultural Program',   src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', alt: 'Cultural stage decoration' },
  { id: 13, category: 'Cultural Program',   src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', alt: 'Festival stage setup' },
  { id: 14, category: 'Baby Shower',        src: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=800&q=80', alt: 'Baby shower decoration' },
  { id: 15, category: 'Baby Shower',        src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', alt: 'Pastel baby shower setup' },
];

const MOBILE_PAGE_SIZE = 4; // 2×2 grid per page on mobile

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [images, setImages]     = useState(FALLBACK);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mobilePage, setMobilePage] = useState(0);

  useEffect(() => {
    getGallery(activeCategory)
      .then((res) => setImages(res.data.data || FALLBACK))
      .catch(() => setImages(FALLBACK));
  }, [activeCategory]);

  // Reset page when category or images change
  useEffect(() => {
    setMobilePage(0);
  }, [activeCategory, images]);

  const filtered = activeCategory === 'All'
    ? images
    : images.filter((img) => img.category === activeCategory);

  const totalMobilePages = Math.ceil(filtered.length / MOBILE_PAGE_SIZE);
  const mobileImages = filtered.slice(
    mobilePage * MOBILE_PAGE_SIZE,
    mobilePage * MOBILE_PAGE_SIZE + MOBILE_PAGE_SIZE
  );

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = ()   => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const nextImage = () => setLightboxIndex((i) => (i + 1) % filtered.length);

  const prevPage = useCallback(() => setMobilePage((p) => Math.max(0, p - 1)), []);
  const nextPage = useCallback(() => setMobilePage((p) => Math.min(totalMobilePages - 1, p + 1)), [totalMobilePages]);

  return (
    <section id="gallery" className="section-pad bg-charcoal-900 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 55%)' }}
        aria-hidden="true"
      />

      <div className="container-lg relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold-500 font-body text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Our Portfolio
          </p>
          <h2 className="font-display font-bold text-charcoal-50 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Events We've <span className="text-gold-gradient">Transformed</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto" />
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`gallery-filter-${cat.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wide transition-all duration-250 ${
                activeCategory === cat
                  ? 'bg-gold-gradient text-charcoal-950 shadow-gold-sm'
                  : 'border border-gold-700/30 text-charcoal-400 hover:border-gold-500/60 hover:text-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── MOBILE: paginated 2×2 grid (hidden on md+) ───────────── */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${mobilePage}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              {mobileImages.map((img) => {
                // Real index in filtered array for lightbox
                const realIdx = filtered.findIndex((f) => f.id === img.id);
                return (
                  <button
                    key={img.id}
                    className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer border border-transparent hover:border-gold-500/40 hover:shadow-gold-sm transition-all duration-300"
                    onClick={() => openLightbox(realIdx)}
                    aria-label={`View: ${img.alt}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/40 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-body font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-full bg-charcoal-950/70 border border-gold-500/40">
                        View
                      </span>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Pagination controls */}
          {totalMobilePages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              {/* Prev */}
              <button
                onClick={prevPage}
                disabled={mobilePage === 0}
                aria-label="Previous page"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-gold-700/40 text-gold-500 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold-400 hover:bg-gold-500/10 transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {Array.from({ length: totalMobilePages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setMobilePage(i)}
                    aria-label={`Page ${i + 1}`}
                    className="transition-all duration-300"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        i === mobilePage
                          ? 'w-5 h-2 bg-gold-400'
                          : 'w-2 h-2 bg-charcoal-600 hover:bg-gold-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                onClick={nextPage}
                disabled={mobilePage === totalMobilePages - 1}
                aria-label="Next page"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-gold-700/40 text-gold-500 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold-400 hover:bg-gold-500/10 transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Page count label */}
          {totalMobilePages > 1 && (
            <p className="text-center text-charcoal-500 text-xs mt-2 font-body">
              {mobilePage + 1} / {totalMobilePages}
            </p>
          )}
        </div>

        {/* ── DESKTOP: full masonry grid (hidden on mobile) ─────────── */}
        <motion.div
          layout
          className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, idx) => (
              <motion.button
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer border border-transparent hover:border-gold-500/40 hover:shadow-gold-sm transition-all duration-300"
                onClick={() => openLightbox(idx)}
                aria-label={`View: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/40 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-body font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-full bg-charcoal-950/70 border border-gold-500/40">
                    View
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
