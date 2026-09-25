import React from "react";
import { Metadata } from "next";
import { getAdminGalleryItems } from "@/lib/actions/admin";
import { galleryData, GalleryItem } from "@/data/gallery";
import GalleryClient from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Project & Scanning Gallery | 3D Creations Bangor, PA",
  description:
    "Showcasing real metrology 3D scans, multi-color prints, laser projects, and custom replacement parts completed in Bangor, PA.",
};

export const revalidate = 60; // ISR revalidation

export default async function GalleryPage() {
  let items: GalleryItem[] = [];

  try {
    const dbItems = await getAdminGalleryItems();
    if (dbItems && dbItems.length > 0) {
      items = dbItems.map((row) => ({
        id: row.id,
        title: row.title,
        category: (row.category || "3D Prints") as any,
        description: row.description || "Precision scanning & additive manufacturing showcase.",
        equipmentUsed: row.equipmentUsed || "Bangor Studio Hardware",
        materialOrAccuracy: row.materialOrAccuracy || "0.02mm Metrology Accuracy",
        tags: ["Custom Project", row.category || "3D Printing"],
        imageUrl: row.imageUrl,
        svgColor: "cyan",
      }));
    }
  } catch (err) {
    console.warn("Could not fetch gallery items from Supabase, falling back:", err);
  }

  // Graceful fallback to static portfolio if database table is empty
  if (items.length === 0) {
    items = galleryData;
  }

  return <GalleryClient initialItems={items} />;
}
