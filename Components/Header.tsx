import { useState, useEffect } from 'react';
import { Globe, Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { useNavigation, Page } from '../context/NavigationContext';

interface NavItem {
  label: string;
  page?: Page;
  children?: { label: string; page: Page; description: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Flights',
    page: 'flights',
    children: [
      { label: 'Domestic Flights', page: 'flights', description: 'Nigeria routes' },
      { label: 'International Flights', page: 'flights', description: 'Worldwide destinations' },
      { label: 'Business Travel', page: 'flights', description: 'Corporate flight solutions' },
      { label: 'Group Travel', page: 'flights', description: 'Groups of 10+' },
    ],
  },
  {
    label: 'Study Abroad',
    page: 'admissions',
    children: [
      { label: 'University Admissions', page: 'admissions', description: 'UK, Canada, USA & more' },
      { label: 'Proof of Funds', page: 'proof-of-funds', description: 'Financial documentation' },
      { label: 'Student Relocation', page: 'admissions', description: 'Full relocation support' },
    ],
  },
  {
    label: 'Visa Services',
    page: 'visa',
    children: [
      { label: 'Student Visa', page: 'visa', description: 'Study permit assistance' },
      { label: 'Tourist Visa', page: 'visa', description: 'Holiday & travel visas' },
      { label: 'Work Visa', page: 'visa', description: 'Employment visas' },
      { label: 'Business Visa', page: 'visa', description: 'Corporate travel visas' },
    ],
  },
  {
    label: 'Tours',
    page: 'tours',
    children: [
      { label: 'Travel Tours', page: 'tours', description: 'Guided tour packages' },
      { label: 'Vacation Packages', page: 'tours', description: 'Holiday bundles' },
      { label: 'Corporate Travel', page: 'tours', description: 'Business trip planning' },
    ],
  },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export default function Header() {
  const { currentPage, navigate } = useNavigation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (page: Page) => {
    navigate(page);
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden md:block bg-uptreek-dark border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-2">
          <div className="flex items-center gap-6 text-xs text-uptreek-gray-mid">
            <a href="tel:+2348000000000" className="flex items-center gap-1.5 hover:text-uptreek-gold transition-colors">
              <Phone size={12} />
              +234 800 000 0000
            </a>
            <a href="mailto:info@uptreek.com" className="flex items-center gap-1.5 hover:text-uptreek-gold transition-colors">
              <Mail size={12} />
              info@uptreek.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge-gold text-xs py-0.5 px-2">AITA Approved</span>
            <span className="text-xs text-uptreek-gray-mid">Mon–Sat: 8am – 6pm WAT</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-uptreek-dark/95 backdrop-blur-md shadow-navy border-b border-white/5'
            : 'bg-uptreek-navy border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-uptreek-gold flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
                <Globe size={18} className="text-uptreek-navy" />
              </div>
              <div>
                <span className="text-xl font-bold font-heading text-white tracking-wide">
                  UP<span className="text-uptreek-gold">TREEK</span>
                </span>
                <div className="text-[9px] text-uptreek-gray-mid tracking-[0.2em] uppercase -mt-0.5">
                  Travel & Education
                </div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => item.page && handleNav(item.page)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === item.page
                        ? 'text-uptreek-gold bg-uptreek-gold/10'
                        : 'text-white/80 hover:text-uptreek-gold hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-60 glass-dark rounded-xl overflow-hidden shadow-card animate-fade-in z-10">
                      <div className="p-2">
                        {item.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={() => handleNav(child.page)}
                            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                          >
                            <div className="text-sm font-medium text-white group-hover:text-uptreek-gold transition-colors">
                              {child.label}
                            </div>
                            <div className="text-xs text-uptreek-gray-mid mt-0.5">{child.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => handleNav('portal')}
                className="text-sm font-medium text-uptreek-gray-mid hover:text-white transition-colors"
              >
                Client Portal
              </button>
              <button onClick={() => handleNav('contact')} className="btn-gold text-sm py-2 px-5">
                Book Consultation
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-uptreek-dark border-t border-white/5 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => item.page && handleNav(item.page)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-uptreek-gold hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </button>
                  {item.children && (
                    <div className="ml-4 space-y-0.5">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => handleNav(child.page)}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-uptreek-gray-mid hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
                <button onClick={() => handleNav('portal')} className="btn-ghost text-sm py-2.5 w-full justify-center">
                  Client Portal
                </button>
                <button onClick={() => handleNav('contact')} className="btn-gold text-sm py-2.5 w-full justify-center">
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
