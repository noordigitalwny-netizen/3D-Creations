export interface GalleryItem {
  id: string;
  title: string;
  category: "3D Scans" | "3D Prints" | "Laser Engraving" | "Replacement Parts";
  description: string;
  equipmentUsed: string;
  materialOrAccuracy: string;
  tags: string[];
  imageUrl: string;
  svgColor: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Vintage Engine Manifold Metrology Scan",
    category: "3D Scans",
    description: "High-density 0.02mm metrology scan of an out-of-production cast manifold for automotive restoration.",
    equipmentUsed: "Revopoint METRO X",
    materialOrAccuracy: "0.02mm Metrology Mesh",
    tags: ["Automotive", "Reverse Engineering", "Metrology"],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    svgColor: "amber",
  },
  {
    id: "gal-2",
    title: "Multi-Color Drone Frame & Motor Mounts",
    category: "3D Prints",
    description: "High-speed multi-color carbon fiber PLA print with embedded nut pockets and lightweight lattice infill.",
    equipmentUsed: "Bambu Lab X1 Carbon",
    materialOrAccuracy: "PA-CF & PETG",
    tags: ["Aerospace", "Carbon Fiber", "Multi-Color"],
    imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop",
    svgColor: "cyan",
  },
  {
    id: "gal-3",
    title: "Custom Hardwood & Acrylic Business Sign",
    category: "Laser Engraving",
    description: "Precision vector cut walnut wood layer combined with laser-etched black matte acrylic backing.",
    equipmentUsed: "xTool S1 Diode Laser",
    materialOrAccuracy: "Walnut Wood & Acrylic",
    tags: ["Branding", "Woodworking", "Laser Cut"],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    svgColor: "amber",
  },
  {
    id: "gal-4",
    title: "Obsolete Pool Pump Impeller Reproduction",
    category: "Replacement Parts",
    description: "Original impeller lost teeth due to cavitation. Scanned, reconstructed, and 3D printed in chemical-resistant PETG.",
    equipmentUsed: "Revopoint METRO X & Bambu Lab X1C",
    materialOrAccuracy: "High-Temp PETG",
    tags: ["Repair", "Replacement Part", "PETG"],
    imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop",
    svgColor: "cyan",
  },
  {
    id: "gal-5",
    title: "Industrial Hydraulic Valve Housing Scan",
    category: "3D Scans",
    description: "Contactless blue laser scan quantifying wear on internal port geometries down to 0.02mm resolution.",
    equipmentUsed: "Revopoint METRO X",
    materialOrAccuracy: "0.02mm Point Cloud",
    tags: ["Inspection", "Metrology", "Industrial"],
    imageUrl: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800&auto=format&fit=crop",
    svgColor: "amber",
  },
  {
    id: "gal-6",
    title: "Heavy Duty Lawn Tractor Hood Latch",
    category: "Replacement Parts",
    description: "Discontinued tractor latch recreated with extra wall thickness in impact-resistant ABS filament.",
    equipmentUsed: "Bambu Lab H2C",
    materialOrAccuracy: "ABS Filament",
    tags: ["Lawn Equipment", "Discontinued Part", "ABS"],
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop",
    svgColor: "cyan",
  },
];
