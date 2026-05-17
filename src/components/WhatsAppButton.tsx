import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-white rounded-3xl p-5 shadow-luxury-lg max-w-[280px] border border-cream-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
              >
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <div className="font-serif text-sm font-semibold text-stone-900">Roya Travels</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="font-sans text-xs text-stone-500">Online now</span>
                </div>
              </div>
            </div>
            <p className="font-sans text-sm text-stone-600 leading-relaxed mb-4">
              Hello! How can we help you plan your dream journey? We respond within minutes.
            </p>
            <a
              href="https://wa.me/1234567890?text=Hi%20Roya%20Travels%2C%20I%20would%20like%20to%20inquire%20about%20your%20travel%20packages"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-sans text-sm text-white font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            >
              <MessageCircle size={16} />
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-luxury text-white"
        style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={open ? {} : { y: [0, -5, 0] }}
        transition={open ? {} : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Ping ring */}
        {!open && (
          <div className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ background: '#25D366' }}
          />
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={22} /> : <MessageCircle size={22} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
