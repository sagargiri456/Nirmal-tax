import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
// import backgroundImage1 from '../assets/tochscreen-documents-with-charts.jpg?url';
import backgroundImage2 from '../assets/view-downtown-shanghai-china.jpg?url';
import backgroundImage3 from '../assets/team-business-people-stacking-hands.jpg?url';
import backgroundImage4 from '../assets/business-meeting-room-high-rise-office-building.jpg?url';

const backgroundImages = [
  // backgroundImage1,
  backgroundImage2,
  backgroundImage3,
  backgroundImage4,
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Carousel auto-play
  useEffect(() => {
    carouselIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, []);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
    );
    // Reset auto-play timer
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    carouselIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
    // Reset auto-play timer
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    carouselIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    // Reset auto-play timer
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    carouselIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="home" className="relative pt-20 pb-40 sm:pb-48 md:pb-56 text-white overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              willChange: 'opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          ></div>
        ))}
      </div>
      
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 z-[1] bg-black/60"
      ></div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={goToPreviousImage}
        className="hidden absolute left-4 top-1/2 -translate-y-1/2 z-[15] bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 md:p-3 transition-all duration-300 border border-white/20 hover:border-white/40 group items-center justify-center"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={goToNextImage}
        className="hidden absolute right-4 top-1/2 -translate-y-1/2 z-[15] bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 md:p-3 transition-all duration-300 border border-white/20 hover:border-white/40 group items-center justify-center"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Carousel Dots Indicator */}
      <div className="absolute bottom-32 sm:bottom-36 md:bottom-40 lg:bottom-44 left-1/2 -translate-x-1/2 z-[15] flex gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'w-8 bg-white'
                : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20 sm:py-28 md:py-32 lg:py-36 relative z-[10]">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <div className={`text-center mb-6 sm:mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.1] mb-6 tracking-[-0.02em]">
              <span className={`block ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Welcome to{' '}
                <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent font-medium">
                  NirmalTax
                </span>
              </span>
              <span className={`block mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-[-0.01em] ${isVisible ? 'animate-fade-in-up-delay-1' : 'opacity-0'}`}>
                Purity in Tax & Trust in Service
              </span>
            </h1>
          </div>

          {/* Description and CTA */}
          <div className={`text-center mb-20 sm:mb-24 ${isVisible ? 'animate-fade-in-up-delay-2' : 'opacity-0'}`}>
            <p className="text-base sm:text-lg md:text-xl text-gray-200/95 leading-[1.7] max-w-3xl mx-auto mb-8 px-2 sm:px-0 font-body font-normal tracking-wide">
              "Nirmal" means pure, honest, and transparent. We simplify tax with trust, combining professional expertise with personalized care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
              <button
                onClick={() => scrollToSection('services')}
                className="group bg-white text-[#6958c2] px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-body font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-[#6958c2]/30 hover:-translate-y-1 text-base sm:text-lg tracking-wide"
              >
                Explore Services
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-white/30 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-body font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm text-base sm:text-lg tracking-wide"
              >
                Contact Us
              </button>
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