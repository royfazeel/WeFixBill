const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgContent = fs.readFileSync('./public/favicon.svg');

async function generateFavicons() {
  // Generate PNG versions
  const sizes = [16, 32, 48, 64, 128, 180, 192, 512];
  
  for (const size of sizes) {
    await sharp(svgContent)
      .resize(size, size)
      .png()
      .toFile(`./public/favicon-${size}x${size}.png`);
    console.log(`Generated favicon-${size}x${size}.png`);
  }

  // Generate apple-touch-icon
  await sharp(svgContent)
    .resize(180, 180)
    .png()
    .toFile('./public/apple-touch-icon.png');
  console.log('Generated apple-touch-icon.png');

  // Generate favicon.ico (using 32x32 PNG as base)
  await sharp(svgContent)
    .resize(32, 32)
    .toFormat('png')
    .toFile('./public/favicon.png');
  console.log('Generated favicon.png');

  console.log('All favicons generated!');
}

generateFavicons().catch(console.error);
