import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Map, Plane, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Map,
    eyebrow: '01 / Discover',
    title: 'Choose your dream route',
    text: 'Tell us the mood, budget, dates, and people travelling. We shape the journey around you.',
  },
  {
    icon: CalendarCheck,
    eyebrow: '02 / Design',
    title: 'A polished itinerary is crafted',
    text: 'Flights, hotels, transfers, visas, guides, and experiences are arranged with premium care.',
  },
  {
    icon: Plane,
    eyebrow: '03 / Travel',
    title: 'Move with confidence',
    text: 'Our support team stays close from airport pickup to the final day of the trip.',
  },
  {
    icon: ShieldCheck,
    eyebrow: '04 / Remember',
    title: 'Return with stories',
    text: 'Every detail is built so your family remembers the feeling, not the planning stress.',
  },
];

export default function ScrollJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Apply spring physics to raw scroll value for buttery smooth interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 18,
    restDelta: 0.001
  });

  const rotateX = useTransform(smoothProgress, [0, 0.45, 1], [8, 0, -6]);
  const rotateZ = useTransform(smoothProgress, [0, 0.5, 1], [-4, 0, 4]);
  const y = useTransform(smoothProgress, [0, 1], [60, -50]);
  const planeX = useTransform(smoothProgress, [0, 1], ['-12%', '112%']);
  const planeY = useTransform(smoothProgress, [0, 0.5, 1], [40, -12, 24]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-20 pb-10 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-12">
      <div className="absolute inset-0 travel-grid opacity-70" />
      <div className="absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gold-300/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-gold-400" />
              <span className="section-tag">Travel Flow</span>
            </div>
            <h2 className="font-serif text-4xl font-semibold leading-[1.08] text-stone-950 sm:text-5xl lg:text-6xl">
              Watch your trip move from idea to unforgettable.
            </h2>
            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-stone-600 sm:text-lg">
              A premium travel experience should feel guided from the first message. Scroll through the journey and see how Roya Tourism handles every step.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-md">
              {['Visa help', 'Hotel picks', '24/7 care'].map(item => (
                <div key={item} className="rounded-2xl border border-gold-200 bg-white/70 px-3 py-4 text-center shadow-soft">
                  <div className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px] perspective-stage sm:min-h-[560px]" style={{ perspective: '1000px' }}>
            <motion.div
              className="absolute left-0 right-0 top-10 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent"
              style={inView && !prefersReduced ? { y: planeY } : {}}
            />
            <motion.div className="absolute top-6 z-20" style={inView && !prefersReduced ? { x: planeX, y: planeY } : {}}>
              <div className="journey-plane">
                <Plane size={22} />
              </div>
            </motion.div>

            <motion.div
              className="relative mx-auto grid max-w-xl gap-5"
              style={inView && !prefersReduced ? {
                rotateX,
                rotateZ,
                y,
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0)',
                willChange: 'transform',
              } : { transform: 'none' }}
            >
              {steps.map((step, index) => (
                <motion.article
                  key={step.title}
                  className="journey-card"
                  style={{
                    transform: `translateZ(${(steps.length - index) * 15}px) translateX(${index % 2 ? 16 : -8}px)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500 text-white shadow-gold-sm">
                      <step.icon size={20} />
                    </div>
                    <div>
                      <div className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-600">
                        {step.eyebrow}
                      </div>
                      <h3 className="mt-1 font-serif text-2xl font-semibold text-stone-950">{step.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-stone-600">{step.text}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
