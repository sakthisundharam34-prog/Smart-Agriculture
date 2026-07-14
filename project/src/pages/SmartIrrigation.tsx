import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Droplets, Power, Gauge, Activity, Calendar, Zap, Clock, TrendingDown } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const weekData = [
  { day: 'Mon', usage: 320, recommended: 350 },
  { day: 'Tue', usage: 280, recommended: 350 },
  { day: 'Wed', usage: 410, recommended: 350 },
  { day: 'Thu', usage: 300, recommended: 350 },
  { day: 'Fri', usage: 260, recommended: 350 },
  { day: 'Sat', usage: 340, recommended: 350 },
  { day: 'Sun', usage: 290, recommended: 350 },
];

export default function SmartIrrigation() {
  const [motorOn] = useState(false);
  const [autoMode, setAutoMode] = useState(true);

  const stats = [
    { label: 'Soil Moisture', value: '42%', icon: Droplets, color: 'from-secondary-500 to-secondary-600', sub: 'Optimal range' },
    { label: 'Tank Level', value: '78%', icon: Gauge, color: 'from-primary-500 to-primary-600', sub: 'Good' },
    { label: "Today's Usage", value: '290L', icon: Activity, color: 'from-accent-500 to-accent-600', sub: 'Below target' },
    { label: 'Recommended', value: '350L', icon: Zap, color: 'from-primary-600 to-secondary-600', sub: 'AI calculated' },
  ];

  return (
    <div>
      <PageHeader title="Smart Irrigation" subtitle="Monitor and control your irrigation system with real-time sensor data." icon={Droplets} />

      <div className="section-pad !py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className="text-xs text-primary-500 mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Motor control */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Power className="w-5 h-5 text-primary-500" /> Motor Control</h3>
            <div className="flex flex-col items-center">
              <button
                onClick={() => setAutoMode(false)}
                disabled={!autoMode}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-white transition-all ${motorOn ? 'bg-gradient-to-br from-primary-500 to-primary-700 shadow-glow' : 'bg-slate-300 dark:bg-slate-700'} ${!autoMode ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
              >
                <Power className="w-10 h-10" />
              </button>
              <p className="mt-3 font-semibold">{motorOn ? 'Motor ON' : 'Motor OFF'}</p>
              <p className="text-xs text-slate-500">{autoMode ? 'Switch to manual to control' : 'Tap to toggle'}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Automatic Mode</span>
                <button
                  onClick={() => setAutoMode((a) => !a)}
                  className={`w-11 h-6 rounded-full transition-colors ${autoMode ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${autoMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">{autoMode ? 'AI controls motor based on soil moisture' : 'Manual control enabled'}</p>
            </div>
          </div>

          {/* Tank visual */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Gauge className="w-5 h-5 text-secondary-500" /> Water Tank</h3>
            <div className="flex justify-center">
              <div className="relative w-32 h-48 rounded-2xl border-4 border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800">
                <motion.div
                  initial={{ height: 0 }} animate={{ height: '78%' }} transition={{ duration: 1 }}
                  className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-secondary-600 to-secondary-400"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-white/30 animate-pulse" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white drop-shadow">78%</span>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-slate-500 mt-3">390L of 500L capacity</p>
          </div>

          {/* Schedule */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-accent-500" /> Irrigation Schedule</h3>
            <div className="space-y-3">
              {[
                { time: '06:00', zone: 'Zone A — Tea plot', status: 'Completed' },
                { time: '08:30', zone: 'Zone B — Vegetable garden', status: 'Completed' },
                { time: '17:00', zone: 'Zone C — Cardamom', status: 'Scheduled' },
                { time: '19:30', zone: 'Zone D — Ginger beds', status: 'Scheduled' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xs font-bold text-primary-700">{s.time}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{s.zone}</p>
                    <p className={`text-xs ${s.status === 'Completed' ? 'text-success-500' : 'text-accent-500'}`}>{s.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage chart */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><Calendar className="w-5 h-5 text-primary-500" /> Weekly Water Usage</h3>
            <span className="chip bg-success-50 dark:bg-success-900/30 text-success-600 flex items-center gap-1"><TrendingDown className="w-3 h-3" /> 12% saved</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
              <Area type="monotone" dataKey="usage" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#waterGrad)" name="Used (L)" />
              <Area type="monotone" dataKey="recommended" stroke="#16a34a" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Recommended (L)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
