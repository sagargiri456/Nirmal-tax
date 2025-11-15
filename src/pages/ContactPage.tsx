import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import heroBackgroundImage from '../assets/business-meeting-room-high-rise-office-building.jpg?url';
import contactBackgroundImage from '../assets/team-business-people-stacking-hands.jpg?url';
import locationIcon from '../assets/establishment.png';
import handshakeIcon from '../assets/handshake.png';
import clockIcon from '../assets/clock.png';
import shieldIcon from '../assets/shield.png';

export default function ContactPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [contactCardsVisible, setContactCardsVisible] = useState<boolean[]>(new Array(4).fill(false));
  const [consultationVisible, setConsultationVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const contactCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const consultationRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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
            } else if (entry.target === consultationRef.current) {
              setConsultationVisible(true);
            } else if (entry.target === formRef.current) {
              setFormVisible(true);
            } else {
              // Check if it's a contact card
              const cardIndex = contactCardRefs.current.findIndex(ref => ref === entry.target);
              if (cardIndex !== -1) {
                setContactCardsVisible(prev => {
                  const newState = [...prev];
                  newState[cardIndex] = true;
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
    if (consultationRef.current) observer.observe(consultationRef.current);
    if (formRef.current) observer.observe(formRef.current);
    
    contactCardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you within the same business day.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Header Section */}
      <section ref={heroRef} id="contact-hero" className="relative pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 overflow-hidden">
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
        
        {/* Overlay */}
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
                Get in Touch with NirmalTax
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white drop-shadow-md">
                Pure Guidance. Clear Answers. Trusted Support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={introRef} className={`py-12 sm:py-16 md:py-20 bg-white ${introVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              At NirmalTax, we believe communication should be simple, direct, and responsive. Our team is always here to guide you with clarity and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
        
        {/* Decorative Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#6958c2]/6 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#011441]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
              {/* Office Location */}
              <div
                ref={(el) => { contactCardRefs.current[0] = el; }}
                className={`${contactCardsVisible[0] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.1s' }}
              >
                <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#6958c2]/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                  <div className="p-5 sm:p-6 flex flex-col h-full">
                    {/* Icon and Title Row */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                          <img src={locationIcon} alt="Location" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                        </div>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#011441] group-hover:text-[#6958c2] transition-colors duration-300">
                        Our Office Location
                      </h3>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed flex-grow">
                      <p className="font-semibold text-[#011441]">Nirmal Kumar & Co.</p>
                      <p className="text-gray-600 text-xs">Chartered Accountants</p>
                      <div className="pt-1 space-y-0.5">
                        <p className="text-gray-700">57A, Nepal Bhattacharjee 1st Lane,</p>
                        <p className="text-gray-700">Ground Floor, Kolkata – 700026</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 italic">(Near Kalighat Metro Station)</p>
                    </div>
                  </div>
                  
                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>

              {/* Phone/WhatsApp */}
              <div
                ref={(el) => { contactCardRefs.current[1] = el; }}
                className={`${contactCardsVisible[1] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.2s' }}
              >
                <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#6958c2]/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                  <div className="p-5 sm:p-6 flex flex-col h-full">
                    {/* Icon and Title Row */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                          <img src={handshakeIcon} alt="Phone" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                        </div>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#011441] group-hover:text-[#6958c2] transition-colors duration-300">
                        Call or WhatsApp
                      </h3>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed flex-grow">
                      <p className="font-semibold text-[#011441] text-xs">Mobile:</p>
                      <a href="tel:+917439935011" className="text-[#6958c2] hover:text-[#011441] font-bold text-sm sm:text-base transition-colors block">
                        +91 74399 35011
                      </a>
                      <p className="text-xs text-gray-500 mt-1">Available during business hours</p>
                    </div>
                  </div>
                  
                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>

              {/* Email */}
              <div
                ref={(el) => { contactCardRefs.current[2] = el; }}
                className={`${contactCardsVisible[2] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.3s' }}
              >
                <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#6958c2]/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                  <div className="p-5 sm:p-6 flex flex-col h-full">
                    {/* Icon and Title Row */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                          <img src={shieldIcon} alt="Email" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                        </div>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#011441] group-hover:text-[#6958c2] transition-colors duration-300">
                        Email Support
                      </h3>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed flex-grow">
                      <p className="text-gray-600 text-xs">For formal communication:</p>
                      <a href="mailto:canirmal2024@gmail.com" className="text-[#6958c2] hover:text-[#011441] font-semibold break-all transition-colors text-xs">
                        canirmal2024@gmail.com
                      </a>
                      <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
                    </div>
                  </div>
                  
                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>

              {/* Office Timings */}
              <div
                ref={(el) => { contactCardRefs.current[3] = el; }}
                className={`${contactCardsVisible[3] ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.4s' }}
              >
                <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#6958c2]/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                  <div className="p-5 sm:p-6 flex flex-col h-full">
                    {/* Icon and Title Row */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                          <img src={clockIcon} alt="Timings" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                        </div>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#011441] group-hover:text-[#6958c2] transition-colors duration-300">
                        Office Timings
                      </h3>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 leading-relaxed flex-grow">
                      <p className="font-semibold text-[#011441]">Monday to Saturday</p>
                      <p className="text-gray-600">10:00 AM – 7:00 PM</p>
                      <p className="font-semibold text-[#011441] mt-2">Sunday</p>
                      <p className="text-gray-600">Closed</p>
                      <p className="text-xs text-gray-500 mt-2 italic">(Available for urgent matters on prior request)</p>
                    </div>
                  </div>
                  
                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation & Contact Form Section */}
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${contactBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.92) 50%, rgba(255, 255, 255, 0.88) 100%)'
          }}
        ></div>
        
        {/* Subtle gradient accent */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(105, 88, 194, 0.04) 0%, rgba(1, 20, 65, 0.06) 50%, rgba(105, 88, 194, 0.04) 100%)'
          }}
        ></div>
        
        {/* Decorative Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#6958c2]/6 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#011441]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
              {/* Consultation Options */}
              <div ref={consultationRef} className={`${consultationVisible ? 'animate-slide-in-left-scale' : 'opacity-0'}`}>
                <div className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border-2 border-gray-100 hover:border-[#6958c2]/40 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 via-[#011441]/0 to-[#6958c2]/0 group-hover:from-[#6958c2]/5 group-hover:via-[#011441]/3 group-hover:to-[#6958c2]/5 transition-all duration-700 rounded-2xl sm:rounded-3xl"></div>
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-t-2xl sm:rounded-t-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="bg-gradient-to-br from-[#6958c2] to-[#011441] p-3 sm:p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <img src={handshakeIcon} alt="Consultation" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#011441]">
                        Book Your Consultation
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                      Whether you need help with ITR filing, GST, audit, business setup, payroll, or financial planning — you can schedule a consultation at your convenience.
                    </p>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#6958c2] to-[#011441] flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Online Consultation (Google Meet / Zoom)</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#6958c2] to-[#011441] flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">In-Office Consultation</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#6958c2] to-[#011441] flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Phone Consultation</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6 italic border-t border-gray-200 pt-4 sm:pt-6">
                      Transparent pricing and expert guidance in every session.
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-b-2xl sm:rounded-b-3xl"></div>
                </div>
              </div>

              {/* Contact Form */}
              <div ref={formRef} className={`${formVisible ? 'animate-slide-in-right-scale' : 'opacity-0'}`}>
                <div className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border-2 border-gray-100 hover:border-[#6958c2]/40 hover:shadow-2xl hover:shadow-[#6958c2]/10 transition-all duration-500 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6958c2]/0 via-[#011441]/0 to-[#6958c2]/0 group-hover:from-[#6958c2]/5 group-hover:via-[#011441]/3 group-hover:to-[#6958c2]/5 transition-all duration-700 rounded-2xl sm:rounded-3xl"></div>
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6958c2] via-[#011441] to-[#6958c2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-t-2xl sm:rounded-t-3xl"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#011441] mb-2">
                        Quick Contact Form
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                      Submit your details and our team will contact you within the same business day.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-[#011441] mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-[#6958c2] focus:outline-none transition-colors bg-white text-sm sm:text-base"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-[#011441] mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-[#6958c2] focus:outline-none transition-colors bg-white text-sm sm:text-base"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-[#011441] mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-[#6958c2] focus:outline-none transition-colors bg-white text-sm sm:text-base"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-xs sm:text-sm font-semibold text-[#011441] mb-2">
                          Service Required
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-[#6958c2] focus:outline-none transition-colors bg-white text-sm sm:text-base"
                        >
                          <option value="">Select a service</option>
                          <option value="itr">ITR Filing</option>
                          <option value="gst">GST Services</option>
                          <option value="audit">Audit Services</option>
                          <option value="business-setup">Business Setup</option>
                          <option value="payroll">Payroll Services</option>
                          <option value="financial-planning">Financial Planning</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-[#011441] mb-2">
                          Message / Query
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={3}
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-[#6958c2] focus:outline-none transition-colors resize-none bg-white text-sm sm:text-base"
                          placeholder="Tell us about your requirements..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#6958c2] to-[#011441] text-white font-semibold py-2 sm:py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#6958c2]/30 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#011441] via-[#6958c2] to-[#011441] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-b-2xl sm:rounded-b-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mt-8 sm:mt-10 text-center">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                🌟 <strong className="text-[#011441]">We're Here to Help You Grow with Confidence</strong>
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-3">
                Whether it's tax planning, compliance management, or business setup — reach out to us and experience purity in service, precision in work, and professionalism in every interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}