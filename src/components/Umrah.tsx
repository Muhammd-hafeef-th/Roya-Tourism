import React, { useRef, useCallback } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Star, Hotel, Plane, Shield, MessageCircle, Check } from 'lucide-react';

const packages = [
  {
    name: 'Silver Umrah',
    badge: 'Popular',
    duration: '10 Days',
    price: '$1,299',
    hotel: '3-Star Hotel — 500m from Haram',
    flight: 'Economy Class — Direct Flight',
    includes: ['Visa Processing', 'Airport Transfers', 'Group Guide', 'Daily Breakfast'],
    image: '/umrah4.webp',
    accent: false,
  },
  {
    name: 'Gold Umrah',
    badge: 'Best Value',
    duration: '14 Days',
    price: '$2,199',
    hotel: '4-Star Hotel — 200m from Haram',
    flight: 'Business Class — Direct Flight',
    includes: ['Visa Processing', 'All Meals', 'Private Guide', 'Ziyarat Tours', 'Airport VIP'],
    image: '/umrah3.webp',
    accent: true,
  },
  {
    name: 'Royal Umrah',
    badge: 'Premium Experience',
    duration: '21 Days',
    price: '$4,499',
    hotel: '5-Star Hotel — Adjacent to Haram',
    flight: 'First Class — Private Arrangement',
    includes: ['VIP Visa', 'Full Board', 'Dedicated Concierge', 'Exclusive Ziyarat', 'Luxury Transfers'],
    image: '/umrah2.webp',
    accent: false,
  },
];

const PackageCard = React.memo(function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReduced = useReducedMotion();
  const isMiddle = pkg.accent;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative group flex flex-col h-full bg-white transition-all duration-700 rounded-t-[14rem] rounded-b-[2.5rem] p-3 sm:p-4 ${
        isMiddle
          ? 'ring-1 ring-[#c9a84c] shadow-[0_20px_60px_rgba(201,168,76,0.15)] lg:scale-[1.03] z-10 lg:-translate-y-4 hover:-translate-y-6'
          : 'border border-stone-200 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-stone-200/80 z-0 hover:-translate-y-2 lg:mt-4'
      }`}
    >
      {/* Arch Image Section */}
      <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden shrink-0 rounded-t-full rounded-b-3xl">
        <div className="absolute inset-0 bg-[#c9a84c]/10 mix-blend-overlay z-10 transition-opacity duration-700 group-hover:opacity-0" />
        <img
          src={pkg.image}
          alt={pkg.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-[1.6s] ease-out will-change-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent z-10" />

        {/* Badge */}
        {pkg.badge && (
          <div className={`absolute top-6 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg backdrop-blur-md whitespace-nowrap ${
            isMiddle ? 'bg-[#c9a84c] text-white' : 'bg-white/95 text-stone-900'
          }`}>
            {pkg.badge}
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="px-4 sm:px-6 pt-6 pb-4 flex-grow flex flex-col">
        <div className="flex flex-col items-center justify-center mb-6 pb-6 border-b border-stone-100">
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] mb-2">Starting from</p>
          <div className="font-serif text-4xl sm:text-5xl font-semibold text-[#c9a84c]">
            {pkg.price}
          </div>
        </div>

        <div className="space-y-4 mb-6 flex-grow px-2">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 p-2 rounded-full bg-[#c9a84c]/10"><Hotel size={16} className="text-[#c9a84c]" /></div>
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-1">Accommodation</p>
              <p className="text-sm text-stone-700 font-medium leading-snug">{pkg.hotel}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-0.5 p-2 rounded-full bg-[#c9a84c]/10"><Plane size={16} className="text-[#c9a84c]" /></div>
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-1">Transport</p>
              <p className="text-sm text-stone-700 font-medium leading-snug">{pkg.flight}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 px-2">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
            <Shield size={14} className="text-[#c9a84c]" />
            Package Includes
          </p>
          <ul className="space-y-3">
            {pkg.includes.map(item => (
              <li key={item} className="flex items-center gap-3">
                <Check size={14} className="text-[#c9a84c] shrink-0" strokeWidth={3} />
                <span className="text-sm text-stone-600 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={`https://wa.me/1234567890?text=I'm%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package`}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto w-full group flex items-center justify-center gap-2 py-4 rounded-2xl text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
            isMiddle
              ? 'bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-white shadow-[0_8px_20px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_25px_rgba(201,168,76,0.4)]'
              : 'bg-stone-900 text-white shadow-lg hover:bg-[#c9a84c] hover:shadow-[0_8px_20px_rgba(201,168,76,0.3)]'
          }`}
        >
          <span>Inquire Now</span>
          <MessageCircle size={16} className="transition-transform group-hover:scale-110" />
        </a>
      </div>
    </motion.div>
  );
});

export default function Umrah() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  const badgesRef = useRef(null);
  const isBadgesInView = useInView(badgesRef, { once: true, margin: '-100px' });
  const prefersReduced = useReducedMotion();

  return (
    <section id="umrah" className="pt-12 pb-12 lg:pt-20 lg:pb-24 relative overflow-hidden bg-[#faf9f7]">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-b from-[#c9a84c]/5 to-transparent blur-[120px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-t from-[#c9a84c]/5 to-transparent blur-[100px]" />
      </div>

      <div className="container-responsive max-w-[1400px] relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[#c9a84c]/20 shadow-sm mb-6">
            <Star size={14} className="text-[#c9a84c] fill-[#c9a84c]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#c9a84c]">
              Premium Sacred Journeys
            </span>
            <Star size={14} className="text-[#c9a84c] fill-[#c9a84c]" />
          </div>

          <div className="text-[#c9a84c] font-serif text-4xl mb-4 opacity-80">﷽</div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-stone-900 mb-6 tracking-tight">
            Exclusive Umrah <span className="shimmer-text italic">Packages</span>
          </h2>
          <p className="font-sans text-stone-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Embark on the most sacred journey of your life with our meticulously curated Umrah packages. Experience spiritual depth with uncompromising luxury and comfort.
          </p>
        </motion.div>

        {/* The New Arch Podium Layout */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-10 items-stretch max-w-7xl mx-auto">
          {packages.map((pkg, i) => (
            <div key={pkg.name} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.7rem)] max-w-[450px] lg:max-w-none">
              <PackageCard pkg={pkg} index={i} />
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          ref={badgesRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isBadgesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 lg:mt-32 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto px-2 sm:px-0"
        >
          {[
            { icon: Shield, title: 'Ministry Approved', desc: 'Licensed Umrah Agency' },
            { icon: Star, title: 'Premium Service', desc: 'Uncompromising Quality' },
            { icon: Hotel, title: 'Luxury Stays', desc: '5-Star Haram View Hotels' },
          ].map((badge, i) => (
            <div 
              key={i} 
              className={`flex flex-col items-center justify-center text-center p-4 sm:p-8 rounded-[1.5rem] sm:rounded-3xl bg-white border border-[#c9a84c]/15 hover:border-[#c9a84c]/40 transition-all duration-300 shadow-xl shadow-stone-100 hover:shadow-2xl hover:-translate-y-1 ${
                i === 2 ? 'col-span-2 sm:col-span-1 max-w-[240px] sm:max-w-none mx-auto w-full' : ''
              }`}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mb-3 sm:mb-6">
                <badge.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#c9a84c]" />
              </div>
              <h4 className="font-serif text-[0.95rem] sm:text-xl font-medium text-stone-900 mb-1.5 sm:mb-2 leading-tight">{badge.title}</h4>
              <p className="text-[10px] sm:text-sm text-stone-500 px-1">{badge.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
