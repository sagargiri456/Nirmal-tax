import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { FileText, Eye, Edit, Plus, LogOut, LayoutDashboard } from 'lucide-react';

export default function AdminDashboardPage() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    recentBlogs: [] as any[],
  });
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  useEffect(() => {
    const fetchStats = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        // Get all blogs
        const { data: allBlogs, error: allError } = await supabase
          .from('blogs')
          .select('*');

        if (allError) throw allError;

        // Get published blogs
        const { data: publishedBlogs, error: publishedError } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true);

        if (publishedError) throw publishedError;

        // Get recent blogs
        const { data: recentBlogs, error: recentError } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (recentError) throw recentError;

        setStats({
          totalBlogs: allBlogs?.length || 0,
          publishedBlogs: publishedBlogs?.length || 0,
          draftBlogs: (allBlogs?.length || 0) - (publishedBlogs?.length || 0),
          recentBlogs: recentBlogs || [],
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6958c2]"></div>
      </div>
    );
  }

  const navigationItems = [
    {
      name: 'Blog Posts',
      path: '/admin/blogs',
      icon: FileText,
      description: 'Create and manage blog articles',
      color: 'blue',
      available: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header with Logout */}
      <div className="bg-gradient-to-r from-[#011441] to-[#6958c2] rounded-xl shadow-lg p-6 sm:p-8 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-white/90 text-sm sm:text-base">
              Welcome back, <span className="font-semibold">{user?.email?.split('@')[0]}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg transition-all duration-200 font-medium backdrop-blur-sm"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-[#011441] flex items-center gap-2">
            <LayoutDashboard size={24} />
            Navigation
          </h2>
          <p className="text-sm text-gray-600 mt-1">Quick access to admin sections</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-600',
              };
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group p-5 border-2 border-gray-200 rounded-lg hover:border-[#6958c2] hover:shadow-md transition-all duration-200 bg-white"
                >
                  <div className={`w-12 h-12 ${colorClasses[item.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-[#011441] mb-1 group-hover:text-[#6958c2] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Blog Posts</p>
              <p className="text-3xl font-bold text-[#011441]">{stats.totalBlogs}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Published</p>
              <p className="text-3xl font-bold text-[#011441]">{stats.publishedBlogs}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Eye className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Drafts</p>
              <p className="text-3xl font-bold text-[#011441]">{stats.draftBlogs}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Edit className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Blog Posts */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#011441]">Recent Blog Posts</h2>
          <Link
            to="/admin/blogs"
            className="text-[#6958c2] hover:text-[#011441] text-sm font-medium"
          >
            View All →
          </Link>
        </div>

        {stats.recentBlogs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 mb-4">No blog posts yet</p>
            <Link
              to="/admin/blogs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6958c2] to-[#011441] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              <Plus size={18} />
              <span>Create Your First Post</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {stats.recentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-[#011441] mb-1">{blog.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{blog.category}</span>
                    <span>•</span>
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        blog.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <Link
                  to="/admin/blogs"
                  className="text-[#6958c2] hover:text-[#011441] font-medium text-sm"
                >
                  Edit →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-[#011441]">Quick Actions</h2>
          <p className="text-sm text-gray-600 mt-1">Common tasks and shortcuts</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/admin/blogs"
              className="flex items-center gap-4 p-5 border-2 border-gray-200 rounded-lg hover:border-[#6958c2] hover:shadow-md transition-all duration-200 bg-white group"
            >
              <div className="bg-blue-100 p-4 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Plus className="text-blue-600" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#011441] mb-1 group-hover:text-[#6958c2] transition-colors">
                  Create Blog Post
                </h3>
                <p className="text-sm text-gray-600">Write and publish a new article</p>
              </div>
            </Link>

            <Link
              to="/blog"
              target="_blank"
              className="flex items-center gap-4 p-5 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all duration-200 bg-white group"
            >
              <div className="bg-green-100 p-4 rounded-lg group-hover:bg-green-200 transition-colors">
                <Eye className="text-green-600" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#011441] mb-1 group-hover:text-green-600 transition-colors">
                  View Public Blog
                </h3>
                <p className="text-sm text-gray-600">See how your blog looks to visitors</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

