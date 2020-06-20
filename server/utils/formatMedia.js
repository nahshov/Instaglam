const sharp = require('sharp');

const formatImage = (file, size) => {
  if (!(file.originalname.endsWith('mov') || file.originalname.endsWith('mp4')))
    return sharp(file.buffer).resize(size, size).jpeg().toBuffer();

  return file.buffer;
};

module.exports = formatImage;
