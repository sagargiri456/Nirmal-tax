export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at?: string | null;
  author?: string | null;
  read_time?: string | null;
  image?: string | null;
  excerpt?: string | null;
  featured?: boolean | null;
}

export type BlogPost = Blog;

