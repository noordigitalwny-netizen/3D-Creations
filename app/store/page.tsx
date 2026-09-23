import React from "react";
import { Metadata } from "next";
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabaseServer";
import { getProducts, Product } from "@/lib/content";
import StoreCatalog from "@/components/store/StoreCatalog";

export const metadata: Metadata = {
  title: "Filament Store | 3D Creations Bangor, PA",
  description:
    "Buy sealed 1.75mm 3D printing filament with same-day local pickup in Bangor and Slate Belt, PA. Overture PLA and specialty filaments.",
};

export const revalidate = 60; // ISR fallback revalidation

export default async function StorePage() {
  let products: Product[] = [];

  if (isSupabaseConfigured()) {
    try {
      // Fetch all products from the products table (including out of stock)
      const { data, error } = await supabaseServer
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        products = data.map((row: any) => {
          const title = row.title || "Untitled Spool";
          let image = row.image || "/uploads/overture-spool.png";
          const inStock = row.in_stock !== false && row.inStock !== false;

          return {
            slug: String(row.id || title.toLowerCase().replace(/[^a-z0-9]/g, "-")),
            title,
            plainDescription: row.description || `High-quality ${row.category || "PLA"} 3D printing filament.`,
            price: typeof row.price === "number" ? row.price : parseFloat(row.price) || 24.99,
            category: row.category || "PLA",
            inStock,
            image,
            colorName:
              title
                .replace(/Overture\s+/i, "")
                .replace(/\s+PLA.*$/i, "")
                .replace(/\s+Spool.*$/i, "")
                .trim() || "Standard",
            colorHex: row.colorHex || "#1e293b",
            diameter: row.diameter || "1.75 mm",
            weight: row.weight || "1.0 kg (2.2 lbs)",
            isPopular: Boolean(row.isPopular),
          };
        });
      }
    } catch (err) {
      console.warn("Could not load products from Supabase, falling back to local:", err);
    }
  }

  // Graceful fallback to local file inventory if Supabase table is empty or uninitialized
  if (products.length === 0) {
    products = getProducts();
  }

  return <StoreCatalog products={products} />;
}
