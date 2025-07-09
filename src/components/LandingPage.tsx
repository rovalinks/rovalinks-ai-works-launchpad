import { HeroSection } from './HeroSection';
import { CoreFocusSection } from './CoreFocusSection';
import { ServicesSection } from './ServicesSection';
import { Footer } from './Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <HeroSection />
      <CoreFocusSection />
      <ServicesSection />
      <Footer />
    </div>
  );
};