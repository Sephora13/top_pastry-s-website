import { Client, Account, ID } from "appwrite";

// déclaration du  type de  client
export const client: Client = new Client();

// Configuration du client
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

// On crée une instance du service Account
export const account: Account = new Account(client);

// On exporte aussi ID (utilisé pour générer des identifiants uniques)
export { ID };
