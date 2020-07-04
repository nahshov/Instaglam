import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation, Link } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import Button from 'components/Button/Button';
import { logout, uploadProfilePic, removeProfilePic } from 'actions/auth/authActions';
import { setAlert } from 'actions/alerts/alertActions';
import { searchUser } from 'actions/users/userActions';
import { loadPostsOfUser } from 'actions/posts/postActions';
import Modal from 'components/Modals/Modal';
import ModalList from 'components/Modals/ModalList';
import ModalListItem from 'components/Modals/ModalListItem';
import Alert from 'components/Alert/Alert';

const ProfilePage = () => {
  const {
    auth: { user: authenticatedUser, isAuthenticated, loading: authLoading },
    users: { user, loading: userLoading },
    posts: { postsOfUser, loading: postsLoading },
    alert: { message }
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

  const toggleProfilePicModal = () => {
    if (username === authenticatedUser.username) {
      setSettingsModalOpen(!isSettingsModalOpen);
    }
  };

  const handleSelectedFile = (e) => {
    if (e.target.files[0].size > 1000000) {
      dispatch(setAlert('The maximum size for a profile picture is 1mb', 'Error'));
      setTimeout(() => {
        dispatch(setAlert('', null));
      }, 4500);
      setSettingsModalOpen(false);
    }
    dispatch(uploadProfilePic(e.target.files[0]));
    setSettingsModalOpen(false);
  };

  const removeCurrentPhoto = () => {
    dispatch(removeProfilePic());
    setSettingsModalOpen(false);
  };

  return (
    <main className={styles.main}>
      <Modal isOpen={isSettingsModalOpen} setSettingsModalOpen={setSettingsModalOpen}>
        <ModalList>
          <h3>Change Profile Photo</h3>
          <ModalListItem>
            <label htmlFor="profilePic" className={styles.uploadPhoto}>
              Upload Photo
            </label>
            <input type="file" id="profilePic" name="profilePic" onChange={handleSelectedFile} style={{ display: 'none' }} />
          </ModalListItem>
          <ModalListItem>
            <Button
              btnRole="astext danger btnBlock"
              text="Remove Current Photo"
              onClick={removeCurrentPhoto}
            />
          </ModalListItem>
          <ModalListItem>
            <Button
              text="Cancel"
              btnRole="astext btnBlock"
              onClick={toggleProfilePicModal}
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
              onClick={toggleProfilePicModal}
            >
              {!userLoading && (
              <ProfilePic
                url={user.profilePic}
                className={styles.profilePic}
              />
              )}
            </button>
            <Alert alerts={message} style={{ fontSize: '10px' }} />
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
        {!postsOfUser.length && !postsLoading
          ? (
            <div className={styles.noPostsUploaded}>
              <h2>No posts uploaded yet...</h2>
            </div>
          ) : (
            <div className={styles.profilePostsContainer}>
              {postsOfUser.map(post => (
                <div key={post._id} className={styles.profilePost} style={{ background: `url(${post.media}) no-repeat center center / cover` }} />
              ))}
            </div>
          ) }
      </div>
    </main>
  );
};

export default ProfilePage;
