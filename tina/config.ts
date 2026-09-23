import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: "d83d34dc-2ed4-4e39-a2c5-7a85523b655f",
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "site_content",
        label: "Site Text",
        path: "content/pages",
        format: "json",
        fields: [
          { type: "string", name: "heroHeadline", label: "Hero Headline" },
          { type: "string", name: "heroSubtitle", label: "Hero Subtitle" },
          { type: "string", name: "phone", label: "Phone Number" }
        ],
      },
      {
        name: "products",
        label: "Products",
        path: "content/products",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "number", name: "price", label: "Price" },
          { type: "image", name: "image", label: "Product Image" },
          { type: "boolean", name: "inStock", label: "In Stock" }
        ],
      }
    ],
  },
});
