import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">Smart<span className="text-primary-400">Agri</span></span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-powered agriculture platform helping farmers in hilly regions cultivate smarter, save water, and increase yield.
            </p>
            <div className="flex gap-3 mt-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link to="/features" className="hover:text-primary-400 transition-colors">Features</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/schemes" className="hover:text-primary-400 transition-colors">Govt. Schemes</Link></li>
            </ul>
          </div>

          {/* Modules */}
          <div>
            <h4 className="font-semibold text-white mb-4">Modules</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/weather" className="hover:text-primary-400 transition-colors">Weather Forecast</Link></li>
              <li><Link to="/soil" className="hover:text-primary-400 transition-colors">Soil Analysis</Link></li>
              <li><Link to="/disease-detection" className="hover:text-primary-400 transition-colors">Disease Detection</Link></li>
              <li><Link to="/irrigation" className="hover:text-primary-400 transition-colors">Smart Irrigation</Link></li>
              <li><Link to="/market-prices" className="hover:text-primary-400 transition-colors">Market Prices</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" /> Dept. of Agricultural Engineering, Hill University, Tamil Nadu</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary-400 shrink-0" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary-400 shrink-0" /> support@smartagri.in</li>
            </ul>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email for newsletter" className="flex-1 px-3 py-2 rounded-lg bg-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-primary-500" />
              <button className="px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 transition-colors"><Send className="w-4 h-4 text-white" /></button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Smart Agriculture for Hilly Regions. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary-400">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400">Terms</a>
            <a href="#" className="hover:text-primary-400">Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
