import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Hotel, Plane, Star, MessageCircle, ChevronRight } from 'lucide-react';

const packages = [
  {
    destination: 'Dubai',
    country: 'UAE',
    duration: '5 Days / 4 Nights',
    price: '$899',
    priceNote: 'per person',
    stars: 5,
    hotel: 'Burj Al Arab or similar',
    flight: 'Economy — Direct',
    description: 'Experience the pinnacle of modern luxury in the City of Gold — iconic skylines, desert adventures, and world-class shopping.',
    highlights: ['Desert Safari', 'Burj Khalifa', 'Gold Souk', 'Dhow Cruise'],
    image: 'https://images.pexels.com/photos/2115367/pexels-photo-2115367.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'Best Seller',
  },
  {
    destination: 'Maldives',
    country: 'South Asia',
    duration: '7 Days / 6 Nights',
    price: '$2,499',
    priceNote: 'per person',
    stars: 5,
    hotel: 'Overwater Bungalow',
    flight: 'Business — Seaplane Transfer',
    description: 'Surrender to paradise in the crystal-clear waters of the Indian Ocean — white sands, coral reefs, and unmatched serenity.',
    highlights: ['Overwater Villa', 'Snorkeling', 'Spa Retreat', 'Sunset Cruise'],
    image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'Top Luxury',
  },
  {
    destination: 'Turkey',
    country: 'Europe / Asia',
    duration: '8 Days / 7 Nights',
    price: '$1,199',
    priceNote: 'per person',
    stars: 4,
    hotel: '4-Star Heritage Hotel',
    flight: 'Economy — Connecting',
    description: 'Walk through millennia of history in Istanbul, float over Cappadocia in a hot-air balloon, and soak in Turkish culture.',
    highlights: ['Cappadocia Balloon', 'Hagia Sophia', 'Bosphorus Cruise', 'Grand Bazaar'],
    image: 'https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'Cultural Gem',
  },
  {
    destination: 'Thailand',
    country: 'Southeast Asia',
    duration: '9 Days / 8 Nights',
    price: '$1,099',
    priceNote: 'per person',
    stars: 4,
    hotel: 'Beachfront Resort',
    flight: 'Economy — Direct',
    description: 'Discover tropical paradise, ancient temples, vibrant street markets, and pristine island beaches across Thailand.',
    highlights: ['Phi Phi Islands', 'Grand Palace', 'Street Food Tour', 'Elephant Sanctuary'],
    image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'Family Favourite',
  },
  {
    destination: 'Europe',
    country: 'Multi-Country',
    duration: '14 Days / 13 Nights',
    price: '$3,299',
    priceNote: 'per person',
    stars: 4,
    hotel: 'Boutique Hotels',
    flight: 'Economy — Multi-City',
    description: 'A grand tour through the cultural capitals of Europe — Paris, Rome, Amsterdam, and more — a journey through time and art.',
    highlights: ['Eiffel Tower', 'Colosseum', 'Swiss Alps', 'Canal Cruise'],
    image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'Grand Tour',
  },
  {
    destination: 'Bali',
    country: 'Indonesia',
    duration: '8 Days / 7 Nights',
    price: '$1,349',
    priceNote: 'per person',
    stars: 5,
    hotel: 'Villa with Private Pool',
    flight: 'Economy — Connecting',
    description: 'Immerse yourself in the Island of the Gods — terraced rice fields, ancient temples, world-class wellness, and vibrant culture.',
    highlights: ['Ubud Jungle', 'Tanah Lot', 'Private Villa', 'Sunset Seminyak'],
    image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'Wellness Retreat',
  },
];

function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-3xl overflow-hidden bg-white shadow-luxury card-hover cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={pkg.image}
          alt={pkg.destination}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Badge */}
        {pkg.badge && (
          <div className="absolute top-4 left-4 btn-gold px-3 py-1 rounded-full text-xs font-sans shadow-gold-sm">
            {pkg.badge}
          </div>
        )}

        {/* Stars */}
        <div className="absolute top-4 right-4 flex gap-0.5">
          {Array.from({ length: pkg.stars }).map((_, i) => (
            <Star key={i} size={11} fill="#c9a84c" stroke="none" />
          ))}
        </div>

        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin size={13} className="text-gold-300" />
            <span className="text-white/80 text-xs font-sans">{pkg.country}</span>
          </div>
          <span className="font-serif text-2xl font-semibold text-white">{pkg.destination}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-stone-500 font-sans text-sm leading-relaxed mb-4">{pkg.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
            <Clock size={12} className="text-gold-500" />
            {pkg.duration}
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
            <Hotel size={12} className="text-gold-500" />
            {pkg.hotel}
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
            <Plane size={12} className="text-gold-500" />
            {pkg.flight}
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {pkg.highlights.map(h => (
            <span key={h} className="text-[0.65rem] font-sans px-2 py-1 bg-cream-100 text-stone-600 rounded-full border border-cream-300">
              {h}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-serif text-2xl font-semibold text-gold-600">{pkg.price}</span>
            <span className="text-xs text-stone-400 font-sans ml-1">{pkg.priceNote}</span>
          </div>
          <a
            href={`https://wa.me/1234567890?text=I'm%20interested%20in%20${encodeURIComponent(pkg.destination)}%20package`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 btn-gold px-4 py-2.5 rounded-full text-xs font-sans shadow-gold-sm"
          >
            <MessageCircle size={13} />
            Inquire
          </a>
        </div>
      </div>

      {/* Hover shine overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.03) 0%, transparent 60%)' }}
      />
    </motion.div>
  );
}

export default function Packages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="packages" className="py-28"
      style={{ background: '#faf9f7' }}
    >
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
            <span className="section-tag">Explore the World</span>
            <div className="w-8 h-px bg-gold-400" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 mb-4">
            International <span className="text-gold-600 italic">Packages</span>
          </h2>
          <p className="font-sans text-stone-500 text-base max-w-xl mx-auto leading-relaxed">
            Handpicked destinations, curated itineraries, and unmatched hospitality — your perfect getaway awaits.
          </p>
          <div className="flex justify-center mt-5">
            <div className="gold-divider" />
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.destination} pkg={pkg} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline-gold px-8 py-4 rounded-full font-sans text-sm inline-flex items-center gap-2"
          >
            View All Packages
            <ChevronRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
