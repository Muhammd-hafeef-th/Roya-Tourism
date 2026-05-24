import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const contactInfo = [
  {
    icon: Phone,
    label: "Call",
    value: "+91 81368 12345",
    sub: "Mon–Sun, 8am–10pm",
  },
  {
    icon: Mail,
    label: "Email",
    value: "royaglobal01@gmail.com",
    sub: "Response within 24 hours",
  },
  {
    icon: MapPin,
    label: "Destinations",
    value: "India, UAE, Saudi Arabia, UK & Oman",
    sub: "Curated journeys across trusted destinations",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat: 8am – 10pm",
    sub: "Sun: 9am – 9pm",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });

  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    package: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current || loading) return;

    setLoading(true);
    setErrorMsg("");
    setSent(false);

    try {
      const result = await emailjs.sendForm(
        "service_yopwk4k",
        "template_70crhse",
        formRef.current,
        "xigsYhypphH3dzb2f",
      );

      console.log("SUCCESS!", result.status, result.text);

      setSent(true);

      setForm({
        from_name: "",
        from_email: "",
        phone: "",
        package: "",
        message: "",
      });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setSent(false), 4000);
    } catch (error: unknown) {
      const emailError = error as { status?: number; text?: string };
      console.error("EmailJS error status:", emailError.status);
      console.error("EmailJS error text:", emailError.text);
      console.error("EmailJS full error:", error);

      if (emailError.status === 400) {
        setErrorMsg("Invalid EmailJS config or template fields.");
      } else if (emailError.status === 429) {
        setErrorMsg("Too many attempts. Please wait a minute and try again.");
      } else {
        setErrorMsg("Failed to send message. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#fbfaf8 0%,#f4efe6 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#c9a84c]" />
            <span className="text-sm md:text-base uppercase tracking-wider text-stone-500">
              Contact
            </span>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#c9a84c]" />
          </div>

          <h2 className="font-serif font-semibold text-3xl sm:text-4xl md:text-5xl text-stone-900">
            Let's plan your next journey
          </h2>

          <p className="mt-3 text-stone-500 max-w-2xl mx-auto">
            Tell us where you want to go and we'll create a premium,
            personalised itinerary — hassle free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-3">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="group flex items-center gap-4 p-4 rounded-[1.5rem] bg-white border border-[#eee7dd] shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-[1rem] flex items-center justify-center bg-gradient-to-br from-[#c9a84c] to-[#f0d98a] text-white shadow-md shadow-[#c9a84c]/20 flex-shrink-0">
                    <info.icon size={18} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-stone-400 uppercase tracking-[0.22em] font-semibold mb-1">
                      {info.label}
                    </div>

                    <div className="font-semibold text-stone-800 text-[15px] md:text-[17px] leading-relaxed break-words">
                      {info.value}
                    </div>

                    <div className="text-xs md:text-sm text-stone-400 mt-1">
                      {info.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/+917356231571?text=Hi%20Roya%20Global%20Tourism%2C%20I%20would%20like%20to%20plan%20a%20journey"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-medium shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <MessageCircle size={18} />
              <span className="font-medium">Chat on WhatsApp</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white/95 border border-[#eee7dd] rounded-[2rem] p-6 md:p-8 shadow-[0_30px_90px_rgba(38,38,38,0.12)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-semibold">
                  Send us a message
                </h3>
                <div className="text-xs md:text-sm text-stone-400">
                  Fast responses • Secure
                </div>
              </div>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm"
                >
                  Thanks — we received your message and will reply within 24
                  hours.
                </motion.div>
              )}

              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-500 uppercase mb-1 font-semibold">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      value={form.from_name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-[#efe9df] bg-[#fff] focus:outline-none focus:ring-2 focus:ring-[#f0d98a] transition placeholder:text-stone-400 text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-500 uppercase mb-1 font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="from_email"
                      value={form.from_email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#efe9df] bg-[#fff] focus:outline-none focus:ring-2 focus:ring-[#f0d98a] transition placeholder:text-stone-400 text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-500 uppercase mb-1 font-semibold">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 234 567 890"
                      className="w-full px-4 py-3 rounded-xl border border-[#efe9df] bg-[#fff] focus:outline-none focus:ring-2 focus:ring-[#f0d98a] transition placeholder:text-stone-400 text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-500 uppercase mb-1 font-semibold">
                      Package
                    </label>
                    <select
                      name="package"
                      value={form.package}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#efe9df] bg-[#fff] focus:outline-none focus:ring-2 focus:ring-[#f0d98a] transition text-stone-700 text-sm md:text-base"
                    >
                      <option value="">Choose a destination</option>
                      <option value="Umrah / Hajj">Umrah / Hajj</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Europe">Europe</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-500 uppercase mb-1 font-semibold">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about dates, group size, special requests..."
                    className="w-full px-4 py-3 rounded-2xl border border-[#efe9df] bg-[#fff] focus:outline-none focus:ring-2 focus:ring-[#f0d98a] transition resize-none placeholder:text-stone-400 text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#c9a84c] to-[#f0d98a] text-white font-semibold shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  {loading ? "Sending..." : "Send Inquiry"}
                </button>

                <a
                  href="tel:6235957243"
                  className="text-stone-600 text-sm text-center sm:text-left"
                >
                  Or call us:{" "}
                  <span className="font-medium text-stone-800">
                    +91 81368 12345
                  </span>
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
