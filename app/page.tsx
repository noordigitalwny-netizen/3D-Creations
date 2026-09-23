import Hero from "@/components/home/Hero";
import WhyLocal from "@/components/home/WhyLocal";
import EquipmentShowcase from "@/components/home/EquipmentShowcase";
import FilamentBanner from "@/components/home/FilamentBanner";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";
import { getSiteContentData } from "@/lib/actions/admin";
import { getSiteContent, defaultSiteContent } from "@/lib/content";

export const revalidate = 60; // ISR fallback revalidation

export default async function HomePage() {
  const diskFallback = getSiteContent();

  const fallback = {
    heroHeadline: diskFallback.heroHeadline || defaultSiteContent.heroHeadline,
    heroSubtitle: diskFallback.heroSubtitle || defaultSiteContent.heroSubtitle,
    phoneNumber: diskFallback.phoneNumber || defaultSiteContent.phone,
    bangorAddress: diskFallback.bangorAddress || defaultSiteContent.address,
  };

  let heroHeadline = fallback.heroHeadline;
  let heroSubtitle = fallback.heroSubtitle;
  let phoneNumber = fallback.phoneNumber;
  let bangorAddress = fallback.bangorAddress;

  try {
    // Fetch key-value pairs from Supabase site_content table
    const data = await getSiteContentData();
    if (data) {
      heroHeadline = data.heroHeadline || fallback.heroHeadline;
      heroSubtitle = data.heroSubtitle || fallback.heroSubtitle;
      phoneNumber = data.phone || fallback.phoneNumber;
      bangorAddress = data.address || fallback.bangorAddress;
    }
  } catch (err) {
    console.error("Error fetching site content from Supabase in HomePage:", err);
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
