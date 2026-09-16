import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/services";
import {
  Scan,
  Printer,
  Cpu,
  Zap,
  Wrench,
  Layers,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Cpu as Microchip,
  Sparkles,
} from "lucide-react";

interface Props {
  params: { slug: string };
}

const iconMap: Record<string, React.ReactNode> = {
  Scan: <Scan className="w-8 h-8 text-amber-500" />,
  Printer: <Printer className="w-8 h-8 text-cyan-400" />,
  Cpu: <Cpu className="w-8 h-8 text-amber-500" />,
  Zap: <Zap className="w-8 h-8 text-cyan-400" />,
  Wrench: <Wrench className="w-8 h-8 text-amber-500" />,
  Layers: <Layers className="w-8 h-8 text-cyan-400" />,
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
    },
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-slate-950 py-12 lg:py-20 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-white transition-colors">
            Services
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold">{service.title}</span>
        </nav>

        {/* Responsive Split Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Title, Tagline, Full Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-xs font-semibold text-slate-200">
                Bangor, PA & Slate Belt Service
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                {iconMap[service.iconName || "Scan"]}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {service.title}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-cyan-400 mt-1">
                  {service.tagline}
                </p>
              </div>
            </div>

            <p className="text-base text-slate-300 leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Quick Spec Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {service.specs.map((sp, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-left"
                >
                  <span className="block text-[11px] text-slate-400">{sp.label}</span>
                  <strong className="text-xs font-bold font-mono text-amber-400">
                    {sp.value}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Industrial Visual Illustration Card (Stacking Vertically on Mobile) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-7 shadow-2xl relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Equipment & Precision
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  ACTIVE
                </span>
              </div>

              {/* Equipment Highlighted */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Hardware & Systems Used:
                </h3>
                {service.equipment.map((eq, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center space-x-3 text-xs font-semibold text-slate-200"
                  >
                    <Microchip className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{eq}</span>
                  </div>
                ))}
              </div>

              {/* Key Features List */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Key Capabilities:
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bulleted "Why Local Matters" Section */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 space-y-6">
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-amber-500" />
            <div>
              <h2 className="text-2xl font-bold text-white">
                Why Local Slate Belt Service Matters for {service.title}
              </h2>
              <p className="text-xs text-slate-400">
                Local pickup & in-person consultation in Bangor, PA
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {service.whyLocal.map((reason, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Bottom CTA Card */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-amber-500/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-950 border border-amber-800 text-amber-400 text-xs font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Ready to Start Your {service.title} Project?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get an Exact Quote for {service.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Click below to open our custom quote builder with <strong className="text-white">{service.title}</strong> pre-selected.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href={`/contact?service=${service.slug}`}
              className="w-full sm:w-auto h-12 px-8 flex items-center justify-center space-x-2.5 text-base font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-xl shadow-lg hover:scale-[1.02] transition-all touch-target-min"
            >
              <span>Request Quote for {service.title}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/calculators"
              className="w-full sm:w-auto h-12 px-8 flex items-center justify-center space-x-2 text-sm font-bold text-slate-200 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all touch-target-min"
            >
              <span>Estimate Cost on Calculator</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
