// src/components/Footer.tsx
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Logo / First column */}
          <div className="col-span-1">
            <h3 className="font-bold text-xl mb-4 tracking-wide">Lorem</h3>
            <p className="text-[13px] text-white/80 leading-relaxed font-medium">
              Lorem ipsum lorem ipsum
            </p>
          </div>

          {/* Column 2 */}
          <div className="col-span-1">
            <h3 className="font-bold text-base mb-6 tracking-wide">Lorem</h3>
            <ul className="space-y-4 text-[13px] text-white/80 font-medium">
              <li><Link href="/" className="hover:text-white transition">Lorem ipsum lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">Lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">ipsum lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">ipsum Lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">ipsum Lorem ipsum</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-span-1">
            <h3 className="font-bold text-base mb-6 tracking-wide">Lorem</h3>
            <ul className="space-y-4 text-[13px] text-white/80 font-medium">
              <li><Link href="/" className="hover:text-white transition">Lorem ipsum lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">Lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">ipsum lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">ipsum Lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">ipsum Lorem ipsum</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="col-span-1">
            <h3 className="font-bold text-base mb-6 tracking-wide">Lorem</h3>
            <ul className="space-y-4 text-[13px] text-white/80 font-medium">
              <li><Link href="/" className="hover:text-white transition">Lorem ipsum lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">Lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">ipsum lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">ipsum Lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">ipsum Lorem ipsum</Link></li>
            </ul>
          </div>

          {/* Column 5 */}
          <div className="col-span-1">
            <h3 className="font-bold text-base mb-6 tracking-wide">Lorem</h3>
            <ul className="space-y-4 text-[13px] text-white/80 font-medium">
              <li><Link href="/" className="hover:text-white transition">Lorem ipsum lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">Lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">ipsum lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">ipsum Lorem</Link></li>
              <li><Link href="/" className="hover:text-white transition">ipsum Lorem ipsum</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom border separator as in mockup */}
        <div className="mt-16 pt-8 border-t border-white/10 hidden md:block"></div>
      </div>
    </footer>
  );
}