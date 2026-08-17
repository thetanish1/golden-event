import { useState, useEffect } from 'react';
import { Menu, X, Phone, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '#home',         label: 'Home' },
  { href: '#services',     label: 'Services' },
  { href: '#gallery',      label: 'Gallery' },
  { href: '#about',        label: 'About' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact',      label: 'Contact' },
];

const PHONES = [
  { number: '+919922910141', display: '+91 99229 10141' },
  { number: '+919359226146', display: '+91 93592 26146' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on nav click
  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      {/* Top phone bar — desktop only */}
      <div className="hidden md:flex items-center justify-center gap-8 bg-charcoal-950 border-b border-gold-700/20 py-1.5 px-4 text-xs text-charcoal-300">
        {PHONES.map((p) => (
          <a
            key={p.number}
            href={`tel:${p.number}`}
            className="flex items-center gap-1.5 hover:text-gold-400 transition-colors duration-200"
          >
            <Phone size={11} className="text-gold-500" />
            {p.display}
          </a>
        ))}
      </div>

      {/* Main navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-charcoal-950/95 backdrop-blur-md border-b border-gold-700/40 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
        style={{ top: scrolled ? 0 : '30px' }}
      >
        <nav className="container-lg flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group"
            aria-label="Golden Star Events — Home"
          >
            <div className="relative">
              <Star
                size={28}
                className="text-gold-500 fill-gold-500/30 group-hover:fill-gold-500/60 transition-all duration-300 animate-spin-slow"
              />
              <Star
                size={14}
                className="absolute -top-0.5 -right-0.5 text-gold-300 fill-gold-300/50"
              />
            </div>
            <div>
              <span className="font-display font-bold text-xl text-gold-gradient tracking-wide leading-none">
                Golden Star Events
              </span>
              <div className="text-[10px] text-charcoal-400 tracking-[0.2em] uppercase font-body font-light leading-none mt-0.5">
                Nagpur
              </div>
            </div>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-body font-medium text-charcoal-200 hover:text-gold-400 transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-gradient group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-semibold text-sm text-charcoal-950 bg-gold-gradient hover:shadow-gold-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Enquire Now
          </a>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden p-2 text-charcoal-200 hover:text-gold-400 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-charcoal-950/98 backdrop-blur-xl flex flex-col pt-24 pb-10 px-8"
          >
            {/* Gold divider top */}
            <div className="gold-divider mb-8" />

            <ul className="flex flex-col gap-2 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="block py-3 text-2xl font-display font-semibold text-charcoal-100 hover:text-gold-400 transition-colors border-b border-charcoal-800"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Phones in mobile menu */}
            <div className="space-y-3 mt-6">
              {PHONES.map((p) => (
                <a
                  key={p.number}
                  href={`tel:${p.number}`}
                  className="flex items-center gap-3 text-charcoal-300 hover:text-gold-400 transition-colors"
                >
                  <Phone size={16} className="text-gold-500" />
                  <span className="font-body text-sm">{p.display}</span>
                </a>
              ))}
            </div>

            <a
              href="#contact"
              onClick={handleNavClick}
              className="mt-6 w-full py-3.5 rounded-full font-body font-semibold text-center text-charcoal-950 bg-gold-gradient shadow-gold-sm active:scale-95 transition-transform"
            >
              Enquire Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
