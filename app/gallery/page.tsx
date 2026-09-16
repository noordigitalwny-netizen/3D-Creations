"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryData, GalleryItem } from "@/data/gallery";
import { Eye, X, ArrowRight } from "lucide-react";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ["All", "3D Scans", "3D Prints", "Laser Engraving", "Replacement Parts"];

  const filteredItems = galleryData.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="bg-slate-50 py-12 lg:py-20 border-b border-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
            Slate Belt Studio Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Project & Scanning Gallery
          </h1>
          <p className="text-base text-slate-600">
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
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all touch-target-min ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-gray-200 hover:bg-gray-50"
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
              className="rounded-lg bg-white border border-gray-200 overflow-hidden cursor-pointer group hover:shadow-md transition-shadow"
            >
              {/* Image Preview container */}
              <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-blue-800 px-2.5 py-1 rounded border border-blue-200 shadow-sm">
                  {item.category}
                </span>

                <div className="absolute bottom-3 right-3 p-2 rounded-md bg-white/90 border border-gray-200 text-slate-700 group-hover:text-blue-600 transition-colors shadow-sm">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Hardware: <strong className="text-slate-900">{item.equipmentUsed}</strong></span>
                  <span className="text-blue-600 font-mono font-semibold">{item.materialOrAccuracy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="relative max-w-3xl w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xl space-y-0">
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-slate-700 hover:text-slate-900 border border-gray-200 touch-target-min shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative h-72 sm:h-96 w-full bg-gray-100">
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-4 bg-white">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded border border-blue-200">
                    {selectedItem.category}
                  </span>
                  <span className="text-xs font-mono text-blue-600 font-semibold">
                    {selectedItem.materialOrAccuracy}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedItem.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="p-3.5 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-between text-xs text-slate-700">
                  <span>Equipment Used: <strong className="text-blue-600">{selectedItem.equipmentUsed}</strong></span>
                  <span>Location: <strong className="text-slate-900">Bangor, PA Studio</strong></span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    href={`/contact?service=${selectedItem.category.toLowerCase().replace(/ /g, "-")}`}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md text-xs flex items-center justify-center space-x-2 touch-target-min"
                  >
                    <span>Request Similar Project Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
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
