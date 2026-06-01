// src/app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingCart, faCheck } from '@fortawesome/free-solid-svg-icons';
import CategoryFAB from '../components/CategoryFAB';
import { getProducts } from '../components/lib/storage';
import { Product } from '../types';
import { useCart } from '../components/contexts/CartContext';
import clsx from 'clsx';

const TopoBackground = () => (
  <div className={clsx('absolute', 'inset-0', 'z-0', 'pointer-events-none', 'opacity-[0.2]')}>
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
  const [showTabTooltip, setShowTabTooltip] = useState(true);
  const [isCreationsVisible, setIsCreationsVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  const creationsRef = useRef<HTMLElement>(null);
  const { addToCart } = useCart();

  const categoryOrder: Product['category'][] = ['gateaux', 'viennoiseries', 'salades', 'jus'];

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1200);
  };

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.1 },
    transition: { duration: 0.6 }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCreationsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "-100px 0px" }
    );

    if (creationsRef.current) {
      observer.observe(creationsRef.current);
    }

    return () => {
      if (creationsRef.current) {
        observer.unobserve(creationsRef.current);
      }
    };
  }, []);

  const homeCategories = [
    { id: '0', label: 'Gâteaux personnalisés' },
    { id: '1', label: 'Viennoiseries & snacks' },
    { id: '2', label: 'Salades fraîches' },
    { id: '3', label: 'Jus detox & yaourts' }
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className={clsx('relative', 'bg-cream', 'flex', 'flex-col', 'pt-32', 'lg:pt-40', 'overflow-hidden')}>
        <TopoBackground />

        <div className={clsx('container', 'mx-auto', 'px-6', 'md:px-12', 'relative', 'z-10', 'grid', 'grid-cols-1', 'lg:grid-cols-2', 'gap-12', 'lg:gap-20', 'items-center', 'pb-[250px]', 'md:pb-[350px]')}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className={clsx('text-left', 'w-full', 'order-2', 'lg:order-1', 'mt-10', 'md:mt-0', 'z-20')}
          >
            <h1 className={clsx('text-primary', 'text-5xl', 'lg:text-6xl', 'xl:text-7xl', 'font-title', 'font-black', 'mb-6', 'leading-tight', 'tracking-tight')}>
              Savourez chaque instant, sainement et avec élégance
            </h1>
            <p className={clsx('text-[#333]', 'text-base', 'md:text-lg', 'mb-10', 'font-medium', 'tracking-wide', 'max-w-lg')}>
              Gâteaux d’exception, viennoiseries gourmandes, snacks salés et boissons detox… Nous transformons vos envies en expériences inoubliables.
            </p>
            <div className={clsx('flex', 'flex-wrap', 'gap-4')}>
              <Link href="/produits">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx('bg-primary', 'text-white', 'px-8', 'py-3.5', 'rounded-full', 'font-title', 'font-bold', 'hover:bg-primary-dark', 'transition', 'text-sm', 'tracking-wider', 'uppercase', 'shadow-xl')}
                >
                  Commander maintenant
                </motion.button>
              </Link>
              <Link href="/produits">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx('bg-white', 'text-primary', 'border-2', 'border-primary', 'px-8', 'py-3.5', 'rounded-full', 'font-title', 'font-bold', 'hover:bg-cream', 'transition', 'text-sm', 'tracking-wider', 'uppercase', 'shadow-xl')}
                >
                  Voir nos délices
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className={clsx('relative', 'h-[350px]', 'w-[350px]', 'md:h-[500px]', 'md:w-[500px]', 'lg:h-[650px]', 'lg:w-[650px]', 'mx-auto', 'order-1', 'lg:order-2', 'rounded-full', 'shadow-[0_0_80px_rgba(255,255,255,0.8)]', 'z-10')}
          >
            <div className={clsx('absolute', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'bg-white/70', 'w-full', 'h-full', 'rounded-full', 'blur-[80px]', '-z-10')} />
            {(() => {
              const heroImage = products.find(p => p.category === 'gateaux')?.image;
              return heroImage ? (
                <div className={clsx('absolute', 'inset-0', 'rounded-full', 'overflow-hidden', 'shadow-2xl', 'z-10')}>
                  <Image
                src="https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707732/hero_cake_om5jbw.jpg"
                    alt="Gâteau"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : null;
            })()}
          </motion.div>
        </div>

        {/* Hero Bottom Orbital Circle */}
        <div className={clsx('absolute', 'bottom-0', 'left-0', 'right-0', 'z-20', 'pointer-events-none')}>
          <div className={clsx('absolute', '-bottom-[200px]', 'md:-bottom-[600px]', 'left-1/2', 'transform', '-translate-x-1/2', 'pointer-events-auto', 'z-30')}>
            {/* The outer rotating container */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
              className={clsx('relative', 'w-[400px]', 'h-[400px]', 'md:w-[900px]', 'md:h-[950px]', 'rounded-full', 'flex', 'items-center', 'justify-center', 'bg-[#FDE2C3]')} // Matching the filled background color from image
            >
              {/* Inner concentric circle matching the reference image */}
              <div className={clsx('absolute', 'w-[200px]', 'h-[200px]', 'md:w-[450px]', 'md:h-[450px]', 'bg-cream', 'rounded-full', 'opacity-60')}></div>

              {/* Generate 8 circles making a complete circumference positioned via XY coordinates */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const angle = i * 45; // in degrees
                const rad = (angle * Math.PI) / 180;
                // Mobile radius ~ 150, Desktop radius ~ 350
                const radiusMobile = 140;
                const radiusDesktop = 360;

                const xMobile = radiusMobile * Math.sin(rad);
                const yMobile = -radiusMobile * Math.cos(rad);

                const xDesktop = radiusDesktop * Math.sin(rad);
                const yDesktop = -radiusDesktop * Math.cos(rad);

                return (
                  <div
                    key={i}
                    className={clsx('absolute', 'top-1/2', 'left-1/2')}
                  >
                    {/* Desktop pos */}
                    <div
                      className={clsx('hidden', 'md:block', 'absolute')}
                      style={{ transform: `translate(-50%, -50%) translate(${xDesktop}px, ${yDesktop}px)` }}
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                        className={clsx('flex', 'flex-col', 'items-center')}
                      >
                        <div className={clsx('w-[120px]', 'h-[120px]', 'bg-white', 'rounded-full', 'shadow-lg', 'flex', 'items-center', 'justify-center', 'overflow-hidden', 'relative')}>
                          {(() => {
                            const img = products.find(p => p.category === categoryOrder[i % 4])?.image;
                            return img ? (
                              <Image
                                src={img}
                                alt="Produit"
                                fill
                                className="object-cover"
                              />
                            ) : null;
                          })()}
                        </div>
                        <span className={clsx('text-lg', 'font-title', 'font-bold', 'text-[#63256A]', 'mt-4', 'tracking-wide', 'w-max')}>
                          {['Gâteaux', 'Viennoiseries', 'Snacks salés', 'Boissons detox'][i % 4]}
                        </span>
                      </motion.div>
                    </div>

                    {/* Mobile pos */}
                    <div
                      className={clsx('block', 'md:hidden', 'absolute')}
                      style={{ transform: `translate(-50%, -50%) translate(${xMobile}px, ${yMobile}px)` }}
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                        className={clsx('flex', 'flex-col', 'items-center')}
                      >
                        <div className={clsx('w-[60px]', 'h-[60px]', 'bg-white', 'rounded-full', 'shadow-md', 'flex', 'items-center', 'justify-center', 'overflow-hidden', 'relative')}>
                          {(() => {
                            const img = products.find(p => p.category === categoryOrder[i % 4])?.image;
                            return img ? (
                              <Image
                                src={img}
                                alt="Produit"
                                fill
                                className="object-cover"
                              />
                            ) : null;
                          })()}
                        </div>
                        <span className={clsx('text-xs', 'font-title', 'font-bold', 'text-[#63256A]', 'mt-2', 'tracking-wide', 'w-max')}>
                          {['Gâteaux', 'Viennoiseries', 'Snacks salés', 'Boissons detox'][i % 4]}
                        </span>
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
      <section ref={creationsRef} className={clsx('pt-24', 'pb-16', 'md:pt-32', 'md:pb-20', 'bg-white', 'min-h-[800px]')}>
        <div className={clsx('container', 'mx-auto', 'px-6', 'md:px-12')}>
          <div className={clsx('text-center', 'mb-6', 'relative')}>
            <AnimatePresence>
              {showTabTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: -10 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
                  className={clsx('inline-flex', 'bg-primary', 'text-white', 'text-xs', 'md:text-sm', 'font-bold', 'px-6', 'py-3', 'rounded-full', 'shadow-xl', 'items-center', 'gap-3', 'relative', 'z-20')}
                >
                  <span className={clsx('font-title', 'tracking-wide')}>Vous pouvez cliquer pour voir les produits de la catégorie</span>
                  <button
                    onClick={() => setShowTabTooltip(false)}
                    className={clsx('w-5', 'h-5', 'rounded-full', 'bg-white/20', 'hover:bg-white/40', 'flex', 'items-center', 'justify-center', 'transition-colors', 'cursor-pointer', 'shrink-0')}
                    title="Fermer l'info bulle"
                  >
                    <FontAwesomeIcon icon={faTimes} className={clsx('w-3', 'h-3', 'text-white')} />
                  </button>
                  {/* Arrow down pointer */}
                  <div className={clsx('absolute', '-bottom-[7px]', 'left-1/2', 'transform', '-translate-x-1/2', 'w-0', 'h-0', 'border-l-[8px]', 'border-r-[8px]', 'border-t-[8px]', 'border-l-transparent', 'border-r-transparent', 'border-t-primary', 'border-l-8', 'border-r-8', 'border-t-8')}></div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.h2
              {...fadeInUp}
              className={clsx('text-3xl', 'md:text-4xl', 'font-title', 'font-black', 'text-primary', 'tracking-tight')}
            >
              Nos Créations
            </motion.h2>
          </div>

          {/* Navigation Tabs */}
          <div className={clsx('relative', 'flex', 'justify-center', 'flex-wrap', 'gap-6', 'md:gap-10', 'mb-16', 'border-b', 'border-gray-100', 'max-w-4xl', 'mx-auto')}>

            {['Gâteaux personnalisés', 'Viennoiseries & snacks', 'Salades fraîches', 'Jus detox & yaourts'].map((tab, idx) => (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => setActiveTab(idx)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTab(idx); }}
                className={`pb-3 text-sm font-title font-bold tracking-wide relative cursor-pointer outline-none transition-colors ${activeTab === idx ? 'text-primary' : 'text-gray-400 hover:text-gray-700'
                  }`}
              >
                {tab}

                {/* Active Underline */}
                {activeTab === idx && (
                  <motion.div
                    layoutId="activeTabProduct"
                    className={clsx('absolute', 'bottom-0', 'left-0', 'right-0', 'h-1', 'bg-primary', 'rounded-t-lg')}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-10', 'lg:gap-14', 'max-w-6xl', 'mx-auto')}>
            {(() => {
              const currentCategory = categoryOrder[activeTab];
              const currentProducts = products.filter(p => p.category === currentCategory).slice(0, 6);

              return currentProducts.map((item, index) => (
                <AnimatePresence key={`${activeTab}-${item.id}`}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    className={clsx('flex', 'flex-col', 'items-center')}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={clsx('w-64', 'h-64', 'md:w-80', 'md:h-80', 'rounded-full', 'overflow-hidden', 'shadow-2xl', 'mb-8', 'z-10', 'relative', 'cursor-pointer')}
                    >
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </motion.div>
                    <h3 className={clsx('font-title', 'font-extrabold', 'text-[#111]', 'text-2xl', 'mb-3', 'text-center')}>{item.name}</h3>
                    <p className={clsx('text-gray-500', 'text-xs', 'md:text-sm', 'text-center', 'px-4', 'mb-8', 'leading-relaxed', 'max-w-sm')}>
                      {item.description}
                    </p>
                    <div className={clsx('w-full', 'flex', 'items-center', 'justify-between', 'px-2', 'md:px-6', 'mb-4', 'mt-auto')}>
                      <span className={clsx('text-primary', 'font-title', 'font-black', 'text-xl', 'tracking-wide')}>{item.price} FCFA</span>
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(item)}
                          className={`bg-primary text-white px-8 py-3 rounded-xl text-sm font-title font-bold shadow-md transition uppercase cursor-pointer hidden md:block ${
                            addedProductId === item.id ? 'bg-green-600' : 'hover:bg-primary-dark'
                          }`}
                        >
                          {addedProductId === item.id ? '✓ Ajouté' : 'Commander'}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(item)}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all cursor-pointer group/btn md:hidden ${
                            addedProductId === item.id ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-primary-dark'
                          }`}
                        >
                          <FontAwesomeIcon 
                            icon={addedProductId === item.id ? faCheck : faShoppingCart} 
                            className={clsx('w-5', 'h-5', 'group-hover/btn:scale-110', 'transition-transform')} 
                          />
                        </motion.button>
                      </>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Juice Section */}
      <section className={clsx('py-20', 'md:py-28', 'bg-cream', 'relative', 'overflow-hidden')}>
        <TopoBackground />
        <div className={clsx('container', 'mx-auto', 'px-6', 'md:px-12', 'relative', 'z-10')}>
          <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-12', 'lg:gap-24', 'items-center', 'max-w-7xl', 'mx-auto')}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
              className={clsx('relative', 'h-[450px]', 'md:h-[700px]', 'w-full', 'order-2', 'md:order-1', 'flex', 'items-center', 'justify-center', 'mt-12', 'md:mt-0')}
            >
              {/* Central cream dark circle holding the juice item background */}
              <div className={clsx('absolute', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'w-[380px]', 'h-[380px]', 'md:w-[600px]', 'md:h-[600px]', 'rounded-full', 'bg-cream-dark', '-z-10', 'shadow-inner')}></div>

              {(() => {
                const juiceImage = products.find(p => p.category === 'jus')?.image;
                return juiceImage ? (
                  <div className={clsx('absolute', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'w-[350px]', 'h-[350px]', 'md:w-[500px]', 'md:h-[500px]', 'rounded-full', 'overflow-hidden', 'shadow-2xl', 'z-20')}>
                    <Image
                      src="https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707728/hero_juice_dpjogw.jpg"
                      alt="Fresh Juice"
                      fill
                      className={clsx('object-cover', 'scale-105')}
                    />
                  </div>
                ) : null;
              })()}

              {(() => {
                const saladImage = products.find(p => p.category === 'salades')?.image;
                return saladImage ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className={clsx('absolute', '-bottom-[20px]', '-right-[10px]', 'md:-bottom-[40px]', 'md:-right-[20px]', 'lg:bottom-[0px]', 'lg:-right-[40px]', 'w-[150px]', 'h-[150px]', 'md:w-[250px]', 'md:h-[250px]', 'rounded-full', 'overflow-hidden', 'shadow-[0_20px_40px_rgba(0,0,0,0.3)]', 'z-30', 'border-8', 'border-white', 'bg-white')}
                  >
                    <Image
                      src="https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707745/salade7_b3twpq.jpg"
                      alt="Salad Bowl"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ) : null;
              })()}
            </motion.div>

            <motion.div
              {...fadeInUp}
              className={clsx('text-left', 'w-full', 'max-w-lg', 'order-1', 'md:order-2', 'z-30')}
            >
              <h2 className={clsx('text-3xl', 'md:text-5xl', 'lg:text-6xl', 'font-title', 'font-black', 'mb-8', 'text-primary', 'tracking-tight', 'leading-tight')}>Notre passion : allier plaisir et bien-être</h2>
              <p className={clsx('text-[#333]', 'mb-4', 'text-base', 'md:text-lg', 'font-medium', 'leading-relaxed')}>
                Chez nous, chaque création est pensée pour offrir bien plus qu’un simple goût : une expérience. Nous combinons gourmandise, qualité et équilibre pour répondre à toutes vos envies — des événements les plus précieux aux petits plaisirs du quotidien.
              </p>
              <p className={clsx('text-[#333]', 'mb-6', 'text-base', 'md:text-lg', 'font-medium', 'leading-relaxed')}>
                Nos produits sont préparés avec soin, à partir d’ingrédients sélectionnés, pour vous garantir fraîcheur, saveur et satisfaction. Parce que bien manger, c’est aussi prendre soin de soi.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events CTA Section */}
      <section className={clsx('py-16', 'md:py-20', 'bg-[#63256A]', 'text-white')}>
        <div className={clsx('container', 'mx-auto', 'px-6', 'md:px-12', 'text-center')}>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={clsx('text-3xl', 'md:text-5xl', 'font-title', 'font-black', 'mb-6', 'tracking-tight')}
          >
            Disponible pour nos événements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={clsx('text-lg', 'md:text-xl', 'font-medium', 'mb-10', 'max-w-2xl', 'mx-auto', 'opacity-90')}
          >
            Rendez vos célébrations mémorables avec nos tables élégamment dressées et nos créations sur-mesure pour tous types d'événements.
          </motion.p>
          <Link href="/galerie">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={clsx('bg-white', 'text-[#63256A]', 'px-10', 'py-4', 'rounded-full', 'font-title', 'font-bold', 'hover:bg-cream', 'transition', 'text-sm', 'tracking-wider', 'uppercase', 'shadow-xl')}
            >
              Pourquoi nous choisir
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={clsx('py-20', 'md:py-28', 'bg-white')}>
        <div className={clsx('container', 'mx-auto', 'px-6', 'md:px-12')}>
          <motion.h2
            {...fadeInUp}
            className={clsx('text-2xl', 'md:text-3xl', 'font-title', 'font-black', 'mb-16', 'text-center', 'text-primary', 'tracking-tight')}
          >
            Nos clients satisfaits
          </motion.h2>

          <div className={clsx('overflow-hidden', 'space-y-8', 'py-6', 'max-w-screen-2xl', 'w-full')}>
            {(() => {
              const reviewsRow1 = [
                { id: 1, name: "Marie S.", rating: 5, text: "Les gâteaux sont justes incroyables ! Un design magnifique et un goût exquis. Je recommande vivement pour tous vos anniversaires." },
                { id: 2, name: "Pauline A.", rating: 5, text: "J'ai commandé des viennoiseries pour un brunch d'entreprise, tout le monde a adoré. Les croissants sont bien beurrés comme en France !" },
                { id: 3, name: "David T.", rating: 4, text: "Service impeccable, les jus detox sont devenus mon rituel de la semaine. Très frais et savoureux." },
                { id: 4, name: "Karelle O.", rating: 5, text: "Leur prestation pour notre mariage était parfaite : décoration des tables, repas, et le gâteau de noces... Inoubliable !" }
              ];
              const reviewsRow2 = [
                { id: 5, name: "Jean-Marc L.", rating: 5, text: "Les salades sont super bien garnies et la vinaigrette est divine. Parfait pour la pause déjeuner." },
                { id: 6, name: "Estelle D.", rating: 5, text: "Je suis bluffée par la qualité et la présentation de chaque produit. Le fraisier est à tomber par terre." },
                { id: 7, name: "Cédric", rating: 4, text: "Très bonne pâtisserie, l'équipe est à l'écoute et souriante. Petit coup de coeur pour les mini-burgers." },
                { id: 8, name: "Sylvia M.", rating: 5, text: "Gouts & Couleurs a sublimé notre séminaire avec une table dressée au top et des snacks salés délicieux !" }
              ];

              return (
                <>
                  {/* Ligne 1 : droite vers gauche */}
                  <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                    className={clsx('flex', 'gap-6', 'w-max')}
                  >
                    {[...reviewsRow1, ...reviewsRow1].map((review, idx) => (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        key={`row1-${idx}`}
                        className={clsx('w-[300px]', 'md:w-[380px]', 'h-[160px]', 'md:h-[180px]', 'bg-white', 'rounded-2xl', 'border', 'border-gray-100', 'shadow-sm', 'transition', 'hover:shadow-lg', 'flex-shrink-0', 'flex', 'flex-col', 'justify-between', 'p-6', 'cursor-pointer')}
                      >
                        <p className={clsx('text-gray-600', 'text-sm', 'md:text-base', 'italic', 'line-clamp-3')}>"{review.text}"</p>
                        <div className={clsx('flex', 'items-center', 'justify-between', 'mt-4')}>
                          <span className={clsx('font-bold', 'text-[#333]')}>{review.name}</span>
                          <div className={clsx('flex', 'gap-1', 'text-yellow-400', 'text-sm')}>
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'text-gray-200'}`}></i>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Ligne 2 : gauche vers droite */}
                  <motion.div
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
                    className={clsx('flex', 'gap-6', 'w-max')}
                  >
                    {[...reviewsRow2, ...reviewsRow2].map((review, idx) => (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        key={`row2-${idx}`}
                        className={clsx('w-[300px]', 'md:w-[380px]', 'h-[160px]', 'md:h-[180px]', 'bg-white', 'rounded-2xl', 'border', 'border-gray-100', 'shadow-sm', 'transition', 'hover:shadow-lg', 'flex-shrink-0', 'flex', 'flex-col', 'justify-between', 'p-6', 'cursor-pointer')}
                      >
                        <p className={clsx('text-gray-600', 'text-sm', 'md:text-base', 'italic', 'line-clamp-3')}>"{review.text}"</p>
                        <div className={clsx('flex', 'items-center', 'justify-between', 'mt-4')}>
                          <span className={clsx('font-bold', 'text-[#333]')}>{review.name}</span>
                          <div className={clsx('flex', 'gap-1', 'text-yellow-400', 'text-sm')}>
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'text-gray-200'}`}></i>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={clsx('bg-primary', 'text-white')}>
        <div className={clsx('container', 'mx-auto', 'px-6', 'md:px-12', 'py-16', 'md:py-24')}>
          <h2 className={clsx('text-3xl', 'md:text-4xl', 'font-title', 'font-extrabold', 'mb-12', 'lg:mb-16', 'text-center', 'tracking-tight')}>Où nous trouver</h2>

          <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-12', 'lg:gap-20', 'items-center', 'max-w-6xl', 'mx-auto')}>
            <div className={clsx('text-left', 'font-medium', 'text-[13px]', 'md:text-sm')}>
              <p className={clsx('mb-6', 'leading-relaxed', 'opacity-95', 'text-lg')}>
                Venez découvrir notre univers de gourmandises et de bien-être directement en boutique.
                Nous vous accueillons dans un cadre chaleureux et élégant, pensé pour votre détente.
              </p>
              <p className={clsx('opacity-95', 'leading-relaxed', 'text-lg')}>
                Que vous soyez de passage pour une pause café, un snack rapide ou pour récupérer une commande personnalisée,
                notre équipe est ravie de vous servir avec le sourire.
              </p>
            </div>
            <div className={clsx('h-64', 'md:h-[320px]', 'rounded-[20px]', 'overflow-hidden', 'shadow-2xl', 'relative', 'bg-white/10', 'ring-4', 'ring-white/10')}>
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

      {/* Category FAB - Conditional visibility based on "Nos Créations" section */}
      <CategoryFAB
        categories={homeCategories}
        activeFilter={activeTab.toString()}
        onFilterChange={(id) => setActiveTab(parseInt(id))}
        forceVisible={isCreationsVisible}
      />
    </>
  );
}