import { useState } from 'react';
import { DollarSign, CheckCircle, ArrowRight, HelpCircle, ChevronDown, ChevronUp, Shield, FileText, Clock } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

const REQUIREMENTS = [
  { country: 'United Kingdom', flag: '🇬🇧', amount: '£1,334/month', duration: '28 days before application', note: 'For 9+ month courses + living costs' },
  { country: 'Canada', flag: '🇨🇦', amount: 'CAD $10,000+', duration: 'Recent 3–6 months', note: 'Tuition + living costs (CAD $833/month)' },
  { country: 'USA', flag: '🇺🇸', amount: 'Full tuition + $10,000', duration: '3–6 months statements', note: 'Varies by university and location' },
  { country: 'Germany', flag: '🇩🇪', amount: '€11,208/year', duration: 'Recent 3 months', note: 'Blocked account or financial guarantee' },
  { country: 'Ireland', flag: '🇮🇪', amount: '€7,000+', duration: '6 months statements', note: 'For first year of study' },
  { country: 'Australia', flag: '🇦🇺', amount: 'AUD $21,041', duration: 'Recent 3 months', note: 'Tuition + 12 months living costs' },
];

const SERVICES = [
  { icon: FileText, title: 'Bank Statement Review', desc: 'We review and verify your current statements meet embassy standards.' },
  { icon: Shield, title: 'Sponsorship Letter', desc: 'Professionally drafted sponsor letters that meet embassy requirements.' },
  { icon: DollarSign, title: 'Financial Advisory', desc: 'Advice on how to legitimately demonstrate sufficient funds.' },
  { icon: CheckCircle, title: 'Document Packaging', desc: 'Complete packaging of all financial documents for your visa application.' },
];

const FAQ = [
  { q: 'What is Proof of Funds?', a: 'Proof of Funds (POF) is financial documentation required by embassies to confirm you have sufficient money to cover your tuition, accommodation, and living expenses during your stay abroad. It is a mandatory requirement for most student, tourist, and immigration visas.' },
  { q: 'What documents are accepted as Proof of Funds?', a: 'Commonly accepted documents include: bank statements (typically 3–6 months), fixed deposit certificates, pension statements, scholarship award letters, property valuations, business financial statements, or a combination of these with a sponsor letter.' },
  { q: 'How much money do I need?', a: 'The amount varies by country and visa type. Generally, you need to show enough to cover tuition plus 12 months of living costs. This ranges from approximately £14,000 for the UK to CAD $20,000+ for Canada. We provide exact amounts for your specific situation.' },
  { q: 'Can my family sponsor me?', a: 'Yes! Most countries accept third-party sponsorship. We help prepare comprehensive sponsor packages including the sponsor\'s bank statements, employment letter, proof of relationship, and a well-drafted sponsorship letter.' },
  { q: 'What if I don\'t have enough funds?', a: 'We provide ethical advisory on legal ways to meet requirements, including combining multiple accounts, using fixed deposits, exploring scholarships and bursaries, or legitimate family sponsorship structures.' },
  { q: 'Do you provide fake bank statements?', a: 'Absolutely not. We strictly provide legitimate financial documentation advisory. Fraudulent documents are illegal, can result in permanent visa bans, and can lead to deportation. We only help you present your genuine financial position in the best possible light.' },
];

