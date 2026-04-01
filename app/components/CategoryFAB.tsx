'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Category {
  id: string;
  label: string;
}

interface CategoryFABProps {
  categories: Category[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
  scrollThreshold?: number;
  forceVisible?: boolean;
  mobileOnly?: boolean;
}

export default function CategoryFAB({
  categories,
  activeFilter,
  onFilterChange,
  scrollThreshold = 1000,
  forceVisible = false,
  mobileOnly = false
}: CategoryFABProps) {
  const [isFabVisible, setIsFabVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHintBubble, setShowHintBubble] = useState(false);

  useEffect(() => {
    // Show hint bubble every time visibility is active
    setShowHintBubble(true);

    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsFabVisible(true);
      } else {
        setIsFabVisible(false);
        // Menu will be closed by the useEffect above if visibility is lost
      }
    };

    if (!forceVisible) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [scrollThreshold, forceVisible]);

  // Handle menu closure when visibility is lost
  useEffect(() => {
    if (!isFabVisible && !forceVisible) {
      setIsMenuOpen(false);
    }
  }, [isFabVisible, forceVisible]);

  const handleCategoryClick = (id: string) => {
    onFilterChange(id);
    setIsMenuOpen(false);
  };

  return (
    <div className={`${mobileOnly ? 'md:hidden' : ''}`}>
      <AnimatePresence>
        {(isFabVisible || forceVisible) && (
          <div className="fixed bottom-10 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
            
            {/* Hint Bubble */}
            <AnimatePresence>
              {showHintBubble && !isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  className="bg-primary text-white px-5 py-3 rounded-2xl shadow-2xl relative mb-2 mr-1 pointer-events-auto"
                >
                  <p className="text-xs font-title font-bold tracking-wide">
                    Filtrer par catégorie
                  </p>
                  <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-primary rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Category Pop-up Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20, originY: 1, originX: 1 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-primary/5 p-4 min-w-[220px] overflow-hidden pointer-events-auto mb-2"
                >
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 px-4 py-1 border-b border-gray-50 mb-1">
                      Menu de filtrage
                    </h4>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`w-full text-left px-5 py-3 rounded-2xl transition-all flex items-center gap-4 cursor-pointer ${
                          activeFilter === cat.id 
                          ? 'bg-primary/5 text-primary font-bold' 
                          : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          activeFilter === cat.id ? 'bg-primary' : 'bg-gray-200'
                        }`} />
                        <span className="text-sm font-title">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.button
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
              className={`w-16 h-16 rounded-[24px] shadow-2xl flex items-center justify-center transition-all relative pointer-events-auto cursor-pointer ${
                isMenuOpen ? 'bg-white text-primary border-2 border-primary/10' : 'bg-primary text-white'
              }`}
            >
              <div className="relative w-7 h-7 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0, opacity: isMenuOpen ? 0 : 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <i className="ri-cake-3-line text-3xl"></i>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ rotate: isMenuOpen ? 0 : -90, opacity: isMenuOpen ? 1 : 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl" />
                </motion.div>
              </div>
              
              {showHintBubble && !isMenuOpen && (
                <span className="absolute inset-0 rounded-[24px] bg-primary animate-ping opacity-20 pointer-events-none" />
              )}
            </motion.button>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
