import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Save, RotateCcw, TrendingUp, Calendar, FlaskConical, Lightbulb, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { cropRecommendations } from '../lib/data';

const states = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Himachal Pradesh', 'Uttarakhand', 'Sikkim', 'West Bengal'];
const districts: Record<string, string[]> = {
  'Tamil Nadu': ['Coonoor', 'Ooty', 'Kodaikanal', 'Yercaud'],
  'Kerala': ['Munnar', 'Wayanad', 'Idukki', 'Palakkad'],
  'Karnataka': ['Chikmagalur', 'Coorg', 'Shimoga', 'Hassan'],
  'Himachal Pradesh': ['Shimla', 'Kullu', 'Manali', 'Solan'],
  'Uttarakhand': ['Dehradun', 'Nainital', 'Almora', 'Mussoorie'],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan'],
  'West Bengal': ['Darjeeling', 'Kalimpong', 'Kurseong'],
};
const soilTypes = ['Loamy', 'Sandy', 'Clay', 'Silty', 'Peaty'];
const seasons = ['Kharif', 'Rabi', 'Zaid', 'All Year'];

export default function CropRecommendation() {
  const { user } = useAuth();
  const [form, setForm] = useState({ state: '', district: '', temperature: '', humidity: '', rainfall: '', soilType: '', soilPh: '', season: '' });
  const [result, setResult] = useState<typeof cropRecommendations | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const analyze = () => {
    setLoading(true);
    setTimeout(() => { setResult(cropRecommendations); setLoading(false); }, 1000);
  };

  const saveReport = async () => {
    if (!user || !result) return;
    await supabase.from('reports').insert({
      type: 'crop', title: 'Crop Recommendation Report',
      summary: `Top crop: ${result[0].name} (${result[0].confidence}% confidence)`,
      details: { input: form, recommendations: result },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields = [
    { key: 'temperature', label: 'Temperature', unit: '°C', placeholder: '18' },
    { key: 'humidity', label: 'Humidity', unit: '%', placeholder: '70' },
    { key: 'rainfall', label: 'Rainfall', unit: 'mm', placeholder: '1200' },
    { key: 'soilPh', label: 'Soil pH', unit: '0-14', placeholder: '6.0' },
  ];

  return (
    <div>
      <PageHeader title="Crop Recommendation" subtitle="Get AI-powered crop suggestions based on your region, soil, and climate." icon={Sprout} />

      <div className="section-pad !py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg mb-4">Farm Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">State</label>
                  <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value, district: '' })} className="input-field">
                    <option value="">Select state</option>
                    {states.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">District</label>
                  <select value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} disabled={!form.state} className="input-field disabled:opacity-50">
                    <option value="">Select district</option>
                    {(districts[form.state] || []).map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium mb-1.5">{f.label}</label>
                  <div className="relative">
                    <input type="number" step="any" value={form[f.key as keyof typeof form]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} className="input-field pr-12" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">{f.unit}</span>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Soil Type</label>
                  <select value={form.soilType} onChange={(e) => setForm({ ...form, soilType: e.target.value })} className="input-field">
                    <option value="">Select type</option>
                    {soilTypes.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Season</label>
                  <select value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value })} className="input-field">
                    <option value="">Select season</option>
                    {seasons.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={analyze} disabled={loading || !form.state} className="gradient-btn flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Sprout className="w-4 h-4" /> Get Recommendations</>}
                </button>
                <button onClick={() => { setForm({ state: '', district: '', temperature: '', humidity: '', rainfall: '', soilType: '', soilPh: '', season: '' }); setResult(null); }} className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card p-8 text-center h-full flex flex-col items-center justify-center">
                  <Sprout className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
                  <p className="text-slate-400">Fill in your farm details to get personalized crop recommendations</p>
                </motion.div>
              ) : (
                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {result.map((c, i) => (
                    <motion.div key={c.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{c.emoji}</span>
                          <div>
                            <h3 className="font-semibold text-lg">{c.name}</h3>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                              <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {c.expectedYield}</span>
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {c.harvestTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-bold">
                            {c.confidence}% match
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{c.expectedProfit}</p>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 mt-3">
                        <div>
                          <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1"><Lightbulb className="w-3 h-3" /> Growing Tips</p>
                          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                            {c.growingTips.map((t, j) => <li key={j}>• {t}</li>)}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1"><FlaskConical className="w-3 h-3" /> Fertilizers</p>
                          <div className="flex flex-wrap gap-1">
                            {c.fertilizers.map((f, j) => <span key={j} className="chip bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-[10px]">{f}</span>)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {user && (
                    <button onClick={saveReport} className="w-full py-3 rounded-xl border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors flex items-center justify-center gap-2">
                      {saved ? <><CheckCircle2 className="w-4 h-4" /> Report Saved!</> : <><Save className="w-4 h-4" /> Save Report</>}
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