export default function ProofOfFunds() {
  const { navigate } = useNavigation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<null | 'eligible' | 'partial' | 'ineligible'>(null);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', country: '', purpose: '', amount: '', notes: '' });
  const [checker, setChecker] = useState({ country: '', purpose: '', amount: '' });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const runEligibility = () => {
    const amt = parseInt(checker.amount.replace(/[^0-9]/g, '')) || 0;
    if (amt >= 5000000) setEligibilityResult('eligible');
    else if (amt >= 2000000) setEligibilityResult('partial');
    else setEligibilityResult('ineligible');
  };

  return (
    <div className="min-h-screen bg-uptreek-navy">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-uptreek-dark via-uptreek-navy to-uptreek-navy-mid" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-uptreek-gold/6 blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="badge-gold mb-5 inline-flex">
            <DollarSign size={12} />
            Proof of Funds Assistance
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-4">
            Meet Every Embassy's<br />
            <span className="text-uptreek-gold">Financial Requirement</span>
          </h1>
          <p className="text-uptreek-gray-mid text-lg max-w-2xl mx-auto">
            We help you prepare, organize, and present your financial documents to meet the exact standards
            required by your target country's embassy.
          </p>
        </div>
      </section>

      {/* What is POF */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge-blue mb-4 inline-flex">What is Proof of Funds?</div>
              <h2 className="text-3xl font-bold font-heading text-uptreek-navy mb-4">
                Your Financial Passport to a Global Visa
              </h2>
              <p className="text-uptreek-gray mb-4 leading-relaxed">
                Proof of Funds is a mandatory document showing embassies and immigration offices that you
                can financially support yourself during your stay abroad — covering tuition, accommodation,
                and daily living costs without needing to work illegally.
              </p>
              <p className="text-uptreek-gray mb-6 leading-relaxed">
                A poorly prepared Proof of Funds submission is one of the leading causes of visa rejection.
                Our specialists ensure your financial documentation is comprehensive, compliant, and
                compelling.
              </p>
              <div className="space-y-3">
                {['Genuine financial documentation only', 'Country-specific formatting', 'Embassy-standard presentation', 'Sponsorship letter drafting', 'Complete package assembly'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle size={16} className="text-uptreek-success shrink-0" />
                    <span className="text-sm text-uptreek-gray-dark">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Checker */}
            <div className="card-white border-2 border-uptreek-navy">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle size={20} className="text-uptreek-gold" />
                <h3 className="font-bold text-uptreek-navy">Quick Eligibility Check</h3>
              </div>
              <p className="text-sm text-uptreek-gray mb-4">
                Get an instant estimate of your current financial eligibility.
              </p>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="form-label-light">Target Country</label>
                  <select className="form-input-light" value={checker.country} onChange={(e) => setChecker((p) => ({ ...p, country: e.target.value }))}>
                    <option value="">Select country...</option>
                    {REQUIREMENTS.map((r) => <option key={r.country}>{r.country}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label-light">Visa Purpose</label>
                  <select className="form-input-light" value={checker.purpose} onChange={(e) => setChecker((p) => ({ ...p, purpose: e.target.value }))}>
                    <option value="">Select purpose...</option>
                    <option>Student Visa</option>
                    <option>Tourist Visa</option>
                    <option>Work Visa</option>
                    <option>Family Visa</option>
                  </select>
                </div>
                <div>
                  <label className="form-label-light">Available Funds (₦)</label>
                  <input
                    className="form-input-light"
                    placeholder="e.g. 5,000,000"
                    value={checker.amount}
                    onChange={(e) => setChecker((p) => ({ ...p, amount: e.target.value }))}
                  />
                </div>
              </div>
              <button onClick={runEligibility} disabled={!checker.country || !checker.purpose} className="btn-primary w-full justify-center disabled:opacity-50">
                Check Eligibility
              </button>
              {eligibilityResult && (
                <div className={`mt-4 p-3 rounded-xl border text-sm ${
                  eligibilityResult === 'eligible'
                    ? 'bg-uptreek-success/10 border-uptreek-success/30 text-uptreek-success'
                    : eligibilityResult === 'partial'
                    ? 'bg-uptreek-warning/10 border-uptreek-warning/30 text-uptreek-warning'
                    : 'bg-uptreek-danger/10 border-uptreek-danger/30 text-uptreek-danger'
                }`}>
                  {eligibilityResult === 'eligible' && '✅ Likely eligible! Schedule a consultation to verify and prepare documents.'}
                  {eligibilityResult === 'partial' && '⚠️ May be eligible with proper presentation or sponsorship support. Contact us.'}
                  {eligibilityResult === 'ineligible' && '❌ Current funds may be insufficient. We can help explore sponsorship options.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Country Requirements */}
      <section className="bg-uptreek-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-white text-center mb-10">
            Proof of Funds Requirements by Country
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REQUIREMENTS.map((r) => (
              <div key={r.country} className="card-dark">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{r.flag}</span>
                  <h3 className="font-semibold text-white">{r.country}</h3>
                </div>
                <div className="text-2xl font-bold text-uptreek-gold mb-1">{r.amount}</div>
                <div className="text-xs text-uptreek-gray-mid mb-2">
                  <Clock size={11} className="inline mr-1" />
                  {r.duration}
                </div>
                <p className="text-xs text-uptreek-gray-mid border-t border-white/10 pt-2">{r.note}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-uptreek-gray-mid mt-6">
            * Requirements change frequently. Contact us for the latest, most accurate figures.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-uptreek-off-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-uptreek-navy text-center mb-10">Our POF Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="card-white text-center hover-lift">
                <div className="w-12 h-12 rounded-xl bg-uptreek-gold/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon size={22} className="text-uptreek-gold" />
                </div>
                <h3 className="font-semibold text-uptreek-navy mb-2">{s.title}</h3>
                <p className="text-sm text-uptreek-gray">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="bg-uptreek-navy py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-heading text-white mb-3">Get Expert POF Assistance</h2>
            <p className="text-uptreek-gray-mid">Our specialists will review your situation and guide you through the process.</p>
          </div>
          {submitted ? (
            <div className="card-dark text-center py-12">
              <CheckCircle size={40} className="text-uptreek-success mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Request Received!</h3>
              <p className="text-uptreek-gray-mid mb-5">A POF specialist will contact you within 24 hours.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setSubmitted(false)} className="btn-outline">New Request</button>
                <button onClick={() => navigate('portal')} className="btn-gold">Track Application</button>
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
                  <label className="form-label">Phone *</label>
                  <input className="form-input" placeholder="+234 800 000 0000" value={form.phone} onChange={set('phone')} required />
                </div>
                <div>
                  <label className="form-label">Target Country</label>
                  <select className="form-input" value={form.country} onChange={set('country')}>
                    <option value="">Select country...</option>
                    {REQUIREMENTS.map((r) => <option key={r.country}>{r.country}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Purpose</label>
                  <select className="form-input" value={form.purpose} onChange={set('purpose')}>
                    <option value="">Select purpose...</option>
                    <option>Student Visa</option>
                    <option>Tourist Visa</option>
                    <option>Work Visa</option>
                    <option>Family Visa</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Approximate Available Funds (₦)</label>
                  <input className="form-input" placeholder="e.g. 5,000,000" value={form.amount} onChange={set('amount')} />
                </div>
              </div>
              <div>
                <label className="form-label">Additional Notes</label>
                <textarea className="form-input" rows={3} placeholder="Any specific concerns or questions about your financial situation..." value={form.notes} onChange={set('notes')} />
              </div>
              <button type="submit" className="btn-gold w-full justify-center py-3.5">
                Request POF Assistance <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-uptreek-off-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-uptreek-navy text-center mb-10">Proof of Funds FAQ</h2>
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
                  <div className="px-5 pb-4 text-sm text-uptreek-gray leading-relaxed border-t border-uptreek-gray-light pt-3">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
