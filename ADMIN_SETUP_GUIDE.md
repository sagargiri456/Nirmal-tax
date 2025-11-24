# Admin Panel Setup Guide

## 🚀 Quick Start

### Step 1: Run Database Migration

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor** → **New Query**
4. Copy and paste the contents of `supabase/migrations/20241124000000_create_blogs_and_admin.sql`
5. Click **Run**

This creates:
- ✅ `blogs` table
- ✅ Storage bucket for images
- ✅ Security policies (RLS)

### Step 2: Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - **Email**: your-admin-email@example.com
   - **Password**: (choose a strong password)
4. Click **Create User**

**Note**: Save these credentials - you'll use them to log in!

### Step 3: Configure Environment Variables

Make sure your `.env` file has:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from: **Supabase Dashboard** → **Project Settings** → **API**

### Step 4: Start the App

```bash
npm run dev
```

### Step 5: Access Admin Panel

1. Visit: `http://localhost:5173/admin/login`
2. Log in with the admin credentials you created
3. You'll be redirected to the dashboard

---

## 📋 Admin Panel Features

### Dashboard (`/admin/dashboard`)
- Overview statistics (total blogs, published, drafts)
- Recent blog posts list
- Quick actions

### Blog Management (`/admin/blogs`)
- Create new blog posts
- Edit existing posts
- Publish/unpublish posts
- Delete posts
- Upload cover images

### Future Features (Coming Soon)
- Analytics
- User management
- Settings

---

## 🔐 Authentication Flow

```
User visits /admin/login
    ↓
Enters email & password
    ↓
Supabase authenticates
    ↓
Session created & stored
    ↓
Redirect to /admin/dashboard
    ↓
Protected routes check authentication
    ↓
If not authenticated → redirect to /admin/login
```

---

## 🛡️ Security Features

- **Protected Routes**: All admin pages require authentication
- **Session Management**: Automatic session refresh
- **Secure Storage**: Passwords never stored in frontend
- **RLS Policies**: Database-level security
- **Auto Logout**: Session expires after inactivity

---

## 📝 Creating Your First Blog Post

1. Log in to admin panel
2. Click **"Blog Posts"** in sidebar
3. Fill out the form:
   - **Title**: Your blog post title
   - **Slug**: Auto-generated (or customize)
   - **Summary**: Short description
   - **Category**: Select from dropdown
   - **Content**: Full article content
   - **Cover Image**: Upload or enter URL
   - **Published**: Toggle to publish
4. Click **"Publish blog post"**

---

## 🎨 Admin Panel Structure

```
/admin
├── /login          → Login page (public)
├── /dashboard      → Main dashboard (protected)
└── /blogs          → Blog management (protected)
```

**Future routes** (ready for expansion):
- `/admin/analytics` → Analytics dashboard
- `/admin/users` → User management
- `/admin/settings` → Settings

---

## 🔧 Customization

### Adding New Admin Features

1. Create new page in `src/pages/Admin[Feature]Page.tsx`
2. Add route in `src/App.tsx`:
   ```tsx
   <Route
     path="/admin/your-feature"
     element={
       <ProtectedRoute>
         <AdminYourFeaturePage />
       </ProtectedRoute>
     }
   />
   ```
3. Add menu item in `src/components/AdminLayout.tsx`

### Changing Admin Permissions

Edit `src/contexts/AuthContext.tsx` to customize the `isAdmin` check:

```typescript
// Example: Check user metadata
const isAdmin = user?.user_metadata?.role === 'admin';
```

---

## 🐛 Troubleshooting

### "Failed to sign in"
- Check email/password are correct
- Verify user exists in Supabase Authentication
- Check browser console for errors

### "Access Denied"
- User must be authenticated
- Check Supabase RLS policies
- Verify environment variables

### Can't Upload Images
- Check storage bucket exists
- Verify storage policies
- Check file size (< 5MB)

### Session Expired
- Log in again
- Check Supabase auth settings
- Verify session persistence is enabled

---

## 📞 Support

For issues:
- Email: canirmal2024@gmail.com
- WhatsApp: +91 74399 35011

---

**Ready to go!** 🎉 Start creating blog posts and managing your content!

