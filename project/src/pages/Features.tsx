import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { allFeatures } from '../lib/data';
import * as Icons from 'lucide-react';

export default function Features() {
  return (
    <div>
      <PageHeader title="Features" subtitle="Twelve powerful modules covering every stage of the farming cycle — from soil to sale." icon={Icons.Grid3x3} />

      <section className="section-pad">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allFeatures.map((f, i) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[f.icon] ?? Icons.Sprout;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card overflow-hidden group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{f.desc}</p>
                  <Link to={`/${f.title.toLowerCase().replace(/\s/g, '-')}`} className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 font-medium hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
