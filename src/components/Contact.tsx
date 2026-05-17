import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const contactInfo = [
  { icon: Phone, label: 'Call Us', value: '+1 234 567 890', sub: 'Mon–Sat, 9am–9pm' },
  { icon: Mail, label: 'Email Us', value: 'hello@royatravels.com', sub: 'Response within 24 hours' },
  { icon: MapPin, label: 'Visit Us', value: '42 Luxury Lane, Travel District', sub: 'Dubai, UAE' },
  { icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 9am – 9pm', sub: 'Sunday: 10am – 5pm' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', destination: '', message: '' });
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #faf9f7 0%, #f0ebe0 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)', transform: 'translate(30%, 30%)' }}
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
            <span className="section-tag">Get In Touch</span>
            <div className="w-8 h-px bg-gold-400" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 mb-4">
            Start Planning Your <span className="text-gold-600 italic">Dream Journey</span>
          </h2>
          <p className="font-sans text-stone-500 text-base max-w-xl mx-auto leading-relaxed">
            Our travel consultants are here to craft a bespoke itinerary tailored to your wishes. Reach out today and let the adventure begin.
          </p>
          <div className="flex justify-center mt-5">
            <div className="gold-divider" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div>
              <h3 className="font-serif text-2xl text-stone-900 font-semibold mb-2">Ready to Explore?</h3>
              <p className="font-sans text-stone-500 text-sm leading-relaxed">
                Whether you're planning a spiritual Umrah journey, a romantic getaway, or a family holiday — we're here to make it extraordinary.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 border border-cream-300 shadow-soft"
                >
                  <div className="w-10 h-10 rounded-xl btn-gold flex items-center justify-center flex-shrink-0 shadow-gold-sm">
                    <info.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-sans text-xs text-stone-400 uppercase tracking-wider mb-0.5">{info.label}</div>
                    <div className="font-serif text-stone-800 text-sm font-medium">{info.value}</div>
                    <div className="font-sans text-stone-400 text-xs">{info.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/1234567890?text=Hi%20Roya%20Travels%2C%20I%20would%20like%20to%20plan%20a%20journey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl shadow-luxury transition-all duration-300 hover:shadow-luxury-lg hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
            >
              <MessageCircle size={20} className="text-white" />
              <span className="font-sans text-white font-medium">Chat on WhatsApp</span>
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass-white rounded-3xl p-5 sm:p-8 shadow-luxury-lg">
              <h3 className="font-serif text-2xl text-stone-900 font-semibold mb-6">Send Us a Message</h3>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 font-sans text-sm"
                >
                  Thank you! Your inquiry has been sent. We'll be in touch within 24 hours.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs text-stone-500 mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50 font-sans text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-stone-500 mb-1.5 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50 font-sans text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs text-stone-500 mb-1.5 uppercase tracking-wider">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 234 567 890"
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50 font-sans text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-stone-500 mb-1.5 uppercase tracking-wider">Destination</label>
                    <select
                      value={form.destination}
                      onChange={e => setForm({ ...form, destination: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50 font-sans text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-transparent transition-all"
                    >
                      <option value="">Select destination</option>
                      <option>Umrah / Hajj</option>
                      <option>Dubai</option>
                      <option>Maldives</option>
                      <option>Turkey</option>
                      <option>Thailand</option>
                      <option>Europe</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs text-stone-500 mb-1.5 uppercase tracking-wider">Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your dream journey — dates, group size, special requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50 font-sans text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold py-4 rounded-2xl font-sans text-base flex items-center justify-center gap-2 shadow-gold"
                >
                  <Send size={18} />
                  Send Inquiry
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
