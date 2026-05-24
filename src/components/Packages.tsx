import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Clock, Hotel, Plane, ArrowRight, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { internationalPackages } from '../data/packagesData';

const BentoCard = React.memo(function BentoCard({ pkg, index, isLarge }: { pkg: typeof internationalPackages[0]; index: number; isLarge?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const handleClick = useCallback(() => {
    const url = `https://wa.me/+917356231571?text=${encodeURIComponent("I'm interested in the " + pkg.destination + ' package')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [pkg.destination]);

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? undefined : { opacity: 0, scale: 0.96, y: 30 }}
      animate={inView && !prefersReduced ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
    >
      {/* Background Image */}
      <img
        src={pkg.image}
        alt={pkg.destination}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out will-change-transform group-hover:scale-110"
      />
      
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/40 to-transparent transition-opacity duration-700" />
      <div className="absolute inset-0 bg-[#c9a84c]/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-700" />

      {/* Top badges */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg">
          <Compass size={14} className={pkg.isSpecialized ? "text-[#c9a84c]" : "text-white"} />
          {pkg.country}
        </div>

        {pkg.badge && (
          <div className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg ${
            pkg.isSpecialized ? 'bg-[#c9a84c] text-white' : 'bg-white text-stone-900'
          }`}>
            {pkg.badge}
          </div>
        )}
      </div>

      {/* Content wrapper */}
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-20">
        <div className="transform transition-all duration-500 ease-out lg:translate-y-6 group-hover:translate-y-0">
          
          {/* Title & Price Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <h3 className={`font-serif text-white font-medium leading-[1.1] mb-2 drop-shadow-md ${
                isLarge ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl'
              }`}>
                {pkg.destination}
              </h3>
              {isLarge && (
                <p className="text-white/80 font-sans text-sm sm:text-base max-w-md line-clamp-2 mt-4">
                  {pkg.description}
                </p>
              )}
            </div>
            
            <div className="flex flex-col items-start sm:items-end flex-shrink-0">
              <span className="text-[10px] uppercase tracking-widest text-white/70 mb-1">From</span>
              <span className={`font-serif font-semibold text-[#c9a84c] drop-shadow-md ${isLarge ? 'text-4xl' : 'text-3xl'}`}>
                {pkg.price}
              </span>
            </div>
          </div>

          {/* Details (Hidden on desktop until hover) */}
          <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <div className="flex items-center gap-2 text-white/90">
              <Clock size={16} className="text-[#c9a84c]" />
              <span className="text-xs sm:text-sm font-medium">{pkg.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Hotel size={16} className="text-[#c9a84c]" />
              <span className="text-xs sm:text-sm font-medium truncate">{pkg.hotel}</span>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
});

export default function Packages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  // Use 5 packages for the mobile slider (desktop grid will only pick the first 3)
  const displayPackages = useMemo(() => internationalPackages.slice(0, 5), []);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % displayPackages.length);
    }, 5000); // 5 seconds auto sliding
    return () => clearInterval(timer);
  }, [displayPackages.length]);

  const handleNext = () => setActiveIndex((current) => (current + 1) % displayPackages.length);
  const handlePrev = () => setActiveIndex((current) => (current - 1 + displayPackages.length) % displayPackages.length);

  return (
    <section id="packages" className="pt-12 pb-24 lg:pt-16 lg:pb-32 relative overflow-hidden bg-stone-900">
      {/* Background styling to make it VERY distinct from the Umrah section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#c9a84c]/20 to-transparent blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[30%] h-[30%] rounded-full bg-gradient-to-l from-[#c9a84c]/10 to-transparent blur-[100px]" />
      </div>

      <div className="container-responsive max-w-[1400px] relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Plane size={14} className="text-[#c9a84c]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/90">
              Global Escapes
            </span>
            <Plane size={14} className="text-[#c9a84c]" />
          </div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 tracking-tight">
            International <span className="text-[#c9a84c] italic">Journeys</span>
          </h2>
          <p className="font-sans text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover our signature collection of global escapes. Experience unparalleled luxury and curated itineraries across the world.
          </p>
        </motion.div>

        {/* Mobile Carousel Layout (Hidden on md and up) */}
        <div className="block md:hidden mb-16 relative w-full">
          <div className="overflow-hidden rounded-[2rem] shadow-2xl relative mb-6">
            <div 
              className="flex transition-transform duration-1000 ease-[0.21,0.47,0.32,0.98]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {displayPackages.map((pkg, idx) => (
                <div key={pkg.destination} className="w-full flex-shrink-0 h-[450px]">
                  <BentoCard pkg={pkg} index={idx} />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-30 hover:bg-[#c9a84c] hover:border-[#c9a84c] transition-all"
              aria-label="Previous Package"
            >
              <ChevronLeft size={20} className="mr-0.5" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-30 hover:bg-[#c9a84c] hover:border-[#c9a84c] transition-all"
              aria-label="Next Package"
            >
              <ChevronRight size={20} className="ml-0.5" />
            </button>

          </div>

          {/* Premium Line Indicators Outside the Card */}
          <div className="flex justify-center items-center gap-2">
            {displayPackages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="group p-2 outline-none flex items-center justify-center"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div className={`rounded-full transition-all duration-500 ease-out ${
                  idx === activeIndex 
                    ? 'w-10 h-[4px] bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] shadow-[0_0_12px_rgba(201,168,76,0.5)]' 
                    : 'w-3 h-[4px] bg-white/20 group-hover:bg-white/40'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Bento Grid Layout (Hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20 lg:mb-24 max-w-6xl mx-auto">
          {/* Main Feature - spans 2 columns on tablet and desktop, 2 rows on desktop */}
          <div className="md:col-span-2 lg:row-span-2 h-[450px] md:h-[500px] lg:h-[600px]">
            <BentoCard pkg={displayPackages[0]} index={0} isLarge />
          </div>
          
          {/* Secondary Feature 1 */}
          <div className="h-[350px] md:h-[400px] lg:h-[calc(300px-1rem)]">
            <BentoCard pkg={displayPackages[1]} index={1} />
          </div>

          {/* Secondary Feature 2 */}
          <div className="h-[350px] md:h-[400px] lg:h-[calc(300px-1rem)]">
            <BentoCard pkg={displayPackages[2]} index={2} />
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Link 
            to="/international-trips"
            className="group inline-flex items-center justify-center gap-4 px-10 py-4 rounded-full bg-[#c9a84c] text-white shadow-[0_10px_30px_rgba(201,168,76,0.25)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.4)] hover:-translate-y-1 transition-all duration-500"
          >
            <span className="font-serif text-xl font-medium tracking-wide">
              Explore All Destinations
            </span>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#c9a84c] transition-colors duration-500">
              <ArrowRight size={20} className="text-white group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
