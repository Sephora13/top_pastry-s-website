import { Order, OrderStatus } from '../types';

const ORDERS_KEY = 'top_pastry_orders';

export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(ORDERS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing orders from local storage', e);
      return [];
    }
  }
  return [];
};

export const saveOrder = async (order: Order): Promise<Order> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = getOrders();
      orders.push(order);
      if (typeof window !== 'undefined') {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      }
      console.log('Commande sauvegardée dans le localStorage:', order);
      resolve(order);
    }, 500);
  });
};

export const updateOrderStatus = (orderId: string, status: OrderStatus): Order | null => {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;
  orders[index] = { ...orders[index], status };
  if (status === 'paid') {
    orders[index].validatedAt = new Date().toISOString();
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
  return orders[index];
};

export const recordTransaction = (orderId: string, method: string, reference?: string): Order | null => {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;
  orders[index] = {
    ...orders[index],
    status: 'paid',
    validatedAt: new Date().toISOString(),
    transaction: {
      id: `TXN-${Date.now().toString(36).toUpperCase()}`,
      method,
      amount: orders[index].totalAmount,
      timestamp: new Date().toISOString(),
      reference,
    },
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
  return orders[index];
};

export const getOrderById = async (id: string): Promise<Order | undefined> => {
  return getOrders().find((o) => o.id === id);
};

export const clearOrders = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ORDERS_KEY);
  }
};
