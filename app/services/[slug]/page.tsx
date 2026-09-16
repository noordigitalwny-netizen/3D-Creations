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
} from "lucide-react";

interface Props {
  params: { slug: string };
}

const iconMap: Record<string, React.ReactNode> = {
  Scan: <Scan className="w-8 h-8 text-blue-600" />,
  Printer: <Printer className="w-8 h-8 text-blue-600" />,
  Cpu: <Cpu className="w-8 h-8 text-blue-600" />,
  Zap: <Zap className="w-8 h-8 text-blue-600" />,
  Wrench: <Wrench className="w-8 h-8 text-blue-600" />,
  Layers: <Layers className="w-8 h-8 text-blue-600" />,
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
    <div className="bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-blue-600 transition-colors">
            Services
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{service.title}</span>
        </nav>

        {/* Responsive Split Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Title, Tagline, Full Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-xs font-semibold text-blue-800">
                Bangor, PA & Slate Belt Service
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                {iconMap[service.iconName || "Scan"]}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                  {service.title}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-blue-600 mt-1">
                  {service.tagline}
                </p>
              </div>
            </div>

            <p className="text-base text-slate-700 leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Quick Spec Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {service.specs.map((sp, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200 p-3 rounded-md text-left"
                >
                  <span className="block text-[11px] text-slate-500">{sp.label}</span>
                  <strong className="text-xs font-bold font-mono text-slate-900">
                    {sp.value}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Industrial Visual Illustration Card (Stacking Vertically on Mobile) */}
          <div className="lg:col-span-5">
            <div className="rounded-lg bg-gray-50 border border-gray-200 p-7 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Equipment Specs
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  READY
                </span>
              </div>

              {/* Equipment Highlighted */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Hardware & Systems Used:
                </h3>
                {service.equipment.map((eq, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-md bg-white border border-gray-200 flex items-center space-x-3 text-xs font-semibold text-slate-800"
                  >
                    <Microchip className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{eq}</span>
                  </div>
                ))}
              </div>

              {/* Key Features List */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Key Capabilities:
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bulleted "Why Local Matters" Section */}
        <div className="rounded-lg bg-slate-50 border border-gray-200 p-8 space-y-6">
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Why Local Slate Belt Service Matters for {service.title}
              </h2>
              <p className="text-xs text-slate-500">
                Local pickup & in-person consultation in Bangor, PA
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {service.whyLocal.map((reason, idx) => (
              <div
                key={idx}
                className="p-5 rounded-md bg-white border border-gray-200 space-y-2 shadow-sm"
              >
                <div className="w-7 h-7 rounded bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Bottom CTA Card */}
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-8 sm:p-10 text-center space-y-5 shadow-sm">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-blue-100 text-blue-800 text-xs font-bold uppercase">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Ready to Start Your {service.title} Project?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Get an Exact Quote for {service.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Click below to open our custom quote builder with <strong className="text-slate-900">{service.title}</strong> pre-selected.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href={`/contact?service=${service.slug}`}
              className="w-full sm:w-auto h-12 px-8 flex items-center justify-center space-x-2 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition-colors touch-target-min"
            >
              <span>Request Quote for {service.title}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/calculators"
              className="w-full sm:w-auto h-12 px-8 flex items-center justify-center space-x-2 text-sm font-bold text-slate-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-md transition-colors touch-target-min"
            >
              <span>Estimate Cost on Calculator</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
