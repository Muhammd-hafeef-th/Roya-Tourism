import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[999] flex flex-col items-end">

      {/* CHAT BOX */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{
              duration: 0.25,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mb-4 w-[320px] overflow-hidden rounded-[28px] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.18)] border border-stone-200"
          >

            {/* HEADER */}
            <div
              className="relative px-5 py-4 text-white"
              style={{
                background:
                  'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              }}
            >

              {/* PATTERN */}
              <div className="absolute inset-0 opacity-[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:18px_18px]" />
              </div>

              <div className="relative flex items-center gap-3">

                {/* AVATAR */}
                <div className="relative">

                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
                    alt="Support"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                  />

                  {/* ONLINE DOT */}
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-300 border-2 border-white" />
                </div>

                {/* INFO */}
                <div>

                  <h3 className="font-semibold text-[15px] leading-none">
                    Roya Global Tourism
                  </h3>

                  <p className="text-white/80 text-xs mt-1">
                    Typically replies within minutes
                  </p>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="bg-[#efeae2] px-4 py-5">

              {/* MESSAGE */}
              <div className="max-w-[90%] rounded-[20px] rounded-tl-md bg-white px-4 py-3 shadow-sm">

                <p className="text-[14px] text-stone-700 leading-relaxed">
                  Hello 👋
                  <br />
                  Welcome to <span className="font-semibold">Roya Global Tourism</span>.
                  <br />
                  How can we help you plan your dream journey today?
                </p>

                <div className="mt-2 text-[11px] text-stone-400 text-right">
                  10:24 AM
                </div>
              </div>

              {/* BUTTON */}
              <a
                href="https://wa.me/+916235957243?text=Hi%20Roya%20Global%20Tourism%2C%20I%20would%20like%20to%20inquire%20about%20your%20travel%20packages"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-3 rounded-2xl py-3.5 text-white font-medium transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background:
                    'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                }}
              >

                <FaWhatsapp className="text-[20px]" />

                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN BUTTON */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-[62px] h-[62px] rounded-full flex items-center justify-center bg-[#25D366] shadow-[0_8px_25px_rgba(37,211,102,0.35)]"
      >

        {/* RIPPLE */}
        {!open && (
          <span className="absolute inset-0 rounded-full border border-[#25D366]/40 animate-ping" />
        )}

        {/* ICON SWITCH */}
        <AnimatePresence mode="wait">
          <motion.div
            key={open ? 'close' : 'whatsapp'}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative z-10"
          >

            {open ? (
              <X size={28} className="text-white" />
            ) : (
              <FaWhatsapp className="text-white text-[34px]" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}