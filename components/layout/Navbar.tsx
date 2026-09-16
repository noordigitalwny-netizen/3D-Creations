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
  ArrowRight,
  Phone,
  Clock,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Scan: <Scan className="w-5 h-5 text-amber-500" />,
  Printer: <Printer className="w-5 h-5 text-cyan-400" />,
  Cpu: <Cpu className="w-5 h-5 text-amber-500" />,
  Zap: <Zap className="w-5 h-5 text-cyan-400" />,
  Wrench: <Wrench className="w-5 h-5 text-amber-500" />,
  Layers: <Layers className="w-5 h-5 text-cyan-400" />,
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Banner Bar for Local Contact */}
      <div className="hidden sm:block bg-slate-950/90 text-slate-400 text-xs border-b border-slate-800/80 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Slate Belt Studio: <strong className="text-white">{siteConfig.location.city}, PA</strong>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {siteConfig.contact.hours}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{siteConfig.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? "bg-slate-950/95 backdrop-blur-md border-slate-800 shadow-xl shadow-black/40 py-3"
            : "bg-slate-900/80 backdrop-blur-sm border-slate-800/60 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-amber-500/40 bg-slate-950 p-1 group-hover:border-cyan-400 transition-colors">
              <Image
                src="/logo.png"
                alt="3D Creations Logo"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                onError={(e) => {
                  // Graceful fallback to SVG mark if image fails
                  const target = e.target as HTMLElement;
                  target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-amber-500 text-sm bg-slate-950 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                3D
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {siteConfig.name}
              </span>
              <span className="block text-[10px] uppercase tracking-widest font-semibold text-cyan-400 -mt-1">
                Bangor, PA • Metrology & Print
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
                      className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                        pathname.startsWith("/services")
                          ? "text-amber-400 bg-slate-800/60"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                      }`}
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesDropdownOpen ? "rotate-180 text-amber-400" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Desktop Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 mt-1 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl shadow-black/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-3 py-1.5 mb-1 border-b border-slate-800">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                            Our Capabilities
                          </span>
                        </div>
                        <div className="space-y-1">
                          {siteConfig.servicesNav.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-slate-800/90 transition-colors group"
                            >
                              <div className="p-1.5 rounded-md bg-slate-950 border border-slate-800 group-hover:border-amber-500/50 transition-colors">
                                {iconMap[service.icon || "Scan"]}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                                  {service.title}
                                </div>
                                <div className="text-xs text-slate-400 line-clamp-1">
                                  {service.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-800 px-3 py-1">
                          <Link
                            href="/services"
                            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center justify-between"
                          >
                            <span>View All Services Index</span>
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
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-amber-400 bg-slate-800/60 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/40"
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
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 rounded-lg shadow-md hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/contact"
              className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-500 rounded-md"
            >
              Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 touch-target-min flex items-center justify-center"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay (< md) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="p-5 space-y-4">
            <div className="space-y-1">
              {siteConfig.navLinks.map((link) => {
                if (link.title === "Services") {
                  return (
                    <div key={link.title} className="space-y-1">
                      <div className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-amber-400 bg-slate-900/60 rounded-lg">
                        Our Services
                      </div>
                      <div className="pl-3 space-y-1 border-l-2 border-slate-800 ml-3">
                        {siteConfig.servicesNav.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 touch-target-min"
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
                    className={`flex items-center justify-between w-full px-4 py-3.5 rounded-lg text-base font-medium touch-target-min transition-colors ${
                      isActive
                        ? "text-amber-400 bg-slate-900 border border-slate-800 font-bold"
                        : "text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    <span>{link.title}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Drawer CTA */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center space-x-2 py-4 px-6 text-base font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-xl shadow-lg touch-target-min"
              >
                <span>Request Free Local Quote</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="text-center text-xs text-slate-400 pt-2">
                <p>📍 {siteConfig.location.fullFormatted}</p>
                <p className="mt-1">📞 {siteConfig.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
