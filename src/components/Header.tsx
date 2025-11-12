import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImage from '../assets/logo.jpg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px as mobile breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'services', 'about', 'features', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Set initial active section based on scroll position
    const handleInitialScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    handleInitialScroll();

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'contact', label: 'Contact' },
  ];

  const getNavItemDelayClass = (index: number) => {
    const delays = [
      'animate-navbar-item',
      'animate-navbar-item-delay-1',
      'animate-navbar-item-delay-2',
      'animate-navbar-item-delay-3',
      'animate-navbar-item-delay-4',
    ];
    return delays[index] || 'animate-navbar-item';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-navbar-slide-down ${
        scrolled ? 'backdrop-blur-md' : ''
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              onClick={() => isMobile && scrollToSection('home')}
              className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-300 animate-navbar-logo"
            >
              <img 
                src={logoImage} 
                alt="NirmalTax Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full object-cover"
              />
              <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#6958c2] to-[#011441] bg-clip-text text-transparent">
                NirmalTax
              </div>
            </div>
          </div>

          {/* Desktop Navigation - UNCHANGED */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-5 py-2.5 font-medium transition-all duration-300 group ${getNavItemDelayClass(index)} ${
                    isActive ? 'text-white' : 'text-gray-700'
                  }`}
                  style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
                >
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white font-semibold' : 'group-hover:text-white'}`}>{link.label}</span>
                  <span className={`absolute bottom-0 left-0 bg-gradient-to-r from-[#6958c2] to-[#011441] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)', height: '2px' }}></span>
                  <span className={`absolute inset-0 bg-gradient-to-r from-[#6958c2] to-[#011441] transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}></span>
                </button>
              );
            })}
            <button
              onClick={() => scrollToSection('contact')}
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-[#6958c2] to-[#011441] text-white rounded-full font-medium hover:shadow-lg hover:shadow-[#6958c2]/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 animate-navbar-button"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button - Enhanced for mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-white transition-colors duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#6958c2] hover:to-[#011441] animate-navbar-item-delay-4"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="animate-fade-in" />
            ) : (
              <Menu size={24} className="animate-fade-in" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Enhanced for mobile */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`px-4 py-3 text-left font-medium transition-all duration-300 transform hover:translate-x-2 hover:shadow-sm text-sm ${
                      isActive
                        ? 'text-white font-semibold bg-gradient-to-r from-[#6958c2] to-[#011441]'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#6958c2] hover:to-[#011441] hover:text-white'
                    }`}
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    {link.label}
                  </button>
                );
              })}
              <button
                onClick={() => scrollToSection('contact')}
                className="mt-2 px-5 py-3 bg-gradient-to-r from-[#6958c2] to-[#011441] text-white rounded-full font-medium hover:shadow-lg hover:shadow-[#6958c2]/30 transition-all duration-300 transform hover:scale-105 text-center text-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}