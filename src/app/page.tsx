import Hero from "@/components/home/Hero";
import WhySpeed from "@/components/home/WhySpeed";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import Audience from "@/components/home/Audience";
import Faq from "@/components/home/Faq";
import Contact from "@/components/home/Contact";
import FinalCta from "@/components/home/FinalCta";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <WhySpeed />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <Audience />
      <SectionDivider />
      <Faq />
      <SectionDivider />
      <Contact />
      <FinalCta />
    </>
  );
}
