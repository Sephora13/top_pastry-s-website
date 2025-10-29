// src/components/Footer.tsx
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-red-light  py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4  ">
              <FontAwesomeIcon icon={faCoffee} className="text-xl mr-2" />
              <span className="font-bold text-xl">Top Pastry & 
            <span className="font-bold text-xl text-green-medium"> Salade</span></span>
            </div>
            <p className="text-sm text-red-dark">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">LIENS RAPIDES</h3>
            <ul className="space-y-2 text-sm text-red-dark">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Produits
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition">
                  Administration
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">CONTACT</h3>
            <ul className="space-y-2 text-sm text-red-dark">
              <li>Djèvali</li>
              <li>Porto-Novo, Benin</li>
              <li>+123 456 7890</li>
              <li>info@coffee.com</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 ">MÉDIAS SOCIAUX</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#f5e6d8] text-red-dark transition">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="hover:text-[#f5e6d8] text-red-dark transition">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="hover:text-[#f5e6d8] text-red-dark transition">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="hover:text-[#f5e6d8] text-red-dark transition">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-red-dark ">
          <p>&copy; 2025 ICOLABS. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}