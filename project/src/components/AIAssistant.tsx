import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Mic } from 'lucide-react';

type Msg = { role: 'bot' | 'user'; text: string };

const quickReplies = [
  'Best crop for hilly soil?',
  'How to treat leaf blight?',
  'When to irrigate potato?',
  'Today\'s weather forecast?',
];

// Simple rule-based responses for the demo assistant.
function botReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes('weather')) return 'Today in Coonoor: 18°C, partly cloudy, 72% humidity. Heavy rain expected Wednesday — delay fertilizer application.';
  if (q.includes('blight') || q.includes('disease')) return 'For leaf blight: remove infected leaves, apply copper-based fungicide (Mancozeb 0.2%), and improve air circulation. Organic option: neem oil spray 5ml/L weekly.';
  if (q.includes('irrigate') || q.includes('water') || q.includes('irrigation')) return 'Check soil moisture sensors first. For potato, irrigate when moisture drops below 40%. Use drip irrigation early morning to minimize evaporation in hilly slopes.';
  if (q.includes('crop') || q.includes('plant') || q.includes('grow')) return 'For hilly regions with loamy acidic soil, recommended crops: Cardamom (94% match), Tea (88%), Potato (82%), Ginger (79%). Visit the Crop Recommendation module for detailed yield projections.';
  if (q.includes('fertilizer') || q.includes('npk')) return 'Based on typical hilly soil: apply Vermicompost 2t/ha as basal, then NPK 10:10:10 at 30 days. Avoid excess nitrogen which invites disease.';
  if (q.includes('price') || q.includes('market')) return 'Today\'s mandi prices: Tomato ₹1,850/q (up), Potato ₹1,200/q (down), Cardamom ₹3,200/kg. Check the Market Prices module for full trends.';
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) return 'Hello! I\'m AgriBot, your AI farming assistant. Ask me about crops, weather, soil, diseases, irrigation, or market prices.';
  return 'I can help with crop selection, weather forecasts, soil analysis, disease treatment, irrigation scheduling, fertilizer plans, and market prices. Try one of the quick replies below!';
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'bot', text: 'Hi! I\'m AgriBot 🌱 — your AI farming assistant. Ask me anything about your crops, soil, weather, or pests!' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: 'bot', text: botReply(text) }]);
    }, 900);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 shadow-glow flex items-center justify-center text-white"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        aria-label="AI Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-pulse" />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[32rem] glass-card flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Sparkles className="w-4 h-4" /></div>
              <div>
                <p className="font-semibold text-sm">AgriBot Assistant</p>
                <p className="text-xs text-white/80 flex items-center gap-1"><span className="w-2 h-2 bg-green-300 rounded-full" /> Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-sm shadow-soft'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-soft flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-3 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((r) => (
                  <button key={r} onClick={() => send(r)} className="chip bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800/50">
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 border-t border-slate-200 dark:border-slate-700 flex gap-2 bg-white dark:bg-slate-900">
              <input
                value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about crops, weather, soil..."
                className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary-500/30"
              />
              <button type="button" className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><Mic className="w-4 h-4" /></button>
              <button type="submit" className="w-9 h-9 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center"><Send className="w-4 h-4" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
