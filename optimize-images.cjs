const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const assetsDir = 'src/assets';
  const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
  
  console.log('Optimizing images...\n');
  
  for (const file of files) {
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(assetsDir, file.replace(/\.(jpg|jpeg)$/i, '_optimized.jpg'));
    
    const stats = fs.statSync(inputPath);
    const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`Processing ${file} (${originalSizeMB} MB)...`);
    
    try {
      await sharp(inputPath)
        .jpeg({ 
          quality: 80,
          mozjpeg: true 
        })
        .toFile(outputPath);
      
      const newStats = fs.statSync(outputPath);
      const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
      const reduction = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);
      
      console.log(`  ✓ Optimized: ${newSizeMB} MB (${reduction}% reduction)`);
      
      // Replace original with optimized
      fs.unlinkSync(inputPath);
      fs.renameSync(outputPath, inputPath);
      console.log(`  ✓ Replaced original file\n`);
    } catch (error) {
      console.error(`  ✗ Error optimizing ${file}:`, error.message);
    }
  }
  
  console.log('Optimization complete!');
}

optimizeImages().catch(console.error);
