// src/components/Footer.tsx
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo / First column */}
          <div className="col-span-1">
            <h3 className="font-bold text-xl mb-4 tracking-wide text-cream">Top Pastry</h3>
            <p className="text-[13px] text-white/80 leading-relaxed font-medium">
              L'excellence pâtissière et traiteur sur-mesure pour tous vos événements, au quotidien.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1">
            <h3 className="font-bold text-base mb-6 tracking-wide text-cream">Navigation</h3>
            <ul className="space-y-4 text-[13px] text-white/80 font-medium">
              <li><Link href="/" className="hover:text-white transition">Accueil</Link></li>
              <li><Link href="/galerie" className="hover:text-white transition">Galerie</Link></li>
              <li><Link href="/produits" className="hover:text-white transition">Nos Produits</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Informations / Horaires */}
          <div className="col-span-1">
            <h3 className="font-bold text-base mb-6 tracking-wide text-cream">Informations</h3>
            <ul className="space-y-4 text-[13px] text-white/80 font-medium">
              <li>Pâtisserie Boutique</li>
              <li>Lundi - Samedi : 8h à 19h</li>
              <li>Dimanche : 9h à 14h</li>
              <li className="pt-2">Commandes Traiteur 7j/7</li>
            </ul>
          </div>

          {/* Légal & Réseaux */}
          <div className="col-span-1">
            <h3 className="font-bold text-base mb-6 tracking-wide text-cream">Légal & Réseaux</h3>
            <ul className="space-y-4 text-[13px] text-white/80 font-medium mb-6">
              <li><Link href="/cgv" className="hover:text-white transition">CGV</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-white transition">Mentions Légales</Link></li>
            </ul>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-cream hover:text-primary transition-colors cursor-pointer">
                <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-cream hover:text-primary transition-colors cursor-pointer">
                <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom border separator as in mockup */}
        <div className="mt-16 pt-8 border-t border-white/10 hidden md:block"></div>
      </div>
    </footer>
  );
}