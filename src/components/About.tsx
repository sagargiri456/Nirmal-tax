import { CheckCircle2, Target, Award, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <div className="relative">
              <div className="absolute inset-0 bg-[#6958c2]/10 rounded-3xl transform -rotate-3"></div>
              <div className="relative bg-gradient-to-br from-[#6958c2] to-[#011441] rounded-3xl p-1">
                <div className="bg-white rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-[#6958c2]/10 p-4 rounded-full mb-3">
                        <Target className="text-[#6958c2]" size={32} />
                      </div>
                      <div className="text-3xl font-bold text-[#011441]">Mission</div>
                      <p className="text-sm text-gray-600 mt-2">Driving excellence</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-[#6958c2]/10 p-4 rounded-full mb-3">
                        <Award className="text-[#6958c2]" size={32} />
                      </div>
                      <div className="text-3xl font-bold text-[#011441]">Quality</div>
                      <p className="text-sm text-gray-600 mt-2">Best in class</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-[#6958c2]/10 p-4 rounded-full mb-3">
                        <Zap className="text-[#6958c2]" size={32} />
                      </div>
                      <div className="text-3xl font-bold text-[#011441]">Speed</div>
                      <p className="text-sm text-gray-600 mt-2">Fast delivery</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-[#6958c2]/10 p-4 rounded-full mb-3">
                        <CheckCircle2 className="text-[#6958c2]" size={32} />
                      </div>
                      <div className="text-3xl font-bold text-[#011441]">Trust</div>
                      <p className="text-sm text-gray-600 mt-2">Reliable partner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-slide-in-right">
            <h2 className="text-4xl md:text-5xl font-bold text-[#011441] mb-6">
              About Our Company
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              With over 15 years of experience in business consulting and financial services, we've helped hundreds of companies achieve their goals and reach new heights of success.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our team of expert consultants brings together diverse industry knowledge and proven methodologies to deliver tailored solutions that drive measurable results for your business.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="bg-green-500/10 p-2 rounded-lg group-hover:bg-green-500 transition-colors duration-300">
                  <CheckCircle2 className="text-green-500 group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#011441] text-lg mb-1">Proven Track Record</h4>
                  <p className="text-gray-600">Consistent delivery of exceptional results for our clients</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-green-500/10 p-2 rounded-lg group-hover:bg-green-500 transition-colors duration-300">
                  <CheckCircle2 className="text-green-500 group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#011441] text-lg mb-1">Industry Expertise</h4>
                  <p className="text-gray-600">Deep knowledge across multiple sectors and markets</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-green-500/10 p-2 rounded-lg group-hover:bg-green-500 transition-colors duration-300">
                  <CheckCircle2 className="text-green-500 group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#011441] text-lg mb-1">Tailored Solutions</h4>
                  <p className="text-gray-600">Customized strategies designed for your unique needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
