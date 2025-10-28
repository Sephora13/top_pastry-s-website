'use client';

import { Product } from "@/app/types";


const PRODUCTS_STORAGE_KEY = 'cafeteria_products';

export const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'Café Espresso',
    price: 2.50,
    category: 'cafe',
    image: '/image/salade_jus.jpg',
    description: 'Un espresso intense et corsé, préparé avec nos grains de café fraîchement torréfiés.'
  },
  {
    id: 2,
    name: 'Cappuccino',
    price: 3.50,
    category: 'cafe',
    image: '/image/salade5.jpg',
    description: 'Un mélange parfait d\'espresso, de lait chaud et de mousse de lait onctueuse.'
  },
  {
    id: 3,
    name: 'Gâteau au Chocolat',
    price: 4.95,
    category: 'dessert',
    image: '/image/gateau6.jpg',
    description: 'Un délicieux gâteau au chocolat fondant, servi avec une boule de glace à la vanille.'
  },
    {
    id: 4,
    name: 'Gâteau au Chocolat',
    price: 4.95,
    category: 'dessert',
    image: '/image/gateau11.jpg',
    description: 'Un délicieux gâteau au chocolat fondant, servi avec une boule de glace à la vanille.'
  },
    {
    id: 5,
    name: 'Gâteau au Chocolat',
    price: 4.95,
    category: 'dessert',
    image: '/image/gateau12.jpg',
    description: 'Un délicieux gâteau au chocolat fondant, servi avec une boule de glace à la vanille.'
  },
    {
    id: 6,
    name: 'Gâteau au Chocolat',
    price: 4.95,
    category: 'dessert',
    image: '/image/gateau15.jpg',
    description: 'Un délicieux gâteau au chocolat fondant, servi avec une boule de glace à la vanille.'
  },
  {
    id: 7,
    name: 'Thé Vert',
    price: 2.95,
    category: 'boisson',
    image: '/image/salade_jus.jpg',
    description: 'Un thé vert rafraîchissant aux notes délicates, parfait pour se détendre.'
  },
  {
    id: 8,
    name: 'Croissant',
    price: 2.25,
    category: 'petit-dejeuner',
    image: '/image/salade_jus.jpg',
    description: 'Un croissant français traditionnel, beurré et croustillant, fraîchement sorti du four.'
  },
  {
    id: 9,
    name: 'Croissant',
    price: 2.25,
    category: 'petit-dejeuner',
    image: '/image/salade_jus.jpg',
    description: 'Un croissant français traditionnel, beurré et croustillant, fraîchement sorti du four.'
  },
  {
    id: 10,
    name: 'Croissant',
    price: 2.25,
    category: 'petit-dejeuner',
    image: '/image/salade_jus.jpg',
    description: 'Un croissant français traditionnel, beurré et croustillant, fraîchement sorti du four.'
  },
  {
    id: 11,
    name: 'Croissant',
    price: 2.25,
    category: 'petit-dejeuner',
    image: '/image/salade_jus.jpg',
    description: 'Un croissant français traditionnel, beurré et croustillant, fraîchement sorti du four.'
  },
  {
    id: 12,
    name: 'salade',
    price: 2.25,
    category: 'cafe',
    image: '/image/salade6.jpg',
    description: 'Un croissant français traditionnel, beurré et croustillant, fraîchement sorti du four.'
  },
  {
    id: 13,
    name: 'salade',
    price: 2.25,
    category: 'cafe',
    image: '/image/salade2.jpg',
    description: 'Un croissant français traditionnel, beurré et croustillant, fraîchement sorti du four.' 
  }
];

export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return defaultProducts;
  
  const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  
  saveProducts(defaultProducts);
  return defaultProducts;
};

export const saveProducts = (products: Product[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
};

export const addProduct = (product: Product): void => {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
};

export const deleteProduct = (productId: number): void => {
  const products = getProducts();
  const updatedProducts = products.filter(product => product.id !== productId);
  saveProducts(updatedProducts);
};

export const getCategoryName = (category: string): string => {
  const categories: Record<string, string> = {
    'cafe': 'Café',
    'dessert': 'Dessert',
    'boisson': 'Boisson',
    'petit-dejeuner': 'Petit-déjeuner'
  };
  
  return categories[category] || 'Autre';
};