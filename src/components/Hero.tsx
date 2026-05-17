import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarDays, ChevronDown, MapPin, Plane, Search, ShieldCheck, Sparkles, Star } from 'lucide-react';

const heroImages = [
  { src: '/img1.png', label: 'Maldives', caption: 'Island villas' },
  { src: '/img2.png', label: 'Dubai', caption: 'Desert nights' },
  { src: '/heroImage.jpeg', label: 'Honeymoon', caption: 'Ocean stays' },
];

const trustLogos = ['Umrah Care', 'Trip Plan', 'Expedia', 'Air Partner', 'Roya Select'];

function MiniCard({ image, index }: { image: typeof heroImages[0]; index: number }) {
  return (
    <motion.div
      className="hero-mini-card"
      initial={{ opacity: 0, y: 26, rotateY: index % 2 ? -14 : 14 }}
      animate={{
        opacity: 1,
        y: index % 2 ? [0, -12, 0] : [0, 12, 0],
        rotateY: index % 2 ? [-8, -2, -8] : [8, 2, 8],
      }}
      transition={{
        opacity: { duration: 0.7, delay: 0.45 + index * 0.12 },
        y: { duration: 5 + index, repeat: Infinity, ease: 'easeInOut' },
        rotateY: { duration: 5 + index, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <img src={image.src} alt={image.label} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
      <div className="absolute bottom-3 left-3 right-3">
        <div className="font-serif text-lg font-semibold text-white">{image.label}</div>
        <div className="font-sans text-[0.68rem] text-white/70">{image.caption}</div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const cardY = useTransform(scrollYProgress, [0, 1], ['0%', '9%']);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -7]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const planeX = useTransform(scrollYProgress, [0, 1], ['-10%', '108%']);

  return (
    <section id="hero" ref={ref} className="hero-showcase relative min-h-screen overflow-hidden">
      <motion.div className="hero-showcase-bg" style={{ y: bgY }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.72),transparent_30%),linear-gradient(180deg,rgba(250,249,247,0.18),rgba(8,20,21,0.52))]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#faf9f7] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 pb-14 pt-24 sm:px-6 lg:pt-28">
        <div className="hero-perspective relative w-full">
          <motion.div
            className="hero-browser-card"
            style={{ y: cardY, rotateX, scale, transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 42, rotateX: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative z-10 flex min-h-[520px] flex-col px-4 py-4 sm:min-h-[580px] sm:px-6 sm:py-5 lg:min-h-[620px] lg:px-8">
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.25 }}
                  className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/46 px-4 py-2 text-stone-800 shadow-soft backdrop-blur-xl"
                >
                  <Sparkles size={13} className="text-gold-700" />
                  <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em]">Handcrafted tours for peaceful travel</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.35 }}
                className="max-w-4xl font-serif text-[2.7rem] font-semibold leading-[0.98] text-stone-950 sm:text-6xl lg:text-[5.5rem] xl:text-[6.1rem]"
                >
                  The best place to plan your <span className="italic text-gold-700">next journey</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.48 }}
                  className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-stone-700 sm:text-base"
                >
                  Premium Umrah, Maldives, Dubai, and international holiday packages with trusted guidance from inquiry to return.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.54 }}
                  className="mt-6 flex flex-wrap items-center justify-center gap-3"
                >
                  <div className="rounded-full border border-white/45 bg-white/52 px-4 py-2 font-sans text-xs font-semibold text-stone-800 backdrop-blur-xl">
                    Umrah and Hajj departures
                  </div>
                  <div className="rounded-full border border-white/45 bg-white/52 px-4 py-2 font-sans text-xs font-semibold text-stone-800 backdrop-blur-xl">
                    Dubai and Maldives luxury stays
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.62 }}
                  className="mt-7 flex w-full max-w-xl flex-col gap-3 rounded-[2rem] border border-white/48 bg-white/55 p-2 shadow-luxury backdrop-blur-2xl sm:flex-row sm:rounded-full"
                >
                  <div className="flex flex-1 items-center gap-3 rounded-full bg-white/70 px-4 py-3 text-left">
                    <Search size={16} className="text-stone-500" />
                    <span className="font-sans text-sm text-stone-500">Search Umrah, Maldives, Dubai...</span>
                  </div>
                  <button
                    onClick={() => document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3 font-sans text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
                  >
                    Browse tours
                    <ArrowRight size={15} />
                  </button>
                </motion.div>

                <motion.div
                  className="mt-7 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.75 }}
                >
                  {[
                    { icon: CalendarDays, label: 'Custom itineraries' },
                    { icon: ShieldCheck, label: 'Visa support' },
                    { icon: Star, label: 'Luxury stays' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/42 px-4 py-3 backdrop-blur-xl">
                      <item.icon size={15} className="text-gold-700" />
                      <span className="font-sans text-xs font-semibold text-stone-800">{item.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="hidden items-center justify-center gap-7 border-t border-white/28 pt-5 md:flex">
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.22em] text-white/80">Featured with trusted travel partners</span>
                <div className="flex flex-wrap justify-center gap-5">
                  {trustLogos.map(name => (
                    <span key={name} className="font-serif text-sm font-semibold text-white/88 drop-shadow">{name}</span>
                  ))}
                </div>
              </div>
            </div>

            <motion.div className="hero-flight-path" style={{ x: planeX }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-stone-950 shadow-luxury backdrop-blur-xl">
                <Plane size={18} />
              </div>
            </motion.div>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute left-2 top-[30%] w-36 xl:left-6 xl:w-40">
              <MiniCard image={heroImages[1]} index={0} />
            </div>
            <div className="absolute right-2 top-[24%] w-36 xl:right-6 xl:w-40">
              <MiniCard image={heroImages[2]} index={1} />
            </div>
            <div className="absolute bottom-[8%] right-[10%] w-36 xl:w-40">
              <MiniCard image={heroImages[0]} index={2} />
            </div>
          </div>
        </div>
      </div>

      <button
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/85"
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 font-sans text-[0.65rem] uppercase tracking-[0.2em] backdrop-blur">Scroll</span>
        <ChevronDown size={18} />
      </button>

      <div className="absolute bottom-8 right-6 z-20 hidden items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-white backdrop-blur-xl md:flex">
        <MapPin size={15} className="text-gold-300" />
        <span className="font-sans text-xs">Umrah, Dubai, Maldives, Turkey and more</span>
      </div>
    </section>
  );
}
