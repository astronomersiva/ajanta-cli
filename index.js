#!/usr/bin/env node

const {
  inputDir = process.cwd(),
  resolutions,
  webp = true,
} = process.env;

const { promisify } = require('util');

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pixelate = promisify(require('node-pixelate'));

const images = fs.readdirSync(inputDir)
  .filter(file => ['.png', '.jpeg', '.jpg', '.gif', '.webp'].includes(path.extname(file)));

images.forEach(async (image) => {
  const imageType = path.extname(image);
  image = path.join(inputDir, image);
  let fileName = path.basename(image, imageType);
  fileName = path.join(inputDir, fileName);

  if (resolutions) {
    resolutions.split(',').forEach(async (resolution) => {
      resolution = Number(resolution);
      const resizedImage = await sharp(image).resize(resolution);

      if (webp) {
        await resizedImage.toFile(`${fileName}-${resolution}.webp`);
      }

      await resizedImage.toFile(`${fileName}-${resolution}${imageType}`);
    });
  }

  const smallImage = await sharp(image).resize(100).toBuffer();
  const pixelatedImage = await pixelate(smallImage, { scale: 0.85 });
  fs.writeFileSync(`${fileName}-pixelated${imageType}`, pixelatedImage);

  if (webp) {
    await sharp(pixelatedImage).toFile(`${fileName}-pixelated.webp`);
  }
});
