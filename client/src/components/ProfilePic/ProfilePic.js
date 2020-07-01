import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import styles from 'components/ProfilePic/ProfilePic.module.scss';

const ProfilePic = ({ url = '', className = '' }) => (
  <div className={className}>
    {!url ? <LoadingSpinner /> : <img alt="default profile pic" src={url} />}
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
