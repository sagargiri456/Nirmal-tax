import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import CasesCompleted from '../components/CasesCompleted';
import About from '../components/About';
import Features from '../components/Features';
import BrandLogos from '../components/BrandLogos';
import VisionMissionMotto from '../components/VisionMissionMotto';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation when coming from other pages
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Scroll to top when navigating to home without hash
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <CasesCompleted />
      <Features />
      <BrandLogos />
      <VisionMissionMotto />
      <Contact />
      <Footer />
    </div>
  );
}

