import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle, ArrowRight, Calendar, Users } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', service: '', message: '', preferredContact: 'email',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const SERVICES = [
    'Flight Booking (Domestic)', 'Flight Booking (International)', 'University Admissions',
    'Study Abroad Consulting', 'Student Visa', 'Tourist Visa', 'Work Visa', 'Business Visa',
    'Proof of Funds', 'Travel Tours', 'Vacation Package', 'Corporate Travel', 'Immigration Guidance',
    'General Inquiry',
  ];

  const CONTACT_METHODS = [
    { icon: Phone, title: 'Call Us', value: '+234 800 000 0000', sub: 'Mon–Sat: 8am–6pm WAT', href: 'tel:+2348000000000' },
    { icon: MessageSquare, title: 'WhatsApp', value: '+234 800 000 0000', sub: 'Quick responses', href: 'https://wa.me/2348000000000' },
    { icon: Mail, title: 'Email Us', value: 'info@uptreek.com', sub: 'Response within 24hrs', href: 'mailto:info@uptreek.com' },
    { icon: MapPin, title: 'Visit Us', value: 'Lagos, Nigeria', sub: 'By appointment only', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-uptreek-navy">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-uptreek-dark via-uptreek-navy to-uptreek-navy-mid" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="badge-gold mb-5 inline-flex">
            <MessageSquare size={12} />
            Contact Us
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-4">
            Let's Start Your<br />
            <span className="text-uptreek-gold">Global Journey</span>
          </h1>
          <p className="text-uptreek-gray-mid text-lg max-w-2xl mx-auto">
            Book a free consultation, ask a question, or get a quote. Our team responds within 24 hours
            and your first consultation is always free.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_METHODS.map((m) => (
            <a
              key={m.title}
              href={m.href}
              className="card-dark hover-lift flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-uptreek-gold/10 border border-uptreek-gold/20 flex items-center justify-center shrink-0 group-hover:bg-uptreek-gold/20 transition-colors">
                <m.icon size={20} className="text-uptreek-gold" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-uptreek-gold transition-colors">{m.title}</div>
                <div className="text-sm text-uptreek-gold">{m.value}</div>
                <div className="text-xs text-uptreek-gray-mid">{m.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Form & Info */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="card-dark text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-uptreek-success/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-uptreek-success" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Message Sent Successfully!</h2>
                <p className="text-uptreek-gray-mid mb-6 max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{form.fullName}</strong>! We'll reach out within 24 hours to the contact you provided.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-gold">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="card-dark space-y-4">
                <h2 className="text-xl font-bold text-white mb-2">Book a Free Consultation</h2>
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
                <div>
                  <label className="form-label">Service of Interest *</label>
                  <select className="form-input" value={form.service} onChange={set('service')} required>
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Preferred Contact Method</label>
                  <div className="flex gap-3">
                    {['email', 'phone', 'whatsapp'].map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contact"
                          value={method}
                          checked={form.preferredContact === method}
                          onChange={set('preferredContact')}
                          className="accent-uptreek-gold"
                        />
                        <span className="text-sm text-white capitalize">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-input"
                    rows={5}
                    placeholder="Tell us about your travel or study plans, destination of interest, timeline, and any specific questions..."
                    value={form.message}
                    onChange={set('message')}
                    required
                  />
                </div>
                <button type="submit" className="btn-gold w-full justify-center text-base py-3.5">
                  Send Message & Request Consultation <ArrowRight size={18} />
                </button>
                <p className="text-xs text-center text-uptreek-gray-mid">
                  Your first consultation is completely free. No obligation. We respect your privacy.
                </p>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card-dark">
              <div className="flex items-center gap-3 mb-4">
                <Calendar size={20} className="text-uptreek-gold" />
                <h3 className="font-semibold text-white">Office Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Monday – Friday', time: '8:00am – 6:00pm' },
                  { day: 'Saturday', time: '9:00am – 4:00pm' },
                  { day: 'Sunday', time: 'Closed' },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <span className="text-uptreek-gray-mid">{h.day}</span>
                    <span className={h.time === 'Closed' ? 'text-uptreek-danger' : 'text-white font-medium'}>{h.time}</span>
                  </div>
                ))}
                <p className="text-xs text-uptreek-gray-mid pt-2 border-t border-white/10 mt-2">
                  All times are West Africa Time (WAT / UTC+1)
                </p>
              </div>
            </div>

            <div className="card-dark">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-uptreek-gold" />
                <h3 className="font-semibold text-white">Response Times</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'General Inquiries', time: 'Within 24 hours' },
                  { label: 'Flight Requests', time: 'Within 2 hours' },
                  { label: 'Visa Applications', time: 'Within 24 hours' },
                  { label: 'Urgent Matters', time: 'Call us directly' },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-uptreek-gray-mid">{r.label}</span>
                    <span className="text-uptreek-gold text-xs font-medium">{r.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-dark">
              <div className="flex items-center gap-3 mb-3">
                <Users size={20} className="text-uptreek-gold" />
                <h3 className="font-semibold text-white">Group Inquiries</h3>
              </div>
              <p className="text-sm text-uptreek-gray-mid mb-3">
                Schools, organizations, and corporate groups receive priority handling and group pricing.
              </p>
              <a href="mailto:groups@uptreek.com" className="text-sm text-uptreek-gold hover:text-uptreek-gold-light transition-colors">
                groups@uptreek.com →
              </a>
            </div>

            <div className="p-4 bg-uptreek-gold/10 rounded-2xl border border-uptreek-gold/20">
              <h4 className="font-semibold text-uptreek-gold mb-2 text-sm">🎁 Free Consultation</h4>
              <p className="text-xs text-uptreek-gold-light leading-relaxed">
                Your first 30-minute consultation is completely free. We assess your goals, answer your questions,
                and provide a personalized plan — no commitment required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
