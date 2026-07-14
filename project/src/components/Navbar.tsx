import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Menu, X, Sun, Moon, ChevronDown, LayoutDashboard, CloudSun,
  ScanLine, Sprout, LineChart, Landmark, Droplets, FlaskConical, Layers,
  LogIn, UserPlus, LogOut, User,
} from 'lucide-react';
import { useTheme } from '../lib/theme';
import { useAuth } from '../lib/auth';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Features', to: '/features' },
  { label: 'Contact', to: '/contact' },
];

const moduleLinks = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Weather', to: '/weather', icon: CloudSun },
  { label: 'Soil Analysis', to: '/soil', icon: Layers },
  { label: 'Crop Recommendation', to: '/crop-recommendation', icon: Sprout },
  { label: 'Disease Detection', to: '/disease-detection', icon: ScanLine },
  { label: 'Smart Irrigation', to: '/irrigation', icon: Droplets },
  { label: 'Fertilizer', to: '/fertilizer', icon: FlaskConical },
  { label: 'Market Prices', to: '/market-prices', icon: LineChart },
  { label: 'Govt. Schemes', to: '/schemes', icon: Landmark },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { theme, toggle } = useTheme();
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setModulesOpen(false); setUserMenu(false); }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-soft border-b border-slate-200/60 dark:border-slate-800/60' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-slate-900 dark:text-white hidden sm:block">
            Smart<span className="gradient-text">Agri</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === l.to ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'}`}>
              {l.label}
            </Link>
          ))}

          {/* Modules dropdown */}
          <div className="relative" onMouseEnter={() => setModulesOpen(true)} onMouseLeave={() => setModulesOpen(false)}>
            <button className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1">
              Modules <ChevronDown className={`w-4 h-4 transition-transform ${modulesOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {modulesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 pt-2 w-72"
                >
                  <div className="glass-card p-2 grid grid-cols-2 gap-1">
                    {moduleLinks.map((m) => (
                      <Link key={m.to} to={m.to} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                        <m.icon className="w-4 h-4 shrink-0" /> {m.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <Sun className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Moon className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {user ? (
            <div className="relative" onMouseEnter={() => setUserMenu(true)} onMouseLeave={() => setUserMenu(false)}>
              <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-semibold">
                  {(profile?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
              </button>
              <AnimatePresence>
                {userMenu && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 pt-2 w-56">
                    <div className="glass-card p-2">
                      <div className="px-3 py-2 border-b border-slate-200/60 dark:border-slate-700/60 mb-1">
                        <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{profile?.full_name || 'Farmer'}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-primary-50 dark:hover:bg-primary-900/30 text-slate-700 dark:text-slate-200">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-primary-50 dark:hover:bg-primary-900/30 text-slate-700 dark:text-slate-200">
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-error-50 dark:hover:bg-error-900/30 text-error-600 dark:text-error-400">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5">
                <LogIn className="w-4 h-4" /> Login
              </Link>
              <Link to="/register" className="gradient-btn px-4 py-2 text-sm flex items-center gap-1.5">
                <UserPlus className="w-4 h-4" /> Register
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen((o) => !o)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-primary-900/30">
                  {l.label}
                </Link>
              ))}
              <p className="px-3 pt-3 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">Modules</p>
              {moduleLinks.map((m) => (
                <Link key={m.to} to={m.to} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-primary-900/30">
                  <m.icon className="w-4 h-4" /> {m.label}
                </Link>
              ))}
              {!user && (
                <div className="pt-3 flex gap-2">
                  <Link to="/login" className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">Login</Link>
                  <Link to="/register" className="flex-1 gradient-btn px-4 py-2 text-sm text-center">Register</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
