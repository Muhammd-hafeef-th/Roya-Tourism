import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Hotel, Plane, Shield, Clock, MessageCircle } from 'lucide-react';

const packages = [
  {
    name: 'Silver Umrah',
    badge: 'Most Popular',
    duration: '10 Days',
    price: '$1,299',
    hotel: '3-Star Hotel — 500m from Haram',
    flight: 'Economy Class — Direct Flight',
    includes: ['Visa Processing', 'Airport Transfers', 'Group Guide', 'Daily Breakfast'],
    image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=600',
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
    image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600',
    accent: true,
  },
  {
    name: 'Royal Umrah',
    badge: 'Premium',
    duration: '21 Days',
    price: '$4,499',
    hotel: '5-Star Hotel — Adjacent to Haram',
    flight: 'First Class — Private Arrangement',
    includes: ['VIP Visa', 'Full Board', 'Dedicated Concierge', 'Exclusive Ziyarat', 'Luxury Transfers'],
    image: 'https://images.pexels.com/photos/3876446/pexels-photo-3876446.jpeg?auto=compress&cs=tinysrgb&w=600',
    accent: false,
  },
  {
    name: 'Hajj Package',
    badge: 'Sacred Journey',
    duration: '25–30 Days',
    price: 'From $5,999',
    hotel: '5-Star — Steps from Grand Mosque',
    flight: 'Business Class — Charter',
    includes: ['Full Hajj Rituals', 'Mina & Arafat Camp', 'Expert Scholar Guide', 'All Meals', 'VIP Support'],
    image: 'https://images.pexels.com/photos/2161459/pexels-photo-2161459.jpeg?auto=compress&cs=tinysrgb&w=600',
    accent: false,
  },
];

function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`relative group rounded-3xl overflow-hidden shadow-luxury card-hover ${
        pkg.accent ? 'ring-2 ring-gold-400 ring-offset-2' : ''
      }`}
      style={{ background: '#fff' }}
    >
      {pkg.badge && (
        <div className="absolute top-4 right-4 z-20 btn-gold px-3 py-1 rounded-full text-xs font-sans shadow-gold-sm">
          {pkg.badge}
        </div>
      )}

      <div className="relative h-52 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ transformOrigin: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Islamic pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%23c9a84c' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }} />

        <div className="absolute bottom-4 left-4">
          <span className="font-serif text-2xl font-semibold text-white">{pkg.name}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-stone-500 text-sm font-sans">
            <Clock size={14} className="text-gold-500" />
            {pkg.duration}
          </div>
          <div className="font-serif text-2xl font-semibold text-gold-600">{pkg.price}</div>
        </div>

        <div className="space-y-2.5 mb-5">
          <div className="flex items-start gap-2.5">
            <Hotel size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-sans text-stone-600">{pkg.hotel}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Plane size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-sans text-stone-600">{pkg.flight}</span>
          </div>
        </div>

        <div className="border-t border-cream-200 pt-4 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={12} className="text-gold-500" />
            <span className="text-xs font-sans text-stone-500 uppercase tracking-wider">Included</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {pkg.includes.map(item => (
              <div key={item} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                <span className="text-xs font-sans text-stone-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <a
          href="https://wa.me/1234567890?text=I'm%20interested%20in%20the%20Umrah%20package"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 btn-gold py-3 rounded-2xl text-sm font-sans shadow-gold-sm"
        >
          <MessageCircle size={15} />
          Inquire Now
        </a>
      </div>
    </motion.div>
  );
}

export default function Umrah() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="umrah" className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #faf9f7 0%, #f0ebe0 30%, #f7f3eb 70%, #faf9f7 100%)' }}
    >
      {/* Decorative gold crescent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-5"
        style={{ transform: 'translate(30%, -20%)' }}
      >
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#c9a84c" strokeWidth="1" />
          <circle cx="130" cy="100" r="70" fill="#faf9f7" />
          <polygon points="100,20 103,60 107,20" fill="#c9a84c" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold-400" />
            <span className="section-tag">Sacred Journeys</span>
            <div className="w-8 h-px bg-gold-400" />
          </div>

          {/* Bismillah-inspired decorative text */}
          <div className="text-gold-500 font-serif text-3xl mb-3 opacity-70">﷽</div>

          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 mb-4">
            Umrah & Hajj <span className="text-gold-600 italic">Packages</span>
          </h2>
          <p className="font-sans text-stone-500 text-base max-w-xl mx-auto leading-relaxed">
            Embark on the most sacred journey of your life with our meticulously curated pilgrimage packages — combining spiritual depth with uncompromising comfort.
          </p>

          <div className="flex justify-center mt-5">
            <div className="gold-divider" />
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex flex-wrap justify-center gap-3 sm:gap-8"
        >
          {[
            { icon: Shield, text: 'Ministry of Hajj Approved' },
            { icon: Star, text: '15 Years of Pilgrimage Excellence' },
            { icon: Hotel, text: '5-Star Accommodation Partners' },
          ].map(badge => (
            <div key={badge.text} className="flex items-center gap-3 glass px-4 sm:px-6 py-3 rounded-full shadow-soft">
              <badge.icon size={16} className="text-gold-500" />
              <span className="font-sans text-sm text-stone-600">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
