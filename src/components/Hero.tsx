import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const WORDS = ['Journey', 'Beyond', 'Horizons'];

const BP = { sm: 640, md: 768, lg: 1024, xl: 1280, tv: 1920 };
const FRAME_COUNT = 121;

export default function Hero({ startAnimation = true }: { startAnimation?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const renderRequestRef = useRef<number | null>(null);
  const [vw, setVw] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const upd = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setVw(window.innerWidth), 150);
    };

    setVw(window.innerWidth);
    window.addEventListener('resize', upd, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', upd);
    };
  }, []);

  const isMobile = vw > 0 && vw < BP.sm;
  const isTablet = vw >= BP.sm && vw < BP.lg;
  const isTV = vw >= BP.tv;
  const sectionH = isMobile ? '300vh' : isTablet ? '350vh' : isTV ? '450vh' : '380vh';

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: isMobile ? 140 : 120, damping: isMobile ? 20 : 18, restDelta: 0.0005, mass: 0.8 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let active = true;
    let loadedCount = 0;
    let lastRenderedFrame = -1;
    const images = imagesRef.current;
    images.length = 0;

    const renderFrame = (frame: number) => {
      if (!canvas || !ctx) return;
      if (frame === lastRenderedFrame) return;
      
      const img = images[frame] || images[0];
      if (!img || !img.complete) return;

      lastRenderedFrame = frame;
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const scheduleRender = (frame: number) => {
      if (renderRequestRef.current !== null) {
        cancelAnimationFrame(renderRequestRef.current);
        renderRequestRef.current = null;
      }
      renderRequestRef.current = requestAnimationFrame(() => {
        if (!active) return;
        renderFrame(frame);
        renderRequestRef.current = null;
      });
    };

    const preloadFrame = (index: number) => {
      if (!active) return;
      const img = new Image();
      img.src = `/frames/frame_${index.toString().padStart(4, '0')}.webp`;
      images[index - 1] = img;

      img.onload = () => {
        if (!active) return;
        loadedCount += 1;
        setImagesLoaded(loadedCount);
        if (loadedCount === 1) setCanvasReady(true);

        const currentFrame = Math.round(p.get() * (FRAME_COUNT - 1));
        scheduleRender(currentFrame);
      };
    };

    const preloadBatch = (start: number, end: number) => {
      for (let i = start; i <= end && i <= FRAME_COUNT; i += 1) {
        preloadFrame(i);
      }
    };

    const preloadRemaining = (start: number) => {
      if (!active || start > FRAME_COUNT) return;
      const nextEnd = Math.min(start + 16, FRAME_COUNT);
      preloadBatch(start, nextEnd);
      const nextStart = nextEnd + 1;
      if (nextStart <= FRAME_COUNT) {
        window.setTimeout(() => preloadRemaining(nextStart), 80);
      }
    };

    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const currentFrame = Math.round(p.get() * (FRAME_COUNT - 1));
      scheduleRender(currentFrame);
    };

    preloadBatch(1, Math.min(32, FRAME_COUNT));
    preloadRemaining(33);
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const unsubscribe = p.on('change', (latest) => {
      const currentFrame = Math.round(latest * (FRAME_COUNT - 1));
      scheduleRender(currentFrame);
    });

    return () => {
      active = false;
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
      if (renderRequestRef.current !== null) {
        cancelAnimationFrame(renderRequestRef.current);
      }
      images.length = 0;
    };
  }, [p, isMobile]);

  const textY = useTransform(p, [0, 0.28], ['0%', '-20%']);
  const textOp = useTransform(p, [0, 0.20, 0.28], [1, 1, 0]);
  const textScale = useTransform(p, [0, 0.28], isMobile ? [1, 1] : [1, 1.03]);

  const ctaY = useTransform(p, [0, 0.24], ['0%', '-15%']);
  const ctaOp = useTransform(p, [0, 0.16, 0.24], [1, 1, 0]);

  const textY2 = useTransform(p, [0.24, 0.32, 0.52, 0.60], ['30px', '0px', '0px', '-30px']);
  const textOp2 = useTransform(p, [0.24, 0.32, 0.52, 0.60], [0, 1, 1, 0]);
  const textScale2 = useTransform(p, [0.24, 0.60], isMobile ? [1, 1] : [0.98, 1.02]);

  const textY3 = useTransform(p, [0.56, 0.64, 0.84, 0.90], ['30px', '0px', '0px', '-30px']);
  const textOp3 = useTransform(p, [0.56, 0.64, 0.84, 0.90], [0, 1, 1, 0]);
  const textScale3 = useTransform(p, [0.56, 0.90], isMobile ? [1, 1] : [0.98, 1.02]);

  const vignetteOp = useTransform(p, [0, 0.4], [0.3, 0.85]);
  const scrollFade = useTransform(p, [0, 0.04], [1, 0]);
  const transOp = useTransform(p, [0.75, 1], [0, 1]);

  const headlineSize = isMobile ? 'clamp(2rem, 9vw, 2.8rem)' : isTablet ? 'clamp(3.8rem, 7.5vw, 5rem)' : isTV ? 'clamp(8.5rem, 8.5vw, 12rem)' : 'clamp(4.8rem, 7vw, 7.5rem)';
  const subSize = isMobile ? 'clamp(0.8rem, 3.5vw, 0.95rem)' : isTablet ? 'clamp(0.95rem, 2vw, 1.1rem)' : isTV ? 'clamp(1.5rem, 1.4vw, 1.85rem)' : 'clamp(1rem, 1.3vw, 1.25rem)';

  const loadingProgress = Math.round((imagesLoaded / FRAME_COUNT) * 100);
  const isReady = canvasReady;

  return (
    <section id="hero" ref={containerRef} className="relative w-full bg-stone-950" style={{ height: sectionH }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-stone-950">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: isReady ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />

        {isMobile ? (
          <div className="absolute inset-0 pointer-events-none bg-black/35" />
        ) : (
          <>
            <div className="absolute inset-0 pointer-events-none mix-blend-screen bg-[radial-gradient(ellipse_at_top,rgba(180,140,90,0.12)_0%,transparent_60%)]" />
            <div className="absolute inset-0 pointer-events-none bg-black/40 md:bg-black/20" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-stone-950/50 via-stone-950/30 to-stone-950/95" />
          </>
        )}

        {!isMobile && (
          <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: vignetteOp }}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.9)_100%)]" />
          </motion.div>
        )}

        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-12"
          style={{ y: textY, opacity: textOp, scale: textScale }}
        >
          <div className="text-center w-full max-w-6xl mx-auto pointer-events-auto flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 10 : 15 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 10 : 15 }}
              transition={{ duration: isMobile ? 1 : 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12"
            >
              <span className="h-[1px] w-6 sm:w-16 bg-gradient-to-r from-transparent to-white/40" />
              <span className="font-sans font-medium uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/70 text-[0.6rem] sm:text-xs">
                Roya Global Tourism · Luxury Travel
              </span>
              <span className="h-[1px] w-6 sm:w-16 bg-gradient-to-l from-transparent to-white/40" />
            </motion.div>

            <div className="mb-10 sm:mb-12 overflow-hidden">
              <div
                className="font-serif font-light text-white leading-[1.05] tracking-tight"
                style={{ fontSize: headlineSize }}
              >
                {WORDS.map((word, i) => {
                  const span = (
                    <motion.span
                      key={word}
                      className="inline-block mr-[0.2em] last:mr-0"
                      initial={{ opacity: 0, y: '80%', filter: isMobile ? 'blur(0px)' : 'blur(10px)' }}
                      animate={startAnimation ? { opacity: 1, y: '0%', filter: 'blur(0px)' } : { opacity: 0, y: '80%', filter: isMobile ? 'blur(0px)' : 'blur(10px)' }}
                      transition={{ duration: isMobile ? 1 : 1.4, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {i === 2 ? (
                        <span className="italic relative">
                          <span
                            className="relative z-10 text-transparent bg-clip-text"
                            style={{
                              backgroundImage: 'linear-gradient(120deg, #E2C275 0%, #FFF3D3 40%, #D4AF37 60%, #E2C275 100%)',
                              backgroundSize: '200% auto',
                              animation: 'shimmer 8s linear infinite',
                            }}
                          >
                            {word}
                          </span>
                        </span>
                      ) : word}
                    </motion.span>
                  );
                  if (i === 2) {
                    return (
                      <span key={word} className="contents">
                        <br className="sm:hidden" />
                        {span}
                      </span>
                    );
                  }
                  return span;
                })}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: isMobile ? 1.2 : 1.5, delay: isMobile ? 0.7 : 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans font-light text-stone-200/90 sm:text-white/60 mx-auto max-w-[22rem] sm:max-w-xl lg:max-w-2xl leading-relaxed tracking-wide px-2 sm:px-0"
              style={{ fontSize: subSize }}
            >
              Luxury experiences crafted through unforgettable destinations,{' '}
              <span className="text-white/95">spiritual journeys</span>, and{' '}
              <span className="text-[#E2C275]">timeless adventures</span>.
            </motion.p>

            <motion.div
              style={{ y: ctaY, opacity: ctaOp }}
              initial={{ opacity: 0, y: 20 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: isMobile ? 1.2 : 1.5, delay: isMobile ? 0.9 : 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 sm:mt-14 flex flex-col sm:flex-row gap-5 sm:gap-6 items-center w-full justify-center px-4 sm:px-0"
            >
              <button
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-5 sm:px-10 py-3.5 sm:py-4 rounded-full font-sans overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 w-full max-w-[280px] sm:w-auto min-w-[160px] sm:min-w-[180px] border border-transparent hover:border-amber-200/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-stone-100 to-white" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#E2C275] to-[#F5DF96] transition-opacity duration-700" />
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-stone-900 group-hover:text-stone-950 font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[0.65rem] sm:text-xs transition-colors duration-700">
                  Begin Your Journey
                  <ArrowRight size={isMobile ? 12 : 14} className="group-hover:translate-x-1 sm:group-hover:translate-x-1.5 transition-transform duration-500 ease-out" />
                </span>
              </button>

              <button
                onClick={() => document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-5 sm:px-10 py-3.5 sm:py-4 rounded-full font-sans text-white w-full max-w-[280px] sm:w-auto min-w-[160px] sm:min-w-[180px] transition-all duration-700 hover:scale-[1.02] active:scale-95 border border-white/20 hover:border-[#E2C275]/50"
              >
                <div className="absolute inset-0 rounded-full bg-black/10 backdrop-blur-md group-hover:bg-black/20 transition-all duration-700" />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_30px_rgba(226,194,117,0.15)] transition-opacity duration-700" />
                <span className="relative z-10 font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[0.65rem] sm:text-xs text-white/90 group-hover:text-white transition-colors duration-700">
                  Explore Journeys
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-12"
          style={{ y: textY2, opacity: textOp2, scale: textScale2 }}
        >
          <div className="text-center w-full max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <span className="h-[1px] w-6 sm:w-16 bg-gradient-to-r from-transparent to-white/40" />
              <span className="font-sans font-medium uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#E2C275] text-[0.6rem] sm:text-xs">
                Sacred & Serene
              </span>
              <span className="h-[1px] w-6 sm:w-16 bg-gradient-to-l from-transparent to-white/40" />
            </div>

            <div className="mb-6 sm:mb-8">
              <h2
                className="font-serif font-light text-white leading-[1.05] tracking-tight"
                style={{ fontSize: headlineSize }}
              >
                Spiritual <br className="sm:hidden" />{' '}
                <span
                  className="italic text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(120deg, #E2C275 0%, #FFF3D3 40%, #D4AF37 60%, #E2C275 100%)',
                    backgroundSize: '200% auto',
                    animation: 'shimmer 8s linear infinite',
                  }}
                >
                  Sanctity
                </span>
              </h2>
            </div>

            <p
              className="font-sans font-light text-white/60 mx-auto max-w-[22rem] sm:max-w-xl lg:max-w-2xl leading-relaxed tracking-wide px-2 sm:px-0"
              style={{ fontSize: subSize }}
            >
              Embark on tailored Umrah & Hajj packages designed with ultimate comfort, premium guidance, and luxury accommodations.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-12"
          style={{ y: textY3, opacity: textOp3, scale: textScale3 }}
        >
          <div className="text-center w-full max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <span className="h-[1px] w-6 sm:w-16 bg-gradient-to-r from-transparent to-white/40" />
              <span className="font-sans font-medium uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#E2C275] text-[0.6rem] sm:text-xs">
                Unrivaled Service
              </span>
              <span className="h-[1px] w-6 sm:w-16 bg-gradient-to-l from-transparent to-white/40" />
            </div>

            <div className="mb-6 sm:mb-8">
              <h2
                className="font-serif font-light text-white leading-[1.05] tracking-tight"
                style={{ fontSize: headlineSize }}
              >
                Bespoke <br className="sm:hidden" />{' '}
                <span
                  className="italic text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(120deg, #E2C275 0%, #FFF3D3 40%, #D4AF37 60%, #E2C275 100%)',
                    backgroundSize: '200% auto',
                    animation: 'shimmer 8s linear infinite',
                  }}
                >
                  Adventures
                </span>
              </h2>
            </div>

            <p
              className="font-sans font-light text-white/60 mx-auto max-w-[22rem] sm:max-w-xl lg:max-w-2xl leading-relaxed tracking-wide px-2 sm:px-0"
              style={{ fontSize: subSize }}
            >
              Immersive private tours, luxury stays, and seamless logistics across the world's most breathtaking horizons.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
          style={{ opacity: scrollFade }}
        >
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 8 : 10 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 8 : 10 }}
            transition={{ duration: isMobile ? 1 : 1.2, delay: isMobile ? 1 : 1.3 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-white/40 font-sans font-light uppercase tracking-[0.3em] text-[0.5rem] sm:text-[0.6rem]">
              Scroll to enter
            </span>
            <motion.div
              className="w-[1px] h-8 sm:h-10 bg-gradient-to-b from-white/50 to-transparent"
              animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </motion.div>
        </motion.div>

        {!isMobile && (
          <motion.div
            className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 z-30 flex items-center gap-3 pointer-events-none"
            style={{ opacity: ctaOp }}
          >
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="flex items-center gap-3"
            >
              <MapPin size={14} className="text-[#E2C275]" />
              <span className="font-sans font-light tracking-[0.2em] text-white/70 text-xs">
                Kashmir
              </span>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[8vh] lg:h-[12vh] z-[40] pointer-events-none"
          style={{
            opacity: transOp,
            background: 'linear-gradient(to top, rgba(250,249,247,0) 0%, rgba(250,249,247,0) 100%)',
          }}
        />

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isReady ? 0 : 1 }}
          transition={{ duration: isMobile ? 0.8 : 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-50 bg-stone-950 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-[#E2C275] to-transparent"
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{ duration: isMobile ? 1 : 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-white/30 font-sans font-light uppercase tracking-[0.4em] text-[0.55rem]">
                Preparing Journey
              </span>
              <span className="text-white/50 font-serif italic text-sm">
                {loadingProgress}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
