import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Background images that need larger dimensions
const backgroundImages = [
  'business-meeting-room-high-rise-office-building.jpg',
  'team-business-people-stacking-hands.jpg',
  'view-downtown-shanghai-china.jpg',
  'tochscreen-documents-with-charts.jpg',
  'guy-shows-document-girl-group-young-freelancers-office-have-conversation-working.jpg',
  'chooseus.jpg'
];

async function optimizeImages() {
  const assetsDir = path.join(__dirname, 'src/assets');
  const optimizedDir = path.join(assetsDir, 'optimized');
  
  // Skip optimized folder
  const files = fs.readdirSync(assetsDir).filter(f => {
    const fullPath = path.join(assetsDir, f);
    const isFile = fs.statSync(fullPath).isFile();
    return isFile && (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
  });
  
  console.log('Optimizing images...\n');
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const file of files) {
    const inputPath = path.join(assetsDir, file);
    const stats = fs.statSync(inputPath);
    const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    totalOriginalSize += stats.size;
    
    console.log(`Processing ${file} (${originalSizeMB} MB)...`);
    
    try {
      const metadata = await sharp(inputPath).metadata();
      const isJpeg = file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg');
      const isPng = file.toLowerCase().endsWith('.png');
      
      // Determine max width based on image type
      const isBackground = backgroundImages.includes(file);
      const maxWidth = isBackground ? 1920 : 800; // Backgrounds: 1920px, icons: 800px
      
      // Create a temporary output path
      const tempPath = inputPath + '.tmp';
      
      // Create a sharp instance
      let sharpInstance = sharp(inputPath);
      
      // Resize if image is larger than max width
      if (metadata.width > maxWidth) {
        sharpInstance = sharpInstance.resize(maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });
        console.log(`  Resizing from ${metadata.width}x${metadata.height} to max ${maxWidth}px width`);
      }
      
      // Apply optimization based on format
      if (isJpeg) {
        await sharpInstance
          .jpeg({ 
            quality: 70, // Lower quality for better compression
            mozjpeg: true,
            progressive: true
          })
          .toFile(tempPath);
      } else if (isPng) {
        await sharpInstance
          .png({ 
            quality: 75, // Lower quality for better compression
            compressionLevel: 9,
            adaptiveFiltering: true
          })
          .toFile(tempPath);
      }
      
      // Replace original with optimized version
      fs.renameSync(tempPath, inputPath);
      
      const newStats = fs.statSync(inputPath);
      const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
      const reduction = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);
      totalOptimizedSize += newStats.size;
      
      console.log(`  ✓ Optimized: ${newSizeMB} MB (${reduction}% reduction)\n`);
    } catch (error) {
      console.error(`  ✗ Error optimizing ${file}:`, error.message);
    }
  }
  
  const totalReduction = (((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1);
  const totalOriginalMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const totalOptimizedMB = (totalOptimizedSize / (1024 * 1024)).toFixed(2);
  
  console.log('='.repeat(50));
  console.log(`Total: ${totalOriginalMB} MB → ${totalOptimizedMB} MB (${totalReduction}% reduction)`);
  console.log('Optimization complete!');
}

optimizeImages().catch(console.error);

