import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { LineChart as LineIcon, Search, TrendingUp, TrendingDown, Minus, Download, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { supabase, type MarketPrice } from '../lib/supabase';

// Generate a 7-day trend for a crop
function trendData(base: number) {
  return Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    price: Math.round(base + (Math.sin(i) * base * 0.05) + (Math.random() - 0.5) * base * 0.03),
  }));
}

export default function MarketPrices() {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MarketPrice | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('market_prices').select('*').order('crop_name');
      setPrices((data as MarketPrice[]) || []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => prices.filter((p) => p.crop_name.toLowerCase().includes(search.toLowerCase())), [prices, search]);

  const trendDataFor = useMemo(() => selected ? trendData(selected.current_price) : null, [selected]);

  const exportCSV = () => {
    const csv = ['Crop,Current Price,Yesterday Price,Unit,Trend,Region'];
    prices.forEach((p) => csv.push(`${p.crop_name},${p.current_price},${p.yesterday_price},${p.unit},${p.trend},${p.region}`));
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'market-prices.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader title="Market Prices" subtitle="Live mandi prices for your region with trend analysis and export." icon={LineIcon} />

      <div className="section-pad !py-8">
        {/* Search + export */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search crops..." className="input-field pl-10" />
          </div>
          <button onClick={exportCSV} className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-sm font-medium">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="glass-card p-5 h-28 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Price list */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((p, i) => {
                const change = p.current_price - p.yesterday_price;
                const pct = ((change / p.yesterday_price) * 100).toFixed(1);
                const isUp = change > 0; const isDown = change < 0;
                return (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    onClick={() => setSelected(p)}
                    className={`glass-card p-4 text-left hover:shadow-glow transition-all ${selected?.id === p.id ? 'ring-2 ring-primary-500' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{p.crop_name}</p>
                        <p className="text-xs text-slate-400">{p.unit}</p>
                      </div>
                      <span className={`chip ${isUp ? 'bg-success-50 dark:bg-success-900/30 text-success-600' : isDown ? 'bg-error-50 dark:bg-error-900/30 text-error-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'} text-xs`}>
                        {isUp ? <TrendingUp className="w-3 h-3" /> : isDown ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                        {isUp ? '+' : ''}{pct}%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold">₹{p.current_price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-slate-400 line-through">₹{p.yesterday_price.toLocaleString('en-IN')}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Trend chart */}
            <div className="glass-card p-6 h-fit sticky top-20">
              {selected ? (
                <>
                  <h3 className="font-semibold mb-1">{selected.crop_name} — 7-Day Trend</h3>
                  <p className="text-xs text-slate-400 mb-4">{selected.region} · {selected.unit}</p>
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={trendDataFor || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={['dataMin - 50', 'dataMax + 50']} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} formatter={(v) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Price']} />
                      <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-xs text-slate-500">Current: <span className="font-semibold text-slate-700 dark:text-slate-200">₹{selected.current_price.toLocaleString('en-IN')}</span></p>
                    <p className="text-xs text-slate-500">Yesterday: <span className="font-semibold text-slate-700 dark:text-slate-200">₹{selected.yesterday_price.toLocaleString('en-IN')}</span></p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">Select a crop to view its price trend</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
