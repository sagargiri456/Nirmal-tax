import { useState, useEffect, useRef } from 'react';
import { ArrowRight, TrendingUp, Users, Award, Headphones } from 'lucide-react';
import backgroundImage from '../assets/tochscreen-documents-with-charts.jpg?url';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Disconnect after first trigger to prevent re-animation
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="home" className="relative pt-20 pb-32 text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: 'fixed',
          opacity: 1
        }}
      ></div>
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-[1]" 
        style={{
          background: 'linear-gradient(to bottom, rgba(105, 88, 194, 0.5) 0%, rgba(90, 74, 179, 0.45) 50%, rgba(1, 20, 65, 0.3) 85%, transparent 100%)'
        }}
      ></div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 md:py-24 relative z-[10]">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className={`block ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Welcome to{' '}
                <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                  NirmalTax
                </span>
              </span>
              <span className={`block mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${isVisible ? 'animate-fade-in-up-delay-1' : 'opacity-0'}`}>
                Purity in Tax & Trust in Service
              </span>
            </h1>
          </div>

          {/* Description and CTA */}
          <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up-delay-2' : 'opacity-0'}`}>
            <p className="text-base sm:text-lg md:text-xl text-gray-200/90 leading-relaxed max-w-3xl mx-auto mb-8 px-2 sm:px-0">
              "Nirmal" means pure, honest, and transparent. We simplify tax with trust, combining professional expertise with personalized care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
              <button
                onClick={() => scrollToSection('services')}
                className="group bg-white text-[#6958c2] px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-[#6958c2]/30 hover:-translate-y-1 text-base sm:text-lg"
              >
                Explore Services
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-white/30 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm text-base sm:text-lg"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Stats in a Row */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={isVisible ? { animationDelay: '0.3s' } : {}}>
            <div className={`group bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:-translate-y-2 text-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={isVisible ? { animationDelay: '0.4s' } : {}}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#6958c2] to-[#5a4ab3] rounded-lg flex items-center justify-center mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Users className="text-white" size={16} />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 group-hover:scale-105 transition-transform duration-300">10</div>
              <div className="text-gray-200 font-medium text-xs">Dedicated Accountants</div>
            </div>

            <div className={`group bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:-translate-y-2 text-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={isVisible ? { animationDelay: '0.5s' } : {}}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Award className="text-white" size={16} />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 group-hover:scale-105 transition-transform duration-300">50+</div>
              <div className="text-gray-200 font-medium text-xs">Cases Completed</div>
            </div>

            <div className={`group bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:-translate-y-2 text-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={isVisible ? { animationDelay: '0.6s' } : {}}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <TrendingUp className="text-white" size={16} />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 group-hover:scale-105 transition-transform duration-300">100%</div>
              <div className="text-gray-200 font-medium text-xs">Transparency</div>
            </div>

            <div className={`group bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:-translate-y-2 text-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={isVisible ? { animationDelay: '0.7s' } : {}}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Headphones className="text-white" size={16} />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 group-hover:scale-105 transition-transform duration-300">2024</div>
              <div className="text-gray-200 font-medium text-xs">Established</div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 z-[20] pointer-events-none">
        <svg className="w-full h-20 sm:h-28 md:h-36" viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,100 C360,40 720,40 1080,60 C1260,70 1380,70 1440,70 L1440,180 L0,180 Z" fill="#f9fafb"/>
        </svg>
      </div>
    </section>
  );
}