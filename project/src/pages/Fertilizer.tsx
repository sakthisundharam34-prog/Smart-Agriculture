import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Save, RotateCcw, CheckCircle2, Leaf, Beaker, Clock, Gauge } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';

const crops = ['Tea', 'Coffee', 'Potato', 'Cardamom', 'Ginger', 'Tomato', 'Cabbage', 'Wheat', 'Rice', 'Maize'];
const seasons = ['Kharif', 'Rabi', 'Zaid'];

type FertResult = {
  organic: { name: string; quantity: string; timing: string };
  chemical: { name: string; quantity: string; timing: string };
  dosage: string;
  applicationTime: string;
};

function recommend(crop: string, n: number, p: number, k: number, season: string): FertResult {
  const organicMap: Record<string, string> = {
    Tea: 'Vermicompost', Coffee: 'Farmyard Manure', Potato: 'Cow dung compost',
    Cardamom: 'Neem cake', Ginger: 'Mustard cake', Tomato: 'Compost tea',
    Cabbage: 'Bone meal', Wheat: 'Vermicompost', Rice: 'Green manure', Maize: 'Farmyard Manure',
  };
  const chemicalMap: Record<string, string> = {
    Tea: 'NPK 10:10:10', Coffee: 'NPK 15:15:15', Potato: 'NPK 15:15:15',
    Cardamom: 'NPK 12:12:18', Ginger: 'NPK 20:20:20', Tomato: 'NPK 19:19:19',
    Cabbage: 'Urea + DAP', Wheat: 'DAP + Urea', Rice: 'DAP + MOP', Maize: 'Urea + SSP',
  };
  return {
    organic: { name: organicMap[crop] || 'Vermicompost', quantity: `${2 + Math.round((100 - n) / 20)} t/ha`, timing: 'Apply as basal dose before sowing' },
    chemical: { name: chemicalMap[crop] || 'NPK 15:15:15', quantity: `${50 + Math.round((100 - n) / 5)} kg/ha`, timing: 'Split into 3 doses at 0, 30, 60 days' },
    dosage: `Apply ${Math.round((80 - n) / 10)} kg/ha Urea if N is low. Add ${Math.round((50 - p) / 10)} kg/ha SSP if P is low. Add ${Math.round((60 - k) / 10)} kg/ha MOP if K is low.`,
    applicationTime: season === 'Kharif' ? 'Apply early morning to avoid volatilization losses' : 'Apply in evening and irrigate immediately after',
  };
}

export default function Fertilizer() {
  const { user } = useAuth();
  const [crop, setCrop] = useState('');
  const [npk, setNpk] = useState({ n: '', p: '', k: '' });
  const [season, setSeason] = useState('');
  const [result, setResult] = useState<FertResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const analyze = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(recommend(crop, parseFloat(npk.n) || 50, parseFloat(npk.p) || 30, parseFloat(npk.k) || 40, season));
      setLoading(false);
    }, 800);
  };

  const saveReport = async () => {
    if (!user || !result) return;
    await supabase.from('reports').insert({
      type: 'fertilizer', title: `Fertilizer Plan — ${crop}`,
      summary: `Organic: ${result.organic.name}, Chemical: ${result.chemical.name}`,
      details: { crop, npk, season, result },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader title="Fertilizer Recommendation" subtitle="Get organic and chemical fertilizer plans with dosage and timing for your crop." icon={FlaskConical} />

      <div className="section-pad !py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg mb-4">Crop & Soil Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Crop</label>
                <select value={crop} onChange={(e) => setCrop(e.target.value)} className="input-field">
                  <option value="">Select crop</option>
                  {crops.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(['n', 'p', 'k'] as const).map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1.5">{key === 'n' ? 'Nitrogen' : key === 'p' ? 'Phosphorus' : 'Potassium'}</label>
                    <input type="number" value={npk[key]} onChange={(e) => setNpk({ ...npk, [key]: e.target.value })} placeholder="50" className="input-field" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Season</label>
                <select value={season} onChange={(e) => setSeason(e.target.value)} className="input-field">
                  <option value="">Select season</option>
                  {seasons.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={analyze} disabled={loading || !crop} className="gradient-btn flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FlaskConical className="w-4 h-4" /> Get Recommendation</>}
                </button>
                <button onClick={() => { setCrop(''); setNpk({ n: '', p: '', k: '' }); setSeason(''); setResult(null); }} className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
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
                  <FlaskConical className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
                  <p className="text-slate-400">Select a crop and enter NPK values to get fertilizer advice</p>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="glass-card p-5">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><Leaf className="w-4 h-4 text-primary-500" /> Organic Fertilizer</h4>
                    <p className="text-lg font-semibold text-primary-700 dark:text-primary-300">{result.organic.name}</p>
                    <div className="flex gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5" /> {result.organic.quantity}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{result.organic.timing}</p>
                  </div>

                  <div className="glass-card p-5">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><Beaker className="w-4 h-4 text-accent-500" /> Chemical Fertilizer</h4>
                    <p className="text-lg font-semibold text-accent-700 dark:text-accent-300">{result.chemical.name}</p>
                    <div className="flex gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5" /> {result.chemical.quantity}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{result.chemical.timing}</p>
                  </div>

                  <div className="glass-card p-5">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Clock className="w-4 h-4 text-secondary-500" /> Dosage & Timing</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{result.dosage}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{result.applicationTime}</p>
                  </div>

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
