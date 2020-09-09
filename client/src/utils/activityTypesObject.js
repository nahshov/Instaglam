import FollowActivity from 'components/ActivityFeed/activityTypes/FollowActivity';
import CommentActivity from 'components/ActivityFeed/activityTypes/CommentActivity';
import LikeActivity from 'components/ActivityFeed/activityTypes/LikeActivity';
import ReplyActivity from 'components/ActivityFeed/activityTypes/ReplyActivity';

export const activityTypesObject = {
  follow: FollowActivity,
  comment: CommentActivity,
  like: LikeActivity,
  reply: ReplyActivity
};
