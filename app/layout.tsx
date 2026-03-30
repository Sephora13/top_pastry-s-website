import type { Metadata } from "next";
import { Josefin_Sans, Fredoka } from "next/font/google";
import "./globals.css";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  weight: ["400", "500", "600", "700"],
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-custom",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Top pastry",
  description: "Votre pâtisserie béninoise favorie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"></link>
      </head>
      <body suppressHydrationWarning className={`${josefin.variable} ${fredoka.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
