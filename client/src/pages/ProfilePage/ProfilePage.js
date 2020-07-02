import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation, Link } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import Button from 'components/Button/Button';
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
          <div className={styles.profilePageProfilePic}>
            <button type="button" className={styles.changeProfilePicButton}>
              <ProfilePic
                url={!userLoading ? user.profilePic : ''}
                className={!userLoading ? styles.profilePic : ''}
              />
            </button>
          </div>
          <section className={styles.profileInfo}>
            <div className={styles.profileInfoHeader}>
              <h2 className={styles.username}>{user.username}</h2>
              <Link className={styles.editLink} to="/accounts/edit">
                <Button text="Edit Profile" />
              </Link>
              <Button
                className={styles.logoutBtn}
                btnRole="danger"
                text="Logout"
                onClick={() => dispatch(logout())}
              />
            </div>
            <ul className={styles.socialStatusList}>
              <li>
                <span>{`${0} `}</span>
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
              <h1 className={styles.fullName}>{user.fullName}</h1>
              <p className={styles.bio}>{user.bio}</p>
            </div>
          </section>
        </header>
      </div>
    </main>
  );
};

export default ProfilePage;
