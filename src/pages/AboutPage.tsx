import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backgroundImage from '../assets/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working.jpg?url';
import heroBackgroundImage from '../assets/business-meeting-room-high-rise-office-building.jpg?url';
import commitmentsBackgroundImage from '../assets/tochscreen-documents-with-charts.jpg?url';
import shieldIcon from '../assets/shield.png';
import handshakeIcon from '../assets/handshake.png';
import dollarIcon from '../assets/salary.png';
import analyticsIcon from '../assets/analytics.png';
import targetIcon from '../assets/purpose.png';
import rocketIcon from '../assets/opportunity.png';
import missionIcon from '../assets/target.png';

export default function AboutPage() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [introImageVisible, setIntroImageVisible] = useState(false);
  const [introContentVisible, setIntroContentVisible] = useState(false);
  const [commitmentHeaderVisible, setCommitmentHeaderVisible] = useState(false);
  const [commitmentCardsVisible, setCommitmentCardsVisible] = useState<boolean[]>(new Array(5).fill(false));
  const [purposeHeaderVisible, setPurposeHeaderVisible] = useState(false);
  const [purposeCardsVisible, setPurposeCardsVisible] = useState<boolean[]>(new Array(3).fill(false));
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const introImageRef = useRef<HTMLDivElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const commitmentHeaderRef = useRef<HTMLDivElement>(null);
  const commitmentCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const purposeHeaderRef = useRef<HTMLDivElement>(null);
  const purposeCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current) {
              setHeaderVisible(true);
            } else if (entry.target === introImageRef.current) {
              setIntroImageVisible(true);
            } else if (entry.target === introContentRef.current) {
              setIntroContentVisible(true);
            } else if (entry.target === commitmentHeaderRef.current) {
              setCommitmentHeaderVisible(true);
            } else if (entry.target === purposeHeaderRef.current) {
              setPurposeHeaderVisible(true);
            } else {
              // Check if it's a commitment card
              const commitmentIndex = commitmentCardRefs.current.findIndex(ref => ref === entry.target);
              if (commitmentIndex !== -1) {
                setCommitmentCardsVisible(prev => {
                  const newState = [...prev];
                  newState[commitmentIndex] = true;
                  return newState;
                });
              }
              
              // Check if it's a purpose card
              const purposeIndex = purposeCardRefs.current.findIndex(ref => ref === entry.target);
              if (purposeIndex !== -1) {
                setPurposeCardsVisible(prev => {
                  const newState = [...prev];
                  newState[purposeIndex] = true;
                  return newState;
                });
              }
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (introImageRef.current) observer.observe(introImageRef.current);
    if (introContentRef.current) observer.observe(introContentRef.current);
    if (commitmentHeaderRef.current) observer.observe(commitmentHeaderRef.current);
    if (purposeHeaderRef.current) observer.observe(purposeHeaderRef.current);
    
    commitmentCardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    purposeCardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const professionalCommitments = [
    {
      icon: shieldIcon,
      title: 'Integrity at the Core',
      description: 'Every interaction is guided by honesty, responsibility, and complete transparency with clear communication at all stages.'
    },
    {
      icon: missionIcon,
      title: 'Expertise Backed by Precision',
      description: 'Led by CA Nirmal Kumar, our team combines technical skills with practical experience across taxation, auditing, and corporate compliances.'
    },
    {
      icon: handshakeIcon,
      title: 'Client-Centric Approach',
      description: 'Your goals, challenges, and concerns shape our solutions — not templates or shortcuts.'
    },
    {
      icon: dollarIcon,
      title: 'Affordable, Accessible, and Reliable',
      description: 'Fair pricing, comprehensive documentation, and prompt support ensure you always feel supported and informed.'
    },
    {
      icon: analyticsIcon,
      title: 'Technology-Driven Efficiency',
      description: 'Modern tools and secure digital processes ensure faster turnaround without compromising quality.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Header Section */}
      <section ref={sectionRef} id="about-hero" className="relative pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Overlay for better text readability */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(1, 20, 65, 0.75) 0%, rgba(105, 88, 194, 0.65) 50%, rgba(1, 20, 65, 0.75) 100%)'
          }}
        ></div>

        {/* Decorative Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6958c2]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#011441]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div ref={headerRef} className={headerVisible ? 'animate-fade-in-up' : 'opacity-0'}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                About NirmalTax
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white drop-shadow-md transition-all duration-700 ${headerVisible ? 'animate-fade-in-up-delay-1' : 'opacity-0'}`}>
                  Purity in Tax.
                </p>
                <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white drop-shadow-md transition-all duration-700 ${headerVisible ? 'animate-fade-in-up-delay-2' : 'opacity-0'}`}>
                  Integrity in Service.
                </p>
                <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white drop-shadow-md transition-all duration-700 ${headerVisible ? 'animate-fade-in-up-delay-3' : 'opacity-0'}`}>
                  Excellence in Every Step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16">
              {/* Left Side: Image */}
              <div ref={introImageRef} className={`order-2 md:order-1 ${introImageVisible ? 'animate-slide-in-left-scale' : 'opacity-0'}`}>
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={backgroundImage} 
                    alt="Nirmal Kumar & Co. Team" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Right Side: Content */}
              <div ref={introContentRef} className={`order-1 md:order-2 ${introContentVisible ? 'animate-slide-in-right-scale' : 'opacity-0'}`}>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#6958c2] to-[#011441] rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#011441]">
                    Who We Are
                  </h2>
                </div>
                <div className="space-y-4 sm:space-y-5">
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                    NirmalTax is the digital presence of <strong className="text-[#011441] font-semibold">Nirmal Kumar & Co.</strong>, a distinguished CA firm built on honesty, clarity, and ethical financial practice. True to the meaning of <em className="text-[#6958c2] font-semibold">"Nirmal"</em> — pure and transparent — we stand for reliability, accountability, and a client-first approach.
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                    Founded in <strong className="text-[#6958c2] font-semibold">August 2024</strong>, we've quickly grown into a trusted name in taxation and statutory matters. With a team of <strong className="text-[#011441] font-semibold">10 skilled accountants</strong> and <strong className="text-[#011441] font-semibold">50+ successfully handled cases</strong>, we provide comprehensive financial solutions that simplify complexity for individuals and businesses.
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                    We make finance simple, accessible, and stress-free through effective communication, timely delivery, and expertly executed services. Whether you're filing your first tax return or navigating complex audits and GST requirements, we ensure personalized attention and authentic guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Commitment Section */}
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${commitmentsBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Overlay for better content readability */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.82) 50%, rgba(255, 255, 255, 0.78) 100%)'
          }}
        ></div>
        
        {/* Subtle gradient accent */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(105, 88, 194, 0.05) 0%, rgba(1, 20, 65, 0.08) 50%, rgba(105, 88, 194, 0.05) 100%)'
          }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div ref={commitmentHeaderRef} className={`text-center mb-12 sm:mb-16 md:mb-20 ${commitmentHeaderVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#011441] mb-4 sm:mb-6">
                Our Professional Commitment
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
                Five pillars that define how we serve you
              </p>
            </div>

            {/* Commitment Cards Layout - Redesigned */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {/* First Row: 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                {professionalCommitments.slice(0, 3).map((commitment, index) => (
                  <div
                    key={index}
                    ref={(el) => { commitmentCardRefs.current[index] = el; }}
                    className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/25 transition-all duration-500 hover:-translate-y-3 overflow-hidden ${commitmentCardsVisible[index] ? 'animate-scale-in' : 'opacity-0'}`}
                    style={{
                      animationDelay: `${index * 0.15}s`
                    }}
                  >
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 via-[#011441]/0 to-[#6958c2]/0 group-hover:from-[#6958c2]/8 group-hover:via-[#011441]/5 group-hover:to-[#6958c2]/8 transition-all duration-700"></div>
                    
                    {/* Top Border with Animation */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                    
                    <div className="relative z-10 flex flex-col items-center text-center h-full">
                      {/* Icon Container - Centered at Top */}
                      <div className="mb-4 sm:mb-5">
                        <div className="relative">
                          <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-2xl group-hover:shadow-[#6958c2]/40 group-hover:scale-110 transition-all duration-500">
                            <img src={commitment.icon} alt={commitment.title} className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain" />
                          </div>
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                        {commitment.title}
                      </h3>
                      
                      {/* Divider Line */}
                      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#6958c2] to-transparent mb-4 sm:mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 flex-grow">
                        {commitment.description}
                      </p>
                    </div>
                    
                    {/* Bottom Accent on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                  </div>
                ))}
              </div>

              {/* Second Row: 2 Cards Centered */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-4xl">
                  {professionalCommitments.slice(3, 5).map((commitment, index) => (
                    <div
                      key={index + 3}
                      ref={(el) => { commitmentCardRefs.current[index + 3] = el; }}
                      className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/25 transition-all duration-500 hover:-translate-y-3 overflow-hidden ${commitmentCardsVisible[index + 3] ? 'animate-scale-in' : 'opacity-0'}`}
                      style={{
                        animationDelay: `${(index + 3) * 0.15}s`
                      }}
                    >
                      {/* Animated Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 via-[#011441]/0 to-[#6958c2]/0 group-hover:from-[#6958c2]/8 group-hover:via-[#011441]/5 group-hover:to-[#6958c2]/8 transition-all duration-700"></div>
                      
                      {/* Top Border with Animation */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                      
                      <div className="relative z-10 flex flex-col items-center text-center h-full">
                        {/* Icon Container - Centered at Top */}
                        <div className="mb-4 sm:mb-5">
                          <div className="relative">
                            <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-2xl group-hover:shadow-[#6958c2]/40 group-hover:scale-110 transition-all duration-500">
                              <img src={commitment.icon} alt={commitment.title} className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain" />
                            </div>
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-sm sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                          {commitment.title}
                        </h3>
                        
                        {/* Divider Line */}
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#6958c2] to-transparent mb-4 sm:mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Description */}
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 flex-grow">
                          {commitment.description}
                        </p>
                      </div>
                      
                      {/* Bottom Accent on Hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose, Vision & Mission Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div ref={purposeHeaderRef} className={`text-center mb-12 sm:mb-16 md:mb-20 ${purposeHeaderVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#011441] mb-4 sm:mb-6">
                Our Purpose, Vision & Mission
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
                The guiding principles that shape our journey
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {/* Purpose Card */}
              <div
                ref={(el) => { purposeCardRefs.current[0] = el; }}
                className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-lg border-2 border-[#6958c2]/20 hover:border-[#6958c2]/40 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${purposeCardsVisible[0] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{
                  animationDelay: '0.1s'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] to-[#011441]"></div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 shadow-xl group-hover:scale-110 transition-all duration-500">
                    <img src={targetIcon} alt="Purpose" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain" />
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                    Our Purpose
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    To empower individuals, businesses, and startups with clarity, compliance, and confidence through ethical practice.
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div
                ref={(el) => { purposeCardRefs.current[1] = el; }}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-lg border border-gray-100 hover:border-[#6958c2]/30 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${purposeCardsVisible[1] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{
                  animationDelay: '0.2s'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2]"></div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 shadow-xl group-hover:scale-110 transition-all duration-500">
                    <img src={rocketIcon} alt="Vision" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain" />
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                    Our Vision
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    To build India's most trusted and transparent tax advisory brand, rooted in integrity and customer satisfaction.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div
                ref={(el) => { purposeCardRefs.current[2] = el; }}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-lg border border-gray-100 hover:border-[#6958c2]/30 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${purposeCardsVisible[2] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{
                  animationDelay: '0.3s'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441]"></div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 shadow-xl group-hover:scale-110 transition-all duration-500">
                    <img src={missionIcon} alt="Mission" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain" />
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                    Our Mission
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    To simplify taxation, audit, and business compliance through ethical, knowledge-driven solutions and technology-enabled efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}