import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const FollowButton = ({ isFollowed, handleFollow }) => {
  const [localLoading, setLocalLoading] = useState(false);

  return (
    <Button
      style={{ fontWeight: 'bold', width: '80px' }}
      btnRole={`${isFollowed ? 'danger' : 'primary'}`}
      onClick={async () => {
        setLocalLoading(true);
        await handleFollow();
        setLocalLoading(false);
      }}
    >
      <div style={{ width: '100%' }}>
        {localLoading ? <LoadingSpinner style={{ width: '20px' }} /> : (
          <>
            {isFollowed
              ? 'Unfollow'
              : 'Follow'}
          </>
        )}
      </div>
    </Button>
  );
};

FollowButton.propTypes = {
  isFollowed: PropTypes.bool.isRequired,
  handleFollow: PropTypes.func.isRequired
};

export default FollowButton;
