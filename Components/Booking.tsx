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
  'Premium Service',
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30',
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

  const today = new Date().toISOString().split('T')[0];

  // Pre-fill service when selected from Services section
  useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const appointment: Appointment = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      appointment_date: form.appointment_date,
      appointment_time: form.appointment_time,
      service: form.service,
      message: form.message.trim(),
    };

    if (!supabase) {
      setStatus('success');
      setForm(initialForm);
      return;
    }

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
                    <select
                      name="appointment_time"
                      required
                      value={form.appointment_time}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">{t.selectTime}</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
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
