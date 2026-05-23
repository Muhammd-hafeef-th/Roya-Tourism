import { useEffect, useMemo, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Mountain,
  Sparkles,
  Star,
  Trees,
  Waves,
  Filter,
} from 'lucide-react';
import { domesticPackages } from '../data/packagesData';

type LenisScrollWindow = Window & {
  lenis?: {
    scrollTo(target: number, options: { immediate?: boolean; duration?: number }): void;
  };
};

const ITEMS_PER_PAGE = {
  mobile: 4,
  tablet: 6,
  desktop: 9,
};

const STATES = ['All', ...Array.from(new Set(domesticPackages.map((pkg) => pkg.state)))];

const getStateIcon = (state: string) => {
  const iconMap: Record<string, any> = {
    Kerala: Trees,
    Goa: Waves,
    Lakshadweep: Waves,
    'Jammu and Kashmir': Mountain,
    Rajasthan: Mountain,
    'Himachal Pradesh': Mountain,
    'Tamil Nadu': Waves,
    'Uttar Pradesh': Sparkles,
  };

  return iconMap[state] || Sparkles;
};

const openWhatsApp = (pkgName: string) => {
  window.open(
    `https://wa.me/+917356231571?text=${encodeURIComponent(
      `I'm interested in the ${pkgName} domestic package`
    )}`,
    '_blank'
  );
};

const StatePackageCard = ({ pkg }: { pkg: (typeof domesticPackages)[number] }) => {
  const StateIcon = getStateIcon(pkg.state);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#e8decb] bg-[linear-gradient(180deg,#fffdf9_0%,#f8f3ea_100%)] shadow-[0_10px_30px_rgba(28,23,16,0.08)] transition-all duration-500 hover:shadow-[0_22px_60px_rgba(28,23,16,0.16)]"
    >
      <div className="relative">
        <div className="relative h-[240px] sm:h-[260px] md:h-[240px] lg:h-[250px] xl:h-[270px] 2xl:h-[290px] overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.destination}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/10 via-stone-950/5 to-stone-950/82" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,168,76,0.10),transparent_32%,transparent_72%,rgba(255,255,255,0.08))]" />

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 shadow-lg backdrop-blur-md md:px-3.5">
            <StateIcon size={14} className="text-[#c9a84c]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-900">
              {pkg.state}
            </span>
          </div>

          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-stone-950/88 px-3 py-2 shadow-lg backdrop-blur-md">
            {Array.from({ length: pkg.stars }).map((_, i) => (
              <Star key={i} size={12} className="fill-[#f4c44f] text-[#f4c44f]" />
            ))}
          </div>

          <div className="absolute inset-x-4 bottom-4">
            <div className="mb-3 flex items-end justify-between gap-4">
              <div className="max-w-[70%]">
                <div className="mb-2 inline-flex rounded-full bg-[#c9a84c] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.24em] text-white shadow-md">
                  {pkg.badge}
                </div>
                <h3 className="font-serif text-[30px] leading-[0.95] text-white sm:text-[34px] md:text-[30px] lg:text-[34px] 2xl:text-[38px]">
                  {pkg.destination}
                </h3>
              </div>

              <div className="shrink-0 text-right">
                <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.24em] text-white/70">
                  From
                </p>
                <p className="font-serif text-[34px] leading-none text-[#f4c44f] sm:text-[38px] md:text-[34px] lg:text-[38px]">
                  {pkg.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="min-h-[72px] text-sm leading-7 text-stone-600 md:min-h-[84px] lg:min-h-[88px]">
          {pkg.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {pkg.highlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="inline-flex items-center rounded-full border border-[#dccba5] bg-white/80 px-3.5 py-2 text-[10px] font-semibold tracking-[0.08em] text-stone-700 backdrop-blur-sm"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#eadfcb] pt-5">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">
            <MapPin size={13} className="text-[#c9a84c]" />
            Premium Escape
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openWhatsApp(pkg.destination)}
            className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#1d1814_0%,#2a241f_100%)] px-5 sm:px-6 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white shadow-[0_10px_25px_rgba(29,24,20,0.18)] transition-all duration-300 hover:bg-[linear-gradient(135deg,#c9a84c_0%,#d8ba62_100%)]"
          >
            <span className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-700 group-hover/btn:translate-x-[120%]" />
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle size={14} />
              Inquire
            </span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default function DomesticTrips() {
  const [activeState, setActiveState] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE.desktop);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(ITEMS_PER_PAGE.mobile);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(ITEMS_PER_PAGE.tablet);
      } else {
        setItemsPerPage(ITEMS_PER_PAGE.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as LenisScrollWindow).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

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

  const filteredPackages = useMemo(() => {
    return domesticPackages.filter((pkg) => activeState === 'All' || pkg.state === activeState);
  }, [activeState]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredPackages.length / itemsPerPage);
  }, [filteredPackages, itemsPerPage]);

  const currentPackages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPackages.slice(start, start + itemsPerPage);
  }, [filteredPackages, currentPage, itemsPerPage]);

  const scrollPageTop = useCallback(() => {
    const lenis = (window as unknown as LenisScrollWindow).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(Math.min(Math.max(1, newPage), totalPages));
      scrollPageTop();
    },
    [totalPages, scrollPageTop]
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fcfaf6_0%,#f8f3ea_45%,#fcfaf6_100%)]">
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

      <div className="relative z-10 min-h-screen pb-16 sm:pb-20 md:pb-24 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12 md:mb-14 lg:mb-16"
          >
            <Link
              to="/"
              className="group mb-6 sm:mb-8 inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-600 transition-colors hover:text-[#c9a84c]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 bg-white/50 backdrop-blur-sm transition-all group-hover:border-[#c9a84c] group-hover:bg-[#fffaf0] sm:h-9 sm:w-9">
                <ChevronLeft size={16} className="sm:scale-125" />
              </div>
              Back to Home
            </Link>

            <div className="mb-4 sm:mb-6">
              <h1 className="mb-2 font-serif text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">
                Explore India
              </h1>
              <p className="font-serif text-2xl italic text-[#c9a84c] sm:text-3xl md:text-4xl lg:text-5xl">
                State by State
              </p>
            </div>

            <p className="max-w-2xl text-xs leading-relaxed text-stone-600 sm:text-sm md:text-base">
              Discover premium domestic packages across India&apos;s most beautiful destinations.
              Filter by state and find your perfect getaway.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 sm:mt-8 sm:gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="text-xl font-bold text-[#c9a84c] sm:text-2xl md:text-3xl lg:text-4xl">
                  {domesticPackages.length}+
                </div>
                <div className="text-[8px] font-bold uppercase tracking-wider text-stone-500 sm:text-[10px]">
                  Packages
                </div>
              </motion.div>

              <div className="h-8 w-px bg-stone-300/30 sm:h-10" />

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-xl font-bold text-[#c9a84c] sm:text-2xl md:text-3xl lg:text-4xl">
                  {STATES.length - 1}
                </div>
                <div className="text-[8px] font-bold uppercase tracking-wider text-stone-500 sm:text-[10px]">
                  States
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 sm:mb-10 md:mb-12"
          >
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <p className="text-[9px] font-bold uppercase tracking-wider text-stone-500 sm:text-[10px]">
                Filter by Region
              </p>

              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#c9a84c] transition-colors hover:text-[#b8943d] lg:hidden"
              >
                <Filter size={14} />
                {showMobileFilters ? 'Hide' : 'Show'}
              </button>
            </div>

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
                  className={`rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 sm:px-4 sm:py-2 sm:text-[10px] md:px-5 md:py-2.5 md:text-[11px] ${
                    activeState === state
                      ? 'scale-105 bg-[#c9a84c] text-white shadow-lg shadow-[#c9a84c]/30'
                      : 'border border-stone-200 bg-white text-stone-700 hover:border-[#c9a84c]/40 hover:bg-stone-50'
                  }`}
                >
                  {state}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8 md:mb-10"
          >
            <p className="text-xs text-stone-600 sm:text-sm">
              Showing <span className="font-bold text-stone-900">{currentPackages.length}</span> of{' '}
              <span className="font-bold text-stone-900">{filteredPackages.length}</span> packages
            </p>

            {totalPages > 1 && (
              <div className="text-[10px] font-medium text-stone-500 sm:text-xs">
                Page <span className="font-bold text-[#c9a84c]">{currentPage}</span>/
                <span className="font-bold text-[#c9a84c]">{totalPages}</span>
              </div>
            )}
          </motion.div>

          <motion.div layout className="mb-10 sm:mb-12 md:mb-16">
            <AnimatePresence mode="popLayout">
              {currentPackages.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-8"
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
                  className="flex flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white/50 py-16 backdrop-blur-sm sm:py-20 md:rounded-3xl md:py-24"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 sm:h-20 sm:w-20">
                    <MapPin size={28} className="text-stone-300 sm:scale-125" />
                  </div>
                  <p className="mb-2 text-base font-semibold text-stone-700 sm:text-lg md:text-xl">
                    No packages found
                  </p>
                  <p className="text-xs text-stone-600 sm:text-sm">
                    Try selecting a different state
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 flex items-center justify-center gap-2 sm:mb-10 sm:gap-3 md:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white/50 shadow-sm backdrop-blur-sm transition-all hover:border-[#c9a84c] hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-stone-300 sm:h-10 sm:w-10 md:h-12 md:w-12"
              >
                <ChevronLeft size={16} className="text-stone-700 group-hover:text-[#c9a84c] sm:scale-125" />
              </motion.button>

              <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-white/50 px-3 py-1.5 shadow-sm backdrop-blur-sm sm:gap-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5">
                <span className="hidden text-[9px] font-bold text-stone-600 sm:inline sm:text-xs">
                  Page
                </span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = Math.min(Math.max(1, parseInt(e.target.value) || 1), totalPages);
                    handlePageChange(page);
                  }}
                  className="w-6 border-none bg-transparent text-center text-xs font-bold text-[#c9a84c] outline-none sm:w-8 sm:text-sm"
                />
                <span className="text-[9px] font-bold text-stone-600 sm:text-xs">/ {totalPages}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white/50 shadow-sm backdrop-blur-sm transition-all hover:border-[#c9a84c] hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-stone-300 sm:h-10 sm:w-10 md:h-12 md:w-12"
              >
                <ChevronRight size={16} className="text-stone-700 group-hover:text-[#c9a84c] sm:scale-125" />
              </motion.button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border-t border-stone-200/50 pt-6 text-center text-xs text-stone-500 sm:pt-8 sm:text-sm md:pt-10"
          >
            <p className="flex flex-wrap items-center justify-center gap-2">
              <MessageCircle size={14} className="flex-shrink-0 text-[#c9a84c] sm:scale-125" />
              <span>Have questions? Inquire through WhatsApp to connect with our travel experts</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 