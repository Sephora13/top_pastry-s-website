'use client';

import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import Toast from '../components/Toast';

const TopoBackground = () => (
  <div className={clsx('absolute', 'inset-0', 'z-0', 'pointer-events-none', 'opacity-[0.2]')}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="topo" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
          <path d="M 0 50 Q 100 0 200 50 T 400 50" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          <path d="M 0 100 Q 100 50 200 100 T 400 100" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          <path d="M 0 150 Q 100 100 200 150 T 400 150" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          <path d="M 0 200 Q 100 150 200 200 T 400 200" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          <path d="M 0 250 Q 100 200 200 250 T 400 250" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          <path d="M 0 300 Q 100 250 200 300 T 400 300" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          <path d="M 0 350 Q 100 300 200 350 T 400 350" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          <path d="M 0 80 Q 50 130 150 80 T 400 80" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
          <path d="M 0 180 Q 50 230 150 180 T 400 180" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
          <path d="M 0 280 Q 50 330 150 280 T 400 280" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#topo)" />
    </svg>
  </div>
);

const contactInfo = [
  { icon: faPhone, label: 'Téléphone', value: '+229 97 00 00 00' },
  { icon: faEnvelope, label: 'Email', value: 'sephoradidavi6@gmail.com' },
  { icon: faMapMarkerAlt, label: 'Adresse', value: 'Cotonou, Bénin' },
  { icon: faClock, label: 'Horaires', value: 'Lun-Sam : 8h-19h\nDim : 9h-14h' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setToast({ message: 'Veuillez remplir tous les champs obligatoires.', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.', type: 'success' });
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setToast({ message: data.error || 'Une erreur est survenue.', type: 'error' });
      }
    } catch {
      setToast({ message: 'Impossible de contacter le serveur. Veuillez réessayer.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: 'easeOut' as const },
  };

  return (
    <div className={clsx('bg-primary', 'text-white', 'min-h-screen', 'font-sans', 'selection:bg-white', 'selection:text-primary', 'overflow-x-hidden')}>
      <Header />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Hero Section */}
      <section className={clsx('relative', 'min-h-[70vh]', 'flex', 'flex-col', 'items-center', 'justify-center', 'pt-32', 'pb-20', 'px-6')}>
        <TopoBackground />
        <div className={clsx('relative', 'z-10', 'text-center', 'flex', 'flex-col', 'items-center', 'w-full', 'max-w-4xl')}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'backOut' as const }}
            className={clsx('w-28', 'h-28', 'md:w-36', 'md:h-36', 'rounded-full', 'border', 'border-white', 'flex', 'flex-col', 'items-center', 'justify-center', 'mb-16', 'md:mb-20', 'p-2', 'cursor-default', 'backdrop-blur-sm', 'bg-white/10')}
          >
            <span className={clsx('font-black', 'text-xl', 'md:text-2xl', 'leading-none')}>top.</span>
            <span className={clsx('font-black', 'text-xl', 'md:text-2xl', 'leading-none', 'mb-1', 'text-cream')}>pastry.</span>
            <span className={clsx('text-[6px]', 'md:text-[8px]', 'uppercase', 'tracking-widest', 'font-black', 'leading-tight', 'text-center')}>
              Traiteur & Food<br/>Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className={clsx('font-title', 'font-black', 'text-5xl', 'md:text-7xl', 'lg:text-[5.5rem]', 'leading-[1.05]', 'text-white', 'tracking-tight', 'mb-8')}
            style={{ textShadow: '0 10px 30px rgba(0, 0, 0, 0.5)' }}
          >
            Contactez-nous
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={clsx('text-lg', 'md:text-xl', 'text-white/80', 'max-w-2xl', 'mx-auto', 'leading-relaxed', 'font-medium')}
          >
            Une question, une commande spéciale ou un besoin particulier ? Notre équipe vous répond rapidement.
          </motion.p>
        </div>
      </section>

      {/* Info Cards + Form Section */}
      <section className={clsx('relative', 'bg-white', 'text-gray-800', 'py-24', 'md:py-32', 'px-6', 'rounded-t-[3rem]', '-mt-10', 'z-20')}>
        <div className={clsx('container', 'mx-auto', 'max-w-7xl')}>
          {/* Info Cards Grid */}
          <motion.div {...slideUp} className={clsx('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4', 'gap-6', 'mb-20')}>
            {contactInfo.map((info, idx) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={clsx('bg-cream', 'rounded-3xl', 'p-6', 'md:p-8', 'flex', 'flex-col', 'items-center', 'text-center', 'gap-4', 'shadow-lg', 'shadow-primary/5', 'hover:shadow-xl', 'hover:shadow-primary/10', 'transition-shadow', 'duration-300')}
              >
                <div className={clsx('w-14', 'h-14', 'rounded-2xl', 'bg-primary', 'flex', 'items-center', 'justify-center', 'shadow-md')}>
                  <FontAwesomeIcon icon={info.icon} className={clsx('w-6', 'h-6', 'text-white')} />
                </div>
                <div>
                  <h3 className={clsx('font-title', 'font-black', 'text-sm', 'text-primary', 'mb-2', 'tracking-wider')}>{info.label}</h3>
                  <p className={clsx('text-sm', 'text-gray-600', 'font-medium', 'leading-relaxed', 'whitespace-pre-line')}>{info.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form Section */}
          <motion.div
            {...slideUp}
            className={clsx('max-w-3xl', 'mx-auto', 'bg-cream', 'rounded-[40px]', 'p-8', 'md:p-12', 'shadow-2xl', 'shadow-primary/10')}
          >
            <h2 className={clsx('font-title', 'font-black', 'text-3xl', 'md:text-4xl', 'text-primary', 'text-center', 'mb-3')}>
              Envoyez-nous un message
            </h2>
            <p className={clsx('text-center', 'text-gray-500', 'text-sm', 'mb-10', 'font-medium')}>
              Remplissez le formulaire ci-dessous, nous vous répondrons rapidement.
            </p>

            <form onSubmit={handleSubmit} className={clsx('flex', 'flex-col', 'gap-6')}>
              <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6')}>
                <div className={clsx('flex', 'flex-col', 'gap-2')}>
                  <label htmlFor="name" className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider', 'text-primary/70')}>Nom complet *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Sophie Duboc"
                    value={form.name}
                    onChange={handleChange}
                    className={clsx('bg-white', 'border', 'border-gray-200', 'rounded-2xl', 'px-4', 'py-3.5', 'text-gray-800', 'outline-none', 'focus:border-primary', 'focus:ring-2', 'focus:ring-primary/20', 'transition-all', 'font-medium', 'text-sm', 'placeholder:text-gray-400')}
                  />
                </div>
                <div className={clsx('flex', 'flex-col', 'gap-2')}>
                  <label htmlFor="email" className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider', 'text-primary/70')}>Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={clsx('bg-white', 'border', 'border-gray-200', 'rounded-2xl', 'px-4', 'py-3.5', 'text-gray-800', 'outline-none', 'focus:border-primary', 'focus:ring-2', 'focus:ring-primary/20', 'transition-all', 'font-medium', 'text-sm', 'placeholder:text-gray-400')}
                  />
                </div>
              </div>

              <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6')}>
                <div className={clsx('flex', 'flex-col', 'gap-2')}>
                  <label htmlFor="phone" className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider', 'text-primary/70')}>Téléphone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+229 97 00 00 00"
                    value={form.phone}
                    onChange={handleChange}
                    className={clsx('bg-white', 'border', 'border-gray-200', 'rounded-2xl', 'px-4', 'py-3.5', 'text-gray-800', 'outline-none', 'focus:border-primary', 'focus:ring-2', 'focus:ring-primary/20', 'transition-all', 'font-medium', 'text-sm', 'placeholder:text-gray-400')}
                  />
                </div>
                <div className={clsx('flex', 'flex-col', 'gap-2')}>
                  <label htmlFor="subject" className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider', 'text-primary/70')}>Sujet *</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Commande spéciale"
                    value={form.subject}
                    onChange={handleChange}
                    className={clsx('bg-white', 'border', 'border-gray-200', 'rounded-2xl', 'px-4', 'py-3.5', 'text-gray-800', 'outline-none', 'focus:border-primary', 'focus:ring-2', 'focus:ring-primary/20', 'transition-all', 'font-medium', 'text-sm', 'placeholder:text-gray-400')}
                  />
                </div>
              </div>

              <div className={clsx('flex', 'flex-col', 'gap-2')}>
                <label htmlFor="message" className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider', 'text-primary/70')}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Décrivez votre demande..."
                  value={form.message}
                  onChange={handleChange}
                  className={clsx('bg-white', 'border', 'border-gray-200', 'rounded-2xl', 'px-4', 'py-3.5', 'text-gray-800', 'outline-none', 'focus:border-primary', 'focus:ring-2', 'focus:ring-primary/20', 'transition-all', 'font-medium', 'text-sm', 'resize-none', 'placeholder:text-gray-400')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={clsx(
                  'w-full', 'bg-primary', 'text-white', 'font-title', 'font-bold', 'text-sm', 'tracking-widest', 'py-4', 'rounded-full', 'uppercase', 'shadow-lg', 'shadow-primary/30', 'transition-all', 'duration-200', 'mt-4',
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer'
                )}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
