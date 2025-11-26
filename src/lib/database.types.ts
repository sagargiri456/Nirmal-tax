export interface Database {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          summary: string;
          content: string;
          category: string;
          cover_image_url: string | null;
          published: boolean;
          created_at: string;
          updated_at: string | null;
          author: string | null;
          read_time: string | null;
          image: string | null;
          excerpt: string | null;
          featured: boolean | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          summary: string;
          content: string;
          category: string;
          cover_image_url?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string | null;
          author?: string | null;
          read_time?: string | null;
          image?: string | null;
          excerpt?: string | null;
          featured?: boolean | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          summary?: string;
          content?: string;
          category?: string;
          cover_image_url?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string | null;
          author?: string | null;
          read_time?: string | null;
          image?: string | null;
          excerpt?: string | null;
          featured?: boolean | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}


