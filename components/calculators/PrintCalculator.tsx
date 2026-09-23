"use client";

import React, { useState } from "react";
import Link from "next/link";
import { pricingConfig, calculatePrintEstimate } from "@/lib/pricing";
import { Printer, Scale, Clock, ArrowRight, Info, CheckCircle2, X, AlertCircle, Send, Loader2 } from "lucide-react";

export default function PrintCalculator() {
  const [selectedMaterial, setSelectedMaterial] = useState(pricingConfig.materials[0].id);
  const [weightGrams, setWeightGrams] = useState<number>(120);
  const [timeHours, setTimeHours] = useState<number>(4);

  // Quote Request Modal State
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const estimate = calculatePrintEstimate(selectedMaterial, weightGrams, timeHours);
  const currentMat = pricingConfig.materials.find((m) => m.id === selectedMaterial);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!inquiryName || !inquiryEmail || !inquiryPhone) {
      setErrorMessage("Please fill in your name, email, and phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
        "6e8ee156-1d13-4e7e-a9e8-6a65c1952042";

      const payload = {
        access_key: accessKey,
        subject: `New 3D Print Quote Request: ${inquiryName} ($${estimate.average} Estimate)`,
        from_name: inquiryName,
        name: inquiryName,
        email: inquiryEmail,
        phone: inquiryPhone,
        service: "3D Printing Production",
        selected_material: currentMat?.name || selectedMaterial,
        estimated_weight: `${weightGrams} grams`,
        estimated_duration: `${timeHours} hours`,
        estimated_price_range: `$${estimate.min} – $${estimate.max}`,
        average_estimate: `$${estimate.average}`,
        message: inquiryMessage || "No additional project notes.",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedSuccess(true);
      } else {
        setErrorMessage(data.message || "Failed to submit quote request. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage("Something went wrong while submitting. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

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

          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={() => {
                setShowInquiryModal(true);
                setSubmittedSuccess(false);
                setErrorMessage("");
              }}
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition-colors touch-target-min"
            >
              <span>Instant Quote Request</span>
              <Send className="w-4 h-4" />
            </button>

            <Link
              href={`/contact?service=3d-printing&material=${selectedMaterial}&weight=${weightGrams}&time=${timeHours}&estimate=${estimate.average}`}
              className="w-full flex items-center justify-center space-x-1.5 py-2.5 px-4 text-xs font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 rounded-md transition-colors"
            >
              <span>Or attach 3D CAD/STL files on full contact page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-[11px] text-center text-slate-500">
            📍 Free pickup in Bangor, PA. Final price confirmed upon STL file slicing analysis.
          </p>
        </div>
      </div>

      {/* INSTANT QUOTE MODAL */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 space-y-6 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Submit 3D Print Quote Request
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Est: ${estimate.min} – ${estimate.max} (${estimate.average} avg) • {currentMat?.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowInquiryModal(false);
                  setSubmittedSuccess(false);
                  setErrorMessage("");
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="p-6 text-center space-y-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-slate-900">Quote Request Received!</h4>
                <p className="text-xs text-slate-700 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{inquiryName}</strong>. Our Bangor PA team has received your estimate details ({currentMat?.name}, {weightGrams}g, ~{timeHours} hrs). We will contact you at <strong>{inquiryEmail}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowInquiryModal(false);
                    setSubmittedSuccess(false);
                  }}
                  className="px-5 py-2 bg-blue-600 text-white font-bold rounded-md text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="(610) 555-0199"
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Project Notes / Special Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Describe your part application, strength requirements, or target turnaround..."
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Configured Specs:</span>
                    <strong className="text-slate-900">{currentMat?.name} • {weightGrams}g • {timeHours} hrs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Price:</span>
                    <strong className="text-blue-900 font-mono font-bold">${estimate.min} – ${estimate.max} (${estimate.average} avg)</strong>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowInquiryModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Quote Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
