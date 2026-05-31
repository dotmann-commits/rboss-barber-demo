import { useState } from 'react';
import { Plane, Users, Briefcase, Globe, CheckCircle, ArrowRight, Clock, Shield, Star, Phone } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

type FlightType = 'domestic' | 'international' | 'multicity' | 'business' | 'group';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  departure: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  travelers: string;
  budget: string;
  notes: string;
  flightClass: string;
  tripType: string;
}

const FLIGHT_TYPES = [
  { id: 'domestic' as FlightType, label: 'Domestic', icon: Plane, desc: 'Flights within Nigeria' },
  { id: 'international' as FlightType, label: 'International', icon: Globe, desc: 'Worldwide destinations' },
  { id: 'multicity' as FlightType, label: 'Multi-City', icon: ArrowRight, desc: 'Multiple stop trips' },
  { id: 'business' as FlightType, label: 'Business Class', icon: Briefcase, desc: 'Premium travel' },
  { id: 'group' as FlightType, label: 'Group Travel', icon: Users, desc: '10+ passengers' },
];

const DOMESTIC = ['Lagos (LOS)', 'Abuja (ABV)', 'Port Harcourt (PHC)', 'Kano (KAN)', 'Enugu (ENU)', 'Calabar (CBQ)', 'Benin (BNI)', 'Owerri (QOW)'];

const INTL = ['London (LHR)', 'Dubai (DXB)', 'Toronto (YYZ)', 'New York (JFK)', 'Houston (IAH)', 'Amsterdam (AMS)', 'Istanbul (IST)', 'Johannesburg (JNB)', 'Accra (ACC)', 'Doha (DOH)'];

const AIRLINES = ['Air Peace', 'Ethiopian Airlines', 'Kenya Airways', 'Emirates', 'British Airways', 'Air France', 'Lufthansa', 'Turkish Airlines', 'Qatar Airways', 'United Airlines'];

