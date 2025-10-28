'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  showBuyButton?: boolean;
}

export default function ProductCard({ product, showBuyButton = true }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition">
        <FontAwesomeIcon icon={faHeart} className="text-[#8B4513]" />
      </button>
      
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#8B4513] mb-2">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 h-12 overflow-hidden">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-[#8B4513]">
            {product.price.toFixed(2)} FCFA
          </span>
          {showBuyButton && (
            <button className="bg-[#8B4513] hover:bg-[#5D2906] text-white px-4 py-1 rounded-full text-sm transition">
              Acheter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}