import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfilePic.module.scss';

const ProfilePic = ({ url = '', big = false, ...otherProps }) => (
  <div
    className={`${styles.ProfilePic} ${big ? styles.big : 'styles.small'}`}
    {...otherProps}
  >
    <img alt="user avatar" src={url} />
  </div>
);

ProfilePic.defaultProps = {
  url: '',
  big: false
};

ProfilePic.propTypes = {
  url: PropTypes.string,
  big: PropTypes.bool
};

export default ProfilePic;
