import React from 'react';
import PropTypes from 'prop-types';

const ProfilePic = ({ url = '', className = '' }) => (
  <div className={className}>
    <img alt="user avatar" src={url} />
  </div>
);

ProfilePic.defaultProps = {
  url: '',
  className: ''
};

ProfilePic.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string
};

export default ProfilePic;
