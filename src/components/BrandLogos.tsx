import { useState, useEffect, useRef } from 'react';
import brandLogo1 from '../assets/picture1.webp';
import brandLogo2 from '../assets/picture2.webp';
import brandLogo3 from '../assets/Picture3.png.webp';
import brandLogo4 from '../assets/Picture4.png.webp';
import brandLogo5 from '../assets/Picture5.png.webp';

const brands = [
  {
    id: 1,
    name: 'Seven Lakes Technologies',
    logo: brandLogo1
  },
  {
    id: 2,
    name: 'Urban Piper',
    logo: brandLogo2
  },
  {
    id: 3,
    name: 'GreytHR',
    logo: brandLogo3
  },
  {
    id: 4,
    name: 'Almarai',
    logo: brandLogo4
  },
  {
    id: 5,
    name: 'Partner Brand',
    logo: brandLogo5
  }
];

export default function BrandLogos() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section ref={sectionRef} id="brands" className="relative py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className={`text-center mb-8 sm:mb-12 md:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#011441] mb-3 sm:mb-4 md:mb-6 leading-tight ${isVisible ? 'animate-fade-in-up-delay-1' : 'opacity-0'}`}>
              Trusted Partners
            </h2>
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 ${isVisible ? 'animate-fade-in-up-delay-2' : 'opacity-0'}`}>
              We're proud to work with leading brands and organizations across various industries
            </p>
          </div>

          {/* Brand Logos Infinite Slider */}
          <div className={`overflow-hidden ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="brand-logos-slider">
              <div className="brand-logos-track">
                {duplicatedBrands.map((brand, index) => (
                  <div
                    key={`${brand.id}-${index}`}
                    className="flex items-center justify-center p-4 sm:p-6 flex-shrink-0"
                    style={{ width: '200px' }}
                  >
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="w-full h-auto max-h-12 sm:max-h-16 md:max-h-20 object-contain transition-all duration-300 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

