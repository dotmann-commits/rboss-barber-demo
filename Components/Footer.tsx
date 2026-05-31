import { Globe, Phone, Mail, MapPin, Instagram, Youtube, Twitter, Linkedin, ArrowRight, Shield } from 'lucide-react';
import { useNavigation, Page } from '../context/NavigationContext';

const SERVICES = [
  { label: 'Domestic Flights', page: 'flights' as Page },
  { label: 'International Flights', page: 'flights' as Page },
  { label: 'Visa Processing', page: 'visa' as Page },
  { label: 'Travel Tours', page: 'tours' as Page },
  { label: 'Corporate Travel', page: 'tours' as Page },
  { label: 'Immigration Guidance', page: 'visa' as Page },
];

const STUDY = [
  { label: 'University Admissions', page: 'admissions' as Page },
  { label: 'Study Abroad Consulting', page: 'admissions' as Page },
  { label: 'Proof of Funds', page: 'proof-of-funds' as Page },
  { label: 'Student Relocation', page: 'admissions' as Page },
  { label: 'Scholarship Guidance', page: 'admissions' as Page },
];

const COMPANY = [
  { label: 'About Uptreek', page: 'about' as Page },
  { label: 'Our Mission', page: 'about' as Page },
  { label: 'Success Stories', page: 'about' as Page },
  { label: 'Client Portal', page: 'portal' as Page },
  { label: 'Contact Us', page: 'contact' as Page },
];

export default function Footer() {
  const { navigate } = useNavigation();

  return (
    <footer className="bg-uptreek-dark border-t border-white/5">
      {/* Newsletter strip */}
      <div className="bg-gradient-to-r from-uptreek-blue-muted to-uptreek-navy-mid border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Get Travel Deals & Study Abroad Updates</h3>
            <p className="text-uptreek-gray-mid text-sm mt-1">
              Subscribe for visa tips, scholarship alerts & exclusive packages.
            </p>
          </div>
          <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="form-input flex-1 md:w-72 py-2.5 text-sm"
            />
            <button type="submit" className="btn-gold py-2.5 px-5 text-sm whitespace-nowrap">
              Subscribe <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button onClick={() => navigate('home')} className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-uptreek-gold flex items-center justify-center shadow-gold">
                <Globe size={20} className="text-uptreek-navy" />
              </div>
              <div>
                <span className="text-2xl font-bold font-heading text-white">
                  UP<span className="text-uptreek-gold">TREEK</span>
                </span>
                <div className="text-[9px] text-uptreek-gray-mid tracking-[0.2em] uppercase -mt-0.5">
                  Travel & Education
                </div>
              </div>
            </button>
            <p className="text-uptreek-gray-mid text-sm leading-relaxed max-w-xs">
              Nigeria's premier travel and education consultancy. Helping Nigerians access global opportunities through travel, study, and immigration support.
            </p>
            <div className="mt-5 flex items-center gap-1.5">
              <Shield size={14} className="text-uptreek-gold" />
              <span className="text-uptreek-gold text-sm font-medium">AITA Approved Agency</span>
            </div>
            <div className="mt-5 space-y-2">
              <a href="tel:+2348000000000" className="flex items-center gap-2 text-sm text-uptreek-gray-mid hover:text-white transition-colors">
                <Phone size={13} className="text-uptreek-gold" />
                +234 800 000 0000
              </a>
              <a href="mailto:info@uptreek.com" className="flex items-center gap-2 text-sm text-uptreek-gray-mid hover:text-white transition-colors">
                <Mail size={13} className="text-uptreek-gold" />
                info@uptreek.com
              </a>
              <div className="flex items-start gap-2 text-sm text-uptreek-gray-mid">
                <MapPin size={13} className="text-uptreek-gold mt-0.5 shrink-0" />
                Lagos, Nigeria
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-uptreek-gold/20 hover:text-uptreek-gold text-uptreek-gray-mid flex items-center justify-center transition-all"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Travel Services</h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <button
                    onClick={() => navigate(s.page)}
                    className="text-uptreek-gray-mid hover:text-uptreek-gold text-sm transition-colors"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Study */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Study Abroad</h4>
            <ul className="space-y-2.5">
              {STUDY.map((s) => (
                <li key={s.label}>
                  <button
                    onClick={() => navigate(s.page)}
                    className="text-uptreek-gray-mid hover:text-uptreek-gold text-sm transition-colors"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {COMPANY.map((c) => (
                <li key={c.label}>
                  <button
                    onClick={() => navigate(c.page)}
                    className="text-uptreek-gray-mid hover:text-uptreek-gold text-sm transition-colors"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3 bg-uptreek-navy rounded-xl border border-white/5">
              <p className="text-xs text-uptreek-gray-mid mb-2">Operating Hours</p>
              <p className="text-xs text-white font-medium">Mon – Fri: 8am – 6pm</p>
              <p className="text-xs text-white font-medium">Saturday: 9am – 4pm</p>
              <p className="text-xs text-uptreek-gray-mid mt-1">West Africa Time (WAT)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-uptreek-gray-mid">
            © {new Date().getFullYear()} Uptreek Travel & Education Consultancy. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-uptreek-gray-mid">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
