import { useState, useCallback, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, MousePointer } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const galleryImages = [
  // Frame 1 — top: ← + → / bottom: → + ←
  { src: '/F6C88B3B-89E9-45DC-871E-61E61B876814.png',         alt: 'Precision grooming' },
  { src: '/gallery/full-haircut.png',                         alt: 'Full haircut result' },
  { src: '/gallery/newGallery.png',                           alt: 'RBOSS signature style' },
  { src: '/gallery/rboss-action-2.png',                       alt: 'RBOSS signature cut' },
  // Frame 2
  { src: '/gallery/rb-action-1.png',                          alt: 'RBOSS in action' },
  { src: '/gallery/rboss-action-1.png',                       alt: 'Sharp fade' },
  { src: '/services/05_Coloring_Service.png',                 alt: 'Professional hair coloring' },
  { src: '/0037528D-212E-43E1-ABA5-C22A2E6945AF.png',         alt: 'Fresh cut' },
  // Frame 3
  { src: '/gallery/barber-action-shot6.png',                  alt: 'Clean cut finish' },
  { src: '/B6CADB6B-54E8-4700-888D-B8B0B1279020.jpeg',        alt: 'Sharp style' },
  { src: '/gallery/beard-trim.png',                           alt: 'Beard trim and shaping' },
  { src: '/gallery/kids-haircut.png',                         alt: 'Kids haircut' },
];

const IMAGES_PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(galleryImages.length / IMAGES_PER_PAGE);

export default function Gallery() {
  const { lang } = useLanguage();
  const t = translations[lang].gallery;

  const [page, setPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const nextPage = useCallback(() => setPage((p) => (p + 1) % TOTAL_PAGES), []);
  const prevPage = useCallback(() => setPage((p) => (p - 1 + TOTAL_PAGES) % TOTAL_PAGES), []);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((i) => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null);
  }, []);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((i) => i !== null ? (i + 1) % galleryImages.length : null);
  }, []);

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

  const visibleImages = galleryImages.slice(page * IMAGES_PER_PAGE, (page + 1) * IMAGES_PER_PAGE);

  const imgBtn = (img: typeof galleryImages[0], globalIndex: number, extraClass = '') => (
    <button
      key={img.src}
      onClick={() => openLightbox(globalIndex)}
      className={`relative overflow-hidden rounded-xl group focus:outline-none ring-1 ring-white/5 hover:ring-2 hover:ring-brand-green-light transition-all duration-300 shadow-lg ${extraClass}`}
      aria-label={`View: ${img.alt}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 border border-white/20">
          <ZoomIn size={22} className="text-white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-xs text-white/90 tracking-wide font-medium truncate">{img.alt}</p>
      </div>
    </button>
  );

  return (
    <section id="gallery" className="bg-brand-charcoal py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-3">
          <div>
            <p className="section-label mb-2">{t.sectionLabel}</p>
            <h2 className="font-display text-3xl md:text-4xl font-700 text-brand-white">
              {t.sectionTitle}
            </h2>
          </div>
          <p className="flex items-center gap-2 text-xs text-brand-gray/60 tracking-widest">
            <MousePointer size={11} className="text-brand-green-light shrink-0" />
            {t.clickHint}
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="relative px-8 md:px-10">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {visibleImages.map((img, i) =>
              imgBtn(img, page * IMAGES_PER_PAGE + i, 'aspect-[4/5]')
            )}
          </div>

          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-brand-black/80 hover:bg-brand-black border border-brand-border text-white p-2 rounded-full transition-all duration-200 hover:scale-110 hover:border-brand-green-light"
            aria-label="Previous images"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-brand-black/80 hover:bg-brand-black border border-brand-border text-white p-2 rounded-full transition-all duration-200 hover:scale-110 hover:border-brand-green-light"
            aria-label="Next images"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots + photo counter */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="flex gap-2">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === page ? 'w-6 bg-brand-green-light' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
          <span className="text-xs text-brand-gray/40 tracking-widest">
            {page * IMAGES_PER_PAGE + 1}–{Math.min((page + 1) * IMAGES_PER_PAGE, galleryImages.length)} / {galleryImages.length}
          </span>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={28} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-brand-black/80 hover:bg-brand-black border border-brand-border text-white p-3 rounded-full transition-all hover:scale-110 hover:border-brand-green-light z-10"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-h-[88vh] max-w-[80vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-brand-black/80 hover:bg-brand-black border border-brand-border text-white p-3 rounded-full transition-all hover:scale-110 hover:border-brand-green-light z-10"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/40 tracking-widest">
            {lightboxIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </section>
  );
}
