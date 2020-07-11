const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  following: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

const Follow = mongoose.model('Follow', FollowSchema);

module.exports = Follow;
