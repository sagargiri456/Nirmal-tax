import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Edit3, RefreshCw, Search, Trash2, Upload } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import RichTextEditor from '../components/RichTextEditor';
import { useBlogContext } from '../contexts/BlogContext';
import type { Blog } from '../types/blog';

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

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

type BlogFormState = {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
};

const initialFormState: BlogFormState = {
  title: '',
  slug: '',
  summary: '',
  category: categoryOptions[0],
  content: '',
  coverImageUrl: '',
  published: true,
};

const AdminBlogPage = () => {
  const { blogs, loading, error, addBlog, updateBlog, deleteBlog } = useBlogContext();
  const [formState, setFormState] = useState<BlogFormState>(initialFormState);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const isEditing = Boolean(formState.id);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    const query = searchQuery.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.summary.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        blog.slug.toLowerCase().includes(query)
    );
  }, [blogs, searchQuery]);

  const handleInput =
    (field: keyof BlogFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleTitleChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      title: value,
      slug: prev.id ? prev.slug : slugify(value),
    }));
  };

  const handleSlugChange = (value: string) => {
    setFormState((prev) => ({ ...prev, slug: slugify(value) }));
  };

  const handleContentChange = (value: string) => {
    setFormState((prev) => ({ ...prev, content: value }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setSaving(false);
  };

  const buildPayload = () => ({
    title: formState.title.trim(),
    slug: formState.slug.trim(),
    summary: formState.summary.trim(),
    category: formState.category,
    content: formState.content.trim(),
    cover_image_url: formState.coverImageUrl.trim() || null,
    published: formState.published,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (!formState.title || !formState.slug || !formState.summary || !formState.content) {
      setFeedback({ type: 'error', message: 'Title, slug, summary, and content are required.' });
      return;
    }

    try {
      setSaving(true);
      if (isEditing && formState.id) {
        await updateBlog(formState.id, buildPayload());
        setFeedback({ type: 'success', message: 'Blog post updated successfully.' });
      } else {
        await addBlog(buildPayload());
        setFeedback({ type: 'success', message: 'Blog post published successfully.' });
      }
      resetForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to save blog.';
      setFeedback({ type: 'error', message });
      setSaving(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setFormState({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      summary: blog.summary,
      category: blog.category,
      content: blog.content,
      coverImageUrl: blog.cover_image_url ?? '',
      published: blog.published,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTogglePublished = async (blog: Blog) => {
    try {
      await updateBlog(blog.id, { published: !blog.published });
      setFeedback({
        type: 'success',
        message: `Blog ${blog.published ? 'moved to drafts' : 'published'} successfully.`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to update blog.';
      setFeedback({ type: 'error', message });
    }
  };

  const handleDelete = async (blog: Blog) => {
    const confirmed = window.confirm(`Delete "${blog.title}"? This action cannot be undone.`);
    if (!confirmed) return;
    try {
      await deleteBlog(blog.id);
      setFeedback({ type: 'success', message: 'Blog deleted successfully.' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to delete blog.';
      setFeedback({ type: 'error', message });
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-2xl bg-gradient-to-r from-[#011441] to-[#6958c2] p-8 text-white shadow-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">Admin · Blogs</p>
          <h1 className="mt-3 text-3xl font-bold">Admin Blog Console</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">
            Publish rich, SEO-friendly insights. Draft, edit, and curate content that keeps NirmalTax readers informed.
          </p>
        </header>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-[#011441]">
                {isEditing ? 'Update Blog Post' : 'Create New Blog Post'}
              </h2>
              <p className="text-sm text-gray-500">
                {isEditing ? 'Editing existing article' : 'Fill in the details to publish a new article'}
              </p>
            </div>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#6958c2]"
              >
                <RefreshCw size={16} />
                Reset form
              </button>
            )}
          </div>

          {feedback && (
            <div
              className={`mx-6 mt-6 rounded-xl border px-4 py-3 text-sm ${
                feedback.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {feedback.message}
            </div>
          )}
          {error && (
            <div className="mx-6 mt-6 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formState.title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  placeholder="Ex: 5 Common Mistakes to Avoid While Filing ITR"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-[#6958c2] focus:ring-2 focus:ring-[#6958c2]/20"
                  required
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Slug (URL) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formState.slug}
                    onChange={(event) => handleSlugChange(event.target.value)}
                    placeholder="5-common-mistakes-to-avoid"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-[#6958c2] focus:ring-2 focus:ring-[#6958c2]/20"
                    required
                  />
                  <p className="mt-2 text-xs text-gray-500">Used in public blog URLs.</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Category</label>
                  <select
                    value={formState.category}
                    onChange={(event) => setFormState((prev) => ({ ...prev, category: event.target.value }))}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm transition focus:border-[#6958c2] focus:ring-2 focus:ring-[#6958c2]/20"
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
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formState.summary}
                  onChange={handleInput('summary')}
                  rows={3}
                  placeholder="Short teaser for previews and cards."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-[#6958c2] focus:ring-2 focus:ring-[#6958c2]/20"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Rich Content <span className="text-red-500">*</span>
                </label>
                <RichTextEditor value={formState.content} onChange={handleContentChange} placeholder="Start writing your blog content..." />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Cover Image URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={formState.coverImageUrl}
                    onChange={handleInput('coverImageUrl')}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-[#6958c2] focus:ring-2 focus:ring-[#6958c2]/20"
                  />
                  <Upload size={18} className="text-gray-400" />
                </div>
                <p className="mt-2 text-xs text-gray-500">Paste a publicly accessible image URL.</p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={formState.published}
                    onChange={(event) => setFormState((prev) => ({ ...prev, published: event.target.checked }))}
                    className="h-5 w-5 rounded border-gray-300 text-[#6958c2] focus:ring-[#6958c2]"
                  />
                  Publish immediately
                </label>
                <p className="mt-2 text-xs text-gray-600">
                  {formState.published
                    ? 'Visible on the public blog as soon as you save it.'
                    : 'Save as draft and publish later.'}
                </p>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6958c2] to-[#011441] px-4 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    <span>{isEditing ? 'Updating article…' : 'Publishing article…'}</span>
                  </>
                ) : (
                  <span>{isEditing ? 'Save Changes' : 'Publish Blog'}</span>
                )}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-[#011441]">Existing Articles</h2>
              <p className="text-sm text-gray-500">
                {blogs.length} total · showing {filteredBlogs.length}
              </p>
            </div>
            <div className="relative w-full max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 pl-9 pr-4 py-2 text-sm focus:border-[#6958c2] focus:bg-white focus:ring-2 focus:ring-[#6958c2]/10"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-[#6958c2]/20 border-t-[#6958c2]" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-16 text-center text-gray-500">No articles found. Create a new post to get started.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredBlogs.map((blog) => (
                <article key={blog.id} className="flex flex-col gap-6 px-6 py-5 md:flex-row md:items-center">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#6958c2]">
                      <span className="rounded-full bg-[#6958c2]/10 px-3 py-1">{blog.category}</span>
                      <span
                        className={`rounded-full px-3 py-1 ${
                          blog.published ? 'bg-emerald-50 text-emerald-700' : 'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-[#011441]">{blog.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{blog.summary}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span>Slug: /{blog.slug}</span>
                      <span>Created: {new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleTogglePublished(blog)}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-[#6958c2] hover:text-[#6958c2]"
                    >
                      {blog.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEdit(blog)}
                      className="inline-flex items-center gap-1 rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(blog)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogPage;


