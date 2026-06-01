'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] max-w-sm w-[calc(100%-2rem)]"
        >
          <div className={`rounded-2xl px-5 py-4 shadow-2xl flex items-start gap-3 backdrop-blur-md ${
            type === 'success'
              ? 'bg-green-dark/95 text-white'
              : 'bg-red-dark/95 text-white'
          }`}>
            <FontAwesomeIcon
              icon={type === 'success' ? faCheckCircle : faTimesCircle}
              className="w-5 h-5 mt-0.5 shrink-0"
            />
            <p className="text-sm font-medium flex-1 leading-relaxed">{message}</p>
            <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }} className="shrink-0 p-1 hover:bg-white/10 rounded-full transition cursor-pointer">
              <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
