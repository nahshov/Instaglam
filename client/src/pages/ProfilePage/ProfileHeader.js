import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import Button from 'components/Button/Button';
import { logout } from 'actions/auth/authActions';
import ProfilePicChanger from 'pages/ProfilePage/ProfilePicChanger';

const ProfileHeader = () => {
  const dispatch = useDispatch();
  const {
    users: { user: searchedUser },
    posts: {
      postsOfUser: postsOfSearchedUser
    }
  } = useSelector(state => state);

  return (
    <header className={styles.profileHeader}>
      <ProfilePicChanger />
      <section className={styles.profileInfo}>
        <div className={styles.profileInfoHeader}>
          <h2 className={styles.username}>{searchedUser.username}</h2>
          <Link className={styles.editLink} to="/accounts/edit">
            <Button>Edit Profile</Button>
          </Link>
          <Button
            className={styles.logoutBtn}
            btnRole="danger"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </div>
        <ul className={styles.socialStatusList}>
          <li>
            <span>
              {postsOfSearchedUser.length}
            </span>
            &nbsp;
            posts
          </li>
          <li>
            <span>{`${0} `}</span>
            followers
          </li>
          <li>
            <span>{`${0} `}</span>
            following
          </li>
        </ul>
        <div className={styles.bioContainer}>
          <h1 className={styles.fullName}>{searchedUser.fullName}</h1>
          <p className={styles.bio}>{searchedUser.bio}</p>
        </div>
      </section>
    </header>
  );
};

export default ProfileHeader;
