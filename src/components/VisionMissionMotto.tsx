import { Calendar } from 'lucide-react';
import targetIcon from '../assets/opportunity.png';
import rocketIcon from '../assets/target.png';
import medalIcon from '../assets/medal.png';

export default function VisionMissionMotto() {
  return (
    <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(105, 88, 194, 0.08) 0%, rgba(1, 20, 65, 0.12) 50%, rgba(105, 88, 194, 0.08) 100%)'
        }}
      ></div>

      {/* Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(105, 88, 194, 0.2) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Decorative Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6958c2]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#011441]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#6958c2]/5 to-[#011441]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            {/* <div className="inline-block mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-semibold text-[#6958c2] uppercase tracking-wider bg-[#6958c2]/10 px-4 py-2 rounded-full">
                Our Foundation
              </span>
            </div> */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#011441] mb-3 sm:mb-4 md:mb-6">
              Vision, Mission & Values
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-4">
              The principles that guide everything we do
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {/* Vision Card */}
            <div className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-gray-100 hover:border-[#6958c2]/30 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              {/* Gradient Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2]"></div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 shadow-xl group-hover:scale-110 transition-all duration-500">
                  <img src={targetIcon} alt="Vision" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#011441] mb-2 sm:mb-3 md:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                  Our Vision
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-0">
                  To build India's most trusted and transparent financial service brand — where every client finds clarity in compliance and confidence in their growth journey.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-gray-100 hover:border-[#6958c2]/30 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              {/* Gradient Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441]"></div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 shadow-xl group-hover:scale-110 transition-all duration-500">
                  <img src={rocketIcon} alt="Mission" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#011441] mb-2 sm:mb-3 md:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-0">
                  To make taxation, audit, and compliance services simple, ethical, and accessible to every individual and business through technology-driven solutions and client-focused care.
                </p>
              </div>
            </div>

            {/* Motto Card */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border-2 border-[#6958c2]/20 hover:border-[#6958c2]/40 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              {/* Gradient Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] to-[#011441]"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 rounded-xl shadow-xl group-hover:scale-110 transition-all duration-500">
                    <img src={medalIcon} alt="Medal" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#011441] group-hover:text-[#6958c2] transition-colors duration-300">
                    Our Motto
                  </h4>
                </div>
                <p className="text-sm sm:text-base md:text-lg font-display font-semibold italic leading-relaxed mb-3 sm:mb-4 md:mb-6 text-[#011441] bg-gradient-to-r from-[#6958c2] to-[#011441] bg-clip-text text-transparent">
                  "Pure in Purpose. Precise in Practice. Perfect in Performance"
                </p>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg px-3 py-2 w-fit">
                  <Calendar className="text-[#6958c2]" size={16} />
                  <span className="text-xs sm:text-sm font-medium">Established: August 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

