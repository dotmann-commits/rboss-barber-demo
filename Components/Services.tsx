import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const serviceImages: Record<string, string> = {
  'Full Haircut': '/services/full-haircut.png',
  'Haircut + Beard': '/services/beard-haircut.png',
  'Kids Haircut': '/services/kids-haircut.png',
  'Hair Treatment': '/services/02_Hair_Treatment.png',
  'Beard Trim': '/services/beard-trim.png',
  'Coloring': '/services/05_Coloring_Service.png',
  'Premium Service': '/services/premium-service.png',
};

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

  return (
    <section id="services" className="bg-brand-black py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center md:text-left">
          <p className="section-label mb-2">{t.sectionLabel}</p>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-brand-white">
            {t.sectionTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-brand-gray">
            {lang === 'en'
              ? 'Premium barbering services designed for clean style, confidence, and a professional finish.'
              : 'Serviços de barbearia premium pensados para estilo, confiança e um acabamento profissional.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((service) => (
            <article
              key={service.key}
              className="group overflow-hidden rounded-2xl border border-brand-border bg-brand-card shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-brand-green/40"
            >
              <div className="relative h-56 overflow-hidden bg-brand-dark">
                <img
                  src={serviceImages[service.key]}
                  alt={service.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <h3 className="font-display text-xl font-700 text-white">{service.title}</h3>
                  <span className="rounded-full bg-brand-green px-4 py-2 text-sm font-700 text-white">
                    {service.price}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="min-h-[48px] text-sm leading-relaxed text-brand-gray">
                  {service.description}
                </p>
                <button
                  onClick={() => handleBook(service.key)}
                  className="mt-6 w-full rounded-full border border-brand-green/40 px-5 py-3 text-xs font-700 uppercase tracking-widest text-brand-green-light transition hover:bg-brand-green hover:text-white"
                >
                  {t.book}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
