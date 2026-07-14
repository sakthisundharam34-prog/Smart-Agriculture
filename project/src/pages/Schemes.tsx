import { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, Search, ExternalLink, FileText, FileCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { governmentSchemes } from '../lib/data';

const categories = ['All', 'Income Support', 'Crop Insurance', 'Soil Testing', 'Irrigation', 'Organic Farming', 'Credit'];

export default function Schemes() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = governmentSchemes.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.eligibility.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || s.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <PageHeader title="Government Schemes" subtitle="Discover central and state agriculture schemes you're eligible for." icon={Landmark} />

      <div className="section-pad !py-8">
        {/* Search + filter */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search schemes by name or eligibility..." className="input-field pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={`chip transition-colors ${category === c ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/30'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Scheme cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="glass-card p-6 flex flex-col hover:shadow-glow transition-all">
              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl">{s.emoji}</span>
                <span className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs">{s.category}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.name}</h3>

              <div className="space-y-2 text-sm flex-1">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Eligibility</p>
                  <p className="text-slate-600 dark:text-slate-400">{s.eligibility}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Benefits</p>
                  <p className="text-slate-600 dark:text-slate-400">{s.benefits}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Documents</p>
                  <ul className="text-xs text-slate-500 mt-1 space-y-0.5">
                    {s.documents.map((d, j) => <li key={j} className="flex items-center gap-1"><FileCheck className="w-3 h-3 text-primary-500" /> {d}</li>)}
                  </ul>
                </div>
              </div>

              <a href={s.link} target="_blank" rel="noopener noreferrer"
                className="mt-4 w-full py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                Apply Now <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <p className="text-slate-400">No schemes found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
