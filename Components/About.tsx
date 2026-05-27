import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function About() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  const handleBook = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="bg-brand-black py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/owner-photo.jpeg"
                alt="RBOSS BARBER — master barber"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-4 -right-4 bg-brand-green p-5 hidden md:block">
              <p className="font-display text-3xl font-700 text-white leading-none">3+</p>
              <p className="text-xs text-white/80 tracking-widest uppercase mt-1">
                {lang === 'en' ? 'Years' : 'Anos'}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="section-label mb-3">{t.sectionLabel}</p>
            <h2 className="font-display text-3xl md:text-4xl font-700 text-brand-white mb-6 leading-tight">
              {t.sectionTitle}
            </h2>

            <div className="space-y-4 text-brand-gray text-sm leading-relaxed mb-8">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p>{t.p3}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 border-t border-brand-border pt-6">
              <div>
                <p className="font-display text-2xl md:text-3xl font-700 text-brand-green-light">{t.stat1Value}</p>
                <p className="text-[10px] text-brand-gray uppercase tracking-widest mt-1 leading-tight">{t.stat1Label}</p>
              </div>
              <div>
                <p className="font-display text-2xl md:text-3xl font-700 text-brand-green-light">{t.stat2Value}</p>
                <p className="text-[10px] text-brand-gray uppercase tracking-widest mt-1 leading-tight">{t.stat2Label}</p>
              </div>
              <div>
                <p className="font-display text-2xl md:text-3xl font-700 text-brand-green-light">{t.stat3Value}</p>
                <p className="text-[10px] text-brand-gray uppercase tracking-widest mt-1 leading-tight">{t.stat3Label}</p>
              </div>
            </div>

            <button onClick={handleBook} className="btn-primary text-xs tracking-widest">
              {t.bookBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
