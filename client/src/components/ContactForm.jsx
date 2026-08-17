import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitEnquiry } from '../services/api';
import { EVENT_TYPE_OPTIONS } from '../data/services';

const PHONES = [
  { number: '+919922910141', display: '+91 99229 10141' },
  { number: '+919359226146', display: '+91 93592 26146' },
];
const WA_NUMBER = '919922910141';

const INITIAL_FORM = {
  name: '', phone: '', eventType: '', eventDate: '', message: '',
};

export default function ContactForm() {
  const [form, setForm]     = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.eventType) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    try {
      await submitEnquiry(form);
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err.response?.data?.message || 'Something went wrong. Please try again or call us directly.'
      );
    }
  };

  const inputClass = `w-full bg-charcoal-900 border border-charcoal-700 rounded-xl px-4 py-3 font-body text-sm text-charcoal-100 placeholder-charcoal-500 focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30 transition-all duration-200`;
  const labelClass = `block font-body text-xs font-semibold text-charcoal-400 mb-1.5 tracking-wide uppercase`;

  return (
    <section id="contact" className="section-pad bg-charcoal-900 relative overflow-hidden">
      {/* Radial accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 100% 0%, rgba(212,175,55,0.07) 0%, transparent 60%)' }}
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
            Let's Create Together
          </p>
          <h2 className="font-display font-bold text-charcoal-50" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Send an <span className="text-gold-gradient">Enquiry</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="font-display font-semibold text-charcoal-100 text-xl mb-4">
                Get In Touch
              </h3>
              <p className="font-body text-charcoal-400 text-sm leading-relaxed">
                Ready to make your celebration unforgettable? Reach out — we'd love to hear about your vision and bring it to life.
              </p>
            </div>

            {/* Phone links */}
            <div className="space-y-3">
              {PHONES.map((p) => (
                <a
                  key={p.number}
                  href={`tel:${p.number}`}
                  className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-200 hover:shadow-gold-sm"
                  style={{ background: 'rgba(20,20,20,0.7)', border: '1px solid rgba(212,175,55,0.15)' }}
                >
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-gold-sm transition-shadow"
                    style={{ background: 'rgba(212,175,55,0.12)' }}
                  >
                    <Phone size={16} className="text-gold-400" />
                  </span>
                  <div>
                    <div className="text-[10px] text-charcoal-500 font-body uppercase tracking-wider">Call Us</div>
                    <div className="font-body font-semibold text-charcoal-100 text-sm group-hover:text-gold-400 transition-colors">
                      {p.display}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20event%20decoration%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-200"
              style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)' }}
            >
              <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(37,211,102,0.15)' }}>
                <MessageCircle size={16} className="text-green-400" />
              </span>
              <div>
                <div className="text-[10px] text-charcoal-500 font-body uppercase tracking-wider">WhatsApp Chat</div>
                <div className="font-body font-semibold text-green-400 text-sm">Chat on WhatsApp</div>
              </div>
            </a>

            {/* Location & Hours */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-body font-semibold text-charcoal-200 text-sm">Location</div>
                  <div className="font-body text-charcoal-400 text-xs mt-0.5">Nagpur, Maharashtra, India</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-body font-semibold text-charcoal-200 text-sm">Business Hours</div>
                  <div className="font-body text-charcoal-400 text-xs mt-0.5">Mon–Sun: 9:00 AM – 8:00 PM</div>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(212,175,55,0.15)', height: '200px' }}>
              <iframe
                title="Golden Star Events Nagpur Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238015.70516025!2d78.82213!3d21.1458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37cf1374918f2!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1692012345678!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0, filter: 'grayscale(30%) invert(5%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              id="enquiry-form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 p-7 rounded-2xl"
              style={{
                background: 'rgba(20,20,20,0.75)',
                border: '1px solid rgba(212,175,55,0.18)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Success state */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' }}
                >
                  <CheckCircle size={20} className="text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-body font-semibold text-gold-300 text-sm">Enquiry Submitted!</div>
                    <div className="font-body text-charcoal-400 text-xs mt-0.5">We'll contact you within 24 hours to discuss your event.</div>
                  </div>
                </motion.div>
              )}

              {/* Error state */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
                >
                  <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="font-body text-red-400 text-sm">{errorMsg}</div>
                </motion.div>
              )}

              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={labelClass}>Name <span className="text-gold-500">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone <span className="text-gold-500">*</span></label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Event Type + Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="eventType" className={labelClass}>Event Type <span className="text-gold-500">*</span></label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                    required
                  >
                    <option value="" disabled>Select event type</option>
                    {EVENT_TYPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="eventDate" className={labelClass}>Event Date</label>
                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={form.eventDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClass}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event, budget, guest count, venue..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                id="enquiry-submit"
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-body font-semibold text-sm text-charcoal-950 bg-gold-gradient hover:shadow-gold-md disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending Enquiry…
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={18} />
                    Enquiry Sent!
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Enquiry
                  </>
                )}
              </button>

              <p className="text-center font-body text-charcoal-600 text-xs">
                Or call us directly — we respond within 2 hours
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
