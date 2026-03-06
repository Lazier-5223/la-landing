import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ServiceDetails from "@/components/ServiceDetails";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ServiceDetails />
      <PricingSection />
      <Footer />
    </main>
  );
}
