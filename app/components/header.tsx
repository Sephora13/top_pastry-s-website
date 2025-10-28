'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="bg-[#5D2906] text-white">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <FontAwesomeIcon icon={faCoffee} className="text-xl mr-2" />
          <span className="font-bold text-xl">Top Pastry</span>
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-[#f5e6d8] transition">
            ACCUEIL
          </Link>
          <Link href="/produits" className="hover:text-[#f5e6d8] transition">
            PRODUITS
          </Link>
          <Link href="/admin" className="hover:text-[#f5e6d8] transition">
            ADMINISTRATION
          </Link>
        </div>
        
      
      </nav>
    </header>
  );
}