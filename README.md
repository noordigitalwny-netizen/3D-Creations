# 3D Creations — Local 3D Printing & Metrology 3D Scanning Website

Production-ready Next.js 14 (App Router) web application built for **3D Creations**, located in Bangor, PA (Slate Belt & Lehigh Valley region).

## 🚀 Key Features

- **Industrial Dark Aesthetic**: Slate dark theme (`slate-950` / `slate-900` backgrounds with `amber-500` and `cyan-400` metallic accents) tailored for metrology scanning & 3D printing.
- **Centralized Site Configuration**: Single source of truth at [`config/site.ts`](config/site.ts).
- **Modular Services Data Layer**: Fully dynamic service pages driven by [`data/services.ts`](data/services.ts).
- **Metrology Spotlight**: Showcasing Revopoint METRO X (0.02mm metrology accuracy), Bambu Lab X1 Carbon & H2C, and xTool S1.
- **Interactive Pricing Calculators**: Live 3D print and 3D scan price estimator engine in [`lib/pricing.ts`](lib/pricing.ts) with real-time UI components.
- **Filament Store Showcase**: Inventory catalog for local Overture PLA spool stock with pickup reservation ([`data/products.ts`](data/products.ts)).
- **Custom Quote & Lead Capture Form**: Drag-and-drop file upload zone (STL, OBJ, STEP) with Bangor PA sidebar.
- **Filterable Project Gallery**: Category grid with full-screen interactive lightbox modal preview.
- **SEO & Schema**: Local business OpenGraph metadata and JSON-LD `LocalBusiness` schema targeting Bangor & Slate Belt, PA.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, Server & Client Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **Deployment Target**: Vercel

---

## 💻 Quickstart Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📝 Maintenance & Content Customization

All site content, pricing logic, products, and metadata are 100% customizable via dedicated TypeScript configuration files:

| Customization Area | File Path | Description |
| :--- | :--- | :--- |
| **Company & SEO Config** | [`config/site.ts`](config/site.ts) | Edit company name, address, phone, email, working hours, nav links, and default SEO metadata. |
| **Services Data** | [`data/services.ts`](data/services.ts) | Add/modify services, equipment details, features, accuracy specs, and SEO descriptions. |
| **Pricing Logic & Rates** | [`lib/pricing.ts`](lib/pricing.ts) | Adjust hourly machine rates (`hourlyMachineRate`), material cost/gram (`materialCostPerGram`), setup fee, and scanning base fees. |
| **Filament Store Stock** | [`data/products.ts`](data/products.ts) | Update local spool inventory, stock counts, colors, materials, and prices. |
| **Project Gallery** | [`data/gallery.ts`](data/gallery.ts) | Manage showcase images, categories, and tags. |

---

## 🔌 Connecting Backend API (Supabase / Resend)

The contact form in [`app/contact/page.tsx`](app/contact/page.tsx) includes a pre-wired `handleSubmit` handler ready for API integration:

### Resend / Email Integration Example
1. Create a Next.js API route at `app/api/quote/route.ts`.
2. Install Resend: `npm install resend`.
3. In `handleSubmit`, send a `FormData` POST request to `/api/quote`:
```typescript
const res = await fetch("/api/quote", {
  method: "POST",
  body: JSON.stringify(formData),
});
```

---

## ⚙️ Deployment to Vercel

1. Push this repository to GitHub main branch.
2. Import repository into [Vercel](https://vercel.com).
3. Vercel automatically detects Next.js 14 and deploys.
