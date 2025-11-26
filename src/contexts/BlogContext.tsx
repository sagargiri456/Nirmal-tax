import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { blogService, type CreateBlogPayload, type UpdateBlogPayload } from '../services/blogService';
import type { Blog } from '../types/blog';

type BlogContextValue = {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  addBlog: (payload: CreateBlogPayload) => Promise<Blog>;
  updateBlog: (id: string, updates: UpdateBlogPayload) => Promise<Blog>;
  deleteBlog: (id: string) => Promise<void>;
  refreshBlogs: () => Promise<void>;
};

const BlogContext = createContext<BlogContextValue | null>(null);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedBlogs = await blogService.getAll();
      setBlogs(fetchedBlogs);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load blogs';
      setError(message);
      console.error('Error loading blogs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBlogs();
  }, [loadBlogs]);

  const addBlog = useCallback(async (payload: CreateBlogPayload) => {
    try {
      setError(null);
      const created = await blogService.create(payload);
      setBlogs((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create blog';
      setError(message);
      throw err;
    }
  }, []);

  const updateBlog = useCallback(async (id: string, updates: UpdateBlogPayload) => {
    try {
      setError(null);
      const updated = await blogService.update(id, updates);
      setBlogs((prev) => prev.map((blog) => (blog.id === id ? updated : blog)));
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update blog';
      setError(message);
      throw err;
    }
  }, []);

  const deleteBlog = useCallback(async (id: string) => {
    try {
      setError(null);
      await blogService.delete(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete blog';
      setError(message);
      throw err;
    }
  }, []);

  const value = useMemo(
    () => ({
      blogs,
      loading,
      error,
      addBlog,
      updateBlog,
      deleteBlog,
      refreshBlogs: loadBlogs,
    }),
    [addBlog, blogs, deleteBlog, error, loadBlogs, loading, updateBlog]
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }

  return context;
};


