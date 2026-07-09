const cp = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;
console.log("Converting poster...");
cp.execSync(`"${ffmpeg}" -y -i public/via-hero-poster.jpg -vcodec libwebp -quality 40 public/via-hero-poster.webp`, { stdio: 'inherit' });
console.log("Done!");
