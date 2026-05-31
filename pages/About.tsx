import { Shield, Globe, Award, Heart, Users, Target, Eye, Zap, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

const STATS = [
  { value: '2,000+', label: 'Clients Served', icon: Users },
  { value: '500+', label: 'Students Placed Abroad', icon: Globe },
  { value: '98%', label: 'Client Satisfaction', icon: Heart },
  { value: '50+', label: 'Partner Universities', icon: Award },
  { value: '15+', label: 'Countries Covered', icon: Globe },
  { value: '5+', label: 'Years Experience', icon: Star },
];

const VALUES = [
  {
    icon: Shield,
    title: 'Integrity',
    desc: 'We operate with full transparency. No hidden fees, no misleading promises — just honest, professional service.',
  },
  {
    icon: Zap,
    title: 'Excellence',
    desc: 'We don\'t settle for average. Every application, every booking, every interaction is handled with the highest standard.',
  },
  {
    icon: Heart,
    title: 'Client-First',
    desc: 'Your success is our success. We go beyond transactions to genuinely care about your outcomes and wellbeing.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    desc: 'We connect Nigerians with the world. Our network spans universities, airlines, and embassies globally.',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'We\'re proud Nigerians helping other Nigerians access global opportunities once reserved for the privileged few.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    desc: 'We measure success in visa approvals, admission offers, and happy clients — not just completed transactions.',
  },
];

const WHY_US = [
  'AITA-certified and government recognized agency',
  'Dedicated advisors for every client — not just chatbots',
  '98%+ visa approval rate across all visa categories',
  'End-to-end service from inquiry to departure',
  'Transparent pricing with no hidden charges',
  'Post-departure support for students abroad',
  'Free initial consultation for all services',
  '24-hour response guarantee on all inquiries',
];

const TEAM = [
  { name: 'Adeola Bakare', role: 'Founder & CEO', emoji: '👩‍💼', bio: '10+ years in international education consulting. Former UKBA visa coordinator.' },
  { name: 'Emeka Nwosu', role: 'Head of Admissions', emoji: '👨‍🎓', bio: 'Former UK university admissions officer. Expert in UK, Canada & Australian admissions.' },
  { name: 'Fatima Hassan', role: 'Senior Visa Consultant', emoji: '👩‍⚖️', bio: 'Specialist in student and immigration visas. 800+ visas processed with 97% success rate.' },
  { name: 'Chidi Okonkwo', role: 'Head of Travel', emoji: '✈️', bio: 'IATA certified travel consultant with 8 years of international travel booking expertise.' },
];

export default function About() {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-uptreek-navy">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-uptreek-dark via-uptreek-navy to-uptreek-navy-mid" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-uptreek-gold/6 blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="badge-gold mb-5 inline-flex">
            <Globe size={12} />
            About Uptreek
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">
            Nigeria's Most Trusted<br />
            <span className="text-uptreek-gold">Travel & Education Partner</span>
          </h1>
          <p className="text-uptreek-gray-mid text-lg leading-relaxed">
            We are more than a travel agency. Uptreek is a gateway — connecting ambitious Nigerians
            with world-class education, life-changing travel experiences, and the immigration pathways
            that open doors to global opportunity.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge-blue mb-4 inline-flex">Our Story</div>
              <h2 className="text-4xl font-bold font-heading text-uptreek-navy mb-6">
                Born from a Belief That Every Nigerian Deserves the World
              </h2>
              <div className="space-y-4 text-uptreek-gray leading-relaxed">
                <p>
                  Uptreek was founded with a simple but powerful conviction: that where you were born should
                  not determine how far you can go. Too many Nigerians with talent, ambition, and drive were
                  being held back — not by ability, but by access.
                </p>
                <p>
                  Our founders saw the confusion, the exploitation, and the wasted potential. Students falling
                  victim to fraudulent agents. Families losing money on rejected visa applications. Travelers
                  overpaying for poor-quality experiences. We knew there was a better way.
                </p>
                <p>
                  Today, Uptreek is built on a foundation of integrity, expertise, and genuine care. We've
                  helped over 2,000 Nigerians access quality education abroad, navigate complex visa systems,
                  and experience the world on their own terms. Every success story fuels our next chapter.
                </p>
              </div>
              <div className="mt-6">
                <button onClick={() => navigate('contact')} className="btn-primary">
                  Start Your Journey <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="card-white hover-lift text-center">
                  <div className="w-10 h-10 rounded-xl bg-uptreek-gold/10 flex items-center justify-center mx-auto mb-3">
                    <s.icon size={20} className="text-uptreek-gold" />
                  </div>
                  <div className="stat-number">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-uptreek-navy py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-dark">
              <div className="w-12 h-12 rounded-xl bg-uptreek-blue/20 flex items-center justify-center mb-5">
                <Target size={24} className="text-uptreek-blue-glow" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
              <div className="divider-gold-left mb-4" />
              <p className="text-uptreek-gray-mid leading-relaxed">
                To democratize access to global travel, education, and immigration opportunities for
                Nigerians — delivering premium, trustworthy, and result-oriented services that transform
                aspirations into achievements.
              </p>
            </div>
            <div className="card-dark">
              <div className="w-12 h-12 rounded-xl bg-uptreek-gold/20 flex items-center justify-center mb-5">
                <Eye size={24} className="text-uptreek-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
              <div className="divider-gold-left mb-4" />
              <p className="text-uptreek-gray-mid leading-relaxed">
                To be Africa's leading travel and education consultancy — a brand synonymous with
                excellence, integrity, and global impact. We envision a Nigeria where every talented
                individual can access the world without barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-uptreek-off-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge-gold mb-3 inline-flex">Our Values</div>
            <h2 className="text-4xl font-bold font-heading text-uptreek-navy mb-4">What Drives Everything We Do</h2>
            <div className="divider-gold mb-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="card-white hover-lift">
                <div className="w-11 h-11 rounded-xl bg-uptreek-navy flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-uptreek-gold" />
                </div>
                <h3 className="font-bold text-uptreek-navy mb-2">{v.title}</h3>
                <p className="text-sm text-uptreek-gray leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Uptreek */}
      <section className="bg-uptreek-navy py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge-gold mb-4 inline-flex">Why Choose Us</div>
              <h2 className="text-4xl font-bold font-heading text-white mb-6">
                The Uptreek Difference
              </h2>
              <div className="space-y-3">
                {WHY_US.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-uptreek-gold shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-4">
                <button onClick={() => navigate('contact')} className="btn-gold">
                  Book Free Consultation
                </button>
                <button onClick={() => navigate('portal')} className="btn-ghost">
                  Client Portal
                </button>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <div className="card-dark flex items-center gap-5 hover-lift">
                <div className="w-16 h-16 rounded-2xl bg-uptreek-gold/20 border-2 border-uptreek-gold/40 flex items-center justify-center shrink-0">
                  <Shield size={28} className="text-uptreek-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">AITA Certified</h4>
                  <p className="text-sm text-uptreek-gray-mid">
                    Association of International Travel Agents — fully licensed and regulated.
                  </p>
                </div>
              </div>
              <div className="card-dark flex items-center gap-5 hover-lift">
                <div className="w-16 h-16 rounded-2xl bg-uptreek-blue/20 border-2 border-uptreek-blue/40 flex items-center justify-center shrink-0">
                  <Award size={28} className="text-uptreek-blue-glow" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Government Registered</h4>
                  <p className="text-sm text-uptreek-gray-mid">
                    Legally registered and operating in compliance with Nigerian corporate law.
                  </p>
                </div>
              </div>
              <div className="card-dark flex items-center gap-5 hover-lift">
                <div className="w-16 h-16 rounded-2xl bg-uptreek-gold/20 border-2 border-uptreek-gold/40 flex items-center justify-center shrink-0">
                  <Globe size={28} className="text-uptreek-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">IATA Affiliated</h4>
                  <p className="text-sm text-uptreek-gray-mid">
                    International Air Transport Association affiliate for flight booking services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge-blue mb-3 inline-flex">Our Team</div>
            <h2 className="text-4xl font-bold font-heading text-uptreek-navy mb-4">Meet the Experts</h2>
            <div className="divider-gold mb-4" />
            <p className="text-uptreek-gray max-w-2xl mx-auto">
              A team of certified travel consultants, admissions officers, and visa specialists — all dedicated to your success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((m) => (
              <div key={m.name} className="card-white text-center hover-lift gold-border-hover">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-uptreek-navy to-uptreek-navy-mid flex items-center justify-center mx-auto mb-4 text-4xl">
                  {m.emoji}
                </div>
                <h3 className="font-bold text-uptreek-navy mb-1">{m.name}</h3>
                <p className="text-xs text-uptreek-gold font-medium mb-3">{m.role}</p>
                <p className="text-xs text-uptreek-gray leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
