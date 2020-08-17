import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import PropTypes from 'prop-types';
import { activitiesPropTypes } from 'customPropTypes';

const LikeActivity = ({
  activity,
  usernames,
  profilePic,
  activityLength }) => {
  const { referredEntity } = activity;
  const { referredEntityType } = activity;

  const history = useHistory();

  let LikeActivityText;
  let postRef;
  let postMedia;

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

LikeActivity.defaultProps = {
  activity: PropTypes.shape({
    referredEntity: PropTypes.shape({
      post: ''
    })
  })
};

LikeActivity.propTypes = {
  usernames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  profilePic: PropTypes.string.isRequired,
  activityLength: PropTypes.number.isRequired,
  activity: PropTypes.shape({
    referredEntityType: PropTypes.string.isRequired,
    referredEntity: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      media: PropTypes.string.isRequired,
      post: PropTypes.shape({
        media: PropTypes.string.isRequired
      })
    })
  })
};

export default LikeActivity;
