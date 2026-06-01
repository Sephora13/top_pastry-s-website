"use server";

import { Order } from '../types';

export async function sendWhatsAppNotification(order: Order) {
  const token = process.env.WACHAP_TOKEN;
  const accountId = process.env.WACHAP_ACCOUNT_ID;

  if (!token || !accountId) {
    console.warn("Les clés d'API Wachap ne sont pas configurées. Notification ignorée.");
    return { success: false, error: 'Configuration manquante' };
  }

  // Formatage du message récapitulatif
  const itemsList = order.items
    .map(item => `- ${item.quantity}x ${item.name} (${item.price * item.quantity} CFA)`)
    .join('\n');

  const caption = `🛒 *Nouvelle Commande (Ref: ${order.id})*\n\n` +
    `*Client:* ${order.customerName}\n` +
    `*Téléphone:* ${order.customerPhone}\n\n` +
    `*Détails:*\n${itemsList}\n\n` +
    `*Total:* ${order.totalAmount} CFA\n` +
    `*Statut:* ${order.status === 'paid' ? '✅ Payé' : '⏳ En attente'}`;

  // Image d'illustration (on prend la première image du panier ou une image par défaut)
  const imageUrl = order.items[0]?.image || 'https://via.placeholder.com/400x400.png?text=Commande+Top+Pastris';

  try {
    const response = await fetch('https://api.wachap.com/v1/whatsapp/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          accountId: accountId,
          to: order.customerPhone,
          type: 'image',
          imageUrl: imageUrl,
          caption: caption,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur lors de l\'envoi Wachap:', errorData);
      return { success: false, error: 'Erreur API Wachap' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Erreur réseau Wachap:', error);
    return { success: false, error: 'Erreur réseau' };
  }
}
