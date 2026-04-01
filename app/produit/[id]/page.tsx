'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useParams } from 'next/navigation';

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id || '1';
  let imageIndex = Number(id) + 1;
  if(isNaN(imageIndex) || imageIndex > 18) imageIndex = 2; // Default fallback to a valid cake image

  // 3D Parallax Hover State
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Base state
  const [glaze, setGlaze] = useState('Chocolat au lait');
  const [deco, setDeco] = useState('Fruits frais');
  const [supplements, setSupplements] = useState<string[]>([]);
  const [accessories, setAccessories] = useState<string[]>([]);
  const [color, setColor] = useState('#63256A'); // Default primary

  const basePrice = 25000;
  
  // Fake complex calculations
  const calculateTotal = () => {
    let total = basePrice;
    if (glaze === 'Extra Chocolat') total += 2000;
    total += supplements.length * 1500;
    total += accessories.length * 500;
    return total;
  };

  const toggleSupplement = (item: string) => {
    setSupplements(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const toggleAccessory = (item: string) => {
    setAccessories(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const glazes = ['Chocolat au lait', 'Chocolat noir', 'Vanille intense', 'Fraise', 'Extra Chocolat'];
  const decos = ['Fruits frais', 'Amandes effilées', 'Pépites de chocolat', 'Brisures d\'Oreo'];
  const suppsList = ['Morceaux de noisettes (+1500F)', 'Praliné (+1500F)', 'Chantilly surprise (+1500F)'];
  const accessList = ['Bougie (+500F)', 'Message personnalisé (+500F)', 'Plaquette joyeux anniversaire (+500F)'];
  const colorsList = ['#63256A', '#FDEBD0', '#342211', '#D35400', '#2C3E50', '#E74C3C'];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-cream pt-24 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Visuals */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full flex justify-center lg:sticky lg:top-32 h-fit z-10"
              style={{ perspective: 1200 }}
            >
              <motion.div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full aspect-square max-w-[600px] rounded-[30px] overflow-hidden shadow-2xl bg-white border-8 border-white cursor-crosshair origin-center"
              >
                <Image
                  src={`/image/gateau${imageIndex}.jpg`}
                  alt="Product Image"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Right Column - Customization Form */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-12 mt-12 lg:mt-0"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-title font-black text-primary mb-4 tracking-tight">Gâteau Personnalisable</h1>
                <p className="text-2xl font-title font-bold text-gray-800 tracking-wide">{basePrice} FCFA</p>
                <p className="text-gray-500 mt-4 leading-relaxed bg-white/50 p-4 rounded-xl border border-white">
                  Créez le gâteau de vos rêves en sélectionnant vos combinaisons parfaites ci-dessous. Chaque création est préparée avec soin et un souci du détail pour rendre votre événement mémorable.
                </p>
              </div>

              {/* Glaçage */}
              <div className="space-y-4">
                <h3 className="text-xl font-title font-bold text-gray-900 border-b-2 border-white pb-2">1. Type de glaçage</h3>
                <div className="flex flex-wrap gap-3">
                  {glazes.map(g => (
                    <button 
                      key={g} 
                      onClick={() => setGlaze(g)}
                      className={`px-5 py-2.5 rounded-full text-sm font-title font-bold transition-all shadow-sm ${glaze === g ? 'bg-primary text-white scale-105' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Décoration */}
              <div className="space-y-4">
                <h3 className="text-xl font-title font-bold text-gray-900 border-b-2 border-white pb-2">2. Décoration disponible</h3>
                <div className="flex flex-wrap gap-3">
                  {decos.map(d => (
                    <button 
                      key={d} 
                      onClick={() => setDeco(d)}
                      className={`px-5 py-2.5 rounded-full text-sm font-title font-bold transition-all shadow-sm ${deco === d ? 'bg-primary text-white scale-105' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Couleurs de déco */}
              <div className="space-y-4">
                <h3 className="text-xl font-title font-bold text-gray-900 border-b-2 border-white pb-2">3. Couleurs du thème</h3>
                <div className="flex flex-wrap gap-4 py-2">
                  {colorsList.map(c => (
                    <button 
                      key={c} 
                      aria-label={`Choisir couleur ${c}`}
                      onClick={() => setColor(c)}
                      className={`w-12 h-12 rounded-full shadow-md transition-all ${color === c ? 'ring-4 ring-offset-4 ring-primary scale-110' : 'hover:scale-105'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Suppléments */}
              <div className="space-y-4">
                <h3 className="text-xl font-title font-bold text-gray-900 border-b-2 border-white pb-2">4. Suppléments (+1500 FCFA/ea)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suppsList.map(s => (
                    <label key={s} className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${supplements.includes(s) ? 'border-primary bg-primary/5' : 'border-transparent bg-white shadow-sm hover:shadow'}`}>
                      <input 
                        type="checkbox" 
                        checked={supplements.includes(s)}
                        onChange={() => toggleSupplement(s)}
                        className="w-5 h-5 text-primary rounded-md focus:ring-primary accent-primary"
                      />
                      <span className="text-sm font-bold text-gray-800">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Accessoires */}
              <div className="space-y-4">
                <h3 className="text-xl font-title font-bold text-gray-900 border-b-2 border-white pb-2">5. Accessoires de décoration (+500 FCFA/ea)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {accessList.map(a => (
                    <label key={a} className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${accessories.includes(a) ? 'border-primary bg-primary/5' : 'border-transparent bg-white shadow-sm hover:shadow'}`}>
                      <input 
                        type="checkbox" 
                        checked={accessories.includes(a)}
                        onChange={() => toggleAccessory(a)}
                        className="w-5 h-5 text-primary rounded-md focus:ring-primary accent-primary"
                      />
                      <span className="text-sm font-bold text-gray-800">{a}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total & CTA */}
              <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-2xl border-2 border-cream-dark sticky bottom-4 z-40">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-title font-bold text-lg">Total calculé :</span>
                  <span className="text-3xl font-title font-black text-primary">{calculateTotal()} <span className="text-xl">FCFA</span></span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white py-4 rounded-xl font-title font-black text-lg tracking-wider uppercase shadow-lg hover:bg-primary-dark transition-all cursor-pointer"
                >
                  Ajouter au panier
                </motion.button>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
