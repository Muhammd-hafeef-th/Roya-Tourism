import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

const destinations = [
  { name: 'Makkah', country: 'Saudi Arabia', tagline: 'The Heart of Islam', image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=700', span: 'sm:col-span-2 sm:row-span-2' },
  { name: 'Dubai', country: 'UAE', tagline: 'City of Gold', image: 'https://images.pexels.com/photos/2115367/pexels-photo-2115367.jpeg?auto=compress&cs=tinysrgb&w=600', span: '' },
  { name: 'Maldives', country: 'Indian Ocean', tagline: 'Paradise on Earth', image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=600', span: '' },
  { name: 'Istanbul', country: 'Turkey', tagline: 'Where Worlds Meet', image: 'https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&w=600', span: '' },
  { name: 'Paris', country: 'France', tagline: 'City of Light', image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=700', span: 'sm:col-span-2' },
  { name: 'Bali', country: 'Indonesia', tagline: 'Island of the Gods', image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600', span: '' },
];

function DestCard({ dest, index }: { dest: typeof destinations[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`relative rounded-3xl overflow-hidden cursor-pointer group ${dest.span}`}
      style={{ minHeight: index === 0 ? '380px' : '180px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={dest.image}
        alt={dest.name}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-1.5 mb-1">
          <MapPin size={12} className="text-gold-300" />
          <span className="text-white/70 text-xs font-sans">{dest.country}</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-serif text-white font-semibold" style={{ fontSize: index === 0 ? '1.8rem' : '1.3rem' }}>
              {dest.name}
            </h3>
            <motion.p
              className="font-sans text-white/70 text-xs mt-0.5"
              animate={{ opacity: hovered ? 1 : 0.7 }}
            >
              {dest.tagline}
            </motion.p>
          </div>
          <motion.div
            className="w-9 h-9 rounded-full btn-gold flex items-center justify-center shadow-gold-sm"
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight size={16} className="text-white" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Destinations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="destinations" className="py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #faf9f7 0%, #f2ece0 50%, #faf9f7 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold-400" />
            <span className="section-tag">Popular Destinations</span>
            <div className="w-8 h-px bg-gold-400" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 mb-4">
            Where Will You <span className="text-gold-600 italic">Go Next?</span>
          </h2>
          <p className="font-sans text-stone-500 text-base max-w-lg mx-auto leading-relaxed">
            From sacred cities to tropical paradises — explore the world's most coveted destinations with Roya Travels.
          </p>
          <div className="flex justify-center mt-5">
            <div className="gold-divider" />
          </div>
        </motion.div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" style={{ gridAutoRows: '190px' }}>
          {destinations.map((dest, i) => (
            <DestCard key={dest.name} dest={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
