'use client';

import { Product } from "@/app/types";


const PRODUCTS_STORAGE_KEY = 'cafeteria_products_v2';

export const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'Gâteau d’exception',
    price: 25000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724236/gateau6_dc6vwq.jpg',
    description: 'Une texture onctueuse et une décoration minutieuse, parfait pour vos événements.'
  },
  {
    id: 2,
    name: 'Fraisier Royal',
    price: 30000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724232/gateau7_enoey1.jpg',
    description: 'Des fraises fraîches et une crème mousseline légère sur une génoise fondante.'
  },
  {
    id: 3,
    name: 'Choco Intense',
    price: 28000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724230/gateau3_vpcpkr.jpg',
    description: 'Pour les puristes du chocolat, une création dense aux fèves de cacao sélectionnées.'
  },
  {
    id: 4,
    name: 'Croissants Pur Beurre',
    price: 1500,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724230/snack_sale%CC%81_5_ar3whq.jpg',
    description: 'Croustillants à l\'extérieur et moelleux à l\'intérieur, préparés au beurre d\'Isigny.'
  },
  {
    id: 5,
    name: 'Friands Viande',
    price: 2000,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707761/Screenshot_20251028_123049_WhatsAppBusiness_gyogtd.jpg',
    description: 'Un feuilletage délicat et une farce à la viande savoureuse.'
  },
  {
    id: 6,
    name: 'Mini Burgers',
    price: 3000,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707736/mini_burger2_awtum1.jpg',
    description: 'Mini burgers moelleux, parfaits pour vos réceptions et événements.'
  },
  {
    id: 7,
    name: 'Salade Fraîcheur',
    price: 4500,
    category: 'salades',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707745/salade7_b3twpq.jpg',
    description: 'Un mélange croquant de crudités de saison avec une vinaigrette maison.'
  },
  {
    id: 8,
    name: 'Salade Gourmande',
    price: 5000,
    category: 'salades',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707747/salade8_a4wx77.jpg',
    description: 'Quinoa, légumes grillés et féta pour un repas complet et équilibré.'
  },
  {
    id: 9,
    name: 'Jus Detox Vert',
    price: 2500,
    category: 'jus',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707732/jus2_uq7lf0.jpg',
    description: 'Pomme, céleri, concombre et citron pour une pause rafraîchissante.'
  },
  {
    id: 10,
    name: 'Yaourt Onctueux',
    price: 3000,
    category: 'jus',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707733/jus3_ot3oaf.jpg',
    description: 'Un yaourt artisanal brassé, parfait pour accompagner vos repas.'
  },
  {
    id: 11,
    name: 'Gâteau Délice',
    price: 28000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724236/gateau6_dc6vwq.jpg',
    description: 'Un gâteau gourmand pour toutes vos occasions.'
  },
  {
    id: 12,
    name: 'Gâteau Élégance',
    price: 32000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724232/gateau7_enoey1.jpg',
    description: 'L\'élégance incarnée dans un dessert.'
  },
  {
    id: 13,
    name: 'Snack Salé Gourmand',
    price: 2500,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724230/snack_sale%CC%81_5_ar3whq.jpg',
    description: 'Un en-cas salé parfait pour combler une petite faim.'
  },
  {
    id: 14,
    name: 'Gâteau Signature',
    price: 29000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724230/gateau5_jgu431.jpg',
    description: 'Notre gâteau signature aux saveurs uniques.'
  },
  {
    id: 15,
    name: 'Choco Framboise',
    price: 27000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724230/gateau3_vpcpkr.jpg',
    description: 'L\'alliance parfaite du chocolat et de la framboise.'
  },
  {
    id: 16,
    name: 'Cure Detox',
    price: 3500,
    category: 'jus',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724226/detox_rqyh2f.jpg',
    description: 'Une cure detox pour faire le plein de vitamines.'
  },
  {
    id: 17,
    name: 'Jus Santé',
    price: 3000,
    category: 'jus',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724226/jus_detox_qndqta.jpg',
    description: 'Un jus 100% naturel pressé à froid.'
  },
  {
    id: 18,
    name: 'Pack Snack Mix',
    price: 5000,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724225/pack_snack_abjqce.jpg',
    description: 'Un assortiment de nos meilleurs snacks salés.'
  },
  {
    id: 19,
    name: 'Gâteau d\'Anniversaire',
    price: 35000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724226/gateau_d_anniversaire_dj5qey.jpg',
    description: 'Le gâteau parfait pour célébrer vos anniversaires.'
  },
  {
    id: 20,
    name: 'Mini Quiche',
    price: 2000,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724224/snack_sale%CC%81_4_kzz46b.jpg',
    description: 'Des mini quiches savoureuses faites maison.'
  },
  {
    id: 21,
    name: 'Gâteau Classique',
    price: 24000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724220/gateau_akl7x7.jpg',
    description: 'Un grand classique de la pâtisserie revisité.'
  },
  {
    id: 22,
    name: 'Tarte Douceur',
    price: 22000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724228/gateau2_nnov9j.jpg',
    description: 'Une tarte douce et fruitée.'
  },
  {
    id: 23,
    name: 'Gâteau Événement',
    price: 45000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724220/event_hg0kfp.jpg',
    description: 'Un gâteau majestueux pour vos grands événements.'
  },
  {
    id: 24,
    name: 'Feuilleté Fromage',
    price: 1800,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724220/snack_sale%CC%81_2_u6oe8k.jpg',
    description: 'Un feuilleté croustillant au fromage fondant.'
  },
  {
    id: 25,
    name: 'Assortiment Salé',
    price: 4000,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707761/Screenshot_20251028_123049_WhatsAppBusiness_gyogtd.jpg',
    description: 'Un assortiment de bouchées salées.'
  },
  {
    id: 26,
    name: 'Bouchées Apéritives',
    price: 3500,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707761/Screenshot_20251028_122723_WhatsAppBusiness_vnqw81.jpg',
    description: 'De petites bouchées parfaites pour l\'apéritif.'
  },
  {
    id: 27,
    name: 'Plateau Réception',
    price: 8000,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707760/Screenshot_20251028_123053_WhatsAppBusiness_pwozuv.jpg',
    description: 'Un grand plateau idéal pour les réceptions.'
  },
  {
    id: 28,
    name: 'Mignardises Salées',
    price: 5000,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707760/Screenshot_20251028_122807_WhatsAppBusiness_ypgd0n.jpg',
    description: 'Des mignardises salées raffinées.'
  },
  {
    id: 29,
    name: 'Snack Salé Varié',
    price: 3000,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707759/Screenshot_20251028_122754_WhatsAppBusiness_qej5dn.jpg',
    description: 'Des snacks salés variés pour tous les goûts.'
  },
  {
    id: 30,
    name: 'Croissant au Jambon',
    price: 2500,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707750/Screenshot_20251028_122557_WhatsAppBusiness_bhy2sd.jpg',
    description: 'Un délicieux croissant garni de jambon et de fromage.'
  },
  {
    id: 31,
    name: 'Salade Composée',
    price: 5500,
    category: 'salades',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707747/salade8_a4wx77.jpg',
    description: 'Une salade composée riche et colorée.'
  },
  {
    id: 32,
    name: 'Menu Salade & Jus',
    price: 7000,
    category: 'salades',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707747/Screenshot_20251028_122135_WhatsAppBusiness_yqgswu.jpg',
    description: 'Un combo parfait pour un repas sain et équilibré.'
  },
  {
    id: 33,
    name: 'Salade Verte & Fruits',
    price: 6000,
    category: 'salades',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707745/salade7_b3twpq.jpg',
    description: 'Une salade verte fraîche accompagnée de fruits.'
  },
  {
    id: 34,
    name: 'Salade Végétarienne',
    price: 4500,
    category: 'salades',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707744/salade6_mpy9yn.jpg',
    description: 'Une salade 100% végétarienne et gourmande.'
  },
  {
    id: 35,
    name: 'Mini Burger Spécial',
    price: 3500,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707736/mini_burger2_awtum1.jpg',
    description: 'Notre mini burger signature.'
  },
  {
    id: 36,
    name: 'Jus Hero',
    price: 3500,
    category: 'jus',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707734/hero_juice_p8ep3n.jpg',
    description: 'Un jus tonifiant pour démarrer la journée.'
  },
  {
    id: 37,
    name: 'Gâteau Festif',
    price: 26000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707726/gateau17_hzjygd.jpg',
    description: 'Un gâteau festif pour célébrer en beauté.'
  },
  {
    id: 38,
    name: 'Jus Tropical',
    price: 2500,
    category: 'jus',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707733/jus3_ot3oaf.jpg',
    description: 'Un mélange exotique de fruits tropicaux.'
  },
  {
    id: 39,
    name: 'Smoothie Énergie',
    price: 3000,
    category: 'jus',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707732/jus2_uq7lf0.jpg',
    description: 'Un smoothie riche en vitamines et en énergie.'
  },
  {
    id: 40,
    name: 'Jus Matinal',
    price: 2500,
    category: 'jus',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707730/jus_1_ufnw5j.jpg',
    description: 'L\'allié parfait pour votre petit déjeuner.'
  },
  {
    id: 41,
    name: 'Cocktail Detox',
    price: 4000,
    category: 'jus',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707734/jus5_gchrq8.jpg',
    description: 'Un cocktail detox purifiant et rafraîchissant.'
  },
  {
    id: 42,
    name: 'Friand Maison',
    price: 2200,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707725/friands_mi01c6.jpg',
    description: 'Un friand croustillant fait maison.'
  },
  {
    id: 43,
    name: 'Croissant Gourmet',
    price: 1800,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707723/croissants3_froeii.jpg',
    description: 'Un croissant revisité façon gourmet.'
  },
  {
    id: 44,
    name: 'Croissant Sucré',
    price: 1600,
    category: 'viennoiseries',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707719/croissant2_qvrv7d.jpg',
    description: 'Un croissant délicatement sucré.'
  },
  {
    id: 45,
    name: 'Gâteau Praliné',
    price: 29000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707718/gateau10_btq37c.jpg',
    description: 'Un gâteau gourmand au goût praliné.'
  },
  {
    id: 46,
    name: 'Gâteau Vanille',
    price: 25000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707716/gateau9_nj1fey.jpg',
    description: 'Un classique indémodable à la vanille.'
  },
  {
    id: 47,
    name: 'Gâteau Chocolat Blanc',
    price: 28000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707715/gateau6_xktcgw.jpg',
    description: 'Un gâteau fondant au chocolat blanc.'
  },
  {
    id: 48,
    name: 'Gâteau Multi-saveurs',
    price: 33000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707715/gateau8_sbreaq.jpg',
    description: 'Plusieurs saveurs réunies dans un seul gâteau.'
  },
  {
    id: 49,
    name: 'Gâteau Royal',
    price: 40000,
    category: 'gateaux',
    image: 'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707725/gateau16_bi2n3w.jpg',
    description: 'Le gâteau idéal pour un banquet royal.'
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