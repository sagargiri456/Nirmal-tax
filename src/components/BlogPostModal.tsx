import { useEffect } from 'react';
import { X, Calendar, Clock, Share2 } from 'lucide-react';
import type { BlogPost } from '../types/blog';

interface BlogPostModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogPostModal({ post, isOpen, onClose }: BlogPostModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !post) return null;

  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.summary,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
          >
            <X size={24} className="text-gray-700" />
          </button>

          {/* Cover Image */}
          {post.cover_image_url && (
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Category & Meta */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <span className="inline-block px-4 py-2 text-sm font-semibold text-[#6958c2] bg-[#6958c2]/10 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{readingTime} min read</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 hover:text-[#6958c2] transition-colors"
                  title="Share article"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#011441] mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Summary */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.summary}
            </p>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-8"></div>

            {/* Content */}
            <div className="text-gray-700 leading-relaxed space-y-4">
              {post.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-base md:text-lg">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

