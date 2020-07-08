const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  userGettingFollowed: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    index: true
  },
  userDoingFollow: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    index: true
  },
  userFollowersList: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    index: true
  },
  userFollowingList: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    index: true
  }
});

const Follow = mongoose.model('Follow', FollowSchema);

module.exports = Follow;
