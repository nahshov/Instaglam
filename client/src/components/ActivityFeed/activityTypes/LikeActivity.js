import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { activitiesPropTypes } from 'customPropTypes';

const LikeActivity = ({
  profilePic,
  usernames,
  activityLength,
  referredEntityType,
  referredEntity }) => {
  let LikeActivityText;
  let whichRefEntity;

  const history = useHistory();

  if (referredEntityType === 'Post') {
    whichRefEntity = referredEntity._id;
    if (activityLength > 2) {
      LikeActivityText = `${usernames[0]}, ${usernames[1]} and ${activityLength - 2}
      more liked your post.`;
    } else if (activityLength === 2) {
      LikeActivityText = `${usernames[0]} and ${usernames[1]} liked your post.`;
    } else {
      LikeActivityText = `${usernames} liked your post.`;
    }
  } else {
    whichRefEntity = referredEntity.post;
    if (activityLength > 2) {
      LikeActivityText = `${usernames[0]}, ${usernames[1]} and ${activityLength - 2}
      more liked your comment.`;
    } else if (activityLength === 2) {
      LikeActivityText = `${usernames[0]} and ${usernames[1]} liked your comment.`;
    } else {
      LikeActivityText = `${usernames} liked your comment.`;
    }
  }

  return (
    <div onClick={() => history.push(`/p/${whichRefEntity}`)}>
      <ProfilePic
        url={profilePic}
        size="medium"
      />
      <span>{LikeActivityText}</span>
    </div>
  );
};

LikeActivity.propTypes = {
  ...activitiesPropTypes
};

export default LikeActivity;
