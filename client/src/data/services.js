// Services data — single source of truth for service cards, gallery filters, and form dropdown
import {
  Cake, Heart, Briefcase, Tent, Flower2, Music, Baby,
} from 'lucide-react';

export const SERVICES = [
  {
    id: 'birthday',
    title: 'Birthday Party Decoration',
    category: 'Birthday Party',
    shortDesc: 'From intimate gatherings to grand celebrations, we craft unforgettable birthday experiences with premium décor.',
    icon: Cake,
    gradient: 'from-pink-500/20 to-gold-600/20',
    accentColor: '#F5D67A',
  },
  {
    id: 'wedding',
    title: 'Wedding Management & Decoration',
    category: 'Wedding Management',
    shortDesc: 'Complete wedding solutions — mandap decoration, floral arrangements, lighting, and full event coordination.',
    icon: Heart,
    gradient: 'from-rose-500/20 to-gold-500/20',
    accentColor: '#D4AF37',
  },
  {
    id: 'corporate',
    title: 'Corporate Event Decoration',
    category: 'Corporate Event',
    shortDesc: 'Professional, polished setups for conferences, product launches, award ceremonies, and team events.',
    icon: Briefcase,
    gradient: 'from-blue-500/20 to-gold-600/20',
    accentColor: '#F5D67A',
  },
  {
    id: 'tents',
    title: 'Tents & Lighting',
    category: 'Tents & Lighting',
    shortDesc: 'Premium marquee tents, elegant fairy lights, spotlights, and atmospheric lighting transformations.',
    icon: Tent,
    gradient: 'from-amber-500/20 to-gold-700/20',
    accentColor: '#D4AF37',
  },
  {
    id: 'flowers',
    title: 'Flower Decoration',
    category: 'Flower Decoration',
    shortDesc: 'Exquisite fresh flower arrangements — walls, arches, garlands, centerpieces, and bespoke installations.',
    icon: Flower2,
    gradient: 'from-purple-500/20 to-gold-500/20',
    accentColor: '#F5D67A',
  },
  {
    id: 'cultural',
    title: 'Cultural Program Setup',
    category: 'Cultural Program',
    shortDesc: 'Stage setups, sound systems, and themed décor for festivals, puja events, and cultural performances.',
    icon: Music,
    gradient: 'from-orange-500/20 to-gold-600/20',
    accentColor: '#D4AF37',
  },
  {
    id: 'babyshower',
    title: 'Baby Shower Decoration',
    category: 'Baby Shower',
    shortDesc: 'Dreamy, pastel-perfect baby shower setups with balloon art, floral accents, and custom backdrops.',
    icon: Baby,
    gradient: 'from-sky-400/20 to-gold-400/20',
    accentColor: '#F5D67A',
  },
];

export const SERVICE_CATEGORIES = ['All', ...SERVICES.map((s) => s.category)];
export const EVENT_TYPE_OPTIONS  = SERVICES.map((s) => s.category);
