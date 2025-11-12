import { useState, useEffect, useRef } from 'react';
import logoImage from '../assets/logo.jpg';
import backgroundImage from '../assets/business-meeting-room-high-rise-office-building.jpg?url';
import accountantIcon from '../assets/accountant.png';
import shieldIcon from '../assets/shield.png';
import trendIcon from '../assets/trend.png';
import billIcon from '../assets/bill.png';
import moneyIcon from '../assets/money.png';
import analyticsIcon from '../assets/analytics.png';
import establishmentIcon from '../assets/establishment.png';
import businessmanIcon from '../assets/businessman.png';
import handshakeIcon from '../assets/handshake.png';
import budgetIcon from '../assets/budget.png';
import reportIcon from '../assets/3d-report.png';

const services = [
  {
    icon: accountantIcon,
    title: 'Income Tax Return Filing',
    description: 'Professional income tax return filing services for individuals and businesses with timely submission.',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: shieldIcon,
    title: 'Tax Audit & Statutory Audit',
    description: 'Comprehensive tax audit and statutory audit services ensuring compliance and accuracy.',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    icon: trendIcon,
    title: 'Income Tax Appeals & Litigation',
    description: 'Expert representation in income tax appeals and GST litigation matters.',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    icon: billIcon,
    title: 'TDS Return Filing',
    description: 'Accurate and timely TDS return filing to ensure compliance with tax regulations.',
    gradient: 'from-red-500 to-red-600'
  },
  {
    icon: moneyIcon,
    title: 'GST Registration & Return Filing',
    description: 'Complete GST registration and regular return filing services for seamless compliance.',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    icon: analyticsIcon,
    title: 'Company Audit & ROC Compliance',
    description: 'Company audit services and ROC compliance to keep your business in good standing.',
    gradient: 'from-yellow-500 to-amber-600'
  },
  {
    icon: establishmentIcon,
    title: 'Company, LLP & Partnership Registration',
    description: 'End-to-end registration services for companies, LLPs, and partnership firms.',
    gradient: 'from-indigo-500 to-indigo-600'
  },
  {
    icon: businessmanIcon,
    title: 'Start-up Registration',
    description: 'Comprehensive start-up registration services including MSME and trade license applications.',
    gradient: 'from-pink-500 to-pink-600'
  },
  {
    icon: moneyIcon,
    title: 'PAN & TAN Applications',
    description: 'Quick and efficient PAN and TAN application processing for individuals and businesses.',
    gradient: 'from-teal-500 to-teal-600'
  },
  {
    icon: handshakeIcon,
    title: 'Professional Tax, ESIC & PF Registration',
    description: 'Complete registration services for Professional Tax, ESIC, and PF compliance.',
    gradient: 'from-cyan-500 to-cyan-600'
  },
  {
    icon: budgetIcon,
    title: 'Monthly ESIC & PF Return Filing',
    description: 'Regular monthly ESIC and PF return filing to maintain statutory compliance.',
    gradient: 'from-emerald-500 to-green-600'
  },
  {
    icon: reportIcon,
    title: 'Project Report for Bank Loan',
    description: 'Professional project report preparation for bank loan applications with detailed financial projections.',
    gradient: 'from-amber-500 to-yellow-600'
  }
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [radius, setRadius] = useState(500);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Mobile-specific radius calculation
    const updateRadius = () => {
      const width = window.innerWidth;
      
      // Mobile breakpoint - only change for mobile
      if (width < 640) {
        setRadius(160); // Further optimized for mobile
      } else if (width < 768) {
        setRadius(320); // Small tablet - unchanged
      } else if (width < 1024) {
        setRadius(400); // Tablet - unchanged
      } else {
        setRadius(520); // Desktop - unchanged
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

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
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Mobile-specific card size calculation
  const getCardSize = () => {
    const width = window.innerWidth;
    
    // Mobile breakpoint
    if (width < 640) {
      return 70; // Optimized for mobile screens
    } else if (width < 768) {
      return 140; // Small tablet - unchanged
    } else if (width < 1024) {
      return 180; // Tablet - unchanged
    } else {
      return 220; // Desktop - unchanged
    }
  };

  const getContainerHeight = () => {
    const cardSize = getCardSize();
    const totalHeight = (radius * 2) + cardSize + 120;
    return `${Math.round(totalHeight)}px`;
  };

  const getContainerPadding = () => {
    const cardSize = getCardSize();
    const padding = Math.round(cardSize * 0.7);
    return `${padding}px 0`;
  };

  return (
    <section ref={sectionRef} id="services" className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background Image - Fixed while scrolling */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: 'fixed',
          opacity: 1
        }}
      ></div>
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/85 z-[1]"></div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        <div className={`text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 transition-opacity duration-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#011441] mb-2 sm:mb-3 md:mb-4 transition-opacity duration-800 ${isVisible ? 'animate-fade-in-up-delay-1' : 'opacity-0'}`}>
            Our Expertise
          </h2>
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0 transition-opacity duration-800 ${isVisible ? 'animate-fade-in-up-delay-2' : 'opacity-0'}`}>
            At NirmalTax.com, we offer end-to-end financial and compliance services under one roof
          </p>
        </div>

        <div 
          className="relative w-full max-w-6xl mx-auto overflow-visible" 
          style={{ 
            minHeight: getContainerHeight(), 
            padding: getContainerPadding()
          }}
        >
          {/* Center Badge - Static */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.8s ease-out 0.5s'
            }}
          >
            <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-full w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center shadow-xl border-2 border-white/20">
              <div className="rounded-full w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center mb-1 overflow-hidden bg-white/10 backdrop-blur-sm">
                <img 
                  src={logoImage} 
                  alt="NirmalTax Logo" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Rotating Container */}
          <div
            className="absolute inset-0"
            style={{
              animation: isVisible ? 'rotateCircle 60s linear infinite' : 'none',
              transformOrigin: 'center center'
            }}
          >
            {/* Spoke lines - visible on all devices including mobile */}
            {services.map((_, index) => {
              const totalCards = services.length;
              const angle = (index * 360) / totalCards - 90;
              
              const badgeSize = radius < 300 ? 56 : 128; // Adjusted for mobile
              const badgeRadius = badgeSize / 2;
              const lineLength = radius - badgeRadius;
              
              return (
                <div
                  key={`line-${index}`}
                  className="absolute left-1/2 top-1/2 pointer-events-none"
                  style={{
                    width: `${lineLength}px`,
                    height: '1px',
                    backgroundColor: '#6958c2',
                    opacity: 0.2,
                    transformOrigin: '0 50%',
                    transform: `rotate(${angle}deg) translateX(${badgeRadius}px)`,
                    zIndex: 0
                  }}
                />
              );
            })}
            
            {services.map((service, index) => {
            const cardDelay = index * 0.15;
            const iconDelay = cardDelay + 0.2;
            
            const totalCards = services.length;
            const angle = (index * 360) / totalCards - 90;
            const radian = (angle * Math.PI) / 180;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;
            const cardSize = getCardSize();
            const cardMargin = cardSize / 2;
            
            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${cardSize}px`,
                  height: `${cardSize}px`,
                  marginLeft: `-${cardMargin}px`,
                  marginTop: `-${cardMargin}px`,
                  transform: isVisible 
                    ? `translate(${x}px, ${y}px) scale(1)`
                    : `translate(${x}px, ${y}px) scale(0.95)`,
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.8s ease-out ${cardDelay}s`,
                  zIndex: 1
                }}
              >
                <div
                  className="bg-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-[#6958c2]/30 flex flex-col items-center justify-center w-full h-full"
                  style={{
                    animation: isVisible ? 'counterRotate 60s linear infinite' : 'none',
                    transformOrigin: 'center center'
                  }}
                  onMouseEnter={(e) => {
                    if (window.matchMedia('(hover: hover)').matches) {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.parentElement!.style.zIndex = '10';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (window.matchMedia('(hover: hover)').matches) {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.parentElement!.style.zIndex = '1';
                    }
                  }}
                >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 to-[#011441]/0 group-hover:from-[#6958c2]/5 group-hover:to-[#011441]/5 transition-all duration-500 rounded-full`}></div>
                
                {/* Content */}
                <div 
                  className="relative z-10 text-center flex flex-col items-center justify-center h-full"
                  style={{
                    padding: cardSize < 100 ? '4px 3px' : cardSize < 150 ? '10px 8px' : cardSize < 200 ? '12px 10px' : '16px 12px'
                  }}
                >
                  <div 
                    className={`bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl p-1`}
                    style={{
                      width: cardSize < 100 ? '28px' : cardSize < 150 ? '48px' : cardSize < 200 ? '56px' : '64px',
                      height: cardSize < 100 ? '28px' : cardSize < 150 ? '48px' : cardSize < 200 ? '56px' : '64px',
                      marginBottom: cardSize < 100 ? '3px' : cardSize < 150 ? '8px' : cardSize < 200 ? '10px' : '12px',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'scale(1)' : 'scale(0.5)',
                      transition: `all 0.6s ease-out ${iconDelay}s`
                    }}
                  >
                    <img 
                      src={service.icon} 
                      alt={service.title} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <h3 
                    className="font-bold text-[#011441] group-hover:text-[#6958c2] transition-colors duration-300 leading-tight"
                    style={{
                      fontSize: cardSize < 100 ? '6px' : cardSize < 150 ? '10px' : cardSize < 200 ? '11px' : '13px',
                      marginBottom: cardSize < 100 ? '1px' : cardSize < 150 ? '4px' : cardSize < 200 ? '5px' : '6px',
                      lineHeight: '1.1'
                    }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="hidden sm:block text-gray-600 leading-tight group-hover:text-gray-700 transition-colors duration-300 line-clamp-3"
                    style={{
                      fontSize: cardSize < 100 ? '7px' : cardSize < 150 ? '8px' : cardSize < 200 ? '9px' : '10px',
                      lineHeight: '1.3'
                    }}
                  >
                    {service.description}
                  </p>
                </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}