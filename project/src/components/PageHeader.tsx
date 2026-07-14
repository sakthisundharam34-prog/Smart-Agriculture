import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

export default function PageHeader({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon?: LucideIcon }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-700 text-white">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1200')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-transparent" />
      <div className="relative section-pad !py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {Icon && (
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
              <Icon className="w-7 h-7" />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          {subtitle && <p className="text-white/80 max-w-2xl text-lg">{subtitle}</p>}
        </motion.div>
      </div>
    </div>
  );
}
