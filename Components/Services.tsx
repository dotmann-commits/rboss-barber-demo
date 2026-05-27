import { Scissors, User, Sparkles, Smile, Star, Crown, Gem } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const icons = [Scissors, User, Star, Sparkles, Smile, Crown, Gem];

interface ServicesProps {
  onSelectService: (serviceKey: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const { lang } = useLanguage();
  const t = translations[lang].services;

  const handleBook = (serviceKey: string) => {
    onSelectService(serviceKey);
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleConsultation = () => {
    onSelectService('');
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <section id="services" className="bg-brand-black py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="section-label mb-2">{t.sectionLabel}</p>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-brand-white">{t.sectionTitle}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-brand-border">
          {t.items.map(({ key, title, price, description }, idx) => {
            const Icon = icons[idx] ?? Scissors;
            return (
              <div
                key={key}
                className="bg-brand-card p-6 group flex flex-col gap-4 hover:bg-brand-dark transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                    <Icon size={16} className="text-brand-green-light" />
                  </div>
                  <span className="font-display text-xl font-700 text-brand-green-light">{price}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-700 text-brand-white mb-1">{title}</h3>
                  <p className="text-sm text-brand-gray leading-relaxed">{description}</p>
                </div>
                <button
                  onClick={() => handleBook(key)}
                  className="mt-auto text-xs text-brand-green-light hover:text-white tracking-widest uppercase transition-colors flex items-center gap-1 group"
                >
                  {t.book}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            );
          })}

          <div className="bg-brand-green/10 border border-brand-green/20 p-6 flex flex-col justify-center items-center text-center gap-3 col-span-1">
            <p className="text-brand-gray-light text-sm">{t.consultation}</p>
            <button onClick={handleConsultation} className="btn-primary text-xs tracking-widest w-full">
              {t.consultationBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
