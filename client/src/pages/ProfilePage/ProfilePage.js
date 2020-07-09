import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import { searchUser } from 'actions/users/userActions';
import { loadPostsOfUser } from 'actions/posts/postActions';
import PostsGrid from 'components/PostsGrid/PostsGrid';
import ProfileHeader from './ProfileHeader';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const {
    users: { loading: userLoading },
    auth: { isAuthenticated, loading: authLoading },
    posts: {
      postsOfUser: postsOfSearchedUser,
      loading: postsLoading
    }
  } = useSelector(state => state);

  const { pathname } = useLocation();
  const searchedUserUsername = pathname.split('/')[1];

  useEffect(() => {
    dispatch(searchUser(searchedUserUsername));
    dispatch(loadPostsOfUser(searchedUserUsername));
  }, [searchedUserUsername]);

  if (!authLoading && !isAuthenticated) {
    return <Redirect to="/accounts/login" />;
  }
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {!userLoading && <ProfileHeader />}
        {!postsLoading && (
          <PostsGrid
            posts={postsOfSearchedUser}
          />
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
