import React from "react";
import { Truck, Target, Zap, CheckCircle2 } from "lucide-react";

export default function WhyLocal() {
  const differentiators = [
    {
      title: "Zero Shipping Hassle & Free Local Pickup",
      subtitle: "Bangor & Slate Belt PA",
      icon: <Truck className="w-7 h-7 text-blue-600" />,
      badge: "Local Convenience",
      description:
        "No shipping delays, lost packages, or transit damage to delicate parts. Drop off your broken component or blueprint directly at our Bangor studio for immediate evaluation.",
      points: [
        "In-person part handoff & inspection",
        "Free local pickup in Bangor, Pen Argyl, Wind Gap",
        "Direct communication with the engineer building your part",
      ],
    },
    {
      title: "0.02mm Metrology-Grade Precision",
      subtitle: "Powered by Revopoint METRO X",
      icon: <Target className="w-7 h-7 text-blue-600" />,
      badge: "High Accuracy",
      description:
        "Industrial precision that guarantees exact fitment. Our Revopoint METRO X metrology scanner captures micro-level geometries down to 0.02mm accuracy for reverse engineering.",
      points: [
        "Metrology blue laser & structured-light scanning",
        "Extract exact bolt hole patterns & mechanical features",
        "Clean parametric STEP CAD files ready for production",
      ],
    },
    {
      title: "Fast Community Turnaround",
      subtitle: "Rapid Prototyping & Parts",
      icon: <Zap className="w-7 h-7 text-blue-600" />,
      badge: "24-48 Hr Speed",
      description:
        "Don't wait weeks for overseas suppliers or distant print bureaus. Our high-speed Bambu Lab X1 Carbon and H2C production fleet enables 24 to 48-hour local turnaround.",
      points: [
        "Multi-color & carbon fiber reinforced filaments",
        "Emergency replacement part production",
        "Local Slate Belt business priority service",
      ],
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            The Slate Belt Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Local 3D Services Matter
          </h2>
          <p className="text-base text-slate-600">
            We combine metrology-grade scanning technology with high-speed 3D printing right here in Bangor, PA.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentiators.map((card, index) => (
            <div
              key={index}
              className="rounded-lg bg-white border border-gray-200 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-md bg-blue-50 border border-blue-100">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {card.title}
                </h3>
                <span className="block text-xs font-semibold text-blue-600 mt-1 mb-3">
                  {card.subtitle}
                </span>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {card.description}
                </p>

                <ul className="space-y-2.5 pt-4 border-t border-gray-100 text-xs text-slate-700">
                  {card.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
