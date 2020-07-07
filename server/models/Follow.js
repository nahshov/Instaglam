const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  userFollowing: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  }
});

const Follow = mongoose.model('Follow', FollowSchema);

module.exports = Follow;
