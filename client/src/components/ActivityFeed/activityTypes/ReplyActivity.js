import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { activitiesPropTypes } from 'customPropTypes';

const ReplyActivity = ({ profilePic, usernames, activityLength, referredEntity }) => {
  let ReplyActivityText;

  const history = useHistory();

  if (activityLength > 2) {
    ReplyActivityText = `${usernames[0]}, ${usernames[1]} and ${activityLength - 2}
    more replied to your comment.`;
  } else if (activityLength === 2) {
    ReplyActivityText = `${usernames[0]} and ${usernames[1]} replied to your comment.`;
  } else {
    ReplyActivityText = `${usernames} replied to your comment.`;
  }
  return (
    <div onClick={() => history.push(`/p/${referredEntity.post._id}`)}>
      <ProfilePic
        url={profilePic}
        size="medium"
      />
      <span>{ReplyActivityText}</span>
      <img src={referredEntity.post.media} alt="postPicture" />
    </div>
  );
};

ReplyActivity.propTypes = {
  ...activitiesPropTypes
};

export default ReplyActivity;
