import { useState, useEffect, useRef } from 'react';

const cases = [
  {
    id: 1,
    clientName: 'TechNova Solutions Pvt. Ltd.',
    caseType: 'Tax Optimization',
    industry: 'IT & Software Development',
    year: '2024',
    status: 'Completed',
    challenge: 'The client was experiencing rapid growth but struggled with high tax liabilities due to poor structuring of expenses and lack of planning.',
    approach: [
      'Conducted a detailed tax audit to identify overlooked deductions',
      'Restructured the company\'s expense policies and advised on optimal depreciation methods',
      'Implemented quarterly tax planning sessions to ensure compliance and reduce penalties'
    ],
    results: [
      'Reduced overall tax outflow by 28% within one financial year',
      'Improved cash flow management for reinvestment in business growth'
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop'
  },
  {
    id: 2,
    clientName: 'Riya Textiles',
    caseType: 'Financial Process Automation',
    industry: 'Manufacturing & Retail',
    year: '2024',
    status: 'Completed',
    challenge: 'Manual bookkeeping and outdated accounting practices led to frequent errors and delayed financial reporting.',
    approach: [
      'Migrated the client to Tally Prime and Zoho Books for real-time accounting',
      'Set up automated reconciliation and expense tracking',
      'Trained internal staff on accounting best practices and compliance updates'
    ],
    results: [
      'Reduced bookkeeping errors by 90%',
      'Achieved faster month-end closings and better financial visibility'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
  },
  {
    id: 3,
    clientName: 'MedCare Pharma Distributors',
    caseType: 'GST Compliance & Refund',
    industry: 'Healthcare & Distribution',
    year: '2024',
    status: 'Completed',
    challenge: 'The client faced GST input credit mismatches and refund delays due to incorrect filings.',
    approach: [
      'Performed a comprehensive GST reconciliation across all vendors',
      'Rectified filing errors and resubmitted refund claims with proper documentation',
      'Set up a compliance calendar for timely GSTR filings'
    ],
    results: [
      'Secured pending GST refunds worth ₹12.5 lakhs',
      'Achieved 100% on-time compliance for three consecutive quarters'
    ],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop'
  },
  {
    id: 4,
    clientName: 'GreenWave Energy Ltd.',
    caseType: 'Business Valuation for Merger',
    industry: 'Renewable Energy',
    year: '2024',
    status: 'Completed',
    challenge: 'The company required a fair and defensible valuation for an upcoming merger with a larger energy firm.',
    approach: [
      'Conducted a detailed business valuation using DCF and Comparable Company Analysis methods',
      'Provided financial projections and risk assessments for negotiation support',
      'Coordinated with legal and corporate advisors for smooth transaction execution'
    ],
    results: [
      'Achieved a 15% higher valuation than initial estimates',
      'Facilitated a successful merger with minimal legal or compliance issues'
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop'
  },
  {
    id: 5,
    clientName: 'Senior IT Professional',
    caseType: 'Tax Planning & Wealth Management',
    industry: 'High Net Worth Individual',
    year: '2024',
    status: 'Completed',
    challenge: 'The client wanted to minimize tax liabilities while investing in diversified instruments for long-term wealth creation.',
    approach: [
      'Conducted a complete review of income sources and existing investments',
      'Suggested a mix of ELSS, NPS, and Tax-free Bonds for maximum benefit',
      'Implemented a long-term capital gains management strategy'
    ],
    results: [
      'Reduced annual tax burden by ₹1.2 lakh',
      'Created a clear 5-year investment and tax roadmap'
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
  },
  {
    id: 6,
    clientName: 'Swift Logistics Pvt. Ltd.',
    caseType: 'Statutory Audit',
    industry: 'Logistics & Transport',
    year: '2024',
    status: 'Completed',
    challenge: 'The company faced discrepancies between internal records and statutory requirements during its annual audit.',
    approach: [
      'Conducted a detailed risk-based audit',
      'Suggested improvements in internal control systems',
      'Ensured compliance with Companies Act, 2013 and Accounting Standards'
    ],
    results: [
      'Achieved audit clearance without qualifications',
      'Enhanced credibility with investors and financial institutions'
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'
  }
];

export default function CasesCompleted() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const displayedCases = showAll ? cases : cases.slice(0, 3);

  return (
    <section ref={sectionRef} id="cases" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className={`text-center mb-8 sm:mb-12 md:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#011441] mb-3 sm:mb-4 md:mb-6 leading-tight ${isVisible ? 'animate-fade-in-up-delay-1' : 'opacity-0'}`}>
              Cases Completed
            </h2>
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 ${isVisible ? 'animate-fade-in-up-delay-2' : 'opacity-0'}`}>
              Our track record speaks for itself. Here are some of the successful cases we've handled with precision and professionalism.
            </p>
          </div>

          {/* Cases Grid */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {displayedCases.map((caseItem, index) => {
              const delayIndex = (index % 3) + 1;
              const delayClass = delayIndex === 1 ? 'animate-scale-in-delay-1' : 
                                 delayIndex === 2 ? 'animate-scale-in-delay-2' : 
                                 'animate-scale-in-delay-3';
              const isNewCard = index >= 3 && showAll;
              return (
              <div
                key={caseItem.id}
                className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isVisible ? delayClass : 'opacity-0'} ${isNewCard ? 'animate-fade-in-up' : ''}`}
              >
                {/* Case Image */}
                <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                  <img 
                    src={caseItem.image} 
                    alt={caseItem.caseType}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <p className="text-white text-xs sm:text-sm font-semibold drop-shadow-lg">
                      {caseItem.industry}
                    </p>
                  </div>
                </div>

                {/* Case Content */}
                <div className="p-4 sm:p-6">
                  {/* Case Header */}
                  <div className="mb-3">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#011441] mb-1">
                      {caseItem.clientName}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6958c2] font-medium mb-1">
                      {caseItem.caseType}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      {caseItem.industry}
                    </p>
                  </div>

                  {/* Challenge */}
                  <div className="mb-3">
                    <h4 className="text-xs sm:text-sm font-bold text-[#011441] mb-1.5">Challenge:</h4>
                    <p className="text-[10px] sm:text-xs text-gray-700 leading-relaxed">
                      {caseItem.challenge}
                    </p>
                  </div>

                  {/* Our Approach
                  <div className="mb-3">
                    <h4 className="text-xs sm:text-sm font-bold text-[#011441] mb-1.5">Our Approach:</h4>
                    <ul className="space-y-1">
                      {caseItem.approach.map((item, idx) => (
                        <li key={idx} className="text-[10px] sm:text-xs text-gray-700 leading-relaxed flex items-start gap-1.5">
                          <span className="text-[#6958c2] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div> */}

                  {/* Results */}
                  <div className="mb-3">
                    <h4 className="text-xs sm:text-sm font-bold text-[#011441] mb-1.5">Result:</h4>
                    <ul className="space-y-1">
                      {caseItem.results.map((item, idx) => (
                        <li key={idx} className="text-[10px] sm:text-xs text-gray-700 leading-relaxed flex items-start gap-1.5">
                          {/* <span className="text-green-600 font-bold mt-0.5">✅</span> */}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Year Badge */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#6958c2] to-[#011441] rounded-full"></div>
                      <span className="text-[10px] sm:text-xs text-gray-500">Successfully Completed</span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                      {caseItem.year}
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* View More/Less Button */}
          {cases.length > 3 && (
            <div className={`text-center mt-8 sm:mt-10 md:mt-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#6958c2] to-[#011441] text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                {showAll ? (
                  <>
                    <span>View Less</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>View More</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


