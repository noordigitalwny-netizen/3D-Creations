export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  items?: NavItem[];
}

export interface SiteConfig {
  name: string;
  description: string;
  tagline: string;
  url: string;
  ogImage: string;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    region: string;
    fullFormatted: string;
  };
  contact: {
    phone: string;
    phoneRaw: string;
    email: string;
    hours: string;
  };
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    x: string;
  };
  navLinks: NavItem[];
  servicesNav: NavItem[];
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    keywords: string[];
  };
}

export const siteConfig: SiteConfig = {
  name: "3D Creations",
  tagline: "Metrology-Grade 3D Scanning & Multi-Color 3D Printing",
  description:
    "Local high-precision 3D printing, metrology-grade 3D scanning (0.02 mm accuracy), reverse engineering, laser engraving, and custom replacement parts in Bangor, PA and the Slate Belt region.",
  url: "https://3dcreationspa.com",
  ogImage: "https://3dcreationspa.com/og.jpg",

  location: {
    address: "Slate Belt Industrial Corridor",
    city: "Bangor",
    state: "PA",
    zip: "18013",
    region: "Slate Belt & Lehigh Valley",
    fullFormatted: "Bangor, PA 18013 | Slate Belt Region",
  },

  contact: {
    phone: "(610) 555-0199",
    phoneRaw: "+16105550199",
    email: "info@3dcreationspa.com",
    hours: "Mon - Fri: 8:00 AM - 6:00 PM | Sat: By Appointment",
  },

  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    x: "https://x.com",
  },

  servicesNav: [
    {
      title: "3D Scanning",
      href: "/services/3d-scanning",
      description: "0.02mm Metrology-Grade precision scanning with Revopoint METRO X",
      icon: "Scan",
    },
    {
      title: "3D Printing",
      href: "/services/3d-printing",
      description: "High-speed multi-material manufacturing on Bambu Lab X1C & H2C",
      icon: "Printer",
    },
    {
      title: "Reverse Engineering",
      href: "/services/design-reverse-engineering",
      description: "CAD reconstruction & part duplication from physical samples",
      icon: "Cpu",
    },
    {
      title: "Laser Engraving",
      href: "/services/laser-engraving",
      description: "Precision cutting & custom mark marking via xTool S1",
      icon: "Zap",
    },
    {
      title: "Replacement Parts",
      href: "/services/replacement-parts",
      description: "Obsolete hardware & broken component reproduction",
      icon: "Wrench",
    },
    {
      title: "2D to 3D Modeling",
      href: "/services/2d-to-3d-modeling",
      description: "Convert sketches & 2D blueprints into production-ready 3D CAD",
      icon: "Layers",
    },
  ],

  navLinks: [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "Calculators", href: "/calculators" },
    { title: "Filament Store", href: "/store" },
    { title: "Gallery", href: "/gallery" },
    { title: "FAQs", href: "/faqs" },
    { title: "Contact", href: "/contact" },
  ],

  seo: {
    defaultTitle: "3D Creations | Local 3D Printing & Metrology 3D Scanning in Bangor & Slate Belt, PA",
    titleTemplate: "%s | 3D Creations",
    defaultDescription:
      "Local 3D Printing & Metrology 3D Scanning in Bangor & Slate Belt, PA. Zero shipping risk, 0.02mm accuracy, same-day pickup available.",
    keywords: [
      "3D Printing Bangor PA",
      "3D Scanning Slate Belt PA",
      "Metrology Scanning Lehigh Valley",
      "Revopoint METRO X",
      "Bambu Lab X1 Carbon",
      "Laser Engraving Bangor PA",
      "Reverse Engineering Pennsylvania",
      "Replacement Parts Bangor",
      "Overture PLA Filament Bangor",
    ],
  },
};
