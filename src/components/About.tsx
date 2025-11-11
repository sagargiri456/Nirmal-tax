import { useState, useEffect, useRef } from 'react';
import { Target, Eye, Rocket, CheckCircle2, Award, Calendar } from 'lucide-react';

export default function About() {
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

  return (
    <section ref={sectionRef} id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-10 sm:mb-12 md:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#011441] mb-3 sm:mb-4 ${isVisible ? 'animate-fade-in-up-delay-1' : 'opacity-0'}`}>
              About Nirmal Kumar & Co.
            </h2>
            <p className={`text-sm sm:text-base md:text-lg text-gray-600 max-w-5xl mx-auto leading-relaxed px-2 sm:px-0 ${isVisible ? 'animate-fade-in-up-delay-2' : 'opacity-0'}`}>
              Established in August 2024, we've earned client trust through precision and professionalism with 10 dedicated accountants completing 50+ cases.
            </p>
          </div>

          {/* Vision and Mission Side by Side */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
            <div className={`group bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-500 ${isVisible ? 'animate-slide-in-left-enhanced' : 'opacity-0'}`}>
              <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-lg sm:rounded-xl w-fit mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Our Vision</h3>
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
                To build India's most trusted and transparent financial service brand — where every client finds clarity in compliance and confidence in their growth journey.
              </p>
            </div>

            <div className={`group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-gray-100 hover:border-[#6958c2]/30 transition-all duration-500 ${isVisible ? 'animate-slide-in-right-enhanced' : 'opacity-0'}`}>
              <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-2 sm:p-3 rounded-lg sm:rounded-xl w-fit mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Rocket className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#011441] mb-2 sm:mb-3">Our Mission</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                To make taxation, audit, and compliance services simple, ethical, and accessible to every individual and business through technology-driven solutions and client-focused care.
              </p>
            </div>
          </div>

          {/* Motto and Established */}
          <div className={`mb-10 sm:mb-12 md:mb-16 ${isVisible ? 'animate-fade-in-up-delay-4' : 'opacity-0'}`}>
            <div className="bg-gradient-to-br from-[#6958c2]/10 via-[#6958c2]/5 to-[#011441]/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-[#6958c2]/20 shadow-xl hover:shadow-2xl hover:border-[#6958c2]/30 transition-all duration-300 relative overflow-hidden max-w-4xl mx-auto">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#6958c2]/5 rounded-full blur-3xl -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Award className="text-[#6958c2]" size={24} />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#011441]">Our Motto</h3>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-[#6958c2] font-semibold italic leading-relaxed mb-4 sm:mb-6">
                  "Pure in Purpose. Precise in Practice. Perfect in Performance"
                </p>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Calendar className="text-[#6958c2]" size={18} />
                  <span className="text-sm sm:text-base">Established: August 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className={`group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#6958c2]/30 hover:-translate-y-1 sm:hover:-translate-y-2 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
              <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <CheckCircle2 className="text-white" size={24} />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#011441] mb-2 sm:mb-3 group-hover:text-[#6958c2] transition-colors duration-300">Pure Professionalism</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Every service is delivered with honesty, integrity, and responsibility.</p>
            </div>

            <div className={`group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#6958c2]/30 hover:-translate-y-1 sm:hover:-translate-y-2 ${isVisible ? 'animate-scale-in-delay-1' : 'opacity-0'}`}>
              <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Eye className="text-white" size={24} />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#011441] mb-2 sm:mb-3 group-hover:text-[#6958c2] transition-colors duration-300">Clarity & Transparency</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">No hidden terms — we explain every step clearly and simply.</p>
            </div>

            <div className={`group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#6958c2]/30 hover:-translate-y-1 sm:hover:-translate-y-2 ${isVisible ? 'animate-scale-in-delay-2' : 'opacity-0'}`}>
              <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Award className="text-white" size={24} />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#011441] mb-2 sm:mb-3 group-hover:text-[#6958c2] transition-colors duration-300">Affordable Excellence</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Premium-quality professional services at fair and competitive rates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}