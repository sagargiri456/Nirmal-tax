import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#011441] text-white pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#6958c2]">NirmalTax.com</h3>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Purity in Tax & Trust in Service. We simplify tax with trust, combining professional expertise with personalized care.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="bg-white/10 p-1.5 sm:p-2 rounded-lg hover:bg-[#6958c2] transition-colors duration-300">
                <Facebook size={16} />
              </a>
              <a href="#" className="bg-white/10 p-1.5 sm:p-2 rounded-lg hover:bg-[#6958c2] transition-colors duration-300">
                <Twitter size={16} />
              </a>
              <a href="#" className="bg-white/10 p-1.5 sm:p-2 rounded-lg hover:bg-[#6958c2] transition-colors duration-300">
                <Linkedin size={16} />
              </a>
              <a href="#" className="bg-white/10 p-1.5 sm:p-2 rounded-lg hover:bg-[#6958c2] transition-colors duration-300">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-[#6958c2] transition-colors text-sm sm:text-base">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-[#6958c2] transition-colors text-sm sm:text-base">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-[#6958c2] transition-colors text-sm sm:text-base">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-[#6958c2] transition-colors text-sm sm:text-base">
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-[#6958c2] transition-colors text-sm sm:text-base">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Our Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#services" className="text-gray-300 hover:text-[#6958c2] transition-colors text-sm sm:text-base">
                  Income Tax Filing
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-[#6958c2] transition-colors text-sm sm:text-base">
                  GST Services
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-[#6958c2] transition-colors text-sm sm:text-base">
                  Company Registration
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-[#6958c2] transition-colors text-sm sm:text-base">
                  Tax Audit
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-[#6958c2] transition-colors text-sm sm:text-base">
                  Payroll Services
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Contact Info</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin size={16} className="text-[#6958c2] flex-shrink-0 mt-0.5 sm:mt-1" />
                <span className="text-gray-300 text-sm sm:text-base">
                  57A, Nepal Bhattacharjee 1st Lane, Ground Floor<br />
                  Kolkata – 700026<br />
                  (Near Kalighat Metro Station)
                </span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone size={16} className="text-[#6958c2] flex-shrink-0" />
                <a href="tel:+917439935011" className="text-gray-300 hover:text-[#6958c2] transition-colors text-sm sm:text-base">
                  +91 74399 35011
                </a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail size={16} className="text-[#6958c2] flex-shrink-0" />
                <a href="mailto:canirmal2024@gmail.com" className="text-gray-300 hover:text-[#6958c2] transition-colors text-sm sm:text-base">
                  canirmal2024@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-300 text-center md:text-left text-xs sm:text-sm">
              &copy; 2024 Nirmal Kumar & Co. (NirmalTax.com). All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="text-gray-300 hover:text-[#6958c2] transition-colors text-xs sm:text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-[#6958c2] transition-colors text-xs sm:text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}