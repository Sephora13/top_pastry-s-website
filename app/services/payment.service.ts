import { Order, PaymentResult } from '../types';

/**
 * Service pour interagir avec FedaPay.
 * Ceci est une structure de base pour FedaPay. En production, vous devriez appeler l'API de FedaPay
 * depuis votre backend (Server Action / Route API) pour générer un lien de paiement.
 */
export const initiateFedaPayPayment = async (order: Order): Promise<PaymentResult> => {
  // Simulation de l'appel à FedaPay
  console.log(`Initialisation du paiement FedaPay pour la commande ${order.id} de ${order.totalAmount} CFA`);

  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulation d'une réponse réussie
      resolve({
        success: true,
        transactionId: `FEDA-${Math.random().toString(36).substring(7).toUpperCase()}`,
        message: 'Paiement initié avec succès',
      });
    }, 1500);
  });
};
