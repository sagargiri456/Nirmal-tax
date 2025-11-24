Nirmal-tax
================

## Blog admin workspace

The `/admin/blogs` route lets internal users create, publish, and manage blog posts that feed the public `/blog` page. The form supports uploading a cover image (stored in Supabase Storage) or pasting an external image URL, and it automatically handles slug creation.

### Supabase configuration

Create a `.env` file with the following variables so that the app can connect to Supabase:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Restart `npm run dev` after setting the env values.

### Database schema

Create a `blogs` table with Row Level Security enabled and policies that allow inserts/updates for authenticated (or anon) clients you trust. A minimal schema:

```sql
create table blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  summary text not null,
  content text not null,
  category text not null,
  cover_image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
```

### Storage bucket

Create a storage bucket named `blog-images` (or update `BLOG_IMAGE_BUCKET` in `AdminBlogPage.tsx`) and add a policy allowing uploads/reads from the role you use in the frontend. Uploaded files are stored under `covers/<slug>-timestamp.ext`.

Once the tables and env vars exist, the admin console will publish entries that immediately appear on the public blog list.
