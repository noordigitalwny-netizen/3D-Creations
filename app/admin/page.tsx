import React from "react";
import { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import {
  getAdminProducts,
  getSiteContentData,
  getAdminGalleryItems,
} from "@/lib/actions/admin";

export const metadata: Metadata = {
  title: "Admin Dashboard | 3D Creations",
  robots: {
    index: false,
    follow: false,
  },
};

// Force dynamic rendering to always load fresh data in the admin dashboard
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [products, content, gallery] = await Promise.all([
    getAdminProducts(),
    getSiteContentData(),
    getAdminGalleryItems(),
  ]);

  return (
    <AdminDashboard
      initialProducts={products}
      initialContent={content}
      initialGallery={gallery}
    />
  );
}
