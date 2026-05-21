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
          {domesticPackages.map((pkg, idx) => {
            const isActive = hoveredIndex === idx;
            return (
              <motion.div
                key={pkg.destination}
                onHoverStart={() => setHoveredIndex(idx)}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[0.25,1,0.5,1] shadow-xl ${
                  isActive ? 'flex-[4]' : 'flex-[1]'
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

        {/* Mobile & Tablet Sticky Stack Layout (Hidden on Desktop) */}
        <div className="lg:hidden flex flex-col gap-6 sm:gap-10 pb-16 max-w-2xl mx-auto px-4 sm:px-6 relative">
          {domesticPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.destination}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
              className="sticky shadow-2xl rounded-[2rem] overflow-hidden group border border-stone-200/50"
              style={{ 
                // Each subsequent card sits slightly lower so they form a beautiful stack.
                // 96px is approximately top-24 (which clears the navbar).
                top: `calc(96px + ${idx * 16}px)`,
                zIndex: idx
              }}
            >
              {/* Full Width Card with Glassmorphism Content */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] bg-stone-900">
                <img 
                  src={pkg.image} 
                  alt={pkg.destination}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg">
                      {pkg.badge}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90">
                      <Clock size={12} className="text-[#c9a84c]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{pkg.duration}</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="font-serif text-3xl sm:text-4xl font-medium text-white mb-2 leading-tight drop-shadow-md">
                        {pkg.destination}
                      </h3>
                      
                      <div className="flex items-end gap-2 mb-4">
                        <span className="text-[10px] uppercase tracking-widest text-white/70 mb-1">From</span>
                        <span className="font-serif text-2xl text-[#c9a84c] font-semibold drop-shadow-md">{pkg.price}</span>
                      </div>
                      
                      <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed line-clamp-2 mb-6">
                        {pkg.description}
                      </p>
                    </div>

                    <button 
                      onClick={() => window.open(`https://wa.me/1234567890?text=${encodeURIComponent("I'm interested in the " + pkg.destination + ' domestic package')}`, '_blank')}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-white/10 hover:bg-[#c9a84c] backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl"
                    >
                      <span>Explore Journey</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
