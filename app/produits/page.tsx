'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { CategoryFilter, Product } from '../types';
import { getCategoryName, getProducts } from '../components/lib/storage';
import Header from '../components/header';
import Footer from '../components/footer';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  useEffect(() => {
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
    setFilteredProducts(loadedProducts);
  }, []);

  const handleFilter = (category: CategoryFilter) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'cafe', label: 'Cafés' },
    { id: 'dessert', label: 'Desserts' },
    { id: 'boisson', label: 'Boissons' },
    { id: 'petit-dejeuner', label: 'Petit-déjeuner' }
  ];

  return (
    <>
    <Header /><div className="min-h-screen bg-amber-50">
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-6">Nos Produits</h2>

        {/* Filtres */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">
            Filtrer par catégorie
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleFilter(category.id as CategoryFilter)}
                className={`px-4 py-2 rounded transition ${activeFilter === category.id
                    ? 'bg-amber-800 text-white'
                    : 'bg-amber-600 text-white hover:bg-amber-700'}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 col-span-full py-8">
              <FontAwesomeIcon icon={faCoffee} className="text-4xl mb-2" />
              <p>Aucun produit disponible pour le moment</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-amber-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {getCategoryName(product.category)}
                  </p>
                  <p className="text-gray-700 mb-3 text-sm h-12 overflow-hidden">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-800 font-bold">
                      {product.price.toFixed(2)} €
                    </span>
                    <button className="bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700 transition">
                      <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}