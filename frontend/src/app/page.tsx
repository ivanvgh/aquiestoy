import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import SuccessCaseSection from "@/components/landing/SuccessCaseSection";
import QuickWinFeatures from "@/components/landing/QuickWinFeatures";
import ServicesGrid from "@/components/landing/ServicesGrid";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ReferralBanner from "@/components/landing/ReferralBanner";
import SafetySection from "@/components/landing/SafetySection";
import TechnicianCTA from "@/components/landing/TechnicianCTA";
import FaqSection from "@/components/landing/FaqSection";
import Footer from "@/components/landing/Footer";
import WaitlistSection from "@/components/landing/WaitlistSection";
import DistrictVotingResults from "@/components/landing/DistrictVotingResults";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DistrictVotingResults />
        <SuccessCaseSection />
        <QuickWinFeatures />
        <ServicesGrid />
        <HowItWorksSection />
        <ReferralBanner />
        <SafetySection />
        <TechnicianCTA />
        <WaitlistSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
