import { useEffect } from 'react';
import { X, Calendar, Clock, Share2 } from 'lucide-react';
import type { BlogPost } from '../types/blog';

interface BlogPostModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ');

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
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div
          className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white"
          >
            <X size={24} className="text-gray-700" />
          </button>

          {post.cover_image_url && (
            <div className="relative h-64 w-full overflow-hidden md:h-80">
              <img src={post.cover_image_url} alt={post.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          <div className="p-6 md:p-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <span className="inline-block rounded-full bg-[#6958c2]/10 px-4 py-2 text-sm font-semibold text-[#6958c2]">
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
                  className="flex items-center gap-1 transition-colors hover:text-[#6958c2]"
                  title="Share article"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <h1 className="mb-6 text-3xl font-bold leading-tight text-[#011441] md:text-4xl">{post.title}</h1>

            <p className="mb-8 text-xl leading-relaxed text-gray-600">{post.summary}</p>

            <div className="mb-8 border-t border-gray-200" />

            <div
              className="space-y-4 text-base leading-relaxed text-gray-700 md:text-lg [&_a]:text-[#6958c2] [&_a]:underline [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-semibold [&_img]:h-auto [&_img]:max-w-full"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