function FlightTypeCard({ type, active, onClick }: { type: typeof FLIGHT_TYPES[0]; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 text-center ${
        active
          ? 'border-uptreek-gold bg-uptreek-gold/10 text-uptreek-gold'
          : 'border-white/10 bg-white/5 text-uptreek-gray-mid hover:border-white/20 hover:text-white'
      }`}
    >
      <type.icon size={20} />
      <span className="text-sm font-medium">{type.label}</span>
      <span className="text-xs opacity-70 hidden md:block">{type.desc}</span>
    </button>
  );
}

export default function Flights() {
  const { navigate } = useNavigation();
  const [flightType, setFlightType] = useState<FlightType>('international');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', phone: '', departure: '', destination: '',
    travelDate: '', returnDate: '', travelers: '1', budget: '', notes: '',
    flightClass: 'economy', tripType: 'roundtrip',
  });

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const BENEFITS = [
    { icon: Shield, title: 'Best Fare Guarantee', desc: 'We search all airlines to find you the lowest price' },
    { icon: Clock, title: 'Instant Confirmation', desc: 'Get booking confirmation within 2 hours' },
    { icon: Star, title: 'Expert Support', desc: '24/7 travel support from booking to landing' },
    { icon: CheckCircle, title: 'Flexible Booking', desc: 'Easy rescheduling and cancellation policies' },
  ];

  return (
    <div className="min-h-screen bg-uptreek-navy">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-uptreek-dark via-uptreek-navy to-uptreek-navy-mid" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-uptreek-blue/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="badge-gold mb-5 inline-flex">
            <Plane size={12} />
            Flight Booking
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-4">
            Fly Anywhere,<br />
            <span className="text-uptreek-gold">Any Time</span>
          </h1>
          <p className="text-uptreek-gray-mid text-lg max-w-2xl mx-auto">
            Domestic, international, business class, and group travel — we handle all your flight bookings
            at the best available rates.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Flight type selector */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {FLIGHT_TYPES.map((t) => (
              <FlightTypeCard key={t.id} type={t} active={flightType === t.id} onClick={() => setFlightType(t.id)} />
            ))}
          </div>

          {submitted ? (
            <div className="card-dark text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-uptreek-success/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-uptreek-success" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Flight Request Received!</h2>
              <p className="text-uptreek-gray-mid mb-6 max-w-md mx-auto">
                Our team will search for the best available options and contact you within 2 hours. Check your email for confirmation.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setSubmitted(false)} className="btn-outline">Submit Another</button>
                <button onClick={() => navigate('portal')} className="btn-gold">Track Request</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-dark space-y-5">
              <h2 className="text-xl font-bold text-white mb-2">
                {FLIGHT_TYPES.find((t) => t.id === flightType)?.label} Flight Inquiry
              </h2>

              {/* Trip type & class */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Trip Type</label>
                  <select className="form-input" value={form.tripType} onChange={set('tripType')}>
                    <option value="roundtrip">Round Trip</option>
                    <option value="oneway">One Way</option>
                    <option value="multicity">Multi-City</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Cabin Class</label>
                  <select className="form-input" value={form.flightClass} onChange={set('flightClass')}>
                    <option value="economy">Economy</option>
                    <option value="premium_economy">Premium Economy</option>
                    <option value="business">Business Class</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>

              {/* Passenger info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="John Okafor" value={form.fullName} onChange={set('fullName')} required />
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input type="email" className="form-input" placeholder="john@email.com" value={form.email} onChange={set('email')} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input className="form-input" placeholder="+234 800 000 0000" value={form.phone} onChange={set('phone')} required />
                </div>
                <div>
                  <label className="form-label">Number of Travelers *</label>
                  <select className="form-input" value={form.travelers} onChange={set('travelers')}>
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Route */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Departure Location *</label>
                  <select className="form-input" value={form.departure} onChange={set('departure')} required>
                    <option value="">Select departure city...</option>
                    <optgroup label="Nigerian Cities">
                      {DOMESTIC.map((c) => <option key={c}>{c}</option>)}
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label className="form-label">Destination *</label>
                  <select className="form-input" value={form.destination} onChange={set('destination')} required>
                    <option value="">Select destination...</option>
                    {flightType === 'domestic' ? (
                      <optgroup label="Nigerian Cities">
                        {DOMESTIC.map((c) => <option key={c}>{c}</option>)}
                      </optgroup>
                    ) : (
                      <>
                        <optgroup label="Nigerian Cities">
                          {DOMESTIC.map((c) => <option key={c}>{c}</option>)}
                        </optgroup>
                        <optgroup label="International">
                          {INTL.map((c) => <option key={c}>{c}</option>)}
                        </optgroup>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Departure Date *</label>
                  <input type="date" className="form-input" value={form.travelDate} onChange={set('travelDate')} required />
                </div>
                {form.tripType !== 'oneway' && (
                  <div>
                    <label className="form-label">Return Date</label>
                    <input type="date" className="form-input" value={form.returnDate} onChange={set('returnDate')} />
                  </div>
                )}
              </div>

              {/* Budget */}
              <div>
                <label className="form-label">Budget per Person (₦)</label>
                <select className="form-input" value={form.budget} onChange={set('budget')}>
                  <option value="">Select budget range...</option>
                  <option>Under ₦200,000</option>
                  <option>₦200,000 – ₦400,000</option>
                  <option>₦400,000 – ₦700,000</option>
                  <option>₦700,000 – ₦1,200,000</option>
                  <option>Above ₦1,200,000</option>
                  <option>No limit — get the best</option>
                </select>
              </div>

              <div>
                <label className="form-label">Additional Notes</label>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Preferred airline, special requests, connecting flights..."
                  value={form.notes}
                  onChange={set('notes')}
                />
              </div>

              <button type="submit" className="btn-gold w-full justify-center text-base py-3.5">
                Submit Flight Request <ArrowRight size={18} />
              </button>
              <p className="text-xs text-center text-uptreek-gray-mid">
                Our team will respond within 2 hours during business hours. No payment required at this stage.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Why Uptreek Flights */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-uptreek-navy text-center mb-10">
            Why Book Flights with Uptreek?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {BENEFITS.map((b) => (
              <div key={b.title} className="card-white text-center">
                <div className="w-12 h-12 rounded-xl bg-uptreek-blue/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon size={22} className="text-uptreek-blue" />
                </div>
                <h3 className="font-semibold text-uptreek-navy mb-2">{b.title}</h3>
                <p className="text-sm text-uptreek-gray">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airlines */}
      <section className="bg-uptreek-navy py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-white mb-8">Airlines We Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {AIRLINES.map((a) => (
              <span key={a} className="px-4 py-2 glass rounded-xl text-sm text-uptreek-gray-mid hover:text-white border border-white/10 transition-colors">
                {a}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+2348000000000" className="btn-gold justify-center">
              <Phone size={16} /> Call for Urgent Booking
            </a>
            <button onClick={() => navigate('contact')} className="btn-ghost justify-center">
              Request a Callback
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
