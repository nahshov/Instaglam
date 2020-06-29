import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/ProfilePic/ProfilePic.module.scss';

const ProfilePic = ({ url = '' }) => (
  <div className={styles.ProfilePic}>
    <img alt="default profile pic" src={url} className={styles.profileImg} />
  </div>
);

ProfilePic.defaultProps = {
  url: ''
};

ProfilePic.propTypes = {
  url: PropTypes.string
};

export default ProfilePic;
