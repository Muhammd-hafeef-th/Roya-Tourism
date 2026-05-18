import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown, X, Menu } from 'lucide-react';

/* ─── Nav link data ────────────────────────────────────────────── */
const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Umrah & Hajj', href: '#umrah' },
  { label: 'Packages', href: '#packages' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

/* ─── Scroll threshold helper ─────────────────────────────────── */
function useScrolled(px = 80) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    let ticking = false;
    const h = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > px;
          setScrolled(prev => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    
    h(); // Initial check
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, [px]);
  
  return scrolled;
}

export default function Navbar() {
  const scrolled = useScrolled(60);
  const [active, setActive] = useState('#hero');
  const [mobileOpen, setMobile] = useState(false);
  const [indicatorStyle, setIndicator] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  /* ── Close mobile menu on resize to desktop ── */
  useEffect(() => {
    const r = () => { if (window.innerWidth >= 1024) setMobile(false); };
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  /* ── Body scroll lock when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ── Smooth scroll + active tracking ── */
  const handleNav = (href: string) => {
    setActive(href);
    setMobile(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── Update gold indicator under active desktop link ── */
  const updateIndicator = (el: HTMLButtonElement) => {
    if (!navRef.current) return;
    const pRect = navRef.current.getBoundingClientRect();
    const cRect = el.getBoundingClientRect();
    setIndicator({ left: cRect.left - pRect.left, width: cRect.width });
  };

  return (
    <>
      {/* ════════════════════════════════════════════════
          MAIN NAVBAR
      ════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          ${scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-gold-200/60 shadow-[0_4px_32px_rgba(201,168,76,0.10)]'
            : 'bg-transparent border-b border-white/10'
          }
        `}
      >
        {/* ── Top luxury accent line ── */}
        <div
          className={`h-[2px] w-full transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'linear-gradient(90deg, transparent, #c9a84c 30%, #f0d98a 50%, #c9a84c 70%, transparent)' }}
        />

        {/* ── Inner container ── */}
        <div className="
          max-w-[1920px] mx-auto
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 3xl:px-28 4xl:px-36
          flex items-center justify-between
          h-16 xs:h-[4.25rem] sm:h-20 md:h-20 lg:h-[4.75rem] xl:h-20 2xl:h-24 3xl:h-28 4xl:h-32
        ">

          {/* ══ LOGO ════════════════════════════════════════════ */}
          <button
            onClick={() => handleNav('#hero')}
            className="flex items-center gap-2 sm:gap-3 group flex-shrink-0 relative z-10"
            aria-label="Roya Tourism – back to top"
          >
            {/* Logo mark */}
            <div className="
              relative flex-shrink-0
              w-10 xs:w-11 sm:w-14 md:w-14 lg:w-12 xl:w-14 2xl:w-16 3xl:w-20 4xl:w-24
              h-10 xs:h-11 sm:h-14 md:h-14 lg:h-12 xl:h-14 2xl:h-16 3xl:h-20 4xl:h-24
              transition-transform duration-500 group-hover:scale-105
            ">
              <img
                src="/logo1.png"
                alt="Roya Tourism logo"
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(201,168,76,0.4)]"
              />
            </div>

            {/* Wordmark */}
            <div className="flex flex-col leading-none select-none">
              <span className={`
                font-serif font-semibold tracking-[0.12em] uppercase
                text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl
                transition-all duration-500
                ${scrolled ? 'text-stone-900' : 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]'}
              `}>
                Roya
              </span>
              <span className={`
                font-sans font-medium tracking-[0.35em] uppercase
                text-[0.45rem] xs:text-[0.48rem] sm:text-[0.55rem] md:text-[0.55rem] lg:text-[0.5rem] xl:text-[0.55rem] 2xl:text-[0.65rem] 3xl:text-[0.75rem] 4xl:text-[0.9rem]
                mt-0.5
                transition-all duration-500
                ${scrolled ? 'text-gold-600' : 'text-gold-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'}
              `}>
                Tourism
              </span>
            </div>
          </button>

          {/* ══ DESKTOP NAV ══════════════════════════════════════ */}
          <div
            ref={navRef}
            className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-3 3xl:gap-5 4xl:gap-7 relative"
          >
            {/* Gold sliding underline indicator */}
            <motion.div
              className="absolute bottom-[-4px] h-[2px] rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(90deg, #c9a84c, #f0d98a, #c9a84c)' }}
              animate={indicatorStyle}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />

            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                onMouseEnter={e => updateIndicator(e.currentTarget)}
                onMouseLeave={() => {
                  const active_el = navRef.current?.querySelector(`[data-active="true"]`) as HTMLButtonElement | null;
                  if (active_el) updateIndicator(active_el);
                }}
                data-active={active === link.href}
                className={`
                  relative px-2.5 xl:px-3 2xl:px-4 3xl:px-5 4xl:px-6
                  py-1.5 xl:py-2
                  font-sans font-medium tracking-wide
                  text-xs xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl
                  rounded-md
                  transition-all duration-300 ease-out
                  ${scrolled
                    ? active === link.href
                      ? 'text-gold-600'
                      : 'text-stone-600 hover:text-stone-900'
                    : active === link.href
                      ? 'text-amber-300'
                      : 'text-white/80 hover:text-white'
                  }
                `}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ══ DESKTOP CTA ══════════════════════════════════════ */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 2xl:gap-5 3xl:gap-6 flex-shrink-0">
            {/* Phone */}
            <a
              href="tel:+1234567890"
              className={`
                flex items-center gap-1.5 xl:gap-2
                text-xs xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl
                font-sans font-medium whitespace-nowrap
                transition-colors duration-300
                ${scrolled ? 'text-stone-600 hover:text-gold-600' : 'text-white/80 hover:text-amber-300'}
              `}
            >
              <Phone size={14} className="flex-shrink-0 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5" />
              <span className="hidden 2xl:inline">+1 234 567 890</span>
            </a>

            {/* Divider */}
            <div className={`h-5 2xl:h-6 w-px transition-colors duration-300 ${scrolled ? 'bg-stone-200' : 'bg-white/20'}`} />

            {/* Book Now CTA */}
            <button
              onClick={() => handleNav('#contact')}
              className={`
                relative overflow-hidden
                px-5 xl:px-6 2xl:px-8 3xl:px-10 4xl:px-12
                py-2 xl:py-2.5 2xl:py-3 3xl:py-3.5 4xl:py-4
                rounded-full
                text-xs xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl
                font-sans font-semibold tracking-wider
                transition-all duration-400
                group
                ${scrolled
                  ? 'bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 bg-[length:200%_100%] text-white shadow-gold-sm hover:shadow-gold hover:bg-right-center hover:-translate-y-0.5'
                  : 'bg-white/10 border border-white/30 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5'
                }
              `}
              style={scrolled ? {
                background: 'linear-gradient(135deg, #c9a84c 0%, #f0d98a 50%, #c9a84c 100%)',
                backgroundSize: '200% auto',
              } : undefined}
            >
              <span className="relative z-10">Book Now</span>
            </button>
          </div>

          {/* ══ MOBILE TOGGLE ═══════════════════════════════════ */}
          <button
            onClick={() => setMobile(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={`
              lg:hidden
              flex items-center justify-center
              w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12
              rounded-full
              transition-all duration-300
              flex-shrink-0 relative z-10
              ${mobileOpen
                ? scrolled
                  ? 'bg-gold-100 text-gold-700'
                  : 'bg-white/20 text-white'
                : scrolled
                  ? 'text-stone-700 hover:bg-stone-100'
                  : 'text-white hover:bg-white/15'
              }
            `}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} className="sm:w-5 sm:h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} className="sm:w-5 sm:h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ════════════════════════════════════════════════
          MOBILE DRAWER OVERLAY
      ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobile(false)}
              className="fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-sm"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className="
                fixed top-0 right-0 bottom-0 z-50
                w-[85vw] max-w-sm sm:max-w-md
                flex flex-col
                bg-white
                shadow-[−4px_0_60px_rgba(0,0,0,0.15)]
                overflow-y-auto
              "
            >
              {/* Drawer header */}
              <div className="
                flex items-center justify-between
                px-6 sm:px-8
                pt-5 sm:pt-6
                pb-4 sm:pb-5
                border-b border-cream-200
              ">
                {/* Mini logo in drawer */}
                <button
                  onClick={() => handleNav('#hero')}
                  className="flex items-center gap-2.5 group"
                >
                  <img
                    src="/logo1.png"
                    alt="Roya"
                    className="w-10 sm:w-12 h-10 sm:h-12 object-contain"
                  />
                  <div className="flex flex-col leading-none">
                    <span className="font-serif font-semibold tracking-[0.1em] uppercase text-xl sm:text-2xl text-stone-900">
                      Roya
                    </span>
                    <span className="font-sans font-medium tracking-[0.3em] uppercase text-[0.48rem] sm:text-[0.55rem] text-gold-600 mt-0.5">
                      Tourism
                    </span>
                  </div>
                </button>

                {/* Close btn */}
                <button
                  onClick={() => setMobile(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-1 sm:gap-1.5">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => handleNav(link.href)}
                    className={`
                      w-full text-left
                      flex items-center justify-between
                      px-4 sm:px-5 py-3.5 sm:py-4
                      rounded-xl sm:rounded-2xl
                      font-serif font-medium
                      text-lg xs:text-xl sm:text-2xl
                      tracking-wide
                      transition-all duration-200
                      group
                      ${active === link.href
                        ? 'bg-gradient-to-r from-gold-50 to-amber-50 text-gold-700 border border-gold-200/60'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-transparent'
                      }
                    `}
                  >
                    <span>{link.label}</span>
                    {active === link.href && (
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold-500 flex-shrink-0" />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Drawer footer CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="px-4 sm:px-6 pb-8 sm:pb-10 pt-2 space-y-3 sm:space-y-4"
              >
                {/* Divider */}
                <div className="h-px w-full bg-cream-200" />

                {/* Phone */}
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:text-gold-600 hover:bg-gold-50 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-gold-600" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-sans text-stone-400 tracking-wide">Call us</span>
                    <span className="font-sans font-medium text-sm sm:text-base">+1 234 567 890</span>
                  </div>
                </a>

                {/* Book Now */}
                <button
                  onClick={() => handleNav('#contact')}
                  className="
                    w-full py-3.5 sm:py-4 rounded-2xl
                    font-sans font-semibold tracking-widest uppercase
                    text-sm sm:text-base text-white
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_12px_40px_rgba(201,168,76,0.45)]
                  "
                  style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d98a 50%, #c9a84c 100%)', backgroundSize: '200% auto' }}
                >
                  Book Now
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
