import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const WORDS = ['Journey', 'Beyond', 'Horizons'];

/* Breakpoint thresholds */
const BP = { sm: 640, md: 768, lg: 1024, xl: 1280, tv: 1920 };
const FRAME_COUNT = 121;

export default function Hero({ startAnimation = true }: { startAnimation?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [vw, setVw] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Responsive tracker
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

  // Massive scroll area for the cinematic frame sequence
  const sectionH = isMobile ? '160vh' : isTablet ? '200vh' : '240vh';

  // --- UI Motion Values ---
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 35, damping: 18, restDelta: 0.001 });

  // --- Canvas Sequence Logic ---
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    const render = (frame: number) => {
      if (!canvas || !ctx) return;
      const img = images[frame];
      if (!img || !img.complete) return;
      
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;
      
      // Object-fit: cover logic for the canvas
      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }
      
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };
    
    // Initial Load Sequence
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const numStr = i.toString().padStart(4, '0');
      img.src = `/frames/frame_${numStr}.webp`;
      images.push(img);
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        const currentFrame = Math.round(p.get() * (FRAME_COUNT - 1));
        if (images.indexOf(img) === currentFrame) {
          render(currentFrame);
        }
      };
    }
    
    // Handle High-DPI Displays for crisp Apple-like quality
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const currentFrame = Math.round(p.get() * (FRAME_COUNT - 1));
      render(currentFrame);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    
    // Synchronize frame rendering directly to the spring-smoothed scroll progress
    const unsubscribe = p.on('change', (latest) => {
      const currentFrame = Math.round(latest * (FRAME_COUNT - 1));
      render(currentFrame);
    });
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
    };
  }, [p]);

  // Stage 1 Transforms (Journey Beyond Horizons)
  const textY = useTransform(p, [0, 0.32], ['0%', '-20%']);
  const textOp = useTransform(p, [0, 0.24, 0.32], [1, 1, 0]);
  const textScale = useTransform(p, [0, 0.32], [1, 1.03]);

  const ctaY = useTransform(p, [0, 0.28], ['0%', '-15%']);
  const ctaOp = useTransform(p, [0, 0.20, 0.28], [1, 1, 0]);

  // Stage 2 Transforms (Spiritual Sanctity)
  const textY2 = useTransform(p, [0.28, 0.36, 0.56, 0.64], ['30px', '0px', '0px', '-30px']);
  const textOp2 = useTransform(p, [0.28, 0.36, 0.56, 0.64], [0, 1, 1, 0]);
  const textScale2 = useTransform(p, [0.28, 0.64], [0.98, 1.02]);

  // Stage 3 Transforms (Bespoke Adventures)
  const textY3 = useTransform(p, [0.60, 0.68, 0.88, 0.94], ['30px', '0px', '0px', '-30px']);
  const textOp3 = useTransform(p, [0.60, 0.68, 0.88, 0.94], [0, 1, 1, 0]);
  const textScale3 = useTransform(p, [0.60, 0.94], [0.98, 1.02]);

  const vignetteOp = useTransform(p, [0, 0.5], [0.3, 0.85]);
  const scrollFade = useTransform(p, [0, 0.05], [1, 0]);
  
  // Transition into the light section below
  const transOp = useTransform(p, [0.8, 1], [0, 1]);

  // Responsive typography sizing
  const headlineSize = isMobile ? 'clamp(2.2rem, 10vw, 3.2rem)' : isTablet ? 'clamp(4.2rem, 8vw, 5.5rem)' : isTV ? 'clamp(9rem, 9vw, 13rem)' : 'clamp(5.2rem, 7.5vw, 8rem)';
  const subSize = isMobile ? 'clamp(0.85rem, 3.8vw, 1rem)' : isTablet ? 'clamp(1.05rem, 2.3vw, 1.2rem)' : isTV ? 'clamp(1.6rem, 1.5vw, 2rem)' : 'clamp(1.1rem, 1.4vw, 1.3rem)';
  
  const loadingProgress = Math.round((imagesLoaded / FRAME_COUNT) * 100);
  const isReady = imagesLoaded > 0;

  return (
    <section id="hero" ref={containerRef} className="relative w-full bg-stone-950" style={{ height: sectionH }}>
      
      {/* 
        Sticky Stage
        Locks the viewport while we scrub through the image sequence
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-stone-950">
        
        {/* GPU Accelerated Canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: isReady ? 1 : 0, 
            transition: 'opacity 1s ease-in-out'
          }}
        />

        {/* ══ CINEMATIC ATMOSPHERE & LIGHTING ══ */}
        {/* Warm environmental glow */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen bg-[radial-gradient(ellipse_at_top,rgba(180,140,90,0.12)_0%,transparent_60%)]" />
        {/* Balanced overlays for high contrast and readability of white text */}
        <div className="absolute inset-0 pointer-events-none bg-black/40 md:bg-black/20" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-stone-950/50 via-stone-950/30 to-stone-950/95" />
        
        {/* Dynamic Vignette */}
        <motion.div 
          className="absolute inset-0 pointer-events-none" 
          style={{ opacity: vignetteOp }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.9)_100%)]" />
        </motion.div>

        {/* ══ STAGE 1 TYPOGRAPHY & STORYTELLING ══ */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 sm:px-12"
          style={{ y: textY, opacity: textOp, scale: textScale }}
        >
          <div className="text-center w-full max-w-6xl mx-auto pointer-events-auto flex flex-col items-center justify-center">
            
            {/* Premium Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-4 mb-6 sm:mb-8"
            >
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-white/40" />
              <span className="font-sans font-medium uppercase tracking-[0.4em] text-white/70 text-[0.65rem] sm:text-xs">
                Roya Tourism · Luxury Travel
              </span>
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-white/40" />
            </motion.div>

            {/* Apple-Style Cinematic Headline */}
            <div className="mb-6 sm:mb-8 overflow-hidden">
              <div 
                className="font-serif font-light text-white leading-[1.05] tracking-tight"
                style={{ fontSize: headlineSize }}
              >
                {WORDS.map((word, i) => {
                  const span = (
                    <motion.span 
                      key={word}
                      className="inline-block mr-[0.2em] last:mr-0"
                      initial={{ opacity: 0, y: "80%", filter: 'blur(10px)' }}
                      animate={startAnimation ? { opacity: 1, y: "0%", filter: 'blur(0px)' } : { opacity: 0, y: "80%", filter: 'blur(10px)' }}
                      transition={{ duration: 1.4, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {i === 2 ? (
                        <span className="italic relative">
                          <span 
                            className="relative z-10 text-transparent bg-clip-text"
                            style={{
                              backgroundImage: 'linear-gradient(120deg, #E2C275 0%, #FFF3D3 40%, #D4AF37 60%, #E2C275 100%)',
                              backgroundSize: '200% auto',
                              animation: 'shimmer 8s linear infinite'
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

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans font-light text-stone-200/90 sm:text-white/60 mx-auto max-w-[22rem] sm:max-w-xl lg:max-w-2xl leading-relaxed tracking-wide"
              style={{ fontSize: subSize }}
            >
              Luxury experiences crafted through unforgettable destinations,{' '}
              <span className="text-white/95">spiritual journeys</span>, and{' '}
              <span className="text-[#E2C275]">timeless adventures</span>.
            </motion.p>

            {/* CTA ACTIONS (Moved inside flex container to prevent overlapping) */}
            <motion.div
              style={{ y: ctaY, opacity: ctaOp }}
              initial={{ opacity: 0, y: 20 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full justify-center"
            >
              {/* Primary Minimal Luxury Button */}
              <button
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-6 sm:px-12 py-3.5 sm:py-5 rounded-full font-sans overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 w-full max-w-[280px] sm:w-auto min-w-[180px] sm:min-w-[200px] border border-transparent hover:border-amber-200/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-stone-100 to-white" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#E2C275] to-[#F5DF96] transition-opacity duration-700" />
                <span className="relative z-10 flex items-center justify-center gap-3 text-stone-900 group-hover:text-stone-950 font-medium tracking-[0.2em] uppercase text-[0.7rem] sm:text-xs transition-colors duration-700">
                  Begin Your Journey
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-500 ease-out" />
                </span>
              </button>

              {/* Secondary Glassmorphism Button */}
              <button
                onClick={() => document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-6 sm:px-12 py-3.5 sm:py-5 rounded-full font-sans text-white w-full max-w-[280px] sm:w-auto min-w-[180px] sm:min-w-[200px] transition-all duration-700 hover:scale-[1.02] active:scale-95 border border-white/20 hover:border-[#E2C275]/50"
              >
                <div className="absolute inset-0 rounded-full bg-black/10 backdrop-blur-md group-hover:bg-black/20 transition-all duration-700" />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_30px_rgba(226,194,117,0.15)] transition-opacity duration-700" />
                <span className="relative z-10 font-medium tracking-[0.2em] uppercase text-[0.7rem] sm:text-xs text-white/90 group-hover:text-white transition-colors duration-700">
                  Explore Journeys
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* ══ STAGE 2 TYPOGRAPHY (Spiritual Sanctity) ══ */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 sm:px-12"
          style={{ y: textY2, opacity: textOp2, scale: textScale2 }}
        >
          <div className="text-center w-full max-w-6xl mx-auto">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-white/40" />
              <span className="font-sans font-medium uppercase tracking-[0.4em] text-[#E2C275] text-[0.65rem] sm:text-xs">
                Sacred & Serene
              </span>
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-white/40" />
            </div>

            {/* Headline */}
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
                    animation: 'shimmer 8s linear infinite'
                  }}
                >
                  Sanctity
                </span>
              </h2>
            </div>

            {/* Subheading */}
            <p
              className="font-sans font-light text-white/60 mx-auto max-w-[22rem] sm:max-w-xl lg:max-w-2xl leading-relaxed tracking-wide"
              style={{ fontSize: subSize }}
            >
              Embark on tailored Umrah & Hajj packages designed with ultimate comfort, premium guidance, and luxury accommodations.
            </p>
          </div>
        </motion.div>

        {/* ══ STAGE 3 TYPOGRAPHY (Bespoke Adventures) ══ */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 sm:px-12"
          style={{ y: textY3, opacity: textOp3, scale: textScale3 }}
        >
          <div className="text-center w-full max-w-6xl mx-auto">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-white/40" />
              <span className="font-sans font-medium uppercase tracking-[0.4em] text-[#E2C275] text-[0.65rem] sm:text-xs">
                Unrivaled Service
              </span>
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-white/40" />
            </div>

            {/* Headline */}
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
                    animation: 'shimmer 8s linear infinite'
                  }}
                >
                  Adventures
                </span>
              </h2>
            </div>

            {/* Subheading */}
            <p
              className="font-sans font-light text-white/60 mx-auto max-w-[22rem] sm:max-w-xl lg:max-w-2xl leading-relaxed tracking-wide"
              style={{ fontSize: subSize }}
            >
              Immersive private tours, luxury stays, and seamless logistics across the world's most breathtaking horizons.
            </p>
          </div>
        </motion.div>


        {/* ══ STATIC OVERLAYS ══ */}
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30 pointer-events-none"
          style={{ opacity: scrollFade }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 1.2, delay: 1.3 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-white/40 font-sans font-light uppercase tracking-[0.4em] text-[0.55rem] sm:text-[0.6rem]">
              Scroll to enter
            </span>
            <motion.div
              className="w-[1px] h-10 sm:h-12 bg-gradient-to-b from-white/50 to-transparent"
              animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </motion.div>
        </motion.div>

        {/* Location badge - minimal luxury */}
        <motion.div
          className="absolute bottom-8 left-6 sm:left-10 z-30 hidden sm:flex items-center gap-3 pointer-events-none"
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
              Umrah · Dubai · Maldives
            </span>
          </motion.div>
        </motion.div>

        {/* Masked Cinematic Transition to next section */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[15vh] z-[40] pointer-events-none"
          style={{
            opacity: transOp,
            background: 'linear-gradient(to top, #faf9f7 0%, rgba(250,249,247,0.9) 20%, rgba(250,249,247,0.4) 60%, transparent 100%)'
          }}
        />

        {/* ══ PREMIUM LOADING OVERLAY ══ */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: isReady ? 0 : 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-50 bg-stone-950 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center gap-8">
            <div className="w-[1px] h-20 bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-[#E2C275] to-transparent"
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/30 font-sans font-light uppercase tracking-[0.5em] text-[0.6rem]">
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
