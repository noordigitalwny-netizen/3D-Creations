import React from "react";
import Link from "next/link";
import { PackageCheck, ArrowRight, ShoppingBag, Check } from "lucide-react";

export default function FilamentBanner() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-8 sm:p-10 relative overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
                <PackageCheck className="w-4 h-4 text-blue-600" />
                <span>Local Spool Inventory • Bangor PA</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                In-Stock Overture PLA Filament — Same-Day Local Pickup
              </h2>

              <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
                Ran out of filament mid-print? Avoid shipping waiting times. We maintain a fresh local stock of premium <strong className="text-slate-900">Overture 1.75mm PLA spools</strong> in Matte Black, Digital Blue, Electric Yellow, Space Grey, and more.
              </p>

              <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-700 pt-1">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded border border-blue-200">
                  <Check className="w-4 h-4 text-blue-600" /> 1.75mm Sealed 1kg Spools
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded border border-blue-200">
                  <Check className="w-4 h-4 text-blue-600" /> Reserve Online & Pick Up in Bangor
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded border border-blue-200">
                  <Check className="w-4 h-4 text-blue-600" /> $24.99 Flat Spool Price
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-4">
              <Link
                href="/store"
                className="h-11 px-6 flex items-center justify-center space-x-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors touch-target-min"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse In-Stock Filament Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
