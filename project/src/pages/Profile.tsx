import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Briefcase, Save, CheckCircle2, Bell, FileText, Globe, Palette } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../lib/auth';
import { supabase, type Report } from '../lib/supabase';
import { useTheme } from '../lib/theme';

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const { theme, toggle } = useTheme();
  const [form, setForm] = useState({ full_name: '', phone: '', location: '', occupation: '', language: 'English' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [notifEnabled, setNotifEnabled] = useState(true);

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '', phone: profile.phone || '',
        location: profile.location || '', occupation: profile.occupation || 'Farmer',
        language: profile.language || 'English',
      });
    }
    (async () => {
      const { data } = await supabase.from('reports').select('*').order('created_at', { ascending: false }).limit(10);
      setReports((data as Report[]) || []);
    })();
  }, [profile]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from('profiles').upsert({
      id: user!.id, ...form, theme,
    });
    await refreshProfile();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields = [
    { key: 'full_name', label: 'Full Name', icon: User, type: 'text' },
    { key: 'phone', label: 'Phone', icon: Phone, type: 'tel' },
    { key: 'location', label: 'Location', icon: MapPin, type: 'text' },
    { key: 'occupation', label: 'Occupation', icon: Briefcase, type: 'text' },
  ] as const;

  return (
    <div>
      <PageHeader title="My Profile" subtitle="Manage your account, preferences, and saved reports." icon={User} />

      <div className="section-pad !py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="glass-card p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
              {(profile?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
            </div>
            <h3 className="font-semibold text-lg">{profile?.full_name || 'Farmer'}</h3>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <div className="flex justify-center gap-2 mt-3">
              <span className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">{profile?.occupation || 'Farmer'}</span>
              <span className="chip bg-secondary-50 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300">{profile?.location || 'Hilly Region'}</span>
            </div>
          </div>

          {/* Edit form */}
          <div className="lg:col-span-2 glass-card p-6">
            <h3 className="font-semibold text-lg mb-4">Edit Profile</h3>
            <form onSubmit={save} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {fields.map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium mb-1.5">{f.label}</label>
                    <div className="relative">
                      <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type={f.type} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="input-field pl-10" />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5"><Globe className="w-4 h-4" /> Language</label>
                <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className="input-field">
                  <option>English</option>
                  <option>Tamil</option>
                  <option>Hindi</option>
                </select>
              </div>

              {/* Settings */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2"><Palette className="w-4 h-4 text-primary-500" /> Dark Mode</span>
                  <button onClick={toggle} className={`w-11 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2"><Bell className="w-4 h-4 text-accent-500" /> Notifications</span>
                  <button onClick={() => setNotifEnabled((n) => !n)} className={`w-11 h-6 rounded-full transition-colors ${notifEnabled ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${notifEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>

              <button type="submit" disabled={saving} className="gradient-btn w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50">
                {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : saving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
            </form>
          </div>
        </div>

        {/* Saved reports */}
        <div className="glass-card p-6 mt-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-primary-500" /> Saved Reports</h3>
          {reports.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No saved reports yet. Run an analysis and save it to see it here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((r) => (
                <motion.div key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-sm font-bold text-primary-700">{r.type[0].toUpperCase()}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{r.title}</p>
                    <p className="text-xs text-slate-400">{r.summary} · {new Date(r.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className="chip bg-slate-100 dark:bg-slate-700 text-slate-500 text-xs capitalize">{r.type}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
