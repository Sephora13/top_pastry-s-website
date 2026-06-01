'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import { useCart } from './contexts/CartContext';
import { getCategoryName } from './lib/storage';
import { saveOrder, recordTransaction } from '../services/order.service';
import { Order } from '../types';
import { sendWhatsAppNotification } from '../actions/whatsapp.action';

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
  const { cartItems, removeFromCart, updateQuantity, totalAmount, totalItems, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Veuillez renseigner votre nom et votre numéro de téléphone.');
      return;
    }
    
    setIsSubmitting(true);

    const newOrder: Order = {
      id: 'TP' + Math.floor(100000 + Math.random() * 900000),
      items: cartItems,
      totalAmount: totalAmount,
      customerPhone: customerPhone,
      customerName: customerName,
      status: 'payment_pending',
      createdAt: new Date().toISOString()
    };
    
    await saveOrder(newOrder);

    setTimeout(async () => {
      const validated = recordTransaction(newOrder.id, 'Mobile Money / Virement');
      if (validated) {
        clearCart();
        setIsCheckout(false);
        setCustomerName('');
        setCustomerPhone('');
        onClose();
        setIsSubmitting(false);

        try {
          await sendWhatsAppNotification(validated);
        } catch (err) {
          console.warn('Erreur notification WhatsApp:', err);
        }

        alert(`Votre commande ${validated.id} a été validée et payée avec succès !`);
      }
    }, 1800);
  };

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
            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-primary shadow-2xl z-999 flex flex-col font-sans overflow-hidden"
          >
            <TopoBackground />
            
            {/* Header */}
            <div className="px-6 pt-10 pb-6 relative z-10">
              <h2 className="text-2xl font-title font-black text-white px-2 tracking-tight">
                Mon panier
                {totalItems > 0 && (
                  <span className="ml-3 text-base bg-white/20 px-3 py-1 rounded-full">
                    {totalItems} {totalItems > 1 ? 'articles' : 'article'}
                  </span>
                )}
              </h2>
              <button 
                onClick={onClose}
                className="absolute top-10 right-6 text-white text-xl p-2 hover:bg-white/10 rounded-full transition cursor-pointer"
                title="Fermer le panier"
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>
              
              <div className="mt-4 border-b border-white/20 w-full"></div>
            </div>

            {/* Cart Items Area / Checkout Form */}
            <div className="flex-1 overflow-y-auto px-6 py-4 relative z-10 custom-scrollbar">
              <AnimatePresence mode="popLayout" initial={false}>
                {isCheckout ? (
                  <motion.form
                    key="checkout-form"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    onSubmit={handleCheckoutSubmit}
                    className="flex flex-col gap-5 pt-4 text-white"
                  >
                    <h3 className="text-xl font-title font-bold mb-2">Informations de livraison</h3>
                    
                    <div className="flex flex-col gap-2">
                      <label htmlFor="customer-name" className="text-xs font-bold uppercase tracking-wider text-white/70">Nom complet</label>
                      <input 
                        id="customer-name"
                        type="text" 
                        required
                        placeholder="Sophie Duboc"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white outline-none focus:border-white focus:bg-white/20 transition-all font-medium text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="customer-phone" className="text-xs font-bold uppercase tracking-wider text-white/70">Téléphone (WhatsApp)</label>
                      <input 
                        id="customer-phone"
                        type="tel" 
                        required
                        placeholder="+229 97 00 00 00"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white outline-none focus:border-white focus:bg-white/20 transition-all font-medium text-sm"
                      />
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed mt-2">
                      Votre commande sera validée immédiatement. Le paiement s'effectue par virement ou par Mobile Money (MTN MoMo / Moov Money) à la livraison.
                    </p>
                  </motion.form>
                ) : cartItems.length === 0 ? (
                  <motion.div
                    key="empty-cart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-white/60 gap-4 py-20"
                  >
                    <FontAwesomeIcon icon={faShoppingBag} className="w-12 h-12 opacity-30" />
                    <p className="font-title font-bold text-lg">Votre panier est vide</p>
                    <p className="text-sm text-white/40">Ajoutez des délices pour commencer !</p>
                  </motion.div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: 100, transition: { duration: 0.2 } }}
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
                            <h3 className="text-white font-title font-extrabold text-[14px] leading-[1.2] mb-2 tracking-wide font-sans">
                              {item.name}
                            </h3>
                            <p className="text-white/80 font-black text-[10px] uppercase tracking-widest leading-tight mt-1">
                              {getCategoryName(item.category)}
                            </p>
                          </div>

                          {/* Price, Retirer & Counter (Right) */}
                          <div className="flex flex-col items-center shrink-0 w-28 text-right">
                            <p className="text-white font-black text-sm font-title tracking-wide mb-1 flex items-baseline gap-1">
                              <span className="text-lg leading-none">{(item.price * item.quantity).toLocaleString('fr-FR')}</span>
                              <span className="text-[10px] font-bold">F CFA</span>
                            </p>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-white/70 hover:text-red-300 text-[11px] font-bold transition flex items-center gap-1.5 mt-1.5 mb-5 cursor-pointer bg-transparent border-none outline-none"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} /> Retirer
                            </button>
                            
                            {/* Quantité selector (Glass effect) */}
                            <div className="inline-flex items-center justify-between border border-white/50 bg-white/10 rounded-full px-3 py-1.5 w-full shadow-inner">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                className="text-white font-black hover:scale-110 hover:text-white/80 transition-transform px-1 cursor-pointer bg-transparent border-none outline-none"
                              >
                                -
                              </button>
                              <span className="text-white font-bold text-sm min-w-4 text-center">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                className="text-white font-black hover:scale-110 hover:text-white/80 transition-transform px-1 cursor-pointer bg-transparent border-none outline-none"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Section */}
            <div className="px-6 pb-12 pt-4 mt-auto relative z-10 bg-linear-to-t from-primary via-primary to-transparent">
              <div className="border-b border-white/20 w-full mb-6"></div>
              
              <div className="flex items-center justify-between text-white font-medium text-lg mb-8 px-2">
                <span className="tracking-wide">Sous-total :</span>
                <span className="font-black tracking-wider text-xl">{totalAmount.toLocaleString('fr-FR')} F CFA</span>
              </div>

              <div className="flex gap-4 px-2">
                {isCheckout ? (
                  <>
                    <button 
                      onClick={() => setIsCheckout(false)}
                      className="flex-1 bg-transparent border-2 border-white/40 hover:border-white text-white font-title font-bold text-[12px] tracking-widest py-3.5 rounded-full hover:bg-white/10 transition-all uppercase cursor-pointer"
                    >
                      Retour
                    </button>
                    <button 
                      onClick={handleCheckoutSubmit}
                      disabled={isSubmitting}
                      className="flex-1 bg-white border-2 border-white text-primary font-title font-bold text-[12px] tracking-widest py-3.5 rounded-full hover:scale-[1.03] transition-all uppercase shadow-lg shadow-black/20 cursor-pointer"
                    >
                      {isSubmitting ? 'Paiement en cours...' : 'Confirmer'}
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={onClose}
                      className="flex-1 bg-transparent border-2 border-white/40 hover:border-white text-white font-title font-bold text-[12px] tracking-widest py-3.5 rounded-full hover:bg-white/10 transition-all uppercase cursor-pointer"
                    >
                      Continuer
                    </button>
                    <button 
                      onClick={() => setIsCheckout(true)}
                      className={`flex-1 bg-white border-2 border-white text-primary font-title font-bold text-[12px] tracking-widest py-3.5 rounded-full hover:scale-[1.03] transition-transform uppercase shadow-lg shadow-black/20 ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      disabled={cartItems.length === 0}
                    >
                      Commander
                    </button>
                  </>
                )}
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
