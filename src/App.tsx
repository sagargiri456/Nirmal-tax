import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import CasesCompleted from './components/CasesCompleted';
import About from './components/About';
import Features from './components/Features';
import BrandLogos from './components/BrandLogos';
import VisionMissionMotto from './components/VisionMissionMotto';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
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

export default App;
