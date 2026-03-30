// src/app/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';
import { motion, AnimatePresence } from 'framer-motion';

const TopoBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.2]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="topo" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
          <path d="M 0 50 Q 100 0 200 50 T 400 50" fill="none" stroke="#63256A" strokeWidth="0.5" />
          <path d="M 0 100 Q 100 50 200 100 T 400 100" fill="none" stroke="#63256A" strokeWidth="0.5" />
          <path d="M 0 150 Q 100 100 200 150 T 400 150" fill="none" stroke="#63256A" strokeWidth="0.5" />
          <path d="M 0 200 Q 100 150 200 200 T 400 200" fill="none" stroke="#63256A" strokeWidth="0.5" />
          <path d="M 0 250 Q 100 200 200 250 T 400 250" fill="none" stroke="#63256A" strokeWidth="0.5" />
          <path d="M 0 300 Q 100 250 200 300 T 400 300" fill="none" stroke="#63256A" strokeWidth="0.5" />
          <path d="M 0 350 Q 100 300 200 350 T 400 350" fill="none" stroke="#63256A" strokeWidth="0.5" />
          
          <path d="M 0 80 Q 50 130 150 80 T 400 80" fill="none" stroke="#63256A" strokeWidth="0.5" opacity="0.5" />
          <path d="M 0 180 Q 50 230 150 180 T 400 180" fill="none" stroke="#63256A" strokeWidth="0.5" opacity="0.5" />
          <path d="M 0 280 Q 50 330 150 280 T 400 280" fill="none" stroke="#63256A" strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#topo)" />
    </svg>
  </div>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.1 },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-cream flex flex-col pt-24 md:pt-32 overflow-hidden min-h-screen">
        <TopoBackground />

        <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pb-[250px] md:pb-[350px]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="text-left w-full order-2 lg:order-1 mt-10 md:mt-0 z-20"
          >
            <h1 className="text-primary text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tight">
              Lorem ipsum
            </h1>
            <p className="text-[#333] text-base md:text-lg mb-2 font-medium tracking-wide max-w-lg">
              Lorem ipsum dolor
            </p>
            <p className="text-[#333] text-base md:text-lg mb-2 font-medium tracking-wide max-w-lg">
              ipsum lorem ipsum lorem
            </p>
            <p className="text-[#333] text-base md:text-lg mb-10 font-bold tracking-wide max-w-lg">
              ipsum lorem ipsum lorem ipsum
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-10 py-3.5 rounded-full font-bold hover:bg-primary-dark transition text-sm tracking-wider uppercase shadow-xl"
            >
              CTA
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className="relative h-[350px] w-[350px] md:h-[500px] md:w-[500px] lg:h-[650px] lg:w-[650px] mx-auto order-1 lg:order-2 rounded-full shadow-[0_0_80px_rgba(255,255,255,0.8)] z-10"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/70 w-full h-full rounded-full blur-[80px] -z-10" />
            <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl z-10">
              <Image
                src="/image/hero_cake.png"
                alt="Delicious Cake"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Curve & Categories */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          {/* Custom SVG wrapper to perfectly match the mockup bottom curve */}
          <div className="w-full h-[250px] md:h-[350px] overflow-hidden relative">
             <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full text-[#FFF] fill-current drop-shadow-lg">
               <path d="M0,320 L1440,320 L1440,160 C1120,320 320,320 0,160 Z"></path>
             </svg>
          </div>
          <div className="absolute -bottom-[200px] md:-bottom-[450px] left-1/2 transform -translate-x-1/2 pointer-events-auto z-30">
            {/* The outer rotating container */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
              className="relative w-[400px] h-[400px] md:w-[900px] md:h-[900px] rounded-full flex items-center justify-center bg-[#FDE2C3]" // Matching the filled background color from image
            >
              {/* Inner concentric circle matching the reference image */}
              <div className="absolute w-[200px] h-[200px] md:w-[450px] md:h-[450px] bg-[#FFF6E7] rounded-full opacity-60"></div>

              {/* Generate 8 circles making a complete circumference positioned via XY coordinates */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const angle = i * 45; // in degrees
                const rad = (angle * Math.PI) / 180;
                // Mobile radius ~ 150, Desktop radius ~ 350
                const radiusMobile = 160;
                const radiusDesktop = 360;
                
                const xMobile = radiusMobile * Math.sin(rad);
                const yMobile = -radiusMobile * Math.cos(rad);
                
                const xDesktop = radiusDesktop * Math.sin(rad);
                const yDesktop = -radiusDesktop * Math.cos(rad);

                return (
                  <div 
                    key={i} 
                    className="absolute top-1/2 left-1/2"
                    // Custom style block to handle responsive translation via clamp/calc isn't easy, 
                    // so we use CSS custom properties or simple static inline styles for md+ overrides if possible.
                    // Instead of complex CSS, we apply a single wrapper that translates, then a motion block that counter-rotates.
                  >
                    {/* Desktop pos */}
                    <div 
                      className="hidden md:block absolute" 
                      style={{ transform: `translate(-50%, -50%) translate(${xDesktop}px, ${yDesktop}px)` }}
                    >
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-[120px] h-[120px] bg-white rounded-full shadow-lg flex items-center justify-center"></div>
                        <span className="text-lg font-bold text-[#63256A] mt-4 tracking-wide w-max">Lorem ipsum</span>
                      </motion.div>
                    </div>

                    {/* Mobile pos */}
                    <div 
                      className="block md:hidden absolute" 
                      style={{ transform: `translate(-50%, -50%) translate(${xMobile}px, ${yMobile}px)` }}
                    >
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-[60px] h-[60px] bg-white rounded-full shadow-md flex items-center justify-center"></div>
                        <span className="text-xs font-bold text-[#63256A] mt-2 tracking-wide w-max">Lorem ipsum</span>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2
            {...fadeInUp}
            className="text-3xl md:text-4xl font-black mb-6 text-center text-primary tracking-tight"
          >
            Lorem ipsum
          </motion.h2>

          {/* Navigation Tabs */}
          <div className="flex justify-center flex-wrap gap-8 md:gap-14 mb-16 border-b border-gray-100 max-w-2xl mx-auto">
            {['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'].map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`pb-3 text-sm font-bold tracking-wide relative transition-colors ${
                  activeTab === idx ? 'text-primary' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab}
                {activeTab === idx && (
                  <motion.div
                    layoutId="activeTabProduct"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 max-w-6xl mx-auto">
            {[
              { name: 'Lorem ipsum', img: '/image/gateau2.jpg', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', price: '25000 FCFA' },
              { name: 'Lorem ipsum', img: '/image/gateau3.jpg', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', price: '25000 FCFA' },
              { name: 'Lorem ipsum', img: '/image/gateau4.jpg', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', price: '25000 FCFA' }
            ].map((item, index) => (
              <AnimatePresence key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl mb-8 z-10 relative cursor-pointer"
                  >
                    <Image src={item.img} alt={item.name} fill className="object-cover" />
                  </motion.div>
                  <h3 className="font-extrabold text-[#111] text-2xl mb-3">{item.name}</h3>
                  <p className="text-gray-500 text-xs md:text-sm text-center px-4 mb-8 leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                  <div className="w-full flex items-center justify-between px-2 md:px-6 mb-4">
                    <span className="text-primary font-black text-xl tracking-wide">{item.price}</span>
                    <Link href={`/produit/${index + 1}`}>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary text-white px-8 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-primary-dark transition uppercase cursor-pointer"
                      >
                        CTA
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        </div>
      </section>

      {/* Juice Section */}
      <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
        <TopoBackground />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
              className="relative h-[450px] md:h-[700px] w-full order-2 md:order-1 flex items-center justify-center mt-12 md:mt-0"
            >
              {/* Central cream dark circle holding the juice item background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] md:w-[600px] md:h-[600px] rounded-full bg-cream-dark -z-10 shadow-inner"></div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full overflow-hidden shadow-2xl z-20">
                <Image
                  src="/image/hero_juice.png"
                  alt="Fresh Juice"
                  fill
                  className="object-cover scale-105"
                />
              </div>

              {/* Smaller floating salad circle overlay shifted down and to the RIGHT with rotation */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-[20px] -right-[10px] md:-bottom-[40px] md:-right-[20px] lg:bottom-[0px] lg:-right-[40px] w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-full overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)] z-30 border-8 border-white bg-white"
              >
                <Image
                  src="/image/salade1.jpg"
                  alt="Salad Bowl"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="text-left w-full max-w-lg order-1 md:order-2 z-30"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 text-primary tracking-tight">Lorem ipsum</h2>
              <p className="text-[#333] mb-6 text-base md:text-lg font-medium leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
              <p className="text-[#333] mb-12 text-base md:text-lg font-medium leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-10 py-3.5 rounded-full font-bold hover:bg-primary-dark transition tracking-wider uppercase shadow-xl"
              >
                CTA
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2
            {...fadeInUp}
            className="text-2xl md:text-3xl font-black mb-16 text-center text-primary tracking-tight"
          >
            Nos clients satisfaits
          </motion.h2>

          <div className="overflow-hidden space-y-8 py-6 max-w-screen-2xl w-full">
            {/* Ligne 1 : droite vers gauche */}
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="flex gap-6 w-max"
            >
              {[1, 2, 3, 4, 1, 2, 3, 4].map((i, idx) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={idx}
                  className="w-[280px] md:w-[350px] aspect-2/1 bg-white rounded-xl border-[1.5px] border-gray-100 shadow-sm transition hover:shadow-lg flex-shrink-0 cursor-pointer"
                >
                </motion.div>
              ))}
            </motion.div>

            {/* Ligne 2 : gauche vers droite */}
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="flex gap-6 w-max"
            >
              {[5, 6, 7, 8, 5, 6, 7, 8].map((i, idx) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={idx}
                  className="w-[280px] md:w-[350px] aspect-2/1 bg-white rounded-xl border-[1.5px] border-gray-100 shadow-sm transition hover:shadow-lg flex-shrink-0 cursor-pointer"
                >
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-primary text-white">
        <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 lg:mb-16 text-center tracking-tight">Lorem ipsum</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <div className="text-left font-medium text-[13px] md:text-sm">
              <p className="mb-6 leading-relaxed opacity-95">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="opacity-95 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
              </p>
            </div>
            <div className="h-64 md:h-[320px] rounded-[20px] overflow-hidden shadow-2xl relative bg-white/10 ring-4 ring-white/10">
              <iframe
                title="Localisation"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31515.266964026777!2d2.3770412!3d6.3702928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102357f59d1a93a1%3A0x963d2c983eb8ff48!2sCotonou!5e0!3m2!1sfr!2sbj!4v1730200000000!5m2!1sfr!2sbj"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
                className="opacity-95"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}