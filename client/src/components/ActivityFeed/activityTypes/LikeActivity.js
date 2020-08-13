import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import PropTypes from 'prop-types';
import { activitiesPropTypes } from 'customPropTypes';

const LikeActivity = ({
  profilePic,
  usernames,
  activityLength,
  referredEntityType,
  referredEntity }) => {
  let LikeActivityText;
  let postRef;
  let postMedia;

  const history = useHistory();

  if (referredEntityType === 'Post') {
    postRef = referredEntity._id;
    postMedia = referredEntity.media;
    if (activityLength > 2) {
      LikeActivityText = `${usernames[0]}, ${usernames[1]} and ${activityLength - 2}
      more liked your post.`;
    } else if (activityLength === 2) {
      LikeActivityText = `${usernames[0]} and ${usernames[1]} liked your post.`;
    } else {
      LikeActivityText = `${usernames} liked your post.`;
    }
  } else {
    postRef = referredEntity.post;
    postMedia = referredEntity.post.media;
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
    <div onClick={() => history.push(`/p/${postRef}`)}>
      <ProfilePic
        url={profilePic}
        size="medium"
      />
      <span>{LikeActivityText}</span>
      <img src={postMedia} alt="postPic" />
    </div>
  );
};

LikeActivity.propTypes = {
  ...activitiesPropTypes,
  referredEntityType: PropTypes.string.isRequired
};

export default LikeActivity;
