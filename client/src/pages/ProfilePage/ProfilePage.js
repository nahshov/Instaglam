import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import PostsGrid from 'components/PostsGrid/PostsGrid';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import { getProfile } from 'actions/profile/profileActions';
import { profileSelector, profileLoadingSelector } from 'actions/profile/profileSelectors';
import ProfileHeader from './ProfileHeader';

const profilePageSelector = createStructuredSelector({
  authenticatedUser: authenticatedUserSelector,
  profile: profileSelector,
  profileLoading: profileLoadingSelector
});

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {
    authenticatedUser,
    profile,
    profileLoading
  } = useSelector(profilePageSelector);

  const searchedUserUsername = pathname.replace('/', '');
  const isAuthenticated = searchedUserUsername === authenticatedUser.username;

  useEffect(() => {
    dispatch(getProfile(searchedUserUsername));
  }, [pathname, dispatch, searchedUserUsername]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {!profileLoading && profile && profile.posts.length && (
        <>
          <ProfileHeader
            profile={profile}
            isAuthenticatedUser={isAuthenticated}
            postsCount={profile.posts.length}
          />
          <PostsGrid
            posts={profile.posts}
            loading={profileLoading}
          />
        </>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
