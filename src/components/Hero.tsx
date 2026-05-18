import { useRef, useEffect, useState } from 'react';
import {
  motion, useScroll, useTransform, useSpring, useMotionValue, animate,
} from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const WORDS = ['Journey', 'Beyond', 'Horizons'];

/* Breakpoint thresholds */
const BP = { sm: 640, md: 768, lg: 1024, xl: 1280, tv: 1920 };

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [vw, setVw] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const upd = () => setVw(window.innerWidth);
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);

  useEffect(() => { videoRef.current?.play().catch(() => { }); }, []);

  const isMobile = vw < BP.sm;
  const isTablet = vw >= BP.sm && vw < BP.lg;
  const isTV = vw >= BP.tv;

  /* Section height: taller on bigger screens for more scroll travel */
  const sectionH = isMobile ? '160vh' : isTablet ? '180vh' : isTV ? '220vh' : '200vh';

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 52, damping: 20, restDelta: 0.001 });

  /* ── VIDEO: gentle on mobile, full cinematic on desktop/TV ── */
  const vidScaleEnd = isMobile ? 1.07 : isTablet ? 1.14 : isTV ? 1.32 : 1.26;
  const vidYEnd = isMobile ? -20 : isTablet ? -40 : isTV ? -90 : -70;
  const vidScale = useTransform(p, [0, 1], [1, vidScaleEnd]);
  const vidY = useTransform(p, [0, 1], [0, vidYEnd]);

  /* ── FOG ── */
  const fogY = useTransform(p, [0, 1], [0, -50]);
  const fogOp = useTransform(p, [0, 0.3, 0.65, 0.9], [0.12, 0.28, 0.32, 0.08]);
  const fogX = useTransform(p, [0, 0.5, 1], [-10, 18, -6]);

  /* ── RAYS ── */
  const raysY = useTransform(p, [0, 1], [0, -50]);
  const raysOp = useTransform(p, [0, 0.15, 0.6, 0.88], [0, 0.65, 0.5, 0]);
  const raysSc = useTransform(p, [0, 1], [0.88, 1.15]);

  /* ── OVERLAY ── */
  const overOp = useTransform(p, [0, 0.5, 0.85, 1], [0.42, 0.55, 0.78, 0.96]);

  /* ── GLOW ── */
  const glowY = useTransform(p, [0, 1], [0, -28]);
  const glowOp = useTransform(p, [0, 0.3, 0.7, 0.9], [0.18, 0.32, 0.22, 0]);

  /* ── TEXT ── */
  const textY = useTransform(p, [0, 0.55, 0.75], ['0%', '-7%', '-16%']);
  const textOp = useTransform(p, [0, 0.38, 0.65, 0.8], [1, 1, 0.35, 0]);
  const textSc = useTransform(p, [0, 0.65], [1, 0.92]);
  const textFilter = useTransform(p, [0.5, 0.72], ['blur(0px)', 'blur(9px)']);

  /* ── CTA ── */
  const ctaY = useTransform(p, [0, 0.5, 0.72], ['0%', '-3%', '-12%']);
  const ctaOp = useTransform(p, [0, 0.32, 0.6, 0.75], [1, 1, 0.45, 0]);

  /* ── TRANSITION ── */
  const transOp = useTransform(p, [0.8, 1], [0, 1]);
  const scrollFade = useTransform(p, [0, 0.09], [1, 0]);

  /* ── CURSOR PARALLAX (desktop only) ── */
  const curX = useMotionValue(0);
  const curY = useMotionValue(0);
  const prlX = useSpring(curX, { stiffness: 32, damping: 18 });

  useEffect(() => {
    if (isMobile || isTablet) return;
    const fn = (e: MouseEvent) => {
      animate(curX, (e.clientX / window.innerWidth - 0.5) * 24, { duration: 1, ease: 'easeOut' });
      animate(curY, (e.clientY / window.innerHeight - 0.5) * 15, { duration: 1, ease: 'easeOut' });
    };
    window.addEventListener('mousemove', fn, { passive: true });
    return () => window.removeEventListener('mousemove', fn);
  }, [isMobile, isTablet]);

  /* ── Responsive sizes ── */
  const headlineSize = isMobile
    ? 'clamp(2.2rem, 11vw, 3rem)'
    : isTablet
      ? 'clamp(3rem, 7.5vw, 5rem)'
      : isTV
        ? 'clamp(6rem, 6vw, 10rem)'
        : 'clamp(3.8rem, 6.5vw, 7.5rem)';

  const subSize = isMobile
    ? 'clamp(0.78rem, 3.8vw, 0.95rem)'
    : isTablet
      ? 'clamp(0.9rem, 2vw, 1.1rem)'
      : isTV
        ? 'clamp(1.2rem, 1.2vw, 1.6rem)'
        : 'clamp(0.9rem, 1.3vw, 1.1rem)';

  const eyebrowSize = isMobile ? '0.55rem' : isTV ? '0.9rem' : '0.62rem';
  const eyebrowTracking = isMobile ? '0.3em' : '0.42em';

  const btnPx = isMobile ? 'px-6' : isTV ? 'px-14' : 'px-10';
  const btnPy = isMobile ? 'py-3.5' : isTV ? 'py-6' : 'py-4';
  const btnText = isMobile
    ? 'text-[0.62rem]'
    : isTV
      ? 'text-[0.85rem]'
      : 'text-[0.68rem] sm:text-[0.72rem]';

  const contentPx = isMobile ? 'px-5' : isTablet ? 'px-8' : isTV ? 'px-24' : 'px-10';
  const maxW = isTV ? 'max-w-7xl' : 'max-w-4xl';
  const mbEyebrow = isMobile ? 'mb-5' : isTV ? 'mb-12' : 'mb-7';
  const mbHeadline = isMobile ? 'mb-3' : isTV ? 'mb-8' : 'mb-4';
  const mbDivider = isMobile ? 'mb-4' : isTV ? 'mb-10' : 'mb-7';
  const mbSub = isMobile ? 'mb-8' : isTV ? 'mb-16' : 'mb-11';

  return (
    <section id="hero" ref={containerRef} className="relative w-full bg-stone-950" style={{ height: sectionH }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ══ L1: VIDEO ══ */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: vidScale, y: vidY, x: isMobile || isTablet ? 0 : prlX, willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        >
          <video ref={videoRef}
            className="w-full h-full object-cover object-center"
            style={{ transform: 'translateZ(0)', willChange: 'transform', backfaceVisibility: 'hidden' }}
            autoPlay muted loop playsInline preload="auto"
            onCanPlayThrough={() => setVideoReady(true)}
          >
            <source src="/videos/hero-image-roya.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* ══ L2: FOG ══ */}
        <motion.div className="absolute inset-0 pointer-events-none z-[3]"
          style={{ y: fogY, x: fogX, opacity: fogOp, willChange: 'transform, opacity' }}>
          <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-white/15 via-white/8 to-transparent blur-[35px]" />
          <div className="absolute top-[28%] -left-[8%] w-[120%] h-[22%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[55px] animate-floating-fog" />
          <div className="absolute top-[52%] left-[8%] w-[88%] h-[18%] bg-gradient-to-r from-transparent via-stone-100/8 to-transparent blur-[45px] animate-floating-fog"
            style={{ animationDelay: '-7s', animationDuration: '20s' }} />
        </motion.div>

        {/* ══ L3: LIGHT RAYS ══ */}
        <motion.div className="absolute inset-0 pointer-events-none z-[4] overflow-hidden"
          style={{ y: raysY, scale: raysSc, opacity: raysOp, willChange: 'transform, opacity' }}>
          <div className="absolute inset-0" style={{
            background: 'conic-gradient(from 260deg at 70% 0%, transparent 0deg, rgba(253,224,71,0.08) 8deg, transparent 18deg, transparent 26deg, rgba(251,191,36,0.06) 34deg, transparent 44deg, rgba(253,224,71,0.05) 54deg, transparent 65deg)',
          }} />
          <div className="absolute top-[3%] right-[18%] rounded-full" style={{
            width: isTV ? '700px' : '480px', height: isTV ? '700px' : '480px',
            background: 'radial-gradient(circle, rgba(253,224,71,0.22) 0%, rgba(251,191,36,0.12) 28%, rgba(255,140,0,0.05) 55%, transparent 75%)',
            filter: 'blur(18px)',
          }} />
          <div className="absolute top-0 right-0 w-[42%] h-[55%]" style={{
            background: 'linear-gradient(225deg, rgba(253,224,71,0.14) 0%, rgba(251,191,36,0.06) 35%, transparent 65%)',
            filter: 'blur(12px)',
          }} />
        </motion.div>

        {/* ══ L4: CINEMATIC OVERLAYS ══ */}
        <div className="absolute inset-0 z-[5] pointer-events-none">
          <motion.div className="absolute top-0 left-0 right-0 h-52 bg-gradient-to-b from-black/78 via-black/30 to-transparent" style={{ opacity: overOp }} />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-transparent to-black/22" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 32%, rgba(0,0,0,0.52) 100%)' }} />
          <motion.div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/8 to-stone-950/55" style={{ opacity: overOp }} />
        </div>

        {/* ══ L5: FOREGROUND GLOW ══ */}
        <motion.div className="absolute inset-0 pointer-events-none z-[6]"
          style={{ y: glowY, opacity: glowOp, willChange: 'transform, opacity' }}>
          <div className="absolute bottom-[12%] left-[18%] right-[18%] h-[32%] rounded-full" style={{
            background: 'radial-gradient(ellipse, rgba(251,191,36,0.18) 0%, rgba(255,140,0,0.09) 42%, transparent 72%)',
            filter: 'blur(45px)',
          }} />
        </motion.div>

        {/* ══ L6: LIGHT DUST PARTICLES ══ */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none z-[7] overflow-hidden">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <motion.div key={i} className="absolute rounded-full"
                style={{
                  width: `${1.5 + (i % 3) * 0.8}px`, height: `${1.5 + (i % 3) * 0.8}px`,
                  left: `${12 + i * 13}%`, top: `${20 + (i % 4) * 16}%`,
                  background: 'rgba(251,219,147,0.55)', filter: 'blur(0.4px)',
                }}
                animate={{ y: [-10, 10, -10], opacity: [0, 0.8, 0], x: [-4, 4, -4] }}
                transition={{ duration: 4.5 + i * 1.1, delay: i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
        )}

        {/* ══ L7: TYPOGRAPHY ══ */}
        <motion.div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none ${contentPx}`}
          style={{ y: textY, opacity: textOp, scale: textSc, filter: textFilter, willChange: 'transform, opacity, filter', transform: 'translateZ(0)' }}
        >
          <div className={`text-center ${maxW} mx-auto w-full pointer-events-auto`}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center justify-center gap-2 sm:gap-3 ${mbEyebrow}`}
            >
              <span className="h-px w-6 sm:w-10 lg:w-14 bg-gradient-to-r from-transparent to-amber-400/75" />
              <span className="font-sans font-medium uppercase text-amber-300/85"
                style={{ fontSize: eyebrowSize, letterSpacing: eyebrowTracking }}>
                Roya Tourism · Luxury Travel
              </span>
              <span className="h-px w-6 sm:w-10 lg:w-14 bg-gradient-to-l from-transparent to-amber-400/75" />
            </motion.div>

            {/* Headline */}
            <div className={mbHeadline}>
              <div className="font-serif font-light text-white leading-[1.02] tracking-tight"
                style={{ fontSize: headlineSize }}>
                {WORDS.map((word, i) => (
                  <motion.span key={word}
                    className="inline-block mr-[0.18em] last:mr-0"
                    initial={{ opacity: 0, y: 35, filter: 'blur(16px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.6, delay: 0.28 + i * 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {i === 2 ? (
                      <span className="italic" style={{
                        background: 'linear-gradient(115deg, #fde68a 0%, #fef3c7 32%, #fbbf24 56%, #fde68a 100%)',
                        backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        animation: 'shimmer 6s linear infinite',
                      }}>{word}</span>
                    ) : word}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className={`h-px bg-gradient-to-r from-transparent via-amber-400/65 to-transparent mx-auto ${mbDivider}`}
              style={{ width: isTV ? '6rem' : isMobile ? '3.5rem' : '5rem' }}
            />

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.7, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
              className={`font-sans font-light text-white/70 mx-auto ${mbSub} leading-[1.82] tracking-wide`}
              style={{
                fontSize: subSize,
                maxWidth: isTV ? '52rem' : isMobile ? '22rem' : '36rem',
              }}
            >
              Luxury experiences crafted through unforgettable destinations,{' '}
              <span className="text-white/90">spiritual journeys</span>, and{' '}
              <span className="text-amber-200/80">timeless adventures</span>.
            </motion.p>

            {/* CTA — FIXED: stack on mobile, row on sm+ */}
            <motion.div style={{ y: ctaY, opacity: ctaOp, willChange: 'transform, opacity' }}>
              <motion.div
                initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center"
              >
                {/* Primary */}
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`group relative ${btnPx} ${btnPy} rounded-full font-sans overflow-hidden transition-shadow duration-500 hover:shadow-[0_22px_65px_rgba(251,191,36,0.48)] w-full sm:w-auto`}
                  style={{ willChange: 'transform', minWidth: isMobile ? 'auto' : isTV ? '280px' : '210px' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 border border-white/20" />
                  <div className="absolute inset-0 bg-amber-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className={`relative z-10 flex items-center justify-center gap-2 text-stone-900 font-semibold tracking-[0.2em] uppercase ${btnText}`}>
                    Begin Your Journey
                    <ArrowRight size={isMobile ? 12 : 14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>

                {/* Secondary */}
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`group relative ${btnPx} ${btnPy} rounded-full font-sans text-white w-full sm:w-auto`}
                  style={{ willChange: 'transform', minWidth: isMobile ? 'auto' : isTV ? '280px' : '210px' }}
                >
                  <div className="absolute inset-0 rounded-full bg-white/8 backdrop-blur-2xl border border-white/20 group-hover:border-amber-400/40 group-hover:bg-white/14 transition-all duration-500" />
                  <span className={`relative z-10 font-semibold tracking-[0.2em] uppercase ${btnText}`}>
                    Explore Journeys
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
            style={{ opacity: scrollFade, pointerEvents: 'none' }}
          >
            <span className="text-white/40 font-sans font-light uppercase tracking-[0.3em]"
              style={{ fontSize: isMobile ? '0.5rem' : '0.55rem' }}>
              Scroll to explore
            </span>
            <motion.div
              className="w-px h-8 sm:h-10 bg-gradient-to-b from-white/45 to-transparent"
              animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </motion.div>
        </motion.div>

        {/* ══ SECTION TRANSITION ══ */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-56 z-[15] pointer-events-none"
          style={{ opacity: transOp, background: 'linear-gradient(to top, #faf9f7 0%, rgba(250,249,247,0.75) 38%, transparent 100%)' }}
        />

        {/* Loading overlay */}
        {!videoReady && (
          <div className="absolute inset-0 z-[25] bg-stone-950 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-amber-400/22 border-t-amber-400 animate-spin" />
              <span className="text-white/28 font-sans uppercase tracking-[0.32em]"
                style={{ fontSize: '0.62rem' }}>Loading Experience</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
