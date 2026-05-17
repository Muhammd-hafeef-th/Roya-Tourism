import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Umrah & Hajj', href: '#umrah' },
  { label: 'Packages', href: '#packages' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setActive(href);
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-white shadow-soft py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleNav('#hero')} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full btn-gold flex items-center justify-center shadow-gold-sm">
              <Globe size={18} className="text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-xl font-semibold text-stone-900 tracking-wide">ROYA</span>
              <span className="section-tag text-[0.6rem] tracking-[0.25em] -mt-0.5">TOURISM</span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`nav-link text-sm font-sans font-medium transition-colors duration-300 ${
                  active === link.href ? 'text-gold-500' : 'text-stone-600 hover:text-stone-900'
                } ${active === link.href ? 'active' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-sm text-stone-600 hover:text-gold-500 transition-colors font-sans"
            >
              <Phone size={14} />
              <span>+1 234 567 890</span>
            </a>
            <button
              onClick={() => handleNav('#contact')}
              className="btn-gold px-5 py-2.5 rounded-full text-sm font-sans shadow-gold-sm"
            >
              Book Now
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-stone-700 hover:text-gold-500 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 glass-white shadow-luxury pt-20 pb-8 px-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left font-serif text-xl text-stone-800 hover:text-gold-500 transition-colors py-2 border-b border-cream-200"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="mt-2 btn-gold px-6 py-3 rounded-full text-base font-sans text-center"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
