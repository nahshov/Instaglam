import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { activitiesPropTypes } from 'customPropTypes';

const CommentActivity = ({ profilePic, usernames, activityLength, referredEntity }) => {
  let CommentActivityText;

  const history = useHistory();

  if (activityLength > 2) {
    CommentActivityText = `${usernames[0]}, ${usernames[1]} and ${activityLength - 2}
    more started commented on your post.`;
  } else if (activityLength === 2) {
    CommentActivityText = `${usernames[0]} and ${usernames[1]} commented on your post.`;
  } else {
    CommentActivityText = `${usernames} commented on your post.`;
  }
  return (
    <div onClick={() => history.push(`/p/${referredEntity._id}`)}>
      <ProfilePic
        url={profilePic}
        size="medium"
      />
      <span>{CommentActivityText}</span>
      <img src={referredEntity.media} alt="postPicture" />
    </div>
  );
};

CommentActivity.propTypes = {
  ...activitiesPropTypes
};

export default CommentActivity;
