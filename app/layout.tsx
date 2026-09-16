import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Metrology 3D Scanning & 3D Printing in Bangor, PA`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": siteConfig.name,
  "image": `${siteConfig.url}/logo.png`,
  "telephone": siteConfig.contact.phoneRaw,
  "email": siteConfig.contact.email,
  "url": siteConfig.url,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": siteConfig.location.address,
    "addressLocality": siteConfig.location.city,
    "addressRegion": siteConfig.location.state,
    "postalCode": siteConfig.location.zip,
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.8657",
    "longitude": "-75.2074",
  },
  "openingHours": "Mo-Fr 08:00-18:00",
  "priceRange": "$$",
  "areaServed": ["Bangor", "Slate Belt", "Lehigh Valley", "Pen Argyl", "Wind Gap", "Nazareth"],
  "knowsAbout": [
    "3D Scanning",
    "Revopoint METRO X Metrology Scanning",
    "3D Printing",
    "Bambu Lab X1 Carbon",
    "Reverse Engineering",
    "Laser Engraving",
    "Replacement Parts",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
