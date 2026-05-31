import { useState } from 'react';
import { MapPin, Clock, Star, Users, CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

type Category = 'all' | 'popular' | 'africa' | 'europe' | 'asia' | 'americas';

const TOURS = [
  {
    id: 1,
    name: 'Dubai Luxury Experience',
    location: 'Dubai, UAE',
    emoji: '🇦🇪',
    duration: '5 Days / 4 Nights',
    price: '₦650,000',
    originalPrice: '₦780,000',
    rating: 4.9,
    reviews: 124,
    category: 'popular' as Category,
    tag: 'Best Seller',
    tagColor: 'gold',
    includes: ['Return Flights', '4-Star Hotel', 'Burj Khalifa', 'Desert Safari', 'City Tour', 'Airport Transfers'],
    gradient: 'from-amber-800 to-orange-900',
    highlights: 'Burj Khalifa · Palm Jumeirah · Dubai Mall · Desert Safari',
  },
  {
    id: 2,
    name: 'Istanbul & Turkey Discovery',
    location: 'Istanbul, Turkey',
    emoji: '🇹🇷',
    duration: '7 Days / 6 Nights',
    price: '₦480,000',
    originalPrice: '₦550,000',
    rating: 4.8,
    reviews: 89,
    category: 'popular' as Category,
    tag: 'Best Value',
    tagColor: 'blue',
    includes: ['Return Flights', '3-Star Hotel', 'Hagia Sophia', 'Bosphorus Cruise', 'Cappadocia', 'Guide'],
    gradient: 'from-emerald-800 to-teal-900',
    highlights: 'Hagia Sophia · Bosphorus · Cappadocia · Grand Bazaar',
  },
  {
    id: 3,
    name: 'London & Scotland Premium',
    location: 'United Kingdom',
    emoji: '🇬🇧',
    duration: '10 Days / 9 Nights',
    price: '₦1,200,000',
    originalPrice: '₦1,400,000',
    rating: 4.9,
    reviews: 67,
    category: 'europe' as Category,
    tag: 'Premium',
    tagColor: 'gold',
    includes: ['Return Flights', '4-Star Hotels', 'London Tour', 'Scotland Day Trip', 'Stonehenge', 'Oxford Visit'],
    gradient: 'from-slate-700 to-blue-900',
    highlights: 'Big Ben · Stonehenge · Edinburgh · Oxford · Cotswolds',
  },
  {
    id: 4,
    name: 'European Explorer',
    location: 'Paris · Amsterdam · Rome',
    emoji: '🇪🇺',
    duration: '12 Days / 11 Nights',
    price: '₦1,850,000',
    originalPrice: '₦2,100,000',
    rating: 4.8,
    reviews: 45,
    category: 'europe' as Category,
    tag: 'Multi-Country',
    tagColor: 'blue',
    includes: ['Return Flights', '4-Star Hotels', 'Schengen Visa', 'Eiffel Tower', 'Colosseum', 'Canal Tour'],
    gradient: 'from-purple-800 to-indigo-900',
    highlights: 'Eiffel Tower · Colosseum · Amsterdam Canals · Vatican',
  },
  {
    id: 5,
    name: 'Toronto & Niagara Falls',
    location: 'Canada',
    emoji: '🇨🇦',
    duration: '8 Days / 7 Nights',
    price: '₦980,000',
    originalPrice: '₦1,100,000',
    rating: 4.7,
    reviews: 38,
    category: 'americas' as Category,
    tag: 'Adventure',
    tagColor: 'blue',
    includes: ['Return Flights', '3-Star Hotel', 'Canada Visa Assistance', 'Niagara Falls', 'CN Tower', 'City Tour'],
    gradient: 'from-red-800 to-rose-900',
    highlights: 'Niagara Falls · CN Tower · Toronto Island · Distillery District',
  },
  {
    id: 6,
    name: 'South Africa Safari',
    location: 'Cape Town & Kruger',
    emoji: '🇿🇦',
    duration: '9 Days / 8 Nights',
    price: '₦750,000',
    originalPrice: '₦880,000',
    rating: 4.9,
    reviews: 52,
    category: 'africa' as Category,
    tag: 'Safari',
    tagColor: 'gold',
    includes: ['Return Flights', 'Safari Lodge', 'Big 5 Safari', 'Cape Town Tour', 'Table Mountain', 'Wine Tour'],
    gradient: 'from-yellow-800 to-amber-900',
    highlights: 'Big Five Safari · Table Mountain · Cape Winelands · V&A Waterfront',
  },
  {
    id: 7,
    name: 'New York City Experience',
    location: 'New York, USA',
    emoji: '🇺🇸',
    duration: '7 Days / 6 Nights',
    price: '₦1,350,000',
    originalPrice: '₦1,550,000',
    rating: 4.8,
    reviews: 33,
    category: 'americas' as Category,
    tag: 'City Break',
    tagColor: 'blue',
    includes: ['Return Flights', '4-Star Hotel', 'US Visa Assistance', 'Times Square', 'Statue of Liberty', 'Broadway Show'],
    gradient: 'from-gray-700 to-zinc-900',
    highlights: 'Statue of Liberty · Times Square · Central Park · Brooklyn Bridge',
  },
  {
    id: 8,
    name: 'Rwanda Gorilla Trekking',
    location: 'Kigali, Rwanda',
    emoji: '🇷🇼',
    duration: '5 Days / 4 Nights',
    price: '₦550,000',
    originalPrice: '₦640,000',
    rating: 5.0,
    reviews: 21,
    category: 'africa' as Category,
    tag: 'Eco-Tourism',
    tagColor: 'gold',
    includes: ['Return Flights', 'Eco Lodge', 'Gorilla Permit', 'Nyungwe Forest', 'Lake Kivu', 'Cultural Tour'],
    gradient: 'from-green-800 to-emerald-900',
    highlights: 'Mountain Gorillas · Nyungwe Forest · Genocide Memorial · Lake Kivu',
  },
];

const CATEGORIES = [
  { id: 'all' as Category, label: 'All Tours' },
  { id: 'popular' as Category, label: '🔥 Popular' },
  { id: 'africa' as Category, label: '🌍 Africa' },
  { id: 'europe' as Category, label: '🇪🇺 Europe' },
  { id: 'asia' as Category, label: '🌏 Asia & Middle East' },
  { id: 'americas' as Category, label: '🌎 Americas' },
];

export default function Tours() {
  const { navigate } = useNavigation();
  const [category, setCategory] = useState<Category>('all');
  const [selectedTour, setSelectedTour] = useState<typeof TOURS[0] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [bookForm, setBookForm] = useState({ name: '', email: '', phone: '', date: '', travelers: '2', notes: '' });

  const filtered = category === 'all' ? TOURS : TOURS.filter((t) => t.category === category);

  const set = (k: keyof typeof bookForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setBookForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-uptreek-navy">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-uptreek-dark via-uptreek-navy to-uptreek-navy-mid" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-uptreek-gold/6 blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="badge-gold mb-5 inline-flex">
            <MapPin size={12} />
            Travel Tours & Packages
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-4">
            Explore the World<br />
            <span className="text-uptreek-gold">With Uptreek</span>
          </h1>
          <p className="text-uptreek-gray-mid text-lg max-w-2xl mx-auto">
            Carefully curated all-inclusive tour packages to Africa, Europe, the Middle East, and the Americas.
            Unforgettable experiences at unbeatable prices.
          </p>
        </div>
      </section>

      {/* Tour Listings */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  category === c.id
                    ? 'bg-uptreek-gold text-uptreek-navy shadow-gold'
                    : 'glass text-uptreek-gray-mid hover:text-white border border-white/10'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((tour) => (
              <div key={tour.id} className="card-dark flex flex-col hover-lift">
                {/* Destination visual */}
                <div className={`h-36 -mx-6 -mt-6 mb-4 rounded-t-2xl bg-gradient-to-br ${tour.gradient} flex items-end p-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-30">{tour.emoji}</span>
                  </div>
                  <div className="relative">
                    <span className={`badge-${tour.tagColor === 'gold' ? 'gold' : 'blue'} text-xs`}>
                      {tour.tag}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-white text-base mb-0.5">{tour.name}</h3>
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin size={11} className="text-uptreek-gold" />
                    <span className="text-xs text-uptreek-gray-mid">{tour.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-xs text-uptreek-gray-mid">
                    <Clock size={11} />
                    {tour.duration}
                    <span className="text-uptreek-gray-dark">·</span>
                    <Star size={11} className="text-uptreek-gold fill-uptreek-gold" />
                    {tour.rating} ({tour.reviews})
                  </div>

                  <p className="text-xs text-uptreek-gray-mid mb-3 leading-relaxed">{tour.highlights}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {tour.includes.slice(0, 3).map((inc) => (
                      <span key={inc} className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg text-uptreek-gray-mid">
                        {inc}
                      </span>
                    ))}
                    {tour.includes.length > 3 && (
                      <span className="text-xs text-uptreek-gold">+{tour.includes.length - 3} more</span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
                    <div>
                      <div className="text-xs text-uptreek-gray-mid line-through">{tour.originalPrice}</div>
                      <div className="text-xl font-bold text-uptreek-gold">{tour.price}</div>
                      <div className="text-xs text-uptreek-gray-mid">per person</div>
                    </div>
                    <button
                      onClick={() => setSelectedTour(tour)}
                      className="btn-gold text-xs py-2 px-4"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedTour && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-dark rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar">
            {submitted ? (
              <div className="p-8 text-center">
                <CheckCircle size={48} className="text-uptreek-success mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Booking Request Sent!</h3>
                <p className="text-uptreek-gray-mid mb-5">
                  Our team will confirm your <strong className="text-uptreek-gold">{selectedTour.name}</strong> booking within 24 hours.
                </p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => { setSelectedTour(null); setSubmitted(false); }} className="btn-outline">Close</button>
                  <button onClick={() => navigate('portal')} className="btn-gold">Track Booking</button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-bold text-white text-lg">{selectedTour.name}</h3>
                    <p className="text-sm text-uptreek-gray-mid">{selectedTour.duration} · {selectedTour.price}/person</p>
                  </div>
                  <button onClick={() => setSelectedTour(null)} className="text-uptreek-gray-mid hover:text-white text-xl">✕</button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input className="form-input text-sm" placeholder="Your name" value={bookForm.name} onChange={set('name')} required />
                    </div>
                    <div>
                      <label className="form-label">Email *</label>
                      <input type="email" className="form-input text-sm" placeholder="your@email.com" value={bookForm.email} onChange={set('email')} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="form-label">Phone *</label>
                      <input className="form-input text-sm" placeholder="+234..." value={bookForm.phone} onChange={set('phone')} required />
                    </div>
                    <div>
                      <label className="form-label">Travelers</label>
                      <select className="form-input text-sm" value={bookForm.travelers} onChange={set('travelers')}>
                        {['1', '2', '3', '4', '5', '6', '7', '8+'].map((n) => <option key={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Preferred Travel Date</label>
                    <input type="date" className="form-input text-sm" value={bookForm.date} onChange={set('date')} />
                  </div>
                  <div>
                    <label className="form-label">Special Requests</label>
                    <textarea className="form-input text-sm" rows={2} placeholder="Dietary needs, room preferences..." value={bookForm.notes} onChange={set('notes')} />
                  </div>
                  <div className="p-3 bg-uptreek-gold/10 rounded-xl border border-uptreek-gold/20">
                    <div className="flex flex-wrap gap-1">
                      {selectedTour.includes.map((inc) => (
                        <div key={inc} className="flex items-center gap-1 text-xs text-uptreek-gold-light">
                          <CheckCircle size={10} className="text-uptreek-success" />
                          {inc}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="btn-gold w-full justify-center py-3">
                    Confirm Booking Request <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Why Uptreek Tours */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-uptreek-navy text-center mb-10">
            Why Choose Uptreek for Your Tours?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: CheckCircle, title: 'All-Inclusive', desc: 'Flights, hotels, and tours in one seamless package' },
              { icon: Users, title: 'Expert Guides', desc: 'Knowledgeable local guides in every destination' },
              { icon: Star, title: 'Verified Hotels', desc: 'Carefully vetted 3 to 5-star accommodations' },
              { icon: Calendar, title: 'Flexible Dates', desc: 'Choose your travel dates with easy modifications' },
            ].map((b) => (
              <div key={b.title} className="card-white text-center hover-lift">
                <div className="w-12 h-12 rounded-xl bg-uptreek-gold/10 flex items-center justify-center mx-auto mb-3">
                  <b.icon size={22} className="text-uptreek-gold" />
                </div>
                <h3 className="font-semibold text-uptreek-navy mb-2">{b.title}</h3>
                <p className="text-sm text-uptreek-gray">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Travel */}
      <section className="bg-uptreek-navy py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge-gold mb-4 inline-flex">Corporate Travel</div>
          <h2 className="text-3xl font-bold font-heading text-white mb-4">Need Corporate Travel Solutions?</h2>
          <p className="text-uptreek-gray-mid mb-6 max-w-xl mx-auto">
            We offer dedicated corporate travel management including flight bookings, hotel reservations,
            visa processing, and group travel coordination for companies of all sizes.
          </p>
          <button onClick={() => navigate('contact')} className="btn-gold">
            Request Corporate Quote <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
