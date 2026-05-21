import { useEffect, useMemo, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Hotel,
  MapPin,
  MessageCircle,
  Mountain,
  Sparkles,
  Star,
  Trees,
  Waves,
  Filter,
  Search,
} from 'lucide-react';
import { domesticPackages } from '../data/packagesData';

type LenisScrollWindow = Window & {
  lenis?: { scrollTo(target: number, options: { immediate?: boolean; duration?: number }): void };
};

const ITEMS_PER_PAGE = {
  mobile: 4,
  tablet: 6,
  desktop: 9,
};

const STATES = ['All', ...Array.from(new Set(domesticPackages.map((pkg) => pkg.state)))];

const getStateIcon = (state: string) => {
  const iconMap: Record<string, any> = {
    'Kerala': Trees,
    'Goa': Waves,
    'Lakshadweep': Waves,
    'Jammu and Kashmir': Mountain,
    'Rajasthan': Mountain,
    'Himachal Pradesh': Mountain,
    'Tamil Nadu': Waves,
    'Uttar Pradesh': Sparkles,
  };
  return iconMap[state] || Sparkles;
};

const openWhatsApp = (pkgName: string) => {
  window.open(
    `https://wa.me/6235957243?text=${encodeURIComponent(`I'm interested in the ${pkgName} domestic package`)}`,
    '_blank'
  );
};

const StatePackageCard = ({ pkg }: { pkg: typeof domesticPackages[number] }) => {
  const StateIcon = getStateIcon(pkg.state);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -12 }}
      className="group relative h-full flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 border border-stone-100"
    >
      {/* Image Section - Takes up 65% of card */}
      <div className="relative flex-shrink-0 h-56 sm:h-64 md:h-72 lg:h-80 w-full overflow-hidden bg-stone-300">
        <img
          src={pkg.image}
          alt={pkg.destination}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-125"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/30 via-transparent to-stone-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Left - State Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="absolute left-4 sm:left-5 top-4 sm:top-5 flex items-center gap-2 rounded-full bg-white/95 px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-xl backdrop-blur-md border border-white/60 hover:bg-white transition-all"
        >
          <StateIcon size={14} className="text-[#c9a84c]" />
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-stone-900 uppercase">{pkg.state}</span>
        </motion.div>

        {/* Top Right - Stars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="absolute right-4 sm:right-5 top-4 sm:top-5 flex items-center gap-1.5 rounded-full bg-stone-900/90 px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-xl backdrop-blur-md border border-white/20"
        >
          {Array.from({ length: pkg.stars }).map((_, i) => (
            <Star key={i} size={13} className="fill-[#fbbf24] text-[#fbbf24]" />
          ))}
        </motion.div>

        {/* Bottom Badge Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-14 left-4 sm:left-5 inline-block px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#c9a84c] text-white text-[8px] sm:text-[9px] font-bold tracking-widest uppercase shadow-xl"
        >
          {pkg.badge}
        </motion.div>

        {/* Bottom Left - Destination Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-16 sm:right-20"
        >
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight line-clamp-2">
            {pkg.destination}
          </h3>
        </motion.div>

        {/* Bottom Right - Price */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 text-right"
        >
          <p className="text-[8px] sm:text-[9px] font-bold tracking-widest text-white/80 uppercase mb-1">From</p>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#fbbf24]">{pkg.price}</p>
        </motion.div>
      </div>

      {/* Content Section - Takes up 35% of card */}
      <div className="flex flex-col flex-grow p-4 sm:p-5 md:p-6">
        {/* Description */}
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3 mb-4 sm:mb-5 flex-grow group-hover:text-stone-700 transition-colors">
          {pkg.description}
        </p>

        {/* Highlights Tags */}
        <div className="mb-5 sm:mb-6 flex flex-wrap gap-2">
          {pkg.highlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="inline-block text-[8px] sm:text-[9px] font-semibold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#fffaf0] to-stone-50 border border-[#c9a84c]/30 text-stone-700 transition-all duration-300"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Premium CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(201,168,76,0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openWhatsApp(pkg.destination)}
          className="w-full relative group/btn overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-stone-900 to-stone-800 hover:from-[#c9a84c] hover:to-[#d4b855] text-white px-5 py-3 sm:py-3.5 md:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-400 flex items-center justify-center gap-2 border border-stone-700 hover:border-[#c9a84c]"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center gap-2">
            <MessageCircle size={14} />
            <span>Inquire Now</span>
          </div>
        </motion.button>
      </div>
    </motion.article>
  );
};

