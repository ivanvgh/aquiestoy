import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "AquiEstoy - Servicios de Hogar en Arequipa",
    template: "%s | AquiEstoy",
  },
  description:
    "AquiEstoy conecta a Arequipa con técnicos verificados, puntuales y con precios transparentes. Gasfitería, electricidad, limpieza y más.",
  metadataBase: new URL("https://aquiestoy.pe"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AquiEstoy - Servicios de Hogar en Arequipa",
    description:
      "Conecta con técnicos verificados en Arequipa. Gasfitería, electricidad, limpieza, pintura y más. Precios transparentes y garantía total.",
    url: "https://aquiestoy.pe",
    siteName: "AquiEstoy",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "AquiEstoy - Técnicos verificados en Arequipa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AquiEstoy - Servicios de Hogar en Arequipa",
    description:
      "Técnicos verificados, puntuales y con precios transparentes en Arequipa.",
    images: ["/images/og-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className="font-body bg-background-light text-slate-900 overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
