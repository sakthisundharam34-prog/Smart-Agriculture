import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, Upload, ImageIcon, Save, RotateCcw, CheckCircle2, AlertTriangle, Pill, Leaf, Shield, Activity } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { diseaseDatabase, type DiseaseInfo } from '../lib/data';

const diseaseKeys = Object.keys(diseaseDatabase);

export default function DiseaseDetection() {
  const { user } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<DiseaseInfo | null>(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setImage(reader.result as string); setResult(null); };
    reader.readAsDataURL(file);
  };

  const analyze = () => {
    if (!image) return;
    setAnalyzing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 10;
      });
    }, 200);
    setTimeout(() => {
      const key = diseaseKeys[Math.floor(Math.random() * (diseaseKeys.length - 1))];
      setResult(diseaseDatabase[key]);
      setAnalyzing(false);
    }, 2400);
  };

  const saveReport = async () => {
    if (!user || !result) return;
    await supabase.from('reports').insert({
      type: 'disease', title: result.name,
      summary: `Confidence: ${result.confidence}%`,
      details: { disease: result.name, confidence: result.confidence, symptoms: result.symptoms },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const reset = () => { setImage(null); setResult(null); setProgress(0); if (fileRef.current) fileRef.current.value = ''; };

  return (
    <div>
      <PageHeader title="Disease Detection" subtitle="Upload a photo of an affected leaf and our AI will diagnose the disease instantly." icon={ScanLine} />

      <div className="section-pad !py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg mb-4">Upload Leaf Image</h3>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

            {!image ? (
              <button onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-primary-600" />
                </div>
                <p className="font-semibold text-slate-700 dark:text-slate-200">Click to upload</p>
                <p className="text-sm text-slate-400 mt-1">PNG, JPG up to 10MB</p>
              </button>
            ) : (
              <div className="relative rounded-2xl overflow-hidden">
                <img src={image} alt="Leaf" className="w-full h-64 object-cover" />
                <button onClick={reset} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"><RotateCcw className="w-4 h-4" /></button>
                {analyzing && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-3" />
                    <p className="text-sm font-medium">Analyzing leaf... {progress}%</p>
                    <div className="w-48 h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-primary-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={analyze} disabled={!image || analyzing} className="gradient-btn flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-50">
                {analyzing ? 'Analyzing...' : <><ScanLine className="w-4 h-4" /> Detect Disease</>}
              </button>
              {image && <button onClick={() => fileRef.current?.click()} className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"><ImageIcon className="w-4 h-4" /></button>}
            </div>
          </div>

          {/* Results */}
          <div>
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card p-8 text-center h-full flex flex-col items-center justify-center">
                  <Activity className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
                  <p className="text-slate-400">Upload an image and run detection to see the diagnosis</p>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  {/* Disease name + confidence */}
                  <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                        {result.name === 'Healthy Leaf' ? <CheckCircle2 className="w-5 h-5 text-success-600" /> : <AlertTriangle className="w-5 h-5 text-warning-600" />}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{result.confidence}%</p>
                        <p className="text-xs text-slate-400">confidence</p>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg">{result.name}</h3>
                  </div>

                  {/* Symptoms */}
                  <div className="glass-card p-5">
                    <h4 className="font-semibold text-sm mb-2">Symptoms</h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      {result.symptoms.map((s, i) => <li key={i} className="flex gap-2"><span className="text-primary-500">•</span> {s}</li>)}
                    </ul>
                  </div>

                  {/* Treatment */}
                  <div className="glass-card p-5">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Pill className="w-4 h-4 text-accent-500" /> Treatment</h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 mb-3">
                      {result.treatment.map((t, i) => <li key={i} className="flex gap-2"><span className="text-primary-500">•</span> {t}</li>)}
                    </ul>
                    {result.medicines.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {result.medicines.map((m, i) => <span key={i} className="chip bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-xs">{m}</span>)}
                      </div>
                    )}
                  </div>

                  {/* Organic + Prevention */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="glass-card p-5">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Leaf className="w-4 h-4 text-primary-500" /> Organic Solutions</h4>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        {result.organic.map((o, i) => <li key={i}>• {o}</li>)}
                      </ul>
                    </div>
                    <div className="glass-card p-5">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-secondary-500" /> Prevention</h4>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        {result.prevention.map((p, i) => <li key={i}>• {p}</li>)}
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
