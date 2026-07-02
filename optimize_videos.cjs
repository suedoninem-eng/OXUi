const cp = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

console.log('Optimizing via-hero-bg.mp4...');
cp.execSync(`"${ffmpeg}" -y -i "public/via-hero-bg.mp4" -c copy -movflags faststart "public/via-hero-bg-fast.mp4"`, {stdio: 'inherit'});

console.log('Optimizing videocoluna2.mp4...');
cp.execSync(`"${ffmpeg}" -y -i "public/conteudospaginaia/videofundo2/videocoluna2.mp4" -c copy -movflags faststart "public/conteudospaginaia/videofundo2/videocoluna2-fast.mp4"`, {stdio: 'inherit'});

const fs = require('fs');
fs.renameSync('public/via-hero-bg-fast.mp4', 'public/via-hero-bg.mp4');
fs.renameSync('public/conteudospaginaia/videofundo2/videocoluna2-fast.mp4', 'public/conteudospaginaia/videofundo2/videocoluna2.mp4');

console.log('Done!');
