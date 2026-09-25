import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getSiteContent, SiteContent } from "@/lib/content";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface FooterProps {
  content?: {
    bangorAddress?: string;
    address?: string;
    phoneNumber?: string;
    phone?: string;
    businessHours?: string;
  };
}

export default function Footer({ content }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const defaultContent = getSiteContent();
  const siteContent = {
    ...defaultContent,
    bangorAddress: content?.bangorAddress || content?.address || defaultContent.bangorAddress,
    phoneNumber: content?.phoneNumber || content?.phone || defaultContent.phoneNumber,
    businessHours: content?.businessHours || defaultContent.businessHours,
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Local Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-md bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm">
                3D
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Metrology-grade 0.02mm 3D scanning and multi-color 3D printing serving Bangor, PA and the surrounding Slate Belt & Lehigh Valley region. Reliable turnaround, local pickup, and precision workmanship.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-blue-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
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
                    className="hover:text-white transition-colors"
                  >
                    {item.title}
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
                    className="hover:text-white transition-colors"
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
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-slate-300">{siteContent.bangorAddress || siteConfig.location.fullFormatted}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                {(() => {
                  const phoneText = siteContent.phoneNumber || siteContent.phone || siteConfig.contact.phone;
                  const digits = phoneText.replace(/[^0-9]/g, "");
                  const phoneHref =
                    digits.length === 10
                      ? `+1${digits}`
                      : phoneText.startsWith("+")
                      ? phoneText.replace(/[^0-9+]/g, "")
                      : `+${digits}`;
                  return (
                    <a
                      href={`tel:${phoneHref}`}
                      className="hover:text-white transition-colors text-slate-300 font-medium"
                    >
                      {phoneText}
                    </a>
                  );
                })()}
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-start space-x-2.5 pt-1 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <span>{siteContent.businessHours || siteConfig.contact.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <div>
            © {currentYear} {siteConfig.name}. All rights reserved. Bangor, PA 18013.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/services/3d-scanning" className="hover:text-white transition-colors">
              Metrology Scanning
            </Link>
            <Link href="/services/3d-printing" className="hover:text-white transition-colors">
              Bambu Lab X1C & H2C
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Request Local Quote
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
