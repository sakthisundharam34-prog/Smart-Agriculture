import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  Droplets, CloudSun, Sprout, TrendingUp, Bell, Calendar,
  Activity, ArrowUpRight, ArrowDownRight, ScanLine, Layers, FlaskConical,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../lib/auth';
import { supabase, type Notification, type Report } from '../lib/supabase';
import { currentWeather } from '../lib/data';

const yieldData = [
  { month: 'Jan', yield: 1.2, target: 1.5 },
  { month: 'Feb', yield: 1.4, target: 1.5 },
  { month: 'Mar', yield: 1.8, target: 1.6 },
  { month: 'Apr', yield: 2.1, target: 1.8 },
  { month: 'May', yield: 2.4, target: 2.0 },
  { month: 'Jun', yield: 2.0, target: 2.0 },
  { month: 'Jul', yield: 2.3, target: 2.2 },
  { month: 'Aug', yield: 2.6, target: 2.3 },
];

const cropDist = [
  { name: 'Tea', value: 35, color: '#16a34a' },
  { name: 'Potato', value: 25, color: '#f59e0b' },
  { name: 'Cardamom', value: 20, color: '#0ea5e9' },
  { name: 'Ginger', value: 12, color: '#c47d44' },
  { name: 'Other', value: 8, color: '#94a3b8' },
];

const waterData = [
  { day: 'Mon', usage: 320, recommended: 350 },
  { day: 'Tue', usage: 280, recommended: 350 },
  { day: 'Wed', usage: 410, recommended: 350 },
  { day: 'Thu', usage: 300, recommended: 350 },
  { day: 'Fri', usage: 260, recommended: 350 },
  { day: 'Sat', usage: 340, recommended: 350 },
  { day: 'Sun', usage: 290, recommended: 350 },
];

const statCards = [
  { label: 'Soil Moisture', value: '42%', trend: 'up', change: '+5%', icon: Droplets, color: 'from-secondary-500 to-secondary-600' },
  { label: 'Avg Temperature', value: '18°C', trend: 'down', change: '-2°C', icon: CloudSun, color: 'from-accent-500 to-accent-600' },
  { label: 'Crop Health', value: 'Good', trend: 'up', change: 'Stable', icon: Sprout, color: 'from-primary-500 to-primary-600' },
  { label: 'Monthly Profit', value: '₹84k', trend: 'up', change: '+12%', icon: TrendingUp, color: 'from-primary-600 to-secondary-600' },
];

const recentModules = [
  { label: 'Disease Detection', to: '/disease-detection', icon: ScanLine, desc: 'Upload leaf photo' },
  { label: 'Soil Analysis', to: '/soil', icon: Layers, desc: 'Check soil health' },
  { label: 'Crop Recommendation', to: '/crop-recommendation', icon: Sprout, desc: 'Find best crops' },
  { label: 'Fertilizer Plan', to: '/fertilizer', icon: FlaskConical, desc: 'Get fertilizer advice' },
];

export default function Dashboard() {
  const { profile } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    (async () => {
      const { data: notifs } = await supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(5);
      setNotifications((notifs as Notification[]) || []);
      const { data: reps } = await supabase.from('reports').select('*').order('created_at', { ascending: false }).limit(5);
      setReports((reps as Report[]) || []);
    })();
  }, []);

  return (
    <div>
      <PageHeader title="Farmer Dashboard" subtitle={`Welcome back, ${profile?.full_name || 'Farmer'}! Here's your farm overview.`} icon={Activity} />

      <div className="section-pad !py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${s.trend === 'up' ? 'text-success-600' : 'text-error-600'}`}>
                  {s.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{s.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Yield line chart */}
          <div className="lg:col-span-2 glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Yield vs Target (tonnes)</h3>
              <span className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600">Monthly</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={yieldData}>
                <defs>
                  <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 32px -12px rgba(0,0,0,0.15)' }} />
                <Area type="monotone" dataKey="yield" stroke="#16a34a" strokeWidth={2.5} fill="url(#yieldGrad)" name="Yield" />
                <Line type="monotone" dataKey="target" stroke="#0ea5e9" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Crop distribution pie */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Crop Distribution</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={cropDist} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3}>
                  {cropDist.map((c) => <Cell key={c.name} fill={c.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water usage bar + weather widget */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 glass-card p-6">
            <h3 className="font-semibold mb-4">Water Usage (Litres/day)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Bar dataKey="usage" fill="#0ea5e9" radius={[6, 6, 0, 0]} name="Used" />
                <Bar dataKey="recommended" fill="#bae6fd" radius={[6, 6, 0, 0]} name="Recommended" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weather widget */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Weather Now</h3>
              <span className="text-xs text-slate-500">{currentWeather.location}</span>
            </div>
            <div className="text-center mb-4">
              <p className="text-5xl">⛅</p>
              <p className="text-3xl font-bold mt-2">{currentWeather.temp}°C</p>
              <p className="text-sm text-slate-500">{currentWeather.condition}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"><p className="font-semibold">{currentWeather.humidity}%</p><p className="text-slate-400">Humidity</p></div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"><p className="font-semibold">{currentWeather.wind} km/h</p><p className="text-slate-400">Wind</p></div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"><p className="font-semibold">{currentWeather.rainfall}mm</p><p className="text-slate-400">Rain</p></div>
            </div>
            <Link to="/weather" className="block text-center text-sm text-primary-600 dark:text-primary-400 mt-4 hover:underline">View 7-day forecast →</Link>
          </div>
        </div>

        {/* Bottom row: quick actions + notifications + recent reports */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick actions */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {recentModules.map((m) => (
                <Link key={m.to} to={m.to} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors group">
                  <m.icon className="w-6 h-6 text-primary-600 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium">{m.label}</p>
                  <p className="text-xs text-slate-400">{m.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2"><Bell className="w-4 h-4 text-accent-500" /> Notifications</h3>
            </div>
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-sm text-slate-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
                No notifications yet
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-3 rounded-lg text-sm ${n.read ? 'bg-slate-50 dark:bg-slate-800/30' : 'bg-primary-50 dark:bg-primary-900/20 border-l-2 border-primary-500'}`}>
                    <p className="font-medium">{n.title}</p>
                    {n.body && <p className="text-xs text-slate-500 mt-0.5">{n.body}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent reports */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-secondary-500" /> Recent Reports</h3>
            {reports.length === 0 ? (
              <div className="text-center py-8 text-sm text-slate-400">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-40" />
                No saved reports yet
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((r) => (
                  <div key={r.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-xs font-bold text-primary-700">{r.type[0].toUpperCase()}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{r.title}</p>
                      <p className="text-xs text-slate-400">{new Date(r.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
