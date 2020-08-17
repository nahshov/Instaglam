import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import PropTypes from 'prop-types';
import { activitiesPropTypes } from 'customPropTypes';

const ReplyActivity = ({ activity, profilePic, usernames, activityLength }) => {
  const { referredEntity } = activity;

  const history = useHistory();

  let ReplyActivityText;

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
  usernames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  profilePic: PropTypes.string.isRequired,
  activityLength: PropTypes.number.isRequired,
  activity: PropTypes.shape({
    referredEntity: PropTypes.shape({
      post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        media: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

export default ReplyActivity;
