import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImages() {
  const assetsDir = path.join(__dirname, 'src/assets');
  const files = fs.readdirSync(assetsDir).filter(f => 
    f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')
  );
  
  console.log('Optimizing images...\n');
  
  for (const file of files) {
    const inputPath = path.join(assetsDir, file);
    const stats = fs.statSync(inputPath);
    const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`Processing ${file} (${originalSizeMB} MB)...`);
    
    try {
      const isJpeg = file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg');
      const isPng = file.toLowerCase().endsWith('.png');
      
      if (isJpeg) {
        await sharp(inputPath)
          .jpeg({ 
            quality: 80,
            mozjpeg: true 
          })
          .toFile(inputPath);
      } else if (isPng) {
        await sharp(inputPath)
          .png({ 
            quality: 80,
            compressionLevel: 9
          })
          .toFile(inputPath);
      }
      
      const newStats = fs.statSync(inputPath);
      const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
      const reduction = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);
      
      console.log(`  ✓ Optimized: ${newSizeMB} MB (${reduction}% reduction)\n`);
    } catch (error) {
      console.error(`  ✗ Error optimizing ${file}:`, error.message);
    }
  }
  
  console.log('Optimization complete!');
}

optimizeImages().catch(console.error);

