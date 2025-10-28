// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faGlassWhiskey, faMugHot, faCookie, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Product } from '@/app/types';
import { getProducts } from '../components/lib/storage';
import ProductCard from '../components/product_card';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const coffees = products.filter(p => p.category === 'cafe').slice(0, 4);
  const desserts = products.filter(p => p.category === 'dessert').slice(0, 4);

  const testimonials = [
    [
      { name: 'Kathy Johnson', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', rating: 5, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.' },
      { name: 'John Smith', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', rating: 5, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.' },
      { name: 'Sarah Davis', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', rating: 5, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.' }
    ],
    [
      { name: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', rating: 4.5, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.' },
      { name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', rating: 5, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.' },
      { name: 'David Lee', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', rating: 5, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.' }
    ],
    [
      { name: 'Sophie Martin', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', rating: 5, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.' },
      { name: 'Thomas Garcia', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', rating: 4, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.' },
      { name: 'Olivia Taylor', avatar: 'https://randomuser.me/api/portraits/women/41.jpg', rating: 5, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.' }
    ]
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header/>
      {/* Hero Section */}
      <section className="relative h-150">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Coffee"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0  bg-opacity-50"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h2 className="text-white text-xl mb-2">Bienvenue !!</h2>
          <h1 className="text-white text-4xl font-bold mb-6">
            Nous vous proposons le meilleur<br />service de la ville
          </h1>
          <button className="bg-caramel hover:bg-[#5D2906] text-white px-6 py-2 rounded-full w-48 transition">
            Acheter maintenant
          </button>
        </div>
      </section>

      {/* Category Icons */}
      <section className="bg-cream py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-12">
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full mb-2">
                <FontAwesomeIcon icon={faCoffee} className="text-[#8B4513] text-2xl" />
              </div>
              <span className="text-sm">Gâteau </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full mb-2">
                <FontAwesomeIcon icon={faGlassWhiskey} className="text-[#8B4513] text-2xl" />
              </div>
              <span className="text-sm">Croissants & Friands</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full mb-2">
                <FontAwesomeIcon icon={faMugHot} className="text-[#8B4513] text-2xl" />
              </div>
              <span className="text-sm">Salade</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full mb-2">
                <FontAwesomeIcon icon={faCookie} className="text-[#8B4513] text-2xl" />
              </div>
              <span className="text-sm">Jus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Special Coffees */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">NOS PRODUITS SPÉCIAUX</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coffees.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Desserts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">NOS DESSERTS SPÉCIAUX</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {desserts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Beans Promotion */}
      <section className="py-12 bg-[#f5e6d8]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 relative h-64 md:h-96 w-full">
              <Image
                src="/image/gateau17.jpg"
                alt="Grains de café"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">
                Découvrez nos meilleurs<br />produits
              </h2>
              <button className="bg-[#8B4513] hover:bg-[#5D2906] text-white px-6 py-2 rounded-full transition">
                Voir nos produits
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">NOS CLIENTS SATISFAITS</h2>
          
          <div className="flex justify-center mb-4">
            {[0, 1, 2].map(i => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full mx-1 ${i === currentSlide ? 'bg-[#8B4513]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((group, idx) => (
                <div key={idx} className="min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {group.map((testimonial, i) => (
                      <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="rounded-full mr-4"
                          />
                          <div>
                            <h3 className="font-bold">{testimonial.name}</h3>
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <FontAwesomeIcon
                                  key={i}
                                  icon={i < Math.floor(testimonial.rating) ? faStar : i < testimonial.rating ? faStarHalfAlt : faStarRegular}
                                  className="text-sm"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{testimonial.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-12 bg-[#f5e6d8]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Rejoignez nous et obtenez 15% de réduction
          </h2>
          <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className="bg-[#8B4513] hover:bg-[#5D2906] text-white px-6 py-2 rounded-full transition">
            S&apos;inscrire
          </button>
        </div>
      </section>
      <Footer/>
    </>
  );
}