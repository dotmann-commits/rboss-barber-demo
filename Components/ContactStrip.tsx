import { Phone, MapPin, Clock, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function ContactStrip() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  const items = [
    {
      icon: Phone,
      label: t.callUs,
      value: '+351 933 469 593',
      href: 'https://wa.me/351933469593',
    },
    {
      icon: Instagram,
      label: t.instagram,
      value: '@rboss_barber',
      href: 'https://www.instagram.com/rboss_barber',
    },
    {
      icon: MapPin,
      label: t.location,
      value: t.locationValue,
      href: 'https://maps.google.com/?q=Rua+de+Costa+Cabral+279+1+B,+4200-222+Porto,+Portugal',
    },
    {
      icon: Clock,
      label: t.hours,
      value: t.hoursValue,
      href: '#',
    },
  ];

  return (
    <section id="contact" className="bg-brand-dark border-y border-brand-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-brand-border">
          {items.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 px-4 py-1 group"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                <Icon size={14} className="text-brand-green-light" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-brand-gray uppercase tracking-widest leading-none mb-0.5">{label}</p>
                <p className="text-xs text-brand-white font-medium truncate group-hover:text-brand-green-light transition-colors">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
