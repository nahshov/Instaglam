import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import Button from 'components/Button/Button';
import { logout } from 'actions/auth/authActions';
import ProfilePicChanger from 'pages/ProfilePage/ProfilePicChanger';
import { postsOfUserSelector, postsOfUserLoadingSelector } from 'actions/posts/postSelectors';
import { userSelector, userLoadingSelector } from 'actions/users/userSelectors';
import SocialStatusList from './SocialStatusList';
import { authenticatedUserSelector } from '../../actions/auth/authSelectors';

const postsAndUserSelector = createStructuredSelector({
  postsOfUser: postsOfUserSelector,
  postsOfUserLoading: postsOfUserLoadingSelector,
  searchedUser: userSelector,
  searchedUserLoading: userLoadingSelector,
  authenticatedUser: authenticatedUserSelector
});

const ProfileHeader = () => {
  const dispatch = useDispatch();
  const {
    postsOfUser,
    postsOfUserLoading,
    searchedUser,
    searchedUserLoading,
    authenticatedUser
  } = useSelector(postsAndUserSelector);

  return (
    <header className={styles.profileHeader}>
      <ProfilePicChanger
        searchedUser={searchedUser}
        searchedUserLoading={searchedUserLoading}
        authenticatedUsername={authenticatedUser.username}
      />
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
        <SocialStatusList userId={searchedUser._id || ''} postCount={!postsOfUserLoading ? postsOfUser.length.toString() : ''} />
        <div className={styles.bioContainer}>
          <h1 className={styles.fullName}>{searchedUser.fullName}</h1>
          <p className={styles.bio}>{searchedUser.bio}</p>
        </div>
      </section>
    </header>
  );
};

export default ProfileHeader;
