import fs from "fs";
import path from "path";

export interface TinaProduct {
  slug: string;
  title: string;
  description?: any;
  plainDescription: string;
  price: number;
  category: string;
  inStock: boolean;
  image: string;
  colorName: string;
  colorHex: string;
  diameter: string;
  weight: string;
  isPopular?: boolean;
}

export interface SiteContent {
  heroHeadline: string;
  heroSubtitle: string;
  bangorAddress: string;
  phone?: string;
  phoneNumber: string;
  businessHours: string;
}

export function extractPlainText(desc: any): string {
  if (!desc) return "";
  if (typeof desc === "string") return desc;
  if (desc.children && Array.isArray(desc.children)) {
    return desc.children
      .map((child: any) => {
        if (child.text) return child.text;
        if (child.children) return extractPlainText(child);
        return "";
      })
      .join(" ");
  }
  return "";
}

export function getProducts(): TinaProduct[] {
  const productsDir = path.join(process.cwd(), "content", "products");
  if (!fs.existsSync(productsDir)) return [];

  const files = fs.readdirSync(productsDir).filter((file) => file.endsWith(".json"));
  const products: TinaProduct[] = [];

  for (const file of files) {
    const fullPath = path.join(productsDir, file);
    try {
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const data = JSON.parse(fileContent);
      const slug = file.replace(/\.json$/, "");

      const inStock = data.inStock !== false && data.in_stock !== false;
      // Filter out any products where in_stock is false
      if (!inStock) {
        continue;
      }

      products.push({
        slug,
        title: data.title || "Untitled Product",
        description: data.description,
        plainDescription: extractPlainText(data.description),
        price: typeof data.price === "number" ? data.price : 24.99,
        category: data.category || "PLA",
        inStock: true,
        image: data.image || "/uploads/overture-spool.png",
        colorName:
          data.colorName ||
          (data.title
            ? data.title
                .replace(/Overture\s+/i, "")
                .replace(/\s+PLA.*$/i, "")
                .replace(/\s+Spool.*$/i, "")
            : "Standard"),
        colorHex: data.colorHex || "#1e293b",
        diameter: data.diameter || "1.75 mm",
        weight: data.weight || "1.0 kg (2.2 lbs)",
        isPopular: Boolean(data.isPopular),
      });
    } catch (err) {
      console.error(`Error reading ${file}:`, err);
    }
  }

  return products;
}

export function getSiteContent(): SiteContent {
  const filePath = path.join(process.cwd(), "content", "pages", "home.json");
  const fallback: SiteContent = {
    heroHeadline: "Metrology-Grade 3D Scanning & Multi-Color 3D Printing",
    heroSubtitle:
      "Local 3D scanning down to 0.02mm precision and rapid additive manufacturing in Bangor, PA. Zero shipping risks, fast local pickup, and personal engineering support.",
    bangorAddress: "Bangor, PA 18013 | Slate Belt Region",
    phoneNumber: "(610) 555-0199",
    businessHours: "Mon - Fri: 8:00 AM - 6:00 PM | Sat: By Appointment",
  };

  if (!fs.existsSync(filePath)) return fallback;

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(content);
    return {
      heroHeadline: data.heroHeadline || fallback.heroHeadline,
      heroSubtitle: data.heroSubtitle || fallback.heroSubtitle,
      bangorAddress: data.bangorAddress || fallback.bangorAddress,
      phone: data.phone || data.phoneNumber || fallback.phoneNumber,
      phoneNumber: data.phoneNumber || data.phone || fallback.phoneNumber,
      businessHours: data.businessHours || fallback.businessHours,
    };
  } catch (err) {
    console.error("Error reading site content:", err);
    return fallback;
  }
}
