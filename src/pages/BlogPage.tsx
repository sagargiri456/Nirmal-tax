import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import heroBackgroundImage from '../assets/business-meeting-room-high-rise-office-building.jpg?url';
import topicsBackgroundImage from '../assets/tochscreen-documents-with-charts.jpg?url';
// import benefitsBackgroundImage from '../assets/team-business-people-stacking-hands.jpg?url';
import articlesBackgroundImage from '../assets/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working.jpg?url';
import { supabase } from '../lib/supabaseClient';
import type { BlogPost } from '../types/blog';

type ArticleCard = {
  title: string;
  summary: string;
  category: string;
  created_at: string;
  slug?: string;
  cover_image_url?: string | null;
};

export default function BlogPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [topicsHeaderVisible, setTopicsHeaderVisible] = useState(false);
  const [topicsCardsVisible, setTopicsCardsVisible] = useState<boolean[]>(new Array(6).fill(false));
  const [categoriesHeaderVisible, setCategoriesHeaderVisible] = useState(false);
  const [categoriesCardsVisible, setCategoriesCardsVisible] = useState<boolean[]>(new Array(8).fill(false));
  const [articlesHeaderVisible, setArticlesHeaderVisible] = useState(false);
  const [articlesCardsVisible, setArticlesCardsVisible] = useState<boolean[]>([]);
  const [writeToUsVisible, setWriteToUsVisible] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [postsLoading, setPostsLoading] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const topicsHeaderRef = useRef<HTMLDivElement>(null);
  const topicsCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const categoriesHeaderRef = useRef<HTMLDivElement>(null);
  const categoriesCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const articlesHeaderRef = useRef<HTMLDivElement>(null);
  const articlesCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const writeToUsRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === heroRef.current) {
              setHeroVisible(true);
            } else if (entry.target === introRef.current) {
              setIntroVisible(true);
            } else if (entry.target === topicsHeaderRef.current) {
              setTopicsHeaderVisible(true);
            } else if (entry.target === categoriesHeaderRef.current) {
              setCategoriesHeaderVisible(true);
            } else if (entry.target === articlesHeaderRef.current) {
              setArticlesHeaderVisible(true);
            } else if (entry.target === writeToUsRef.current) {
              setWriteToUsVisible(true);
            } else if (entry.target === closingRef.current) {
              setClosingVisible(true);
            } else {
              // Check if it's a topic card
              const topicIndex = topicsCardRefs.current.findIndex(ref => ref === entry.target);
              if (topicIndex !== -1) {
                setTopicsCardsVisible(prev => {
                  const newState = [...prev];
                  newState[topicIndex] = true;
                  return newState;
                });
              }
              
              // Check if it's a category card
              const categoryIndex = categoriesCardRefs.current.findIndex(ref => ref === entry.target);
              if (categoryIndex !== -1) {
                setCategoriesCardsVisible(prev => {
                  const newState = [...prev];
                  newState[categoryIndex] = true;
                  return newState;
                });
              }
              
              // Check if it's an article card
              const articleIndex = articlesCardRefs.current.findIndex(ref => ref === entry.target);
              if (articleIndex !== -1) {
                setArticlesCardsVisible(prev => {
                  const newState = [...prev];
                  newState[articleIndex] = true;
                  return newState;
                });
              }
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (introRef.current) observer.observe(introRef.current);
    if (topicsHeaderRef.current) observer.observe(topicsHeaderRef.current);
    if (categoriesHeaderRef.current) observer.observe(categoriesHeaderRef.current);
    if (articlesHeaderRef.current) observer.observe(articlesHeaderRef.current);
    if (writeToUsRef.current) observer.observe(writeToUsRef.current);
    if (closingRef.current) observer.observe(closingRef.current);
    
    topicsCardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    categoriesCardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    articlesCardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Re-observe article cards when articles change
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const articleIndex = articlesCardRefs.current.findIndex(ref => ref === entry.target);
            if (articleIndex !== -1) {
              setArticlesCardsVisible(prev => {
                const newState = [...prev];
                if (newState[articleIndex] !== undefined) {
                  newState[articleIndex] = true;
                }
                return newState;
              });
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    articlesCardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [featuredPosts.length]);

  const categories = [
    { name: 'Income Tax', icon: '📊' },
    { name: 'GST & Indirect Tax', icon: '📋' },
    { name: 'Audit & ROC Compliance', icon: '📑' },
    { name: 'Startup & Business Registration', icon: '🚀' },
    { name: 'Payroll & Labour Law', icon: '👥' },
    { name: 'Finance, Loans & Banking', icon: '💰' },
    { name: 'Tax Notices & Litigation', icon: '⚖️' },
    { name: 'Personal Finance & Planning', icon: '📈' }
  ];

  const fallbackArticles: ArticleCard[] = [
    {
      title: '5 Common Mistakes to Avoid While Filing ITR',
      summary: 'Learn about the most common errors taxpayers make and how to avoid them.',
      category: 'Income Tax',
      created_at: new Date().toISOString(),
    },
    {
      title: 'How to Respond to an Income Tax Notice: A Complete Guide',
      summary: 'Step-by-step guidance on handling income tax notices effectively.',
      category: 'Tax Notices & Litigation',
      created_at: new Date().toISOString(),
    },
    {
      title: 'GST Registration: Step-by-Step Process for New Businesses',
      summary: 'A comprehensive guide to GST registration for new businesses.',
      category: 'GST & Indirect Tax',
      created_at: new Date().toISOString(),
    },
    {
      title: 'Understanding ROC Compliance for Private Limited Companies',
      summary: 'Everything you need to know about ROC compliance requirements.',
      category: 'Audit & ROC Compliance',
      created_at: new Date().toISOString(),
    },
    {
      title: 'PF & ESIC Filing Checklist for Employers',
      summary: 'Complete checklist for PF and ESIC filing obligations.',
      category: 'Payroll & Labour Law',
      created_at: new Date().toISOString(),
    }
  ];

  const articlesToDisplay: ArticleCard[] = featuredPosts.length
    ? featuredPosts.map((post) => ({
        title: post.title,
        summary: post.summary,
        category: post.category,
        created_at: post.created_at,
        slug: post.slug,
        cover_image_url: post.cover_image_url,
      }))
    : fallbackArticles;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!supabase) {
          setPostsError('Supabase is not configured. Showing curated content instead.');
          setPostsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) {
          console.error('Error fetching blog posts:', error);
          setPostsError(error.message);
          setFeaturedPosts([]);
        } else {
          setFeaturedPosts(data ?? []);
          setPostsError(null);
        }
      } catch (err) {
        console.error('Unexpected error fetching blog posts:', err);
        setPostsError('Failed to load blog posts. Showing curated content instead.');
        setFeaturedPosts([]);
      } finally {
        setPostsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Sync articlesCardsVisible array size with articlesToDisplay
  useEffect(() => {
    const articlesCount = featuredPosts.length > 0 ? featuredPosts.length : fallbackArticles.length;
    setArticlesCardsVisible(prev => {
      if (prev.length === articlesCount) return prev;
      return new Array(articlesCount).fill(false);
    });
  }, [featuredPosts.length]);

  const topics = [
    'Tax Tips & Updates',
    'GST Insights & Compliance Advice',
    'Business Setup & Registration Guides',
    'Audit & Financial Reporting Knowledge',
    'Payroll & Labour Law Awareness',
    'Finance, Banking & Advisory Insights'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Header Section */}
      <section ref={heroRef} id="blog-hero" className="relative pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(1, 20, 65, 0.75) 0%, rgba(105, 88, 194, 0.65) 50%, rgba(1, 20, 65, 0.75) 100%)'
          }}
        ></div>

        {/* Decorative Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6958c2]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#011441]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className={heroVisible ? 'animate-fade-in-up' : 'opacity-0'}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                NirmalTax Blog
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white drop-shadow-md">
                Your Trusted Guide to Tax, Compliance & Finance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={introRef} className={`py-12 sm:py-16 md:py-20 bg-white ${introVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Welcome to the NirmalTax Knowledge Hub, where clarity meets expertise. Just like our name "Nirmal" signifies purity and transparency, our blog is designed to offer clear, accurate, and practical insights into the world of taxation, business compliance, finance, and corporate growth.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Find Section */}
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${topicsBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.92) 50%, rgba(255, 255, 255, 0.88) 100%)'
          }}
        ></div>
        
        {/* Subtle gradient accent */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(105, 88, 194, 0.04) 0%, rgba(1, 20, 65, 0.06) 50%, rgba(105, 88, 194, 0.04) 100%)'
          }}
        ></div>
        
        {/* Decorative Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#6958c2]/6 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#011441]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div ref={topicsHeaderRef} className={`text-center mb-8 sm:mb-12 ${topicsHeaderVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#011441] mb-4">
                What You'll Find in Our Blog
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  ref={(el) => { topicsCardRefs.current[index] = el; }}
                  className={`bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-[#6958c2]/40 transition-all duration-300 hover:-translate-y-1 p-4 sm:p-6 ${topicsCardsVisible[index] ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-base sm:text-lg font-bold text-[#011441] mb-2 sm:mb-3 group-hover:text-[#6958c2] transition-colors duration-300">
                    {topic}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {topic === 'Tax Tips & Updates' && 'Guides on Income Tax, TDS, deductions, exemptions, new tax laws, and timely updates to help you file correctly and save more.'}
                    {topic === 'GST Insights & Compliance Advice' && 'Understand GST rules, return filing procedures, notices, assessments, and practical tips to stay GST-compliant.'}
                    {topic === 'Business Setup & Registration Guides' && 'Step-by-step articles on starting a company, LLP, partnership, MSME registration, trade license, and legal requirements for new businesses.'}
                    {topic === 'Audit & Financial Reporting Knowledge' && 'Clear explanations of statutory audit, tax audit, financial documentation, and regulatory expectations for businesses.'}
                    {topic === 'Payroll & Labour Law Awareness' && 'Easy-to-understand posts on PF, ESIC, Professional Tax, HR compliance, and monthly return obligations.'}
                    {topic === 'Finance, Banking & Advisory Insights' && 'From loan project reports to financial planning — learn how to make smarter business and investment decisions.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
        
        {/* Decorative Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#6958c2]/6 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#011441]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div ref={categoriesHeaderRef} className={`text-center mb-8 sm:mb-12 ${categoriesHeaderVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#011441] mb-4">
                Popular Blog Categories
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  ref={(el) => { categoriesCardRefs.current[index] = el; }}
                  className={`bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-[#6958c2]/40 transition-all duration-300 hover:-translate-y-1 p-3 sm:p-5 text-center ${categoriesCardsVisible[index] ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="text-2xl sm:text-4xl mb-2 sm:mb-3">{category.icon}</div>
                  <h3 className="text-xs sm:text-base font-bold text-[#011441]">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${articlesBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.92) 50%, rgba(255, 255, 255, 0.88) 100%)'
          }}
        ></div>
        
        {/* Subtle gradient accent */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgba(105, 88, 194, 0.04) 0%, rgba(1, 20, 65, 0.06) 50%, rgba(105, 88, 194, 0.04) 100%)'
          }}
        ></div>
        
        {/* Decorative Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#6958c2]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#011441]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div ref={articlesHeaderRef} className={`text-center mb-8 sm:mb-12 ${articlesHeaderVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#011441] mb-4">
                Featured Articles
              </h2>
              <p className="text-xs sm:text-base text-gray-600">
                (You can display recent posts here dynamically)
              </p>
            </div>

            {postsError && (
              <p className="text-sm text-red-600 text-center mb-6">{postsError}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {articlesToDisplay.map((article, index) => (
                <div
                  key={article.slug ?? `${article.title}-${index}`}
                  ref={(el) => { articlesCardRefs.current[index] = el; }}
                  className={`bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#6958c2]/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden ${articlesCardsVisible[index] === true ? 'animate-scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {article.cover_image_url && (
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={article.cover_image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <p className="text-xs uppercase tracking-wide text-[#6958c2] font-semibold mb-2">
                      {article.category ?? 'Insights'}
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-[#011441] mb-2 sm:mb-3 group-hover:text-[#6958c2] transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {article.summary}
                    </p>
                    {article.created_at && (
                      <p className="text-[11px] text-gray-400 mt-4">
                        {new Date(article.created_at).toLocaleDateString()}
                      </p>
                    )}
                    {article.slug && (
                      <a
                        href={`/blog#${article.slug}`}
                        className="mt-4 inline-flex items-center text-sm font-semibold text-[#6958c2] hover:text-[#011441] transition-colors"
                      >
                        Continue reading →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {postsLoading && (
              <p className="text-sm text-gray-500 text-center mt-6">Loading latest articles…</p>
            )}
          </div>
        </div>
      </section>

      {/* Write to Us Section */}
      <section ref={writeToUsRef} className={`py-12 sm:py-16 md:py-20 bg-gray-50 relative overflow-hidden ${writeToUsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
        
        {/* Decorative Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#6958c2]/6 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#011441]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 p-6 sm:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-3xl font-bold text-[#011441] mb-3 sm:mb-4">
                  Write to Us / Suggest a Topic
                </h2>
                <p className="text-xs sm:text-base text-gray-700 leading-relaxed">
                  If you have a question or want us to cover a particular topic, feel free to reach out. Our goal is to make tax and compliance simple, accessible, and transparent for everyone.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">📩</div>
                  <h3 className="text-sm sm:text-lg font-bold text-[#011441] mb-1 sm:mb-2">Email</h3>
                  <a href="mailto:canirmal2024@gmail.com" className="text-[#6958c2] hover:text-[#011441] font-semibold transition-colors text-xs sm:text-base">
                    canirmal2024@gmail.com
                  </a>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">📱</div>
                  <h3 className="text-sm sm:text-lg font-bold text-[#011441] mb-1 sm:mb-2">WhatsApp</h3>
                  <a href="tel:+917439935011" className="text-[#6958c2] hover:text-[#011441] font-semibold transition-colors text-xs sm:text-base">
                    +91 74399 35011
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section ref={closingRef} className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${closingVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#011441]/10 via-white to-[#6958c2]/10"></div>
        
        {/* Decorative Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#6958c2]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#011441]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-3xl font-bold text-[#011441] mb-3 sm:mb-4">
              Knowledge for All. Clarity for Everyone.
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-gray-700 leading-relaxed">
              The NirmalTax Blog is more than a collection of articles — it's a commitment to educate, empower, and guide individuals and businesses with pure and precise financial knowledge.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}