import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import Alert from 'components/Alert/Alert';
import Button from 'components/Button/Button';
import { logout, removeProfilePic, uploadProfilePic } from 'actions/auth/authActions';
import SettingsModal from '../../components/Modals/SettingsModal/SettingsModal';
import SettingsModalList from '../../components/Modals/SettingsModal/SettingsModalList';
import SettingsModalListItem from '../../components/Modals/SettingsModal/SettingsModalListItem';
import { setProfilePicAlert } from '../../actions/alerts/alertActions';

const ProfileHeader = () => {
  const dispatch = useDispatch();
  const {
    auth: { user: authenticatedUser },
    users: { loading: userLoading, user: searchedUser },
    alert: { message },
    posts: {
      postsOfUser: postsOfSearchedUser
    }
  } = useSelector(state => state);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  const toggleProfilePicModal = () => {
    if (searchedUser.username === authenticatedUser.username) {
      document.body.style = 'overflow: hidden';
      setSettingsModalOpen(!isSettingsModalOpen);
    }
  };

  const handleSelectedFile = e => {
    if (e.target.files[0].size > 1000000) {
      dispatch(
        setProfilePicAlert('The maximum size for a profile picture is 1mb', 'Error')
      );
      setTimeout(() => {
        dispatch(setProfilePicAlert('', null));
      }, 4500);
      setSettingsModalOpen(false);
      return;
    }
    dispatch(uploadProfilePic(e.target.files[0]));
    setSettingsModalOpen(false);
  };

  const removeCurrentPhoto = () => {
    dispatch(removeProfilePic());
    setSettingsModalOpen(false);
  };

  return (
    <header className={styles.profileHeader}>
      <div className={styles.profilePageProfilePic}>
        <button
          type="button"
          className={styles.changeProfilePicButton}
          onClick={toggleProfilePicModal}
        >
          {!userLoading && (
          <ProfilePic
            url={searchedUser.profilePic}
            className={styles.profilePic}
          />
          )}
        </button>
        <Alert style={{ fontSize: '10px' }}>{message}</Alert>
      </div>
      <section className={styles.profileInfo}>
        <div className={styles.profileInfoHeader}>
          <h2 className={styles.username}>{searchedUser.username}</h2>
          <Link className={styles.editLink} to="/accounts/edit">
            <Button>Edit Profile</Button>
          </Link>
          <Button
            className={styles.logoutBtn}
            btnRole="danger"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </div>
        <ul className={styles.socialStatusList}>
          <li>
            <span>
              {postsOfSearchedUser && `${postsOfSearchedUser.length} `}
            </span>
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
          <h1 className={styles.fullName}>{searchedUser.fullName}</h1>
          <p className={styles.bio}>{searchedUser.bio}</p>
        </div>
      </section>
      {isSettingsModalOpen && (
        <SettingsModal
          isOpen={isSettingsModalOpen}
          setModalOpen={setSettingsModalOpen}
        >
          <SettingsModalList>
            <h3>Change Profile Photo</h3>
            <SettingsModalListItem>
              <label htmlFor="profilePic" className={styles.uploadPhoto}>
                Upload Photo
              </label>
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                onChange={handleSelectedFile}
                style={{ display: 'none' }}
              />
            </SettingsModalListItem>
            <SettingsModalListItem>
              <Button
                btnRole="astext danger btnBlock"
                onClick={removeCurrentPhoto}
              >
                Remove Current Photo
              </Button>
            </SettingsModalListItem>
            <SettingsModalListItem>
              <Button btnRole="astext btnBlock" onClick={toggleProfilePicModal}>
                Cancel
              </Button>
            </SettingsModalListItem>
          </SettingsModalList>
        </SettingsModal>
      )}
    </header>
  );
};

export default ProfileHeader;
