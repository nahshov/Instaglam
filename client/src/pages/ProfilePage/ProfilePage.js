import React, { useEffect } from 'react';
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
import ProfileHeader from './ProfileHeader';

const profilePageSelector = createStructuredSelector({
  postsOfUser: postsOfUserSelector,
  postsOfUserLoading: postsOfUserLoadingSelector
});

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const searchedUserUsername = pathname.replace('/', '');

  const {
    postsOfUser,
    postsOfUserLoading
  } = useSelector(profilePageSelector);

  useEffect(() => {
    dispatch(searchUser(searchedUserUsername));
    dispatch(loadPostsOfUser(searchedUserUsername));
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {!postsOfUserLoading && (
        <ProfileHeader
          postsCount={postsOfUser.length.toString()}
          postsOfUserLoading={postsOfUserLoading}
        />
        )}
        <PostsGrid
          posts={postsOfUser}
          postsOfUserLoading={postsOfUserLoading}
        />
      </div>
    </main>
  );
};

export default ProfilePage;
