import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MapPin, ArrowRight } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor screen size for mobile responsiveness and performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Performance-optimized hardware-accelerated transforms
  const videoOpacity = useTransform(scrollYProgress, [0.7, 0.8], [1, 0]);
  const blurOverlayOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);

  // Parallax and fade transforms for typography container
  const textOpacity = useTransform(scrollYProgress, [0, 0.42, 0.58], [1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.58], [1, 0.94]);
  const textY = useTransform(scrollYProgress, [0, 0.58], [0, -40]);

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className={`relative w-full bg-stone-950 ${isMobile ? 'h-[140vh]' : 'h-[180vh]'}`}
    >
      {/* Sticky Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Full-screen cinematic video layer */}
        <motion.div
          className="absolute inset-0 w-full h-full will-change-opacity"
          style={{
            opacity: videoOpacity,
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover transform scale-[1.02]"
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
          >
            <source src="/videos/heroVideo.mp4" type="video/mp4" />
          </video>

          {/* Golden sunrise rays */}
          <div className="absolute inset-0 pointer-events-none z-[3] mix-blend-color-dodge opacity-25 sm:opacity-35 bg-[radial-gradient(circle_at_80%_20%,rgba(253,224,71,0.22)_0%,rgba(251,191,36,0.12)_30%,rgba(251,191,36,0.04)_60%,transparent_100%)]" />

          {/* Cinematic overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-stone-950/60 z-[2]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-[2]" />

          {/* Atmospheric horizontal drifting fog layer with vertical parallax */}
          <div className="absolute inset-0 pointer-events-none z-[4] mix-blend-screen opacity-15 overflow-hidden">
            <motion.div 
              className="absolute -left-1/4 top-1/4 w-[150%] h-[50%] bg-gradient-to-r from-transparent via-stone-200/25 to-transparent filter blur-[60px] animate-floating-fog"
              style={{
                y: useTransform(scrollYProgress, [0, 0.75], [0, -30]),
                transform: 'translateZ(0)',
                willChange: 'transform',
              }}
            />
          </div>

          {/* Top dark gradient for premium navbar contrast */}
          <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-[5]" />

          {/* Bottom dark gradient blend to anchor the hero frame */}
          <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none z-[5]" />
        </motion.div>

        {/* Lightweight gradient overlay instead of heavy backdrop blur */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[6] bg-gradient-to-b from-stone-950/0 via-stone-950/30 to-stone-950/80"
          style={{
            opacity: blurOverlayOpacity,
          }}
        />


        {/* Centered Elegant Typography Overlay */}
        <motion.div
          className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pointer-events-none"
          style={{
            opacity: textOpacity,
            scale: textScale,
            y: textY,
            transform: 'translateZ(0)',
            willChange: 'transform, opacity',
          }}
        >
          <div className="text-center max-w-5xl mx-auto w-full pointer-events-auto">
            {/* Cinematic Category Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 mb-5 sm:mb-6"
            >
              <span className="h-[1px] w-6 bg-amber-400" />
              <span className="text-[0.62rem] sm:text-xs font-sans font-medium uppercase tracking-[0.35em] text-amber-300">
                Bespoke Luxury Escapes
              </span>
              <span className="h-[1px] w-6 bg-amber-400" />
            </motion.div>

            {/* Apple & Airbnb Luxe Inspired Elegant Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-light leading-[1.1] tracking-tight mb-6 sm:mb-8 text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            >
              Discover Journeys <br className="hidden sm:inline" />
              <span className="italic font-light bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-100 bg-clip-text text-transparent">
                Beyond Imagination
              </span>
            </motion.h1>

            {/* Clean White Luxury Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans font-light text-white/80 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg tracking-wide px-2 sm:px-0"
            >
              Luxury escapes, spiritual experiences, and unforgettable destinations crafted for modern travelers.
            </motion.p>

            {/* Glassmorphic Responsive CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
            >
              {/* Primary: Start Your Journey */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-3.5 sm:py-4 rounded-full font-sans font-medium text-stone-900 transition-all duration-500 overflow-hidden shadow-luxury w-full sm:w-auto min-w-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 border border-white/40 opacity-95 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-amber-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  Start Your Journey <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>

              {/* Secondary: Explore Packages */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-3.5 sm:py-4 rounded-full font-sans font-medium text-white transition-all duration-500 w-full sm:w-auto min-w-[200px]"
              >
                <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 group-hover:border-white/40 transition-colors duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  Explore Packages
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Smooth Fade Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]),
              pointerEvents: 'none',
            }}
          >
            <span className="text-white/60 text-[0.62rem] font-sans font-light uppercase tracking-[0.25em]">
              Scroll to begin
            </span>
            <ChevronDown size={16} className="text-white/60 animate-bounce" />
          </motion.div>
        </motion.div>

        {/* Floating Location Badge - Hidden on mobile, responsive on larger screens */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-white backdrop-blur-xl text-xs md:text-sm">
          <MapPin size={14} className="text-amber-300 flex-shrink-0" />
          <span className="font-sans font-light tracking-wider">Umrah, Dubai, Maldives, Turkey & more</span>
        </div>
      </div>

    </section>
  );
}
