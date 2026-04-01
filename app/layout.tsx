import type { Metadata } from "next";
import { Titan_One, Sora } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";

const titan = Titan_One({
  subsets: ["latin"],
  variable: "--font-titan",
  weight: ["400"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
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
      <body suppressHydrationWarning className={`${titan.variable} ${sora.variable} font-sans antialiased uppercase-titles`}>
        {children}
      </body>
    </html>
  );
}
