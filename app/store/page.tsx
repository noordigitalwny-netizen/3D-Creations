import React from "react";
import { getProducts } from "@/lib/content";
import StoreCatalog from "@/components/store/StoreCatalog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filament Store | 3D Creations Bangor, PA",
  description:
    "Buy sealed 1.75mm 3D printing filament with same-day local pickup in Bangor and Slate Belt, PA. Overture PLA and specialty filaments.",
};

export default function StorePage() {
  // Read all product entries from content/products/ (filters out inStock === false automatically)
  const products = getProducts();

  return <StoreCatalog products={products} />;
}
