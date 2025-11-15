import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import heroBackgroundImage from '../assets/business-meeting-room-high-rise-office-building.jpg?url';
import featuresBackgroundImage from '../assets/team-business-people-stacking-hands.jpg';
import shieldIcon from '../assets/shield.png';
import analyticsIcon from '../assets/analytics.png';
import handshakeIcon from '../assets/handshake.png';
import moneyIcon from '../assets/money.png';
import clockIcon from '../assets/clock.png';
import trendIcon from '../assets/trend.png';
import rocketIcon from '../assets/opportunity.png';
import eyeIcon from '../assets/eye.png';

interface Feature {
  number: string;
  title: string;
  description: string;
  benefits: string[];
  icon: string;
}

export default function FeaturesPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState<boolean[]>([]);
  const [promiseVisible, setPromiseVisible] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featureCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const promiseRef = useRef<HTMLDivElement>(null);

  const features: Feature[] = [
    {
      number: '1',
      title: 'End-to-End Compliance Support',
      description: 'From ITR filing to GST, ROC, payroll, and business registrations, we offer complete financial and regulatory support under one roof. You don\'t need multiple consultants — we take care of everything from start to finish.',
      benefits: ['One-point solution', 'No coordination hassles', 'Seamless workflow and documentation'],
      icon: shieldIcon
    },
    {
      number: '2',
      title: '100% Transparent Service Process',
      description: '"Nirmal" means clear and honest — and that\'s how we work. Every process, document, timeline, and requirement is explained in simple terms so you always stay informed.',
      benefits: ['No hidden conditions', 'No confusing terms', 'Complete clarity at every step'],
      icon: eyeIcon
    },
    {
      number: '3',
      title: 'Dedicated Personal Assistance',
      description: 'Every client gets personal attention. Our team of 10 skilled accountants ensures that your case is handled with care, speed, and accuracy.',
      benefits: ['Faster response time', 'Dedicated expert for each service', 'Personalized guidance'],
      icon: handshakeIcon
    },
    {
      number: '4',
      title: 'Accuracy Powered by Technology',
      description: 'We use modern accounting tools, cloud-based systems, and digital workflows to ensure error-free filings, real-time tracking, secure data handling, and quick turnaround times. Technology + expertise = flawless compliance.',
      benefits: ['Error-free filings', 'Real-time tracking', 'Secure data handling', 'Quick turnaround times'],
      icon: analyticsIcon
    },
    {
      number: '5',
      title: 'Affordable & Value-Driven Pricing',
      description: 'We believe professional services should be honest and accessible. Our pricing is structured to provide maximum value without compromising on quality.',
      benefits: ['Premium service quality', 'Fair and transparent rates', 'Zero hidden charges'],
      icon: moneyIcon
    },
    {
      number: '6',
      title: 'Timely Execution with Zero Delays',
      description: 'At NirmalTax.com, timelines are not guidelines — they are commitments. We prioritize every client\'s deadlines and ensure tasks are completed well before time.',
      benefits: ['No last-minute rush', 'No missed filing dates', 'Proactive reminders and follow-ups'],
      icon: clockIcon
    },
    {
      number: '7',
      title: 'Strong Litigation & Representation Support',
      description: 'We stand by your side during notices, disputes, assessments, and appeals. Your case is handled professionally and confidently.',
      benefits: ['Expert representation', 'Strong legal documentation', 'Transparent communication with authorities'],
      icon: trendIcon
    },
    {
      number: '8',
      title: 'Verified Expertise Led by CA Nirmal Kumar',
      description: 'With proven experience in taxation, audit, finance, and compliance, CA Nirmal Kumar leads the firm with a vision for ethical and high-standard service delivery.',
      benefits: ['Experienced guidance', 'Updated tax knowledge', 'Practical financial insights'],
      icon: rocketIcon
    },
    {
      number: '9',
      title: 'Secure Handling of Your Financial Data',
      description: 'Data privacy is our top priority. All your documents and information are stored securely with restricted access.',
      benefits: ['Encrypted systems', 'Confidential processing', 'Safe digital backups'],
      icon: shieldIcon
    },
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
            } else if (entry.target === promiseRef.current) {
              setPromiseVisible(true);
            } else {
              // Check if it's a feature card
              const index = featureCardRefs.current.findIndex(ref => ref === entry.target);
              if (index !== -1) {
                setFeaturesVisible(prev => {
                  const newState = [...prev];
                  newState[index] = true;
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

    if (heroRef.current) observer.observe(heroRef.current);
    if (introRef.current) observer.observe(introRef.current);
    if (promiseRef.current) observer.observe(promiseRef.current);
    
    featureCardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    // Initialize features visible state
    setFeaturesVisible(new Array(features.length).fill(false));

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Header Section */}
      <section ref={heroRef} id="features-hero" className="relative pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 overflow-hidden">
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
                Features of NirmalTax
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white drop-shadow-md">
                Delivering Purity, Precision & Professional Excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={introRef} className={`py-12 sm:py-20 md:py-24 bg-white ${introVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6 sm:mb-10">
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-1 h-8 sm:h-14 bg-gradient-to-b from-[#6958c2] to-[#011441] rounded-full"></div>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#011441]">
                  Why Choose NirmalTax
                </h2>
                <div className="w-1 h-8 sm:h-14 bg-gradient-to-b from-[#6958c2] to-[#011441] rounded-full"></div>
              </div>
            </div>
            <p className="text-sm sm:text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              At NirmalTax, we don't just provide tax and compliance services — we deliver an experience built on trust, transparency, and consistent quality. Each feature reflects our commitment to simplifying finance while maintaining the highest professional standards.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 md:py-24 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${featuresBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Overlay for better content readability */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.90) 50%, rgba(255, 255, 255, 0.85) 100%)'
          }}
        ></div>
        
        {/* Subtle gradient accent */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(105, 88, 194, 0.05) 0%, rgba(1, 20, 65, 0.08) 50%, rgba(105, 88, 194, 0.05) 100%)'
          }}
        ></div>
        
        {/* Decorative Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#6958c2]/4 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-[#011441]/4 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Features Grid Layout - Compact card design with gradient header */}
            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => { featureCardRefs.current[index] = el; }}
                  className={`${featuresVisible[index] ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 hover:border-[#6958c2]/40 hover:shadow-xl hover:shadow-[#6958c2]/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                    {/* Gradient Header Section */}
                    <div className="relative bg-gradient-to-br from-[#6958c2] to-[#011441] p-4 sm:p-5 pb-6 sm:pb-10">
                      {/* Decorative Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full blur-xl"></div>
                      </div>
                      
                      {/* Icon and Title */}
                      <div className="relative z-10 flex items-start gap-3 sm:gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-md group-hover:bg-white/30 group-hover:scale-105 transition-all duration-500">
                            <img src={feature.icon} alt={feature.title} className="w-6 h-6 sm:w-10 sm:h-10 object-contain" />
                          </div>
                        </div>
                        
                        {/* Title */}
                        <div className="flex-grow pt-0.5 sm:pt-1">
                          <h3 className="text-sm sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-1.5 leading-tight">
                            {feature.title}
                          </h3>
                          <div className="w-12 sm:w-16 h-0.5 bg-white/30 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="relative z-10 flex flex-col flex-grow p-4 sm:p-5 pt-4">
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-5 group-hover:text-gray-700 transition-colors duration-300 line-clamp-3">
                        {feature.description}
                      </p>
                      
                      {/* Benefits List */}
                      <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-200 group-hover:border-[#6958c2]/30 transition-colors duration-300">
                        <p className="text-xs font-semibold text-[#011441] mb-2 sm:mb-2.5 uppercase tracking-wide">Benefits</p>
                        <div className="space-y-1.5 sm:space-y-2">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-start gap-2">
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-[#6958c2] to-[#011441] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                                  <span className="text-white text-[8px] sm:text-[10px] font-bold">✓</span>
                                </div>
                              </div>
                              <span className="text-xs text-gray-700 leading-relaxed flex-grow">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Accent on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The NirmalTax Promise Section */}
      <section ref={promiseRef} className={`py-8 sm:py-12 md:py-16 bg-gradient-to-br from-[#011441] via-[#1a2d5c] to-[#011441] relative overflow-hidden ${promiseVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6958c2]/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6958c2]/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-block">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl">
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-5">
                    The NirmalTax Promise
                  </h2>
                  <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#6958c2] to-transparent mx-auto mb-3 sm:mb-5"></div>
                  <p className="text-sm sm:text-lg md:text-xl text-white/95 italic leading-relaxed mb-3 sm:mb-5 font-light">
                    "Pure in Purpose. Precise in Practice. Perfect in Performance."
                  </p>
                  <p className="text-xs sm:text-base text-white/80 leading-relaxed max-w-xl mx-auto">
                    Everything we do is driven by honesty, clarity, and the intent to serve you better.
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