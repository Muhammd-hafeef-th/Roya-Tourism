import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
  onExitStart?: () => void;
}

/* Intro visible before exit begins (ms) */
const INTRO_DURATION = 3000;

/* Brand gold matching index.css */
const GOLD = '#c9a84c';
const GOLD_LIGHT = 'rgba(201,168,76,0.18)';
const GOLD_MID = 'rgba(201,168,76,0.55)';

export default function CinematicIntro({ onComplete, onExitStart }: CinematicIntroProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Relying on a single timer prevents the component from getting "stuck".
    const exitTimer = setTimeout(() => {
      setVisible(false);
      if (onExitStart) onExitStart();
    }, INTRO_DURATION);
    return () => clearTimeout(exitTimer);
  }, [onExitStart]);

  const preloadRef = useRef<HTMLVideoElement>(null);

  const ease = [0.16, 1, 0.3, 1] as const;
  const slideEase = [0.76, 0, 0.24, 1] as const;
  
  // Custom exit easing - fast start, extremely smooth deceleration.
  const exitEase = [0.25, 1, 0.3, 1] as const;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="cinematic-intro"
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {/* ── Main Sliding Surface ── */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{ 
              background: 'linear-gradient(160deg, #faf9f7 0%, #f5f0e6 50%, #faf9f7 100%)',
              willChange: 'transform, opacity, filter',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '0%', transition: { duration: 1.2, ease: slideEase } }}
            exit={{ 
              x: '100%', // Sliding to the right per request
              opacity: 0, 
              filter: 'blur(8px)',
              transition: { duration: 1.1, ease: exitEase } 
            }}
          >
    
            {/* ── Background Parallax Layer ── */}
            <motion.div 
              className="absolute inset-0"
              exit={{ x: '-15%', opacity: 0, transition: { duration: 1.1, ease: exitEase } }}
            >
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: '70vmax', height: '70vmax',
                  background: `radial-gradient(circle, ${GOLD_LIGHT} 0%, rgba(245,240,230,0.4) 40%, transparent 70%)`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute bottom-[-10%] left-[-10%] rounded-full"
                style={{
                  width: '50vmax', height: '50vmax',
                  background: `radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 65%)`,
                }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-[-8%] right-[-8%] rounded-full"
                style={{
                  width: '40vmax', height: '40vmax',
                  background: `radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)`,
                }}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />

              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD_MID}, transparent)` }} />
              <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD_MID}, transparent)` }} />
            </motion.div>

            {/* ── Content Parallax Layer ── */}
            <motion.div 
              className="relative z-10 flex flex-col items-center text-center px-8 select-none"
              exit={{ 
                x: '-20%', // Deep parallax lag opposite to the rightward slide
                opacity: 0, 
                scale: 0.95,
                transition: { duration: 0.9, ease: exitEase } 
              }}
            >
              {/* Eyebrow / Year */}
              <motion.div
                className="flex items-center gap-3 mb-8 sm:mb-10 lg:mb-12"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.0, ease }}
              >
                <div className="h-px w-8 sm:w-14" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
                <span className="font-sans font-medium uppercase text-stone-500"
                  style={{ fontSize: 'clamp(0.5rem, 1.5vw, 0.7rem)', letterSpacing: '0.5em' }}>
                  Est. 2026
                </span>
                <div className="h-px w-8 sm:w-14" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
              </motion.div>

              {/* Logo */}
              <motion.div
                className="mb-7 sm:mb-8 lg:mb-10 relative mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
                initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.6, delay: 1.2, ease }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1px solid rgba(201,168,76,0.35)` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-[6px] rounded-full"
                  style={{ border: `1px solid rgba(201,168,76,0.20)` }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/logo.jpeg"
                    alt="Roya Tourism Logo"
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                    style={{
                      boxShadow: `0 4px 20px rgba(201,168,76,0.25), 0 0 0 1px rgba(201,168,76,0.25)`,
                    }}
                  />
                </div>
              </motion.div>

              {/* Brand Name */}
              <motion.h1
                className="font-serif font-light leading-none mb-2 sm:mb-3"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 7.5rem)',
                  letterSpacing: '0.04em',
                  color: '#1c1917',
                }}
                initial={{ opacity: 0, x: 40, filter: 'blur(14px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, delay: 1.4, ease }}
              >
                Roya{' '}
                <span
                  className="italic"
                  style={{
                    background: `linear-gradient(120deg, #b8963e 0%, #d4a843 35%, #c9a84c 60%, #b8963e 100%)`,
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 5s linear infinite',
                  }}
                >
                  Tourism
                </span>
              </motion.h1>

              <motion.div
                className="mb-4 sm:mb-5 lg:mb-7"
                style={{
                  height: '2px',
                  width: 'clamp(60px, 15vw, 120px)',
                  background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.3, delay: 1.8, ease }}
              />

              <motion.p
                className="font-sans font-light text-stone-500 uppercase"
                style={{
                  fontSize: 'clamp(0.6rem, 2vw, 0.8rem)',
                  letterSpacing: '0.32em',
                }}
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.6, delay: 2.0, ease }}
              >
                Luxury Journeys Beyond Horizons
              </motion.p>

              {/* Progress Bar */}
              <motion.div
                className="mt-12 sm:mt-16 lg:mt-20 relative overflow-hidden rounded-full"
                style={{ width: 'clamp(90px, 18vw, 140px)', height: '1.5px', background: 'rgba(201,168,76,0.18)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3, duration: 0.8 }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${GOLD}, #d4a843)`,
                    transformOrigin: 'left',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 2.4, ease: 'easeInOut' }}
                />
              </motion.div>

              <motion.p
                className="mt-3 sm:mt-4 font-sans font-light text-stone-400 uppercase tracking-[0.3em]"
                style={{ fontSize: '0.5rem' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6, duration: 0.8 }}
              >
                Preparing your journey
              </motion.p>
            </motion.div>

            {/* ── Corner L-brackets Parallax ── */}
            {(['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'] as const).map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos} w-5 h-5 sm:w-7 sm:h-7 pointer-events-none hidden sm:block`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: '15px', transition: { duration: 0.6 } }}
                transition={{ delay: 1.5 + i * 0.08, duration: 1 }}
              >
                <div
                  className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-full h-px`}
                  style={{ background: `rgba(201,168,76,0.45)` }}
                />
                <div
                  className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} h-full w-px`}
                  style={{ background: `rgba(201,168,76,0.45)` }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
