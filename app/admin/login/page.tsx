// src/app/admin/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize admin settings in localStorage if not present
  useEffect(() => {
    const storedSettings = localStorage.getItem('top_pastry_admin_settings');
    if (!storedSettings) {
      const defaultSettings = {
        companyName: 'Top Pastry',
        policies: {
          confidentiality: 'Politique de confidentialité de Top Pastry...',
          tos: 'Conditions générales de vente de Top Pastry...',
          returns: 'Politique de retour de Top Pastry...'
        },
        admins: [
          {
            email: 'admin@toppastry.com',
            password: 'admin123',
            name: 'Super Admin',
            role: 'super'
          }
        ]
      };
      localStorage.setItem('top_pastry_admin_settings', JSON.stringify(defaultSettings));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const storedSettings = localStorage.getItem('top_pastry_admin_settings');
      if (storedSettings) {
        try {
          const settings = JSON.parse(storedSettings);
          const adminList = settings.admins || [];
          
          const matchedAdmin = adminList.find(
            (admin: any) => admin.email.toLowerCase() === email.toLowerCase() && admin.password === password
          );

          if (matchedAdmin) {
            // Set cookie for middleware access (valid for 1 day)
            document.cookie = "admin_logged_in=true; path=/; max-age=86400; SameSite=Lax";
            document.cookie = `admin_email=${matchedAdmin.email}; path=/; max-age=86400; SameSite=Lax`;
            document.cookie = `admin_role=${matchedAdmin.role || 'admin'}; path=/; max-age=86400; SameSite=Lax`;
            
            // Redirect using window.location to trigger middleware check
            window.location.href = '/admin';
            return;
          }
        } catch (err) {
          console.error(err);
        }
      }

      // Default fallback credentials check
      if (email.toLowerCase() === 'admin@toppastry.com' && password === 'admin123') {
        document.cookie = "admin_logged_in=true; path=/; max-age=86400; SameSite=Lax";
        document.cookie = "admin_email=admin@toppastry.com; path=/; max-age=86400; SameSite=Lax";
        document.cookie = "admin_role=super; path=/; max-age=86400; SameSite=Lax";
        window.location.href = '/admin';
        return;
      }

      setError('Identifiants incorrects. Veuillez réessayer.');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12 px-4 relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-orange-medium/10 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 border border-white relative z-10"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-primary/10 text-primary rounded-full items-center justify-center mb-4">
            <span className="font-title font-black text-2xl">TP</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Espace Admin</h2>
          <p className="text-slate-400 text-xs font-bold mt-1.5 uppercase tracking-wider">Connexion sécurisée</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-3.5 rounded-2xl mb-6 text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-black text-slate-700 uppercase tracking-wider">Adresse Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input 
                id="email"
                type="email"
                required
                placeholder="Ex: admin@toppastry.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F9F9F9] border border-slate-200 rounded-2xl text-slate-900 text-sm font-semibold placeholder-slate-400 outline-none focus:bg-white focus:border-slate-400 transition-all"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs font-black text-slate-700 uppercase tracking-wider">Mot de Passe</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input 
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Saisissez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 bg-[#F9F9F9] border border-slate-200 rounded-2xl text-slate-900 text-sm font-semibold placeholder-slate-400 outline-none focus:bg-white focus:border-slate-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-title font-black py-3.5 rounded-2xl text-sm transition-all shadow-lg active:scale-95 transform duration-150 cursor-pointer"
            >
              {loading ? 'Connexion en cours...' : 'Se Connecter'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
            ← Retour à la boutique publique
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
