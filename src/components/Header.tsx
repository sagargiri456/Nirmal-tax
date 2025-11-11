import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#6958c2]">
            BusinessHub
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-[#6958c2] transition-colors duration-300 font-medium">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-[#6958c2] transition-colors duration-300 font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-[#6958c2] transition-colors duration-300 font-medium">
              About
            </button>
            <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-[#6958c2] transition-colors duration-300 font-medium">
              Features
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-[#6958c2] transition-colors duration-300 font-medium">
              Contact
            </button>
            <button onClick={() => scrollToSection('contact')} className="bg-[#6958c2] text-white px-6 py-2 rounded-full hover:bg-[#011441] transition-all duration-300 transform hover:scale-105 font-medium">
              Get Started
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-[#6958c2] transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t animate-fade-in">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-[#6958c2] transition-colors duration-300 font-medium text-left">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-[#6958c2] transition-colors duration-300 font-medium text-left">
                Services
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-[#6958c2] transition-colors duration-300 font-medium text-left">
                About
              </button>
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-[#6958c2] transition-colors duration-300 font-medium text-left">
                Features
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-[#6958c2] transition-colors duration-300 font-medium text-left">
                Contact
              </button>
              <button onClick={() => scrollToSection('contact')} className="bg-[#6958c2] text-white px-6 py-2 rounded-full hover:bg-[#011441] transition-all duration-300 font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