export default function DomesticTrips() {
  const [activeState, setActiveState] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE.desktop);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Responsive items per page calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(ITEMS_PER_PAGE.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(ITEMS_PER_PAGE.tablet);
      } else {
        setItemsPerPage(ITEMS_PER_PAGE.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    const lenis = (window as unknown as LenisScrollWindow).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Reset page on state change
  useEffect(() => {
    setCurrentPage(1);
    setShowMobileFilters(false);
    const lenis = (window as unknown as LenisScrollWindow).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeState]);

  // Memoized filtered and paginated packages
  const filteredPackages = useMemo(
    () => domesticPackages.filter((pkg) => activeState === 'All' || pkg.state === activeState),
    [activeState]
  );

  const totalPages = useMemo(() => Math.ceil(filteredPackages.length / itemsPerPage), [filteredPackages, itemsPerPage]);

  const currentPackages = useMemo(
    () => filteredPackages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredPackages, currentPage, itemsPerPage]
  );

  const scrollPageTop = useCallback(() => {
    const lenis = (window as unknown as LenisScrollWindow).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(Math.min(Math.max(1, newPage), totalPages));
    scrollPageTop();
  }, [totalPages, scrollPageTop]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fcfaf6] via-[#fdfbf7] to-[#f9f5ed]">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -right-1/4 top-0 h-96 w-96 rounded-full bg-[#c9a84c]/8 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -left-1/4 top-1/3 h-96 w-96 rounded-full bg-stone-400/5 blur-3xl"
        />
        <div className="absolute -bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-[#c9a84c]/8 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pb-16 sm:pb-20 md:pb-24 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-full mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12 md:mb-14 lg:mb-16"
          >
            {/* Back Button */}
            <Link
              to="/"
              className="group mb-6 sm:mb-8 inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-600 hover:text-[#c9a84c] transition-colors"
            >
              <div className="flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full border border-stone-300 bg-white/50 backdrop-blur-sm transition-all group-hover:border-[#c9a84c] group-hover:bg-[#fffaf0]">
                <ChevronLeft size={16} className="sm:scale-125" />
              </div>
              Back to Home
            </Link>

            {/* Title */}
            <div className="mb-4 sm:mb-6">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-stone-900 leading-tight mb-2 sm:mb-3">
                Explore India
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic text-[#c9a84c] font-serif">
                State by State
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed max-w-2xl">
              Discover premium domestic packages across India's most beautiful destinations. Filter by state and find your perfect getaway.
            </p>

            {/* Stats */}
            <div className="mt-6 sm:mt-8 flex gap-4 sm:gap-6 md:gap-8 flex-wrap">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#c9a84c]">{domesticPackages.length}+</div>
                <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500">Packages</div>
              </motion.div>
              <div className="h-8 sm:h-10 w-px bg-stone-300/30"></div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#c9a84c]">{STATES.length - 1}</div>
                <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500">States</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 sm:mb-10 md:mb-12"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500">Filter by Region</p>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#c9a84c] hover:text-[#b8943d] transition-colors"
              >
                <Filter size={14} />
                {showMobileFilters ? 'Hide' : 'Show'}
              </button>
            </div>

            {/* Desktop Filter Buttons */}
            <motion.div
              layout
              className={`flex flex-wrap gap-2 sm:gap-3 ${showMobileFilters ? 'flex' : 'hidden lg:flex'}`}
            >
              {STATES.map((state, idx) => (
                <motion.button
                  key={state}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveState(state)}
                  className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 transform ${
                    activeState === state
                      ? 'bg-[#c9a84c] text-white shadow-lg shadow-[#c9a84c]/30 scale-105'
                      : 'bg-white border border-stone-200 text-stone-700 hover:border-[#c9a84c]/40 hover:bg-stone-50'
                  }`}
                >
                  {state}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Results Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-6 sm:mb-8 md:mb-10 flex items-center justify-between flex-wrap gap-3"
          >
            <div>
              <p className="text-xs sm:text-sm text-stone-600">
                Showing <span className="font-bold text-stone-900">{currentPackages.length}</span> of{' '}
                <span className="font-bold text-stone-900">{filteredPackages.length}</span> packages
              </p>
            </div>
            {totalPages > 1 && (
              <div className="text-[10px] sm:text-xs text-stone-500 font-medium">
                Page <span className="text-[#c9a84c] font-bold">{currentPage}</span>/<span className="text-[#c9a84c] font-bold">{totalPages}</span>
              </div>
            )}
          </motion.div>

          {/* Packages Grid */}
          <motion.div layout className="mb-10 sm:mb-12 md:mb-16">
            <AnimatePresence mode="popLayout">
              {currentPackages.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7"
                >
                  {currentPackages.map((pkg, idx) => (
                    <motion.div
                      key={pkg.destination}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                    >
                      <StatePackageCard pkg={pkg} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 rounded-2xl md:rounded-3xl border border-stone-200 bg-white/50 backdrop-blur-sm"
                >
                  <div className="mb-4 flex h-16 sm:h-20 w-16 sm:w-20 items-center justify-center rounded-full bg-stone-100">
                    <MapPin size={28} className="text-stone-300 sm:scale-125" />
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-semibold text-stone-700 mb-2">No packages found</p>
                  <p className="text-xs sm:text-sm text-stone-600">Try selecting a different state</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10"
            >
              {/* Previous Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="group flex h-9 sm:h-10 md:h-12 w-9 sm:w-10 md:w-12 items-center justify-center rounded-full border border-stone-300 bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:border-[#c9a84c] hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-stone-300"
              >
                <ChevronLeft size={16} className="text-stone-700 group-hover:text-[#c9a84c] sm:scale-125" />
              </motion.button>

              {/* Page Input */}
              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full border border-stone-200 bg-white/50 backdrop-blur-sm shadow-sm">
                <span className="text-[9px] sm:text-xs font-bold text-stone-600 hidden sm:inline">Page</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = Math.min(Math.max(1, parseInt(e.target.value) || 1), totalPages);
                    handlePageChange(page);
                  }}
                  className="w-6 sm:w-8 text-center text-xs sm:text-sm font-bold text-[#c9a84c] bg-transparent border-none outline-none"
                />
                <span className="text-[9px] sm:text-xs font-bold text-stone-600">/ {totalPages}</span>
              </div>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="group flex h-9 sm:h-10 md:h-12 w-9 sm:w-10 md:w-12 items-center justify-center rounded-full border border-stone-300 bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:border-[#c9a84c] hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-stone-300"
              >
                <ChevronRight size={16} className="text-stone-700 group-hover:text-[#c9a84c] sm:scale-125" />
              </motion.button>
            </motion.div>
          )}

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-xs sm:text-sm text-stone-500 border-t border-stone-200/50 pt-6 sm:pt-8 md:pt-10"
          >
            <p className="flex items-center justify-center gap-2 flex-wrap">
              <MessageCircle size={14} className="text-[#c9a84c] flex-shrink-0 sm:scale-125" />
              <span>Have questions? Inquire through WhatsApp to connect with our travel experts</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
