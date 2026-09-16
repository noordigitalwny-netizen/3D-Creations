import React from "react";
import Link from "next/link";
import { Scan, Printer, Zap, ArrowRight, ShieldCheck } from "lucide-react";

export default function EquipmentShowcase() {
  const machines = [
    {
      name: "Revopoint METRO X",
      category: "Metrology 3D Scanner",
      badge: "0.02 mm Metrology",
      icon: <Scan className="w-6 h-6 text-amber-500" />,
      specs: [
        { label: "Accuracy", val: "0.02 mm" },
        { label: "Scan Mode", val: "Blue Laser & Hybrid Structured Light" },
        { label: "Best For", val: "Inspection, Reverse Engineering, CAD" },
      ],
      description:
        "Industrial 3D scanner designed for precision metrology. Captures mechanical components, intricate geometries, and organic surfaces down to 0.02mm accuracy.",
      link: "/services/3d-scanning",
      borderColor: "hover:border-amber-500/50",
    },
    {
      name: "Bambu Lab X1 Carbon & H2C",
      category: "High-Speed 3D Printers",
      badge: "Multi-Color & CF",
      icon: <Printer className="w-6 h-6 text-cyan-400" />,
      specs: [
        { label: "Build Volume", val: "256 x 256 x 256 mm" },
        { label: "Materials", val: "Carbon Fiber PLA, PETG, ABS, TPU" },
        { label: "Capability", val: "16-Color AMS Multi-Material" },
      ],
      description:
        "Production-grade additive manufacturing. Features AI lidar first-layer verification, high-speed movement, and high-temp chambers for structural end-use parts.",
      link: "/services/3d-printing",
      borderColor: "hover:border-cyan-500/50",
    },
    {
      name: "xTool S1 Enclosed Laser",
      category: "Laser Cutter & Engraver",
      badge: "Class 1 Precision",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      specs: [
        { label: "Precision", val: "0.01 mm repeatability" },
        { label: "Substrates", val: "Wood, Acrylic, Leather, Metal" },
        { label: "Capability", val: "Vector Cutting & Raster Engraving" },
      ],
      description:
        "High-powered enclosed laser cutting and marking system. Delivers razor-sharp vector cuts and detailed raster branding on hardwood, matte acrylic, and slate.",
      link: "/services/laser-engraving",
      borderColor: "hover:border-amber-500/50",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-900/60 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3.5 py-1 rounded-full border border-amber-800/50">
              Hardware Fleet
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Industrial Equipment Spotlight
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            We invest in top-tier metrology and manufacturing hardware to ensure every part produced in Bangor meets strict engineering standards.
          </p>
        </div>

        {/* Machine Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {machines.map((m, idx) => (
            <div
              key={idx}
              className={`rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between transition-all duration-300 ${m.borderColor} shadow-xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      {m.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{m.name}</h3>
                      <span className="text-xs font-semibold text-slate-400">
                        {m.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                    {m.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {m.description}
                </p>

                {/* Specs List */}
                <div className="bg-slate-900/80 rounded-xl p-3.5 space-y-2 mb-6 border border-slate-800/80">
                  {m.specs.map((s, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-slate-400">{s.label}:</span>
                      <strong className="text-slate-200 font-mono">{s.val}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={m.link}
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500 transition-colors"
              >
                <span>Learn More About {m.name}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
