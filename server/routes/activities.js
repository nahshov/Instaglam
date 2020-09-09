const verifyUser = require('../middleware/verifyUser');

const { getActivityOfUser } = require('../controllers/activities');

module.exports = function (app) {
  app
    .get('/api/activities/:userId', verifyUser, getActivityOfUser);
};
