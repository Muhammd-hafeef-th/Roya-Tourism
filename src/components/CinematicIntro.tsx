import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

/* Total intro duration before exit begins (ms) */
const INTRO_DURATION = 0;
/* Duration of the exit wipe animation (ms) */
const EXIT_DURATION = 3000;

/* Brand gold matching index.css — #c9a84c */
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
    }, INTRO_DURATION + EXIT_DURATION + 100);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [onComplete]);

  /* Preload hero video silently */
  const preloadRef = useRef<HTMLVideoElement>(null);

  const ease = [0.16, 1, 0.3, 1] as const;

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinematic-intro"
          className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          /* Warm cream background — matches site body */
          style={{ background: 'linear-gradient(160deg, #faf9f7 0%, #f5f0e6 50%, #faf9f7 100%)' }}
        >
          {/* ── Preload hero video silently ── */}
          <video
            ref={preloadRef}
            src="/videos/hero-image-roya.mp4"
            preload="auto"
            muted
            playsInline
            className="absolute opacity-0 pointer-events-none w-0 h-0"
            aria-hidden="true"
          />

          {/* ── Ambient gold radial glow (matches About section decoration) ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            {/* Subtle secondary glow — bottom left, mirrors About bg decoration */}
            <motion.div
              className="absolute bottom-[-10%] left-[-10%] rounded-full"
              style={{
                width: '50vmax', height: '50vmax',
                background: `radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 65%)`,
              }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Top right soft light */}
            <motion.div
              className="absolute top-[-8%] right-[-8%] rounded-full"
              style={{
                width: '40vmax', height: '40vmax',
                background: `radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)`,
              }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            {/* Hairline border top / bottom — matches ScrollJourney travel-grid feel */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD_MID}, transparent)` }} />
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD_MID}, transparent)` }} />
          </div>

          {/* ── Curtain exit — cream panels matching site bg ── */}
          <div className="absolute inset-0 z-20 pointer-events-none flex">
            <motion.div
              className="w-1/2 h-full"
              style={{ background: 'linear-gradient(to right, #f5f0e6, #faf9f7)' }}
              initial={{ x: 0 }}
              animate={phase === 'exit' ? { x: '-100%' } : { x: 0 }}
              transition={{ duration: EXIT_DURATION / 1000, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              className="w-1/2 h-full"
              style={{ background: 'linear-gradient(to left, #f5f0e6, #faf9f7)' }}
              initial={{ x: 0 }}
              animate={phase === 'exit' ? { x: '100%' } : { x: 0 }}
              transition={{ duration: EXIT_DURATION / 1000, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>

          {/* ── Main brand content ── */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 select-none">

            {/* Eyebrow with gold lines — identical pattern to About/ScrollJourney */}
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

            {/* Circular logo emblem — gold on cream */}
            <motion.div
              className="mb-7 sm:mb-8"
              initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.6, delay: 0.4, ease }}
            >
              <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-5">
                {/* Outer rotating ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1px solid rgba(201,168,76,0.35)` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                />
                {/* Inner counter-rotating ring */}
                <motion.div
                  className="absolute inset-[6px] rounded-full"
                  style={{ border: `1px solid rgba(201,168,76,0.20)` }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                />
                {/* Core logo image from public folder */}
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
              </div>
            </motion.div>

            {/* Brand name — stone-900, matches About h2 */}
            <motion.h1
              className="font-serif font-light leading-none mb-2 sm:mb-3"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 6rem)',
                letterSpacing: '0.04em',
                color: '#1c1917', /* stone-900 */
              }}
              initial={{ opacity: 0, y: 26, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.8, delay: 0.65, ease }}
            >
              Roya{' '}
              {/* Gold italic — matches About "Worth Remembering" style */}
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

            {/* Gold divider — matches About gold-divider utility */}
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

            {/* Subheading — stone-500 font-sans, matches About body text */}
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
              Luxury Journeys Beyond Horizons
            </motion.p>

            {/* Progress bar — gold on warm cream surface */}
            <motion.div
              className="mt-12 sm:mt-14 relative overflow-hidden rounded-full"
              style={{ width: 'clamp(80px, 15vw, 120px)', height: '1.5px', background: 'rgba(201,168,76,0.18)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.55, duration: 0.8 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${GOLD}, #d4a843)`,
                  transformOrigin: 'left',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: (INTRO_DURATION - 700) / 1000, delay: 1.75, ease: 'linear' }}
              />
            </motion.div>

            <motion.p
              className="mt-3 font-sans font-light text-stone-400 uppercase tracking-[0.3em]"
              style={{ fontSize: '0.5rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              Preparing your journey
            </motion.p>
          </div>

          {/* ── Corner L-brackets — gold, matching brand aesthetic ── */}
          {(['top-5 left-5', 'top-5 right-5', 'bottom-5 left-5', 'bottom-5 right-5'] as const).map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-5 h-5 sm:w-7 sm:h-7 pointer-events-none`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.08, duration: 1 }}
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
      )}
    </AnimatePresence>
  );
}
