const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: String,
  activityType: {
    type: String,
    enum: ['follow', 'like', 'comment']
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'Post'
  }
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
