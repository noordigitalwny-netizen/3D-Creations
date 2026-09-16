"use client";

import React, { useState } from "react";
import Link from "next/link";
import { pricingConfig, calculateScanEstimate } from "@/lib/pricing";
import { Scan, Box, Cpu, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function ScanCalculator() {
  const [sizeTier, setSizeTier] = useState(pricingConfig.scanSizeTiers[0].id);
  const [complexity, setComplexity] = useState(pricingConfig.scanComplexities[1].id);

  const estimate = calculateScanEstimate(sizeTier, complexity);
  const currentSize = pricingConfig.scanSizeTiers.find((s) => s.id === sizeTier);
  const currentComp = pricingConfig.scanComplexities.find((c) => c.id === complexity);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-5">
        <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/40 text-cyan-400">
          <Scan className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white">Metrology 3D Scan Estimator</h2>
          <p className="text-xs text-slate-400">
            Revopoint METRO X 0.02mm metrology scan & CAD conversion estimate
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Size Tier Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Box className="w-4 h-4 text-amber-500" />
              <span>1. Part Dimension / Volume</span>
            </label>
            <div className="space-y-2">
              {pricingConfig.scanSizeTiers.map((tier) => {
                const isSelected = tier.id === sizeTier;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSizeTier(tier.id)}
                    className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all touch-target-min ${
                      isSelected
                        ? "bg-cyan-500/10 border-cyan-400 text-white font-bold ring-1 ring-cyan-400"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{tier.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{tier.rangeLabel}</div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-cyan-400 bg-slate-900 px-2.5 py-1 rounded">
                      Base ${tier.baseFee}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Purpose / Complexity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>2. Scan Deliverable / Purpose</span>
            </label>
            <div className="space-y-2">
              {pricingConfig.scanComplexities.map((comp) => {
                const isSelected = comp.id === complexity;
                return (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => setComplexity(comp.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all touch-target-min ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500 text-white font-bold ring-1 ring-amber-500"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold">{comp.name}</div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{comp.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card Column */}
        <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Estimated Scan Cost Range
            </span>
            <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">
              ${estimate.min} – ${estimate.max}
            </div>
            <p className="text-[11px] text-slate-400">
              Average estimate: <strong className="text-white">${estimate.average}</strong> (0.02mm Revopoint METRO X scan)
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-300 pt-4 border-t border-slate-800/80">
            <div className="flex justify-between py-1 border-b border-slate-900">
              <span className="text-slate-400">Size Tier:</span>
              <strong className="text-white font-medium">{currentSize?.name}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-900">
              <span className="text-slate-400">Target Deliverable:</span>
              <strong className="text-amber-400 font-medium">{currentComp?.name}</strong>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Metrology Accuracy:</span>
              <strong className="text-cyan-400 font-mono">0.02 mm</strong>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/contact?service=3d-scanning&size=${sizeTier}&purpose=${complexity}&estimate=${estimate.average}`}
              className="w-full flex items-center justify-center space-x-2 py-4 px-6 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 rounded-xl shadow-lg hover:scale-[1.02] transition-all touch-target-min"
            >
              <span>Lock In Estimate & Request Scan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-start space-x-2 text-[10px] text-slate-400">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              Disclaimer: Final scanning quote is confirmed after visual part inspection at our Bangor, PA studio or via uploaded part photos.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
