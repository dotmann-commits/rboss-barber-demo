import { useState, useCallback, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const galleryImages = [
  { src: '/gallery/full-haircut.png', alt: 'Full haircut result' },
  { src: '/services/05_Coloring_Service.png', alt: 'Professional hair coloring' },
  { src: '/0037528D-212E-43E1-ABA5-C22A2E6945AF.png', alt: 'Fresh cut' },
  { src: '/B6CADB6B-54E8-4700-888D-B8B0B1279020.jpeg', alt: 'Sharp style' },
  { src: '/F6C88B3B-89E9-45DC-871E-61E61B876814.png', alt: 'Precision grooming' },
  { src: '/gallery/barber-action-shot5.png', alt: 'Premium fade' },
  { src: '/gallery/barber-action-shot6.png', alt: 'Clean cut finish' },
  { src: '/gallery/beard-trim.png', alt: 'Beard trim and shaping' },
  { src: '/gallery/kids-haircut.png', alt: 'Kids haircut' },
  { src: '/gallery/rboss-action-1.png', alt: 'RBOSS in action' },
  { src: '/gallery/rboss-action-2.png', alt: 'RBOSS signature cut' },
];

const IMAGES_PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(galleryImages.length / IMAGES_PER_PAGE);

export default function Gallery() {
  const { lang } = useLanguage();
  const t = translations[lang].gallery;

  const [page, setPage] = useState(0);
  const [fading, setFading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const changePage = useCallback((getNext: (p: number) => number) => {
    setFading(true);
    setTimeout(() => {
      setPage(getNext);
      setFading(false);
    }, 250);
  }, []);

  const nextPage = useCallback(() => {
    changePage((p) => (p + 1) % TOTAL_PAGES);
  }, [changePage]);

  const prevPage = useCallback(() => {
    changePage((p) => (p - 1 + TOTAL_PAGES) % TOTAL_PAGES);
  }, [changePage]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextPage, 6000);
    return () => clearInterval(timer);
  }, [nextPage]);

  const visibleImages = galleryImages.slice(
    page * IMAGES_PER_PAGE,
    (page + 1) * IMAGES_PER_PAGE
  );

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null
    );
  }, []);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % galleryImages.length : null
    );
  }, []);

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, lightboxPrev, lightboxNext, closeLightbox]);

  return (
    <section id="gallery" className="bg-brand-charcoal py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="section-label mb-2">{t.sectionLabel}</p>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-brand-white">
            {t.sectionTitle}
          </h2>
        </div>

        {/* Carousel wrapper */}
        <div className="relative px-8 md:px-10">
          {/* 2×2 grid — large, premium framing */}
          <div
            className={`grid grid-cols-2 gap-3 md:gap-4 transition-opacity duration-300 ${
              fading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {visibleImages.map(({ src, alt }, localIndex) => {
              const globalIndex = page * IMAGES_PER_PAGE + localIndex;
              return (
                <button
                  key={src}
                  onClick={() => openLightbox(globalIndex)}
                  className="relative overflow-hidden rounded-xl aspect-[4/5] group focus:outline-none ring-1 ring-white/5 hover:ring-2 hover:ring-brand-green-light transition-all duration-300 shadow-lg"
                  aria-label={`View: ${alt}`}
                >
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 border border-white/20">
                      <ZoomIn size={22} className="text-white" />
                    </div>
                  </div>
                  {/* Caption slide up from bottom */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs text-white/90 tracking-wide font-medium truncate">{alt}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Prev arrow */}
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-brand-black/80 hover:bg-brand-black border border-brand-border text-white p-2 rounded-full transition-all duration-200 hover:scale-110 hover:border-brand-green-light"
            aria-label="Previous images"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next arrow */}
          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-brand-black/80 hover:bg-brand-black border border-brand-border text-white p-2 rounded-full transition-all duration-200 hover:scale-110 hover:border-brand-green-light"
            aria-label="Next images"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Page dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => (
            <button
              key={i}
              onClick={() => changePage(() => i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === page
                  ? 'w-6 bg-brand-green-light'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Full-screen Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Prev in lightbox */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-brand-black/80 hover:bg-brand-black border border-brand-border text-white p-3 rounded-full transition-all hover:scale-110 hover:border-brand-green-light z-10"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-h-[88vh] max-w-[80vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next in lightbox */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-brand-black/80 hover:bg-brand-black border border-brand-border text-white p-3 rounded-full transition-all hover:scale-110 hover:border-brand-green-light z-10"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>

          {/* Photo counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/40 tracking-widest">
            {lightboxIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </section>
  );
}
