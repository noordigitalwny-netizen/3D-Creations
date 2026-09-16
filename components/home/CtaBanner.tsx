import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, UploadCloud, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function CtaBanner() {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-cyan-500/10 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-slate-900 border border-slate-700/80 p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-950 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Fast Local Turnaround in Bangor, PA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to Turn Your Idea or Broken Part into Reality?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Upload your STL, STEP, or blueprint files, or drop off physical parts at our Slate Belt studio for instant local evaluation.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto h-13 px-8 flex items-center justify-center space-x-2.5 text-base font-bold text-slate-950 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 rounded-xl shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all touch-target-min"
            >
              <span>Submit Project & Get Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="w-full sm:w-auto h-13 px-8 flex items-center justify-center space-x-2 text-base font-bold text-slate-200 bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 rounded-xl transition-all touch-target-min"
            >
              <Phone className="w-5 h-5 text-cyan-400" />
              <span>Call Studio: {siteConfig.contact.phone}</span>
            </a>
          </div>

          <div className="pt-4 text-xs text-slate-400 flex items-center justify-center space-x-4">
            <span>📍 {siteConfig.location.fullFormatted}</span>
            <span>•</span>
            <span>⏱️ Response within 4 Business Hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
