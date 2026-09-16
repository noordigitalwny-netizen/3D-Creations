"use client";

import React, { useState } from "react";
import Link from "next/link";
import { productsData } from "@/data/products";
import { CheckCircle2, ShoppingBag, Filter } from "lucide-react";

export default function StorePage() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");

  const materials = ["All", "PLA", "Silk PLA"];
  const colors = ["All", ...Array.from(new Set(productsData.map((p) => p.colorName)))];

  const filteredProducts = productsData.filter((p) => {
    const matchMat = selectedMaterial === "All" || p.material === selectedMaterial;
    const matchCol = selectedColor === "All" || p.colorName === selectedColor;
    return matchMat && matchCol;
  });

  return (
    <div className="bg-slate-50 py-12 lg:py-20 border-b border-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
            Local Stock • Bangor, PA Studio
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Overture 3D Filament Store
          </h1>
          <p className="text-base text-slate-600">
            Fresh, sealed 1.75mm spools available for same-day local pickup in Bangor & Slate Belt, PA. Avoid shipping waits!
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="rounded-lg bg-white border border-gray-200 p-4 sm:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Filter Filament Inventory</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Material Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500">Material:</span>
              <div className="flex gap-1">
                {materials.map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => setSelectedMaterial(mat)}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all touch-target-min ${
                      selectedMaterial === mat
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Select Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500">Color:</span>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="bg-white text-xs font-semibold text-slate-900 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
              >
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Responsive Product Catalog Grid (2 columns on mobile screens to minimize scrolling friction, 3-4 columns on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-lg bg-white border border-gray-200 p-4 sm:p-5 flex flex-col justify-between hover:border-blue-500 transition-all duration-200 shadow-sm relative group"
            >
              {product.isPopular && (
                <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded font-mono">
                  Popular
                </span>
              )}

              <div>
                {/* Visual Swatch Card */}
                <div className="w-full h-28 sm:h-36 rounded bg-gray-100 border border-gray-200 flex flex-col items-center justify-center relative overflow-hidden mb-4 p-2">
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-md mb-1"
                    style={{ backgroundColor: product.colorHex }}
                  ></div>
                  <span className="text-[11px] font-bold text-slate-900 text-center line-clamp-1">
                    {product.colorName}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                    {product.brand} • {product.material}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {product.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 space-y-1 text-[11px] text-slate-500">
                  <div className="flex justify-between">
                    <span>Diameter:</span>
                    <strong className="text-slate-900 font-mono">{product.diameter}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight:</span>
                    <strong className="text-slate-900 font-mono">{product.weight}</strong>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span>Stock:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> In Stock ({product.stockCount})
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <div className="text-lg font-black text-slate-900 font-mono">
                  ${product.price.toFixed(2)}
                </div>

                <Link
                  href={`/contact?reserve=${product.slug}&productName=${encodeURIComponent(
                    product.name
                  )}`}
                  className="w-full flex items-center justify-center space-x-1.5 py-2.5 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors touch-target-min"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Reserve for Pickup</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No spools match the selected filters. Please try selecting a different color or material.
          </div>
        )}
      </div>
    </div>
  );
}
