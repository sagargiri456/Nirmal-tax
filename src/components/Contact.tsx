import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#011441] mb-3 sm:mb-4">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Have a question or ready to start your journey with us? We'd love to hear from you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-5xl mx-auto">
          <div className="animate-slide-in-left">
            <h3 className="text-xl sm:text-2xl font-bold text-[#011441] mb-4 sm:mb-6">Send us a message</h3>
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Your Name</label>
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6958c2] transition-colors text-sm sm:text-base"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Email Address</label>
                <input
                  type="email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6958c2] transition-colors text-sm sm:text-base"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6958c2] transition-colors text-sm sm:text-base"
                  placeholder="+91 12345 67890"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6958c2] transition-colors resize-none text-sm sm:text-base"
                  placeholder="Tell us about your tax or compliance needs..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#6958c2] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#011441] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>

          <div className="animate-slide-in-right">
            <h3 className="text-xl sm:text-2xl font-bold text-[#011441] mb-4 sm:mb-6">Contact Information</h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-[#6958c2]/10 p-2 sm:p-3 rounded-lg group-hover:bg-[#6958c2] transition-colors duration-300 flex-shrink-0">
                  <MapPin className="text-[#6958c2] group-hover:text-white transition-colors" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#011441] text-base sm:text-lg mb-1">Our Office</h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    57A, Nepal Bhattacharjee 1st Lane, Ground Floor<br />
                    Kolkata – 700026<br />
                    (Near Kalighat Metro Station)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-[#6958c2]/10 p-2 sm:p-3 rounded-lg group-hover:bg-[#6958c2] transition-colors duration-300 flex-shrink-0">
                  <Phone className="text-[#6958c2] group-hover:text-white transition-colors" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#011441] text-base sm:text-lg mb-1">Phone</h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <a href="tel:+917439935011" className="hover:text-[#6958c2] transition-colors">
                      +91 74399 35011
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-[#6958c2]/10 p-2 sm:p-3 rounded-lg group-hover:bg-[#6958c2] transition-colors duration-300 flex-shrink-0">
                  <Mail className="text-[#6958c2] group-hover:text-white transition-colors" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#011441] text-base sm:text-lg mb-1">Email</h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <a href="mailto:canirmal2024@gmail.com" className="hover:text-[#6958c2] transition-colors">
                      canirmal2024@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Member Details</h4>
              <div className="space-y-2 text-gray-200">
                <div>
                  <span className="font-semibold text-sm sm:text-base">CA Nirmal Kumar</span>
                </div>
                <div className="pt-3 sm:pt-4 border-t border-white/20">
                  <p className="text-xs sm:text-sm opacity-90">Established: August 2024</p>
                  <p className="text-xs sm:text-sm opacity-90">Team: 10 Dedicated Accountants</p>
                  <p className="text-xs sm:text-sm opacity-90">Cases Completed: 50+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}