import { Globe, Instagram, Facebook, Twitter, Youtube, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const links = {
    Company: ['About Us', 'Our Team', 'Careers', 'Press'],
    Services: ['Umrah Packages', 'Hajj Packages', 'International Tours', 'Visa Support'],
    Destinations: ['Dubai', 'Maldives', 'Turkey', 'Thailand', 'Europe', 'Bali'],
    Support: ['Contact Us', 'FAQ', 'Travel Insurance', 'Terms & Conditions'],
  };

  return (
    <footer style={{ background: '#1a1510' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Top */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full btn-gold flex items-center justify-center shadow-gold-sm">
                <Globe size={18} className="text-white" />
              </div>
              <div>
                <div className="font-serif text-xl font-semibold text-white">Roya Travels</div>
                <div className="section-tag text-[0.6rem]" style={{ color: '#c9a84c' }}>PREMIUM TRAVEL AGENCY</div>
              </div>
            </div>
            <p className="font-sans text-sm text-white/50 leading-relaxed mb-6">
              Crafting extraordinary journeys across the globe since 2009. From sacred spiritual experiences to luxury getaways — your world awaits.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-gold-500 hover:text-gold-400 transition-all duration-300"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div className="section-tag mb-4" style={{ color: '#c9a84c' }}>{section}</div>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <button className="font-sans text-sm text-white/50 hover:text-white transition-colors duration-200 text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="font-sans text-sm text-white/35">
            © 2024 Roya Travels. All rights reserved. Crafted with passion.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <a href="tel:+1234567890" className="flex items-center gap-2 font-sans text-sm text-white/50 hover:text-gold-400 transition-colors">
              <Phone size={13} />
              +1 234 567 890
            </a>
            <a href="mailto:hello@royatravels.com" className="flex items-center gap-2 font-sans text-sm text-white/50 hover:text-gold-400 transition-colors">
              <Mail size={13} />
              hello@royatravels.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
