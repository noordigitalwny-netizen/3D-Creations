import React from "react";
import Link from "next/link";
import { PackageCheck, ArrowRight, ShoppingBag, Check } from "lucide-react";

export default function FilamentBanner() {
  return (
    <section className="py-14 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-950/80 border border-amber-800/80 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <PackageCheck className="w-4 h-4 text-amber-400" />
                <span>Local Spool Inventory • Bangor PA</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                In-Stock Overture PLA Filament — Same-Day Local Pickup
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Ran out of filament mid-print? Avoid shipping waiting times. We maintain a fresh local stock of premium <strong className="text-white">Overture 1.75mm PLA spools</strong> in Matte Black, Digital Blue, Electric Yellow, Space Grey, and more.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-1">
                <span className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400" /> 1.75mm Sealed 1kg Spools
                </span>
                <span className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400" /> Reserve Online & Pick Up in Bangor
                </span>
                <span className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400" /> $24.99 Flat Spool Price
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-4">
              <Link
                href="/store"
                className="h-12 px-6 flex items-center justify-center space-x-2 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-lg hover:scale-[1.02] transition-all touch-target-min"
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
