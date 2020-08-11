import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const FollowButton = ({ isFollowed, handleFollow }) => (
  <Button
    style={{ marginLeft: '30px', fontWeight: 'bold' }}
    btnRole={`${isFollowed ? 'danger' : 'primary'}`}
    onClick={handleFollow}
  >
    {isFollowed ? 'Unfollow' : 'Follow'}
  </Button>
);

FollowButton.propTypes = {
  isFollowed: PropTypes.bool.isRequired,
  handleFollow: PropTypes.func.isRequired
};

export default FollowButton;
