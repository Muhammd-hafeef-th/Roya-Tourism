import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const images = [
  { src: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=700', label: 'Makkah Al-Mukarramah', cat: 'Spiritual' },
  { src: 'https://images.pexels.com/photos/2115367/pexels-photo-2115367.jpeg?auto=compress&cs=tinysrgb&w=700', label: 'Dubai Skyline', cat: 'City' },
  { src: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=700', label: 'Maldives Paradise', cat: 'Beach' },
  { src: 'https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&w=700', label: 'Istanbul Sunrise', cat: 'Culture' },
  { src: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=700', label: 'Paris by Night', cat: 'City' },
  { src: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=700', label: 'Bali Temple', cat: 'Culture' },
  { src: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=700', label: 'Thailand Islands', cat: 'Beach' },
  { src: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=700', label: 'Luxury Travel', cat: 'Lifestyle' },
];

const categories = ['All', 'Spiritual', 'City', 'Beach', 'Culture', 'Lifestyle'];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<null | typeof images[0]>(null);

  const filtered = filter === 'All' ? images : images.filter(img => img.cat === filter);

  return (
    <section id="gallery" className="py-28" style={{ background: '#faf9f7' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold-400" />
            <span className="section-tag">Travel Gallery</span>
            <div className="w-8 h-px bg-gold-400" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 mb-4">
            Moments That <span className="text-gold-600 italic">Last Forever</span>
          </h2>
          <p className="font-sans text-stone-500 text-base max-w-xl mx-auto leading-relaxed">
            A visual journey through the world's most magnificent destinations captured by our travellers.
          </p>
          <div className="flex justify-center mt-5">
            <div className="gold-divider" />
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-sans transition-all duration-300 ${
                filter === cat
                  ? 'btn-gold shadow-gold-sm'
                  : 'border border-cream-300 text-stone-500 hover:border-gold-400 hover:text-gold-600 bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer shadow-soft"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className="text-white font-serif text-sm">{img.label}</span>
                    <ZoomIn size={18} className="text-white/80" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="btn-gold px-2 py-0.5 rounded-full text-[0.6rem] font-sans">{img.cat}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full glass-white flex items-center justify-center hover:bg-white transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={20} className="text-stone-700" />
            </button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.label} className="w-full rounded-3xl shadow-luxury-lg" />
              <div className="mt-4 text-center">
                <span className="font-serif text-white text-xl">{lightbox.label}</span>
                <span className="ml-3 btn-gold px-3 py-1 rounded-full text-xs font-sans">{lightbox.cat}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
