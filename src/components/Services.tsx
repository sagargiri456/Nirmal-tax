import { Briefcase, TrendingUp, Users, Shield, BarChart3, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: Briefcase,
    title: 'Business Consulting',
    description: 'Strategic guidance to optimize your business operations and drive sustainable growth.',
    color: 'bg-blue-500'
  },
  {
    icon: TrendingUp,
    title: 'Financial Advisory',
    description: 'Expert financial planning and investment strategies tailored to your business goals.',
    color: 'bg-green-500'
  },
  {
    icon: Users,
    title: 'HR Management',
    description: 'Comprehensive human resource solutions to build and manage your best team.',
    color: 'bg-purple-500'
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Identify, assess, and mitigate potential risks to protect your business assets.',
    color: 'bg-red-500'
  },
  {
    icon: BarChart3,
    title: 'Market Analysis',
    description: 'In-depth market research and competitive analysis to inform your strategy.',
    color: 'bg-orange-500'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Strategy',
    description: 'Transform your ideas into actionable plans for sustainable competitive advantage.',
    color: 'bg-yellow-500'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-[#011441] mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions designed to address your unique business challenges and opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#011441] mb-4 group-hover:text-[#6958c2] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
