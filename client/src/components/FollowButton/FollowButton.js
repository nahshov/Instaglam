import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const FollowButton = ({ isFollowed, handleFollow }) => {
  const [localLoading, setLocalLoading] = useState(false);

  return (
    <Button
      style={{ fontWeight: 'bold' }}
      btnRole={`${isFollowed ? 'danger' : 'primary'}`}
      onClick={() => handleFollow(setLocalLoading)}
    >
      {localLoading ? <LoadingSpinner style={{ width: '30px' }} /> : (
        <>
          {isFollowed
            ? 'Unfollow'
            : 'Follow'}
        </>
      )}
    </Button>
  );
};

FollowButton.propTypes = {
  isFollowed: PropTypes.bool.isRequired,
  handleFollow: PropTypes.func.isRequired
};

export default FollowButton;
