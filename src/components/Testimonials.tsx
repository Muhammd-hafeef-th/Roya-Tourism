import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Fatima Al-Hassan',
    location: 'London, UK',
    package: 'Gold Umrah Package',
    rating: 5,
    text: "Roya Travels made our Umrah journey absolutely seamless and spiritually enriching. The 5-star hotel was steps from the Haram, the guides were knowledgeable, and every detail was handled with such care. We felt truly blessed.",
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Ahmed Malik',
    location: 'Toronto, Canada',
    package: 'Dubai Package',
    rating: 5,
    text: "From the moment we landed in Dubai to our final farewell, everything was executed with pure luxury. The desert safari, the Burj Khalifa dinner, the gold souk — Roya Travels curated an unforgettable experience for my family.",
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Sarah Johnson',
    location: 'New York, USA',
    package: 'Maldives Package',
    rating: 5,
    text: "Our Maldives honeymoon was absolute perfection. The overwater bungalow, the private snorkeling, the sunset cruise — it felt like a dream. Roya Travels knows what luxury truly means. We're already planning our next trip with them!",
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Omar Khalid',
    location: 'Dubai, UAE',
    package: 'Europe Grand Tour',
    rating: 5,
    text: "Fourteen days across five European capitals — Paris, Rome, Amsterdam, Barcelona, and Zurich. Every hotel was boutique perfection, every guide was passionate, and every moment felt cinematic. Roya Travels is in a class of their own.",
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Layla Ibrahim',
    location: 'Manchester, UK',
    package: 'Royal Umrah',
    rating: 5,
    text: "The Royal Umrah package was beyond anything I could have imagined. Having a dedicated concierge, first-class flights, and a room with a direct view of the Kaaba — this was a once-in-a-lifetime spiritual experience. Truly majestic.",
    image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  const getVisible = () => {
    const indices = [];
    for (let i = -1; i <= 1; i++) {
      indices.push((current + i + testimonials.length) % testimonials.length);
    }
    return indices;
  };

  return (
    <section id="testimonials" className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f5f0e6 0%, #faf9f7 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.3) 0%, transparent 70%)' }}
        />
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
            <span className="section-tag">What Our Travellers Say</span>
            <div className="w-8 h-px bg-gold-400" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 mb-4">
            Stories of <span className="text-gold-600 italic">Unforgettable</span> Journeys
          </h2>
          <div className="flex justify-center mt-5">
            <div className="gold-divider" />
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Main card */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="max-w-3xl w-full glass-white rounded-3xl p-6 sm:p-10 shadow-luxury-lg relative"
              >
                <Quote size={48} className="text-gold-200 absolute top-8 left-8" />

                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-luxury">
                      <img
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <div className="flex justify-center gap-0.5">
                        {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                          <span key={i} className="text-gold-400 text-sm">★</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="font-serif text-lg text-stone-700 leading-relaxed italic mb-6">
                      "{testimonials[current].text}"
                    </p>
                    <div className="border-t border-cream-300 pt-4">
                      <div className="font-serif text-stone-900 font-semibold text-lg">{testimonials[current].name}</div>
                      <div className="font-sans text-stone-500 text-sm">{testimonials[current].location}</div>
                      <div className="mt-1">
                        <span className="btn-gold px-3 py-1 rounded-full text-xs font-sans">{testimonials[current].package}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-gold-300 flex items-center justify-center text-gold-600 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300 shadow-soft"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 h-2.5 bg-gold-500' : 'w-2.5 h-2.5 bg-cream-400 hover:bg-gold-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-gold-300 flex items-center justify-center text-gold-600 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300 shadow-soft"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Side thumbnails */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 -ml-4">
            {getVisible().slice(0, 1).map(idx => (
              <div key={idx} className="opacity-40 scale-90">
                <img src={testimonials[idx].image} alt="" className="w-14 h-14 rounded-xl object-cover shadow-soft" />
              </div>
            ))}
          </div>
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-0 -mr-4">
            {getVisible().slice(2).map(idx => (
              <div key={idx} className="opacity-40 scale-90">
                <img src={testimonials[idx].image} alt="" className="w-14 h-14 rounded-xl object-cover shadow-soft" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
