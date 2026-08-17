import { Phone, Star, Heart } from 'lucide-react';

// Inline SVG social icons (lucide-react doesn't include these brand icons)
const InstagramIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const FacebookIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
import { SERVICES } from '../data/services';

const PHONES = [
  { number: '+919922910141', display: '+91 99229 10141' },
  { number: '+919359226146', display: '+91 93592 26146' },
];

const NAV_LINKS = [
  { href: '#home',         label: 'Home' },
  { href: '#services',     label: 'Services' },
  { href: '#gallery',      label: 'Gallery' },
  { href: '#about',        label: 'About' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact',      label: 'Contact' },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-14 pb-6"
      style={{
        background: '#0B0B0D',
        borderTop: '1px solid rgba(212,175,55,0.3)',
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }}
        aria-hidden="true"
      />

      <div className="container-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4 w-fit">
              <Star size={22} className="text-gold-500 fill-gold-500/40" />
              <div>
                <span className="font-display font-bold text-lg text-gold-gradient block leading-none">
                  Golden Star Events
                </span>
                <span className="text-[10px] text-charcoal-500 tracking-[0.2em] uppercase">Nagpur</span>
              </div>
            </a>
            <p className="font-body text-charcoal-500 text-xs leading-relaxed mb-5">
              Nagpur's premier event decoration and management company — turning your celebrations into golden memories since 2014.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-charcoal-700 text-charcoal-500 hover:text-gold-400 hover:border-gold-600/50 hover:bg-gold-500/8 transition-all duration-200"
              >
                <InstagramIcon size={15} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-charcoal-700 text-charcoal-500 hover:text-gold-400 hover:border-gold-600/50 hover:bg-gold-500/8 transition-all duration-200"
              >
                <FacebookIcon size={15} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-body font-semibold text-charcoal-200 text-sm mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-charcoal-500 text-xs hover:text-gold-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-3 h-px bg-charcoal-700 group-hover:bg-gold-500 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-body font-semibold text-charcoal-200 text-sm mb-4 tracking-wide">Our Services</h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="font-body text-charcoal-500 text-xs hover:text-gold-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-3 h-px bg-charcoal-700 group-hover:bg-gold-500 transition-colors" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-charcoal-200 text-sm mb-4 tracking-wide">Contact Us</h4>
            <div className="space-y-3">
              {PHONES.map((p) => (
                <a
                  key={p.number}
                  href={`tel:${p.number}`}
                  className="flex items-center gap-2 text-charcoal-500 hover:text-gold-400 transition-colors duration-200 group"
                >
                  <Phone size={13} className="text-gold-700 group-hover:text-gold-400 transition-colors" />
                  <span className="font-body text-xs">{p.display}</span>
                </a>
              ))}
              <div className="font-body text-charcoal-600 text-xs mt-4 leading-relaxed">
                Nagpur, Maharashtra, India
                <br />
                Mon–Sun: 9 AM – 8 PM
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gold-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-charcoal-600 text-[11px] font-body">
          <p>© {new Date().getFullYear()} Golden Star Events Nagpur. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart size={11} className="text-gold-600 fill-gold-600 mx-0.5" /> in Nagpur
          </p>
        </div>
      </div>
    </footer>
  );
}
