import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function CtaBanner() {
  return (
    <section className="py-16 bg-blue-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-800 border border-blue-700 text-blue-200 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-blue-300" />
          <span>Fast Local Turnaround in Bangor, PA</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Ready to Turn Your Idea or Broken Part into Reality?
        </h2>

        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Upload your STL, STEP, or blueprint files, or drop off physical parts at our Slate Belt studio for instant local evaluation.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto h-12 px-8 flex items-center justify-center space-x-2 text-base font-bold text-slate-900 bg-white hover:bg-gray-100 rounded-md shadow-md transition-colors touch-target-min"
          >
            <span>Submit Project & Get Free Quote</span>
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </Link>

          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="w-full sm:w-auto h-12 px-8 flex items-center justify-center space-x-2 text-base font-bold text-white bg-blue-800 hover:bg-blue-700 border border-blue-700 rounded-md transition-colors touch-target-min"
          >
            <Phone className="w-5 h-5 text-blue-300" />
            <span>Call Studio: {siteConfig.contact.phone}</span>
          </a>
        </div>

        <div className="pt-2 text-xs text-blue-200 flex items-center justify-center space-x-4">
          <span>📍 {siteConfig.location.fullFormatted}</span>
          <span>•</span>
          <span>⏱️ Response within 4 Business Hours</span>
        </div>
      </div>
    </section>
  );
}
