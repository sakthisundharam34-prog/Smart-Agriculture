import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Star } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const { user } = useAuth();
  const [form, setForm] = useState({ subject: '', message: '', rating: 5 });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { setStatus('error'); return; }
    setStatus('sending');
    const { error } = await supabase.from('feedback').insert({
      subject: form.subject, message: form.message, rating: form.rating,
    });
    if (error) setStatus('error');
    else { setStatus('sent'); setForm({ subject: '', message: '', rating: 5 }); setTimeout(() => setStatus('idle'), 3000); }
  };

  return (
    <div>
      <PageHeader title="Contact Us" subtitle="Have a question, feedback, or need help? We're here for you." icon={Mail} />

      <section className="section-pad">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info + Map */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-primary-600" /></div>
                <div><p className="font-semibold text-sm">Address</p><p className="text-sm text-slate-500 dark:text-slate-400">Dept. of Agricultural Engineering, Hill University, Tamil Nadu 643001, India</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-100 dark:bg-secondary-900/40 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-secondary-600" /></div>
                <div><p className="font-semibold text-sm">Phone</p><p className="text-sm text-slate-500 dark:text-slate-400">+91 98765 43210</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-900/40 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-accent-600" /></div>
                <div><p className="font-semibold text-sm">Email</p><p className="text-sm text-slate-500 dark:text-slate-400">support@smartagri.in</p></div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-card h-64">
              <iframe
                title="Map" className="w-full h-full" loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=76.0%2C11.0%2C76.8%2C11.5&layer=mapnik&marker=11.25%2C76.4"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass-card p-6 md:p-8">
              <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-primary-600" /> Send Feedback</h2>
              <p className="text-sm text-slate-500 mb-6">We'd love to hear about your experience.</p>

              {!user && (
                <div className="mb-4 p-3 rounded-lg bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-sm">
                  Please <a href="/login" className="font-semibold underline">log in</a> to submit feedback.
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Subject</label>
                  <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required disabled={!user}
                    placeholder="What's this about?" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={4} disabled={!user}
                    placeholder="Tell us more..." className="input-field resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })} disabled={!user}>
                        <Star className={`w-7 h-7 ${n <= form.rating ? 'text-accent-400 fill-accent-400' : 'text-slate-300'} transition-colors`} />
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" disabled={!user || status === 'sending'}
                  className="gradient-btn w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50">
                  {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent!' : <><Send className="w-4 h-4" /> Send Feedback</>}
                </button>
                {status === 'error' && <p className="text-sm text-error-500 text-center">Something went wrong. Please try again.</p>}
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
