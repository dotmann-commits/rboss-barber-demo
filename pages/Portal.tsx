import { useState } from 'react';
import {
  User, Lock, Eye, EyeOff, FileText, Plane, GraduationCap, Upload,
  Bell, MessageSquare, CheckCircle, Clock, AlertCircle, Globe, ArrowRight, LogOut
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

type Tab = 'overview' | 'admissions' | 'visa' | 'flights' | 'documents' | 'messages';

const MOCK_APPLICATIONS = [
  {
    id: 'APP-2025-001',
    type: 'University Admission',
    icon: GraduationCap,
    institution: 'University of Manchester, UK',
    program: 'MSc Computer Science',
    status: 'Under Review',
    statusColor: 'warning',
    stage: 3,
    totalStages: 6,
    lastUpdate: '2 days ago',
    nextAction: 'Documents being reviewed by admissions team',
  },
  {
    id: 'VIS-2025-042',
    type: 'UK Student Visa',
    icon: FileText,
    institution: 'UK Home Office',
    program: 'Tier 4 Student Visa',
    status: 'Document Collection',
    statusColor: 'blue',
    stage: 2,
    totalStages: 6,
    lastUpdate: '1 day ago',
    nextAction: 'Please upload your IELTS certificate',
  },
  {
    id: 'FLT-2025-018',
    type: 'Flight Booking',
    icon: Plane,
    institution: 'British Airways',
    program: 'Lagos → London (LOS-LHR)',
    status: 'Confirmed',
    statusColor: 'success',
    stage: 6,
    totalStages: 6,
    lastUpdate: '1 week ago',
    nextAction: 'E-ticket sent to your email',
  },
];

const MOCK_MESSAGES = [
  {
    from: 'Fatima Hassan',
    role: 'Visa Consultant',
    time: '2 hours ago',
    text: 'Your IELTS certificate has been received. We\'ll process your visa application by Friday.',
    unread: true,
  },
  {
    from: 'Emeka Nwosu',
    role: 'Admissions Advisor',
    time: '1 day ago',
    text: 'Great news! University of Manchester has acknowledged receipt of your application. Expected response in 3-4 weeks.',
    unread: false,
  },
  {
    from: 'Uptreek Team',
    role: 'Support',
    time: '3 days ago',
    text: 'Welcome to your Uptreek client portal! You can track all your applications, upload documents, and chat with your advisors here.',
    unread: false,
  },
];

const DOCS_NEEDED = [
  { name: 'International Passport', status: 'uploaded', required: true },
  { name: 'IELTS Certificate', status: 'pending', required: true },
  { name: 'University Offer Letter', status: 'uploaded', required: true },
  { name: 'Bank Statements (6 months)', status: 'pending', required: true },
  { name: 'Academic Transcripts', status: 'uploaded', required: true },
  { name: 'Personal Statement', status: 'uploaded', required: false },
  { name: 'Reference Letters (x2)', status: 'pending', required: false },
  { name: 'CV / Resume', status: 'uploaded', required: false },
];

function ProgressBar({ stage, total }: { stage: number; total: number }) {
  const pct = Math.round((stage / total) * 100);
  return (
    <div className="w-full bg-white/10 rounded-full h-1.5">
      <div className="bg-uptreek-gold h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function Portal() {
  const { navigate } = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [tab, setTab] = useState<Tab>('overview');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-uptreek-dark via-uptreek-navy to-uptreek-navy-mid flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-uptreek-gold flex items-center justify-center mx-auto mb-4 shadow-gold">
              <Globe size={28} className="text-uptreek-navy" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-white mb-1">Client Portal</h1>
            <p className="text-uptreek-gray-mid text-sm">Track your applications, visas, and bookings</p>
          </div>

          <div className="card-dark">
            <form onSubmit={(e) => { e.preventDefault(); setLoggedIn(true); }} className="space-y-4">
              <div>
                <label className="form-label">Email Address</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-uptreek-gray-mid" />
                  <input
                    type="email"
                    className="form-input pl-9"
                    placeholder="your@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-uptreek-gray-mid" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    className="form-input pl-9 pr-10"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-uptreek-gray-mid hover:text-white"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-xs text-uptreek-gold hover:text-uptreek-gold-light">
                  Forgot password?
                </button>
              </div>
              <button type="submit" className="btn-gold w-full justify-center py-3.5">
                Sign In to Portal <ArrowRight size={16} />
              </button>
              <div className="text-center text-xs text-uptreek-gray-mid">
                Don't have an account?{' '}
                <button type="button" onClick={() => navigate('contact')} className="text-uptreek-gold hover:text-uptreek-gold-light">
                  Contact us to get access
                </button>
              </div>
            </form>

            <div className="mt-4 p-3 bg-uptreek-blue/10 rounded-xl border border-uptreek-blue/20 text-center">
              <p className="text-xs text-uptreek-blue-glow">
                Demo: Enter any email and password to preview the portal
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'admissions', label: 'Admissions', icon: GraduationCap },
    { id: 'visa', label: 'Visa', icon: FileText },
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'documents', label: 'Documents', icon: Upload },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-uptreek-navy">
      {/* Portal header */}
      <div className="bg-uptreek-dark border-b border-white/5 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">Welcome back, <span className="text-uptreek-gold">Amara</span></h1>
            <p className="text-xs text-uptreek-gray-mid">Client ID: UPT-2025-0241</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-uptreek-gray-mid transition-colors">
              <Bell size={16} />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-uptreek-danger border border-uptreek-dark text-[8px] flex items-center justify-center text-white font-bold">2</div>
            </button>
            <button
              onClick={() => setLoggedIn(false)}
              className="flex items-center gap-1.5 text-xs text-uptreek-gray-mid hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <LogOut size={13} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab navigation */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar mb-6 pb-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                tab === t.id
                  ? 'bg-uptreek-gold text-uptreek-navy'
                  : 'glass text-uptreek-gray-mid hover:text-white border border-white/10'
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="space-y-5">
            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Active Applications', value: '3', icon: FileText, color: 'blue' },
                { label: 'Documents Pending', value: '3', icon: Upload, color: 'warning' },
                { label: 'Messages', value: '1 new', icon: MessageSquare, color: 'gold' },
                { label: 'Next Appointment', value: 'Jun 5', icon: Clock, color: 'success' },
              ].map((s) => (
                <div key={s.label} className="card-dark text-center">
                  <div className="text-xl font-bold text-uptreek-gold mb-1">{s.value}</div>
                  <div className="text-xs text-uptreek-gray-mid">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Applications */}
            <h3 className="text-lg font-bold text-white">Your Applications</h3>
            <div className="space-y-3">
              {MOCK_APPLICATIONS.map((app) => (
                <div key={app.id} className="card-dark">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-uptreek-gold/10 border border-uptreek-gold/20 flex items-center justify-center shrink-0">
                      <app.icon size={18} className="text-uptreek-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-xs text-uptreek-gray-mid font-mono">{app.id}</span>
                        <span className={`text-xs font-medium ${
                          app.statusColor === 'success' ? 'text-uptreek-success' :
                          app.statusColor === 'warning' ? 'text-yellow-400' : 'text-uptreek-blue-glow'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white text-sm">{app.institution}</h4>
                      <p className="text-xs text-uptreek-gray-mid">{app.program}</p>
                      <div className="mt-2 mb-1">
                        <ProgressBar stage={app.stage} total={app.totalStages} />
                      </div>
                      <div className="flex justify-between text-xs text-uptreek-gray-mid">
                        <span>Stage {app.stage} of {app.totalStages}</span>
                        <span>Updated {app.lastUpdate}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-uptreek-gray-mid">
                        <ArrowRight size={11} className="text-uptreek-gold" />
                        {app.nextAction}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents */}
        {tab === 'documents' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white">Document Upload</h3>
              <span className="text-xs text-uptreek-gray-mid">
                {DOCS_NEEDED.filter((d) => d.status === 'uploaded').length} of {DOCS_NEEDED.length} uploaded
              </span>
            </div>
            <div className="space-y-2">
              {DOCS_NEEDED.map((doc) => (
                <div key={doc.name} className="card-dark flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {doc.status === 'uploaded' ? (
                      <CheckCircle size={18} className="text-uptreek-success shrink-0" />
                    ) : (
                      <AlertCircle size={18} className="text-uptreek-warning shrink-0" />
                    )}
                    <div>
                      <div className="text-sm font-medium text-white">{doc.name}</div>
                      {doc.required && <div className="text-xs text-uptreek-danger">Required</div>}
                    </div>
                  </div>
                  {doc.status === 'uploaded' ? (
                    <span className="badge-success text-xs">Uploaded</span>
                  ) : (
                    <button className="btn-primary text-xs py-1.5 px-3">
                      <Upload size={12} />
                      Upload
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {tab === 'messages' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Messages from Your Team</h3>
            <div className="space-y-3">
              {MOCK_MESSAGES.map((msg, i) => (
                <div key={i} className={`card-dark ${msg.unread ? 'border border-uptreek-gold/20' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-uptreek-navy-mid flex items-center justify-center text-lg shrink-0">
                      👤
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <div>
                          <span className="text-sm font-semibold text-white">{msg.from}</span>
                          <span className="ml-2 text-xs text-uptreek-gray-mid">{msg.role}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {msg.unread && <div className="w-2 h-2 rounded-full bg-uptreek-gold" />}
                          <span className="text-xs text-uptreek-gray-mid">{msg.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-dark">
              <h4 className="text-sm font-semibold text-white mb-3">Reply to your advisor</h4>
              <textarea
                className="form-input text-sm"
                rows={3}
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={() => { if (message.trim()) { setMessage(''); } }}
                className="btn-gold mt-3 text-sm py-2.5"
              >
                Send Message <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {(tab === 'admissions' || tab === 'visa' || tab === 'flights') && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white capitalize">{tab} Applications</h3>
            {MOCK_APPLICATIONS.filter((a) =>
              tab === 'admissions' ? a.type.includes('University') :
              tab === 'visa' ? a.type.includes('Visa') :
              a.type.includes('Flight')
            ).map((app) => (
              <div key={app.id} className="card-dark">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-uptreek-gold/10 flex items-center justify-center shrink-0">
                    <app.icon size={18} className="text-uptreek-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-white">{app.institution}</h4>
                      <span className={`text-xs font-medium ${
                        app.statusColor === 'success' ? 'text-uptreek-success' :
                        app.statusColor === 'warning' ? 'text-yellow-400' : 'text-uptreek-blue-glow'
                      }`}>{app.status}</span>
                    </div>
                    <p className="text-xs text-uptreek-gray-mid mb-2">{app.program}</p>
                    <ProgressBar stage={app.stage} total={app.totalStages} />
                    <div className="flex justify-between text-xs text-uptreek-gray-mid mt-1">
                      <span>Stage {app.stage} of {app.totalStages}</span>
                      <span>{app.lastUpdate}</span>
                    </div>
                    <p className="text-xs text-uptreek-gold mt-1.5">{app.nextAction}</p>
                  </div>
                </div>
              </div>
            ))}
            {MOCK_APPLICATIONS.filter((a) =>
              tab === 'admissions' ? a.type.includes('University') :
              tab === 'visa' ? a.type.includes('Visa') :
              a.type.includes('Flight')
            ).length === 0 && (
              <div className="card-dark text-center py-10">
                <p className="text-uptreek-gray-mid text-sm mb-4">No {tab} applications yet.</p>
                <button
                  onClick={() => navigate(tab === 'admissions' ? 'admissions' : tab === 'visa' ? 'visa' : 'flights')}
                  className="btn-gold text-sm"
                >
                  Start an Application <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
