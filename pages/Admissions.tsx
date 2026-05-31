import { useState } from 'react';
import { GraduationCap, CheckCircle, ArrowRight, Upload, FileText, Clock, Star, Users, BookOpen } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

const COUNTRIES = [
  { name: 'United Kingdom', flag: '🇬🇧', unis: 24, visaTime: '3–6 wks', intakes: 'Sep, Jan' },
  { name: 'Canada', flag: '🇨🇦', unis: 18, visaTime: '4–8 wks', intakes: 'Sep, Jan, May' },
  { name: 'United States', flag: '🇺🇸', unis: 12, visaTime: '4–12 wks', intakes: 'Aug, Jan' },
  { name: 'Ireland', flag: '🇮🇪', unis: 8, visaTime: '4–8 wks', intakes: 'Sep, Jan' },
  { name: 'Germany', flag: '🇩🇪', unis: 10, visaTime: '8–12 wks', intakes: 'Oct, Apr' },
  { name: 'Australia', flag: '🇦🇺', unis: 9, visaTime: '4–8 wks', intakes: 'Feb, Jul' },
  { name: 'Netherlands', flag: '🇳🇱', unis: 7, visaTime: '3–6 wks', intakes: 'Sep' },
];

const PROGRAMS = [
  { level: 'Undergraduate', icon: BookOpen, desc: 'BSc, BA, BEng, BEd programs — 3 to 4 years', color: 'blue' },
  { level: 'Postgraduate', icon: GraduationCap, desc: 'Graduate certificates and diplomas — 1 year', color: 'gold' },
  { level: 'Masters (MSc/MBA)', icon: Star, desc: 'MSc, MBA, MRes, MEd — 1 to 2 years', color: 'blue' },
  { level: 'PhD / Doctorate', icon: FileText, desc: 'Research degrees with funding guidance', color: 'gold' },
  { level: 'Foundation', icon: BookOpen, desc: 'Pathway programs for direct entry', color: 'blue' },
];

const PROCESS = [
  { step: '01', title: 'Free Consultation', desc: 'We assess your academic background and match you with suitable programs and universities.' },
  { step: '02', title: 'Program Selection', desc: 'Choose from our curated list of universities and programs that fit your goals and grades.' },
  { step: '03', title: 'Document Preparation', desc: 'We help you write your personal statement, gather transcripts, and organize all documents.' },
  { step: '04', title: 'Application Submission', desc: 'We submit your applications to multiple universities and track each one closely.' },
  { step: '05', title: 'Offer & Acceptance', desc: 'Upon receiving offers, we guide you to accept the best one and meet any conditions.' },
  { step: '06', title: 'Visa & Departure', desc: 'We process your student visa and support your relocation planning.' },
];

