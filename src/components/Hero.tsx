import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
} from 'framer-motion';
import { ChevronDown, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  /* ─── Detect breakpoints ─── */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ─── Ensure video plays on all devices ─── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  /* ──────────────────────────────────────────
     SCROLL TRACKING
     Track scroll within the 180vh container
  ────────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* Spring-smooth progress for buttery feel */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  });

  /* ──────────────────────────────────────────
     LAYER 1 — VIDEO
     Desktop: scale 1 → 1.12 (cinematic zoom)
     Mobile:  scale 1 → 1.04 (preserve clarity)
  ────────────────────────────────────────── */
  const videoScaleDesktop = useTransform(smoothProgress, [0, 0.7], [1, 1.12]);
  const videoScaleMobile  = useTransform(smoothProgress, [0, 0.7], [1, 1.04]);
  const videoY            = useTransform(smoothProgress, [0, 1],   [0, -40]);
  const videoOpacity      = useTransform(smoothProgress, [0.72, 0.88], [1, 0]);

  /* ──────────────────────────────────────────
     LAYER 2 — GRADIENT OVERLAYS
  ────────────────────────────────────────── */
  const darkOverlayOpacity  = useTransform(smoothProgress, [0, 0.5, 0.8], [0.55, 0.72, 0.9]);
  const blurOverlayOpacity  = useTransform(smoothProgress, [0.45, 0.78], [0, 1]);

  /* ──────────────────────────────────────────
     LAYER 3 — GLOW ORBS (floating parallax)
  ────────────────────────────────────────── */
  const glowY = useTransform(smoothProgress, [0, 1], [0, -80]);
  const glowX = useTransform(smoothProgress, [0, 0.5, 1], [0, 15, -15]);

  /* ──────────────────────────────────────────
     LAYER 4 — FOG / ATMOSPHERIC
  ────────────────────────────────────────── */
  const fogY      = useTransform(smoothProgress, [0, 0.8], [0, -50]);
  const fogOpacity= useTransform(smoothProgress, [0, 0.6], [0.18, 0.06]);

  /* ──────────────────────────────────────────
     LAYER 5 — TYPOGRAPHY
     Heading: fade + blur-in → slow upward exit
     Sub:     delayed fade → softer motion
  ────────────────────────────────────────── */
  const textOpacity  = useTransform(smoothProgress, [0, 0.38, 0.62], [1, 1, 0]);
  const textY        = useTransform(smoothProgress, [0, 0.62], ['0%', '-8%']);
  const textScale    = useTransform(smoothProgress, [0, 0.62], [1, 0.95]);

  /* ──────────────────────────────────────────
     LAYER 6 — CTA BUTTONS (slowest layer)
  ────────────────────────────────────────── */
  const ctaY      = useTransform(smoothProgress, [0, 0.55], ['0%', '-5%']);
  const ctaOpacity= useTransform(smoothProgress, [0, 0.32, 0.58], [1, 1, 0]);

  /* ──────────────────────────────────────────
     AMBIENT CURSOR PARALLAX (desktop only)
  ────────────────────────────────────────── */
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const parallaxX = useSpring(cursorX, { stiffness: 40, damping: 20 });
  const parallaxY = useSpring(cursorY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (isMobile) return;
    const handleMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth  - 0.5) * 18;
      const cy = (e.clientY / window.innerHeight - 0.5) * 12;
      animate(cursorX, cx, { duration: 0.8, ease: 'easeOut' });
      animate(cursorY, cy, { duration: 0.8, ease: 'easeOut' });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isMobile]);

  /* ──────────────────────────────────────────
     SCROLL INDICATOR FADE
  ────────────────────────────────────────── */
  const scrollFade = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-stone-950"
      style={{ height: isMobile ? '145vh' : '185vh' }}
    >
      {/* ══════════════════════════════════════
          STICKY VIEWPORT FRAME
      ══════════════════════════════════════ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── LAYER 1: VIDEO ───────────────────── */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: videoOpacity,
            y: videoY,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          <motion.div
            className="w-full h-full"
            style={{
              scale: isMobile ? videoScaleMobile : videoScaleDesktop,
              x: isMobile ? 0 : parallaxX,
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover object-center"
              style={{
                transform: 'translateZ(0)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlayThrough={() => setVideoLoaded(true)}
            >
              <source src="/videos/hero-image-roya.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Golden sunrise lens flare */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-[3]"
            style={{ opacity: isMobile ? 0.2 : 0.32, y: isMobile ? 0 : parallaxY }}
          >
            <div className="absolute top-[8%] right-[18%] w-[420px] h-[420px] rounded-full bg-amber-400/20 blur-[100px] mix-blend-color-dodge" />
            <div className="absolute top-[12%] right-[22%] w-[180px] h-[180px] rounded-full bg-yellow-200/30 blur-[50px] mix-blend-color-dodge" />
          </motion.div>

          {/* Cinematic gradient overlays */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-stone-950/80 z-[2]"
            style={{ opacity: darkOverlayOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/15 z-[2]" />

          {/* Vignette — edge darkening */}
          <div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
            }}
          />

          {/* Top navbar shadow gradient */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/75 to-transparent pointer-events-none z-[5]" />

          {/* Bottom blend to white body */}
          <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent pointer-events-none z-[5]" />
        </motion.div>

        {/* ── LAYER 2: ATMOSPHERIC FOG ─────────── */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[4] overflow-hidden"
          style={{ opacity: fogOpacity, y: fogY }}
        >
          <div className="absolute -left-1/4 top-[30%] w-[150%] h-[40%] bg-gradient-to-r from-transparent via-stone-200/20 to-transparent blur-[70px] animate-floating-fog" />
        </motion.div>

        {/* ── LAYER 3: FLOATING GLOW ORBS ─────── */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[4] overflow-hidden"
          style={{ y: glowY, x: isMobile ? 0 : glowX, willChange: 'transform' }}
        >
          <div className="absolute bottom-[20%] left-[10%] w-64 h-64 rounded-full bg-amber-500/8 blur-[80px]" />
          <div className="absolute top-[35%] right-[8%] w-48 h-48 rounded-full bg-orange-400/8 blur-[60px]" />
        </motion.div>

        {/* ── LAYER 4: SCROLL-BASED TRANSITION ─── */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[6] bg-gradient-to-b from-stone-950/0 via-stone-950/20 to-stone-950/85"
          style={{ opacity: blurOverlayOpacity }}
        />

        {/* ══════════════════════════════════════
            LAYER 5: TYPOGRAPHY BLOCK
        ══════════════════════════════════════ */}
        <motion.div
          className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 pointer-events-none"
          style={{
            opacity: textOpacity,
            scale: textScale,
            y: textY,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="text-center max-w-5xl mx-auto w-full pointer-events-auto">

            {/* — Cinematic badge — */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 mb-5 sm:mb-7"
            >
              <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-amber-400" />
              <span className="flex items-center gap-1.5 text-[0.6rem] sm:text-[0.68rem] font-sans font-medium uppercase tracking-[0.32em] text-amber-300/90">
                <Sparkles size={10} className="text-amber-400" />
                Bespoke Luxury Escapes
                <Sparkles size={10} className="text-amber-400" />
              </span>
              <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-amber-400" />
            </motion.div>

            {/* — Main heading: blur-in + fade up — */}
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-light leading-[1.08] tracking-tight mb-5 sm:mb-7 text-white"
              style={{
                fontSize: 'clamp(2.1rem, 6.5vw, 6.5rem)',
                willChange: 'transform, opacity, filter',
              }}
            >
              Discover Journeys{' '}
              <br className="hidden sm:inline" />
              <span
                className="italic font-light"
                style={{
                  background:
                    'linear-gradient(115deg, #fde68a 0%, #fef3c7 38%, #fbbf24 60%, #fde68a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% auto',
                  animation: 'shimmer 5s linear infinite',
                }}
              >
                Beyond Imagination
              </span>
            </motion.h1>

            {/* — Subheading: delayed + soft — */}
            <motion.p
              initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans font-light text-white/75 max-w-xl mx-auto mb-9 sm:mb-11 leading-relaxed tracking-wide px-2 sm:px-0"
              style={{
                fontSize: 'clamp(0.82rem, 1.6vw, 1.1rem)',
                willChange: 'transform, opacity, filter',
              }}
            >
              Luxury escapes, spiritual experiences, and unforgettable destinations
              crafted for modern travelers.
            </motion.p>

            {/* ══ LAYER 6: CTA BUTTONS ══ */}
            <motion.div
              style={{ y: ctaY, opacity: ctaOpacity, willChange: 'transform, opacity' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                {/* Primary CTA */}
                <motion.button
                  whileHover={{ scale: 1.055, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="group relative px-8 py-4 rounded-full font-sans font-semibold text-stone-900 overflow-hidden shadow-luxury w-full sm:w-auto min-w-[210px] transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(251,191,36,0.4)]"
                  style={{ willChange: 'transform' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 border border-white/30" />
                  <div className="absolute inset-0 bg-amber-400/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wider uppercase">
                    Start Your Journey
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                  whileHover={{ scale: 1.055, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="group relative px-8 py-4 rounded-full font-sans font-semibold text-white w-full sm:w-auto min-w-[210px] transition-all duration-500"
                  style={{ willChange: 'transform' }}
                >
                  <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 group-hover:border-white/45 group-hover:bg-white/15 transition-all duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wider uppercase">
                    Explore Packages
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ opacity: scrollFade, pointerEvents: 'none' }}
          >
            <span className="text-white/50 text-[0.6rem] font-sans font-light uppercase tracking-[0.28em]">
              Scroll to begin
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={16} className="text-white/50" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ══ LOCATION BADGE ══ */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity: ctaOpacity }}
          className="absolute bottom-6 right-5 sm:right-7 z-20 hidden xs:flex items-center gap-2 rounded-full border border-white/18 bg-black/28 px-4 py-2 text-white backdrop-blur-xl"
        >
          <MapPin size={13} className="text-amber-300 flex-shrink-0" />
          <span className="font-sans font-light tracking-wider text-[0.68rem] sm:text-xs whitespace-nowrap">
            Umrah · Dubai · Maldives · Turkey &amp; more
          </span>
        </motion.div>

        {/* ══ VIDEO LOADING SHIMMER ══ */}
        {!videoLoaded && (
          <div className="absolute inset-0 z-[8] bg-stone-950 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
          </div>
        )}
      </div>
    </section>
  );
}
