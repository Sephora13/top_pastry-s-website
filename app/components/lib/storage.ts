'use client';

import { Product } from "@/app/types";


const PRODUCTS_STORAGE_KEY = 'cafeteria_products';

export const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'Gâteau d’exception',
    price: 25000,
    category: 'gateaux',
    image: '/image/gateau1.jpg',
    description: 'Une texture onctueuse et une décoration minutieuse, parfait pour vos événements.'
  },
  {
    id: 2,
    name: 'Fraisier Royal',
    price: 30000,
    category: 'gateaux',
    image: '/image/gateau2.jpg',
    description: 'Des fraises fraîches et une crème mousseline légère sur une génoise fondante.'
  },
  {
    id: 3,
    name: 'Choco Intense',
    price: 28000,
    category: 'gateaux',
    image: '/image/gateau3.jpg',
    description: 'Pour les puristes du chocolat, une création dense aux fèves de cacao sélectionnées.'
  },
  {
    id: 4,
    name: 'Croissants Pur Beurre',
    price: 1500,
    category: 'viennoiseries',
    image: '/image/croissants.jpg',
    description: 'Croustillants à l\'extérieur et moelleux à l\'intérieur, préparés au beurre d\'Isigny.'
  },
  {
    id: 5,
    name: 'Friands Viande',
    price: 2000,
    category: 'viennoiseries',
    image: '/image/friands.jpg',
    description: 'Un feuilletage délicat et une farce à la viande savoureuse.'
  },
  {
    id: 6,
    name: 'Mini Burgers',
    price: 3000,
    category: 'viennoiseries',
    image: '/image/mini_burger1.jpg',
    description: 'Mini burgers moelleux, parfaits pour vos réceptions et événements.'
  },
  {
    id: 7,
    name: 'Salade Fraîcheur',
    price: 4500,
    category: 'salades',
    image: '/image/salade1.jpg',
    description: 'Un mélange croquant de crudités de saison avec une vinaigrette maison.'
  },
  {
    id: 8,
    name: 'Salade Gourmande',
    price: 5000,
    category: 'salades',
    image: '/image/salade2.jpg',
    description: 'Quinoa, légumes grillés et féta pour un repas complet et équilibré.'
  },
  {
    id: 9,
    name: 'Jus Detox Vert',
    price: 2500,
    category: 'jus',
    image: '/image/jus1.jpg',
    description: 'Pomme, céleri, concombre et citron pour une pause rafraîchissante.'
  },
  {
    id: 10,
    name: 'Yaourt Onctueux',
    price: 3000,
    category: 'jus',
    image: '/image/jus2.jpg',
    description: 'Un yaourt artisanal brassé, parfait pour accompagner vos repas.'
  }
];

export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return defaultProducts;
  
  const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  
  if (storedProducts) {
    try {
      return JSON.parse(storedProducts);
    } catch (e) {
      console.error('Error parsing stored products', e);
      return defaultProducts;
    }
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
    'gateaux': 'Gâteaux personnalisés',
    'viennoiseries': 'Viennoiseries & snacks',
    'salades': 'Salades fraîches',
    'jus': 'Jus detox & yaourts'
  };
  
  return categories[category] || 'Autre';
};