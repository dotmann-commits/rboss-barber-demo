import { useState, useCallback } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const galleryImages = [
  { src: '/barber-action-shot3.jpeg', alt: 'Sharp fade and clean finish' },
  { src: '/gallery/barber-action-shot5.png', alt: 'Premium fade and precision haircut' },
  { src: '/gallery/barber-action-shot6.png', alt: 'Sharp cut and clean finish' },
  { src: '/gallery/beard-trim.png', alt: 'Beard trim and shaping' },
  { src: '/gallery/kids-haircut.png', alt: 'Kids haircut — careful and clean' },
  { src: '/services/03_Barber_In_Action.png', alt: 'Precision cut in action' },
  { src: '/services/04_Full_Haircut.png', alt: 'Full haircut result' },
  { src: '/services/05_Coloring_Service.png', alt: 'Professional hair coloring' },
];

export default function Gallery() {
  const { lang } = useLanguage();
  const t = translations[lang].gallery;

  const [lightbox, setLightbox] = useState<string | null>(null);

  const openLightbox = useCallback((src: string) => setLightbox(src), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section id="gallery" className="bg-brand-charcoal py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="section-label mb-2">{t.sectionLabel}</p>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-brand-white">{t.sectionTitle}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {galleryImages.map(({ src, alt }) => (
            <button
              key={src}
              onClick={() => openLightbox(src)}
              className="relative overflow-hidden aspect-[3/4] group focus:outline-none"
              aria-label={`View: ${alt}`}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <img
            src={lightbox}
            alt="Gallery preview"
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
