import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export default function Header() {
  const { lang, setLang } = useLanguage();
  const t = translations[lang].nav;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t.home, href: '#' },
    { label: t.gallery, href: '#gallery' },
    { label: t.services, href: '#services' },
    { label: t.about, href: '#about' },
    { label: t.contact, href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBook = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-black/95 backdrop-blur-sm border-b border-brand-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-18">
        <a href="#" aria-label="RBOSS BARBER — Home">
          <img
            src="/rboss-logo.jpeg"
            alt="RBOSS BARBER"
            className="h-14 w-14 rounded-full object-cover ring-2 ring-white/10"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-brand-gray-light hover:text-white transition-colors duration-150 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex items-center gap-1 text-xs tracking-widest">
            <button
              onClick={() => setLang('en')}
              className={`px-1.5 py-0.5 transition-colors ${
                lang === 'en'
                  ? 'text-brand-green-light font-semibold'
                  : 'text-brand-gray hover:text-white'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <span className="text-brand-border">|</span>
            <button
              onClick={() => setLang('pt')}
              className={`px-1.5 py-0.5 transition-colors ${
                lang === 'pt'
                  ? 'text-brand-green-light font-semibold'
                  : 'text-brand-gray hover:text-white'
              }`}
              aria-label="Mudar para Português"
            >
              PT
            </button>
          </div>
          <button onClick={handleBook} className="btn-primary text-xs tracking-widest">
            {t.bookNow}
          </button>
        </div>

        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-brand-black/98 border-t border-brand-border px-4 py-6 flex flex-col gap-5 animate-fade-in">
          <div className="flex justify-center mb-2">
            <img
              src="/rboss-logo.jpeg"
              alt="RBOSS BARBER"
              className="h-14 w-14 rounded-full object-cover"
            />
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base text-brand-gray-light hover:text-white transition-colors tracking-wide py-1 border-b border-brand-border"
            >
              {link.label}
            </a>
          ))}
          {/* Mobile Language Toggle */}
          <div className="flex items-center gap-2 text-xs tracking-widest py-1 border-b border-brand-border">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 transition-colors ${
                lang === 'en'
                  ? 'text-brand-green-light font-semibold'
                  : 'text-brand-gray hover:text-white'
              }`}
            >
              EN
            </button>
            <span className="text-brand-border">|</span>
            <button
              onClick={() => setLang('pt')}
              className={`px-2 py-1 transition-colors ${
                lang === 'pt'
                  ? 'text-brand-green-light font-semibold'
                  : 'text-brand-gray hover:text-white'
              }`}
            >
              PT
            </button>
          </div>
          <button onClick={handleBook} className="btn-primary w-full mt-2 tracking-widest text-xs">
            {t.bookAppointment}
          </button>
        </div>
      )}
    </header>
  );
}
