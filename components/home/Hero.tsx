import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Calculator,
  Scan,
  Printer,
  Sparkles,
  MapPin,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80 bg-grid-pattern">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 to-cyan-500/15 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Local Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Local Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-semibold text-slate-200">
                Bangor, PA & Slate Belt • Free Local Pickup
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Metrology-Grade{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-yellow-400">
                3D Scanning
              </span>{" "}
              & Multi-Color 3D Printing in the Slate Belt
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              Zero shipping risks, zero transit delays. Drop off broken parts or send 3D models directly to our Bangor studio. Powered by <strong className="text-white">Revopoint METRO X (0.02mm metrology precision)</strong> and <strong className="text-white">Bambu Lab X1 Carbon & H2C</strong> printers.
            </p>

            {/* Key Differentiator Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>0.02mm Metrology Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Multi-Color Carbon Fiber Printing</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Same-Day / Fast Local Pickup</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>In-Stock Overture PLA Spools</span>
              </div>
            </div>

            {/* Dual CTAs (Full Width Stacked on Mobile with >= 48px height) */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto h-12 sm:h-12 px-7 flex items-center justify-center space-x-2.5 text-base font-bold text-slate-950 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all touch-target-min"
              >
                <span>Request Free Local Quote</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/calculators"
                className="w-full sm:w-auto h-12 sm:h-12 px-7 flex items-center justify-center space-x-2 text-base font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400 rounded-xl transition-all touch-target-min"
              >
                <Calculator className="w-5 h-5 text-cyan-400" />
                <span>Instant Cost Calculators</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Industrial Visual Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl shadow-black/80 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl"></div>

              {/* Header inside card */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-bold text-white tracking-wide uppercase">
                    Studio Equipment Status
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-950 border border-emerald-500/40 text-emerald-400 font-semibold">
                  ONLINE • READY
                </span>
              </div>

              {/* Equipment Items */}
              <div className="space-y-4">
                {/* METRO X */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start space-x-3.5">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 mt-0.5">
                    <Scan className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Revopoint METRO X</h3>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                        0.02 mm
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Metrology-grade blue laser & structured-light 3D scanning.
                    </p>
                  </div>
                </div>

                {/* Bambu Lab X1C */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start space-x-3.5">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mt-0.5">
                    <Printer className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Bambu Lab X1 Carbon & H2C</h3>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                        Multi-Material
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      High-speed 16-color printing, carbon fiber & engineering polymers.
                    </p>
                  </div>
                </div>

                {/* Local Delivery Note */}
                <div className="p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-cyan-500/10 border border-slate-700/60 text-xs text-slate-300 flex items-center justify-between">
                  <span>🚀 Bangor PA Studio Delivery:</span>
                  <strong className="text-amber-400">Same-Day Available</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
