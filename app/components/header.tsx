'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 pt-6 px-4">
      <nav className="container mx-auto bg-primary text-white px-2 py-2 rounded-full flex items-center justify-between shadow-lg max-w-5xl">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center w-1/4">
          <div className="bg-white text-primary px-5 py-2.5 rounded-full text-[15px] font-extrabold tracking-wide ml-2">
            Lorem
          </div>
        </Link>

        {/* Menu desktop - Center */}
        <div className="hidden md:flex justify-center space-x-12 w-2/4">
          <Link href="/" className="hover:text-gray-200 transition text-[13px] font-medium tracking-wide">
            Lorem ipsum
          </Link>
          <Link href="/produits" className="hover:text-gray-200 transition text-[13px] font-medium tracking-wide">
            Lorem ipsum
          </Link>
          <Link href="/admin" className="hover:text-gray-200 transition text-[13px] font-medium tracking-wide">
            Lorem ipsum
          </Link>
        </div>

        {/* Empty space for balance - Right */}
        <div className="hidden md:block w-1/4"></div>

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
        <div className="md:hidden bg-primary-dark border-t border-primary/50">
          <div className="flex flex-col space-y-4 px-6 py-6 font-medium text-sm">
            <Link
              href="/"
              className="hover:text-gray-200 transition"
              onClick={() => setIsOpen(false)}
            >
              Lorem ipsum
            </Link>
            <Link
              href="/produits"
              className="hover:text-gray-200 transition"
              onClick={() => setIsOpen(false)}
            >
              Lorem ipsum
            </Link>
            <Link
              href="/admin"
              className="hover:text-gray-200 transition"
              onClick={() => setIsOpen(false)}
            >
              Lorem ipsum
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
