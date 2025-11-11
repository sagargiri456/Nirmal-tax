import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-[#011441] mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or ready to start your journey with us? We'd love to hear from you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="animate-slide-in-left">
            <h3 className="text-2xl font-bold text-[#011441] mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6958c2] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6958c2] transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6958c2] transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6958c2] transition-colors resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#6958c2] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#011441] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={20} />
              </button>
            </form>
          </div>

          <div className="animate-slide-in-right">
            <h3 className="text-2xl font-bold text-[#011441] mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="bg-[#6958c2]/10 p-3 rounded-lg group-hover:bg-[#6958c2] transition-colors duration-300">
                  <MapPin className="text-[#6958c2] group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#011441] text-lg mb-1">Our Office</h4>
                  <p className="text-gray-600">123 Business Street, Suite 100<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-[#6958c2]/10 p-3 rounded-lg group-hover:bg-[#6958c2] transition-colors duration-300">
                  <Phone className="text-[#6958c2] group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#011441] text-lg mb-1">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567<br />Mon-Fri: 9AM - 6PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-[#6958c2]/10 p-3 rounded-lg group-hover:bg-[#6958c2] transition-colors duration-300">
                  <Mail className="text-[#6958c2] group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#011441] text-lg mb-1">Email</h4>
                  <p className="text-gray-600">info@businesshub.com<br />support@businesshub.com</p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-3">Business Hours</h4>
              <div className="space-y-2 text-gray-200">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
