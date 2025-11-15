import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import heroBackgroundImage from '../assets/business-meeting-room-high-rise-office-building.jpg?url';
import backgroundImage from '../assets/tochscreen-documents-with-charts.jpg?url';
import gstBackgroundImage from '../assets/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working.jpg?url';
import chooseusBackgroundImage from '../assets/chooseus.jpg?url';
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
import checkIcon from '../assets/check.png';
import rocketIcon from '../assets/opportunity.png';
import missionIcon from '../assets/target.png';
import purposeIcon from '../assets/medal.png';

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

interface ServiceCategory {
  title: string;
  description: string;
  icon: string;
  services: ServiceItem[];
}

export default function ServicesPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [introPillarsVisible, setIntroPillarsVisible] = useState<boolean[]>(new Array(4).fill(false));
  const [categoriesVisible, setCategoriesVisible] = useState<boolean[]>([]);
  const [categoryHeadersVisible, setCategoryHeadersVisible] = useState<boolean[]>([]);
  const [serviceCardsVisible, setServiceCardsVisible] = useState<{[key: string]: boolean[]}>({});
  const [whyChooseVisible, setWhyChooseVisible] = useState(false);
  const [whyChooseCardsVisible, setWhyChooseCardsVisible] = useState<boolean[]>(new Array(5).fill(false));
  const [visionVisible, setVisionVisible] = useState(false);
  const [visionCardsVisible, setVisionCardsVisible] = useState<boolean[]>(new Array(3).fill(false));
  const [expandedCategories, setExpandedCategories] = useState<{[key: number]: boolean}>({});
  
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introPillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const categoryRefs = useRef<(HTMLElement | null)[]>([]);
  const categoryHeaderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const serviceCardRefs = useRef<{[key: string]: (HTMLDivElement | null)[]}>({});
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const whyChooseCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visionRef = useRef<HTMLDivElement>(null);
  const visionCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleCategory = (categoryIndex: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex]
    }));
  };

  const serviceCategories: ServiceCategory[] = [
    {
      title: 'Taxation & Audit Services',
      description: 'Our taxation and audit solutions help you stay compliant while optimizing your financial outcomes. With deep domain expertise and updated knowledge of tax laws, we ensure accuracy and peace of mind.',
      icon: accountantIcon,
      services: [
        {
          title: 'Income Tax Return (ITR) Filing',
          description: 'End-to-end filing for individuals, professionals, HUFs, and businesses with correct deductions, documentation support, and timely submission.',
          icon: accountantIcon
        },
        {
          title: 'Tax Audit & Statutory Audit',
          description: 'Comprehensive audits conducted as per Income Tax Act and Companies Act, ensuring accuracy, financial transparency, and regulatory compliance.',
          icon: shieldIcon
        },
        {
          title: 'Income Tax Appeals',
          description: 'Expert representation for assessment, re-assessment, and appeal cases with strategic guidance and documentation support.',
          icon: trendIcon
        },
        {
          title: 'Income Tax & GST Litigation',
          description: 'Handling notices, disputes, and litigation matters with clarity, strong representation, and detailed follow-ups.',
          icon: trendIcon
        },
        {
          title: 'TDS/TCS Compliance & Return Filing',
          description: 'Accurate preparation and filing of TDS/TCS returns, reconciliation, and correction of errors to avoid penalties.',
          icon: billIcon
        }
      ]
    },
    {
      title: 'GST & Business Compliance',
      description: 'We provide complete GST solutions and business compliance services for smooth, stress-free operations.',
      icon: moneyIcon,
      services: [
        {
          title: 'GST Registration & Return Filing',
          description: 'Fast, error-free GST registration and timely monthly/quarterly return filing under all schemes.',
          icon: moneyIcon
        },
        {
          title: 'GST Advisory & Assessment Handling',
          description: 'Professional support in GST queries, notices, audits, and compliance requirements.',
          icon: analyticsIcon
        },
        {
          title: 'Company Audit & ROC Compliance',
          description: 'Annual filings, statutory updates, board resolutions, and ROC documentation handled with precision.',
          icon: analyticsIcon
        },
        {
          title: 'PAN & TAN Application Services',
          description: 'Quick and reliable processing of PAN and TAN applications for individuals and businesses.',
          icon: billIcon
        }
      ]
    },
    {
      title: 'Business Setup & Support Services',
      description: 'Start and grow your business with expert assistance at every step.',
      icon: establishmentIcon,
      services: [
        {
          title: 'Company, LLP & Partnership Firm Registration',
          description: 'Consultation, documentation, and complete setup support for new businesses.',
          icon: establishmentIcon
        },
        {
          title: 'Startup Registration & Compliance',
          description: 'Support for DPIIT Startup India registration along with compliance and advisory.',
          icon: businessmanIcon
        },
        {
          title: 'Digital Signature Certificate (DSC)',
          description: 'Issuance and renewal of Class-3 Digital Signatures for individuals, directors, and businesses.',
          icon: shieldIcon
        },
        {
          title: 'MSME Registration, Trade License & Other Approvals',
          description: 'Guidance and processing of business licenses for faster establishment and operation.',
          icon: establishmentIcon
        }
      ]
    },
    {
      title: 'Payroll, HR & Labour Law Compliance',
      description: 'We manage payroll and labour compliance so you can focus fully on your workforce and business goals.',
      icon: handshakeIcon,
      services: [
        {
          title: 'PF, ESIC & Professional Tax Registration',
          description: 'Accurate registration and documentation for new businesses and employees.',
          icon: handshakeIcon
        },
        {
          title: 'Monthly ESIC & PF Return Filing',
          description: 'Timely preparation, calculation, and e-filing of returns for error-free compliance.',
          icon: budgetIcon
        },
        {
          title: 'Salary Structure & Payroll Management',
          description: 'End-to-end payroll solutions ensuring accuracy, confidentiality, and timely disbursement.',
          icon: budgetIcon
        }
      ]
    },
    {
      title: 'Finance, Advisory & Business Growth Support',
      description: 'We help businesses take informed decisions with clear financial insights and structured documentation.',
      icon: reportIcon,
      services: [
        {
          title: 'Project Report Preparation for Bank Loans',
          description: 'Professional project reports, CMA data, profitability analysis, and financial forecasting for securing business loans.',
          icon: reportIcon
        },
        {
          title: 'Business Advisory & Financial Planning',
          description: 'Data-driven guidance to improve business performance, tax efficiency, and long-term financial health.',
          icon: analyticsIcon
        }
      ]
    }
  ];

  const whyChoosePoints = [
    {
      title: 'Pure Professionalism',
      description: 'Every service is delivered with honesty, integrity, and ethical standards.',
      icon: shieldIcon
    },
    {
      title: 'Clarity & Transparency',
      description: 'We simplify compliance and explain every process clearly — no confusion, no hidden terms.',
      icon: checkIcon
    },
    {
      title: 'Affordable Excellence',
      description: 'High-quality professional services at fair and competitive pricing.',
      icon: moneyIcon
    },
    {
      title: 'Time-Bound Commitment',
      description: 'We respect your deadlines — accuracy and punctuality are guaranteed.',
      icon: checkIcon
    },
    {
      title: 'Trusted Expertise',
      description: 'Led by CA Nirmal Kumar, we combine experience with modern tax intelligence and technology-driven solutions.',
      icon: analyticsIcon
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === heroRef.current) {
              setHeroVisible(true);
            } else if (entry.target === introRef.current) {
              setIntroVisible(true);
            } else if (entry.target === whyChooseRef.current) {
              setWhyChooseVisible(true);
            } else if (entry.target === visionRef.current) {
              setVisionVisible(true);
            } else {
              // Check if it's an intro pillar
              const pillarIndex = introPillarRefs.current.findIndex(ref => ref === entry.target);
              if (pillarIndex !== -1) {
                setIntroPillarsVisible(prev => {
                  const newState = [...prev];
                  newState[pillarIndex] = true;
                  return newState;
                });
              }
              
              // Check if it's a category section
              const categoryIndex = categoryRefs.current.findIndex(ref => ref === entry.target);
              if (categoryIndex !== -1) {
                setCategoriesVisible(prev => {
                  const newState = [...prev];
                  newState[categoryIndex] = true;
                  return newState;
                });
              }
              
              // Check if it's a category header
              const categoryHeaderIndex = categoryHeaderRefs.current.findIndex(ref => ref === entry.target);
              if (categoryHeaderIndex !== -1) {
                setCategoryHeadersVisible(prev => {
                  const newState = [...prev];
                  newState[categoryHeaderIndex] = true;
                  return newState;
                });
              }
              
              // Check if it's a service card
              Object.keys(serviceCardRefs.current).forEach(categoryKey => {
                const cardIndex = serviceCardRefs.current[categoryKey].findIndex(ref => ref === entry.target);
                if (cardIndex !== -1) {
                  setServiceCardsVisible(prev => {
                    const newState = { ...prev };
                    if (!newState[categoryKey]) {
                      newState[categoryKey] = [];
                    }
                    newState[categoryKey] = [...newState[categoryKey]];
                    newState[categoryKey][cardIndex] = true;
                    return newState;
                  });
                }
              });
              
              // Check if it's a why choose card
              const whyChooseIndex = whyChooseCardRefs.current.findIndex(ref => ref === entry.target);
              if (whyChooseIndex !== -1) {
                setWhyChooseCardsVisible(prev => {
                  const newState = [...prev];
                  newState[whyChooseIndex] = true;
                  return newState;
                });
              }
              
              // Check if it's a vision card
              const visionIndex = visionCardRefs.current.findIndex(ref => ref === entry.target);
              if (visionIndex !== -1) {
                setVisionCardsVisible(prev => {
                  const newState = [...prev];
                  newState[visionIndex] = true;
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

    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      if (heroRef.current) observer.observe(heroRef.current);
      if (introRef.current) observer.observe(introRef.current);
      if (whyChooseRef.current) observer.observe(whyChooseRef.current);
      if (visionRef.current) observer.observe(visionRef.current);
      
      introPillarRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
      });
      
      categoryRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
      });
      
      categoryHeaderRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
      });
      
      whyChooseCardRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
      });
      
      visionCardRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
      });
      
      Object.values(serviceCardRefs.current).forEach(cardRefs => {
        cardRefs.forEach(ref => {
          if (ref) observer.observe(ref);
        });
      });
    }, 100);

    // Initialize states
    setCategoriesVisible(new Array(serviceCategories.length).fill(false));
    setCategoryHeadersVisible(new Array(serviceCategories.length).fill(false));
    setServiceCardsVisible({});

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Header Section */}
      <section ref={heroRef} id="services-hero" className="relative pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 overflow-hidden">
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
            <div className={heroVisible ? 'animate-fade-in-up' : 'opacity-0'}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                Our Services
              </h1>
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white drop-shadow-md ${heroVisible ? 'animate-fade-in-up-delay-1' : 'opacity-0'}`}>
                Comprehensive Financial & Compliance Solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section - Redesigned */}
      <section ref={introRef} className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${introVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6958c2]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#011441]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <div className="inline-block mb-4 sm:mb-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#6958c2] to-[#011441] rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#011441]">
                    Established Excellence
                  </h2>
                  <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#6958c2] to-[#011441] rounded-full"></div>
                </div>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Established in <strong className="text-[#6958c2] font-semibold">August 2024</strong>, Nirmal Kumar & Co. has grown into a trusted financial partner for individuals, entrepreneurs, and businesses across Kolkata and beyond.
              </p>
            </div>

            {/* Service Pillars */}
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#011441] mb-6 sm:mb-8">
                We Continue to Deliver Services That Are:
              </h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              <div
                ref={(el) => { introPillarRefs.current[0] = el; }}
                className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${introPillarsVisible[0] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.1s' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 to-[#011441]/0 group-hover:from-[#6958c2]/8 group-hover:to-[#011441]/5 transition-all duration-700"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all duration-500">
                    <span className="text-white text-xl sm:text-2xl font-bold">✔</span>
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#011441] mb-2 group-hover:text-[#6958c2] transition-colors duration-300">
                    Clear and Transparent
                  </h4>
                </div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
              </div>

              <div
                ref={(el) => { introPillarRefs.current[1] = el; }}
                className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${introPillarsVisible[1] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.2s' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 to-[#011441]/0 group-hover:from-[#6958c2]/8 group-hover:to-[#011441]/5 transition-all duration-700"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all duration-500">
                    <span className="text-white text-xl sm:text-2xl font-bold">✔</span>
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#011441] mb-2 group-hover:text-[#6958c2] transition-colors duration-300">
                    Ethical and Law-Compliant
                  </h4>
                </div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
              </div>

              <div
                ref={(el) => { introPillarRefs.current[2] = el; }}
                className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${introPillarsVisible[2] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.3s' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 to-[#011441]/0 group-hover:from-[#6958c2]/8 group-hover:to-[#011441]/5 transition-all duration-700"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all duration-500">
                    <span className="text-white text-xl sm:text-2xl font-bold">✔</span>
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#011441] mb-2 group-hover:text-[#6958c2] transition-colors duration-300">
                    Timely and Efficient
                  </h4>
                </div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
              </div>

              <div
                ref={(el) => { introPillarRefs.current[3] = el; }}
                className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${introPillarsVisible[3] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.4s' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 to-[#011441]/0 group-hover:from-[#6958c2]/8 group-hover:to-[#011441]/5 transition-all duration-700"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all duration-500">
                    <span className="text-white text-xl sm:text-2xl font-bold">✔</span>
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#011441] mb-2 group-hover:text-[#6958c2] transition-colors duration-300">
                    Affordable and Reliable
                  </h4>
                </div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category, categoryIndex) => (
        <section
          key={categoryIndex}
          ref={(el) => {
            categoryRefs.current[categoryIndex] = el;
          }}
          className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${
            categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          } ${categoriesVisible[categoryIndex] ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          {/* Special gradient background for Taxation & Audit Services */}
          {categoryIndex === 0 && (
            <>
              {/* Base gradient background */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 25%, #f0f4ff 50%, #ffffff 75%, #f8f9ff 100%)'
                }}
              ></div>
              
              {/* Vibrant gradient overlay with brand colors */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(105, 88, 194, 0.12) 0%, rgba(255, 255, 255, 0.98) 15%, rgba(1, 20, 65, 0.10) 30%, rgba(255, 255, 255, 0.98) 45%, rgba(105, 88, 194, 0.15) 60%, rgba(255, 255, 255, 0.98) 75%, rgba(1, 20, 65, 0.12) 90%, rgba(105, 88, 194, 0.10) 100%)'
                }}
              ></div>
              
              {/* Radial gradient accents */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'radial-gradient(ellipse at top right, rgba(105, 88, 194, 0.15), transparent 50%), radial-gradient(ellipse at bottom left, rgba(1, 20, 65, 0.15), transparent 50%)'
                }}
              ></div>
              
              {/* Decorative gradient orbs matching hero section style */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#6958c2]/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#011441]/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#6958c2]/12 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#011441]/15 rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-[#6958c2]/10 rounded-full blur-3xl"></div>
              </div>
            </>
          )}
          
          {/* Special background for GST & Business Compliance */}
          {categoryIndex === 1 && (
            <>
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${gstBackgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
              {/* Simple white overlay - no gradient, just high opacity for light visibility */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'rgba(255, 255, 255, 0.88)'
                }}
              ></div>
            </>
          )}
          
          {/* Special background gradient for Business Setup & Support Services */}
          {categoryIndex === 2 && (
            <>
              {/* Base gradient background */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 20%, #f8f9ff 40%, #ffffff 60%, #f0f4ff 80%, #ffffff 100%)'
                }}
              ></div>
              
              {/* Vibrant gradient overlay with brand colors */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(105, 88, 194, 0.10) 0%, rgba(255, 255, 255, 0.95) 20%, rgba(1, 20, 65, 0.08) 40%, rgba(255, 255, 255, 0.96) 60%, rgba(105, 88, 194, 0.12) 80%, rgba(1, 20, 65, 0.10) 100%)'
                }}
              ></div>
              
              {/* Radial gradient accents */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'radial-gradient(ellipse at top left, rgba(105, 88, 194, 0.12), transparent 60%), radial-gradient(ellipse at bottom right, rgba(1, 20, 65, 0.12), transparent 60%)'
                }}
              ></div>
              
              {/* Decorative gradient orbs */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#6958c2]/18 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#011441]/18 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#6958c2]/10 rounded-full blur-3xl"></div>
              </div>
            </>
          )}
          
          {/* Special background for Finance, Advisory & Business Growth Support */}
          {categoryIndex === 4 && (
            <>
              {/* Base gradient background */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 20%, #f8f9ff 40%, #ffffff 60%, #f0f4ff 80%, #ffffff 100%)'
                }}
              ></div>
              
              {/* Vibrant gradient overlay with brand colors */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(105, 88, 194, 0.12) 0%, rgba(255, 255, 255, 0.95) 20%, rgba(1, 20, 65, 0.10) 40%, rgba(255, 255, 255, 0.96) 60%, rgba(105, 88, 194, 0.15) 80%, rgba(1, 20, 65, 0.12) 100%)'
                }}
              ></div>
              
              {/* Radial gradient accents */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'radial-gradient(ellipse at top right, rgba(105, 88, 194, 0.15), transparent 60%), radial-gradient(ellipse at bottom left, rgba(1, 20, 65, 0.15), transparent 60%)'
                }}
              ></div>
              
              {/* Decorative gradient orbs */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#6958c2]/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#011441]/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#6958c2]/12 rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[#011441]/15 rounded-full blur-3xl"></div>
              </div>
            </>
          )}
          
          {/* Background Image for other alternating sections */}
          {categoryIndex % 2 === 1 && categoryIndex !== 1 && categoryIndex !== 4 && (
            <>
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.90) 50%, rgba(255, 255, 255, 0.85) 100%)'
                }}
              ></div>
            </>
          )}

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Category Header */}
              <div ref={(el) => { categoryHeaderRefs.current[categoryIndex] = el; }} className={`text-center mb-10 sm:mb-12 md:mb-16 ${categoryHeadersVisible[categoryIndex] ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-xl">
                    <img src={category.icon} alt={category.title} className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain" />
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#011441] mb-3 sm:mb-4">
                  {category.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Services Grid - Special layouts */}
              {categoryIndex === 0 ? (
                <div className="space-y-6 sm:space-y-8">
                  {/* First Row: 3 Cards - Always show all 3 cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {category.services.slice(0, 3).map((service, serviceIndex) => {
                      const cardKey = `${categoryIndex}-${serviceIndex}`;
                      if (!serviceCardRefs.current[cardKey]) {
                        serviceCardRefs.current[cardKey] = [];
                      }
                      return (
                      <div
                        key={serviceIndex}
                        ref={(el) => { serviceCardRefs.current[cardKey][0] = el; }}
                        className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${serviceCardsVisible[cardKey]?.[0] ? 'animate-scale-in' : 'opacity-0'}`}
                        style={{ animationDelay: `${serviceIndex * 0.1}s` }}
                      >
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 via-[#011441]/0 to-[#6958c2]/0 group-hover:from-[#6958c2]/5 group-hover:via-[#011441]/3 group-hover:to-[#6958c2]/5 transition-all duration-700"></div>
                        
                        {/* Top Border with Animation */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                        
                        <div className="relative z-10">
                          {/* Icon */}
                          <div className="mb-4 sm:mb-5">
                            <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-[#6958c2]/40 group-hover:scale-110 transition-all duration-500 w-fit">
                              <img src={service.icon} alt={service.title} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                            {service.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                            {service.description}
                          </p>
                        </div>
                        
                        {/* Bottom Accent on Hover */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                      </div>
                      );
                    })}
                  </div>

                  {/* View More Button - Mobile Only, shown when collapsed */}
                  {category.services.length > 2 && !expandedCategories[categoryIndex] && (
                    <div className="flex justify-center md:hidden mt-4">
                      <button
                        onClick={() => toggleCategory(categoryIndex)}
                        className="px-6 py-3 bg-gradient-to-r from-[#6958c2] to-[#011441] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        View More
                      </button>
                    </div>
                  )}

                  {/* Second Row: 2 Cards Centered - Hidden on mobile if not expanded, always visible on desktop */}
                  <div className={`${expandedCategories[categoryIndex] ? 'flex' : 'hidden'} md:flex justify-center`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl">
                      {category.services.slice(3, 5).map((service, serviceIndex) => {
                        const cardKey = `${categoryIndex}-${serviceIndex + 3}`;
                        if (!serviceCardRefs.current[cardKey]) {
                          serviceCardRefs.current[cardKey] = [];
                        }
                        return (
                        <div
                          key={serviceIndex + 3}
                          ref={(el) => { serviceCardRefs.current[cardKey][0] = el; }}
                          className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${serviceCardsVisible[cardKey]?.[0] ? 'animate-scale-in' : 'opacity-0'}`}
                          style={{ animationDelay: `${(serviceIndex + 3) * 0.1}s` }}
                        >
                          {/* Animated Background Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 via-[#011441]/0 to-[#6958c2]/0 group-hover:from-[#6958c2]/5 group-hover:via-[#011441]/3 group-hover:to-[#6958c2]/5 transition-all duration-700"></div>
                          
                          {/* Top Border with Animation */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                          
                          <div className="relative z-10">
                            {/* Icon */}
                            <div className="mb-4 sm:mb-5">
                              <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-[#6958c2]/40 group-hover:scale-110 transition-all duration-500 w-fit">
                                <img src={service.icon} alt={service.title} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                              </div>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                              {service.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                              {service.description}
                            </p>
                          </div>
                          
                          {/* Bottom Accent on Hover */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                        </div>
                      );
                      })}
                    </div>
                  </div>

                  {/* View Less Button - Mobile Only, shown when expanded, below all cards */}
                  {category.services.length > 2 && expandedCategories[categoryIndex] && (
                    <div className="flex justify-center md:hidden mt-6">
                      <button
                        onClick={() => toggleCategory(categoryIndex)}
                        className="px-6 py-3 bg-gradient-to-r from-[#6958c2] to-[#011441] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        View Less
                      </button>
                    </div>
                  )}
                </div>
              ) : categoryIndex === 1 ? (
                <>
                  {/* Special layout for GST & Business Compliance - 2x2 Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                  {category.services.map((service, serviceIndex) => {
                    // On mobile, show only first 2 services if not expanded
                    const isVisible = expandedCategories[categoryIndex] || serviceIndex < 2;
                    const cardKey = `${categoryIndex}-${serviceIndex}`;
                    if (!serviceCardRefs.current[cardKey]) {
                      serviceCardRefs.current[cardKey] = [];
                    }
                    return (
                    <div
                      key={serviceIndex}
                      ref={(el) => { serviceCardRefs.current[cardKey][0] = el; }}
                      className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${serviceCardsVisible[cardKey]?.[0] ? 'animate-scale-in' : 'opacity-0'} ${isVisible ? 'block' : 'hidden md:block'}`}
                      style={{ animationDelay: `${serviceIndex * 0.1}s` }}
                    >
                      {/* Animated Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 via-[#011441]/0 to-[#6958c2]/0 group-hover:from-[#6958c2]/5 group-hover:via-[#011441]/3 group-hover:to-[#6958c2]/5 transition-all duration-700"></div>
                      
                      {/* Top Border with Animation */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                      
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="mb-4 sm:mb-5">
                          <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-[#6958c2]/40 group-hover:scale-110 transition-all duration-500 w-fit">
                            <img src={service.icon} alt={service.title} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                          {service.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                          {service.description}
                        </p>
                      </div>
                      
                      {/* Bottom Accent on Hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                    </div>
                  );
                  })}
                  </div>
                  
                  {/* View More/Less Button - Mobile Only */}
                  {category.services.length > 2 && (
                    <div className="flex justify-center md:hidden mt-6">
                      <button
                        onClick={() => toggleCategory(categoryIndex)}
                        className="px-6 py-3 bg-gradient-to-r from-[#6958c2] to-[#011441] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        {expandedCategories[categoryIndex] ? 'View Less' : 'View More'}
                      </button>
                    </div>
                  )}
                </>
              ) : categoryIndex === 2 ? (
                <>
                  {/* Special layout for Business Setup & Support Services - 2x2 Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    {category.services.map((service, serviceIndex) => {
                      // On mobile, show only first 2 services if not expanded
                      const isVisible = expandedCategories[categoryIndex] || serviceIndex < 2;
                      return (
                      <div
                        key={serviceIndex}
                        className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${isVisible ? 'block' : 'hidden md:block'}`}
                      >
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 via-[#011441]/0 to-[#6958c2]/0 group-hover:from-[#6958c2]/5 group-hover:via-[#011441]/3 group-hover:to-[#6958c2]/5 transition-all duration-700"></div>
                        
                        {/* Top Border with Animation */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                        
                        <div className="relative z-10">
                          {/* Icon */}
                          <div className="mb-4 sm:mb-5">
                            <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-[#6958c2]/40 group-hover:scale-110 transition-all duration-500 w-fit">
                              <img src={service.icon} alt={service.title} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                            {service.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                            {service.description}
                          </p>
                        </div>
                        
                        {/* Bottom Accent on Hover */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                      </div>
                      );
                    })}
                  </div>
                  
                  {/* View More/Less Button - Mobile Only */}
                  {category.services.length > 2 && (
                    <div className="flex justify-center md:hidden mt-6">
                      <button
                        onClick={() => toggleCategory(categoryIndex)}
                        className="px-6 py-3 bg-gradient-to-r from-[#6958c2] to-[#011441] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        {expandedCategories[categoryIndex] ? 'View Less' : 'View More'}
                      </button>
                    </div>
                  )}
                </>
              ) : categoryIndex === 4 ? (
                <>
                  {/* Special layout for Finance, Advisory & Business Growth Support - 2 cards side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                    {category.services.map((service, serviceIndex) => {
                      // On mobile, show only first 2 services if not expanded (this category has 2 services, so button won't show)
                      const isVisible = expandedCategories[categoryIndex] || serviceIndex < 2;
                      return (
                      <div
                        key={serviceIndex}
                        className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${isVisible ? 'block' : 'hidden md:block'}`}
                      >
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 via-[#011441]/0 to-[#6958c2]/0 group-hover:from-[#6958c2]/5 group-hover:via-[#011441]/3 group-hover:to-[#6958c2]/5 transition-all duration-700"></div>
                        
                        {/* Top Border with Animation */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                          {/* Icon */}
                          <div className="mb-4 sm:mb-5">
                            <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-[#6958c2]/40 group-hover:scale-110 transition-all duration-500 w-fit">
                              <img src={service.icon} alt={service.title} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                            {service.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 flex-grow">
                            {service.description}
                          </p>
                        </div>
                        
                        {/* Bottom Accent on Hover */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                      </div>
                      );
                    })}
                  </div>
                  
                  {/* View More/Less Button - Mobile Only */}
                  {category.services.length > 2 && (
                    <div className="flex justify-center md:hidden mt-6">
                      <button
                        onClick={() => toggleCategory(categoryIndex)}
                        className="px-6 py-3 bg-gradient-to-r from-[#6958c2] to-[#011441] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        {expandedCategories[categoryIndex] ? 'View Less' : 'View More'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {category.services.map((service, serviceIndex) => {
                      // On mobile, show only first 2 services if not expanded
                      const isVisible = expandedCategories[categoryIndex] || serviceIndex < 2;
                      const cardKey = `${categoryIndex}-${serviceIndex}`;
                      if (!serviceCardRefs.current[cardKey]) {
                        serviceCardRefs.current[cardKey] = [];
                      }
                      return (
                      <div
                        key={serviceIndex}
                        ref={(el) => { serviceCardRefs.current[cardKey][0] = el; }}
                        className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${serviceCardsVisible[cardKey]?.[0] ? 'animate-scale-in' : 'opacity-0'} ${isVisible ? 'block' : 'hidden md:block'}`}
                        style={{ animationDelay: `${serviceIndex * 0.1}s` }}
                      >
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 via-[#011441]/0 to-[#6958c2]/0 group-hover:from-[#6958c2]/5 group-hover:via-[#011441]/3 group-hover:to-[#6958c2]/5 transition-all duration-700"></div>
                        
                        {/* Top Border with Animation */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                        
                        <div className="relative z-10">
                          {/* Icon */}
                          <div className="mb-4 sm:mb-5">
                            <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-[#6958c2]/40 group-hover:scale-110 transition-all duration-500 w-fit">
                              <img src={service.icon} alt={service.title} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                            {service.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                            {service.description}
                          </p>
                        </div>
                        
                        {/* Bottom Accent on Hover */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                      </div>
                    );
                    })}
                  </div>
                  
                  {/* View More/Less Button - Mobile Only */}
                  {category.services.length > 2 && (
                    <div className="flex justify-center md:hidden mt-6">
                      <button
                        onClick={() => toggleCategory(categoryIndex)}
                        className="px-6 py-3 bg-gradient-to-r from-[#6958c2] to-[#011441] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        {expandedCategories[categoryIndex] ? 'View Less' : 'View More'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Why Choose Section */}
      <section ref={whyChooseRef} className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${whyChooseVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${chooseusBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Overlay - adjusted opacity so image is slightly visible */}
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
            background: 'linear-gradient(135deg, rgba(105, 88, 194, 0.06) 0%, rgba(1, 20, 65, 0.08) 50%, rgba(105, 88, 194, 0.06) 100%)'
          }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#011441] mb-4 sm:mb-6">
                Why Choose NirmalTax
              </h2>
            </div>

            {/* Infinite Sliding Carousel */}
            <div className="overflow-hidden">
              <div className="flex animate-infinite-slide">
                {/* First set of cards */}
                {whyChoosePoints.map((point, index) => (
                  <div
                    key={`first-${index}`}
                    ref={(el) => { if (index < 5) whyChooseCardRefs.current[index] = el; }}
                    className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/25 transition-all duration-500 hover:-translate-y-3 overflow-hidden flex-shrink-0 mx-3 ${whyChooseCardsVisible[index] ? 'animate-scale-in' : 'opacity-0'}`}
                    style={{ width: '320px', minWidth: '280px', animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 via-[#011441]/0 to-[#6958c2]/0 group-hover:from-[#6958c2]/8 group-hover:via-[#011441]/5 group-hover:to-[#6958c2]/8 transition-all duration-700"></div>
                    
                    {/* Top Border with Animation */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                    
                    <div className="relative z-10 flex flex-col items-center text-center h-full">
                      {/* Icon Container */}
                      <div className="mb-4 sm:mb-5">
                        <div className="relative">
                          <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-2xl group-hover:shadow-[#6958c2]/40 group-hover:scale-110 transition-all duration-500">
                            <img src={point.icon} alt={point.title} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain" />
                          </div>
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                        {point.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 flex-grow">
                        {point.description}
                      </p>
                    </div>
                    
                    {/* Bottom Accent on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {whyChoosePoints.map((point, index) => (
                  <div
                    key={`second-${index}`}
                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border-2 border-gray-100 hover:border-[#6958c2]/50 hover:shadow-2xl hover:shadow-[#6958c2]/25 transition-all duration-500 hover:-translate-y-3 overflow-hidden flex-shrink-0 mx-3"
                    style={{ width: '320px', minWidth: '280px' }}
                  >
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 via-[#011441]/0 to-[#6958c2]/0 group-hover:from-[#6958c2]/8 group-hover:via-[#011441]/5 group-hover:to-[#6958c2]/8 transition-all duration-700"></div>
                    
                    {/* Top Border with Animation */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                    
                    <div className="relative z-10 flex flex-col items-center text-center h-full">
                      {/* Icon Container */}
                      <div className="mb-4 sm:mb-5">
                        <div className="relative">
                          <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-2xl group-hover:shadow-[#6958c2]/40 group-hover:scale-110 transition-all duration-500">
                            <img src={point.icon} alt={point.title} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain" />
                          </div>
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                        {point.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 flex-grow">
                        {point.description}
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
      </section>

      {/* Vision, Mission & Motto Section */}
      <section ref={visionRef} className={`py-12 sm:py-16 md:py-20 bg-white ${visionVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#011441] mb-4 sm:mb-6">
                Our Vision, Mission & Motto
              </h2>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {/* Vision Card */}
              <div
                ref={(el) => { visionCardRefs.current[0] = el; }}
                className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border-2 border-[#6958c2]/20 hover:border-[#6958c2]/40 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${visionCardsVisible[0] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.1s' }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] to-[#011441]"></div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 shadow-xl group-hover:scale-110 transition-all duration-500">
                    <img src={rocketIcon} alt="Vision" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                    Our Vision
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                    "To build India's most trusted and transparent financial service brand — where clarity meets confidence."
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div
                ref={(el) => { visionCardRefs.current[1] = el; }}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-gray-100 hover:border-[#6958c2]/30 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${visionCardsVisible[1] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.2s' }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2]"></div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 shadow-xl group-hover:scale-110 transition-all duration-500">
                    <img src={missionIcon} alt="Mission" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                    Our Mission
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                    "To make taxation, audit, and compliance services ethical, simple, and accessible through technology, expertise, and client-first service."
                  </p>
                </div>
              </div>

              {/* Motto Card */}
              <div
                ref={(el) => { visionCardRefs.current[2] = el; }}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-gray-100 hover:border-[#6958c2]/30 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${visionCardsVisible[2] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.3s' }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441]"></div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 shadow-xl group-hover:scale-110 transition-all duration-500">
                    <img src={purposeIcon} alt="Motto" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#011441] mb-3 sm:mb-4 group-hover:text-[#6958c2] transition-colors duration-300">
                    Our Motto
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                    "Pure in Purpose. Precise in Practice. Perfect in Performance."
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

