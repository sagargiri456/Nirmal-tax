import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#011441] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#6958c2]">BusinessHub</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for business consulting and financial services. We help businesses grow and succeed.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-[#6958c2] transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-[#6958c2] transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-[#6958c2] transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-[#6958c2] transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-[#6958c2] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-[#6958c2] transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-[#6958c2] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-[#6958c2] transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-[#6958c2] transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#6958c2] transition-colors">
                  Business Consulting
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#6958c2] transition-colors">
                  Financial Advisory
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#6958c2] transition-colors">
                  HR Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#6958c2] transition-colors">
                  Risk Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#6958c2] transition-colors">
                  Market Analysis
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#6958c2] flex-shrink-0 mt-1" />
                <span className="text-gray-300">123 Business Street, Suite 100, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#6958c2] flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#6958c2] flex-shrink-0" />
                <span className="text-gray-300">info@businesshub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-center md:text-left">
              &copy; 2024 BusinessHub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-300 hover:text-[#6958c2] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-[#6958c2] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-[#6958c2] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
