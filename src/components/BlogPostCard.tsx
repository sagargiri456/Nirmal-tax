import { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../types/blog';

interface BlogPostCardProps {
  post: BlogPost;
  onReadMore: (post: BlogPost) => void;
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ');

export default function BlogPostCard({ post, onReadMore }: BlogPostCardProps) {
  const [imageError, setImageError] = useState(false);

  const plainTextContent = stripHtml(post.content);
  const wordCount = plainTextContent.trim() ? plainTextContent.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:border-[#6958c2]/50 hover:shadow-2xl">
      {post.cover_image_url && !imageError ? (
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-[#6958c2] to-[#011441]">
          <span className="text-4xl font-bold text-white opacity-50">{post.category.charAt(0)}</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3">
          <span className="inline-block rounded-full bg-[#6958c2]/10 px-3 py-1 text-xs font-semibold text-[#6958c2]">
            {post.category}
          </span>
        </div>

        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-[#011441] transition-colors group-hover:text-[#6958c2]">
          {post.title}
        </h3>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">{post.summary}</p>

        <div className="mb-4 flex items-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(post.created_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{readingTime} min read</span>
          </div>
        </div>

        <button
          onClick={() => onReadMore(post)}
          className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-[#6958c2] transition-colors hover:text-[#011441]"
        >
          <span>Read Article</span>
          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </article>
  );
}

