const { getUser } = require('../services/user-services');
const { getUserActivity } = require('../services/activity-services');
const serverResponse = require('../utils/serverResponse');

const getActivityOfUser = async (req, res) => {
  try {
    const user = await getUser(req.params.userId);
    if (!user) {
      return serverResponse(res, 404, 'User not found');
    }

    const userActivity = await getUserActivity(req.params.userId);

    return serverResponse(res, 200, userActivity);
  } catch (error) {
    console.log(error);
    return serverResponse(res, 500,
      { message: "Internal error while to get user's activity" });
  }
};

module.exports = {
  getActivityOfUser
};
