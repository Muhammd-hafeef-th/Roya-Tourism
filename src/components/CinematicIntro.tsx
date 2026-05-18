import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

/* Intro visible before exit begins (ms) */
const INTRO_DURATION = 3200;
/* Duration of the exit slide animation (ms) */
const EXIT_DURATION = 1100;

/* Brand gold matching index.css */
const GOLD = '#c9a84c';
const GOLD_LIGHT = 'rgba(201,168,76,0.18)';
const GOLD_MID = 'rgba(201,168,76,0.55)';

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase('exit'), INTRO_DURATION);
    const doneTimer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, INTRO_DURATION + EXIT_DURATION);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [onComplete]);

  /* Preload hero video silently */
  const preloadRef = useRef<HTMLVideoElement>(null);

  const ease = [0.16, 1, 0.3, 1] as const;

  // Cinematic luxury spring for the main surface sliding left
  const slideTransition = {
    type: 'spring',
    damping: 42,
    stiffness: 95,
    mass: 1.1,
    restDelta: 0.001
  };

  // A slightly looser spring for parallax elements to create that "motion lag"
  const lagTransition = {
    type: 'spring',
    damping: 48,
    stiffness: 85,
    mass: 1.4,
    restDelta: 0.001
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinematic-intro"
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
        >
          {/* ── Main Sliding Surface ── */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #faf9f7 0%, #f5f0e6 50%, #faf9f7 100%)',
              willChange: 'transform, opacity, filter',
              boxShadow: '20px 0 60px rgba(0,0,0,0.15)'
            }}
            initial={{ x: '0%', scale: 1, filter: 'blur(0px)', opacity: 1 }}
            animate={
              phase === 'exit'
                ? { x: '-100%', scale: 0.98, filter: 'blur(4px)', opacity: 0.95 }
                : { x: '0%', scale: 1, filter: 'blur(0px)', opacity: 1 }
            }
            transition={slideTransition}
          >
            <video
              ref={preloadRef}
              src="/videos/hero-image-roya.mp4"
              preload="auto"
              muted
              playsInline
              className="absolute opacity-0 pointer-events-none w-0 h-0"
              aria-hidden="true"
            />

            {/* ── Background Parallax Layer ── */}
            <motion.div
              className="absolute inset-0"
              animate={phase === 'exit' ? { x: '35%', scale: 1.05 } : { x: '0%', scale: 1 }}
              transition={lagTransition}
            >
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: '70vmax', height: '70vmax',
                  background: `radial-gradient(circle, ${GOLD_LIGHT} 0%, rgba(245,240,230,0.4) 40%, transparent 70%)`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
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
              animate={phase === 'exit' ? { x: '18%', opacity: 0 } : { x: '0%', opacity: 1 }}
              transition={{ ...lagTransition, opacity: { duration: 0.7, ease: 'easeIn', delay: 0.1 } }}
            >
              {/* Eyebrow */}
              <motion.div
                className="flex items-center gap-3 mb-8 sm:mb-10"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease }}
              >
                <div className="h-px w-8 sm:w-14" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
                <span className="font-sans font-medium uppercase text-stone-500"
                  style={{ fontSize: 'clamp(0.5rem, 1.5vw, 0.6rem)', letterSpacing: '0.5em' }}>
                  Est. 2026
                </span>
                <div className="h-px w-8 sm:w-14" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
              </motion.div>

              {/* Logo Parallax */}
              <motion.div
                className="mb-7 sm:mb-8"
                initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.6, delay: 0.4, ease }}
              >
                <motion.div
                  className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-5"
                  animate={phase === 'exit' ? { x: '25%' } : { x: '0%' }}
                  transition={lagTransition}
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
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                      style={{
                        boxShadow: `0 4px 20px rgba(201,168,76,0.25), 0 0 0 1px rgba(201,168,76,0.25)`,
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Brand Name Parallax */}
              <motion.h1
                className="font-serif font-light leading-none mb-2 sm:mb-3"
                style={{
                  fontSize: 'clamp(2.8rem, 8vw, 6rem)',
                  letterSpacing: '0.04em',
                  color: '#1c1917',
                }}
                initial={{ opacity: 0, y: 26, filter: 'blur(14px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, delay: 0.65, ease }}
              >
                <motion.div
                  animate={phase === 'exit' ? { x: '12%' } : { x: '0%' }}
                  transition={lagTransition}
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
                </motion.div>
              </motion.h1>

              <motion.div
                className="mb-4 sm:mb-5"
                style={{
                  height: '2px',
                  width: 'clamp(50px, 12vw, 100px)',
                  background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.3, delay: 1.05, ease }}
              />

              <motion.p
                className="font-sans font-light text-stone-500 uppercase"
                style={{
                  fontSize: 'clamp(0.56rem, 1.8vw, 0.72rem)',
                  letterSpacing: '0.32em',
                }}
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.6, delay: 1.25, ease }}
              >
                <motion.div
                  animate={phase === 'exit' ? { x: '6%' } : { x: '0%' }}
                  transition={lagTransition}
                >
                  Luxury Journeys Beyond Horizons
                </motion.div>
              </motion.p>

              {/* Progress Bar */}
              <motion.div
                className="mt-12 sm:mt-14 relative overflow-hidden rounded-full"
                style={{ width: 'clamp(80px, 15vw, 120px)', height: '1.5px', background: 'rgba(201,168,76,0.18)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'exit' ? 0 : 1 }}
                transition={phase === 'exit' ? { duration: 0.3 } : { delay: 1.55, duration: 0.8 }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${GOLD}, #d4a843)`,
                    transformOrigin: 'left',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 1.6, ease: 'easeInOut' }}
                />
              </motion.div>

              <motion.p
                className="mt-3 font-sans font-light text-stone-400 uppercase tracking-[0.3em]"
                style={{ fontSize: '0.5rem' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'exit' ? 0 : 1 }}
                transition={phase === 'exit' ? { duration: 0.3 } : { delay: 1.8, duration: 0.8 }}
              >
                Preparing your journey
              </motion.p>
            </motion.div>

            {/* ── Corner L-brackets Parallax ── */}
            {(['top-5 left-5', 'top-5 right-5', 'bottom-5 left-5', 'bottom-5 right-5'] as const).map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos} w-5 h-5 sm:w-7 sm:h-7 pointer-events-none`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: phase === 'exit' ? 0 : 1,
                  x: phase === 'exit' ? '20px' : '0px'
                }}
                transition={{
                  opacity: phase === 'exit' ? { duration: 0.5 } : { delay: 0.7 + i * 0.08, duration: 1 },
                  x: lagTransition
                }}
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
