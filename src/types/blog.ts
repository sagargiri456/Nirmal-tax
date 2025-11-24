export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
};


