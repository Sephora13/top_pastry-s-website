"use client"
import Header from '../components/header';
import Footer from '../components/footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const TopoBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.2]">
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

export default function Galerie() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const slideUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  return (
    <div className="bg-primary text-white min-h-screen font-sans selection:bg-white selection:text-primary overflow-x-hidden">
      
      <Header />

      {/* Navbar Fixed Left */}
      <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-2xl"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
        <button className="bg-primary text-white py-3.5 rounded-full font-title font-bold text-sm tracking-wide border-2 border-white hover:bg-white hover:text-primary transition-colors shadow-2xl" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Ça m'intéresse
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 px-6">
        <TopoBackground />
        
        <div className="relative z-10 text-center flex flex-col items-center w-full max-w-5xl">
          {/* Logo Circle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" as const }}
            className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-white flex flex-col items-center justify-center mb-16 md:mb-24 p-2 cursor-default backdrop-blur-sm bg-white/10"
          >
            <span className="font-black text-xl md:text-2xl leading-none">top.</span>
            <span className="font-black text-xl md:text-2xl leading-none mb-1 text-cream">pastry.</span>
            <span className="text-[6px] md:text-[8px] uppercase tracking-widest font-black leading-tight text-center">
              Traiteur & Food<br/>Experience
            </span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1 
            className="font-title font-black text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-white tracking-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ textShadow: "0 10px 30px rgba(0, 0, 0, 0.5)" }}
          >
            Ton événement mérite<br/>mieux qu’un simple service<br/>traiteur...
          </motion.h1>
        </div>
      </section>

      {/* Pourquoi Nous Choisir */}
      <section className="relative bg-white text-gray-800 py-24 md:py-32 px-6 rounded-t-[3rem] -mt-10 z-20">
        <div className="container mx-auto max-w-7xl">
          <motion.div {...slideUp} className="text-center mb-16 md:mb-20 max-w-4xl mx-auto">
            <h2 className="font-title font-black text-5xl md:text-7xl text-primary mb-6">Pourquoi nous<br/>choisir ?</h2>
            <p className="text-sm md:text-base font-medium leading-relaxed text-gray-600">
              Depuis 2021, nous t’accompagnons avec des solutions traiteur pensées pour tous tes événements 
              d'entreprise. Attire de nouveaux prospects, crée de vrais moments de convivialité au bureau et 
              chouchoute tes clients pour leur montrer ta reconnaissance. Une expérience simple, gourmande et efficace pour marquer les esprits.
            </p>
          </motion.div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div 
              {...slideUp}
              className="relative w-full aspect-4/3 rounded-4xl overflow-hidden group cursor-pointer shadow-xl"
            >
              <Image src="/image/bg2.jpg" alt="Savoir Faire" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/50 to-transparent flex flex-col justify-end p-8 md:p-12">
                <h3 className="font-title font-black text-3xl md:text-4xl text-white mb-4">Un savoir-faire né de l'exigence</h3>
                <p className="text-sm md:text-base font-medium text-white/90 leading-relaxed max-w-md">
                  Notre équipe a accompagné les plus belles marques et institutions à travers des 
                  séminaires, cocktails, galas et lancements. Chaque prestation est pensée comme une œuvre 
                  d'art culinaire: rigueur, créativité et service discret, du brief initial au dernier toast.
                </p>
              </div>
            </motion.div>

            <motion.div 
              {...slideUp} transition={{ delay: 0.2, duration: 0.8 }}
              className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl"
            >
              <Image src="/image/bg3.jpg" alt="Experience" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/50 to-transparent flex flex-col justify-end p-8 md:p-12">
                <h3 className="font-title font-black text-3xl md:text-4xl text-white mb-4">Une expérience sur mesure</h3>
                <p className="text-sm md:text-base font-medium text-white/90 leading-relaxed max-w-md">
                  Aucun événement ne se ressemble. Nous concevons des solutions totalement personnalisées, 
                  du menu à la mise en scène selon tes besoins, tes contraintes et tes ambitions. 
                  Flexibles, réactifs, et toujours force de proposition.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <TopoBackground />
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.h2 
            {...slideUp}
            className="font-title font-black text-4xl md:text-6xl lg:text-7xl text-white mb-16"
          >
            Ils ont adoré nos<br/>services mais<br/>surtout nos plats
          </motion.h2>

          <motion.div 
            {...slideUp}
            className="relative w-full max-w-3xl mx-auto rounded-[2rem] overflow-hidden bg-[#331C13]/40 backdrop-blur-sm p-4 md:p-6 shadow-2xl border border-white/10 aspect-video md:aspect-[16/10] flex items-center justify-center"
          >
            <div className="w-full h-full relative rounded-[1.5rem] overflow-hidden bg-black flex items-center justify-center group cursor-pointer">
              {/* Pseudo Video Thumbnail - Using one of the gallery pieces */}
              <Image src="/image/Screenshot_20251028_122602_WhatsAppBusiness.jpg" alt="Video Placeholder" fill className="object-cover opacity-60 transition-opacity group-hover:opacity-40" />
              <i className="fas fa-play text-white text-5xl opacity-80 group-hover:scale-110 transition-transform"></i>
              
              {/* Video control bar mock */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 to-transparent flex items-center px-4 justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <i className="fas fa-pause"></i>
                  <span>0:00 / 0:37</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-volume-up"></i>
                  <i className="fas fa-expand"></i>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Collage Section */}
      <section className="relative bg-cream py-24 md:py-32 px-6 z-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <motion.div 
              {...slideUp}
              className="relative w-full aspect-[4/5] md:aspect-auto md:h-full rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg"
            >
              <Image src="/image/Screenshot_20251028_122602_WhatsAppBusiness.jpg" alt="Equipe fun" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <div className="flex flex-col gap-4 md:gap-6">
              <motion.div 
                {...slideUp} transition={{ delay: 0.2, duration: 0.8 }}
                className="relative w-full aspect-[16/9] md:aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg"
              >
                <Image src="/image/Screenshot_20251028_122712_WhatsAppBusiness.jpg" alt="Meeting Food" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
              <motion.div 
                {...slideUp} transition={{ delay: 0.4, duration: 0.8 }}
                className="relative w-full aspect-[16/9] md:aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg"
              >
                <Image src="/image/Screenshot_20251028_123049_WhatsAppBusiness.jpg" alt="Team Huddle" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="bg-primary text-white py-24 px-6 relative overflow-hidden">
        <TopoBackground />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-title font-black text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight"
          >
            Réservez nos services<br/>pour votre événement
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Du buffet gourmand aux créations sur-mesure, Top Pastry sublime toutes vos rencontres professionnelles ou privées.
          </motion.p>
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl text-left border border-white/20 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold mb-2">Nom / Entreprise</label>
                <input type="text" className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input type="email" className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white" placeholder="votre@email.com" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold mb-2">Type d'événement</label>
                <select className="w-full bg-primary-dark border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white appearance-none">
                  <option>Séminaire / Entreprise</option>
                  <option>Mariage / Anniversaire</option>
                  <option>Cocktail privé</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Nombre d'invités estimé</label>
                <input type="number" className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white" placeholder="Ex: 50" />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-bold mb-2">Détails de votre demande</label>
              <textarea rows={4} className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white resize-none" placeholder="Précisez nous ce que vous recherchez..."></textarea>
            </div>
            <button type="button" className="w-full bg-white text-primary font-title font-black py-4 rounded-xl hover:bg-cream transition-colors shadow-lg active:scale-95 transform duration-200">
              Envoyer ma demande
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer Area */}
      <Footer />
    </div>
  );
}
