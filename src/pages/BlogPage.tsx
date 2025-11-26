
import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogPostCard from '../components/BlogPostCard';
import BlogPostModal from '../components/BlogPostModal';
import heroBackgroundImage from '../assets/business-meeting-room-high-rise-office-building.jpg?url';
import { supabase } from '../lib/supabaseClient';
import type { BlogPost } from '../types/blog';
import { Search, Mail, MessageCircle } from 'lucide-react';

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
  const [articlesHeaderVisible, setArticlesHeaderVisible] = useState(false);
  const [articlesCardsVisible, setArticlesCardsVisible] = useState<boolean[]>([]);
  const [writeToUsVisible, setWriteToUsVisible] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [postsLoading, setPostsLoading] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
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
            } else if (entry.target === articlesHeaderRef.current) {
              setArticlesHeaderVisible(true);
            } else if (entry.target === writeToUsRef.current) {
              setWriteToUsVisible(true);
            } else if (entry.target === closingRef.current) {
              setClosingVisible(true);
            } else {
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
    if (articlesHeaderRef.current) observer.observe(articlesHeaderRef.current);
    if (writeToUsRef.current) observer.observe(writeToUsRef.current);
    if (closingRef.current) observer.observe(closingRef.current);
    
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

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const uniqueCategories = ['All', ...Array.from(new Set(allPosts.map(post => post.category)))];
  
  const postsToDisplay = searchQuery || selectedCategory !== 'All' 
    ? filteredPosts 
    : featuredPosts;

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
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching blog posts:', error);
          setPostsError(error.message);
          setFeaturedPosts([] as BlogPost[]);
          setAllPosts([] as BlogPost[]);
        } else {
          const posts = (data ?? []) as BlogPost[];
          setAllPosts(posts);
          setFeaturedPosts(posts.slice(0, 6));
          setPostsError(null);
        }
      } catch (err) {
        console.error('Unexpected error fetching blog posts:', err);
        setPostsError('Failed to load blog posts. Showing curated content instead.');
        setFeaturedPosts([] as BlogPost[]);
        setAllPosts([] as BlogPost[]);
      } finally {
        setPostsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on category and search
  useEffect(() => {
    let filtered = allPosts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }

    setFilteredPosts(filtered);
  }, [allPosts, selectedCategory, searchQuery]);

  // Sync articlesCardsVisible array size with articlesToDisplay
  useEffect(() => {
    const articlesCount = featuredPosts.length > 0 ? featuredPosts.length : fallbackArticles.length;
    setArticlesCardsVisible(prev => {
      if (prev.length === articlesCount) return prev;
      return new Array(articlesCount).fill(false);
    });
  }, [featuredPosts.length]);


  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Header Section */}
      <section
        ref={heroRef}
        id="blog-hero"
        className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-[#0c1636] to-[#3d2b87]"
      >
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        />
        {/* Enhanced overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c1636]/80 via-[#6958c2]/40 to-[#0c1636]/80"></div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1
            className={`text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg transition-all duration-700 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            NirmalTax Blog
          </h1>
          <p
            className={`text-lg md:text-xl text-white/90 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Your Trusted Guide to Tax, Compliance & Finance
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section
        ref={introRef}
        className={`py-16 bg-white transition-all duration-700 ${
          introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to the NirmalTax Knowledge Hub — where clarity meets expertise. We simplify taxation, compliance, and finance with accurate, actionable insights.
          </p>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div
              ref={articlesHeaderRef}
              className={`text-center mb-10 transition-all duration-700 ${
                articlesHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0c1636] mb-3">
                {searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'Featured Articles'}
              </h2>
              <p className="text-gray-600 text-lg">
                {postsToDisplay.length > 0
                  ? `Showing ${postsToDisplay.length} article${postsToDisplay.length !== 1 ? 's' : ''}`
                  : 'Discover expert insights on tax, compliance, and finance'}
              </p>
            </div>

            {/* Search & Filter Bar */}
            <div className="mb-10">
              {/* Search */}
              <div className="relative max-w-xl mx-auto mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#6958c2] focus:border-[#6958c2] transition shadow-sm outline-none"
                />
              </div>
              {/* Category Chips */}
              <div className="flex justify-center gap-2 flex-wrap">
                {uniqueCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm shadow-sm transition-all border ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-[#6958c2] to-[#011441] text-white shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#6958c2]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {postsError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center mb-6">
                {postsError}
              </div>
            )}

            {postsLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6958c2]"></div>
                <span className="ml-4 text-gray-600">Loading articles...</span>
              </div>
            ) : postsToDisplay.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery 
                    ? `No articles match "${searchQuery}". Try a different search term.`
                    : 'No articles available in this category yet.'}
                </p>
                {(searchQuery || selectedCategory !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#6958c2] to-[#011441] text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postsToDisplay.map((post, index) => (
                  <div
                    key={post.id}
                    ref={(el) => {
                      if (index < articlesCardRefs.current.length) {
                        articlesCardRefs.current[index] = el;
                      }
                    }}
                    className={`transition-all duration-700 ${
                      articlesCardsVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="bg-white shadow-lg border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                      <BlogPostCard post={post} onReadMore={handleReadMore} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Post Modal */}
      <BlogPostModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Write to Us Section */}
      <section
        ref={writeToUsRef}
        className={`py-20 bg-gradient-to-br from-gray-50 to-white transition-all duration-700 ${
          writeToUsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#011441] mb-3">
            Have a Question or Topic Suggestion?
          </h2>
          <p className="text-gray-600 mb-8">
            We're here to help! Contact us anytime via email or WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:canirmal2024@gmail.com"
              className="flex items-center gap-3 bg-white hover:bg-gray-50 px-6 py-3 rounded-lg border border-gray-300 hover:border-[#6958c2] text-gray-700 hover:text-[#6958c2] transition shadow-sm"
            >
              <Mail size={20} />
              <span>canirmal2024@gmail.com</span>
            </a>
            <a
              href="https://wa.me/917439935011"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white hover:bg-gray-50 px-6 py-3 rounded-lg border border-gray-300 hover:border-[#6958c2] text-gray-700 hover:text-[#6958c2] transition shadow-sm"
            >
              <MessageCircle size={20} />
              <span>+91 74399 35011</span>
            </a>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section
        ref={closingRef}
        className={`py-20 bg-gradient-to-r from-[#f8f9ff] to-[#f0f2ff] transition-all duration-700 ${
          closingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-[#0c1636] mb-4">
            Knowledge for All. Clarity for Everyone.
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            The NirmalTax Blog empowers individuals and businesses with pure, precise, and practical financial knowledge.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}