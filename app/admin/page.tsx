// src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { getProducts, addProduct, deleteProduct, getCategoryName } from '../components/lib/storage';
import { Product } from '@/app/types';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category as Product['category'],
      image: formData.image,
      description: formData.description
    };

    addProduct(newProduct);
    loadProducts();
    
    // Réinitialiser le formulaire
    setFormData({
      name: '',
      price: '',
      category: '',
      image: '',
      description: ''
    });

    alert('Produit ajouté avec succès !');
  };

  const handleDelete = (productId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      deleteProduct(productId);
      loadProducts();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-900">
            Gestion des Produits
          </h2>
          <Link
            href="/produits"
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
          >
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            Voir les produits
          </Link>
        </div>

        {/* Formulaire d'ajout */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-amber-800 mb-4">
            Ajouter un nouveau produit
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">
                  Nom du produit
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700 mb-1">
                  Prix (€)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-700 mb-1">
                Catégorie
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="cafe">Café</option>
                <option value="dessert">Dessert</option>
                <option value="boisson">Boisson</option>
                <option value="petit-dejeuner">Petit-déjeuner</option>
              </select>
            </div>

            <div>
              <label htmlFor="image" className="block text-gray-700 mb-1">
                URL de l&apos;image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-amber-800 text-white px-6 py-2 rounded hover:bg-amber-900 transition"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                Ajouter le produit
              </button>
            </div>
          </form>
        </div>

        {/* Liste des produits */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-amber-800 mb-4">
            Produits existants
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-amber-100">
                <tr>
                  <th className="py-2 px-4 text-left">Image</th>
                  <th className="py-2 px-4 text-left">Nom</th>
                  <th className="py-2 px-4 text-left">Catégorie</th>
                  <th className="py-2 px-4 text-left">Prix</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr className="border-b">
                    <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                      Aucun produit disponible
                    </td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product.id} className="border-b hover:bg-amber-50">
                      <td className="py-2 px-4">
                        <div className="relative w-16 h-16">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                            sizes="64px"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-4">{product.name}</td>
                      <td className="py-2 px-4">
                        {getCategoryName(product.category)}
                      </td>
                      <td className="py-2 px-4">{product.price.toFixed(2)} €</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}