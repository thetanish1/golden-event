import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import Gallery from './components/Gallery';
import About from './components/About';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';

export default function App() {
  return (
    <>
      {/* Signature cursor glow (desktop only — disabled on touch/reduced-motion in the component) */}
      <CursorGlow />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <ServicesGrid />
        <Gallery />
        <About />
        <Testimonials />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fixed floating elements */}
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
