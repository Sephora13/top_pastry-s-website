'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import { useState } from 'react';

// Mockup data
const initialItem = {
  id: 1,
  name: 'Tiramisu à la Mangue-Passion',
  category: 'LES DESSERTS COLORÉS',
  price: 3600,
  quantity: 1,
  image: '/image/jus2.jpg',
};

const TopoBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="topoCart" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
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
      <rect width="100%" height="100%" fill="url(#topoCart)" />
    </svg>
  </div>
);

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [item, setItem] = useState(initialItem);
  const [isRemoved, setIsRemoved] = useState(false);

  // Background overlay animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Drawer slide animation
  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
    },
    exit: { 
      x: '100%',
      transition: { ease: 'easeInOut' as const, duration: 0.3 }
    }
  };

  const increment = () => setItem(prev => ({ ...prev, quantity: prev.quantity + 1 }));
  const decrement = () => setItem(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }));
  const remove = () => setIsRemoved(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay grisé */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-998"
          />

          {/* Tiroir / Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // Integrated seamlessly with the brand's primary color
            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-primary shadow-2xl z-999 flex flex-col font-sans overflow-hidden"
          >
            <TopoBackground />
            
            {/* Header */}
            <div className="px-6 pt-10 pb-6 relative z-10">
              <h2 className="text-2xl font-black text-white px-2 tracking-tight">Mon panier</h2>
              <button 
                onClick={onClose}
                className="absolute top-10 right-6 text-white text-xl p-2 hover:bg-white/10 rounded-full transition cursor-pointer"
                title="Fermer le panier"
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>
              
              <div className="mt-4 border-b border-white/20 w-full"></div>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 relative z-10 custom-scrollbar">
              <AnimatePresence>
                {!isRemoved && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className="flex flex-col mb-6 mt-4"
                  >
                    <div className="flex items-start gap-4">
                      {/* Image Box */}
                      <div className="w-20 h-20 bg-white rounded-2xl p-1 shadow-sm shrink-0 flex items-center justify-center relative overflow-hidden">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          className="object-cover rounded-xl"
                        />
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 flex justify-between gap-2 pt-1">
                        
                        {/* Title & Category (Left) */}
                        <div className="flex flex-col max-w-[55%]">
                          <h3 className="text-white font-extrabold text-[16px] leading-[1.15] mb-2 tracking-wide">
                            Tiramisu<br/>à la<br/>Mangue-<br/>Passion
                          </h3>
                          <p className="text-white/80 font-black text-[10px] uppercase tracking-widest leading-tight mt-1">
                            LES<br/>DESSERTS<br/>COLORÉS
                          </p>
                        </div>

                        {/* Price, Retirer & Counter (Right) */}
                        <div className="flex flex-col items-center shrink-0 w-28 text-right">
                          <p className="text-white font-black text-sm tracking-wide mb-1 flex items-baseline gap-1">
                            <span className="text-lg leading-none">{item.price.toLocaleString('fr-FR')}</span>
                            <span className="text-[10px] font-bold">F CFA</span>
                          </p>
                          <button 
                            onClick={remove}
                            className="text-white/70 hover:text-red-300 text-[11px] font-bold transition flex items-center gap-1.5 mt-1.5 mb-5"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} /> Retirer
                          </button>
                          
                          {/* Quantité selector (Glass effect) */}
                          <div className="inline-flex items-center justify-between border border-white/50 bg-white/10 rounded-full px-3 py-1.5 w-full shadow-inner">
                            <button onClick={decrement} className="text-white font-black hover:scale-110 hover:text-white/80 transition-transform px-1 cursor-pointer">
                              -
                            </button>
                            <span className="text-white font-bold text-sm min-w-4 text-center">
                              {item.quantity}
                            </span>
                            <button onClick={increment} className="text-white font-black hover:scale-110 hover:text-white/80 transition-transform px-1 cursor-pointer">
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Section */}
            <div className="px-6 pb-12 pt-4 mt-auto relative z-10 bg-linear-to-t from-primary via-primary to-transparent">
              <div className="border-b border-white/20 w-full mb-6"></div>
              
              <div className="flex items-center justify-between text-white font-medium text-lg mb-8 px-2">
                <span className="tracking-wide">Sous-total :</span>
                {!isRemoved ? (
                  <span className="font-black tracking-wider text-xl">{((item.price * item.quantity)).toLocaleString('fr-FR')} F CFA</span>
                ) : (
                  <span className="font-black tracking-wider text-xl">0 F CFA</span>
                )}
              </div>

              <div className="flex gap-4 px-2">
                <button 
                  onClick={onClose}
                  className="flex-1 bg-transparent border-2 border-white/40 hover:border-white text-white font-bold text-[12px] tracking-widest py-3.5 rounded-full hover:bg-white/10 transition-all uppercase"
                >
                  Continuer
                </button>
                <button 
                  className="flex-1 bg-white border-2 border-white text-primary font-bold text-[12px] tracking-widest py-3.5 rounded-full hover:scale-[1.03] transition-transform uppercase shadow-lg shadow-black/20"
                >
                  Commander
                </button>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
