import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfilePic.module.scss';

const ProfilePic = ({ url = '', size = '', ...otherProps }) => (
  <div
    className={`${styles.ProfilePic} ${styles[size]}`}
    {...otherProps}
  >
    <img alt="user avatar" src={url} />
  </div> 
);

ProfilePic.defaultProps = {
  url: '',
  size: ''
};

ProfilePic.propTypes = {
  url: PropTypes.string,
  size: PropTypes.string
};

export default ProfilePic;
