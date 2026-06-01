export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'gateaux' | 'viennoiseries' | 'salades' | 'jus';
  image: string;
  description: string;
  status?: 'active' | 'inactive';
  color?: string;
  stocks?: number;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

export type CategoryFilter = 'all' | Product['category'];

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'unpaid' | 'payment_pending' | 'payment_processing' | 'paid' | 'failed';

export interface Transaction {
  id: string;
  method: string;
  amount: number;
  timestamp: string;
  reference?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerPhone: string;
  customerName: string;
  deliveryAddress?: string;
  status: OrderStatus;
  createdAt: string;
  validatedAt?: string;
  transaction?: Transaction;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}