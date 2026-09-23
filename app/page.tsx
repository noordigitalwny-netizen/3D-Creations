import Hero from "@/components/home/Hero";
import WhyLocal from "@/components/home/WhyLocal";
import EquipmentShowcase from "@/components/home/EquipmentShowcase";
import FilamentBanner from "@/components/home/FilamentBanner";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";
import { getSiteContent } from "@/lib/content";

export default function HomePage() {
  // Read dynamic site copy managed by TinaCMS
  const content = getSiteContent();

  return (
    <div className="space-y-0">
      <Hero
        headline={content.heroHeadline}
        subtitle={content.heroSubtitle}
        address={content.bangorAddress}
      />
      <WhyLocal />
      <EquipmentShowcase />
      <FilamentBanner />
      <Testimonials />
      <CtaBanner />
    </div>
  );
}
