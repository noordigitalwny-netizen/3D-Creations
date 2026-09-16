export interface ServiceItem {
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  equipment: string[];
  features: string[];
  specs: { label: string; value: string }[];
  whyLocal: string[];
  seoTitle: string;
  seoDescription: string;
}

export const servicesData: ServiceItem[] = [
  {
    slug: "3d-scanning",
    title: "Metrology 3D Scanning",
    tagline: "0.02mm Industrial Accuracy for Engineering & Inspection",
    shortDescription:
      "High-precision laser and structured-light 3D scanning using Revopoint METRO X to capture complex physical parts down to 0.02mm accuracy.",
    fullDescription:
      "Our metrology 3D scanning service bridges the physical and digital worlds with extreme precision. Utilizing our flagship Revopoint METRO X metrology scanner, we capture high-density point clouds and watertight 3D meshes of mechanical components, automotive parts, molds, and intricate artistic pieces. Perfect for quality inspection, CAD modeling, and part duplication with zero physical wear.",
    iconName: "Scan",
    equipment: ["Revopoint METRO X Metrology Scanner", "Photogrammetry Reference Targets", "High-Resolution Blue Laser Module"],
    features: [
      "Metrology Grade 0.02 mm Accuracy",
      "Full Color & High-Resolution Texture Capture",
      "Non-Destructive Contactless Laser Inspection",
      "Direct Export to STL, OBJ, STEP & PLY Formats",
      "Ideal for Complex Assemblies & Organic Geometries",
    ],
    specs: [
      { label: "Accuracy", value: "Up to 0.02 mm" },
      { label: "Resolution", value: "0.05 mm point distance" },
      { label: "Scanning Speed", value: "Up to 7,000,000 points/sec" },
      { label: "Working Range", value: "10mm to 2000mm part volume" },
    ],
    whyLocal: [
      "No shipping fragile or proprietary parts across the country",
      "Same-day or next-day in-person scan pickup and dropoff in Bangor, PA",
      "In-person part review before finalizing digital reverse engineering",
    ],
    seoTitle: "Metrology 3D Scanning Bangor PA | 0.02mm Precision | Slate Belt",
    seoDescription:
      "Professional 0.02mm metrology-grade 3D scanning service in Bangor & Slate Belt, PA using Revopoint METRO X. High-accuracy 3D inspection and CAD conversion.",
  },
  {
    slug: "3d-printing",
    title: "Multi-Material 3D Printing",
    tagline: "High-Speed, Production-Grade Rapid Prototyping & End-Use Parts",
    shortDescription:
      "Rapid additive manufacturing powered by Bambu Lab X1 Carbon and Bambu Lab H2C, supporting multi-color, carbon fiber, and engineering polymers.",
    fullDescription:
      "We deliver high-speed, high-resolution 3D printing for prototypes, jigs, fixtures, and end-use production components. Powered by top-tier Bambu Lab X1 Carbon and Bambu Lab H2C production printers, we offer multi-material combinations, integrated support structures, and reinforced engineering materials such as PETG, ABS, TPU, and Carbon Fiber PLA.",
    iconName: "Printer",
    equipment: ["Bambu Lab X1 Carbon (AMS Multi-Color)", "Bambu Lab H2C High-Temp Production Printer"],
    features: [
      "High-Speed Multi-Color & Multi-Material Printing",
      "Engineering Filaments: Carbon Fiber PLA, PETG, ABS, TPU, ASA",
      "Lidar First-Layer Inspection & Micro-Level Surface Quality",
      "Rapid Turnaround for Functional Prototypes",
      "Aesthetic Polish & Multi-Color Text Engraving",
    ],
    specs: [
      { label: "Build Volume", value: "256 x 256 x 256 mm" },
      { label: "Layer Height", value: "0.08 mm - 0.28 mm" },
      { label: "Materials", value: "PLA, PETG, ABS, TPU, PA-CF, ASA" },
      { label: "Color Capacity", value: "Up to 16 Colors Multi-Material" },
    ],
    whyLocal: [
      "Avoid expensive standard shipping costs and transit damage",
      "Fast local turnaround — inspect physical samples directly at our Slate Belt location",
      "Flexible order batches from single prototypes to short manufacturing runs",
    ],
    seoTitle: "High-Speed 3D Printing Bangor PA | Multi-Material | Slate Belt",
    seoDescription:
      "High-resolution multi-color 3D printing service in Bangor, PA. Bambu Lab X1 Carbon & H2C precision printing for prototypes, PETG, ABS, and Carbon Fiber.",
  },
  {
    slug: "design-reverse-engineering",
    title: "Design & Reverse Engineering",
    tagline: "Transform Scan Data into Parametric 3D CAD Models",
    shortDescription:
      "Expert reverse engineering turning raw 3D mesh scans and physical parts into native parametric STEP / IGES CAD files ready for CNC or 3D printing.",
    fullDescription:
      "Broken part with no original drawings? Legacy machine component out of production? Our reverse engineering service converts mesh scan data into clean, fully parametric CAD models. We extract exact dimensional features, bolt patterns, wall thicknesses, and mechanical tolerances to recreate identical or upgraded components.",
    iconName: "Cpu",
    equipment: ["Revopoint METRO X Scanner", "CAD Modeling Suite (SolidWorks / Fusion 360)"],
    features: [
      "Mesh-to-Parametric Solid Model Conversion",
      "Toleranced STEP, IGES & SolidWorks Native Files",
      "Design Optimization & Structural Reinforcement",
      "Re-creation of Legacy & Obsolete Hardware",
      "Design for Additive Manufacturing (DfAM)",
    ],
    specs: [
      { label: "Output Formats", value: "STEP, IGES, SolidWorks, STL, OBJ" },
      { label: "Tolerance Target", value: "+/- 0.05 mm standard" },
      { label: "Design Capabilities", value: "Mechanical design, surface modeling" },
    ],
    whyLocal: [
      "Bring broken parts directly to our Bangor studio for hands-on evaluation",
      "Collaborative design reviews before printing or manufacturing",
      "Quick physical iteration test prints to guarantee 100% fitment",
    ],
    seoTitle: "Reverse Engineering & CAD Bangor PA | Slate Belt Pennsylvania",
    seoDescription:
      "Expert CAD reverse engineering service in Bangor, PA. Convert broken parts and metrology 3D scan data into clean STEP files for manufacturing.",
  },
  {
    slug: "laser-engraving",
    title: "Precision Laser Engraving & Cutting",
    tagline: "Ultra-Fine Custom Engraving & Sheet Cutting with xTool S1",
    shortDescription:
      "Industrial laser cutting and high-speed custom marking on wood, acrylic, leather, anodized aluminum, and slate using our enclosed xTool S1.",
    fullDescription:
      "Add high-resolution branding, serialized QR codes, custom text, or geometric vector cuts to your products. Our xTool S1 enclosed laser cutter delivers precise beam concentration for ultra-clean edges on acrylic, custom wood signs, leather crafts, and engraved metal badges.",
    iconName: "Zap",
    equipment: ["xTool S1 High-Power Diode Laser Cutter & Engraver"],
    features: [
      "High-Precision Diode Laser Beam Focus",
      "Materials: Wood, Acrylic, Leather, Slate, Anodized Metal",
      "Custom Serial Numbers, Logos & Decorative Art",
      "Ultra-Clean Vector Cutting & Raster Engraving",
      "Class 1 Enclosed Safe Production System",
    ],
    specs: [
      { label: "Working Area", value: "498 x 319 mm" },
      { label: "Repeatability", value: "0.01 mm precision" },
      { label: "Substrates", value: "Hardwood, Plywood, Acrylic, Leather, Metal" },
    ],
    whyLocal: [
      "Great for local Slate Belt businesses needing custom signboards or branded items",
      "Zero minimum quantity — custom one-off gifts or commercial batches",
      "Local pickup avoiding wood & acrylic shipping breakages",
    ],
    seoTitle: "Laser Engraving & Cutting Bangor PA | Slate Belt | xTool S1",
    seoDescription:
      "Custom laser engraving and precision cutting in Bangor & Slate Belt, PA using xTool S1. Wood, acrylic, leather, and metal custom marking.",
  },
  {
    slug: "replacement-parts",
    title: "Custom Replacement Parts",
    tagline: "Recreate Obsolete, Broken, or Hard-to-Find Hardware",
    shortDescription:
      "Don't throw away valuable equipment. We scan, model, and 3D print exact replacement gears, brackets, knobs, and latches locally.",
    fullDescription:
      "When a minor plastic gear or bracket snaps on a vintage appliance, lawnmower, pool pump, or power tool, manufacturers often force you to buy an entire replacement unit. We specialize in reproducing hard-to-find and discontinued replacement components, often using reinforced materials like PETG or Carbon Fiber to make them stronger than original factory parts.",
    iconName: "Wrench",
    equipment: ["Revopoint METRO X", "Bambu Lab X1 Carbon", "Reinforced Engineering Polymers"],
    features: [
      "Exact Geometric Duplication of Broken Plastic/Metal Parts",
      "Upgraded Material Strength (PETG, Carbon Fiber PLA, ABS)",
      "Quick Turnaround to Eliminate Equipment Downtime",
      "Save 70%+ Compared to Replacing Entire Machines",
      "Custom Fitment Tweaks & Wear Point Enhancements",
    ],
    specs: [
      { label: "Typical Turnaround", value: "24 - 48 Hours" },
      { label: "Strength Rating", value: "High Impact & UV Resistance" },
      { label: "Common Components", value: "Gears, Handles, Clips, Latches, Cover Plates" },
    ],
    whyLocal: [
      "Drop off broken parts in Bangor, PA for fast direct comparison",
      "Test fitment locally and tweak tolerances in real time",
      "Support local Slate Belt community & small business repair efforts",
    ],
    seoTitle: "Custom Replacement Parts Bangor PA | Obsolete Component Reproduction",
    seoDescription:
      "Reproduce broken or obsolete replacement parts in Bangor, PA. 3D scan and print durable PETG & Carbon Fiber gears, brackets, and latches locally.",
  },
  {
    slug: "2d-to-3d-modeling",
    title: "2D Blueprint to 3D Modeling",
    tagline: "Turn Sketches, PDFs & 2D Blueprints into 3D Printable Models",
    shortDescription:
      "Convert architectural blueprints, engineering drawings, or hand sketches into full 3D CAD assemblies ready for visualization or production.",
    fullDescription:
      "Have an idea sketched on paper or an old 2D PDF engineering drawing? We convert 2D flat drawings into dimensional 3D CAD models. Whether you need a scale architectural visualizer, a product prototype, or 3D printable mechanical parts, we bring 2D plans into 3D reality.",
    iconName: "Layers",
    equipment: ["Parametric 3D CAD Workstations", "Bambu Lab Multi-Color Printers"],
    features: [
      "PDF & DWG Blueprint Conversion to 3D",
      "Hand Sketch to Production-Ready CAD Model",
      "Multi-Component Assembly Alignment",
      "Scale Architecture & Display Models",
      "Export to STEP, DXF, STL, & OBJ Formats",
    ],
    specs: [
      { label: "Input Formats", value: "PDF, PNG, JPG, DWG, DXF, Hand Sketch" },
      { label: "Deliverables", value: "3D CAD Files & 3D Printed Models" },
    ],
    whyLocal: [
      "Sit down in person or jump on a quick call with our local Slate Belt designer",
      "Fast local prototype printing right after 3D CAD approval",
      "Clear, upfront communication without offshore language barriers",
    ],
    seoTitle: "2D to 3D CAD Modeling Bangor PA | Blueprint Conversion",
    seoDescription:
      "Convert 2D blueprints, PDF drawings, and sketches into 3D CAD models in Bangor, PA. Professional CAD design and rapid prototyping in the Slate Belt.",
  },
];
