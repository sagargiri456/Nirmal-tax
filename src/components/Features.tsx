import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import backgroundImage from '../assets/chooseus.jpg?url';
import shieldIcon from '../assets/shield.png';
import eyeIcon from '../assets/clarity.png';
import dollarIcon from '../assets/salary.png';
import clockIcon from '../assets/clock.png';
import medalIcon from '../assets/medal.png';

const features = [
  {
    icon: shieldIcon,
    title: 'Pure Professionalism',
    description: 'Every service is delivered with honesty, integrity, and responsibility.'
  },
  {
    icon: eyeIcon,
    title: 'Clarity & Transparency',
    description: 'No hidden terms — we explain every step clearly and simply.'
  },
  {
    icon: dollarIcon,
    title: 'Affordable Excellence',
    description: 'Premium-quality professional services at fair and competitive rates.'
  },
  {
    icon: clockIcon,
    title: 'Time-Bound Commitment',
    description: 'Your deadlines are our priority.'
  },
  {
    icon: medalIcon,
    title: 'Trusted Expertise',
    description: 'Led by CA Nirmal Kumar, our firm blends experience with modern tax intelligence.'
  }
];

export default function Features() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);

    // Auto-play carousel
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (features.length - cardsPerView + 1));
    }, 4000);

    return () => {
      window.removeEventListener('resize', updateCardsPerView);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [cardsPerView]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % (features.length - cardsPerView + 1));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (features.length - cardsPerView + 1));
    }, 4000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + (features.length - cardsPerView + 1)) % (features.length - cardsPerView + 1));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (features.length - cardsPerView + 1));
    }, 4000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (features.length - cardsPerView + 1));
    }, 4000);
  };

  const maxIndex = features.length - cardsPerView;

  return (
    <section id="features" className="relative py-12 sm:py-16 md:py-24 text-white overflow-hidden">
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
          background: 'linear-gradient(to bottom, rgba(1, 20, 65, 0.8) 0%, rgba(105, 88, 194, 0.75) 100%)'
        }}
      ></div>
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-[10]">
        <div className="text-center mb-8 sm:mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            Why Choose NirmalTax
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 max-w-2xl mx-auto px-2 sm:px-4">
            We believe that taxation and compliance should never feel complicated or intimidating. That's why we simplify tax with trust.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="overflow-hidden rounded-xl sm:rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
            >
              {features.map((feature, index) => {
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 px-2 sm:px-3 md:px-4"
                    style={{ width: `${100 / cardsPerView}%` }}
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 h-full">
                      <div className="bg-white/20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-5 lg:mb-6 p-1.5">
                        <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 sm:-left-2 md:-left-4 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-2 md:-translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-1 sm:p-2 md:p-3 transition-all duration-300 z-20 shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="text-white" size={16} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 sm:-right-2 md:-right-4 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-2 md:translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-1 sm:p-2 md:p-3 transition-all duration-300 z-20 shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="text-white" size={16} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1 sm:gap-2 mt-4 sm:mt-5 md:mt-6 lg:mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-white w-4 sm:w-6 md:w-8'
                    : 'bg-white/40 w-1.5 sm:w-2 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 