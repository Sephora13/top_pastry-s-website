'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faTimes, faShoppingCart, faMap, faEye, faGift, faHeart, faComment, faCircle, faShieldAlt, faLandmark, faHome, faImages, faCakeCandles, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-100 pt-6 px-4">
      <nav className="container mx-auto bg-primary text-white px-2 py-2 rounded-full flex items-center justify-between shadow-lg max-w-5xl relative z-50">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center w-1/4">
          <div className=" text-white px-5 py-2.5 rounded-full text-[16px] font-extrabold tracking-wide ml-2 whitespace-nowrap">
            Top Pastry
          </div>
        </Link>

        {/* Menu desktop - Center */}
        <div className="hidden md:flex justify-center space-x-12 w-2/4">
          <Link href="/" className="hover:text-gray-200 transition text-[13px] font-medium tracking-wide">
            Accueil
          </Link>
          <Link href="/galerie" className="hover:text-gray-200 transition text-[13px] font-medium tracking-wide">
            Galerie
          </Link>
          <Link href="/#contact" className="hover:text-gray-200 transition text-[13px] font-medium tracking-wide">
            Contact
          </Link>
        </div>

        {/* Icons / Actions - Right */}
        <div className="hidden md:flex justify-end items-center pr-4 w-1/4">
          <button onClick={() => setIsCartOpen(true)} className="relative hover:text-gray-200 transition group p-2 cursor-pointer">
            <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
            <span className="absolute top-0 right-0 bg-yellow-400 text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-sm">
              3
            </span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-4 pr-3">
          <button onClick={() => setIsCartOpen(true)} className="relative hover:text-gray-200 transition p-2 cursor-pointer">
            <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5 text-white" />
            <span className="absolute top-0 right-0 bg-yellow-400 text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform -translate-y-0.5">
              3
            </span>
          </button>
          <button
            className="text-2xl focus:outline-none text-white"
            onClick={() => setIsOpen(true)}
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="md:hidden fixed inset-0 z-200 bg-primary-dark text-white flex flex-col"
          >
            {/* Top Bar matching mockup */}
            <div className="bg-primary px-4 py-8 rounded-b-4xl flex items-center justify-between shadow-lg">
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <FontAwesomeIcon icon={faTimes} className="text-white text-lg" />
              </button>
              
              <div className="font-extrabold text-xl tracking-wide whitespace-nowrap">
                Top Pastry
              </div>

              <button onClick={() => { setIsOpen(false); setIsCartOpen(true); }} className="relative w-10 h-10 flex items-center justify-center bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition">
                <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto px-8 py-10">
              {/* Primary Links */}
              <div className="space-y-7">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-5 text-white hover:text-white/80 transition group">
                  <div className="w-6 flex justify-center"><FontAwesomeIcon icon={faHome} className="text-xl opacity-90" /></div>
                  <span className="font-bold text-[17px]">Accueil</span>
                </Link>

                <Link href="/galerie" onClick={() => setIsOpen(false)} className="flex items-center gap-5 text-white hover:text-white/80 transition group">
                  <div className="w-6 flex justify-center"><FontAwesomeIcon icon={faImages} className="text-xl opacity-90" /></div>
                  <span className="font-bold text-[17px]">Galerie Photo</span>
                  <span className="ml-2 bg-white/10 text-white/90 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Nouveau</span>
                </Link>

                <Link href="/produits" onClick={() => setIsOpen(false)} className="flex items-center gap-5 text-white hover:text-white/80 transition group">
                  <div className="w-6 flex justify-center"><FontAwesomeIcon icon={faCakeCandles} className="text-xl opacity-90" /></div>
                  <span className="font-bold text-[17px]">Nos Produits</span>
                </Link>

                <button onClick={() => { setIsOpen(false); setIsCartOpen(true); }} className="flex items-center gap-5 text-white hover:text-white/80 transition group w-full text-left cursor-pointer">
                  <div className="w-6 flex justify-center"><FontAwesomeIcon icon={faShoppingBag} className="text-xl opacity-90" /></div>
                  <span className="font-bold text-[17px]">Mon Panier</span>
                </button>

                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-5 text-white hover:text-white/80 transition group">
                  <div className="w-6 flex justify-center"><FontAwesomeIcon icon={faGift} className="text-xl opacity-90" /></div>
                  <span className="font-bold text-[17px]">Mon espace Gourmet</span>
                  <span className="ml-2 bg-white/10 text-white/90 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Beta</span>
                </Link>
              </div>

              <div className="my-10 h-px bg-white/10 w-8/12" />

              {/* Secondary Links */}
              <div className="space-y-7">
                <Link href="/#contact" onClick={() => setIsOpen(false)} className="flex items-center gap-5 text-white hover:text-white/80 transition group">
                  <div className="w-6 flex justify-center"><FontAwesomeIcon icon={faComment} className="text-xl opacity-90" /></div>
                  <span className="font-bold text-[17px]">Contacte la Team</span>
                </Link>

                <a href="#" className="flex items-center gap-5 text-white hover:text-white/80 transition group">
                  <div className="w-6 flex justify-center"><FontAwesomeIcon icon={faCircle} className="text-xl opacity-90" /></div>
                  <span className="font-bold text-[17px]">Suis-nous sur Instagram</span>
                </a>

                <a href="#" className="flex items-center gap-5 text-white hover:text-white/80 transition group">
                  <div className="w-6 flex justify-center"><FontAwesomeIcon icon={faCircle} className="text-xl opacity-90" /></div>
                  <span className="font-bold text-[17px]">Suis-nous sur Facebook</span>
                </a>

                <Link href="/cgv" onClick={() => setIsOpen(false)} className="flex items-center gap-5 text-white hover:text-white/80 transition group">
                  <div className="w-6 flex justify-center"><FontAwesomeIcon icon={faShieldAlt} className="text-xl opacity-90" /></div>
                  <span className="font-bold text-[17px]">CGV</span>
                </Link>

                <Link href="/#mentions-legales" onClick={() => setIsOpen(false)} className="flex items-center gap-5 text-white hover:text-white/80 transition group">
                  <div className="w-6 flex justify-center"><FontAwesomeIcon icon={faLandmark} className="text-xl opacity-90" /></div>
                  <span className="font-bold text-[17px]">Mentions légales</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
