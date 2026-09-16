import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Scan,
  Printer,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Column 1: Brand & Local Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-slate-900 border border-amber-500/40 flex items-center justify-center text-amber-500 font-extrabold text-sm">
                3D
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Metrology-grade 0.02mm 3D scanning and multi-color 3D printing serving Bangor, PA and the surrounding Slate Belt & Lehigh Valley region. Zero shipping delays, local pickup, and precision turnaround.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs text-amber-400/90 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Metrology Verified • 0.02mm Precision Scanner</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.servicesNav.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Slate Belt Location */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Slate Belt Studio
            </h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-slate-300">{siteConfig.location.fullFormatted}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="hover:text-amber-400 transition-colors text-slate-300"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-amber-400 transition-colors text-slate-300"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-start space-x-2.5 pt-1 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <span>{siteConfig.contact.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <div>
            © {currentYear} {siteConfig.name}. All rights reserved. Bangor, PA 18013.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/services/3d-scanning" className="hover:text-slate-300 transition-colors">
              Metrology Scanning
            </Link>
            <Link href="/services/3d-printing" className="hover:text-slate-300 transition-colors">
              Bambu Lab X1C & H2C
            </Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">
              Request Local Quote
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
