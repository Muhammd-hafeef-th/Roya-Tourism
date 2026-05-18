import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Hotel, Plane, Shield, MessageCircle, Check, ChevronRight } from 'lucide-react';

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

function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative group rounded-[2rem] overflow-hidden flex flex-col h-full bg-white transition-all duration-500 hover:-translate-y-2 ${pkg.accent
        ? 'ring-2 ring-[#c9a84c] shadow-[0_20px_50px_rgba(201,168,76,0.15)] lg:-translate-y-4 lg:hover:-translate-y-6 z-10'
        : 'border border-[#c9a84c]/15 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-stone-200/80'
        }`}
    >
      {/* Badge */}
      {pkg.badge && (
        <div className={`absolute top-5 right-5 z-20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-lg backdrop-blur-md ${pkg.accent ? 'bg-gold text-white' : 'bg-white/90 text-gold'
          }`}>
          {pkg.badge}
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[#c9a84c]/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0" />
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent z-10" />

        {/* Islamic pattern subtle overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay z-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
        }} />

        <div className="absolute bottom-6 left-6 z-20 w-[calc(100%-3rem)]">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#c9a84c]/90 text-white text-[10px] uppercase tracking-widest px-2 py-0.5 rounded backdrop-blur-sm">
              {pkg.duration}
            </span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
            {pkg.name}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8 flex-grow flex flex-col bg-gradient-to-b from-white to-[#faf9f7]">
        <div className="flex items-end justify-between mb-6 pb-6 border-b border-[#c9a84c]/10">
          <div>
            <p className="text-sm text-stone-500 font-medium mb-1">Starting from</p>
            <div className="font-serif text-3xl font-semibold text-gold">
              {pkg.price}
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8 flex-grow">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-[#c9a84c]/10 shrink-0">
              <Hotel size={18} className="text-gold" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-0.5">Accommodation</p>
              <p className="text-sm text-stone-700 font-medium">{pkg.hotel}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-[#c9a84c]/10 shrink-0">
              <Plane size={18} className="text-gold" />
            </div>
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-0.5">Transport</p>
              <p className="text-sm text-stone-700 font-medium">{pkg.flight}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold text-stone-800 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Shield size={14} className="text-gold" />
            Package Includes
          </p>
          <ul className="space-y-2.5">
            {pkg.includes.map(item => (
              <li key={item} className="flex items-start gap-3">
                <Check size={16} className="text-gold mt-0.5 shrink-0" strokeWidth={3} />
                <span className="text-sm text-stone-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="https://wa.me/1234567890?text=I'm%20interested%20in%20the%20Umrah%20package"
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto w-full group flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${pkg.accent
            ? 'btn-gold'
            : 'bg-stone-900 text-white hover:bg-stone-800 shadow-lg hover:shadow-xl'
            }`}
        >
          <MessageCircle size={18} className={pkg.accent ? 'text-white/90' : 'text-gold'} />
          <span>Inquire via WhatsApp</span>
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Umrah() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="umrah" className="pt-12 pb-24 lg:pt-16 lg:pb-32 relative overflow-hidden bg-[#faf9f7]">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-b from-[#c9a84c]/5 to-transparent blur-[120px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-t from-[#c9a84c]/5 to-transparent blur-[100px]" />
      </div>

      <div className="container-responsive max-w-[1400px] relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-[#c9a84c]/20 shadow-sm mb-6">
            <Star size={14} className="text-gold fill-gold" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
              Premium Sacred Journeys
            </span>
            <Star size={14} className="text-gold fill-gold" />
          </div>

          <div className="text-gold font-serif text-4xl mb-4 opacity-80">﷽</div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-stone-900 mb-6 tracking-tight">
            Exclusive Umrah <span className="shimmer-text italic">Packages</span>
          </h2>
          <p className="font-sans text-stone-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Embark on the most sacred journey of your life with our meticulously curated Umrah packages. Experience spiritual depth with uncompromising luxury and comfort.
          </p>

          <div className="flex justify-center mt-10">
            <div className="gold-divider" />
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-10 items-stretch max-w-7xl mx-auto">
          {packages.map((pkg, i) => (
            <div key={pkg.name} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.7rem)] max-w-[450px] lg:max-w-none">
              <PackageCard pkg={pkg} index={i} />
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 lg:mt-28 grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[
            { icon: Shield, title: 'Approved Agency', desc: 'Ministry of Umrah' },
            { icon: Star, title: 'Trusted Service', desc: 'Comfortable Umrah Packages' },
            { icon: Hotel, title: 'Premium Partners', desc: '5-Star Accommodation' },
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-stone-200/60 hover:border-[#c9a84c]/30 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mb-5">
                <badge.icon size={28} className="text-gold" />
              </div>
              <h4 className="font-serif text-xl font-medium text-stone-900 mb-2">{badge.title}</h4>
              <p className="text-sm text-stone-500">{badge.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
