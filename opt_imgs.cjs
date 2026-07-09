const cp = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

// Optimizando poster hero
cp.execSync('"' + ffmpeg + '" -y -i "public/via-hero-poster.jpg" -vf scale=1280:-1 -q:v 5 "public/via-hero-poster-opt.jpg"', {stdio: 'inherit'});

const fs = require('fs');
fs.renameSync('public/via-hero-poster-opt.jpg', 'public/via-hero-poster.jpg');

// Opcional: Optimizando imagens do mosaico (apenas as primeiras)
const moodboardDir = 'public/moodboard';
const files = fs.readdirSync(moodboardDir).filter(f => f.endsWith('.png'));

files.forEach(file => {
  const inPath = `${moodboardDir}/${file}`;
  const outPath = `${moodboardDir}/${file.replace('.png', '.webp')}`;
  console.log(`Optimizing ${file}...`);
  try {
    cp.execSync(`"${ffmpeg}" -y -i "${inPath}" -vf scale=600:-1 -c:v libwebp -quality 80 "${outPath}"`, {stdio: 'inherit'});
  } catch (err) {
    console.error(`Failed to optimize ${file}`, err);
  }
});
