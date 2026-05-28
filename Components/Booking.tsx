import { useState, useEffect, type FormEvent } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { supabase, type Appointment } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const serviceKeys = [
  'Full Haircut',
  'Haircut + Beard',
  'Kids Haircut',
  'Hair Treatment',
  'Beard Trim',
  'Coloring',
  'Premium Service',
];

const timeSlots = [
  '10:00', '10:40', '11:20', '12:00', '12:40', '13:20',
  '14:00', '14:40', '15:20', '16:00', '16:40', '17:20',
  '18:00',
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  appointment_date: string;
  appointment_time: string;
  service: string;
  message: string;
};

const initialForm: FormState = {
  name: '',
  phone: '',
  email: '',
  appointment_date: '',
  appointment_time: '',
  service: '',
  message: '',
};

interface BookingProps {
  selectedService: string;
}

export default function Booking({ selectedService }: BookingProps) {
  const { lang } = useLanguage();
  const t = translations[lang].booking;
  const servicesT = translations[lang].services;

  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const today = new Date().toISOString().split('T')[0];

  const isPastSlot = (slot: string): boolean => {
    if (form.appointment_date !== today) return false;
    const [h, m] = slot.split(':').map(Number);
    const now = new Date();
    return h * 60 + m <= now.getHours() * 60 + now.getMinutes();
  };

  // Pre-fill service when selected from Services section
  useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  // Fetch booked slots whenever date changes
  useEffect(() => {
    setForm((prev) => ({ ...prev, appointment_time: '' }));
    setBookedSlots([]);
    if (!form.appointment_date) return;
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;
    if (!webhookUrl) return;
    const availUrl = webhookUrl.replace('rboss-booking', 'rboss-availability');
    fetch(`${availUrl}?date=${form.appointment_date}`)
      .then((r) => r.json())
      .then((data) => setBookedSlots(data.booked ?? []))
      .catch(() => setBookedSlots([]));
  }, [form.appointment_date]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      service: form.service,
      date: form.appointment_date,
      time: form.appointment_time,
      message: form.message.trim(),
      lang,
    };

    // n8n webhook — primary path
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;
    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.status === 409) {
          // Slot already taken — show specific message, stay on form
          setStatus('error');
          setErrorMsg(t.slotTakenMsg);
          return;
        }
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
        setStatus('success');
        setForm(initialForm);
        return;
      } catch (err) {
        console.error('[n8n webhook]', err);
        // fall through to Supabase / demo
      }
    }

    // Supabase fallback / demo mode
    if (!supabase) {
      setStatus('success');
      setForm(initialForm);
      return;
    }

    const appointment: Appointment = {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      appointment_date: form.appointment_date,
      appointment_time: form.appointment_time,
      service: form.service,
      message: payload.message,
    };

    const { error } = await supabase.from('appointments').insert(appointment);

    if (error) {
      setStatus('error');
      setErrorMsg(t.errorMsg);
    } else {
      setStatus('success');
      setForm(initialForm);
    }
  };

  const inputClass =
    'w-full bg-brand-dark border border-brand-border text-brand-white text-sm px-4 py-3 focus:outline-none focus:border-brand-green transition-colors placeholder:text-brand-gray/50';

  return (
    <section id="booking" className="bg-brand-charcoal py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left sidebar info */}
          <div className="lg:col-span-2">
            <p className="section-label mb-3">{t.sectionLabel}</p>
            <h2 className="font-display text-3xl md:text-4xl font-700 text-brand-white mb-5 leading-tight">
              {t.sectionTitle.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed mb-4">
              {t.subtitle}
            </p>
            <p className="text-brand-green-light text-xs tracking-wide mb-8">
              ⏱ {t.durationNote}
            </p>

            <div className="space-y-4 border-t border-brand-border pt-6">
              <div>
                <p className="text-xs text-brand-gray uppercase tracking-widest mb-1">{t.phoneLabel}</p>
                <a
                  href="https://wa.me/351933469593"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-white hover:text-brand-green-light transition-colors"
                >
                  +351 933 469 593
                </a>
              </div>
              <div>
                <p className="text-xs text-brand-gray uppercase tracking-widest mb-1">{t.instagramLabel}</p>
                <a
                  href="https://www.instagram.com/rboss_barber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-white hover:text-brand-green-light transition-colors"
                >
                  @rboss_barber
                </a>
              </div>
              <div>
                <p className="text-xs text-brand-gray uppercase tracking-widest mb-1">{t.hoursLabel}</p>
                <p className="text-sm text-brand-white">{t.hoursValue}</p>
                <p className="text-sm text-brand-gray">{t.sundayValue}</p>
              </div>
            </div>
          </div>

          {/* Right booking form */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div className="bg-brand-dark border border-brand-green/30 p-8 flex flex-col items-center text-center gap-4 animate-fade-in">
                <CheckCircle size={40} className="text-brand-green-light" />
                <h3 className="font-display text-xl font-700 text-white">{t.successTitle}</h3>
                <p className="text-brand-gray text-sm leading-relaxed max-w-sm">
                  {t.successMsg}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-outline text-xs tracking-widest mt-2"
                >
                  {t.bookAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-brand-gray uppercase tracking-widest mb-1.5">{t.nameLabel} *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-brand-gray uppercase tracking-widest mb-1.5">{t.phoneFLabel} *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t.phonePlaceholder}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-brand-gray uppercase tracking-widest mb-1.5">{t.emailLabel} *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-brand-gray uppercase tracking-widest mb-1.5">{t.dateLabel} *</label>
                    <input
                      type="date"
                      name="appointment_date"
                      required
                      min={today}
                      value={form.appointment_date}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-brand-gray uppercase tracking-widest mb-1.5">{t.timeLabel} *</label>
                    {!form.appointment_date ? (
                      <p className="text-xs text-brand-gray/50 italic pt-2">{t.selectDateFirst}</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        {timeSlots.map((slot) => {
                          const booked = bookedSlots.includes(slot);
                          const past = isPastSlot(slot);
                          const unavailable = booked || past;
                          const selected = form.appointment_time === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={unavailable}
                              onClick={() => !unavailable && setForm((prev) => ({ ...prev, appointment_time: slot }))}
                              className={`py-2 text-xs font-medium tracking-wide border transition-all duration-150 ${
                                unavailable
                                  ? 'bg-transparent border-brand-border/20 text-brand-gray/25 cursor-not-allowed line-through'
                                  : selected
                                  ? 'bg-brand-green border-brand-green text-white'
                                  : 'bg-brand-dark border-brand-border text-brand-white hover:border-brand-green-light hover:text-brand-green-light cursor-pointer'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-brand-gray uppercase tracking-widest mb-1.5">{t.serviceLabel} *</label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">{t.selectService}</option>
                    {serviceKeys.map((key, idx) => (
                      <option key={key} value={key}>
                        {servicesT.items[idx]?.title ?? key} — {servicesT.items[idx]?.price ?? ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-brand-gray uppercase tracking-widest mb-1.5">{t.messageLabel}</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full text-xs tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? t.submittingBtn : t.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
