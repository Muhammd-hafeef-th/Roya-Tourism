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
    let timeoutId: ReturnType<typeof setTimeout>;
    const upd = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setVw(window.innerWidth);
      }, 150);
    };
    setVw(window.innerWidth); // Initial set
    window.addEventListener('resize', upd, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', upd);
    };
  }, []);

  useEffect(() => { videoRef.current?.play().catch(() => { }); }, []);

  const isMobile = vw > 0 && vw < BP.sm;
  const isTablet = vw >= BP.sm && vw < BP.lg;
  const isTV = vw >= BP.tv;

  /* Section height: massive scroll area for full cinematic journey */
  const sectionH = isMobile ? '200vh' : isTablet ? '250vh' : isTV ? '300vh' : '280vh';

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 35, damping: 18, restDelta: 0.001 });

  /* 
    CAMERA 3D ILLUSION
    Instead of just 2D scaling, we use Z-space translation to simulate
    a camera physically moving into the environment. 
  */

  // Layer 1: Background Video (Distant)
  // Moves forward in Z-space to engulf the viewer.
  const vidZ = useTransform(p, [0, 1], isMobile ? [0, 200] : [0, 600]);
  const vidY = useTransform(p, [0, 1], isMobile ? [0, -30] : [0, -100]);
  const vidScale = useTransform(p, [0, 1], [1, 1.1]);

  // Layer 2: Deep Fog (Midground)
  const fogZ = useTransform(p, [0, 1], isMobile ? [0, 400] : [0, 800]);
  const fogY = useTransform(p, [0, 1], [0, -120]);
  const fogOp = useTransform(p, [0, 0.4, 0.7, 1], [0.15, 0.4, 0.5, 0.1]);

  // Layer 3: Light Rays (Mid-Foreground)
  const raysZ = useTransform(p, [0, 1], isMobile ? [0, 500] : [0, 1000]);
  const raysY = useTransform(p, [0, 1], [0, -50]);
  const raysOp = useTransform(p, [0, 0.2, 0.6, 0.9], [0, 0.8, 0.4, 0]);
  const raysSc = useTransform(p, [0, 1], [0.88, 1.15]);

  // Layer 4: Floating Particles (Foreground)
  const partsZ = useTransform(p, [0, 1], isMobile ? [0, 800] : [0, 1500]);

  // Layer 5: Typography (Foreground)
  // Pushes towards the camera, blurring out as it passes "behind" the lens
  const textZ = useTransform(p, [0, 0.4, 0.8], [0, 400, 1200]);
  const textY = useTransform(p, [0, 0.6], ['0%', '-15%']);
  const textOp = useTransform(p, [0, 0.25, 0.55], [1, 1, 0]);
  const textBlur = useTransform(p, [0.35, 0.6], ['blur(0px)', 'blur(20px)']);

  // Layer 6: CTAs
  const ctaZ = useTransform(p, [0, 0.4, 0.8], [0, 300, 1000]);
  const ctaY = useTransform(p, [0, 0.5], ['0%', '-10%']);
  const ctaOp = useTransform(p, [0, 0.2, 0.45], [1, 1, 0]);
  const ctaBlur = useTransform(p, [0.25, 0.5], ['blur(0px)', 'blur(15px)']);

  /* Cinematic Overlays & Transitions */
  const vignetteOp = useTransform(p, [0, 0.4, 0.8], [0.3, 0.6, 0.9]);
  const transOp = useTransform(p, [0.75, 1], [0, 1]);
  const scrollFade = useTransform(p, [0, 0.05], [1, 0]);

  /* Desktop Camera Drift (Mouse parallax) */
  const curX = useMotionValue(0);
  const curY = useMotionValue(0);
  const prlX = useSpring(curX, { stiffness: 25, damping: 20 });
  const prlY = useSpring(curY, { stiffness: 25, damping: 20 });

  useEffect(() => {
    if (isMobile || isTablet) return;
    let w = window.innerWidth;
    let h = window.innerHeight;
    
    // Update cached dimensions on resize to avoid reading from window constantly
    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    const fn = (e: MouseEvent) => {
      // Direct assignment: useSpring already interpolates smoothly. 
      // Using animate() inside mousemove causes redundant loops and battery drain.
      curX.set((e.clientX / w - 0.5) * 40);
      curY.set((e.clientY / h - 0.5) * 25);
    };
    window.addEventListener('mousemove', fn, { passive: true });
    
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', fn);
    };
  }, [isMobile, isTablet, curX, curY]);

  /* Responsive typography */
  const headlineSize = isMobile ? 'clamp(2.5rem, 12vw, 3.5rem)' : isTablet ? 'clamp(3.5rem, 8vw, 5.5rem)' : isTV ? 'clamp(7rem, 7vw, 11rem)' : 'clamp(4.5rem, 7vw, 8rem)';
  const subSize = isMobile ? 'clamp(0.85rem, 4vw, 1rem)' : isTablet ? 'clamp(1rem, 2.5vw, 1.2rem)' : isTV ? 'clamp(1.4rem, 1.5vw, 1.8rem)' : 'clamp(1rem, 1.5vw, 1.25rem)';
  const eyebrowSize = isMobile ? '0.6rem' : isTV ? '1rem' : '0.7rem';
  const eyebrowTracking = isMobile ? '0.3em' : '0.45em';

  const btnPx = isMobile ? 'px-7' : isTV ? 'px-16' : 'px-12';
  const btnPy = isMobile ? 'py-4' : isTV ? 'py-7' : 'py-5';
  const btnText = isMobile ? 'text-[0.65rem]' : isTV ? 'text-[0.9rem]' : 'text-[0.75rem]';

  const contentPx = isMobile ? 'px-6' : isTablet ? 'px-10' : isTV ? 'px-32' : 'px-16';
  const maxW = isTV ? 'max-w-7xl' : 'max-w-5xl';

  return (
    <section id="hero" ref={containerRef} className="relative w-full bg-stone-950" style={{ height: sectionH }}>
      {/* 
        3D Perspective Stage
        This wrapper is crucial for the translateZ illusion.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ perspective: '1200px' }}>

        {/* The "Camera" container applying mouse drift */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ x: isMobile ? 0 : prlX, y: isMobile ? 0 : prlY, transformStyle: 'preserve-3d' }}
        >

          {/* ══ L1: DISTANT BACKGROUND VIDEO ══ */}
          <motion.div
            className="absolute inset-0 w-full h-full origin-center"
            style={{
              scale: vidScale,
              y: vidY,
              z: vidZ,
              willChange: 'transform',
              transformStyle: 'preserve-3d'
            }}
          >
            <video ref={videoRef}
              className="w-full h-full object-cover object-center"
              style={{ transform: 'translateZ(0)', willChange: 'transform', backfaceVisibility: 'hidden' }}
              autoPlay muted loop playsInline preload="auto"
              onLoadedData={() => setVideoReady(true)}
            >
              <source src="/videos/hero-image-roya.mp4" type="video/mp4" />
            </video>

            {/* Base atmospheric color grading */}
            <div className="absolute inset-0 mix-blend-overlay bg-amber-900/10 pointer-events-none" />
          </motion.div>

          {/* ══ L2: VOLUMETRIC FOG & ATMOSPHERE (Midground) ══ */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y: fogY, z: fogZ, opacity: fogOp, willChange: 'transform, opacity', transformStyle: 'preserve-3d' }}
          >
            {/* Ground rolling fog */}
            <div className="absolute bottom-[-10%] left-[-10%] right-[-10%] h-[60%] bg-gradient-to-t from-stone-200/20 via-stone-300/10 to-transparent blur-[60px]" />
            {/* Drifting mid-air fog banks */}
            <div className="absolute top-[20%] -left-[10%] w-[130%] h-[30%] bg-gradient-to-r from-transparent via-amber-100/15 to-transparent blur-[80px] animate-floating-fog" />
            <div className="absolute top-[40%] left-[5%] w-[110%] h-[25%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[60px] animate-floating-fog" style={{ animationDelay: '-12s', animationDuration: '28s' }} />
          </motion.div>

          {/* ══ L3: CINEMATIC LIGHT RAYS (Mid-Foreground) ══ */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y: raysY, z: raysZ, scale: raysSc, opacity: raysOp, willChange: 'transform, opacity', transformStyle: 'preserve-3d' }}
          >
            {/* Majestic sunburst conic gradient */}
            <div className="absolute inset-0 origin-top-right" style={{
              background: 'conic-gradient(from 250deg at 80% 0%, transparent 0deg, rgba(253,224,71,0.12) 10deg, transparent 20deg, transparent 25deg, rgba(251,191,36,0.08) 35deg, transparent 45deg, rgba(253,224,71,0.06) 60deg, transparent 75deg)',
            }} />
            {/* Volumetric sun core */}
            <div className="absolute top-[-5%] right-[10%] rounded-full mix-blend-screen" style={{
              width: isTV ? '900px' : '600px', height: isTV ? '900px' : '600px',
              background: 'radial-gradient(circle, rgba(253,224,71,0.25) 0%, rgba(251,191,36,0.15) 30%, rgba(255,140,0,0.08) 60%, transparent 80%)',
              filter: 'blur(30px)',
            }} />
          </motion.div>

          {/* ══ L4: DUST PARTICLES (Foreground Depth) ══ */}
          {!isMobile && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ z: partsZ, willChange: 'transform', transformStyle: 'preserve-3d' }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div key={i} className="absolute rounded-full"
                  style={{
                    width: `${2 + (i % 4)}px`, height: `${2 + (i % 4)}px`,
                    left: `${5 + (i * 8)}%`, top: `${15 + (i * 7) % 70}%`,
                    background: 'rgba(251,219,147,0.6)', filter: 'blur(0.5px)',
                    boxShadow: '0 0 10px rgba(251,219,147,0.4)',
                  }}
                  animate={{ y: [-15, 15, -15], x: [-10, 10, -10], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 6 + (i % 5), delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </motion.div>
          )}

          {/* ══ L5: TYPOGRAPHY (Camera Plane) ══ */}
          <motion.div
            className={`absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none ${contentPx}`}
            style={{
              y: textY, z: textZ, opacity: textOp, filter: textBlur,
              willChange: 'transform, opacity, filter', transformStyle: 'preserve-3d'
            }}
          >
            <div className={`text-center ${maxW} mx-auto w-full pointer-events-auto`}>

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 25, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
              >
                <span className="h-px w-8 sm:w-12 lg:w-16 bg-gradient-to-r from-transparent to-amber-400/80" />
                <span className="font-sans font-medium uppercase text-amber-300/90"
                  style={{ fontSize: eyebrowSize, letterSpacing: eyebrowTracking }}>
                  Roya Tourism · Luxury Travel
                </span>
                <span className="h-px w-8 sm:w-12 lg:w-16 bg-gradient-to-l from-transparent to-amber-400/80" />
              </motion.div>

              {/* Headline */}
              <div className="mb-5 sm:mb-7">
                <div className="font-serif font-light text-white leading-[1.05] tracking-tight"
                  style={{ fontSize: headlineSize }}>
                  {WORDS.map((word, i) => (
                    <motion.span key={word}
                      className="inline-block mr-[0.2em] last:mr-0"
                      initial={{ opacity: 0, y: 45, filter: 'blur(20px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 1.8, delay: 0.3 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {i === 2 ? (
                        <span className="italic" style={{
                          background: 'linear-gradient(120deg, #fde68a 0%, #fef3c7 35%, #fbbf24 60%, #fde68a 100%)',
                          backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                          animation: 'shimmer 7s linear infinite',
                        }}>{word}</span>
                      ) : word}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Cinematic Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-light text-white/75 mx-auto mb-10 sm:mb-14 leading-[1.85] tracking-wide mix-blend-screen"
                style={{
                  fontSize: subSize,
                  maxWidth: isTV ? '56rem' : isMobile ? '24rem' : '40rem',
                }}
              >
                Luxury experiences crafted through unforgettable destinations,{' '}
                <span className="text-white">spiritual journeys</span>, and{' '}
                <span className="text-amber-200/90">timeless adventures</span>.
              </motion.p>
            </div>
          </motion.div>

          {/* ══ L6: CTAs (Slightly closer to camera than text) ══ */}
          <motion.div
            className="absolute inset-x-0 bottom-[15%] sm:bottom-[18%] lg:bottom-[22%] z-20 flex flex-col items-center pointer-events-none"
            style={{
              y: ctaY, z: ctaZ, opacity: ctaOp, filter: ctaBlur,
              willChange: 'transform, opacity, filter', transformStyle: 'preserve-3d'
            }}
          >
            <div className={`text-center ${maxW} mx-auto w-full pointer-events-auto`}>
              <motion.div
                initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center px-6"
              >
                {/* Primary Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`group relative ${btnPx} ${btnPy} rounded-full font-sans overflow-hidden transition-shadow duration-500 hover:shadow-[0_25px_70px_rgba(251,191,36,0.5)] w-full sm:w-auto`}
                  style={{ willChange: 'transform', minWidth: isMobile ? 'auto' : '230px' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 border border-white/25" />
                  <div className="absolute inset-0 bg-amber-400/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className={`relative z-10 flex items-center justify-center gap-3 text-stone-900 font-semibold tracking-[0.22em] uppercase ${btnText}`}>
                    Begin Your Journey
                    <ArrowRight size={isMobile ? 14 : 16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>

                {/* Secondary Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`group relative ${btnPx} ${btnPy} rounded-full font-sans text-white w-full sm:w-auto`}
                  style={{ willChange: 'transform', minWidth: isMobile ? 'auto' : '230px' }}
                >
                  <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-2xl border border-white/25 group-hover:border-amber-400/50 group-hover:bg-white/10 transition-all duration-500" />
                  <span className={`relative z-10 font-semibold tracking-[0.22em] uppercase ${btnText}`}>
                    Explore Journeys
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

        </motion.div>

        {/* ══ STATIC UI LAYER (Not affected by 3D camera drift) ══ */}
        <div className="absolute inset-0 pointer-events-none z-30">

          {/* Cinematic Vignette */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: vignetteOp }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-stone-950/90" />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)' }} />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            style={{ opacity: scrollFade }}
          >
            <span className="text-white/45 font-sans font-light uppercase tracking-[0.35em]"
              style={{ fontSize: isMobile ? '0.55rem' : '0.6rem' }}>
              Scroll to enter
            </span>
            <motion.div
              className="w-px h-10 sm:h-12 bg-gradient-to-b from-white/50 to-transparent"
              animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </motion.div>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: ctaOp, padding: isMobile ? '8px 14px' : '10px 18px' }}
            className="absolute bottom-6 left-5 sm:left-8 flex items-center gap-2 sm:gap-2.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-xl text-white pointer-events-auto"
          >
            <MapPin size={isMobile ? 12 : 14} className="text-amber-300 flex-shrink-0" />
            <span className="font-sans font-light tracking-widest whitespace-nowrap"
              style={{ fontSize: isMobile ? '0.6rem' : isTV ? '0.9rem' : '0.68rem' }}>
              {isMobile ? 'Umrah · Dubai · Maldives & more' : 'Umrah · Dubai · Maldives · Turkey & more'}
            </span>
          </motion.div>

          {/* Masked Cinematic Transition to next section */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[30vh] z-[40]"
            style={{
              opacity: transOp,
              background: 'linear-gradient(to top, #faf9f7 0%, rgba(250,249,247,0.9) 20%, rgba(250,249,247,0.4) 60%, transparent 100%)'
            }}
          />
        </div>

        {/* Loading overlay */}
        {!videoReady && (
          <div className="absolute inset-0 z-[50] bg-stone-950 flex items-center justify-center">
            <div className="flex flex-col items-center gap-5">
              <div className="w-12 h-12 rounded-full border-[3px] border-amber-400/20 border-t-amber-400 animate-spin" />
              <span className="text-white/30 font-sans uppercase tracking-[0.4em]"
                style={{ fontSize: '0.65rem' }}>Preparing Journey</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
