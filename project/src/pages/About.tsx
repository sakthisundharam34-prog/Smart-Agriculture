import { motion } from 'framer-motion';
import { Target, Eye, Rocket, Lightbulb, GraduationCap, Leaf, TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const objectives = [
  'Develop an AI-powered system for real-time weather, soil, and crop monitoring in hilly terrain',
  'Enable early disease detection through image-based machine learning models',
  'Optimize irrigation and fertilizer use to conserve water and reduce input costs',
  'Provide market price intelligence to help farmers sell at the right time',
  'Bridge the digital divide for small and marginal farmers in remote hilly areas',
];

const advantages = [
  'Hyperlocal weather alerts for microclimates unique to hilly slopes',
  'Offline-capable PWA so farmers stay productive without connectivity',
  'Multilingual support (English & Tamil) for broader accessibility',
  'AI disease detection works with basic smartphone cameras',
  'Integrated scheme discovery connects farmers to government subsidies',
];

const futureScope = [
  'IoT sensor integration for automated soil moisture & NPK readings',
  'Drone-based crop health surveillance over large terraced farms',
  'Satellite imagery analysis for regional yield prediction',
  'Voice-first interface for farmers with low literacy',
  'Blockchain-based supply chain traceability from farm to market',
];

const tech = ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Supabase', 'PostgreSQL', 'Row Level Security'];

const team = [
  { name: 'Project Guide', role: 'Prof. Agricultural Engineering', initials: 'PG' },
  { name: 'Team Lead', role: 'Final Year Student', initials: 'TL' },
  { name: 'Member 2', role: 'Full-Stack Developer', initials: 'M2' },
  { name: 'Member 3', role: 'ML & Data Engineer', initials: 'M3' },
];

export default function About() {
  return (
    <div>
      <PageHeader title="About the Project" subtitle="Implementation of Smart Agriculture for Efficient Cultivation in Hilly Regions" icon={Leaf} />

      {/* Overview */}
      <section className="section-pad">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Project Overview</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Agriculture in hilly regions faces unique challenges — steep slopes, erratic rainfall, poor soil retention, and limited access to technology. Traditional farming methods often lead to low yields and high water wastage.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Our Smart Agriculture platform leverages AI, IoT-ready sensors, and real-time data to help hill farmers make informed decisions about what to grow, when to irrigate, how to treat diseases, and when to sell — all from a smartphone.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <img src="https://images.pexels.com/photos/162809/farmer-field-rice-production-asia-162809.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Hill farming" className="rounded-3xl shadow-card w-full" />
            <div className="absolute -bottom-4 -left-4 glass-card p-4 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-primary-600" />
              <div><p className="text-2xl font-bold gradient-text">30%</p><p className="text-xs text-slate-500">Avg. yield increase</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-16">
        <div className="section-pad !py-0">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Farmers in hilly regions lack access to real-time weather forecasts, soil health data, and expert crop advice. Unpredictable weather, soil erosion, and pest outbreaks cause significant crop losses. Existing agriculture apps are designed for plains and do not account for the microclimates and terraced farming patterns of hill terrain.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mb-4"><Target className="w-6 h-6 text-primary-600" /></div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">To empower hill farmers with affordable, AI-driven tools that increase productivity, conserve water, and improve livelihoods — making smart farming accessible to every smallholder.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-secondary-100 dark:bg-secondary-900/40 flex items-center justify-center mb-4"><Eye className="w-6 h-6 text-secondary-600" /></div>
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">A future where every hilly-region farmer has a personal AI agriculture assistant in their pocket — bridging the technology gap and building sustainable, climate-resilient farming communities.</p>
          </motion.div>
        </div>
      </section>

      {/* Objectives & Advantages */}
      <section className="section-pad !pt-0">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-accent-500" /> Objectives</h3>
            <ul className="space-y-3">
              {objectives.map((o, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Rocket className="w-5 h-5 text-primary-500" /> Advantages</h3>
            <ul className="space-y-3">
              {advantages.map((a, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Leaf className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" /> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Future scope */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-16">
        <div className="section-pad !py-0">
          <h3 className="text-xl font-semibold mb-4">Future Scope</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {futureScope.map((f, i) => (
              <div key={i} className="glass-card p-4 text-sm text-slate-600 dark:text-slate-300">{f}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="section-pad">
        <h3 className="text-xl font-semibold mb-4 text-center">Technology Used</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {tech.map((t) => (
            <span key={t} className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">{t}</span>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section-pad !pt-0">
        <h3 className="text-xl font-semibold mb-6 text-center">Team & Guide</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {team.map((m) => (
            <div key={m.name} className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">{m.initials}</div>
              <p className="font-semibold text-sm">{m.name}</p>
              <p className="text-xs text-slate-500 mt-1">{m.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 glass-card p-6 flex items-center gap-4 justify-center">
          <GraduationCap className="w-10 h-10 text-primary-600" />
          <div className="text-center">
            <p className="font-semibold">Department of Agricultural Engineering</p>
            <p className="text-sm text-slate-500">Hill University, Tamil Nadu, India</p>
          </div>
        </div>
      </section>
    </div>
  );
}
