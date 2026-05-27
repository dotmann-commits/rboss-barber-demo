import { Instagram, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  const navLinks = [
    { label: nav.home, href: '#' },
    { label: nav.gallery, href: '#gallery' },
    { label: nav.services, href: '#services' },
    { label: nav.about, href: '#about' },
    { label: lang === 'en' ? 'Book' : 'Reservar', href: '#booking' },
  ];

  const taglineLines = t.tagline.split('\n');

  return (
    <footer className="bg-brand-black border-t border-brand-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">
          {/* Brand */}
          <div>
            <a href="#" aria-label="RBOSS BARBER — Home" className="inline-block mb-4">
              <img
                src="/rboss-logo.jpeg"
                alt="RBOSS BARBER"
                className="h-20 w-20 rounded-full object-cover ring-2 ring-white/10"
              />
            </a>
            <p className="font-display text-base font-700 text-white mb-1">RBOSS BARBER</p>
            <p className="text-xs text-brand-gray leading-relaxed">
              {taglineLines[0]}<br />{taglineLines[1]}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs text-brand-gray uppercase tracking-widest mb-4">{t.navigationLabel}</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-gray-light hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs text-brand-gray uppercase tracking-widest mb-4">{t.contactLabel}</p>
            <ul className="space-y-3">
              {/* WhatsApp */}
              <li>
                <a
                  href="https://wa.me/351933469593"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-brand-gray-light hover:text-white transition-colors"
                >
                  <MessageCircle size={13} className="text-brand-green-light flex-shrink-0" />
                  +351 933 469 593
                </a>
              </li>
              {/* Instagram */}
              <li>
                <a
                  href="https://www.instagram.com/rboss_barber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-brand-gray-light hover:text-white transition-colors"
                >
                  <Instagram size={13} className="text-brand-green-light flex-shrink-0" />
                  @rboss_barber
                </a>
              </li>
              {/* Address → Google Maps */}
              <li>
                <a
                  href="https://maps.google.com/?q=Rua+de+Costa+Cabral+279+1+B,+4200-222+Porto,+Portugal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-brand-gray-light hover:text-white transition-colors"
                >
                  <MapPin size={13} className="text-brand-green-light flex-shrink-0 mt-0.5" />
                  <span>
                    Rua de Costa Cabral 279 1 B,<br />
                    4200-222 Porto, Portugal
                  </span>
                </a>
              </li>
            </ul>

            {/* Hours */}
            <div className="mt-6">
              <p className="text-xs text-brand-gray uppercase tracking-widest mb-2">{t.hoursLabel}</p>
              <p className="text-sm text-brand-gray-light">{t.hoursValue}</p>
              <p className="text-sm text-brand-gray">{t.sundayValue}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-gray">
            © {new Date().getFullYear()} RBOSS BARBER. {t.copyright}
          </p>
          {/* MikeOps Attribution */}
          <a
            href="https://mikeops.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-brand-gray/50 hover:text-brand-gray-light transition-colors"
          >
            {t.poweredBy}{' '}
            <span className="font-semibold text-brand-gray/70">MikeOps</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
