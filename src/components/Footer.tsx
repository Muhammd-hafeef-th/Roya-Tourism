import {
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleNav = useCallback(
    (href: string) => {
      // Normalize incoming hrefs
      if (!href) return;
      if (href.startsWith("/")) {
        navigate(href);
        return;
      }

      const anchor = href.startsWith("#") ? href : `#${href}`;

      if (isHome) {
        const el = document.querySelector(anchor) as HTMLElement | null;
        if (el) {
          try {
            el.scrollIntoView({ behavior: "smooth" });
            el.focus({ preventScroll: true });
          } catch {
            el.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }

        // Retry a few times if element isn't immediately available (SPA routing timing)
        let attempts = 0;
        const retry = () => {
          const el2 = document.querySelector(anchor) as HTMLElement | null;
          if (el2) {
            try {
              el2.scrollIntoView({ behavior: "smooth" });
              el2.focus({ preventScroll: true });
            } catch {
              el2.scrollIntoView({ behavior: "smooth" });
            }
          } else if (attempts < 10) {
            attempts += 1;
            window.setTimeout(retry, 150);
          }
        };
        retry();
      } else {
        // navigate to home with hash
        navigate("/" + anchor);
      }
    },
    [isHome, navigate],
  );

  return (
    <footer className="bg-stone-950 relative overflow-hidden pt-20 pb-10 lg:pt-28 lg:pb-12 border-t border-stone-800">
      {/* Giant Watermark Background */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-serif font-bold text-white/[0.02] whitespace-nowrap select-none pointer-events-none tracking-tighter">
        ROYA
      </div>

      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[300px] bg-gradient-to-b from-[#c9a84c]/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="container-responsive max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand Column (Spans 4) */}
          <div className="lg:col-span-4 lg:pr-12">
            <button
              type="button"
              onClick={() => handleNav("#hero")}
              className="group relative flex items-center justify-start mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c9a84c]/60"
              aria-label="Roya Global Tourism – back to top"
            >
              <div className="relative flex-shrink-0">
                <img
                  src="/logo1.png"
                  alt="Roya Global Tourism"
                  className="relative z-10 w-auto object-contain h-14 sm:h-16 lg:h-[72px] max-w-[180px] sm:max-w-[210px] lg:max-w-[240px] transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-0.5 drop-shadow-[0_4px_14px_rgba(201,168,76,0.16)]"
                />

                <div className="pointer-events-none absolute inset-x-3 bottom-1 h-[24px] bg-[radial-gradient(circle,rgba(201,168,76,0.16)_0%,rgba(201,168,76,0.05)_42%,rgba(201,168,76,0)_78%)] blur-md" />
                <div className="pointer-events-none absolute -bottom-[2px] left-1/2 h-[1px] w-[74%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-90" />
              </div>
            </button>
            <p className="font-sans text-sm sm:text-base text-white/50 leading-relaxed mb-8 max-w-sm">
              Crafting extraordinary journeys across the globe. From sacred
              spiritual experiences to unparalleled luxury getaways — your world
              awaits.
            </p>
            <div className="flex items-center gap-3">
              {useMemo(
                () =>
                  [
                    { Icon: Instagram, href: "https://www.instagram.com/royaglobal.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", label: "Instagram" },
                    { Icon: Facebook, href: "https://www.facebook.com/share/1CiwwfpBcV/?mibextid=wwXIfr", label: "Facebook" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      onClick={(e) => {
                        if (s.href === "#") {
                          e.preventDefault(); /* no-op placeholder */
                        }
                      }}
                      className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-stone-900 hover:bg-[#c9a84c] hover:border-[#c9a84c] transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c9a84c]/40"
                    >
                      <s.Icon size={18} />
                    </a>
                  )),
                [],
              )}
            </div>
          </div>

          {/* Spacer for desktop */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links 1 (Spans 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold tracking-[0.25em] uppercase text-white mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-[#c9a84c]/50"></span> Journeys
            </h4>
            <ul className="space-y-4">
              {useMemo(
                () => [
                  { label: "Umrah Packages", href: "#umrah" },
                  { label: "Domestic Escapes", href: "#domestic" },
                  { label: "Global Escapes", href: "#packages" },
                  { label: "Oman Signature", href: "/international-trips" },
                  { label: "India Getaways", href: "/domestic-trips" },
                ],
                [],
              ).map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c9a84c]/40"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 (Spans 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold tracking-[0.25em] uppercase text-white mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-[#c9a84c]/50"></span> Company
            </h4>
            <ul className="space-y-4">
              {useMemo(
                () => [
                  { label: "About Roya", href: "#about" },
                  { label: "Contact Us", href: "#contact" },
                  { label: "Privacy Policy", href: "#" },
                ],
                [],
              ).map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c9a84c]/40"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (Spans 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-bold tracking-[0.25em] uppercase text-white mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-[#c9a84c]/50"></span> Get in Touch
            </h4>
            <div className="space-y-6">
              <a
                href="tel:+918136812345"
                className="flex items-start gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c9a84c]/40"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#c9a84c]/20 transition-colors">
                  <Phone size={16} className="text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                    Call Us
                  </p>
                  <p className="text-sm sm:text-base font-medium text-white/80 group-hover:text-white transition-colors">
                    +91 81368 12345
                  </p>
                </div>
              </a>
              <a
                href="mailto:royaglobal01@gmail.com"
                className="flex items-start gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c9a84c]/40"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#c9a84c]/20 transition-colors">
                  <Mail size={16} className="text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                    Email Us
                  </p>
                  <p className="text-sm sm:text-base font-medium text-white/80 group-hover:text-white transition-colors">
                    royaglobal01@gmail.com
                  </p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                    Regions We Serve
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    India, Oman, UAE,
                    <br />
                    Saudi Arabia, UK
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40 tracking-wider">
            © {new Date().getFullYear()} Roya Global Tourism. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-white/40 hover:text-[#c9a84c] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-white/40 hover:text-[#c9a84c] transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
