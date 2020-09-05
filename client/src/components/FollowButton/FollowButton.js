import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const FollowButton = ({ isFollowed, handleFollow, ...otherProps }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <Button
      style={{ fontWeight: 'bold', width: '80px' }}
      btnRole={`${isFollowed && !otherProps.astext ? 'danger' : 'primary'} ${otherProps.astext}`}
      onClick={async (e) => {
        e.stopPropagation();
        setLocalLoading(true);
        setDisabled(true);
        await handleFollow();
        setDisabled(false);
        setLocalLoading(false);
      }}
      disabled={disabled}
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
