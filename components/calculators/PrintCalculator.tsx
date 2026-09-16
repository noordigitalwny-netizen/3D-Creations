"use client";

import React, { useState } from "react";
import Link from "next/link";
import { pricingConfig, calculatePrintEstimate } from "@/lib/pricing";
import { Printer, Scale, Clock, ArrowRight, Info, ShieldCheck } from "lucide-react";

export default function PrintCalculator() {
  const [selectedMaterial, setSelectedMaterial] = useState(pricingConfig.materials[0].id);
  const [weightGrams, setWeightGrams] = useState<number>(120);
  const [timeHours, setTimeHours] = useState<number>(4);

  const estimate = calculatePrintEstimate(selectedMaterial, weightGrams, timeHours);
  const currentMat = pricingConfig.materials.find((m) => m.id === selectedMaterial);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-5">
        <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-500">
          <Printer className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white">3D Print Cost Estimator</h2>
          <p className="text-xs text-slate-400">
            Real-time estimate for Bambu Lab X1 Carbon & H2C production prints
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Material Pills Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              1. Select Filament Material
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {pricingConfig.materials.map((mat) => {
                const isSelected = mat.id === selectedMaterial;
                return (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setSelectedMaterial(mat.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all touch-target-min ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500 text-white font-bold ring-1 ring-amber-500"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="text-xs font-bold">{mat.name}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {mat.description}
                    </div>
                  </button>
                );
              })}
            </div>
            {currentMat && (
              <p className="text-[11px] text-cyan-400 bg-cyan-950/60 p-2.5 rounded-lg border border-cyan-800/60 flex items-center gap-1.5 mt-2">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Recommended: {currentMat.recommendedFor}</span>
              </p>
            )}
          </div>

          {/* Weight Input (Slider + Number) */}
          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-500" />
                <span>2. Estimated Weight (Grams)</span>
              </label>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  min={10}
                  max={2000}
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(Math.max(1, Number(e.target.value)))}
                  className="w-20 px-2.5 py-1 text-xs font-mono font-bold bg-slate-900 border border-slate-700 rounded text-amber-400 text-right focus:outline-none focus:border-amber-500"
                />
                <span className="text-xs font-mono text-slate-400">g</span>
              </div>
            </div>
            <input
              type="range"
              min={10}
              max={1000}
              step={10}
              value={weightGrams}
              onChange={(e) => setWeightGrams(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10g (Small bracket)</span>
              <span>250g (Medium model)</span>
              <span>1000g (Full spool part)</span>
            </div>
          </div>

          {/* Print Time Input (Slider + Number) */}
          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>3. Estimated Print Time (Hours)</span>
              </label>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  min={0.5}
                  max={100}
                  step={0.5}
                  value={timeHours}
                  onChange={(e) => setTimeHours(Math.max(0.5, Number(e.target.value)))}
                  className="w-20 px-2.5 py-1 text-xs font-mono font-bold bg-slate-900 border border-slate-700 rounded text-cyan-400 text-right focus:outline-none focus:border-cyan-500"
                />
                <span className="text-xs font-mono text-slate-400">hrs</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={24}
              step={0.5}
              value={timeHours}
              onChange={(e) => setTimeHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 hr</span>
              <span>12 hrs</span>
              <span>24 hrs</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card Column */}
        <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Estimated Price Range
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              ${estimate.min} – ${estimate.max}
            </div>
            <p className="text-[11px] text-slate-400">
              Average estimate: <strong className="text-white">${estimate.average}</strong> (includes setup & local prep)
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-300 pt-4 border-t border-slate-800/80">
            <div className="flex justify-between py-1 border-b border-slate-900">
              <span className="text-slate-400">Selected Material:</span>
              <strong className="text-white font-medium">{currentMat?.name}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-900">
              <span className="text-slate-400">Weight:</span>
              <strong className="text-amber-400 font-mono">{weightGrams} grams</strong>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Print Duration:</span>
              <strong className="text-cyan-400 font-mono">{timeHours} hours</strong>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/contact?service=3d-printing&material=${selectedMaterial}&weight=${weightGrams}&time=${timeHours}&estimate=${estimate.average}`}
              className="w-full flex items-center justify-center space-x-2 py-4 px-6 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-xl shadow-lg hover:scale-[1.02] transition-all touch-target-min"
            >
              <span>Lock In Estimate & Submit Files</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-[10px] text-center text-slate-500">
            📍 Free pickup in Bangor, PA. Final price confirmed upon STL file slicing analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
