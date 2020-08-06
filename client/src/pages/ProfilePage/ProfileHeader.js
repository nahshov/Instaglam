import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import Button from 'components/Button/Button';
import { logout } from 'actions/auth/authActions';
import ProfilePicChanger from 'pages/ProfilePage/ProfilePicChanger';
import { userSelector, userLoadingSelector } from 'actions/users/userSelectors';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import SocialStatusList from './SocialStatusList';
import { userIdSelector } from '../../actions/users/userSelectors';

const profileHeaderSelector = createStructuredSelector({
  searchedUser: userSelector,
  searchedUserLoading: userLoadingSelector,
  authenticatedUser: authenticatedUserSelector,
  userId: userIdSelector
});

const ProfileHeader = ({ postsCount = '', postsOfUserLoading = true }) => {
  const dispatch = useDispatch();
  const {
    searchedUser,
    searchedUserLoading,
    authenticatedUser,
    userId
  } = useSelector(profileHeaderSelector);

  console.log('aba');

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
            onClick={() => { return dispatch(logout()); }}
          >
            Logout
          </Button>
        </div>
        {!postsOfUserLoading && userId && postsCount
          && (
          <SocialStatusList
            userId={userId}
            postCount={postsCount}
          />
          )}
        <div className={styles.bioContainer}>
          <h1 className={styles.fullName}>{searchedUser.fullName}</h1>
          <p className={styles.bio}>{searchedUser.bio}</p>
        </div>
      </section>
    </header>
  );
};

ProfileHeader.defaultProps = {
  postsCount: '',
  postsOfUserLoading: true
};

ProfileHeader.propTypes = {
  postsCount: PropTypes.string,
  postsOfUserLoading: PropTypes.bool
};

export default ProfileHeader;
