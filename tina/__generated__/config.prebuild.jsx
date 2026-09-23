// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get clientId and token from tina.io for production Tina Cloud authentication.
  // In local development, Tina runs locally without requiring these values.
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  // @ts-expect-error fallback when Tina Cloud keys are not set
  contentApiUrlOverride: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ? void 0 : "http://localhost:4001/graphql",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "products",
        label: "Products",
        path: "content/products",
        format: "json",
        ui: {
          router: () => "/store"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description"
          },
          {
            type: "number",
            name: "price",
            label: "Price"
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["PLA", "Silk PLA", "PETG", "ABS", "TPU"]
          },
          {
            type: "boolean",
            name: "inStock",
            label: "In Stock"
          },
          {
            type: "image",
            name: "image",
            label: "Image"
          }
        ]
      },
      {
        name: "site_content",
        label: "Site Content",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "heroHeadline",
            label: "Hero Headline"
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "bangorAddress",
            label: "Bangor Address"
          },
          {
            type: "string",
            name: "phoneNumber",
            label: "Phone Number"
          },
          {
            type: "string",
            name: "businessHours",
            label: "Business Hours"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
