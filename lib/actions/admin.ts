"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabaseServer";
import { defaultSiteContent } from "@/lib/content";

export interface AdminProduct {
  id: string;
  title: string;
  price: number;
  category: string;
  in_stock: boolean;
  image: string;
  created_at?: string;
}

export interface SiteContentValues {
  heroHeadline: string;
  heroSubtitle: string;
  phone: string;
  address: string;
}

/**
 * Fetch all products for the Admin Portal
 */
export async function getAdminProducts(): Promise<AdminProduct[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabaseServer
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Could not fetch products from Supabase:", error.message);
      return [];
    }

    return (data || []).map((row: any) => ({
      id: String(row.id),
      title: row.title || "Untitled Product",
      price: Number(row.price) || 0,
      category: row.category || "Filament",
      in_stock: row.in_stock !== false && row.inStock !== false,
      image: row.image || "/uploads/overture-spool.png",
      created_at: row.created_at,
    }));
  } catch (err) {
    console.error("Error in getAdminProducts:", err);
    return [];
  }
}

/**
 * Delete a product by ID
 */
export async function deleteProductAction(id: string) {
  try {
    const { error } = await supabaseServer.from("products").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    revalidatePath("/store");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to delete product" };
  }
}

/**
 * Toggle product stock status
 */
export async function toggleProductStockAction(id: string, inStock: boolean) {
  try {
    const { error } = await supabaseServer
      .from("products")
      .update({ in_stock: inStock })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }
    revalidatePath("/store");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update stock" };
  }
}

/**
 * Add or update a product with optional image upload to product-images bucket
 */
export async function saveProductAction(formData: FormData) {
  try {
    const id = formData.get("id") as string | null;
    const title = (formData.get("title") as string)?.trim() || "Untitled Product";
    const price = parseFloat(formData.get("price") as string) || 0;
    const category = (formData.get("category") as string)?.trim() || "PLA";
    const inStock = formData.get("in_stock") === "true" || formData.get("in_stock") === "on";
    const imageFile = formData.get("imageFile") as File | null;
    let imageUrl = (formData.get("imageUrl") as string) || "/uploads/overture-spool.png";

    // If an image file was uploaded, upload to Supabase storage bucket 'product-images'
    if (imageFile && imageFile.size > 0 && typeof imageFile.arrayBuffer === "function") {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const ext = imageFile.name.split(".").pop() || "png";
      const cleanFileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

      const { data: uploadData, error: uploadError } = await supabaseServer.storage
        .from("product-images")
        .upload(cleanFileName, buffer, {
          contentType: imageFile.type || `image/${ext}`,
          upsert: true,
        });

      if (uploadError) {
        console.warn("Storage upload warning:", uploadError.message);
      } else if (uploadData) {
        const { data: urlData } = supabaseServer.storage
          .from("product-images")
          .getPublicUrl(cleanFileName);

        if (urlData?.publicUrl) {
          imageUrl = urlData.publicUrl;
        }
      }
    }

    if (id) {
      // Update existing
      const { error } = await supabaseServer
        .from("products")
        .update({
          title,
          price,
          category,
          in_stock: inStock,
          image: imageUrl,
        })
        .eq("id", id);

      if (error) return { success: false, error: error.message };
    } else {
      // Insert new
      const { error } = await supabaseServer.from("products").insert([
        {
          title,
          price,
          category,
          in_stock: inStock,
          image: imageUrl,
        },
      ]);

      if (error) return { success: false, error: error.message };
    }

    revalidatePath("/store");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to save product" };
  }
}

/**
 * Fetch site content key-value pairs
 */
export async function getSiteContentData(): Promise<SiteContentValues> {
  if (!isSupabaseConfigured()) {
    return defaultSiteContent;
  }

  try {
    const { data, error } = await supabaseServer.from("site_content").select("*");

    if (error || !data || data.length === 0) {
      return defaultSiteContent;
    }

    const result: SiteContentValues = { ...defaultSiteContent };

    // Support key-value pair rows: [{ key: 'heroHeadline', value: '...' }]
    for (const row of data) {
      if (row.key && row.value !== undefined) {
        if (row.key === "heroHeadline" || row.key === "hero_headline") {
          result.heroHeadline = row.value;
        } else if (row.key === "heroSubtitle" || row.key === "hero_subtitle") {
          result.heroSubtitle = row.value;
        } else if (row.key === "phone" || row.key === "phoneNumber" || row.key === "phone_number") {
          result.phone = row.value;
        } else if (row.key === "address" || row.key === "bangorAddress" || row.key === "bangor_address") {
          result.address = row.value;
        }
      } else {
        // Support single record with column names
        if (row.heroHeadline || row.hero_headline) {
          result.heroHeadline = row.heroHeadline || row.hero_headline;
        }
        if (row.heroSubtitle || row.hero_subtitle) {
          result.heroSubtitle = row.heroSubtitle || row.hero_subtitle;
        }
        if (row.phone || row.phoneNumber || row.phone_number) {
          result.phone = row.phone || row.phoneNumber || row.phone_number;
        }
        if (row.address || row.bangorAddress || row.bangor_address) {
          result.address = row.address || row.bangorAddress || row.bangor_address;
        }
      }
    }

    return result;
  } catch (err) {
    console.error("Error fetching site content:", err);
    return defaultSiteContent;
  }
}

/**
 * Save Site Content changes and revalidate the home page
 */
export async function saveSiteContentAction(formData: FormData) {
  try {
    const heroHeadline = (formData.get("heroHeadline") as string)?.trim() || "";
    const heroSubtitle = (formData.get("heroSubtitle") as string)?.trim() || "";
    const phone = (formData.get("phone") as string)?.trim() || "";
    const address = (formData.get("address") as string)?.trim() || "";

    const entries = [
      { key: "heroHeadline", value: heroHeadline },
      { key: "heroSubtitle", value: heroSubtitle },
      { key: "phone", value: phone },
      { key: "address", value: address },
    ];

    // Try upserting key-value records
    const { error: kvError } = await supabaseServer
      .from("site_content")
      .upsert(entries, { onConflict: "key" });

    // Fallback if table was structured as single columns row
    if (kvError) {
      console.warn("Key-value upsert error, trying columns upsert:", kvError.message);
      await supabaseServer.from("site_content").upsert({
        id: 1,
        heroHeadline,
        heroSubtitle,
        phone,
        address,
      });
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to save site content" };
  }
}
