import { Clock, Headphones, Lock, Rocket, Globe, Users2 } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock support to ensure your business never stops'
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Personal account managers committed to your success'
  },
  {
    icon: Lock,
    title: 'Data Security',
    description: 'Enterprise-grade security to protect your sensitive information'
  },
  {
    icon: Rocket,
    title: 'Fast Deployment',
    description: 'Quick implementation to get you up and running rapidly'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'International presence with local market expertise'
  },
  {
    icon: Users2,
    title: 'Team Collaboration',
    description: 'Tools and strategies to enhance team productivity'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-[#011441] to-[#6958c2] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We combine innovation, expertise, and dedication to deliver unparalleled value to our clients
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 text-center animate-fade-in">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful businesses that trust us with their growth and success
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-[#6958c2] px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
