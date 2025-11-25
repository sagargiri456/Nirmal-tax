import { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../types/blog';

interface BlogPostCardProps {
  post: BlogPost;
  onReadMore: (post: BlogPost) => void;
}

export default function BlogPostCard({ post, onReadMore }: BlogPostCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Calculate reading time (average 200 words per minute)
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

  return (
    <article className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-[#6958c2]/50 transition-all duration-300 overflow-hidden group h-full flex flex-col">
      {/* Cover Image */}
      {post.cover_image_url && !imageError ? (
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      ) : (
        <div className="h-48 w-full bg-gradient-to-br from-[#6958c2] to-[#011441] flex items-center justify-center">
          <span className="text-white text-4xl font-bold opacity-50">
            {post.category.charAt(0)}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-[#6958c2] bg-[#6958c2]/10 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#011441] mb-3 group-hover:text-[#6958c2] transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.summary}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(post.created_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Read More Button */}
        <button
          onClick={() => onReadMore(post)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6958c2] hover:text-[#011441] transition-colors group/btn"
        >
          <span>Read Article</span>
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}

