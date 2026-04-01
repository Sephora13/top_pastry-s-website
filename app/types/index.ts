export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'gateaux' | 'viennoiseries' | 'salades' | 'jus';
  image: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

export type CategoryFilter = 'all' | Product['category'];