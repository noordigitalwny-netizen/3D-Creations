"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Where is 3D Creations located, and how does local pickup work?",
      a: "Our studio is located in Bangor, PA 18013, serving the entire Slate Belt and Lehigh Valley region. You can drop off broken physical parts or blueprints directly at our facility, or select local pickup when placing an order to avoid all shipping fees and transit delays.",
    },
    {
      q: "What is the accuracy of your 3D scanning service?",
      a: "We utilize the flagship Revopoint METRO X metrology scanner, which delivers up to 0.02 mm accuracy. This ultra-fine resolution allows us to capture exact bolt patterns, complex mechanical curves, and precision tolerances for CAD reverse engineering and quality inspection.",
    },
    {
      q: "Which 3D printers and materials do you use?",
      a: "Our production fleet includes the Bambu Lab X1 Carbon and Bambu Lab H2C. We support multi-color printing (up to 16 colors) and a wide array of engineering materials including PLA, PETG, ABS, TPU (flexible), and Carbon Fiber reinforced filaments.",
    },
    {
      q: "Can you recreate broken or obsolete plastic and metal parts?",
      a: "Yes! Part reproduction is one of our primary specialties. If a gear, bracket, or handle breaks on an out-of-production tool, appliance, or vehicle, we 3D scan the broken pieces, reconstruct the 3D model in CAD, and print a durable replacement part—often reinforced to be stronger than the original factory piece.",
    },
    {
      q: "What file formats do you accept for 3D printing or scanning?",
      a: "For 3D printing, we accept STL, OBJ, STEP, IGES, and 3MF files. For 3D scanning or reverse engineering, you don't need any digital file—just bring or ship your physical component to our Bangor studio!",
    },
    {
      q: "How fast is your typical turnaround time?",
      a: "Because we are local to Bangor and the Slate Belt, most small prototyping and replacement part jobs are completed within 24 to 48 hours. Urgent emergency repair orders can often be accommodated same-day.",
    },
  ];

  return (
    <div className="bg-slate-50 py-12 lg:py-20 border-b border-gray-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We Have Answers.
          </h1>
          <p className="text-base text-slate-600">
            Everything you need to know about our local Bangor, PA 3D scanning, 3D printing, and reverse engineering services.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-lg bg-white border border-gray-200 overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 touch-target-min hover:bg-gray-50"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-slate-600 leading-relaxed border-t border-gray-100 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="rounded-lg bg-white border border-gray-200 p-8 text-center space-y-4 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Have a Specific Question for Our Engineer?</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Give us a call directly or send us a message with your project details.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md text-xs flex items-center justify-center space-x-2 touch-target-min"
            >
              <span>Contact Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="px-6 py-3 bg-white hover:bg-gray-100 text-slate-900 font-bold border border-gray-300 rounded-md text-xs flex items-center justify-center space-x-2 touch-target-min"
            >
              <span>Call: {siteConfig.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
