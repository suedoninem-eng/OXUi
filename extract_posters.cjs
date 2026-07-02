const cp = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

console.log('Extracting hero poster...');
cp.execSync(`"${ffmpeg}" -y -i "public/via-hero-bg.mp4" -vframes 1 -q:v 2 "public/via-hero-poster.jpg"`, {stdio: 'inherit'});

console.log('Extracting ecosystem poster...');
try {
  cp.execSync(`"${ffmpeg}" -y -i "public/conteudospaginaia/videofundo2/videocoluna2.mp4" -vframes 1 -q:v 2 "public/conteudospaginaia/videofundo2/videocoluna2-poster.jpg"`, {stdio: 'inherit'});
} catch(e) {}
console.log('Done!');
