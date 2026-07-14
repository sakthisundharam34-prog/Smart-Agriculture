import { motion } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { CloudSun, Droplets, Wind, Sun, Gauge, CloudRain, AlertTriangle, MapPin, Thermometer } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { currentWeather, weatherForecast, weatherAlerts } from '../lib/data';

const metrics = [
  { label: 'Temperature', value: `${currentWeather.temp}°C`, icon: Thermometer, color: 'from-accent-500 to-accent-600' },
  { label: 'Humidity', value: `${currentWeather.humidity}%`, icon: Droplets, color: 'from-secondary-500 to-secondary-600' },
  { label: 'Rainfall', value: `${currentWeather.rainfall}mm`, icon: CloudRain, color: 'from-primary-500 to-primary-600' },
  { label: 'Wind Speed', value: `${currentWeather.wind} km/h`, icon: Wind, color: 'from-slate-500 to-slate-600' },
  { label: 'UV Index', value: `${currentWeather.uv}`, icon: Sun, color: 'from-accent-400 to-accent-500' },
  { label: 'Pressure', value: `${currentWeather.pressure} hPa`, icon: Gauge, color: 'from-secondary-400 to-secondary-500' },
];

export default function Weather() {
  return (
    <div>
      <PageHeader title="Weather Forecast" subtitle={`7-day hyperlocal forecast for ${currentWeather.location}`} icon={CloudSun} />

      <div className="section-pad !py-8">
        {/* Current weather hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-9xl opacity-10">⛅</div>
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="flex items-center gap-1 text-sm text-slate-500 mb-2"><MapPin className="w-4 h-4" /> {currentWeather.location}</p>
              <div className="flex items-center gap-4">
                <span className="text-7xl">⛅</span>
                <div>
                  <p className="text-5xl font-bold">{currentWeather.temp}°C</p>
                  <p className="text-slate-500">{currentWeather.condition}</p>
                  <p className="text-sm text-slate-400">Feels like {currentWeather.feelsLike}°C</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center"><Droplets className="w-6 h-6 mx-auto text-secondary-500 mb-1" /><p className="font-semibold">{currentWeather.humidity}%</p><p className="text-xs text-slate-400">Humidity</p></div>
              <div className="text-center"><Wind className="w-6 h-6 mx-auto text-slate-500 mb-1" /><p className="font-semibold">{currentWeather.wind}</p><p className="text-xs text-slate-400">km/h</p></div>
              <div className="text-center"><CloudRain className="w-6 h-6 mx-auto text-primary-500 mb-1" /><p className="font-semibold">{currentWeather.rainfall}mm</p><p className="text-xs text-slate-400">Rain</p></div>
            </div>
          </div>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4 text-center">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mx-auto mb-2`}>
                <m.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg font-bold">{m.value}</p>
              <p className="text-xs text-slate-500">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Alerts */}
        <div className="space-y-3 mb-8">
          {weatherAlerts.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl flex items-start gap-3 ${a.severity === 'warning' ? 'bg-accent-50 dark:bg-accent-900/30 border-l-4 border-accent-500' : 'bg-secondary-50 dark:bg-secondary-900/30 border-l-4 border-secondary-500'}`}>
              <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${a.severity === 'warning' ? 'text-accent-600' : 'text-secondary-600'}`} />
              <div>
                <p className="font-semibold text-sm">{a.title}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{a.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 7-day forecast cards */}
        <h3 className="font-semibold text-lg mb-4">7-Day Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {weatherForecast.map((d, i) => (
            <motion.div key={d.day} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card p-4 text-center hover:shadow-glow transition-shadow">
              <p className="font-semibold text-sm mb-1">{d.day}</p>
              <p className="text-3xl mb-1">{d.icon}</p>
              <p className="text-lg font-bold">{d.temp}°C</p>
              <p className="text-xs text-slate-500">{d.condition}</p>
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 space-y-0.5">
                <p>💧 {d.rainfall}mm</p>
                <p>💨 {d.wind}km/h</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Temperature & Rainfall Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weatherForecast}>
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2.5} fill="url(#tempGrad)" name="Temp (°C)" />
                <Area type="monotone" dataKey="rainfall" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#rainGrad)" name="Rain (mm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Humidity & Wind</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={weatherForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="humidity" stroke="#16a34a" strokeWidth={2.5} name="Humidity (%)" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="wind" stroke="#64748b" strokeWidth={2.5} name="Wind (km/h)" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
