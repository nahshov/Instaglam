const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  referredUser: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  referredEntity: {
    type: mongoose.Types.ObjectId,
    required: true,
    refPath: 'referredEntityType'
  },
  referredEntityType: {
    type: String,
    enum: ['User', 'Post', 'Comment'],
    required: true
  },
  activityType: {
    type: String,
    enum: ['follow', 'like', 'comment', 'reply'],
    required: true
  },
  activities: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      },
      activityId: {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
        required: true
      }
    }
  ]
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
