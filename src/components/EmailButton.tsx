import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function EmailButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    from_email: '',
    phone: '',
    message: '',
    from_name: 'Floating Email Inquiry',
    package: 'General Inquiry'
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg('');
    setSent(false);

    try {
      await emailjs.sendForm(
        "service_yopwk4k",
        "template_70crhse",
        formRef.current!,
        "xigsYhypphH3dzb2f"
      );

      setSent(true);
      setForm({
        from_email: '',
        phone: '',
        message: '',
        from_name: 'Floating Email Inquiry',
        package: 'General Inquiry'
      });

      // Auto close after 3 seconds on success
      setTimeout(() => {
        setIsOpen(false);
        setSent(false);
      }, 3000);

    } catch (error) {
      console.error("EmailJS floating form error:", error);
      setErrorMsg("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[96px] right-5 sm:bottom-[112px] sm:right-7 z-[999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-4 w-[320px] sm:w-[360px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-stone-200"
          >
            {/* Header */}
            <div 
              className="relative px-5 py-4 text-white flex items-center justify-between"
              style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #a88932 100%)',
              }}
            >
              {/* Luxury gold accent line inside header */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20" />
              
              <div>
                <h3 className="font-serif font-semibold text-[15px] leading-tight tracking-wide">
                  Roya Global Tourism
                </h3>
                <p className="text-[10px] text-white/80 mt-0.5 font-sans">
                  Direct inquiry to our travel experts
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
                aria-label="Close form"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form / Content */}
            <div className="p-5 bg-gradient-to-b from-[#faf9f7] to-[#f5f2eb]">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <CheckCircle size={44} className="text-[#c9a84c] mb-3 animate-bounce" />
                  <h4 className="font-serif font-semibold text-stone-800 text-[15px]">Message Sent!</h4>
                  <p className="text-xs text-stone-500 mt-1 px-4">
                    Thank you. We have received your inquiry and will reply within 24 hours.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {/* Hidden fields mapped to EmailJS Template */}
                  <input type="hidden" name="from_name" value={form.from_name} />
                  <input type="hidden" name="package" value={form.package} />
                  
                  {errorMsg && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] text-stone-450 uppercase tracking-wider font-semibold mb-1 select-none">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="from_email"
                      required
                      value={form.from_email}
                      onChange={(e) => setForm({ ...form, from_email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#f0d98a]/70 text-base md:text-sm text-stone-800 transition-all placeholder:text-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-450 uppercase tracking-wider font-semibold mb-1 select-none">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. +91 81368 12345"
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#f0d98a]/70 text-base md:text-sm text-stone-800 transition-all placeholder:text-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-450 uppercase tracking-wider font-semibold mb-1 select-none">
                      Description / Request
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your travel dates, group size, or destinations..."
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#f0d98a]/70 text-base md:text-sm text-stone-800 transition-all placeholder:text-stone-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #c9a84c 0%, #a88932 100%)',
                    }}
                  >
                    <Send size={14} />
                    {loading ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="w-[62px] h-[62px] rounded-full flex items-center justify-center text-white shadow-[0_8px_25px_rgba(201,168,76,0.35)] cursor-pointer focus:outline-none relative"
        style={{
          background: 'linear-gradient(135deg, #c9a84c 0%, #a88932 100%)',
        }}
        aria-label="Direct Email Inquiry"
        title="Direct Email Inquiry"
      >
        <span className="absolute inset-0 rounded-full border border-[#c9a84c]/40 animate-ping pointer-events-none" />
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'email'}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X size={26} /> : <Mail size={26} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
