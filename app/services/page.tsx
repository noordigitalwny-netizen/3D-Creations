import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import {
  Scan,
  Printer,
  Cpu,
  Zap,
  Wrench,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Scan: <Scan className="w-7 h-7 text-amber-500" />,
  Printer: <Printer className="w-7 h-7 text-cyan-400" />,
  Cpu: <Cpu className="w-7 h-7 text-amber-500" />,
  Zap: <Zap className="w-7 h-7 text-cyan-400" />,
  Wrench: <Wrench className="w-7 h-7 text-amber-500" />,
  Layers: <Layers className="w-7 h-7 text-cyan-400" />,
};

export const metadata = {
  title: "All Services | 3D Scanning, 3D Printing & Reverse Engineering",
  description:
    "Explore our full suite of metrology 3D scanning, high-speed multi-color 3D printing, CAD reverse engineering, and laser cutting services in Bangor, PA.",
};

export default function ServicesIndexPage() {
  return (
    <div className="bg-slate-950 py-16 lg:py-24 border-b border-slate-800 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800">
            Slate Belt Studio Capabilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Metrology & Manufacturing Services
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            From 0.02mm precision 3D scanning to high-speed multi-material printing and custom replacement parts reproduction in Bangor, PA.
          </p>
        </div>

        {/* 1 Col Mobile, 2 Col Tablet, 3 Col Desktop Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 p-7 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-amber-500/60 transition-colors">
                    {iconMap[service.iconName || "Scan"]}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950 px-2.5 py-1 rounded border border-amber-800/80">
                    Bangor PA Local
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h2>
                <p className="text-xs font-semibold text-cyan-400 mt-1 mb-3">
                  {service.tagline}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Features Bullet List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors touch-target-min"
              >
                <span>View Full Service Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
