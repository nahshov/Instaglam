const verifyUser = require('../middleware/verifyUser');
const { upload } = require('../middleware/fileUpload');
const {
  getUser,
  getUsers,
  getProfile,
  editProfile,
  deleteProfile,
  uploadProfilePic,
  getProfilePic,
  deleteProfilePic
} = require('../controllers/users');

module.exports = function (app) {
  app
    .get('/api/users/:userInfo', verifyUser, getUser)
    .get('/api/users/search/:userInfo', verifyUser, getUsers);

  app
    .get('/api/me', verifyUser, getProfile)
    .put('/api/me', verifyUser, editProfile)
    .delete('/api/me', verifyUser, deleteProfile)
    .get('/api/me/profilePic', verifyUser, getProfilePic)
    .delete('/api/me/profilePic', verifyUser, deleteProfilePic)
    .post(
      '/api/me/profilePic',
      verifyUser,
      upload('profilePic'),
      uploadProfilePic
    );
};
