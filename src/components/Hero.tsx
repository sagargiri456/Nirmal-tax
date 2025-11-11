import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-[#6958c2] to-[#011441] text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Business with Expert Solutions
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
              We provide comprehensive business consulting and financial services to help your company grow and succeed in today's competitive market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('services')}
                className="bg-white text-[#6958c2] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
              >
                Explore Services
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#6958c2] transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm transform rotate-3"></div>
              <div className="relative bg-white/20 rounded-3xl backdrop-blur-md p-8 border border-white/30">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/90 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl font-bold text-[#6958c2] mb-2">500+</div>
                    <div className="text-gray-700 font-medium">Happy Clients</div>
                  </div>
                  <div className="bg-white/90 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl font-bold text-[#6958c2] mb-2">15+</div>
                    <div className="text-gray-700 font-medium">Years Experience</div>
                  </div>
                  <div className="bg-white/90 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl font-bold text-[#6958c2] mb-2">98%</div>
                    <div className="text-gray-700 font-medium">Success Rate</div>
                  </div>
                  <div className="bg-white/90 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl font-bold text-[#6958c2] mb-2">24/7</div>
                    <div className="text-gray-700 font-medium">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
