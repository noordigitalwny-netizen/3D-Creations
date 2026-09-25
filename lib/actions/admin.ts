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
  logo?: string;
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
        console.error("Storage upload error:", uploadError.message);
        return {
          success: false,
          error: `Image upload failed: ${uploadError.message}. Please verify the 'product-images' bucket exists in Supabase with public read access.`,
        };
      }

      if (uploadData) {
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
        } else if (row.key === "logo" || row.key === "logo_url" || row.key === "logoUrl") {
          result.logo = row.value;
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
        if (row.logo || row.logo_url || row.logoUrl) {
          result.logo = row.logo || row.logo_url || row.logoUrl;
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

/**
 * Upload logo file to 'site-assets' bucket and update 'logo' in 'site_content' table
 */
export async function saveLogoAction(formData: FormData) {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase is not configured." };
  }

  try {
    const file = formData.get("logoFile") as File;
    if (!file || file.size === 0) {
      return { success: false, error: "Please select an image file to upload." };
    }

    const cleanFileName = `logo-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error: uploadError } = await supabaseServer.storage
      .from("site-assets")
      .upload(cleanFileName, buffer, {
        contentType: file.type || "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error for logo:", uploadError.message);
      return {
        success: false,
        error: `Logo upload failed: ${uploadError.message}. Please verify the 'site-assets' bucket exists with public access.`,
      };
    }

    const { data: urlData } = supabaseServer.storage
      .from("site-assets")
      .getPublicUrl(cleanFileName);

    const logoUrl = urlData.publicUrl;

    // Try upserting key-value record { key: 'logo', value: logoUrl }
    const { error: kvError } = await supabaseServer
      .from("site_content")
      .upsert([{ key: "logo", value: logoUrl }], { onConflict: "key" });

    if (kvError) {
      console.warn("Key-value logo upsert error, trying columns upsert:", kvError.message);
      await supabaseServer.from("site_content").upsert({
        id: 1,
        logo: logoUrl,
      });
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, url: logoUrl };
  } catch (err: any) {
    console.error("Error saving logo:", err);
    return { success: false, error: err?.message || "Failed to save logo" };
  }
}

export interface AdminGalleryItem {
  id: string;
  title: string;
  category?: string;
  description?: string;
  equipmentUsed?: string;
  materialOrAccuracy?: string;
  imageUrl: string;
  created_at?: string;
}

/**
 * Fetch all gallery items from Supabase 'gallery' table
 */
export async function getAdminGalleryItems(): Promise<AdminGalleryItem[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabaseServer
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.warn("Could not fetch gallery items:", error?.message);
      return [];
    }

    return data.map((row: any) => ({
      id: String(row.id),
      title: row.title || "Custom Project",
      category: row.category || "3D Prints",
      description: row.description || "Precision scanning & additive manufacturing showcase.",
      equipmentUsed: row.equipmentUsed || row.equipment_used || "Bangor Studio Hardware",
      materialOrAccuracy: row.materialOrAccuracy || row.material_or_accuracy || "High Precision",
      imageUrl: row.image_url || row.imageUrl || row.url || row.image || "",
      created_at: row.created_at,
    }));
  } catch (err) {
    console.error("Error in getAdminGalleryItems:", err);
    return [];
  }
}

/**
 * Upload image to 'site-assets' bucket and insert URL as a new row into 'gallery' table
 */
export async function uploadGalleryItemAction(formData: FormData) {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase is not configured." };
  }

  try {
    const file = formData.get("galleryFile") as File;
    const title = ((formData.get("title") as string) || "").trim();
    const category = ((formData.get("category") as string) || "3D Prints").trim();
    const description = ((formData.get("description") as string) || "").trim();

    if (!file || file.size === 0) {
      return { success: false, error: "Please select an image file to upload." };
    }

    const cleanFileName = `gallery-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error: uploadError } = await supabaseServer.storage
      .from("site-assets")
      .upload(cleanFileName, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error for gallery:", uploadError.message);
      return {
        success: false,
        error: `Gallery upload failed: ${uploadError.message}. Please verify the 'site-assets' bucket exists with public access.`,
      };
    }

    const { data: urlData } = supabaseServer.storage
      .from("site-assets")
      .getPublicUrl(cleanFileName);

    const imageUrl = urlData.publicUrl;
    const itemTitle = title || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

    let insertedItem: any = null;

    // Schema attempt 1: { image_url, title, category, description }
    let { data: insData, error: insError } = await supabaseServer
      .from("gallery")
      .insert([{
        image_url: imageUrl,
        title: itemTitle,
        category,
        description: description || "Custom studio project.",
      }])
      .select();

    if (insError) {
      // Schema attempt 2: { url, title }
      const retry1 = await supabaseServer
        .from("gallery")
        .insert([{ url: imageUrl, title: itemTitle }])
        .select();

      if (!retry1.error && retry1.data) {
        insertedItem = retry1.data[0];
      } else {
        // Schema attempt 3: { image, title }
        const retry2 = await supabaseServer
          .from("gallery")
          .insert([{ image: imageUrl, title: itemTitle }])
          .select();

        if (!retry2.error && retry2.data) {
          insertedItem = retry2.data[0];
        } else {
          // Schema attempt 4: only image_url
          const retry3 = await supabaseServer
            .from("gallery")
            .insert([{ image_url: imageUrl }])
            .select();

          if (!retry3.error && retry3.data) {
            insertedItem = retry3.data[0];
          } else {
            const retry4 = await supabaseServer
              .from("gallery")
              .insert([{ url: imageUrl }])
              .select();

            if (!retry4.error && retry4.data) {
              insertedItem = retry4.data[0];
            } else {
              return { success: false, error: `Database insert failed: ${retry4.error?.message || insError.message}` };
            }
          }
        }
      }
    } else if (insData && insData.length > 0) {
      insertedItem = insData[0];
    }

    revalidatePath("/gallery");
    revalidatePath("/admin");

    return {
      success: true,
      item: {
        id: String(insertedItem?.id || Date.now()),
        title: itemTitle,
        category,
        description: description || "Custom studio project.",
        equipmentUsed: "Bangor Studio Hardware",
        materialOrAccuracy: "High Precision",
        imageUrl,
      },
    };
  } catch (err: any) {
    console.error("Error in uploadGalleryItemAction:", err);
    return { success: false, error: err?.message || "Failed to upload gallery item" };
  }
}

/**
 * Delete an item from the 'gallery' table
 */
export async function deleteGalleryItemAction(id: string) {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase is not configured." };
  }

  try {
    const { error } = await supabaseServer.from("gallery").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/gallery");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to delete gallery item" };
  }
}
