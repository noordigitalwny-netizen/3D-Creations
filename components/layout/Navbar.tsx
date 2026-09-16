"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  Menu,
  X,
  ChevronDown,
  Scan,
  Printer,
  Cpu,
  Zap,
  Wrench,
  Layers,
  Phone,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Scan: <Scan className="w-5 h-5 text-blue-600" />,
  Printer: <Printer className="w-5 h-5 text-blue-600" />,
  Cpu: <Cpu className="w-5 h-5 text-blue-600" />,
  Zap: <Zap className="w-5 h-5 text-blue-600" />,
  Wrench: <Wrench className="w-5 h-5 text-blue-600" />,
  Layers: <Layers className="w-5 h-5 text-blue-600" />,
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
      {/* Top Banner Bar for Local Contact */}
      <div className="hidden sm:block bg-gray-100 text-gray-600 text-xs border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-5">
            <span className="flex items-center gap-1.5 text-gray-700">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Studio Location: <strong>{siteConfig.location.fullFormatted}</strong></span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{siteConfig.contact.hours}</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{siteConfig.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-white py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-md overflow-hidden border border-gray-300 bg-gray-50 p-1 group-hover:border-blue-600 transition-colors">
              <Image
                src="/logo.png"
                alt="3D Creations Logo"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-blue-600 text-sm bg-white pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                3D
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                {siteConfig.name}
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 -mt-0.5">
                Bangor, PA • 3D Printing & Scanning
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {siteConfig.navLinks.map((link) => {
              if (link.title === "Services") {
                return (
                  <div
                    key={link.title}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      className={`flex items-center space-x-1 px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                        pathname.startsWith("/services")
                          ? "text-blue-600 bg-blue-50"
                          : "text-slate-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesDropdownOpen ? "rotate-180 text-blue-600" : "text-gray-400"
                        }`}
                      />
                    </button>

                    {/* Desktop Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-3 py-2 mb-1 border-b border-gray-100">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                            Services Overview
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          {siteConfig.servicesNav.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="flex items-start space-x-3 p-2.5 rounded-md hover:bg-gray-50 transition-colors group"
                            >
                              <div className="p-1.5 rounded bg-gray-100 border border-gray-200 group-hover:border-blue-400 transition-colors">
                                {iconMap[service.icon || "Scan"]}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                  {service.title}
                                </div>
                                <div className="text-xs text-slate-500 line-clamp-1">
                                  {service.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-100 px-3 py-1">
                          <Link
                            href="/services"
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between"
                          >
                            <span>View All Services</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/contact"
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-md"
            >
              Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-md text-slate-700 hover:text-slate-900 hover:bg-gray-100 focus:outline-none touch-target-min flex items-center justify-center"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-blue-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay (< md) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[110px] z-40 bg-white border-t border-gray-200 overflow-y-auto animate-in fade-in duration-200">
          <div className="p-5 space-y-4">
            <div className="space-y-1">
              {siteConfig.navLinks.map((link) => {
                if (link.title === "Services") {
                  return (
                    <div key={link.title} className="space-y-1">
                      <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 bg-gray-100 rounded-md">
                        Services Overview
                      </div>
                      <div className="pl-3 space-y-1 border-l-2 border-gray-200 ml-3">
                        {siteConfig.servicesNav.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-gray-50 touch-target-min"
                          >
                            {iconMap[service.icon || "Scan"]}
                            <span>{service.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={`flex items-center justify-between w-full px-4 py-3.5 rounded-md text-base font-semibold touch-target-min transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50 border border-blue-100"
                        : "text-slate-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{link.title}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Drawer CTA */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center space-x-2 py-4 px-6 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md touch-target-min"
              >
                <span>Request Free Local Quote</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="text-center text-xs text-slate-500 pt-2 space-y-1">
                <p>📍 {siteConfig.location.fullFormatted}</p>
                <p>📞 {siteConfig.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
