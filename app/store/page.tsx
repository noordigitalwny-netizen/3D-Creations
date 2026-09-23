import React from "react";
import { Metadata } from "next";
import client from "@/tina/__generated__/client";
import { getProducts, TinaProduct, extractPlainText } from "@/lib/content";
import StoreCatalog from "@/components/store/StoreCatalog";

export const metadata: Metadata = {
  title: "Filament Store | 3D Creations Bangor, PA",
  description:
    "Buy sealed 1.75mm 3D printing filament with same-day local pickup in Bangor and Slate Belt, PA. Overture PLA and specialty filaments.",
};

export default async function StorePage() {
  let products: TinaProduct[] = [];

  try {
    // 1. Data Fetching: fetch productsConnection from Tina client
    const res = await client.queries.productsConnection({});
    const edges = res?.data?.productsConnection?.edges || [];

    // Map over the edges/nodes returned by the GraphQL response
    for (const edge of edges) {
      const node = edge?.node;
      if (!node) continue;

      const slug = node._sys?.filename || node.id;
      // 2. UI Rendering: filter to only display products where inStock is true
      const inStock = node.inStock === true;
      if (!inStock) continue;

      // Ensure image src correctly points to /uploads path that Tina uses
      let image = node.image || "/uploads/overture-spool.png";
      if (image.startsWith("uploads/")) {
        image = `/${image}`;
      } else if (!image.startsWith("/") && !image.startsWith("http")) {
        image = `/uploads/${image}`;
      }

      const title = node.title || "Untitled Spool";
      const plainDesc = extractPlainText(node.description);

      products.push({
        slug,
        title,
        description: node.description,
        plainDescription: plainDesc,
        price: typeof node.price === "number" ? node.price : 24.99,
        category: node.category || "PLA",
        inStock,
        image,
        colorName:
          title
            .replace(/Overture\s+/i, "")
            .replace(/\s+PLA.*$/i, "")
            .replace(/\s+Spool.*$/i, "") || "Standard",
        colorHex: "#1e293b",
        diameter: "1.75 mm",
        weight: "1.0 kg (2.2 lbs)",
        isPopular: false,
      });
    }
  } catch {
    // Graceful fallback during static build/first build before local server is live
    products = getProducts().filter((p) => p.inStock === true);
  }

  // Fallback to local file inventory if GraphQL returned empty
  if (products.length === 0) {
    products = getProducts().filter((p) => p.inStock === true);
  }

  return <StoreCatalog products={products} />;
}
