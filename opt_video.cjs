const cp = require('child_process');
const fs = require('fs');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

const heroVideo = "public/conteudospaginaia/0701 (1).webm";
const optVideo = "public/conteudospaginaia/0701_opt.mp4";

console.log("Compressing hero video...");
cp.execSync(`"${ffmpeg}" -y -i "${heroVideo}" -c:v libx264 -crf 28 -preset veryfast -movflags +faststart "${optVideo}"`, {stdio: 'inherit'});
console.log("Done");
