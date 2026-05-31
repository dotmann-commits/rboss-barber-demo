import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
  cta?: { label: string; page: string };
}

const QUICK_REPLIES = [
  'How do I apply for a UK student visa?',
  'What are your study abroad programs?',
  'Book a flight consultation',
  'Proof of funds help',
];

const BOT_RESPONSES: Record<string, { text: string; cta?: { label: string; page: string } }> = {
  visa: {
    text: "We help with Student, Tourist, Work, Business, and Family visas. Our team has a 95%+ success rate. Would you like to start an application? I can connect you to a visa specialist.",
    cta: { label: 'View Visa Services', page: 'visa' },
  },
  flight: {
    text: "We book domestic and international flights at competitive rates, including business class and group travel. Tell me your destination and travel dates, and we'll find the best options for you!",
    cta: { label: 'Book a Flight', page: 'flights' },
  },
  study: {
    text: "We process university admissions to UK, Canada, USA, Ireland, Germany, Australia, and more — for undergraduate, masters, PhD, and foundation programs. What country interests you?",
    cta: { label: 'Explore Admissions', page: 'admissions' },
  },
  funds: {
    text: "We assist with Proof of Funds documentation for visa applications. This includes bank statements, sponsor letters, and financial verification. Ready to check your eligibility?",
    cta: { label: 'Proof of Funds', page: 'proof-of-funds' },
  },
  tour: {
    text: "We have amazing packages to Dubai, Turkey, UK, Europe, Canada, and more across Africa! Packages include flights, accommodation, and guided tours. Prices start from ₦450,000.",
    cta: { label: 'View Travel Tours', page: 'tours' },
  },
  default: {
    text: "I'm Uptreek's AI assistant! I can help you with:\n• ✈️ Flight bookings\n• 🎓 University admissions\n• 🛂 Visa applications\n• 🌍 Travel tours\n• 💰 Proof of funds\n\nWhat can I help you with today?",
  },
};

function getBotResponse(input: string) {
  const lower = input.toLowerCase();
  if (lower.includes('visa') || lower.includes('student visa') || lower.includes('tourist')) return BOT_RESPONSES.visa;
  if (lower.includes('flight') || lower.includes('book') || lower.includes('travel')) return BOT_RESPONSES.flight;
  if (lower.includes('study') || lower.includes('admission') || lower.includes('university') || lower.includes('program')) return BOT_RESPONSES.study;
  if (lower.includes('fund') || lower.includes('proof') || lower.includes('financial')) return BOT_RESPONSES.funds;
  if (lower.includes('tour') || lower.includes('vacation') || lower.includes('package') || lower.includes('dubai') || lower.includes('turkey')) return BOT_RESPONSES.tour;
  return BOT_RESPONSES.default;
}

export default function AIChat() {
  const { navigate } = useNavigation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: "Hi! 👋 I'm Uptreek's AI travel advisor. I can help with flights, visas, study abroad, and travel packages. What are you looking for?",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [messages, open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: response.text,
        cta: response.cta,
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] max-w-sm z-50 chat-slide-up">
          <div className="glass-dark rounded-2xl overflow-hidden shadow-card flex flex-col" style={{ height: '480px' }}>
            {/* Header */}
            <div className="bg-gradient-to-r from-uptreek-blue-muted to-uptreek-navy-mid px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-uptreek-gold flex items-center justify-center">
                  <Sparkles size={16} className="text-uptreek-navy" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Uptreek AI Advisor</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-uptreek-success animate-pulse" />
                    <p className="text-xs text-uptreek-gray-mid">Online now</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-uptreek-gold/20 border border-uptreek-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={13} className="text-uptreek-gold" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                    <div
                      className={`px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-uptreek-blue text-white rounded-tr-none'
                          : 'bg-white/5 border border-white/10 text-white rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.cta && (
                      <button
                        onClick={() => {
                          navigate(msg.cta!.page as Parameters<typeof navigate>[0]);
                          setOpen(false);
                        }}
                        className="text-xs text-uptreek-gold hover:text-uptreek-gold-light border border-uptreek-gold/30 hover:border-uptreek-gold/60 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {msg.cta.label} →
                      </button>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-uptreek-blue/30 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={13} className="text-uptreek-blue-glow" />
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-lg bg-uptreek-gold/20 border border-uptreek-gold/30 flex items-center justify-center">
                    <Bot size={13} className="text-uptreek-gold" />
                  </div>
                  <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl rounded-tl-none">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-uptreek-gray-mid animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && (
              <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="shrink-0 text-xs border border-white/15 hover:border-uptreek-gold/40 text-uptreek-gray-mid hover:text-uptreek-gold px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3 border-t border-white/5 pt-2">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about flights, visas, study abroad..."
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder-uptreek-gray-mid text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-uptreek-gold transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl bg-uptreek-gold hover:bg-uptreek-gold-light disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <Send size={14} className="text-uptreek-navy" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-4 md:right-6 z-50 w-14 h-14 rounded-2xl bg-uptreek-gold hover:bg-uptreek-gold-light shadow-gold flex items-center justify-center transition-all duration-200 hover:scale-105 animate-pulse-gold"
      >
        {open ? (
          <X size={20} className="text-uptreek-navy" />
        ) : (
          <MessageCircle size={22} className="text-uptreek-navy" />
        )}
        {!open && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-uptreek-success flex items-center justify-center">
            <span className="text-[9px] text-white font-bold">1</span>
          </div>
        )}
      </button>
    </>
  );
}
