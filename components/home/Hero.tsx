import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator, MapPin, ShieldCheck } from "lucide-react";

interface HeroProps {
  headline?: string;
  subtitle?: string;
  address?: string;
  phone?: string;
}

export default function Hero({
  headline = "Metrology-Grade 3D Scanning & Multi-Color 3D Printing",
  subtitle = "Local 3D scanning down to 0.02mm precision and rapid additive manufacturing in Bangor, PA. Zero shipping risks, fast local pickup, and personal engineering support.",
  address = "Bangor, PA 18013 | Slate Belt Region",
  phone = "(570) 243-1673",
}: HeroProps) {
  return (
    <section className="relative bg-slate-900 text-white min-h-[520px] lg:min-h-[580px] py-20 lg:py-28 flex items-center justify-center overflow-hidden">
      {/* Background Banner Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-slate-950/75 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/70"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        {/* Local Studio Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-blue-400" />
          <span>Local Slate Belt Studio • {address}</span>
        </div>

        {/* Main Centered Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          {headline}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Local Features Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" /> Revopoint METRO X (0.02mm)
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" /> Bambu Lab X1C & H2C
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" /> xTool S1 Laser Cutting
          </span>
        </div>

        {/* Centered Dual CTAs */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto h-12 px-8 flex items-center justify-center space-x-2 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition-colors touch-target-min"
          >
            <span>Request Free Local Quote</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/calculators"
            className="w-full sm:w-auto h-12 px-8 flex items-center justify-center space-x-2 text-base font-bold text-slate-900 bg-white hover:bg-gray-100 border border-gray-300 rounded-md shadow-sm transition-colors touch-target-min"
          >
            <Calculator className="w-5 h-5 text-blue-600" />
            <span>Instant Cost Calculators</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
