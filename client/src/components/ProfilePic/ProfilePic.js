import React from 'react';
import styles from 'components/ProfilePic/ProfilePic.module.scss';

const ProfilePic = () => (
  <div className={styles.ProfilePic}>
    <img
      alt="default profile pic"
      src="https://orangesupplies.com/wp-content/uploads/2019/08/Author__Placeholder.png"
      className={styles.profileImg}
    />
  </div>
);

export default ProfilePic;
