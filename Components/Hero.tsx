import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const heroImages = [
  '/barber-action-shot.jpeg',
  '/barber-action-shot1.jpeg',
  '/barber-action-shot2.jpeg',
  '/services/01_Shape_Up.png',
  '/services/02_Hair_Treatment.png',
  '/services/03_Barber_In_Action.png',
  '/services/04_Full_Haircut.png',
  '/services/05_Coloring_Service.png',
];

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroImages.length);
        setFading(false);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBook = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? (fading ? 0 : 1) : 0 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover object-center"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/75" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="max-w-xl">
          <p className="section-label mb-3">{t.tagline}</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 text-white leading-[1.05] mb-4 tracking-tight">
            {t.headline1}<br />
            {t.headline2}<br />
            <span className="text-brand-green-light">{t.headline3}</span> {t.headline3b}
          </h1>
          <p className="text-brand-gray-light text-base md:text-lg leading-relaxed mb-8 max-w-md">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleBook} className="btn-primary text-xs tracking-widest">
              {t.bookBtn}
            </button>
            <button onClick={handleServices} className="btn-outline text-xs tracking-widest">
              {t.servicesBtn}
            </button>
          </div>
        </div>
      </div>

      <a
        href="#contact"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-white/70 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={22} />
      </a>

      <div className="absolute bottom-4 right-4 z-10 flex gap-1.5">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-brand-green-light' : 'w-2 bg-white/30'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
