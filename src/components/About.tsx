import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Heart, Shield, Clock } from 'lucide-react';

const values = [
  { icon: Award, title: 'Award-Winning Service', desc: 'Recognized globally for exceptional travel experiences and outstanding customer satisfaction.' },
  { icon: Heart, title: 'Personalized Journeys', desc: 'Every itinerary is tailored to your unique desires, preferences, and aspirations.' },
  { icon: Shield, title: 'Safe & Secure Travel', desc: 'Your safety is our highest priority, with 24/7 support throughout your entire journey.' },
  {
    icon: Clock,
    title: 'Professional Trip Guidance',
    desc: 'Comfortable and trusted international & domestic travel support.'
  },];

function ValueCard({ icon: Icon, title, desc, index }: { icon: typeof Award; title: string; desc: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col gap-2 sm:gap-3"
    >
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gold-200 bg-gold-50/50 flex items-center justify-center text-gold-600 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-white transition-all duration-500 shadow-sm">
          <Icon size={22} strokeWidth={1.5} className="sm:w-6 sm:h-6" />
        </div>
        <h3 className="font-serif text-lg sm:text-xl xl:text-2xl font-semibold text-stone-900 group-hover:text-gold-600 transition-colors duration-300">{title}</h3>
      </div>
      <p className="font-sans text-sm sm:text-base text-stone-500 leading-relaxed pl-[4rem] sm:pl-[4.75rem]">
        {desc}
      </p>
    </motion.div>
  );
}

export default function About() {
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, margin: '-100px' });

  const imageRef = useRef(null);
  const isImageInView = useInView(imageRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="pt-10 pb-6 sm:pt-16 sm:pb-8 lg:pt-16 lg:pb-12 xl:pt-20 xl:pb-16 relative overflow-hidden bg-[#faf9f7]">
      {/* Luxurious Background Decorations */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-stone-100/50 to-transparent pointer-events-none" />
      <div className="absolute -left-40 top-40 w-[600px] h-[600px] rounded-full bg-gold-200/20 blur-[120px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20 2xl:px-32">
        <div className="grid xl:grid-cols-[1fr_1.1fr] 2xl:grid-cols-[1fr_1.2fr] gap-16 lg:gap-20 xl:gap-24 2xl:gap-32 items-center">

          {/* ══ IMAGE SIDE ══ */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
            animate={isImageInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.25, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl lg:max-w-4xl mx-auto xl:max-w-none order-2 xl:order-1 mt-14 xl:mt-0"
          >
            {/* Decorative Gold Frame behind the image */}
            <div className="absolute inset-0 border border-gold-300 rounded-[2rem] sm:rounded-[3rem] translate-x-3 translate-y-3 sm:translate-x-6 sm:translate-y-6 -z-10" />

            {/* Main Image Container */}
            <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl shadow-gold-900/10 h-[450px] sm:h-[550px] lg:h-[650px] xl:h-[700px] 2xl:h-[750px] group">
              <img
                src="/aboutImage.webp"
                alt="Luxury travel experience"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent pointer-events-none" />

              {/* Bottom Card - Happy Travellers */}
              <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 bg-white/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/50 shadow-xl shadow-black/5">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="flex -space-x-3 sm:-space-x-4">
                    {[
                      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
                      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
                      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
                    ].map((src, i) => (
                      <img key={i} src={src} alt="traveller" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-sm sm:text-base font-bold text-stone-900 leading-tight">1000+ Happy Travellers</span>
                    <div className="flex items-center text-gold-500 text-[10px] sm:text-xs mt-1">
                      {'★★★★☆'} <span className="text-stone-500 ml-1.5 font-sans">4.5 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elite Card */}
            <motion.div
              className="absolute -right-2 top-8 sm:-right-8 sm:top-16 bg-stone-900/95 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-stone-700 shadow-2xl max-w-[160px] sm:max-w-[220px]"
              animate={{ y: [-12, 12, -12] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="text-gold-400 font-serif text-3xl sm:text-5xl font-bold tracking-tight">Elite</div>
              <div className="text-stone-300 font-sans text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
                Personalized Travel Experiences Made for You
              </div>
            </motion.div>
          </motion.div>

          {/* ══ CONTENT SIDE ══ */}
          <div className="flex flex-col order-1 xl:order-2 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="w-12 sm:w-16 h-[2px] bg-gold-400" />
                <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-gold-600">The Roya Experience</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-7xl font-semibold text-stone-900 leading-[1.05] tracking-tight mb-8 sm:mb-10">
                Crafting Journeys <br />
                <span className="text-gold-500 italic font-light">Worth Remembering</span>
              </h2>

              <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-16">
                <p className="font-sans text-stone-600 leading-relaxed text-base sm:text-lg xl:text-xl">
                  Roya Tourism is your trusted travel partner for unforgettable journeys across the world. We specialize in international and domestic tour packages, offering comfortable, well-planned, and memorable travel experiences for every traveller.
                </p>

                <p className="font-sans text-stone-600 leading-relaxed text-base sm:text-lg xl:text-xl">
                  From spiritual Umrah and Hajj packages to exciting holidays in Oman and other beautiful destinations, our team guides you through every step of your trip with care, comfort, and professional service.
                </p>
              </div>
            </motion.div>

            {/* Value Cards Grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-x-8 gap-y-10 xl:gap-y-8 2xl:gap-y-12">
              {values.map((v, i) => (
                <ValueCard key={v.title} {...v} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
