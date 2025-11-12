# Git Push Guide - Handling Large Image Files

## Problem
Large image files in git history make pushing to GitHub very slow.

## Solution

### Option 1: Commit Optimized Images (Recommended)
The images have been optimized (reduced from 62MB to 1.36MB). You need to commit them:

```powershell
# Stage optimized images
git add src/assets/

# Commit them
git commit -m "Optimize images: reduce file sizes for faster deployment"

# Push (should be much faster now)
git push
```

Or use the helper script:
```powershell
.\commit-optimized-images.ps1
```

### Option 2: If Large Files Are Already in Commits
If your recent commits contain large files, you have two options:

#### A. Amend the Last Commit (if it's the most recent)
```powershell
git add src/assets/
git commit --amend --no-edit
git push --force-with-lease
```

#### B. Create a New Commit (safer)
```powershell
git add src/assets/
git commit -m "Optimize images: reduce file sizes"
git push
```

### Option 3: Use Git LFS for Future Large Files (Optional)
If you expect to add large files in the future, consider Git LFS:

```powershell
# Install Git LFS (if not already installed)
# Then track large files:
git lfs track "*.jpg"
git lfs track "*.png"
git add .gitattributes
git commit -m "Add Git LFS tracking for images"
```

## Prevention
- Images are now automatically optimized before build (via `prebuild` script)
- Always run `npm run optimize-images` before committing new images
- The optimization script resizes and compresses images automatically

## Current Status
- ✅ Images optimized: 62.67 MB → 1.36 MB (97.8% reduction)
- ✅ Optimization runs automatically before build
- ⚠️ Need to commit optimized images to git

