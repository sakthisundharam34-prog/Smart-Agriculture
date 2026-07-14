import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Droplets, FlaskConical, Sprout, Save, RotateCcw, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';

type SoilInput = {
  moisture: string; nitrogen: string; phosphorus: string; potassium: string; ph: string; temperature: string; humidity: string;
};

const empty: SoilInput = { moisture: '', nitrogen: '', phosphorus: '', potassium: '', ph: '', temperature: '', humidity: '' };

function analyze(s: SoilInput) {
  const moisture = parseFloat(s.moisture) || 0;
  const n = parseFloat(s.nitrogen) || 0;
  const p = parseFloat(s.phosphorus) || 0;
  const k = parseFloat(s.potassium) || 0;
  const ph = parseFloat(s.ph) || 0;

  const healthScore = Math.round(
    (Math.min(moisture / 60, 1) * 25) +
    (Math.min(n / 100, 1) * 20) +
    (Math.min(p / 50, 1) * 20) +
    (Math.min(k / 80, 1) * 20) +
    (ph >= 5.5 && ph <= 7 ? 15 : 5)
  );

  const status = healthScore >= 75 ? 'Healthy' : healthScore >= 50 ? 'Moderate' : 'Poor';
  const statusColor = healthScore >= 75 ? 'success' : healthScore >= 50 ? 'warning' : 'error';
  const statusClasses = healthScore >= 75
    ? 'bg-success-50 dark:bg-success-900/30 text-success-600'
    : healthScore >= 50
    ? 'bg-warning-50 dark:bg-warning-900/30 text-warning-600'
    : 'bg-error-50 dark:bg-error-900/30 text-error-600';
  const barClasses = healthScore >= 75
    ? 'from-primary-500 to-primary-600'
    : healthScore >= 50
    ? 'from-accent-500 to-accent-600'
    : 'from-error-500 to-error-600';

  const suitableCrops: string[] = [];
  if (ph < 5.5) suitableCrops.push('Tea', 'Coffee', 'Potato');
  else if (ph > 7) suitableCrops.push('Cabbage', 'Cauliflower', 'Beetroot');
  else suitableCrops.push('Tomato', 'Cardamom', 'Ginger', 'Maize');

  if (n > 80) suitableCrops.push('Wheat', 'Rice');
  if (k > 60) suitableCrops.push('Potato', 'Ginger');

  const waterRec = moisture < 30 ? 'High — irrigate immediately, soil is dry' : moisture < 50 ? 'Medium — schedule irrigation within 2 days' : 'Low — soil moisture is adequate';

  const fertRec: string[] = [];
  if (n < 50) fertRec.push('Apply Urea or Vermicompost to boost Nitrogen');
  if (p < 30) fertRec.push('Apply Single Super Phosphate or Bone Meal for Phosphorus');
  if (k < 40) fertRec.push('Apply Muriate of Potash or Wood Ash for Potassium');
  if (fertRec.length === 0) fertRec.push('NPK levels are balanced — maintain with organic compost');

  return { healthScore, status, statusColor, statusClasses, barClasses, suitableCrops: [...new Set(suitableCrops)].slice(0, 5), waterRec, fertRec };
}

export default function SoilAnalysis() {
  const { user } = useAuth();
  const [input, setInput] = useState<SoilInput>(empty);
  const [result, setResult] = useState<ReturnType<typeof analyze> | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const fields: { key: keyof SoilInput; label: string; unit: string; placeholder: string }[] = [
    { key: 'moisture', label: 'Soil Moisture', unit: '%', placeholder: '40' },
    { key: 'nitrogen', label: 'Nitrogen (N)', unit: 'kg/ha', placeholder: '80' },
    { key: 'phosphorus', label: 'Phosphorus (P)', unit: 'kg/ha', placeholder: '35' },
    { key: 'potassium', label: 'Potassium (K)', unit: 'kg/ha', placeholder: '60' },
    { key: 'ph', label: 'Soil pH', unit: '0-14', placeholder: '6.5' },
    { key: 'temperature', label: 'Temperature', unit: '°C', placeholder: '18' },
    { key: 'humidity', label: 'Humidity', unit: '%', placeholder: '70' },
  ];

  const analyze_ = () => {
    setLoading(true);
    setTimeout(() => { setResult(analyze(input)); setLoading(false); }, 800);
  };

  const saveReport = async () => {
    if (!user || !result) return;
    await supabase.from('reports').insert({
      type: 'soil', title: 'Soil Analysis Report',
      summary: `Health: ${result.status} (${result.healthScore}%)`,
      details: { ...input, ...result },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const reset = () => { setInput(empty); setResult(null); };

  return (
    <div>
      <PageHeader title="Soil Analysis" subtitle="Input your soil parameters to get health score, suitable crops, and recommendations." icon={Layers} />

      <div className="section-pad !py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input form */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg mb-4">Soil Parameters</h3>
            <div className="grid grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium mb-1.5">{f.label}</label>
                  <div className="relative">
                    <input
                      type="number" step="any" value={input[f.key]}
                      onChange={(e) => setInput({ ...input, [f.key]: e.target.value })}
                      placeholder={f.placeholder} className="input-field pr-12" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">{f.unit}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={analyze_} disabled={loading || !input.moisture} className="gradient-btn flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FlaskConical className="w-4 h-4" /> Analyze Soil</>}
              </button>
              <button onClick={reset} className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass-card p-8 text-center h-full flex flex-col items-center justify-center">
                  <Layers className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
                  <p className="text-slate-400">Enter soil parameters and click Analyze to see results</p>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  {/* Health score */}
                  <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">Soil Health Score</h3>
                      <span className={`chip ${result.statusClasses}`}>{result.status}</span>
                    </div>
                    <div className="relative h-8 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${result.healthScore}%` }} transition={{ duration: 0.8 }}
                        className={`h-full rounded-full bg-gradient-to-r ${result.barClasses}`}
                      />
                    </div>
                    <p className="text-3xl font-bold mt-3">{result.healthScore}<span className="text-lg text-slate-400">/100</span></p>
                  </div>

                  {/* Suitable crops */}
                  <div className="glass-card p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2"><Sprout className="w-4 h-4 text-primary-500" /> Suitable Crops</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.suitableCrops.map((c) => (
                        <span key={c} className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">{c}</span>
                      ))}
                    </div>
                  </div>

                  {/* Water & Fertilizer */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="glass-card p-5">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Droplets className="w-4 h-4 text-secondary-500" /> Water</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{result.waterRec}</p>
                    </div>
                    <div className="glass-card p-5">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><FlaskConical className="w-4 h-4 text-accent-500" /> Fertilizer</h4>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        {result.fertRec.map((f, i) => <li key={i}>• {f}</li>)}
                      </ul>
                    </div>
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
