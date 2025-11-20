import { useState, useEffect, useRef } from 'react';
import backgroundImage from '../assets/About.png';
import checkIcon from '../assets/check.png';
import eyeIcon from '../assets/clarity.png';
import trophyIcon from '../assets/trophy.png';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [valuesVisible, setValuesVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Trigger image animation
            setTimeout(() => setImageVisible(true), 200);
            // Trigger content animation
            setTimeout(() => setContentVisible(true), 400);
            // Trigger values animation
            setTimeout(() => setValuesVisible(true), 600);
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

  return (
    <section ref={sectionRef} id="about" className="relative py-8 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className={`text-center mb-8 sm:mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#011441] mb-2 sm:mb-4 md:mb-6 leading-tight ${isVisible ? 'animate-fade-in-up-delay-1' : 'opacity-0'}`}>
              Nirmal Kumar & Co.
            </h2>
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 ${isVisible ? 'animate-fade-in-up-delay-2' : 'opacity-0'}`}>
              Purity in Tax & Trust in Service
            </p>
          </div>

          {/* Image and Content Layout */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-8 sm:mb-12">
            
            {/* Left Side: Image */}
            <div ref={imageRef} className={`order-2 md:order-1 ${imageVisible ? 'animate-slide-in-left-scale' : 'opacity-0'}`}>
              <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={backgroundImage} 
                  alt="Nirmal Kumar & Co. Team" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Side: Content */}
            <div ref={contentRef} className={`order-1 md:order-2 ${contentVisible ? 'animate-slide-in-right-scale' : 'opacity-0'}`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
                <div className="w-1 h-6 sm:h-10 bg-gradient-to-b from-[#6958c2] to-[#011441] rounded-full"></div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#011441]">
                  About Us
                </h3>
              </div>
              <div className="space-y-2 sm:space-y-4">
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  Established in <strong className="text-[#6958c2] font-semibold">August 2024</strong>, <strong className="text-[#011441]">Nirmal Kumar & Co.</strong> was founded with a simple yet powerful vision: to bring purity, honesty, and transparency to the world of taxation and financial services.
                </p>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  The name <em className="text-[#6958c2] font-semibold">"Nirmal"</em> itself means pure, honest, and transparent — values that form the cornerstone of everything we do. We believe that financial services should be accessible, understandable, and trustworthy for everyone.
                </p>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  In just a short time, we've built a team of <strong className="text-[#011441]">10 dedicated accountants</strong> who have successfully completed <strong className="text-[#011441]">50+ cases</strong>, earning the trust of clients through our commitment to precision, professionalism, and personalized care.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Core Values */}
          <div ref={valuesRef} className={valuesVisible ? 'animate-fade-in-up' : 'opacity-0'}>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-gray-200 max-w-3xl mx-auto">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#011441] mb-4 sm:mb-6 text-center">Core Values</h3>
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <div className={`flex flex-col items-center text-center group ${valuesVisible ? 'animate-scale-in-delay-1' : 'opacity-0'}`}>
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-all duration-500">
                    <img src={checkIcon} alt="Professionalism" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain" />
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#011441] mb-2">Pure Professionalism</h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">Every service delivered with honesty, integrity, and responsibility.</p>
                </div>
                <div className={`flex flex-col items-center text-center group ${valuesVisible ? 'animate-scale-in-delay-2' : 'opacity-0'}`}>
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-all duration-500">
                    <img src={eyeIcon} alt="Transparency" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain" />
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#011441] mb-2">Clarity & Transparency</h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">No hidden terms — we explain every step clearly and simply.</p>
                </div>
                <div className={`flex flex-col items-center text-center group ${valuesVisible ? 'animate-scale-in-delay-3' : 'opacity-0'}`}>
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-all duration-500">
                    <img src={trophyIcon} alt="Excellence" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain" />
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#011441] mb-2">Affordable Excellence</h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">Premium-quality services at fair and competitive rates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}