const sharp = require('sharp');

const formatImage = async (file, size) => {
  if (file) {
    if (
      !(file.originalname.endsWith('mov') || file.originalname.endsWith('mp4'))
    ) {
      return sharp(file.buffer).resize(size, size).jpeg().toBuffer();
    }

    return Promise.resolve(file.buffer);
  }
};

module.exports = formatImage;
