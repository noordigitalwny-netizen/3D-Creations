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
  Scan: <Scan className="w-6 h-6 text-blue-600" />,
  Printer: <Printer className="w-6 h-6 text-blue-600" />,
  Cpu: <Cpu className="w-6 h-6 text-blue-600" />,
  Zap: <Zap className="w-6 h-6 text-blue-600" />,
  Wrench: <Wrench className="w-6 h-6 text-blue-600" />,
  Layers: <Layers className="w-6 h-6 text-blue-600" />,
};

export const metadata = {
  title: "All Services | 3D Scanning, 3D Printing & Reverse Engineering",
  description:
    "Explore our full suite of metrology 3D scanning, high-speed multi-color 3D printing, CAD reverse engineering, and laser cutting services in Bangor, PA.",
};

export default function ServicesIndexPage() {
  return (
    <div className="bg-slate-50 py-16 lg:py-24 border-b border-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
            Slate Belt Studio Capabilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Metrology & Manufacturing Services
          </h1>
          <p className="text-base text-slate-600">
            From 0.02mm precision 3D scanning to high-speed multi-material printing and custom replacement parts reproduction in Bangor, PA.
          </p>
        </div>

        {/* 1 Col Mobile, 2 Col Tablet, 3 Col Desktop Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.slug}
              className="rounded-lg bg-white border border-gray-200 p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-md bg-blue-50 border border-blue-100">
                    {iconMap[service.iconName || "Scan"]}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    Bangor PA Local
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h2>
                <p className="text-xs font-semibold text-blue-600 mt-1 mb-3">
                  {service.tagline}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Features Bullet List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-gray-100 text-xs text-slate-700">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-md text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors touch-target-min"
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
