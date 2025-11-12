import { useState, useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';
import backgroundImage from '../assets/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working.jpg?url';
import targetIcon from '../assets/opportunity.png';
import rocketIcon from '../assets/target.png';
import medalIcon from '../assets/medal.png';
import checkIcon from '../assets/check.png';
import eyeIcon from '../assets/clarity.png';
import trophyIcon from '../assets/trophy.png';
import accountantIcon from '../assets/accountant.png';
import caseStudyIcon from '../assets/case-study.png';
import businessEthicsIcon from '../assets/business-ethics.png';
import establishmentIcon from '../assets/establishment.png';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Preload background image when section is visible
            const preloadImage = new Image();
            preloadImage.src = backgroundImage;
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '200px 0px -50px 0px' // Start loading 200px before section is visible
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
    <section ref={sectionRef} id="about" className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      ></div>
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/85 z-[1]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className={`text-center mb-10 sm:mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-block mb-3">
              <span className="text-xs font-semibold text-[#6958c2] uppercase tracking-wider bg-[#6958c2]/10 px-3 py-1.5 rounded-full">
                About Us
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#011441] mb-3 sm:mb-4 md:mb-6 leading-tight ${isVisible ? 'animate-fade-in-up-delay-1' : 'opacity-0'}`}>
              Nirmal Kumar & Co.
            </h2>
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 ${isVisible ? 'animate-fade-in-up-delay-2' : 'opacity-0'}`}>
              Purity in Tax & Trust in Service
            </p>
          </div>

          {/* Redesigned Professional Grid Layout */}
          <div className={`space-y-6 sm:space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            
            {/* Top Section: Stats and Story in Asymmetric Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              {/* Stats - Left Side (4 columns) */}
              <div className="lg:col-span-4">
                <div className="grid grid-cols-2 gap-4 sm:gap-5 h-full">
                  <div className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-gray-100 hover:border-[#6958c2]/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#6958c2] to-[#5a4ab3] rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg p-2">
                      <img src={accountantIcon} alt="Accountants" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-normal mb-2 text-[#011441]">10</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Dedicated Accountants</div>
                  </div>

                  <div className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-gray-100 hover:border-orange-400/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg p-2">
                      <img src={caseStudyIcon} alt="Cases" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-normal mb-2 text-[#011441]">50+</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Cases Completed</div>
                  </div>

                  <div className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-gray-100 hover:border-green-400/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg p-2">
                      <img src={businessEthicsIcon} alt="Transparency" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-normal mb-2 text-[#011441]">100%</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Transparency</div>
                  </div>

                  <div className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-gray-100 hover:border-blue-400/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg p-2">
                      <img src={establishmentIcon} alt="Established" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-normal mb-2 text-[#011441]">2024</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Established</div>
                  </div>
                </div>
              </div>

              {/* Story Card - Right Side (8 columns) */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-10 bg-gradient-to-b from-[#6958c2] to-[#011441] rounded-full"></div>
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#011441]">
                      Our Story
                    </h3>
                  </div>
                  <div className="space-y-4">
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
            </div>

            {/* Middle Section: Vision, Mission, Motto in Single Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="group bg-white rounded-2xl p-5 sm:p-6 shadow-xl border-2 border-gray-100 hover:border-[#6958c2]/40 hover:shadow-[#6958c2]/20 transition-all duration-500">
                <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 rounded-xl w-fit mb-4 shadow-lg group-hover:scale-110 transition-all duration-500">
                  <img src={targetIcon} alt="Vision" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#011441] mb-3">Our Vision</h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  To build India's most trusted and transparent financial service brand — where every client finds clarity in compliance and confidence in their growth journey.
                </p>
              </div>

              <div className="group bg-white rounded-2xl p-5 sm:p-6 shadow-xl border-2 border-gray-100 hover:border-[#6958c2]/40 hover:shadow-[#6958c2]/20 transition-all duration-500">
                <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 rounded-xl w-fit mb-4 shadow-lg group-hover:scale-110 transition-all duration-500">
                  <img src={rocketIcon} alt="Mission" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#011441] mb-3">Our Mission</h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  To make taxation, audit, and compliance services simple, ethical, and accessible to every individual and business through technology-driven solutions and client-focused care.
                </p>
              </div>

              <div className="group bg-white rounded-2xl p-5 sm:p-6 shadow-xl border-2 border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-2.5 rounded-xl shadow-lg">
                    <img src={medalIcon} alt="Medal" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#011441]">Our Motto</h4>
                </div>
                <p className="text-xs sm:text-sm font-display font-normal italic leading-relaxed mb-4 text-gray-700">
                  "Pure in Purpose. Precise in Practice. Perfect in Performance"
                </p>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="text-[#6958c2]" size={16} />
                  <span className="text-xs sm:text-sm">Established: August 2024</span>
                </div>
              </div>
            </div>

            {/* Bottom Section: Core Values */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-gray-100">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#011441] mb-6 text-center">Core Values</h3>
              <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                <div className="flex flex-col items-center text-center group">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all duration-500">
                    <img src={checkIcon} alt="Professionalism" className="w-8 h-8 object-contain" />
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#011441] mb-2">Pure Professionalism</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Every service delivered with honesty, integrity, and responsibility.</p>
                </div>
                <div className="flex flex-col items-center text-center group">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all duration-500">
                    <img src={eyeIcon} alt="Transparency" className="w-8 h-8 object-contain" />
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#011441] mb-2">Clarity & Transparency</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">No hidden terms — we explain every step clearly and simply.</p>
                </div>
                <div className="flex flex-col items-center text-center group">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all duration-500">
                    <img src={trophyIcon} alt="Excellence" className="w-8 h-8 object-contain" />
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#011441] mb-2">Affordable Excellence</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Premium-quality services at fair and competitive rates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
