import React from "react";
import { Star, Quote, MapPin } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Arman Mohammad",
      location: "Slate Belt, PA",
      role: "Engineering & Local Client",
      quote:
        "The Revopoint METRO X scanning precision is unreal! They scanned a broken bracket for our equipment that hasn't been manufactured in over 20 years. Within 36 hours I had a reinforced PETG replacement printed right here in Bangor. Flawless fitment!",
      stars: 5,
      highlight: "0.02mm Scan & PETG Print",
    },
    {
      name: "David K.",
      location: "Pen Argyl, PA",
      role: "Automotive Enthusiast",
      quote:
        "3D Creations multi-color Bambu Lab printing saved my custom car interior project. Local pickup meant no waiting on shipping or worrying about cracked tabs. Top tier service in the Slate Belt.",
      stars: 5,
      highlight: "Multi-Color ASA Part",
    },
    {
      name: "Sarah M.",
      location: "Wind Gap, PA",
      role: "Small Business Owner",
      quote:
        "Ordered custom laser engraved hardwood signs for our shop storefront. The xTool S1 precision is razor crisp! Plus, picking up Overture PLA filament locally on short notice is a lifesaver.",
      stars: 5,
      highlight: "Laser Signs & Spool Stock",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Community Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Slate Belt Locals
          </h2>
          <p className="text-sm text-slate-600">
            See how local engineers, businesses, and creators rely on our scanning and 3D printing studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="rounded-lg bg-white border border-gray-200 p-7 flex flex-col justify-between shadow-sm relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-200 pointer-events-none" />

              <div>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(rev.stars)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">5.0 / 5.0</span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &quot;{rev.quote}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    <MapPin className="w-3 h-3 text-blue-600" />
                    <span>{rev.location}</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  {rev.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
