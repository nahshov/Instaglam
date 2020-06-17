const {
  getUser,
  deleteUser,
  editUser
} = require('../services/user-services.js');

const { removeAllUserPosts } = require('../services/post-services.js');
const { removeAllUserComments } = require('../services/comment-services.js');
const { removeAllUserLikes } = require('../services/like-services.js');
const { deleteFile, uploadFile } = require('../services/cloud-services');
const verifyUser = require('../services/auth-services');
const profilePic = require('../multer/profilePic');

const sharp = require('sharp');

module.exports = function (app) {
  app.get(`/api/users/:email`, async (req, res) => {
    try {
      const user = await getUser(req.params.email);

      if (!user) {
        return res
          .status(404)
          .json({ message: 'no user with requested email' })
          .end();
      }
      res.status(200).json(user).end();
    } catch (e) {
      res
        .status(500)
        .json({ message: `internal error while trying to find user` })
        .end();
    }
  });

  //api/me
  app.get(`/api/me`, verifyUser, async (req, res) => {
    try {
      const user = await getUser(req.user.email);
      res.status(200).json(user).end();
    } catch (e) {
      res
        .status(500)
        .json({ message: `internal error while trying to find user` })
        .end();
    }
  });

  app.put(`/api/me`, verifyUser, async (req, res) => {
    try {
      const user = await editUser(req.user.email, req.body);
      if (!user) {
        res.status(404).json({ message: 'no user with requested email' }).end();
      }
      res.status(200).json({ message: 'Your changes were successfull' }).end();
    } catch (e) {
      res
        .status(500)
        .json({ message: `internal error while trying to update user` })
        .end();
    }
  });

  app.delete('/api/me', verifyUser, async (req, res) => {
    try {
      await Promise.all([
        removeAllUserPosts(req.user.sub),
        removeAllUserComments(req.user.sub),
        removeAllUserLikes(req.user.sub),
        deleteUser(req.user.email)
      ]);
      res.status(200).json({ message: 'User successfully deleted' }).end();
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: `internal error while trying to delete user` })
        .end();
    }
  });

  app.post(
    '/api/me/profilePic',
    verifyUser,
    profilePic.single('profilePic'),
    async (req, res) => {
      try {
        let buffer;
        if (!req.file.originalname.endsWith('.jpeg')) {
          buffer = await sharp(req.file.buffer)
            .resize(180, 180)
            .jpeg()
            .toBuffer();
        }

        const [imgUrl, user] = await Promise.all([
          uploadMedia(req.file.originalname, buffer),
          getUser(req.user.email)
        ]);

        if (user.profilePic) {
          await deleteFile(user.profilePic);
        }

        user.profilePic = `${imgUrl}`;
        await user.save();
        res
          .status(200)
          .json({ message: 'Profile picture successfully uploaded!' })
          .end();
      } catch (e) {
        res
          .status(500)
          .json({
            message: `internal error while trying to upload profile picture`
          })
          .end();
      }
    },
    (error, req, res, next) => {
      res.status(400).json({ error: error.message }).end();
    }
  );

  app.get('/api/me/profilePic', verifyUser, async (req, res) => {
    try {
      const user = await getUser(req.user.email);
      if (!user.profilePic) {
        throw new Error();
      }
      res.status(200).json({ profilePic: user.profilePic }).end();
    } catch (e) {
      res.status(404).json({ message: `No profile picture found` }).end();
    }
  });

  app.delete('/api/me/profilePic', verifyUser, async (req, res) => {
    try {
      const user = await getUser(req.user.email);
      if (!user.profilePic) {
        res.status(400).json({ message: `No profile picture found` });
      }

      const imgUrl = user.profilePic;

      user.profilePic = undefined;

      await Promise.all([user.save(), deleteFile(imgUrl)]);
      res
        .status(200)
        .json({ message: 'Successfully deleted profile picture' })
        .end();
    } catch (e) {
      res
        .status(500)
        .json({
          message: `internal error while trying to delete profile picture`
        })
        .end();
    }
  });
};
