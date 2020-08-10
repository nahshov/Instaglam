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
    required: true
  },
  referredEntityType: {
    type: String,
    enum: ['user', 'post', 'comment'],
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
        required: true
      },
      created: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;