import { useState } from 'react';
import {
  Plane, GraduationCap, FileText, MapPin, Star, ChevronDown, ChevronUp,
  Shield, Award, Users, TrendingUp, CheckCircle, ArrowRight, Globe,
  Building2, Clock, Phone, Briefcase, Heart, Sparkles
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

/* ─── Hero ─── */
function Hero() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<'flight' | 'study' | 'visa'>('flight');

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-uptreek-dark via-uptreek-navy to-uptreek-navy-mid" />
      <div className="absolute inset-0 dot-pattern opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-uptreek-dark/80 via-transparent to-transparent" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-uptreek-blue/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-uptreek-gold/8 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-uptreek-gold/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/3" />

      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge-gold mb-6 inline-flex">
            <Shield size={12} />
            AITA Approved Agency · Trusted by 2,000+ Nigerians
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white leading-tight mb-6">
            Your Gateway to
            <br />
            <span className="animated-gradient-text">the World</span>
          </h1>

          <p className="text-lg md:text-xl text-uptreek-gray-mid max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium travel, study abroad consulting, and visa services — helping Nigerians access global
            opportunities with confidence and ease.
          </p>

          {/* Quick action tabs */}
          <div className="glass rounded-2xl p-1.5 inline-flex gap-1 mb-6">
            {(['flight', 'study', 'visa'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${
                  activeTab === tab
                    ? 'bg-uptreek-gold text-uptreek-navy shadow-gold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {tab === 'flight' ? '✈️ Book Flight' : tab === 'study' ? '🎓 Study Abroad' : '🛂 Visa Help'}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="glass rounded-2xl p-4 md:p-6 text-left max-w-3xl mx-auto mb-10">
            {activeTab === 'flight' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="form-label">From</label>
                  <input className="form-input text-sm" placeholder="Lagos, Abuja..." />
                </div>
                <div>
                  <label className="form-label">To</label>
                  <input className="form-input text-sm" placeholder="London, Dubai..." />
                </div>
                <div>
                  <label className="form-label">Travel Date</label>
                  <input type="date" className="form-input text-sm" />
                </div>
              </div>
            )}
            {activeTab === 'study' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="form-label">Destination Country</label>
                  <select className="form-input text-sm">
                    <option value="">Select country...</option>
                    {['UK', 'Canada', 'USA', 'Ireland', 'Germany', 'Australia', 'Netherlands'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Program Level</label>
                  <select className="form-input text-sm">
                    <option value="">Select level...</option>
                    {['Undergraduate', 'Masters', 'PhD', 'Foundation', 'Diploma'].map(p => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Start Date</label>
                  <select className="form-input text-sm">
                    <option>January 2025</option>
                    <option>September 2025</option>
                    <option>January 2026</option>
                  </select>
                </div>
              </div>
            )}
            {activeTab === 'visa' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="form-label">Visa Type</label>
                  <select className="form-input text-sm">
                    <option value="">Select visa type...</option>
                    {['Student Visa', 'Tourist Visa', 'Work Visa', 'Business Visa', 'Family Visa'].map(v => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Destination</label>
                  <input className="form-input text-sm" placeholder="UK, Canada, USA..." />
                </div>
                <div>
                  <label className="form-label">Intended Travel Date</label>
                  <input type="date" className="form-input text-sm" />
                </div>
              </div>
            )}
            <button
              onClick={() => navigate(activeTab === 'flight' ? 'flights' : activeTab === 'study' ? 'admissions' : 'visa')}
              className="btn-gold w-full mt-4 justify-center text-base"
            >
              {activeTab === 'flight' ? 'Search Flights' : activeTab === 'study' ? 'Start Application' : 'Check Eligibility'}
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-uptreek-gray-mid">
            {[
              { icon: CheckCircle, text: 'No Hidden Fees' },
              { icon: Shield, text: 'AITA Certified' },
              { icon: Clock, text: '24hr Response' },
              { icon: Award, text: '98% Visa Success' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon size={14} className="text-uptreek-gold" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-xs text-uptreek-gray-mid">Scroll to explore</span>
        <ChevronDown size={16} className="text-uptreek-gold" />
      </div>
    </section>
  );
}

/* ─── Trust Bar ─── */
function TrustBar() {
  const STATS = [
    { value: '2,000+', label: 'Clients Served' },
    { value: '98%', label: 'Visa Success Rate' },
    { value: '500+', label: 'Students Placed Abroad' },
    { value: '50+', label: 'Partner Universities' },
    { value: '15+', label: 'Countries Covered' },
    { value: '5 Yrs', label: 'Industry Experience' },
  ];

  return (
    <section className="bg-gradient-to-r from-uptreek-blue-muted via-uptreek-navy-mid to-uptreek-blue-muted border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="stat-number">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ─── */
function Services() {
  const { navigate } = useNavigation();

  const SERVICES = [
    { icon: Plane, title: 'Local Flights', desc: 'Domestic routes across Nigeria at best fares', page: 'flights', color: 'blue' },
    { icon: Globe, title: 'International Flights', desc: 'Worldwide destinations, competitive prices', page: 'flights', color: 'blue' },
    { icon: GraduationCap, title: 'University Admissions', desc: 'Admission to top global universities', page: 'admissions', color: 'gold' },
    { icon: Building2, title: 'Study Abroad Consulting', desc: 'Personalized guidance for studying overseas', page: 'admissions', color: 'gold' },
    { icon: FileText, title: 'Visa Processing', desc: 'All visa types with expert handling', page: 'visa', color: 'blue' },
    { icon: Shield, title: 'Proof of Funds', desc: 'Financial documentation assistance', page: 'proof-of-funds', color: 'gold' },
    { icon: MapPin, title: 'Travel Tours', desc: 'Curated tours to top global destinations', page: 'tours', color: 'blue' },
    { icon: Heart, title: 'Vacation Packages', desc: 'All-inclusive holiday packages', page: 'tours', color: 'blue' },
    { icon: Briefcase, title: 'Corporate Travel', desc: 'Seamless business travel management', page: 'tours', color: 'gold' },
    { icon: Users, title: 'Immigration Guidance', desc: 'Comprehensive immigration advisory', page: 'visa', color: 'gold' },
    { icon: Phone, title: 'Travel Consultation', desc: 'Expert travel planning & advisory', page: 'contact', color: 'blue' },
    { icon: Sparkles, title: 'Student Relocation', desc: 'Full relocation support for students', page: 'admissions', color: 'gold' },
  ];

  return (
    <section className="bg-uptreek-off-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="badge-blue mb-3 inline-flex">Our Services</div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-uptreek-navy mb-4">
            Everything You Need,<br />Under One Roof
          </h2>
          <div className="divider-gold mb-4" />
          <p className="text-uptreek-gray max-w-2xl mx-auto">
            From booking flights to securing university admissions and processing visas — Uptreek handles
            every step of your global journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <button
              key={s.title}
              onClick={() => navigate(s.page as Parameters<typeof navigate>[0])}
              className="card-white text-left hover-lift gold-border-hover group"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                  s.color === 'blue'
                    ? 'bg-uptreek-blue/10 group-hover:bg-uptreek-blue/20'
                    : 'bg-uptreek-gold/10 group-hover:bg-uptreek-gold/20'
                } transition-colors`}
              >
                <s.icon
                  size={20}
                  className={s.color === 'blue' ? 'text-uptreek-blue' : 'text-uptreek-gold'}
                />
              </div>
              <h3 className="font-semibold text-uptreek-navy mb-1.5 group-hover:text-uptreek-blue transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-uptreek-gray leading-relaxed">{s.desc}</p>
              <div className="mt-3 text-xs text-uptreek-blue font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight size={11} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Destinations ─── */
function Destinations() {
  const { navigate } = useNavigation();

  const DESTINATIONS = [
    { name: 'Dubai, UAE', tag: 'Most Popular', gradient: 'from-amber-900/90 to-orange-800/80', emoji: '🇦🇪', desc: '5-day packages from ₦650,000' },
    { name: 'London, UK', tag: 'Study & Travel', gradient: 'from-slate-800/90 to-blue-900/80', emoji: '🇬🇧', desc: 'Flights + accommodation bundles' },
    { name: 'Toronto, Canada', tag: 'Study Abroad', gradient: 'from-red-900/90 to-rose-800/80', emoji: '🇨🇦', desc: 'Student visa & admission support' },
    { name: 'Istanbul, Turkey', tag: 'Budget Pick', gradient: 'from-emerald-900/90 to-teal-800/80', emoji: '🇹🇷', desc: '7-day tours from ₦480,000' },
    { name: 'Amsterdam', tag: 'Europe Gateway', gradient: 'from-indigo-900/90 to-purple-800/80', emoji: '🇳🇱', desc: 'Schengen visa assistance' },
    { name: 'New York, USA', tag: 'Business & Study', gradient: 'from-gray-900/90 to-zinc-800/80', emoji: '🇺🇸', desc: 'US visa processing experts' },
  ];

  return (
    <section className="bg-uptreek-navy py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="badge-gold mb-3 inline-flex">Featured Destinations</div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
            Where Will You Go Next?
          </h2>
          <div className="divider-gold mb-4" />
          <p className="text-uptreek-gray-mid max-w-2xl mx-auto">
            Explore top global destinations for travel, study, and new beginnings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DESTINATIONS.map((d) => (
            <button
              key={d.name}
              onClick={() => navigate('tours')}
              className={`relative h-52 rounded-2xl overflow-hidden group bg-gradient-to-br ${d.gradient} hover-lift text-left w-full`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="badge-gold text-xs py-0.5">{d.tag}</span>
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="text-3xl mb-1">{d.emoji}</div>
                <h3 className="text-xl font-bold text-white">{d.name}</h3>
                <p className="text-sm text-white/70 mt-0.5">{d.desc}</p>
                <div className="mt-2 text-xs text-uptreek-gold font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  Explore packages <ArrowRight size={11} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Universities ─── */
function Universities() {
  const { navigate } = useNavigation();

  const UNIS = [
    { name: 'University of Manchester', country: 'UK', flag: '🇬🇧', programs: 'Engineering, Business, Medicine', ranking: 'Top 30 Global' },
    { name: 'University of Toronto', country: 'Canada', flag: '🇨🇦', programs: 'Computer Science, Law, Arts', ranking: 'Top 25 Global' },
    { name: 'TU Munich', country: 'Germany', flag: '🇩🇪', programs: 'Engineering, Technology, Sciences', ranking: 'Top 50 Global' },
    { name: 'University College Dublin', country: 'Ireland', flag: '🇮🇪', programs: 'Business, Health, Computing', ranking: 'Top 200 Global' },
    { name: 'University of Melbourne', country: 'Australia', flag: '🇦🇺', programs: 'Medicine, Law, Engineering', ranking: 'Top 35 Global' },
    { name: 'Delft University', country: 'Netherlands', flag: '🇳🇱', programs: 'Engineering, Architecture, Design', ranking: 'Top 60 Global' },
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="badge-blue mb-3 inline-flex">Partner Universities</div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-uptreek-navy mb-4">
            50+ Partner Institutions
          </h2>
          <div className="divider-gold mb-4" />
          <p className="text-uptreek-gray max-w-2xl mx-auto">
            We have direct partnerships with top-ranked universities across 7 countries to fast-track your admission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {UNIS.map((u) => (
            <div key={u.name} className="card-white hover-lift gold-border-hover">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{u.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-uptreek-navy text-sm leading-tight">{u.name}</h3>
                    <span className="badge-gold text-xs py-0.5 shrink-0">{u.country}</span>
                  </div>
                  <p className="text-xs text-uptreek-gray mb-1.5">{u.programs}</p>
                  <div className="flex items-center gap-1">
                    <Star size={11} className="text-uptreek-gold fill-uptreek-gold" />
                    <span className="text-xs text-uptreek-gray-dark font-medium">{u.ranking}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={() => navigate('admissions')} className="btn-primary">
            View All Partner Universities <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Packages ─── */
function Packages() {
  const { navigate } = useNavigation();

  const PACKAGES = [
    {
      name: 'Dubai Explorer',
      duration: '5 Days / 4 Nights',
      price: '₦650,000',
      tag: 'Most Popular',
      includes: ['Return Flights', '4-Star Hotel', 'Burj Khalifa Visit', 'Desert Safari', 'City Tour', 'Airport Transfers'],
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      name: 'Turkey Discovery',
      duration: '7 Days / 6 Nights',
      price: '₦480,000',
      tag: 'Best Value',
      includes: ['Return Flights', '3-Star Hotel', 'Istanbul Tour', 'Bosphorus Cruise', 'Cappadocia Day Trip', 'Guided Tours'],
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      name: 'UK Premium Tour',
      duration: '10 Days / 9 Nights',
      price: '₦1,200,000',
      tag: 'Premium',
      includes: ['Return Flights', '4-Star Hotel', 'London Tour', 'Scotland Day Trip', 'Stonehenge Visit', 'Visa Assistance'],
      gradient: 'from-blue-500 to-indigo-600',
    },
  ];

  return (
    <section className="bg-uptreek-navy-light py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="badge-gold mb-3 inline-flex">Travel Packages</div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
            Curated Holiday Packages
          </h2>
          <div className="divider-gold mb-4" />
          <p className="text-uptreek-gray-mid max-w-2xl mx-auto">
            All-inclusive packages with flights, accommodation, and guided experiences. No hidden costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PACKAGES.map((pkg) => (
            <div key={pkg.name} className="card-dark hover-lift flex flex-col">
              <div className={`h-2 -mx-6 -mt-6 mb-6 rounded-t-2xl bg-gradient-to-r ${pkg.gradient}`} />
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                <span className="badge-gold text-xs">{pkg.tag}</span>
              </div>
              <p className="text-uptreek-gray-mid text-sm mb-4">{pkg.duration}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle size={14} className="text-uptreek-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-uptreek-gray-mid">From</div>
                  <div className="text-2xl font-bold text-uptreek-gold">{pkg.price}</div>
                  <div className="text-xs text-uptreek-gray-mid">per person</div>
                </div>
                <button onClick={() => navigate('tours')} className="btn-gold text-sm py-2.5 px-5">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={() => navigate('tours')} className="btn-outline">
            View All Packages <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const { navigate } = useNavigation();

  const STEPS = [
    {
      step: '01',
      title: 'Book a Free Consultation',
      desc: 'Tell us your goals — travel, study, or visa — and our advisors will create a tailored plan for you.',
    },
    {
      step: '02',
      title: 'Submit Your Documents',
      desc: 'Upload or submit your documents through our secure portal. Our team reviews and prepares everything.',
    },
    {
      step: '03',
      title: 'We Handle the Rest',
      desc: 'From applications to approvals, we keep you informed at every stage and celebrate your success.',
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="badge-blue mb-3 inline-flex">How It Works</div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-uptreek-navy mb-4">
            Simple. Fast. Reliable.
          </h2>
          <div className="divider-gold mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative text-center">
              {i < 2 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-gradient-to-r from-uptreek-gold/40 to-uptreek-gold/10" />
              )}
              <div className="w-16 h-16 rounded-2xl bg-uptreek-navy flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-uptreek-gold font-heading">{s.step}</span>
              </div>
              <h3 className="text-lg font-bold text-uptreek-navy mb-2">{s.title}</h3>
              <p className="text-uptreek-gray text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={() => navigate('contact')} className="btn-primary">
            Start Today — It's Free <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const REVIEWS = [
    {
      name: 'Amara Okafor',
      role: 'MSc Student, University of Manchester',
      flag: '🇬🇧',
      text: 'Uptreek made my UK dream a reality. From application to visa approval, they guided me at every step. Got my student visa in just 3 weeks!',
      stars: 5,
    },
    {
      name: 'Chukwudi Eze',
      role: 'Tourist, Dubai Trip',
      flag: '🇦🇪',
      text: 'Amazing experience! The Dubai package was seamless — flights, hotel, tours, everything was perfect. Very professional team. Will book again!',
      stars: 5,
    },
    {
      name: 'Fatima Bello',
      role: 'MBA Student, University of Toronto',
      flag: '🇨🇦',
      text: 'Got my Canada study visa approved on the first application. The Uptreek team is incredibly knowledgeable and supportive. Highly recommended!',
      stars: 5,
    },
    {
      name: 'Emmanuel Adeyemi',
      role: 'Business Traveller',
      flag: '🇺🇸',
      text: 'Needed a US business visa urgently and Uptreek delivered. Super efficient service, very transparent about requirements. Worth every naira.',
      stars: 5,
    },
    {
      name: 'Kemi Williams',
      role: 'BSc Student, Dublin City University',
      flag: '🇮🇪',
      text: 'From choosing my course to landing in Ireland, Uptreek was with me. Even helped with my proof of funds. Exceptional service!',
      stars: 5,
    },
    {
      name: 'Tunde Lawson',
      role: 'Traveller, Turkey & Europe',
      flag: '🇹🇷',
      text: 'The Turkey package exceeded all my expectations. Hotels were great, guides were excellent, and the price was very competitive. Loved it!',
      stars: 5,
    },
  ];

  return (
    <section className="bg-uptreek-navy py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="badge-gold mb-3 inline-flex">Client Testimonials</div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
            Real Stories, Real Success
          </h2>
          <div className="divider-gold mb-4" />
          <p className="text-uptreek-gray-mid max-w-2xl mx-auto">
            Join thousands of Nigerians who achieved their global dreams with Uptreek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r) => (
            <div key={r.name} className="card-dark hover-lift">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} size={14} className="text-uptreek-gold fill-uptreek-gold" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-5 italic">"{r.text}"</p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="text-2xl">{r.flag}</div>
                <div>
                  <div className="text-sm font-semibold text-white">{r.name}</div>
                  <div className="text-xs text-uptreek-gray-mid">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const FAQS = [
    {
      q: 'How long does visa processing take with Uptreek?',
      a: 'Processing times vary by country and visa type. UK student visas typically take 3–6 weeks, Canadian visas 4–8 weeks, and Schengen visas 15–30 days. We advise starting the process at least 3 months before your intended travel date.',
    },
    {
      q: 'Do you guarantee university admission?',
      a: 'While we cannot guarantee admission (as final decisions rest with universities), our expert advisors significantly improve your chances by matching you with programs you qualify for, preparing a strong application, and guiding you through every requirement.',
    },
    {
      q: 'What documents are needed for a study visa?',
      a: 'Common requirements include: valid international passport, offer letter from the institution, proof of funds (bank statements or sponsor letter), academic transcripts, English language test results (IELTS/TOEFL), and a personal statement. We help you compile everything.',
    },
    {
      q: 'How does your Proof of Funds service work?',
      a: 'We assess your financial situation, advise on the required amount for your visa type, help you organize bank statements, and can connect you with financial sponsors where applicable. We also prepare accompanying letters that meet embassy requirements.',
    },
    {
      q: 'Can I apply for multiple services at once?',
      a: 'Absolutely! Many clients combine services — for example, university admission + student visa + proof of funds. We offer bundled pricing for combined services and a single dedicated advisor manages your full journey.',
    },
    {
      q: 'Is Uptreek a registered and certified agency?',
      a: 'Yes. Uptreek is fully registered and AITA (Association of International Travel Agents) approved. We operate legally within Nigeria and adhere to all industry standards and regulations.',
    },
  ];

  return (
    <section className="bg-uptreek-off-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="badge-blue mb-3 inline-flex">FAQ</div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-uptreek-navy mb-4">
            Frequently Asked Questions
          </h2>
          <div className="divider-gold mb-4" />
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="card-white p-0 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-uptreek-off-white transition-colors"
              >
                <span className="font-semibold text-uptreek-navy text-sm md:text-base">{faq.q}</span>
                {open === i ? (
                  <ChevronUp size={18} className="text-uptreek-gold shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-uptreek-gray shrink-0" />
                )}
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-uptreek-gray leading-relaxed border-t border-uptreek-gray-light pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ─── */
function CTABanner() {
  const { navigate } = useNavigation();

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-uptreek-blue-muted via-uptreek-navy to-uptreek-dark" />
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-uptreek-gold/5 blur-3xl" />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="badge-gold mb-5 inline-flex">
          <Sparkles size={12} />
          Start Your Journey Today
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-5">
          Ready to Go Global?
        </h2>
        <p className="text-uptreek-gray-mid text-lg mb-8 max-w-2xl mx-auto">
          Book a free 30-minute consultation with one of our experts. No obligations — just expert
          guidance tailored to your goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('contact')} className="btn-gold text-base py-3.5 px-8">
            Book Free Consultation <ArrowRight size={18} />
          </button>
          <button onClick={() => navigate('portal')} className="btn-ghost text-base py-3.5 px-8">
            Track Your Application
          </button>
        </div>
        <p className="mt-6 text-sm text-uptreek-gray-mid">
          <TrendingUp className="inline mr-1 text-uptreek-gold" size={13} />
          Over 500 students placed abroad this year alone
        </p>
      </div>
    </section>
  );
}

/* ─── Main Export ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Destinations />
      <Universities />
      <Packages />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
