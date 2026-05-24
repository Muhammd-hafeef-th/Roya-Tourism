import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ameen Nizar',
    location: 'Kochi, Kerala',
    package: 'Kerala Backwater Retreat',
    rating: 5,
    text: 'The private houseboat cruise through Alleppey was peaceful,and beautifully organized from beginning to end.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1200&auto=format&fit=crop',
  },

  {
    name: 'Fathima Rashid',
    location: 'Calicut, Kerala',
    package: 'Munnar Luxury Hills',
    rating: 5,
    text: 'Munnar felt magical. The foggy tea plantations and luxury resort experience exceeded every expectation we had.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
  },

  {
    name: 'Shamil Kareem',
    location: 'Kannur, Kerala',
    package: 'Kovalam Beach Escape',
    rating: 5,
    text: 'The beachside villa, Ayurvedic spa, and sunset dinners made our Kerala vacation unforgettable and deeply relaxing.',
    image:
      'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=1200&auto=format&fit=crop',
  },

  {
    name: 'Omar Al Balushi',
    location: 'Muscat, Oman',
    package: 'Dubai Premium Tour',
    rating: 5,
    text: 'Roya planned every Dubai experience perfectly — luxury shopping, desert safari, yacht dining, and Burj Khalifa views.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Saeed Al Riyami',
    location: 'Salalah, Oman',
    package: 'Wayanad Nature Escape',
    rating: 5,
    text: 'Wayanad was calm, green, and incredibly refreshing. The private resort experience felt premium in every way.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function Testimonials() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  });

  const [current, setCurrent] = useState(0);

  /* PAUSE AUTO SCROLL */
  const [paused, setPaused] = useState(false);

  /* AUTO CHANGE DESKTOP */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* OUTSIDE CLICK RESUME */
  useEffect(() => {
    const handleClickOutside = () => {
      setPaused(false);
    };

    if (paused) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [paused]);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 md:py-28 xl:py-32 2xl:py-40 bg-[#faf7f2]"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#c9a84c]/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#c9a84c]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1700px] 2xl:max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#e8dcc2] bg-white shadow-sm mb-6">

            <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />

            <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-stone-600">
              Guest Experiences
            </span>

            <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />
          </div>

          <h2 className="font-serif text-5xl md:text-6xl xl:text-7xl text-stone-900 leading-tight mb-6">
            Stories of{' '}
            <span className="italic text-[#c9a84c]">
              Luxury Journeys
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-stone-500 text-lg md:text-xl leading-relaxed">
            Discover unforgettable travel memories shared by our guests across Kerala,
            Dubai, Munnar, Wayanad, Kovalam, and beyond.
          </p>
        </motion.div>

        {/* PREMIUM MOBILE + TABLET HORIZONTAL EXPERIENCE */}
        <div className="lg:hidden relative">

          {/* Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#c9a84c]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Horizontal Auto Scroll Wrapper */}
          <div className="overflow-hidden relative">

            <motion.div
              animate={
                paused
                  ? {}
                  : {
                    x: ['0%', '-50%'],
                  }
              }
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex gap-5 w-max py-4"
            >

              {[...testimonials, ...testimonials].map((item, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPaused(true);
                  }}
                  className="flex-shrink-0 w-[88vw] sm:w-[72vw] md:w-[420px] cursor-pointer"
                >

                  {/* PREMIUM GLASS CARD */}
                  <div className="group relative overflow-hidden rounded-[36px] bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.14)] transition-all duration-500">

                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-[160px] h-[160px] bg-[#c9a84c]/10 rounded-full blur-[70px]" />

                    {/* TOP SECTION */}
                    <div className="relative p-5 pb-0">

                      {/* User Row */}
                      <div className="flex items-center gap-4 mb-5">

                        {/* Image */}
                        <div className="relative flex-shrink-0">

                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low"
                            className="w-20 h-20 rounded-[26px] object-cover border border-white shadow-lg"
                          />

                          {/* Rating Badge */}
                          <div className="absolute -bottom-2 -right-2 px-2 py-1 rounded-full bg-[#c9a84c] shadow-lg">

                            <span className="text-white text-[10px] tracking-[0.12em]">
                              5.0
                            </span>
                          </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">

                          <h3 className="font-serif text-[28px] leading-tight text-stone-900">
                            {item.name}
                          </h3>

                          <p className="text-stone-500 text-sm mt-1">
                            {item.location}
                          </p>

                          {/* Stars */}
                          <div className="flex items-center gap-1 mt-3">

                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className="text-[#c9a84c] text-sm"
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Floating Quote */}
                      <div className="absolute top-5 right-5">

                        <div className="w-14 h-14 rounded-2xl bg-[#faf3e2] flex items-center justify-center">

                          <Quote
                            size={24}
                            className="text-[#c9a84c]/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Review */}
                    <div className="px-5 pt-5 pb-6">

                      <p className="text-stone-600 text-[15px] leading-relaxed mb-6">
                        {item.text}
                      </p>

                      {/* Bottom Section */}
                      <div className="flex items-center justify-between gap-4">

                        {/* Package */}
                        <div className="px-4 py-2 rounded-full bg-[#f7f1e4] text-[#b8923f] text-[10px] uppercase tracking-[0.22em] font-bold whitespace-nowrap">
                          {item.package}
                        </div>

                        {/* Premium Button */}
                        <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center group-hover:bg-[#c9a84c] transition-colors duration-300">

                          <span className="text-white text-lg group-hover:rotate-12 transition-transform duration-300">
                            ✦
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Luxury Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-60" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Premium Indicator */}
          <div className="flex justify-center mt-7 gap-2">

            {testimonials.map((_, idx) => (
              <div
                key={idx}
                className={`rounded-full transition-all duration-500 ${idx === current
                  ? 'w-10 h-2 bg-[#c9a84c]'
                  : 'w-2 h-2 bg-stone-300'
                  }`}
              />
            ))}
          </div>
        </div>
        {/* DESKTOP + TV */}
        {/* DESKTOP + TV */}
        <div className="hidden lg:grid grid-cols-12 gap-7 items-start mt-10">

          {/* MAIN FEATURED CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-7 2xl:col-span-8 group"
          >
            <div className="relative h-[620px] xl:h-[680px] 2xl:h-[760px] rounded-[42px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.18)]">

              {/* IMAGE */}
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* CONTENT */}
              <div className="absolute bottom-6 left-6 right-6 xl:bottom-8 xl:left-8 xl:right-8">

                <div className="rounded-[32px] border border-white/10 bg-black/25 backdrop-blur-xl p-6 xl:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">

                  <div className="flex items-start justify-between gap-10">

                    {/* LEFT */}
                    <div className="max-w-3xl">

                      <Quote
                        size={50}
                        className="text-[#e7c56d]/40 mb-5"
                      />

                      <p className="text-white/90 text-[18px] xl:text-[22px] leading-relaxed mb-8 font-light">
                        {testimonials[current].text}
                      </p>

                      <div>

                        <h3 className="font-serif text-3xl xl:text-4xl text-white mb-2">
                          {testimonials[current].name}
                        </h3>

                        <p className="text-white/70 text-lg">
                          {testimonials[current].location}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="text-right">

                      <div className="text-[#e7c56d] text-lg tracking-[0.25em] mb-5">
                        ★★★★★
                      </div>

                      <div className="px-5 py-3 rounded-full bg-[#c9a84c] text-white text-xs uppercase tracking-[0.25em] font-semibold whitespace-nowrap">
                        {testimonials[current].package}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SIDE PANEL */}
          <div className="col-span-5 2xl:col-span-4 h-[620px] xl:h-[680px] 2xl:h-[760px] overflow-hidden">

            {/* SCROLLABLE LIST */}
            <div
              className="h-full overflow-y-auto pr-2 flex flex-col gap-4 scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >

              {testimonials.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`group relative overflow-hidden rounded-[30px] transition-all duration-500 text-left ${idx === current
                    ? 'bg-stone-900 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]'
                    : 'bg-white border border-[#eadfc9] hover:bg-[#faf6ed]'
                    }`}
                >

                  <div className="flex items-center gap-4 p-4">

                    {/* IMAGE */}
                    <div className="relative flex-shrink-0">

                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        className="w-16 h-16 rounded-[20px] object-cover"
                      />

                      {/* STAR BADGE */}
                      <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#c9a84c] flex items-center justify-center text-white text-[10px] shadow-lg">
                        ★
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">

                      <h4
                        className={`font-serif text-[24px] leading-tight mb-1 ${idx === current
                          ? 'text-white'
                          : 'text-stone-900'
                          }`}
                      >
                        {item.name}
                      </h4>

                      <p
                        className={`text-sm mb-3 ${idx === current
                          ? 'text-white/70'
                          : 'text-stone-500'
                          }`}
                      >
                        {item.location}
                      </p>

                      {/* PACKAGE */}
                      <div
                        className={`inline-flex px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-semibold ${idx === current
                          ? 'bg-white/10 text-[#e7c56d]'
                          : 'bg-[#f8f1df] text-[#b8923f]'
                          }`}
                      >
                        {item.package}
                      </div>
                    </div>
                  </div>

                  {/* ACTIVE BORDER */}
                  {idx === current && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