export default function Admissions() {
  const { navigate } = useNavigation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', country: '', course: '',
    level: '', intake: '', qualification: '', grade: '', english: '', notes: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen bg-uptreek-navy">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-uptreek-dark via-uptreek-navy to-uptreek-navy-mid" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-uptreek-gold/8 blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="badge-gold mb-5 inline-flex">
            <GraduationCap size={12} />
            University Admissions
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-4">
            Study Abroad<br />
            <span className="text-uptreek-gold">Made Simple</span>
          </h1>
          <p className="text-uptreek-gray-mid text-lg max-w-2xl mx-auto mb-8">
            Expert guidance for university admission to top institutions in the UK, Canada, USA, Ireland, Germany,
            Australia, and Netherlands.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-uptreek-gray-mid">
            {[
              { icon: Users, text: '500+ students placed' },
              { icon: Star, text: '50+ partner universities' },
              { icon: Clock, text: 'All intakes covered' },
              { icon: CheckCircle, text: '90%+ admission rate' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
                <Icon size={13} className="text-uptreek-gold" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-uptreek-navy text-center mb-10">
            Programs We Support
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PROGRAMS.map((p) => (
              <div key={p.level} className="card-white text-center hover-lift gold-border-hover">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                    p.color === 'blue' ? 'bg-uptreek-blue/10' : 'bg-uptreek-gold/10'
                  }`}
                >
                  <p.icon size={20} className={p.color === 'blue' ? 'text-uptreek-blue' : 'text-uptreek-gold'} />
                </div>
                <h3 className="font-semibold text-uptreek-navy text-sm mb-1.5">{p.level}</h3>
                <p className="text-xs text-uptreek-gray leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="bg-uptreek-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-white text-center mb-10">
            Destination Countries
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COUNTRIES.map((c) => (
              <div key={c.name} className="card-dark hover-lift">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{c.flag}</span>
                  <h3 className="font-semibold text-white">{c.name}</h3>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-uptreek-gray-mid">Partner Universities</span>
                    <span className="text-uptreek-gold font-medium">{c.unis}+</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-uptreek-gray-mid">Visa Processing</span>
                    <span className="text-white font-medium">{c.visaTime}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-uptreek-gray-mid">Intakes</span>
                    <span className="text-white font-medium">{c.intakes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-uptreek-off-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-uptreek-navy text-center mb-12">
            Our Admission Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS.map((s) => (
              <div key={s.step} className="card-white hover-lift">
                <div className="text-3xl font-bold text-uptreek-gold/30 font-heading mb-3">{s.step}</div>
                <h3 className="font-semibold text-uptreek-navy mb-2">{s.title}</h3>
                <p className="text-sm text-uptreek-gray leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-uptreek-navy-light py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-heading text-white mb-3">Start Your Application</h2>
            <p className="text-uptreek-gray-mid">Fill out the form below and an admissions advisor will contact you within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="card-dark text-center py-14">
              <div className="w-16 h-16 rounded-2xl bg-uptreek-success/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-uptreek-success" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Application Received!</h3>
              <p className="text-uptreek-gray-mid mb-6 max-w-md mx-auto">
                Our admissions team will review your profile and reach out within 24 hours to schedule your free consultation.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setSubmitted(false)} className="btn-outline">Apply Again</button>
                <button onClick={() => navigate('portal')} className="btn-gold">Track Application</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-dark space-y-5">
              <h3 className="font-semibold text-white text-lg border-b border-white/10 pb-3">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="Your full name" value={form.fullName} onChange={set('fullName')} required />
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={set('email')} required />
                </div>
              </div>
              <div>
                <label className="form-label">Phone Number *</label>
                <input className="form-input" placeholder="+234 800 000 0000" value={form.phone} onChange={set('phone')} required />
              </div>

              <h3 className="font-semibold text-white text-lg border-b border-white/10 pb-3 pt-2">
                Academic Background
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Highest Qualification</label>
                  <select className="form-input" value={form.qualification} onChange={set('qualification')}>
                    <option value="">Select qualification...</option>
                    <option>WAEC/NECO (O'Level)</option>
                    <option>A-Level / ND</option>
                    <option>HND</option>
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Grade / CGPA</label>
                  <input className="form-input" placeholder="e.g. 3.5/4.0, 2:1, Merit" value={form.grade} onChange={set('grade')} />
                </div>
              </div>
              <div>
                <label className="form-label">English Language Test</label>
                <select className="form-input" value={form.english} onChange={set('english')}>
                  <option value="">Select...</option>
                  <option>IELTS (6.0+)</option>
                  <option>IELTS (6.5+)</option>
                  <option>IELTS (7.0+)</option>
                  <option>TOEFL (80+)</option>
                  <option>Not yet taken</option>
                  <option>Exempt (Nigerian English)</option>
                </select>
              </div>

              <h3 className="font-semibold text-white text-lg border-b border-white/10 pb-3 pt-2">
                Study Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Preferred Country *</label>
                  <select className="form-input" value={form.country} onChange={set('country')} required>
                    <option value="">Select country...</option>
                    {COUNTRIES.map((c) => <option key={c.name}>{c.name}</option>)}
                    <option>Open to suggestions</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Study Level *</label>
                  <select className="form-input" value={form.level} onChange={set('level')} required>
                    <option value="">Select level...</option>
                    {PROGRAMS.map((p) => <option key={p.level}>{p.level}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Preferred Course/Field</label>
                  <input className="form-input" placeholder="e.g. Computer Science, MBA..." value={form.course} onChange={set('course')} />
                </div>
                <div>
                  <label className="form-label">Intended Intake</label>
                  <select className="form-input" value={form.intake} onChange={set('intake')}>
                    <option value="">Select intake...</option>
                    <option>September 2025</option>
                    <option>January 2026</option>
                    <option>May 2026</option>
                    <option>September 2026</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Additional Notes</label>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Any specific requirements, scholarship interest, budget range..."
                  value={form.notes}
                  onChange={set('notes')}
                />
              </div>

              <div className="p-4 bg-uptreek-navy rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Upload size={18} className="text-uptreek-gold" />
                  <span className="text-sm font-medium text-white">Document Upload</span>
                </div>
                <p className="text-xs text-uptreek-gray-mid mb-3">
                  You'll receive a secure upload link after submitting this form. Documents needed: transcripts, passport, test scores.
                </p>
              </div>

              <button type="submit" className="btn-gold w-full justify-center text-base py-3.5">
                Submit Application <ArrowRight size={18} />
              </button>
              <p className="text-xs text-center text-uptreek-gray-mid">
                By submitting, you agree to be contacted by Uptreek regarding your application.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
