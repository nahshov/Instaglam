import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation, Link } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import Button from 'components/Button/Button';
import { logout } from 'actions/auth/authActions';
import { searchUser } from 'actions/users/userActions';
import { loadPostsOfUser } from 'actions/posts/postActions';
import Modal from 'components/Modals/Modal';
import ModalList from 'components/Modals/ModalList';
import ModalListItem from 'components/Modals/ModalListItem';

const ProfilePage = () => {
  const {
    auth: { user: authenticatedUser, isAuthenticated, loading: authLoading },
    users: { user, loading: userLoading },
    posts: { postsOfUser }
  } = useSelector((state) => state);

  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const username = pathname.split('/')[1];

  useEffect(() => {
    dispatch(searchUser(username));
  }, [username]);

  useEffect(() => {
    if (user) {
      dispatch(loadPostsOfUser(user._id));
    }
  }, [user]);

  if (!isAuthenticated && !authLoading) {
    return <Redirect to="/accounts/login" />;
  }

  const handleProfilePicModalOpen = () => {
    if (username === authenticatedUser.username) {
      setSettingsModalOpen(!isSettingsModalOpen);
    }
  };

  return (
    <main>
      <Modal isOpen={isSettingsModalOpen} setSettingsModalOpen={setSettingsModalOpen}>
        <ModalList>
          <h3>Change Profile Photo</h3>
          <ModalListItem>
            <Button
              btnRole="astext primary"
              text="Upload Photo"
            />
          </ModalListItem>
          <ModalListItem>
            <Button
              btnRole="astext danger"
              text="Remove current photo"
            />
          </ModalListItem>
          <ModalListItem>
            <Button
              btnRole="astext"
              text="Cancel"
              onClick={() => handleProfilePicModalOpen()}
            />
          </ModalListItem>
        </ModalList>
      </Modal>
      <div className={styles.container}>
        <header className={styles.profileHeader}>
          <div className={styles.profilePageProfilePic}>
            <button
              type="button"
              className={styles.changeProfilePicButton}
              onClick={() => handleProfilePicModalOpen()}
            >
              {!userLoading && (
              <ProfilePic
                url={user.profilePic}
                className={styles.profilePic}
              />
              )}
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
                <span>{postsOfUser && `${postsOfUser.length} `}</span>
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
