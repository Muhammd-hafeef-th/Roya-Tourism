import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { domesticPackages } from '../data/packagesData';

export default function DomesticPackages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section id="domestic" className="pt-20 pb-24 lg:pt-32 lg:pb-32 relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[0%] w-[30%] h-[50%] rounded-full bg-gradient-to-l from-[#c9a84c]/10 to-transparent blur-[100px]" />
      </div>

      <div className="container-responsive max-w-[1400px] relative z-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-stone-50 border border-stone-200 shadow-sm mb-6">
            <MapPin size={14} className="text-[#c9a84c]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-stone-600">
              Incredible India
            </span>
            <MapPin size={14} className="text-[#c9a84c]" />
          </div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-stone-900 mb-6 tracking-tight">
            Domestic <span className="text-[#c9a84c] italic">Wonders</span>
          </h2>
          <p className="font-sans text-stone-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Explore the vibrant landscapes and rich heritage of India. From the snow-capped peaks of Kashmir to the serene backwaters of Kerala.
          </p>
        </motion.div>

        {/* Desktop Interactive Accordion (Hidden on Mobile/Tablet) */}
        <div className="hidden lg:flex w-full h-[600px] gap-4 mb-20 max-w-7xl mx-auto">
          {domesticPackages.slice(0, 5).map((pkg, idx) => {
            const isActive = hoveredIndex === idx;
            return (
              <motion.div
                key={pkg.destination}
                onHoverStart={() => setHoveredIndex(idx)}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[0.25,1,0.5,1] shadow-xl ${isActive ? 'flex-[4]' : 'flex-[1]'
                  }`}
              >
                <img
                  src={pkg.image}
                  alt={pkg.destination}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s]"
                  style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent" />
                <div className={`absolute inset-0 bg-[#c9a84c]/20 mix-blend-overlay transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
                  {/* Vertical title when collapsed */}
                  <div className={`absolute bottom-8 left-8 right-8 transition-opacity duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <h3 className="font-serif text-white text-2xl font-medium tracking-wide whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      {pkg.destination}
                    </h3>
                  </div>

                  {/* Full content when active */}
                  <div className={`transition-all duration-700 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#c9a84c] text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                      {pkg.badge}
                    </div>
                    <h3 className="font-serif text-white text-4xl xl:text-5xl font-medium mb-4 drop-shadow-md">
                      {pkg.destination}
                    </h3>

                    <div className="flex items-center gap-6 text-white/90 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#c9a84c]" />
                        <span className="text-sm font-medium">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-widest text-white/70">From</span>
                        <span className="font-serif text-2xl text-[#c9a84c] font-semibold">{pkg.price}</span>
                      </div>
                    </div>

                    <p className="text-white/80 font-sans text-sm max-w-md line-clamp-2 mb-6">
                      {pkg.description}
                    </p>

                    <button
                      onClick={() => window.open(`https://wa.me/1234567890?text=${encodeURIComponent("I'm interested in the " + pkg.destination + ' domestic package')}`, '_blank')}
                      className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-stone-900 text-xs font-bold tracking-widest uppercase hover:bg-[#c9a84c] hover:text-white transition-colors duration-300 shadow-lg"
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile & Tablet Modern Layout (Hidden on Desktop) */}
        <div className="lg:hidden relative pb-20 px-4 sm:px-6">
          {/* Mobile: Full-width horizontal scroll */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 md:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {domesticPackages.slice(0, 4).map((pkg, idx) => (
              <motion.div
                key={pkg.destination}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group flex-shrink-0 w-[85vw] sm:w-[80vw] snap-center"
              >
                {/* Mobile Card */}
                <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] transition-all duration-500 border border-stone-200/50 hover:border-[#c9a84c]/40 bg-white">
                  <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-stone-900">
                    <img
                      src={pkg.image}
                      alt={pkg.destination}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/10 to-stone-950/90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#c9a84c]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 text-white text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg group-hover:bg-[#c9a84c] group-hover:border-[#c9a84c] transition-all duration-300">
                      {pkg.badge}
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 text-white">
                      <Clock size={14} className="text-[#c9a84c]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{pkg.duration}</span>
                    </div>
                    <div className="absolute bottom-4 right-4 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl">
                      <span className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold block">Starting from</span>
                      <span className="font-serif text-xl text-[#c9a84c] font-bold">{pkg.price}</span>
                    </div>
                  </div>
                  <div className="relative bg-white p-6 sm:p-7">
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-3 leading-tight group-hover:text-[#c9a84c] transition-colors duration-300">
                      {pkg.destination}
                    </h3>
                    <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed line-clamp-2 mb-5">
                      {pkg.description}
                    </p>
                    <button
                      onClick={() => window.open(`https://wa.me/1234567890?text=${encodeURIComponent("I'm interested in the " + pkg.destination + ' domestic package')}`, '_blank')}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-stone-900 to-stone-800 hover:from-[#c9a84c] hover:to-[#b8943d] text-white text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group/btn relative overflow-hidden"
                    >
                      <span className="relative z-10">Explore Package</span>
                      <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-2 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                    </button>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/20 to-[#c9a84c]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Premium Tablet Editorial Layout */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-7">
            {domesticPackages.slice(0, 4).map((pkg, idx) => (
              <motion.div
                key={pkg.destination}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group"
              >
                <div className="relative rounded-[34px] overflow-hidden bg-white border border-stone-200 shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.14)] transition-all duration-500">

                  {/* Image */}
                  <div className="relative h-[320px] overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.destination}
                      className="w-full h-full object-cover object-center transition-transform duration-[1400ms] group-hover:scale-105"
                    />

                    {/* Soft Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Top Tags */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between">

                      <div className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
                        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white">
                          {pkg.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/25 backdrop-blur-md border border-white/10">
                        <Clock size={13} className="text-[#e7c56d]" />
                        <span className="text-[10px] font-semibold tracking-wider text-white uppercase">
                          {pkg.duration}
                        </span>
                      </div>
                    </div>

                    {/* Floating Price */}
                    <div className="absolute bottom-5 left-5">
                      <div className="px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg">
                        <p className="text-[9px] uppercase tracking-[0.25em] text-stone-500 mb-1 font-semibold">
                          Starting From
                        </p>

                        <h4 className="font-serif text-3xl text-[#c9a84c] font-semibold leading-none">
                          {pkg.price}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <div className="flex items-start justify-between gap-4 mb-4">

                      <div>
                        <h3 className="font-serif text-[32px] leading-tight text-stone-900 mb-2 group-hover:text-[#c9a84c] transition-colors duration-300">
                          {pkg.destination}
                        </h3>

                        <p className="text-stone-600 text-[15px] leading-relaxed line-clamp-2 max-w-[95%]">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Arrow Circle */}
                      <div className="min-w-[52px] h-[52px] rounded-full bg-[#f8f3e7] flex items-center justify-center group-hover:bg-[#c9a84c] transition-colors duration-300">
                        <ArrowRight
                          size={18}
                          className="text-[#c9a84c] group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() =>
                        window.open(
                          `https://wa.me/1234567890?text=${encodeURIComponent(
                            "I'm interested in the " +
                            pkg.destination +
                            " domestic package"
                          )}`,
                          "_blank"
                        )
                      }
                      className="w-full h-14 rounded-2xl border border-stone-300 text-stone-900 font-semibold tracking-[0.18em] uppercase text-xs hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300"
                    >
                      Explore Package
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Scroll Indicator for Mobile */}
          <div className="md:hidden flex justify-center gap-2 mt-4">
            {domesticPackages.slice(0, 4).map((_, idx) => (
              <div
                key={idx}
                className="w-2 h-2 rounded-full bg-stone-300 transition-all duration-300"
                style={{
                  width: idx === 0 ? '24px' : '8px',
                  backgroundColor: idx === 0 ? '#c9a84c' : '#d6d3d1'
                }}
              />
            ))}
          </div>

          {/* Swipe Hint Animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-stone-400 text-xs tracking-widest uppercase"
          >
            <span>Swipe</span>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={14} />
            </motion.div>
          </motion.div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 lg:mt-0"
        >
          <Link
            to="/domestic-trips"
            className="group inline-flex items-center justify-center gap-4 px-10 py-4 rounded-full bg-stone-900 text-white shadow-xl hover:bg-[#c9a84c] hover:shadow-[0_15px_40px_rgba(201,168,76,0.4)] hover:-translate-y-1 transition-all duration-500"
          >
            <span className="font-serif text-xl font-medium tracking-wide">
              View All Domestic Packages
            </span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#c9a84c] transition-colors duration-500">
              <ArrowRight size={20} className="text-white group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
