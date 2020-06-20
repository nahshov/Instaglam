const multer = require('multer');

const uploadPost = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|bmp|mov|mp4)$/g)) {
      return cb(new Error('Please upload an image/video'));
    }
    return cb(null, true);
  }
});

const uploadProfilePic = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|bmp)$/g)) {
      return cb(new Error('Please upload an image'));
    }
    return cb(null, true);
  }
});

module.exports = {
  uploadProfilePic,
  uploadPost
};
