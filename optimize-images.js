const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminWebp = require('imagemin-webp');
const path = require('path');
const fs = require('fs');

async function optimizeImages() {
  const inputDir = 'src/assets';
  const outputDir = 'src/assets/optimized';
  
  // Create optimized directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Optimizing images...');
  
  // Optimize JPEG images
  const jpegFiles = await imagemin([`${inputDir}/*.jpg`], {
    destination: outputDir,
    plugins: [
      imageminMozjpeg({
        quality: 80, // Good balance between quality and file size
      })
    ]
  });

  // Create WebP versions for better compression
  const webpFiles = await imagemin([`${inputDir}/*.jpg`], {
    destination: outputDir,
    plugins: [
      imageminWebp({
        quality: 80
      })
    ]
  });

  console.log(`Optimized ${jpegFiles.length} JPEG files`);
  console.log(`Created ${webpFiles.length} WebP files`);
  
  // Show file sizes
  jpegFiles.forEach(file => {
    const sizeMB = (file.data.length / (1024 * 1024)).toFixed(2);
    console.log(`  ${path.basename(file.sourcePath)}: ${sizeMB} MB`);
  });
}

optimizeImages().catch(console.error);

