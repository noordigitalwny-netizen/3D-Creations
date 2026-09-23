import Hero from "@/components/home/Hero";
import WhyLocal from "@/components/home/WhyLocal";
import EquipmentShowcase from "@/components/home/EquipmentShowcase";
import FilamentBanner from "@/components/home/FilamentBanner";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";
import client from "@/tina/__generated__/client";
import { getSiteContent } from "@/lib/content";

export default async function HomePage() {
  // Fallbacks in case CMS data returns null during initial build or before save
  const fallback = {
    heroHeadline: "Precision 3D Printing & Scanning",
    heroSubtitle:
      "Local 3D scanning down to 0.02mm precision and rapid additive manufacturing in Bangor, PA. Zero shipping risks, fast local pickup, and personal engineering support.",
    phoneNumber: "(610) 555-0199",
    bangorAddress: "Bangor, PA 18013 | Slate Belt Region",
  };

  let heroHeadline = fallback.heroHeadline;
  let heroSubtitle = fallback.heroSubtitle;
  let phoneNumber = fallback.phoneNumber;
  let bangorAddress = fallback.bangorAddress;

  try {
    // Fetch live data server-side from TinaCMS client query
    const res = await client.queries.site_content({ relativePath: "home.json" });
    if (res?.data?.site_content) {
      const data = res.data.site_content;
      heroHeadline = data.heroHeadline || fallback.heroHeadline;
      heroSubtitle = data.heroSubtitle || fallback.heroSubtitle;
      phoneNumber = data.phoneNumber || fallback.phoneNumber;
      bangorAddress = data.bangorAddress || fallback.bangorAddress;
    }
  } catch {
    // Fallback gracefully during static generation/offline build to local content file
    const disk = getSiteContent();
    heroHeadline = disk.heroHeadline || fallback.heroHeadline;
    heroSubtitle = disk.heroSubtitle || fallback.heroSubtitle;
    phoneNumber = disk.phoneNumber || fallback.phoneNumber;
    bangorAddress = disk.bangorAddress || fallback.bangorAddress;
  }

  return (
    <div className="space-y-0">
      <Hero
        headline={heroHeadline}
        subtitle={heroSubtitle}
        address={bangorAddress}
        phone={phoneNumber}
      />
      <WhyLocal />
      <EquipmentShowcase />
      <FilamentBanner />
      <Testimonials />
      <CtaBanner phone={phoneNumber} address={bangorAddress} />
    </div>
  );
}
