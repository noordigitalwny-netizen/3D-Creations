"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryData, GalleryItem } from "@/data/gallery";
import { Filter, Eye, X, ArrowRight, Scan, Printer, Zap, Wrench, ShieldCheck } from "lucide-react";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ["All", "3D Scans", "3D Prints", "Laser Engraving", "Replacement Parts"];

  const filteredItems = galleryData.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="bg-slate-950 py-12 lg:py-20 border-b border-slate-800 bg-grid-pattern min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800">
            Slate Belt Studio Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Project & Scanning Gallery
          </h1>
          <p className="text-base text-slate-300">
            Showcasing real metrology 3D scans, multi-color prints, laser projects, and custom replacement parts completed in Bangor, PA.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all touch-target-min ${
                activeCategory === cat
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer group hover:border-amber-500/50 transition-all duration-300 shadow-xl"
            >
              {/* Image Preview container */}
              <div className="relative h-56 w-full bg-slate-950 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-slate-950/90 text-amber-400 px-2.5 py-1 rounded border border-amber-500/40">
                  {item.category}
                </span>

                <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-slate-950/80 border border-slate-700 text-slate-200 group-hover:text-amber-400 transition-colors">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Hardware: <strong className="text-white">{item.equipmentUsed}</strong></span>
                  <span className="text-cyan-400 font-mono font-semibold">{item.materialOrAccuracy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl space-y-0">
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 touch-target-min"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative h-72 sm:h-96 w-full bg-slate-950">
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-4 bg-slate-900">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-3 py-1 rounded border border-amber-800">
                    {selectedItem.category}
                  </span>
                  <span className="text-xs font-mono text-cyan-400">
                    {selectedItem.materialOrAccuracy}
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-white">
                  {selectedItem.title}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <span>Equipment Used: <strong className="text-amber-400">{selectedItem.equipmentUsed}</strong></span>
                  <span>Location: <strong className="text-white">Bangor, PA Studio</strong></span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    href={`/contact?service=${selectedItem.category.toLowerCase().replace(/ /g, "-")}`}
                    className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 touch-target-min"
                  >
                    <span>Request Similar Project Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
