const cp = require('child_process');
const fs = require('fs');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

const heroVideo = "public/conteudospaginaia/0701 (1).webm";
const optVideo = "public/conteudospaginaia/0701_superopt.mp4";

console.log("Comprimindo video hero de forma agressiva...");
// Resolução menor (480p), CRF bem alto para máxima compressão (35)
cp.execSync(`"${ffmpeg}" -y -i "${heroVideo}" -vf scale=854:-2 -c:v libx264 -crf 35 -preset veryfast -movflags +faststart "${optVideo}"`, {stdio: 'inherit'});
console.log("Concluído. Tamanho final reduzido para melhor LCP.");
