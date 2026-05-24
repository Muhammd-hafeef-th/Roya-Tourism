import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

/* ─── Nav link data ────────────────────────────────────────────── */
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Umrah & Hajj", href: "#umrah" },
  { label: "International Packages", href: "#packages" },
  { label: "Domestic Packages", href: "#domestic" },
  { label: "Contact", href: "#contact" },
];

/* ─── Scroll threshold helper ─────────────────────────────────── */
function useScrolled(threshold: number | (() => number)) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const h = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const limit =
            typeof threshold === "function" ? threshold() : threshold;
          const isScrolled = window.scrollY > limit;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    h(); // Initial check
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [threshold]);

  return scrolled;
}

export default function Navbar({
  startAnimation = true,
}: {
  startAnimation?: boolean;
}) {
  const scrolled = useScrolled(() => {
    const hero = document.getElementById("hero");
    return hero ? hero.offsetHeight - 120 : 80;
  });
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // If not on home page, ALWAYS act as if scrolled to maintain solid background and dark text.
  const isSolid = scrolled || !isHome;

  const [active, setActive] = useState("#hero");
  const [mobileOpen, setMobile] = useState(false);
  const [indicatorStyle, setIndicator] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  /* ── Close mobile menu on resize to desktop ── */
  useEffect(() => {
    const r = () => {
      if (window.innerWidth >= 1024) setMobile(false);
    };
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);

  /* ── Body scroll lock when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ── Smooth scroll + active tracking ── */
  const handleNav = (href: string) => {
    setActive(href);
    setMobile(false);
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If we are on the International Trips page, use react-router to go back to home + hash
      navigate("/" + href);
    }
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
        animate={
          startAnimation ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          ${
            isSolid
              ? "bg-white/95 backdrop-blur-xl border-b border-[#c9a84c]/20 shadow-[0_4px_32px_rgba(201,168,76,0.10)]"
              : "bg-transparent border-b border-white/10"
          }
        `}
      >
        {/* ── Top luxury accent line ── */}
        <div
          className={`h-[2px] w-full transition-opacity duration-500 ${isSolid ? "opacity-100" : "opacity-0"}`}
          style={{
            background:
              "linear-gradient(90deg, transparent, #c9a84c 30%, #f0d98a 50%, #c9a84c 70%, transparent)",
          }}
        />

        {/* ── Inner container ── */}
        <div
          className="
          max-w-[1920px] mx-auto
          px-4 xs:px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 3xl:px-28 4xl:px-36
          flex items-center justify-between
          h-16 xs:h-[4.25rem] sm:h-20 md:h-20 lg:h-[4.75rem] xl:h-20 2xl:h-24 3xl:h-28 4xl:h-32
        "
        >
          {/* ══ LOGO ════════════════════════════════════════════ */}
          <button
            onClick={() => handleNav("#hero")}
            className="flex items-center gap-2 sm:gap-3 group flex-shrink-0 relative z-10 text-left"
            aria-label="Roya Global Tourism – back to top"
          >
            <div className="relative flex-shrink-0">
              <a
                href="#hero"
                className="group relative flex items-center justify-center py-2 pr-3"
              >
                <img
                  src="/logo1.png"
                  alt="Roya Global Tourism logo"
                  className={`relative z-10 w-auto object-contain h-12 sm:h-14 lg:h-[64px] max-w-[170px] sm:max-w-[200px] lg:max-w-[230px] transition-all duration-300 ${!isSolid ? "drop-shadow-[0_4px_14px_rgba(201,168,76,0.22)]" : ""}`}
                />

                {!isSolid && (
                  <>
                    <div className="pointer-events-none absolute inset-x-2 bottom-1 h-[26px] bg-[radial-gradient(circle,rgba(201,168,76,0.18)_0%,rgba(201,168,76,0.05)_40%,rgba(201,168,76,0)_78%)] blur-md" />
                    <div className="pointer-events-none absolute -bottom-[2px] left-1/2 h-[1px] w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-90" />
                  </>
                )}
              </a>
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
              style={{
                background: "linear-gradient(90deg, #c9a84c, #f0d98a, #c9a84c)",
              }}
              animate={indicatorStyle}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />

            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                onMouseEnter={(e) => updateIndicator(e.currentTarget)}
                onMouseLeave={() => {
                  const active_el = navRef.current?.querySelector(
                    `[data-active="true"]`,
                  ) as HTMLButtonElement | null;
                  if (active_el) updateIndicator(active_el);
                }}
                data-active={active === link.href && isHome}
                className={`
                  relative px-2.5 xl:px-3 2xl:px-4 3xl:px-5 4xl:px-6
                  py-1.5 xl:py-2
                  font-sans font-medium tracking-wide
                  text-xs xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl
                  rounded-md
                  transition-all duration-300 ease-out transform-gpu
                  whitespace-nowrap flex items-center justify-center leading-none
                  hover:-translate-y-0.5
                  ${
                    isSolid
                      ? active === link.href && isHome
                        ? "text-[#c9a84c]"
                        : "text-stone-600 hover:text-stone-900"
                      : active === link.href && isHome
                        ? "text-[#f0d98a]"
                        : "text-white/80 hover:text-white"
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
              href="tel:+918136812345"
              className={`
                flex items-center gap-1.5 xl:gap-2
                text-xs xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl
                font-sans font-medium whitespace-nowrap
                transition-colors duration-300
                ${isSolid ? "text-stone-600 hover:text-[#c9a84c]" : "text-white/80 hover:text-[#f0d98a]"}
              `}
            >
              <Phone
                size={14}
                className="flex-shrink-0 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5"
              />
              <span className="hidden 2xl:inline">+91 81368 12345</span>
            </a>

            {/* Divider */}
            <div
              className={`h-5 2xl:h-6 w-px transition-colors duration-300 ${isSolid ? "bg-stone-200" : "bg-white/20"}`}
            />

            {/* Book Now CTA */}
            <button
              onClick={() => handleNav("#contact")}
              className={`
                relative overflow-hidden
                px-5 xl:px-6 2xl:px-8 3xl:px-10 4xl:px-12
                py-2 xl:py-2.5 2xl:py-3 3xl:py-3.5 4xl:py-4
                rounded-full
                text-xs xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl
                font-sans font-semibold tracking-wider
                transition-all duration-400
                group
                ${
                  isSolid
                    ? "bg-gradient-to-r from-[#c9a84c] via-[#e8c97a] to-[#c9a84c] bg-[length:200%_100%] text-white shadow-[0_4px_15px_rgba(201,168,76,0.3)] hover:shadow-[0_8px_25px_rgba(201,168,76,0.5)] hover:bg-right-center hover:-translate-y-0.5"
                    : "bg-white/10 border border-white/30 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5"
                }
              `}
              style={
                isSolid
                  ? {
                      background:
                        "linear-gradient(135deg, #c9a84c 0%, #f0d98a 50%, #c9a84c 100%)",
                      backgroundSize: "200% auto",
                    }
                  : undefined
              }
            >
              <span className="relative z-10">Book Now</span>
            </button>
          </div>

          {/* ══ MOBILE TOGGLE ═══════════════════════════════════ */}
          <button
            onClick={() => setMobile(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className={`
              lg:hidden
              flex items-center justify-center
              w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12
              rounded-full
              transition-all duration-300
              flex-shrink-0 relative z-10
              ${
                mobileOpen
                  ? isSolid
                    ? "bg-[#c9a84c]/10 text-[#c9a84c]"
                    : "bg-white/20 text-white"
                  : isSolid
                    ? "text-stone-700 hover:bg-stone-100"
                    : "text-white hover:bg-white/15"
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="
                fixed top-0 right-0 bottom-0 z-50
                w-[85vw] max-w-sm sm:max-w-md
                flex flex-col
                bg-white
                shadow-[-4px_0_60px_rgba(0,0,0,0.15)]
                overflow-y-auto
              "
            >
              {/* Drawer header */}
              <div
                className="
                flex items-center justify-between
                px-6 sm:px-8
                pt-5 sm:pt-6
                pb-4 sm:pb-5
                border-b border-[#faf9f7]
              "
              >
                {/* Mini logo in drawer */}
                <button
                  onClick={() => handleNav("#hero")}
                  className="group relative flex items-center text-left transition-all duration-300 focus:outline-none"
                  aria-label="Roya Global Tourism – back to top"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src="/logo1.png"
                      alt="Roya"
                      className="relative z-10 w-auto object-contain h-12 sm:h-14 lg:h-[64px] max-w-[160px] sm:max-w-[185px] lg:max-w-[210px] transition-all duration-300 group-hover:scale-[1.03] drop-shadow-[0_4px_14px_rgba(201,168,76,0.16)]"
                    />

                    <div className="pointer-events-none absolute inset-x-2 bottom-1 h-[22px] bg-[radial-gradient(circle,rgba(201,168,76,0.16)_0%,rgba(201,168,76,0.05)_40%,rgba(201,168,76,0)_78%)] blur-md" />
                    <div className="pointer-events-none absolute -bottom-[2px] left-1/2 h-[1px] w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-90" />
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
                {navLinks.map((link) => (
                  <button
                    key={link.href}
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
                      ${
                        active === link.href && isHome
                          ? "bg-gradient-to-r from-[#c9a84c]/5 to-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30"
                          : "text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-transparent"
                      }
                    `}
                  >
                    <span>{link.label}</span>
                    {active === link.href && isHome && (
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#c9a84c] flex-shrink-0" />
                    )}
                  </button>
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
                <div className="h-px w-full bg-[#faf9f7]" />

                {/* Phone */}
                <a
                  href="tel:+918136812345"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[#c9a84c]" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-sans text-stone-400 tracking-wide">
                      Call us
                    </span>
                    <span className="font-sans font-medium text-sm sm:text-base">
                      +91 81368 12345
                    </span>
                  </div>
                </a>

                {/* Book Now */}
                <button
                  onClick={() => handleNav("#contact")}
                  className="
                    w-full py-3.5 sm:py-4 rounded-2xl
                    font-sans font-semibold tracking-widest uppercase
                    text-sm sm:text-base text-white
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_12px_40px_rgba(201,168,76,0.45)]
                  "
                  style={{
                    background:
                      "linear-gradient(135deg, #c9a84c 0%, #f0d98a 50%, #c9a84c 100%)",
                    backgroundSize: "200% auto",
                  }}
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
