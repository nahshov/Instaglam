import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import { searchUser } from 'actions/users/userActions';
import { loadPostsOfUser } from 'actions/posts/postActions';
import PostsGrid from 'components/PostsGrid/PostsGrid';
import ProfileHeader from './ProfileHeader';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const searchedUserUsername = pathname.replace('/', '');

  useEffect(() => {
    dispatch(searchUser(searchedUserUsername));
    dispatch(loadPostsOfUser(searchedUserUsername));
  }, [searchedUserUsername]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ProfileHeader />
        <PostsGrid />
      </div>
    </main>
  );
};

export default ProfilePage;
