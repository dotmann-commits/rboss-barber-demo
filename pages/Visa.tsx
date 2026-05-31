import { useState } from 'react';
import { FileText, CheckCircle, ArrowRight, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

type VisaType = 'student' | 'tourist' | 'work' | 'business' | 'family';

const VISA_TYPES = [
  {
    id: 'student' as VisaType,
    label: 'Student Visa',
    emoji: '🎓',
    desc: 'For students admitted to recognized educational institutions',
    requirements: ['Valid Passport', 'University Offer Letter', 'Proof of Funds (min. required amount)', 'IELTS/TOEFL Results', 'Academic Transcripts', 'Passport Photos', 'Health Insurance', 'Statement of Purpose'],
    successRate: '97%',
    processingTime: '3–8 weeks',
    countries: ['UK', 'Canada', 'USA', 'Ireland', 'Germany', 'Australia', 'Netherlands'],
  },
  {
    id: 'tourist' as VisaType,
    label: 'Tourist Visa',
    emoji: '🌍',
    desc: 'Short-stay visas for leisure, sightseeing, and family visits',
    requirements: ['Valid Passport (6+ months)', 'Return Flight Ticket', 'Hotel Reservation', 'Bank Statements', 'Travel Insurance', 'Passport Photos', 'Employment Letter', 'Visa Application Form'],
    successRate: '94%',
    processingTime: '2–4 weeks',
    countries: ['UAE (Dubai)', 'UK', 'USA', 'Schengen', 'Canada', 'Turkey', 'Malaysia'],
  },
  {
    id: 'work' as VisaType,
    label: 'Work Visa',
    emoji: '💼',
    desc: 'For professionals with job offers in international companies',
    requirements: ['Valid Passport', 'Job Offer Letter', 'Professional Qualifications', 'Employment History', 'Skill Assessment', 'Police Clearance Certificate', 'Medical Certificate', 'Language Proof'],
    successRate: '89%',
    processingTime: '6–16 weeks',
    countries: ['UK', 'Canada', 'Germany', 'UAE', 'Australia', 'USA', 'Ireland'],
  },
  {
    id: 'business' as VisaType,
    label: 'Business Visa',
    emoji: '🤝',
    desc: 'For corporate meetings, conferences, and business activities',
    requirements: ['Valid Passport', 'Company Invitation Letter', 'Business Registration Documents', 'Bank Statements', 'Travel Itinerary', 'Employment Letter', 'Return Ticket', 'Hotel Confirmation'],
    successRate: '95%',
    processingTime: '2–6 weeks',
    countries: ['UK', 'UAE', 'USA', 'Schengen', 'Canada', 'China', 'Singapore'],
  },
  {
    id: 'family' as VisaType,
    label: 'Family/Dependent Visa',
    emoji: '👨‍👩‍👧',
    desc: 'Join a family member who is resident or studying abroad',
    requirements: ['Sponsor\'s Residence Status', 'Proof of Relationship (Marriage/Birth Cert)', 'Sponsor\'s Proof of Income', 'Accommodation Evidence', 'Sponsor\'s Passport Copy', 'Health Insurance', 'Valid Passport', 'Photos'],
    successRate: '92%',
    processingTime: '4–12 weeks',
    countries: ['UK', 'Canada', 'USA', 'Germany', 'Australia', 'Ireland', 'Netherlands'],
  },
];

const WORKFLOW_STAGES = [
  { id: 1, label: 'Inquiry Received', desc: 'We acknowledge your inquiry and assign a visa specialist' },
  { id: 2, label: 'Assessment', desc: 'We evaluate your documents and eligibility' },
  { id: 3, label: 'Document Prep', desc: 'We prepare and organize all required documents' },
  { id: 4, label: 'Application Filed', desc: 'Application submitted to the embassy/consulate' },
  { id: 5, label: 'Biometrics', desc: 'Attend biometrics appointment (we schedule this)' },
  { id: 6, label: 'Decision', desc: 'Visa approved — we notify you immediately' },
];

const FAQ = [
  { q: 'What is your visa approval rate?', a: 'We maintain an overall approval rate above 94% across all visa types. For student visas to the UK and Canada, our rate exceeds 97%. This is achieved through meticulous document preparation and expert advisory.' },
  { q: 'What if my visa is rejected?', a: 'In the rare case of rejection, we analyze the refusal reasons and work with you on a reapplication strategy. We offer free reassessment and discounted reapplication fees for our clients.' },
  { q: 'Do I need to visit the embassy myself?', a: 'Most embassies require you to attend a biometrics or interview appointment in person. However, we schedule this for you, prepare you thoroughly, and often accompany you for guidance.' },
  { q: 'Can you help if I have a previous visa rejection?', a: 'Yes. A previous rejection is not necessarily disqualifying. We assess the reasons for the prior refusal and build a stronger case for your reapplication.' },
];

export default function Visa() {
  const { navigate } = useNavigation();
  const [selectedVisa, setSelectedVisa] = useState<VisaType>('student');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', country: '', date: '', notes: '' });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const selected = VISA_TYPES.find((v) => v.id === selectedVisa)!;

  return (
    <div className="min-h-screen bg-uptreek-navy">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-uptreek-dark via-uptreek-navy to-uptreek-navy-mid" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-uptreek-blue/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="badge-gold mb-5 inline-flex">
            <FileText size={12} />
            Visa Processing
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-4">
            Visa Approved<br />
            <span className="text-uptreek-gold">First Time, Every Time</span>
          </h1>
          <p className="text-uptreek-gray-mid text-lg max-w-2xl mx-auto mb-8">
            Expert visa processing for student, tourist, work, business, and family visas.
            Over 94% approval rate. Trusted by 1,000+ clients.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: '94%+', sub: 'Approval Rate' },
              { label: '1,000+', sub: 'Visas Processed' },
              { label: '15+', sub: 'Countries' },
              { label: '24hr', sub: 'Response Time' },
            ].map((s) => (
              <div key={s.label} className="glass px-5 py-3 rounded-xl text-center min-w-[90px]">
                <div className="text-xl font-bold text-uptreek-gold">{s.label}</div>
                <div className="text-xs text-uptreek-gray-mid">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Types */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-uptreek-navy text-center mb-10">
            Select Your Visa Type
          </h2>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {VISA_TYPES.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVisa(v.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  selectedVisa === v.id
                    ? 'bg-uptreek-navy border-uptreek-navy text-white'
                    : 'border-uptreek-gray-light text-uptreek-gray-dark hover:border-uptreek-navy'
                }`}
              >
                <span>{v.emoji}</span>
                {v.label}
              </button>
            ))}
          </div>

          {/* Selected visa details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="card-white border-2 border-uptreek-navy mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{selected.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold text-uptreek-navy">{selected.label}</h3>
                    <p className="text-sm text-uptreek-gray">{selected.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5 p-3 bg-uptreek-off-white rounded-xl">
                  <div className="text-center">
                    <div className="text-lg font-bold text-uptreek-gold">{selected.successRate}</div>
                    <div className="text-xs text-uptreek-gray">Success Rate</div>
                  </div>
                  <div className="text-center border-x border-uptreek-gray-light">
                    <div className="text-lg font-bold text-uptreek-navy">{selected.processingTime}</div>
                    <div className="text-xs text-uptreek-gray">Processing Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-uptreek-navy">{selected.countries.length}</div>
                    <div className="text-xs text-uptreek-gray">Countries</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selected.countries.map((c) => (
                    <span key={c} className="badge-blue text-xs">{c}</span>
                  ))}
                </div>
              </div>

              <h4 className="font-semibold text-uptreek-navy mb-3">Required Documents</h4>
              <ul className="space-y-2">
                {selected.requirements.map((r) => (
                  <li key={r} className="flex items-center gap-2.5 text-sm text-uptreek-gray-dark">
                    <CheckCircle size={15} className="text-uptreek-success shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Workflow */}
            <div>
              <h4 className="font-semibold text-uptreek-navy mb-5">Visa Application Workflow</h4>
              <div className="space-y-3">
                {WORKFLOW_STAGES.map((s, i) => (
                  <div key={s.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-uptreek-navy flex items-center justify-center text-xs font-bold text-uptreek-gold shrink-0">
                        {s.id}
                      </div>
                      {i < WORKFLOW_STAGES.length - 1 && (
                        <div className="w-px flex-1 bg-uptreek-gray-light mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="font-medium text-uptreek-navy text-sm">{s.label}</div>
                      <div className="text-xs text-uptreek-gray mt-0.5">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-uptreek-navy py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-heading text-white mb-3">Start Visa Application</h2>
            <p className="text-uptreek-gray-mid">Submit your details and a visa specialist will contact you within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="card-dark text-center py-12">
              <div className="w-14 h-14 rounded-2xl bg-uptreek-success/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-uptreek-success" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Application Submitted!</h3>
              <p className="text-uptreek-gray-mid mb-5 max-w-sm mx-auto">
                A visa specialist will review your case and contact you within 24 hours.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setSubmitted(false)} className="btn-outline">New Application</button>
                <button onClick={() => navigate('portal')} className="btn-gold">Track Status</button>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="card-dark space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="Your full name" value={form.fullName} onChange={set('fullName')} required />
                </div>
                <div>
                  <label className="form-label">Email *</label>
                  <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={set('email')} required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input className="form-input" placeholder="+234 800 000 0000" value={form.phone} onChange={set('phone')} required />
                </div>
                <div>
                  <label className="form-label">Visa Type</label>
                  <select className="form-input" value={selectedVisa} onChange={(e) => setSelectedVisa(e.target.value as VisaType)}>
                    {VISA_TYPES.map((v) => <option key={v.id} value={v.id}>{v.emoji} {v.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Destination Country *</label>
                  <select className="form-input" value={form.country} onChange={set('country')} required>
                    <option value="">Select country...</option>
                    {selected.countries.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Intended Travel Date</label>
                  <input type="date" className="form-input" value={form.date} onChange={set('date')} />
                </div>
              </div>
              <div>
                <label className="form-label">Additional Information</label>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Previous visa history, rejections, special circumstances..."
                  value={form.notes}
                  onChange={set('notes')}
                />
              </div>
              <div className="flex items-start gap-2 p-3 bg-uptreek-gold/10 rounded-xl border border-uptreek-gold/20">
                <AlertCircle size={15} className="text-uptreek-gold mt-0.5 shrink-0" />
                <p className="text-xs text-uptreek-gold-light">
                  Please disclose any previous visa rejections in the notes. This helps us build the strongest possible case for you.
                </p>
              </div>
              <button type="submit" className="btn-gold w-full justify-center py-3.5">
                Submit Application <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-uptreek-off-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-uptreek-navy text-center mb-10">Visa FAQ</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <div key={i} className="card-white p-0 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-uptreek-navy text-sm">{f.q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-uptreek-gold shrink-0" /> : <ChevronDown size={16} className="text-uptreek-gray shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-uptreek-gray leading-relaxed border-t border-uptreek-gray-light pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
