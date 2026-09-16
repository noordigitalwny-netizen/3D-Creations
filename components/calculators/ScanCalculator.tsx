"use client";

import React, { useState } from "react";
import Link from "next/link";
import { pricingConfig, calculateScanEstimate } from "@/lib/pricing";
import { Scan, Box, Cpu, ArrowRight, AlertCircle } from "lucide-react";

export default function ScanCalculator() {
  const [sizeTier, setSizeTier] = useState(pricingConfig.scanSizeTiers[0].id);
  const [complexity, setComplexity] = useState(pricingConfig.scanComplexities[1].id);

  const estimate = calculateScanEstimate(sizeTier, complexity);
  const currentSize = pricingConfig.scanSizeTiers.find((s) => s.id === sizeTier);
  const currentComp = pricingConfig.scanComplexities.find((c) => c.id === complexity);

  return (
    <div className="rounded-lg bg-white border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-gray-200 pb-5">
        <div className="p-3 rounded-md bg-blue-50 border border-blue-100 text-blue-600">
          <Scan className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Metrology 3D Scan Estimator</h2>
          <p className="text-xs text-slate-500">
            Revopoint METRO X 0.02mm metrology scan & CAD conversion estimate
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Size Tier Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Box className="w-4 h-4 text-blue-600" />
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
                    className={`w-full p-3.5 rounded-md border flex items-center justify-between transition-all touch-target-min ${
                      isSelected
                        ? "bg-blue-50 border-blue-600 text-blue-900 font-bold ring-1 ring-blue-600"
                        : "bg-white border-gray-300 text-slate-700 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{tier.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{tier.rangeLabel}</div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-blue-700 bg-gray-100 px-2.5 py-1 rounded">
                      Base ${tier.baseFee}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Purpose / Complexity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-600" />
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
                    className={`w-full p-3.5 rounded-md border text-left transition-all touch-target-min ${
                      isSelected
                        ? "bg-blue-50 border-blue-600 text-blue-900 font-bold ring-1 ring-blue-600"
                        : "bg-white border-gray-300 text-slate-700 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold">{comp.name}</div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{comp.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card Column */}
        <div className="lg:col-span-5 bg-blue-50 p-6 rounded-md border border-blue-200 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600">
              Estimated Scan Cost Range
            </span>
            <div className="text-3xl sm:text-4xl font-black text-blue-900 font-mono">
              ${estimate.min} – ${estimate.max}
            </div>
            <p className="text-[11px] text-slate-600">
              Average estimate: <strong className="text-slate-900">${estimate.average}</strong> (0.02mm Revopoint METRO X scan)
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-700 pt-4 border-t border-blue-200">
            <div className="flex justify-between py-1 border-b border-blue-100">
              <span className="text-slate-600">Size Tier:</span>
              <strong className="text-slate-900 font-medium">{currentSize?.name}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-blue-100">
              <span className="text-slate-600">Target Deliverable:</span>
              <strong className="text-slate-900 font-medium">{currentComp?.name}</strong>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">Metrology Accuracy:</span>
              <strong className="text-blue-900 font-mono">0.02 mm</strong>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/contact?service=3d-scanning&size=${sizeTier}&purpose=${complexity}&estimate=${estimate.average}`}
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition-colors touch-target-min"
            >
              <span>Lock In Estimate & Request Scan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-3 bg-white rounded-md border border-blue-200 flex items-start space-x-2 text-[11px] text-slate-600">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Disclaimer: Final scanning quote is confirmed after visual part inspection at our Bangor, PA studio or via uploaded part photos.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
