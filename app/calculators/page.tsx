"use client";

import React, { useState } from "react";
import PrintCalculator from "@/components/calculators/PrintCalculator";
import ScanCalculator from "@/components/calculators/ScanCalculator";
import { Printer, Scan, HelpCircle } from "lucide-react";

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<"print" | "scan">("print");

  return (
    <div className="bg-slate-50 py-12 lg:py-20 border-b border-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
            Instant Slate Belt Estimator
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Interactive Cost Calculators
          </h1>
          <p className="text-base text-slate-600">
            Estimate your 3D printing or metrology scanning project cost in real time. All rates are configured for local Bangor, PA pickup.
          </p>
        </div>

        {/* Tab Selection Bar (Classic light segment) */}
        <div className="flex justify-center">
          <div className="bg-gray-200 p-1.5 rounded-md inline-flex w-full max-w-md shadow-inner border border-gray-300">
            <button
              type="button"
              onClick={() => setActiveTab("print")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded text-xs sm:text-sm font-bold transition-all touch-target-min ${
                activeTab === "print"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Printer className="w-4 h-4 text-blue-600" />
              <span>3D Printing Cost</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("scan")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded text-xs sm:text-sm font-bold transition-all touch-target-min ${
                activeTab === "scan"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Scan className="w-4 h-4 text-blue-600" />
              <span>3D Scan Cost</span>
            </button>
          </div>
        </div>

        {/* Active Calculator Component */}
        <div className="max-w-5xl mx-auto">
          {activeTab === "print" ? <PrintCalculator /> : <ScanCalculator />}
        </div>

        {/* FAQ note at bottom */}
        <div className="max-w-3xl mx-auto rounded-md bg-white border border-gray-200 p-6 flex items-start space-x-4 text-xs text-slate-600 shadow-sm">
          <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900">How accurate are these online estimates?</h4>
            <p className="leading-relaxed">
              Our pricing configuration uses exact material rates and hourly machine costs. Final quotes are locked in after slicing your 3D files or evaluating physical parts in Bangor, PA. No hidden fees or unexpected surcharges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
