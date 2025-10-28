'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#5D2906] text-white">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <FontAwesomeIcon icon={faCoffee} className="text-xl mr-2" />
          <span className="font-bold text-xl">Top Pastry</span>
        </Link>

        {/* Menu desktop */}
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

        {/* Icône menu mobile */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
      </nav>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#5D2906] border-t border-[#7a3f0b]">
          <div className="flex flex-col space-y-3 px-4 py-4">
            <Link
              href="/"
              className="hover:text-[#f5e6d8] transition"
              onClick={() => setIsOpen(false)}
            >
              ACCUEIL
            </Link>
            <Link
              href="/produits"
              className="hover:text-[#f5e6d8] transition"
              onClick={() => setIsOpen(false)}
            >
              PRODUITS
            </Link>
            <Link
              href="/admin"
              className="hover:text-[#f5e6d8] transition"
              onClick={() => setIsOpen(false)}
            >
              ADMINISTRATION
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
