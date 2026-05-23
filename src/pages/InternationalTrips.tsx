import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Clock, Hotel, Star, MessageCircle, ChevronRight, ChevronLeft as ChevronLeftIcon, Compass } from 'lucide-react';
import { internationalPackages } from '../data/packagesData';

type LenisScrollWindow = Window & {
  lenis?: { scrollTo(target: number, options: { immediate?: boolean; duration?: number }): void };
};

const CATEGORIES = ['All', 'Oman', 'Middle East', 'Asia', 'Europe'];
const ITEMS_PER_PAGE = 6;

function DestinationCard({ pkg }: { pkg: typeof internationalPackages[0] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`group relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer ${
        pkg.isSpecialized ? 'ring-2 ring-[#c9a84c] shadow-[0_20px_50px_rgba(201,168,76,0.2)] z-10' : 'shadow-xl shadow-stone-200/50 hover:shadow-2xl'
      }`}
      onClick={() => window.open(`https://wa.me/+917356231571?text=I'm%20interested%20in%20the%20${encodeURIComponent(pkg.destination)}%20package`, '_blank')}
    >
      {/* Background Image */}
      <img
        src={pkg.image}
        alt={pkg.destination}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
      />
      
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/40 to-transparent transition-opacity duration-700" />
      <div className="absolute inset-0 bg-[#c9a84c]/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-700" />

      {/* Top Badges */}
      <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] font-bold tracking-widest uppercase shadow-lg">
          <Compass size={12} className={pkg.isSpecialized ? "text-[#c9a84c]" : "text-white"} />
          {pkg.country}
        </div>
        {pkg.badge && (
          <div className={`px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-lg ${
            pkg.isSpecialized ? 'bg-[#c9a84c] text-white' : 'bg-white text-stone-900'
          }`}>
            {pkg.badge}
          </div>
        )}
      </div>

      {/* Bottom Content Area */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
        <div className="transform transition-all duration-500 ease-out lg:translate-y-20 group-hover:translate-y-0">
          
          <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-[1.1] drop-shadow-md mb-3">
            {pkg.destination}
          </h3>
          
          <div className="flex items-end justify-between mb-4">
             <div>
               <p className="text-[9px] text-white/70 uppercase tracking-[0.2em] mb-1">Starting from</p>
               <p className="font-serif text-3xl text-[#c9a84c] font-semibold drop-shadow-sm">{pkg.price}</p>
             </div>
             {pkg.stars && (
               <div className="flex gap-0.5 pb-1">
                 {Array.from({ length: pkg.stars }).map((_, i) => (
                   <Star key={i} size={12} className="fill-[#c9a84c] text-[#c9a84c]" />
                 ))}
               </div>
             )}
          </div>

          {/* Hidden Details that slide up on Desktop (Always visible on mobile/tablet) */}
          <div className="lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-t border-white/20 pt-5 mt-2">
             <div className="flex justify-between items-center text-white/90 mb-5">
               <div className="flex items-center gap-2">
                 <Clock size={14} className="text-[#c9a84c]" />
                 <span className="text-[11px] sm:text-xs font-medium tracking-wide">{pkg.duration}</span>
               </div>
               <div className="flex items-center gap-2 max-w-[50%]">
                 <Hotel size={14} className="text-[#c9a84c] shrink-0" />
                 <span className="text-[11px] sm:text-xs font-medium truncate">{pkg.hotel}</span>
               </div>
             </div>
             
             <div className="w-full bg-[#c9a84c] text-white text-xs font-bold tracking-widest uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#c9a84c]/20 hover:bg-[#b5953f] transition-colors">
               <span>Inquire Now</span>
               <MessageCircle size={16} />
             </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default function InternationalTrips() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to top when component mounts
  useEffect(() => {
    const lenis = (window as unknown as LenisScrollWindow).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Reset page and scroll when category changes
  useEffect(() => {
    setCurrentPage(1);
    const lenis = (window as unknown as LenisScrollWindow).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeCategory]);

  // Filter packages
  const filteredPackages = useMemo(
    () => internationalPackages.filter(pkg => activeCategory === 'All' || pkg.category === activeCategory),
    [activeCategory]
  );

  // Pagination logic
  const totalPages = useMemo(
    () => Math.ceil(filteredPackages.length / ITEMS_PER_PAGE),
    [filteredPackages]
  );
  const currentPackages = useMemo(
    () => filteredPackages.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filteredPackages, currentPage]
  );

  // Handle category change
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-28 pb-20 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#c9a84c]/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="container-responsive max-w-[1400px] relative z-10">
        {/* Header / Nav */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <Link 
            to="/#home"
            className="flex items-center gap-3 text-stone-500 hover:text-[#c9a84c] transition-colors self-start md:self-auto group"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center group-hover:border-[#c9a84c] shadow-sm transition-all group-hover:-translate-x-1">
              <ChevronLeft size={18} />
            </div>
            <span className="font-bold text-[11px] tracking-[0.2em] uppercase">Return Home</span>
          </Link>
          
          <div className="text-center md:text-right">
            <h1 className="font-serif text-5xl sm:text-6xl text-stone-900 font-medium tracking-tight mb-2">
              International <span className="text-[#c9a84c] italic">Packages</span>
            </h1>
            <p className="text-stone-500 font-sans text-sm sm:text-base tracking-wide">
              Discover unparalleled luxury across the globe.
            </p>
          </div>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 sm:px-8 py-3 rounded-full text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-stone-900 text-[#c9a84c] shadow-[0_10px_20px_rgba(0,0,0,0.1)] lg:scale-105' 
                  : 'bg-white text-stone-500 hover:text-stone-900 hover:bg-stone-50 border border-stone-200'
              }`}
            >
              {cat === 'Oman' ? (
                <span className="flex items-center gap-2">
                  <Star size={14} className={activeCategory === cat ? "fill-[#c9a84c] text-[#c9a84c]" : "fill-stone-300 text-stone-300"} />
                  Oman Signature
                </span>
              ) : (
                cat
              )}
            </button>
          ))}
        </div>

        {/* Specialized Note (Cinematic Dark Banner) */}
        <AnimatePresence mode="wait">
          {activeCategory === 'Oman' && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="bg-stone-900 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 mb-16 shadow-2xl relative overflow-hidden"
            >
              {/* Background Image perfectly faded */}
              <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full opacity-30 mix-blend-overlay">
                 <img src="/oman-salah3.jpg" className="w-full h-full object-cover" alt="Oman landscape" />
                 <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent" />
              </div>
              
              {/* Gold glow */}
              <div className="absolute -left-[10%] -top-[50%] w-[50%] h-[200%] bg-gradient-to-r from-[#c9a84c]/20 to-transparent blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 mb-6 backdrop-blur-sm">
                  <Star size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#c9a84c]">Our True Expertise</span>
                </div>
                <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                  The Heart of <span className="text-[#c9a84c] italic">Oman</span>
                </h3>
                <p className="text-white/70 font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
                  Roya Global Tourism is proudly specialized in Oman trips. We offer exclusive access, deeply knowledgeable local guides, and uniquely curated experiences across the Sultanate — from the lush khareef in Salalah to the sweeping dunes of Wahiba Sands.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid of Destination Cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {currentPackages.length > 0 ? (
              currentPackages.map(pkg => (
                <div key={pkg.destination} className="w-full">
                  <DestinationCard pkg={pkg} />
                </div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full w-full text-center py-32 text-stone-500 flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                  <MapPin size={32} className="text-stone-300" />
                </div>
                <p className="text-lg font-medium">No packages found for this category at the moment.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Premium Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-24">
            <button 
              onClick={() => {
                setCurrentPage(p => Math.max(1, p - 1));
                const lenis = (window as unknown as LenisScrollWindow).lenis;
                if (lenis) {
                  lenis.scrollTo(0, { duration: 1 });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={currentPage === 1}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-stone-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 hover:border-[#c9a84c]/50 transition-all shadow-sm"
            >
              <ChevronLeftIcon size={20} className="text-stone-700" />
            </button>
            <div className="font-bold text-[11px] tracking-[0.2em] uppercase text-stone-600 bg-white px-6 py-3.5 rounded-full border border-stone-200 shadow-sm">
              Page {currentPage} of {totalPages}
            </div>
            <button 
              onClick={() => {
                setCurrentPage(p => Math.min(totalPages, p + 1));
                const lenis = (window as unknown as LenisScrollWindow).lenis;
                if (lenis) {
                  lenis.scrollTo(0, { duration: 1 });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={currentPage === totalPages}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-stone-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 hover:border-[#c9a84c]/50 transition-all shadow-sm"
            >
              <ChevronRight size={20} className="text-stone-700" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
