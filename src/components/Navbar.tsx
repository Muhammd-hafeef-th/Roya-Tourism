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
    const onScroll = () => {
      const threshold = window.innerHeight * (window.innerWidth < 768 ? 0.8 : 1.8);
      setScrolled(window.scrollY > threshold);
    };
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
            : 'bg-white/5 backdrop-blur-sm border-b border-white/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-between">
          {/* Logo - Responsive sizing */}
          <button onClick={() => handleNav('#hero')} className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="w-8 xs:w-9 sm:w-10 h-8 xs:h-9 sm:h-10 rounded-full btn-gold flex items-center justify-center shadow-gold-sm">
              <Globe size={16} className="text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`font-serif text-base xs:text-lg sm:text-xl md:text-2xl font-semibold tracking-wide transition-colors duration-500 ${
                scrolled ? 'text-stone-900' : 'text-white'
              }`}>ROYA</span>
              <span className={`section-tag text-[0.5rem] xs:text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em] xs:tracking-[0.22em] sm:tracking-[0.25em] -mt-0.5 transition-colors duration-500 ${
                scrolled ? 'text-stone-600' : 'text-white/80'
              }`}>TOURISM</span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`nav-link text-xs xl:text-sm font-sans font-medium transition-colors duration-300 ${
                  scrolled
                    ? active === link.href 
                      ? 'text-gold-500' 
                      : 'text-stone-600 hover:text-stone-900'
                    : active === link.href
                      ? 'text-amber-300'
                      : 'text-white/80 hover:text-white'
                } ${active === link.href ? 'active' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA - Responsive sizing */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            <a
              href="tel:+1234567890"
              className={`flex items-center gap-1.5 xl:gap-2 text-xs xl:text-sm transition-colors font-sans whitespace-nowrap ${
                scrolled
                  ? 'text-stone-600 hover:text-gold-500'
                  : 'text-white/80 hover:text-amber-300'
              }`}
            >
              <Phone size={14} className="flex-shrink-0" />
              <span className="hidden xl:inline">+1 234 567 890</span>
            </a>
            <button
              onClick={() => handleNav('#contact')}
              className={`px-4 xl:px-5 py-2 xl:py-2.5 rounded-full text-xs xl:text-sm font-sans shadow-gold-sm transition-all duration-300 flex-shrink-0 ${
                scrolled
                  ? 'btn-gold'
                  : 'bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 hover:border-white/50'
              }`}
            >
              Book Now
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden transition-colors flex-shrink-0 ${
              scrolled
                ? 'text-stone-700 hover:text-gold-500'
                : 'text-white hover:text-amber-300'
            }`}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
            className="fixed top-0 left-0 right-0 z-40 glass-white shadow-luxury pt-16 sm:pt-20 pb-6 sm:pb-8 px-3 xs:px-4 sm:px-6 max-h-screen overflow-y-auto"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left font-serif text-lg xs:text-xl sm:text-2xl text-stone-800 hover:text-gold-500 transition-colors py-2 sm:py-3 border-b border-cream-200"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="mt-3 sm:mt-4 btn-gold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-sans text-center w-full"
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
