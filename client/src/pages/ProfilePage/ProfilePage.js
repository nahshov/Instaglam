import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import { searchUser } from 'actions/users/userActions';
import { loadPostsOfUser } from 'actions/posts/postActions';
import PostsGrid from 'components/PostsGrid/PostsGrid';
import {
  postsOfUserLoadingSelector,
  postsOfUserSelector
} from 'actions/posts/postSelectors';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import { userLoadingSelector, userSelector } from 'actions/users/userSelectors';
import ProfileHeader from './ProfileHeader';

const profilePageSelector = createStructuredSelector({
  postsOfUser: postsOfUserSelector,
  postsOfUserLoading: postsOfUserLoadingSelector,
  authenticatedUser: authenticatedUserSelector,
  searchedUser: userSelector,
  searchedUserLoading: userLoadingSelector
});

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {
    postsOfUser,
    postsOfUserLoading,
    authenticatedUser,
    searchedUser,
    searchedUserLoading
  } = useSelector(profilePageSelector);
  console.log('postsOfuser:', postsOfUser)
  console.log('postsOfuserloading:', postsOfUserLoading)
  console.log('authenticateduser:', authenticatedUser)
  console.log('searcheduser:', searchedUser)
  console.log('searcheduserloading:', searchedUserLoading)
  console.log('-----------------------------------------')

  const [searchedUserUsername, setSearchedUserUsername] = useState(pathname.replace('/', ''));
  const [isAuthenticated, setIsAuthenticated] = useState(
    searchedUserUsername === authenticatedUser.username
  );

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(searchUser(searchedUserUsername));
    }
    dispatch(loadPostsOfUser(searchedUserUsername));
  }, [isAuthenticated]);

  useEffect(() => {
    setSearchedUserUsername(pathname.replace('/', ''));
    setIsAuthenticated(pathname.replace('/', '') === authenticatedUser.username);
  }, [pathname]);

  // console.log(`%cpathname: ${pathname}`, 'background: #fff; color: black');
  // console.log(`%cIs authenticated: ${searchedUserUsername === authenticatedUser.username}`, `background: #333; color: ${isAuthenticated ? 'green' : 'red'}`);
  // console.log(`%cSearched user loading: ${searchedUserLoading}`, `background: #333; color: ${searchedUserLoading ? 'orange' : 'yellow'}`);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {!postsOfUserLoading && (isAuthenticated || !searchedUserLoading) && (
        <>
          <ProfileHeader
            searchedUser={isAuthenticated ? authenticatedUser : searchedUser}
            isAuthenticatedUser={isAuthenticated}
            postsCount={postsOfUser.length}
          />
          <PostsGrid
            posts={postsOfUser}
            postsOfUserLoading={postsOfUserLoading}
          />
        </>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
