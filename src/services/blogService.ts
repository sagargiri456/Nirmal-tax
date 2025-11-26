import { type SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { Database } from '../lib/database.types';
import type { Blog } from '../types/blog';

type BlogRow = Database['public']['Tables']['blogs']['Row'];
type BlogInsert = Database['public']['Tables']['blogs']['Insert'];
type BlogUpdate = Database['public']['Tables']['blogs']['Update'];

export type CreateBlogPayload = Omit<BlogInsert, 'id' | 'created_at' | 'updated_at'>;
export type UpdateBlogPayload = BlogUpdate;

const mapRowToBlog = (row: BlogRow): Blog => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  summary: row.summary,
  content: row.content,
  category: row.category,
  cover_image_url: row.cover_image_url,
  published: row.published,
  created_at: row.created_at,
  updated_at: row.updated_at ?? undefined,
  author: row.author ?? undefined,
  read_time: row.read_time ?? undefined,
  image: row.image ?? undefined,
  excerpt: row.excerpt ?? undefined,
  featured: row.featured ?? undefined,
});

const ensureClient = (): SupabaseClient<Database> => {
  if (!supabase) {
    throw new Error('Supabase client is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
};

export const blogService = {
  async getAll(): Promise<Blog[]> {
    const client = ensureClient();
    const { data, error } = await client
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch blogs: ${error.message}`);
    }

    const rows = (data ?? []) as BlogRow[];
    return rows.map(mapRowToBlog);
  },

  async getById(id: string): Promise<Blog | null> {
    const client = ensureClient();
    const { data, error } = await client.from('blogs').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch blog: ${error.message}`);
    }

    return data ? mapRowToBlog(data as BlogRow) : null;
  },

  async create(payload: CreateBlogPayload): Promise<Blog> {
    const client = ensureClient();
    const { data, error } = await client.from('blogs').insert(payload as BlogInsert).select().single();

    if (error) {
      throw new Error(`Failed to create blog: ${error.message}`);
    }

    return mapRowToBlog(data as BlogRow);
  },

  async update(id: string, updates: UpdateBlogPayload): Promise<Blog> {
    const client = ensureClient();
    const { data, error } = await client
      .from('blogs')
      .update(updates as BlogUpdate)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update blog: ${error.message}`);
    }

    return mapRowToBlog(data as BlogRow);
  },

  async delete(id: string): Promise<void> {
    const client = ensureClient();
    const { error } = await client.from('blogs').delete().eq('id', id);

    if (error) {
      throw new Error(`Failed to delete blog: ${error.message}`);
    }
  },
};


