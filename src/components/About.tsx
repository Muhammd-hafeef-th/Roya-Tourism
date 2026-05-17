import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Heart, Shield, Clock } from 'lucide-react';

const values = [
  { icon: Award, title: 'Award-Winning Service', desc: 'Recognized globally for exceptional travel experiences and outstanding customer satisfaction.' },
  { icon: Heart, title: 'Personalized Journeys', desc: 'Every itinerary is tailored to your unique desires, preferences, and aspirations.' },
  { icon: Shield, title: 'Safe & Secure Travel', desc: 'Your safety is our highest priority, with 24/7 support throughout your entire journey.' },
  { icon: Clock, title: '15 Years of Excellence', desc: 'Over a decade and a half of crafting unforgettable memories for thousands of travellers.' },
];

function ValueCard({ icon: Icon, title, desc, index }: { icon: typeof Award; title: string; desc: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group flex gap-5 p-6 rounded-2xl bg-white/60 border border-cream-300 card-hover"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl btn-gold flex items-center justify-center shadow-gold-sm group-hover:scale-110 transition-transform duration-300">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h3 className="font-serif text-lg font-semibold text-stone-900 mb-1">{title}</h3>
        <p className="font-sans text-sm text-stone-500 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #faf9f7 0%, #f5f0e6 50%, #faf9f7 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)', transform: 'translate(50%, -50%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-luxury-lg">
              <img
                src="https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Luxury travel experience"
                className="w-full h-[360px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[
                        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60',
                        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60',
                        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60',
                      ].map((src, i) => (
                        <img key={i} src={src} alt="traveller" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                      ))}
                    </div>
                    <div>
                      <div className="font-serif text-sm font-semibold text-stone-900">12,000+ Happy Travellers</div>
                      <div className="flex text-gold-400 text-xs">{'★★★★★'} <span className="text-stone-500 ml-1 font-sans">5.0 Rating</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              className="absolute right-4 top-4 sm:-right-8 sm:top-12 glass rounded-2xl p-5 shadow-luxury max-w-[180px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="text-gold-600 font-serif text-3xl font-bold">15</div>
              <div className="text-stone-600 font-sans text-xs mt-1 leading-snug">Years of Luxury Travel Expertise</div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-gold-400" />
                <span className="section-tag">About Roya Travels</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 leading-[1.1] mb-5">
                Crafting Journeys<br />
                <span className="text-gold-600 italic">Worth Remembering</span>
              </h2>
              <p className="font-sans text-stone-500 leading-relaxed text-base mb-4">
                Founded with a passion for exploration and a commitment to excellence, Roya Travels has been the trusted partner for discerning travellers seeking extraordinary experiences across the globe.
              </p>
              <p className="font-sans text-stone-500 leading-relaxed text-base">
                Whether it's a sacred spiritual journey to Makkah, a sun-soaked holiday in the Maldives, or an adventure through the cultural heart of Europe — we bring your dreams to life with meticulous care and unparalleled service.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <ValueCard key={v.title} {...v} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-gold px-8 py-4 rounded-full font-sans text-sm shadow-gold"
              >
                Start Your Journey
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
