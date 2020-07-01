import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { logout } from '../../actions/auth';
import { searchUser } from '../../actions/users';

const ProfilePage = () => {
  const {
    auth: { isAuthenticated, loading: authLoading },
    users: { user, loading: userLoading }
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const username = pathname.split('/')[1];

  useEffect(() => {
    dispatch(searchUser(username));
  }, [pathname]);

  if (!isAuthenticated && !authLoading) {
    return <Redirect to="/accounts/login" />;
  }

  return (
    <main>
      <div className={styles.container}>
        <header className={styles.profileHeader}>
          <ProfilePic
            url={!userLoading ? user.profilePic : ''}
            className={!authLoading ? styles.profilePageProfilePic : ''}
          />
          <section className={styles.profileInfo}>.profile</section>
        </header>
        <button type="button" onClick={() => dispatch(logout())}>
          Logout!
        </button>
      </div>
    </main>
  );
};

export default ProfilePage;
