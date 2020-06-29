import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/ProfilePic/ProfilePic.module.scss';

const ProfilePic = ({ url = '', style = {} }) => (
  <div className={styles.ProfilePic}>
    <img
      alt="default profile pic"
      src={url}
      className={styles.profileImg}
      style={style || {}}
    />
  </div>
);

ProfilePic.defaultProps = {
  url: '',
  style: {}
};

ProfilePic.propTypes = {
  url: PropTypes.string,
  style: PropTypes.shape({
    position: PropTypes.string
  })
};

export default ProfilePic;
