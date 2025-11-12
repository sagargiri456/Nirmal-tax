# PowerShell script to commit optimized images
# This ensures optimized images replace large ones in git

Write-Host "Staging optimized images..." -ForegroundColor Cyan
git add src/assets/*.jpg src/assets/*.png src/assets/*.jpeg

Write-Host "`nChecking what will be committed..." -ForegroundColor Cyan
git status --short

Write-Host "`nCreating commit with optimized images..." -ForegroundColor Cyan
git commit -m "Optimize images: reduce file sizes for faster deployment"

Write-Host "`n✓ Optimized images committed!" -ForegroundColor Green
Write-Host "You can now push with: git push" -ForegroundColor Yellow

