import Hero from "@/components/home/Hero";
import WhyLocal from "@/components/home/WhyLocal";
import EquipmentShowcase from "@/components/home/EquipmentShowcase";
import FilamentBanner from "@/components/home/FilamentBanner";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      <WhyLocal />
      <EquipmentShowcase />
      <FilamentBanner />
      <Testimonials />
      <CtaBanner />
    </div>
  );
}
