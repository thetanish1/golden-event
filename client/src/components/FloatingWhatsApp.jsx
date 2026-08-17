import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WA_NUMBER  = '919922910141';
const WA_MESSAGE = encodeURIComponent(
  'Hello! I would like to enquire about your event decoration services.'
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Reveal after 2s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-2 rounded-lg text-xs font-body font-semibold text-charcoal-100 pointer-events-none"
                style={{
                  background: 'rgba(20,20,20,0.95)',
                  border: '1px solid rgba(37,211,102,0.3)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                }}
              >
                Chat on WhatsApp
                <span
                  className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 border-4 border-transparent"
                  style={{ borderLeftColor: 'rgba(20,20,20,0.95)' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <a
            id="floating-whatsapp"
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="whatsapp-pulse relative flex items-center justify-center w-14 h-14 rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.4)] transition-transform duration-200 hover:scale-110 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
          >
            <MessageCircle size={26} className="text-white fill-white/20" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
