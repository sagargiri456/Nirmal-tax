import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../lib/supabaseClient';
import type { BlogPost } from '../types/blog';

type FormState = {
  title: string;
  slug: string;
  summary: string;
  category: string;
  content: string;
  coverImageFile: File | null;
  coverImageUrl: string;
  published: boolean;
};

const categoryOptions = [
  'Income Tax',
  'GST & Indirect Tax',
  'Audit & ROC Compliance',
  'Startup & Business Registration',
  'Payroll & Labour Law',
  'Finance, Loans & Banking',
  'Tax Notices & Litigation',
  'Personal Finance & Planning',
];

const initialFormState: FormState = {
  title: '',
  slug: '',
  summary: '',
  category: categoryOptions[0],
  content: '',
  coverImageFile: null,
  coverImageUrl: '',
  published: true,
};

const BLOG_IMAGE_BUCKET = 'blog-images';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export default function AdminBlogPage() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [slugTouched, setSlugTouched] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [savingBlog, setSavingBlog] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);

  const isSupabaseReady = useMemo(() => Boolean(supabase), []);

  useEffect(() => {
    if (!isSupabaseReady) {
      setErrorMessage('Supabase is not configured. Add env vars to enable admin.');
      setLoadingBlogs(false);
      return;
    }
    const fetchBlogs = async () => {
      const { data, error } = await supabase!
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setBlogs(data ?? []);
      }
      setLoadingBlogs(false);
    };

    fetchBlogs();
  }, [isSupabaseReady]);

  useEffect(
    () => () => {
      if (coverPreviewUrl) {
        URL.revokeObjectURL(coverPreviewUrl);
      }
    },
    [coverPreviewUrl]
  );

  const handleInputChange = (field: keyof FormState, value: string | boolean | File | null) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (value: string) => {
    handleInputChange('title', value);
    if (!slugTouched) {
      handleInputChange('slug', slugify(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlugTouched(true);
    handleInputChange('slug', slugify(value));
  };

  const handleCoverImageChange = (file: File | null) => {
    if (coverPreviewUrl) {
      URL.revokeObjectURL(coverPreviewUrl);
    }
    handleInputChange('coverImageFile', file);
    setCoverPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setSlugTouched(false);
    if (coverPreviewUrl) {
      URL.revokeObjectURL(coverPreviewUrl);
    }
    setCoverPreviewUrl(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSupabaseReady) {
      setErrorMessage('Supabase env variables missing.');
      return;
    }

    if (!formState.title || !formState.slug || !formState.summary || !formState.content) {
      setErrorMessage('Title, slug, summary, and content are required.');
      return;
    }

    setSavingBlog(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      let coverImageUrl = formState.coverImageUrl.trim() || null;

      if (formState.coverImageFile) {
        const fileExt = formState.coverImageFile.name.split('.').pop() ?? 'jpg';
        const fileName = `${formState.slug}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase!
          .storage.from(BLOG_IMAGE_BUCKET)
          .upload(`covers/${fileName}`, formState.coverImageFile, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase!
          .storage.from(BLOG_IMAGE_BUCKET)
          .getPublicUrl(`covers/${fileName}`);
        coverImageUrl = publicUrlData?.publicUrl ?? null;
      }

      const { data, error } = await supabase!
        .from('blogs')
        .insert({
          title: formState.title.trim(),
          slug: formState.slug.trim(),
          summary: formState.summary.trim(),
          category: formState.category,
          content: formState.content.trim(),
          cover_image_url: coverImageUrl,
          published: formState.published,
        })
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      setBlogs((prev) => (data ? [data, ...prev] : prev));
      setStatusMessage('Blog post saved successfully.');
      resetForm();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save blog.');
    } finally {
      setSavingBlog(false);
    }
  };

  const handlePublishToggle = async (blog: BlogPost) => {
    if (!isSupabaseReady) return;

    const nextPublished = !blog.published;
    const { error } = await supabase!
      .from('blogs')
      .update({ published: nextPublished })
      .eq('id', blog.id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setBlogs((prev) =>
      prev.map((item) => (item.id === blog.id ? { ...item, published: nextPublished } : item))
    );
  };

  const handleDelete = async (blog: BlogPost) => {
    if (!isSupabaseReady) return;

    if (!confirm(`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`)) {
      return;
    }

    // Delete cover image from storage if it exists
    if (blog.cover_image_url) {
      const urlParts = blog.cover_image_url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      if (fileName && fileName.includes('covers/')) {
        const path = `covers/${fileName.split('covers/')[1]}`;
        await supabase!.storage.from(BLOG_IMAGE_BUCKET).remove([path]);
      }
    }

    const { error } = await supabase!.from('blogs').delete().eq('id', blog.id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setBlogs((prev) => prev.filter((item) => item.id !== blog.id));
    setStatusMessage('Blog post deleted successfully.');
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#011441] to-[#6958c2] rounded-xl shadow-lg p-6 sm:p-8 text-white">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Blog Management</h1>
          <p className="text-white/90 text-sm sm:text-base">
            Create, edit, and manage your blog posts
          </p>
        </div>

        {/* Blog Creation Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-[#011441]">Create New Blog Post</h2>
            <p className="text-sm text-gray-600 mt-1">Fill in the details below to publish a new article</p>
          </div>
          
          <div className="p-6">
            {!isSupabaseReady && (
              <div className="mb-6 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 text-sm">
                <p className="font-medium mb-1">⚠️ Configuration Required</p>
                <p>Supabase credentials are missing. Add <code className="bg-yellow-100 px-1 rounded">VITE_SUPABASE_URL</code> and{' '}
                <code className="bg-yellow-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> to your environment to enable this page.</p>
              </div>
            )}
            {errorMessage && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
                <p className="font-medium">❌ Error</p>
                <p>{errorMessage}</p>
              </div>
            )}
            {statusMessage && (
              <div className="mb-6 rounded-lg bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm">
                <p className="font-medium">✅ Success</p>
                <p>{statusMessage}</p>
              </div>
            )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formState.title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6958c2] focus:border-[#6958c2] transition-all shadow-sm hover:shadow-md"
                  placeholder="Ex: 5 Common Mistakes to Avoid..."
                  disabled={!isSupabaseReady}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Slug (URL friendly) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formState.slug}
                    onChange={(event) => handleSlugChange(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6958c2] focus:border-[#6958c2] transition-all shadow-sm hover:shadow-md"
                    placeholder="5-common-mistakes"
                    disabled={!isSupabaseReady}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-generated from title, or customize manually</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formState.category}
                    onChange={(event) => handleInputChange('category', event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6958c2] focus:border-[#6958c2] transition-all shadow-sm hover:shadow-md bg-white"
                    disabled={!isSupabaseReady}
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formState.summary}
                  onChange={(event) => handleInputChange('summary', event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6958c2] focus:border-[#6958c2] transition-all shadow-sm hover:shadow-md resize-y"
                  rows={3}
                  placeholder="Short teaser that will show up in blog cards..."
                  disabled={!isSupabaseReady}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Brief description shown in blog listings</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Article Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formState.content}
                  onChange={(event) => handleInputChange('content', event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6958c2] focus:border-[#6958c2] transition-all shadow-sm hover:shadow-md resize-y font-mono text-sm"
                  rows={12}
                  placeholder="Write your blog post content here... (Markdown or plain text)"
                  disabled={!isSupabaseReady}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Full article content (supports Markdown)</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Cover Image Upload */}
              <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-[#6958c2] transition-colors">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleCoverImageChange(event.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#6958c2] file:text-white hover:file:bg-[#5a4aa3] file:cursor-pointer"
                  disabled={!isSupabaseReady}
                />
                {coverPreviewUrl ? (
                  <div className="mt-4">
                    <img
                      src={coverPreviewUrl}
                      alt="Cover preview"
                      className="rounded-lg w-full object-cover max-h-64 shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleCoverImageChange(null)}
                      className="mt-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mt-3">
                    Optional: Upload an image file (max 5MB) or use URL below
                  </p>
                )}
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={formState.coverImageUrl}
                  onChange={(event) => handleInputChange('coverImageUrl', event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6958c2] focus:border-[#6958c2] transition-all shadow-sm hover:shadow-md"
                  placeholder="https://example.com/image.jpg"
                  disabled={!isSupabaseReady}
                />
                <p className="text-xs text-gray-500 mt-1">Alternative: Paste a direct image URL</p>
              </div>

              {/* Publish Toggle */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="inline-flex items-center gap-3 text-sm font-semibold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.published}
                    onChange={(event) => handleInputChange('published', event.target.checked)}
                    className="w-5 h-5 rounded text-[#6958c2] focus:ring-[#6958c2] focus:ring-2 cursor-pointer"
                    disabled={!isSupabaseReady}
                  />
                  <span>Publish immediately</span>
                </label>
                <p className="text-xs text-gray-600 mt-2 ml-8">
                  {formState.published 
                    ? '✅ This post will be visible on the public blog page' 
                    : '⏸️ This post will be saved as a draft'}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={savingBlog || !isSupabaseReady}
                className="w-full rounded-lg bg-gradient-to-r from-[#6958c2] to-[#011441] text-white font-semibold py-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {savingBlog ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <span>📝</span>
                    <span>Publish Blog Post</span>
                  </>
                )}
              </button>
            </div>
          </form>
          </div>
        </div>

        {/* Existing Blog Posts */}
        <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h2 className="text-2xl font-bold text-[#011441] mb-1">Existing Blog Posts</h2>
            <p className="text-sm text-gray-600">
              Manage your published and draft articles
            </p>
          </div>

          <div className="p-6">
            {loadingBlogs ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#6958c2]"></div>
                <span className="ml-3 text-gray-600">Loading articles...</span>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No blog posts yet</h3>
                <p className="text-gray-500 mb-6">Create your first blog post using the form above!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all bg-white hover:border-[#6958c2]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs uppercase tracking-wide text-[#6958c2] font-bold bg-[#6958c2]/10 px-2 py-1 rounded">
                            {blog.category}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                              blog.published
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                            }`}
                          >
                            {blog.published ? '✅ Published' : '⏸️ Draft'}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#011441] mb-2">{blog.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{blog.summary}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>📅 {new Date(blog.created_at).toLocaleDateString()}</span>
                          {blog.slug && (
                            <span className="text-[#6958c2]">🔗 /{blog.slug}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:min-w-[180px]">
                        <button
                          type="button"
                          onClick={() => handlePublishToggle(blog)}
                          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                            blog.published
                              ? 'bg-yellow-50 text-yellow-700 border border-yellow-300 hover:bg-yellow-100'
                              : 'bg-green-50 text-green-700 border border-green-300 hover:bg-green-100'
                          }`}
                          disabled={!isSupabaseReady}
                        >
                          {blog.published ? '⏸️ Unpublish' : '✅ Publish'}
                        </button>
                        <a
                          href={`/blog#${blog.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg bg-gray-100 text-gray-700 px-4 py-2 text-sm font-semibold hover:bg-gray-200 transition-colors text-center"
                        >
                          👁️ View
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(blog)}
                          className="rounded-lg bg-red-50 text-red-700 border border-red-300 px-4 py-2 text-sm font-semibold hover:bg-red-100 transition-colors"
                          disabled={!isSupabaseReady}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </article>
              ))}
            </div>
          )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}


