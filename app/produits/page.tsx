'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { CategoryFilter, Product } from '../types';
import { getCategoryName, getProducts } from '../components/lib/storage';
import Header from '../components/header';
import Footer from '../components/footer';
import CategoryFAB from '../components/CategoryFAB';

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  useEffect(() => {
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
    setFilteredProducts(loadedProducts);
  }, []);

  const handleFilter = (category: CategoryFilter) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  const categories = [
    { id: 'all', label: 'Toutes les créations' },
    { id: 'gateaux', label: 'Gâteaux personnalisés' },
    { id: 'viennoiseries', label: 'Viennoiseries & snacks' },
    { id: 'salades', label: 'Salades fraîches' },
    { id: 'jus', label: 'Jus detox & yaourts' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <Header />

      {/* Hero Header */}
      <section className="relative bg-cream pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-cream-dark">
        <TopoBackground />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-title font-black text-primary mb-6 tracking-tight"
          >
            Notre Boutique
          </motion.h1>
          <motion.p
            {...fadeInUp}
            className="text-[#333] text-base md:text-lg max-w-2xl mx-auto font-medium opacity-80"
          >
            Découvrez nos créations artisanales préparées avec amour, alliant gourmandise et bien-être au quotidien.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 md:px-12">

          {/* Categories Tab Design */}
          <div className="relative flex justify-center flex-wrap gap-6 md:gap-10 mb-16 border-b border-gray-100 max-w-5xl mx-auto">
            {categories.map((cat) => (
              <div
                key={cat.id}
                role="button"
                tabIndex={0}
                onClick={() => handleFilter(cat.id as CategoryFilter)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFilter(cat.id as CategoryFilter); }}
                className={`pb-4 text-[13px] md:text-sm font-title font-bold tracking-wide relative cursor-pointer outline-none transition-colors whitespace-nowrap ${activeFilter === cat.id ? 'text-primary' : 'text-gray-400 hover:text-gray-700'
                  }`}
              >
                {cat.label}
                {activeFilter === cat.id && (
                  <motion.div
                    layoutId="activeFilterUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-400 col-span-full py-20"
                >
                  <FontAwesomeIcon icon={faShoppingBag} className="text-5xl mb-4 opacity-20" />
                  <p className="font-title font-bold text-lg">Aucun produit dans cette catégorie</p>
                </motion.div>
              ) : (
                filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: (index % 4) * 0.1 // Stagger effects for columns
                    }}
                    className="flex flex-col h-full group"
                  >
                    {/* Premium Product Card Look */}
                    <Link href={`/produit/${product.id}`} className="flex-1 flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-full aspect-square rounded-[40px] overflow-hidden shadow-xl mb-6 relative cursor-pointer border-4 border-cream"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                      </motion.div>

                      <div className="text-center px-2">
                        <span className="text-[10px] md:text-[11px] font-bold text-primary/60 uppercase tracking-widest mb-2 block">
                          {getCategoryName(product.category)}
                        </span>
                        <h3 className="font-title font-extrabold text-[#111] text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm mb-6 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </Link>

                    <div className="w-full flex items-center justify-between mt-auto pt-4 px-1">
                      <span className="text-primary font-title font-black text-lg md:text-xl tracking-tight">
                        {product.price.toLocaleString()} FCFA
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg hover:bg-primary-dark transition-all cursor-pointer group/btn"
                      >
                        <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />

      {/* Category FAB - Unified for Mobile/Desktop */}
      <CategoryFAB
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={(id) => handleFilter(id as CategoryFilter)}
      />
    </div>
  );
}