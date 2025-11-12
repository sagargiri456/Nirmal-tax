import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Features from './components/Features';
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
      <Features />
      <VisionMissionMotto />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
