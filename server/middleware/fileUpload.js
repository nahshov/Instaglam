const multer = require('multer');

const profilePicSettings = {
  propertyName: 'profilePic',
  fileSize: 1000000,
  regex: /\.(jpg|jpeg|png|bmp)$/g,
  errorMessage: 'Please upload an image'
};
const postSettings = {
  propertyName: '5000000',
  fileSize: 5000000,
  regex: /\.(jpg|jpeg|png|bmp|mov|mp4)$/g,
  errorMessage: 'Please upload an image/video'
};

const upload = propertyName => {
  const { fileSize, regex, errorMessage } = propertyName === 'media' ? postSettings : profilePicSettings;

  return multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(regex)) {
        return cb(new Error(errorMessage));
      }
      return cb(null, true);
    }
  }).single(propertyName);
};

module.exports = {
  upload,
  profilePicSettings
};
