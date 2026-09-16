"use client";

import React, { useState } from "react";
import Link from "next/link";
import { pricingConfig, calculatePrintEstimate } from "@/lib/pricing";
import { Printer, Scale, Clock, ArrowRight, Info } from "lucide-react";

export default function PrintCalculator() {
  const [selectedMaterial, setSelectedMaterial] = useState(pricingConfig.materials[0].id);
  const [weightGrams, setWeightGrams] = useState<number>(120);
  const [timeHours, setTimeHours] = useState<number>(4);

  const estimate = calculatePrintEstimate(selectedMaterial, weightGrams, timeHours);
  const currentMat = pricingConfig.materials.find((m) => m.id === selectedMaterial);

  return (
    <div className="rounded-lg bg-white border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-gray-200 pb-5">
        <div className="p-3 rounded-md bg-blue-50 border border-blue-100 text-blue-600">
          <Printer className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">3D Print Cost Estimator</h2>
          <p className="text-xs text-slate-500">
            Real-time estimate for Bambu Lab X1 Carbon & H2C production prints
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Material Pills Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              1. Select Filament Material
            </label>
            <div className="grid grid-cols-2 gap-3">
              {pricingConfig.materials.map((mat) => {
                const isSelected = mat.id === selectedMaterial;
                return (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setSelectedMaterial(mat.id)}
                    className={`p-3.5 rounded-md border text-left transition-all touch-target-min ${
                      isSelected
                        ? "bg-blue-50 border-blue-600 text-blue-900 font-bold ring-1 ring-blue-600"
                        : "bg-white border-gray-300 text-slate-700 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-xs font-bold">{mat.name}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {mat.description}
                    </div>
                  </button>
                );
              })}
            </div>
            {currentMat && (
              <p className="text-[11px] text-blue-800 bg-blue-50 p-2.5 rounded-md border border-blue-200 flex items-center gap-1.5 mt-2">
                <Info className="w-3.5 h-3.5 shrink-0 text-blue-600" />
                <span>Recommended: {currentMat.recommendedFor}</span>
              </p>
            )}
          </div>

          {/* Weight Input (Slider + Number) */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-blue-600" />
                <span>2. Estimated Weight (Grams)</span>
              </label>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  min={10}
                  max={2000}
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(Math.max(1, Number(e.target.value)))}
                  className="w-20 px-2.5 py-1 text-xs font-mono font-bold bg-white border border-gray-300 rounded text-slate-900 text-right focus:outline-none focus:border-blue-600"
                />
                <span className="text-xs font-mono text-slate-500">g</span>
              </div>
            </div>
            <input
              type="range"
              min={10}
              max={1000}
              step={10}
              value={weightGrams}
              onChange={(e) => setWeightGrams(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10g (Small bracket)</span>
              <span>250g (Medium model)</span>
              <span>1000g (Full spool part)</span>
            </div>
          </div>

          {/* Print Time Input (Slider + Number) */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
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
                  className="w-20 px-2.5 py-1 text-xs font-mono font-bold bg-white border border-gray-300 rounded text-slate-900 text-right focus:outline-none focus:border-blue-600"
                />
                <span className="text-xs font-mono text-slate-500">hrs</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={24}
              step={0.5}
              value={timeHours}
              onChange={(e) => setTimeHours(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 hr</span>
              <span>12 hrs</span>
              <span>24 hrs</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card Column */}
        <div className="lg:col-span-5 bg-blue-50 p-6 rounded-md border border-blue-200 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600">
              Estimated Price Range
            </span>
            <div className="text-3xl sm:text-4xl font-black text-blue-900 font-mono">
              ${estimate.min} – ${estimate.max}
            </div>
            <p className="text-[11px] text-slate-600">
              Average estimate: <strong className="text-slate-900">${estimate.average}</strong> (includes setup & local prep)
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-700 pt-4 border-t border-blue-200">
            <div className="flex justify-between py-1 border-b border-blue-100">
              <span className="text-slate-600">Selected Material:</span>
              <strong className="text-slate-900 font-medium">{currentMat?.name}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-blue-100">
              <span className="text-slate-600">Weight:</span>
              <strong className="text-blue-900 font-mono">{weightGrams} grams</strong>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">Print Duration:</span>
              <strong className="text-blue-900 font-mono">{timeHours} hours</strong>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/contact?service=3d-printing&material=${selectedMaterial}&weight=${weightGrams}&time=${timeHours}&estimate=${estimate.average}`}
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition-colors touch-target-min"
            >
              <span>Lock In Estimate & Submit Files</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-[11px] text-center text-slate-500">
            📍 Free pickup in Bangor, PA. Final price confirmed upon STL file slicing analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
