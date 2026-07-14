import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Users, BrainCircuit, Sprout, MapPin, Star,
  Droplets, CloudSun, ScanLine, LineChart, Landmark, Quote, Plus, Minus,
} from 'lucide-react';
import { stats, benefits, testimonials, faqs } from '../lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, BrainCircuit, Sprout, MapPin, Droplets, CloudSun, ScanLine, LineChart, Landmark,
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Hilly terraced farming" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-secondary-900/85" />
        </div>

        <div className="relative section-pad !py-0 min-h-[90vh] flex items-center w-full">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-sm font-medium mb-6"
            >
              <Sprout className="w-4 h-4" /> AI-Powered Farming for Hilly Regions
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            >
              Smart Agriculture for{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 via-accent-300 to-secondary-300">
                Efficient Cultivation
              </span>{' '}
              in Hilly Regions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl leading-relaxed"
            >
              Monitor weather, soil, crops, and irrigation in real time. Detect diseases with AI, get personalized recommendations, and track market prices — all designed for the unique challenges of hill farming.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/features" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Explore Features <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Get Started Free
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-1"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="section-pad !py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center hover:shadow-glow transition-shadow"
              >
                {Icon && <Icon className="w-8 h-8 mx-auto mb-3 text-primary-600 dark:text-primary-400" />}
                <p className="text-3xl font-bold gradient-text">{s.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad !py-16">
        <div className="text-center mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-3">
            Everything Your Farm Needs
          </motion.h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            From soil to market, our AI-powered platform covers every step of the farming cycle for hilly terrain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const Icon = iconMap[b.icon];
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card p-6 group hover:shadow-glow transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {Icon && <Icon className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA banner */}
      <section className="section-pad !py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-600 p-10 md:p-16 text-center">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1200')", backgroundSize: 'cover' }} />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Your Farm?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">Join 12,400+ farmers using Smart Agriculture to increase yield, save water, and grow smarter in hilly regions.</p>
            <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold shadow-lg hover:-translate-y-0.5 transition-all">
              Create Free Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad !py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Loved by Farmers</h2>
          <p className="text-slate-500 dark:text-slate-400">Real stories from farmers in hilly regions across India.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <Quote className="w-8 h-8 text-primary-400 mb-3" />
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s < t.rating ? 'text-accent-400 fill-accent-400' : 'text-slate-300'}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad !py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-semibold text-sm md:text-base">{f.q}</span>
                  {openFaq === i ? <Minus className="w-5 h-5 text-primary-500 shrink-0" /> : <Plus className="w-5 h-5 text-primary-500 shrink-0" />}
                </button>
                <motion.div
                  initial={false} animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
