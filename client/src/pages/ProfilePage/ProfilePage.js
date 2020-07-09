import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation, Link } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import Button from 'components/Button/Button';
import {
  logout,
  uploadProfilePic,
  removeProfilePic
} from 'actions/auth/authActions';
import { setAlert } from 'actions/alerts/alertActions';
import { searchUser } from 'actions/users/userActions';
import { loadPostsOfUser, searchPostById } from 'actions/posts/postActions';
import SettingsModal from 'components/Modals/SettingsModal/SettingsModal';
import SettingsModalList from 'components/Modals/SettingsModal/SettingsModalList';
import SettingsModalListItem from 'components/Modals/SettingsModal/SettingsModalListItem';
import Alert from 'components/Alert/Alert';
import { AiFillHeart } from 'react-icons/ai';
import { BsChatFill } from 'react-icons/bs';
import PostModal from '../../components/Modals/PostModal/PostModal';

const ProfilePage = () => {
  const {
    auth: { user: authenticatedUser, isAuthenticated, loading: authLoading },
    users: { user: searchedUser, loading: userLoading },
    posts: {
      post: searchedPost,
      postsOfUser: postsOfSearchedUser,
      loading: postsLoading
    },
    alert: { message }
  } = useSelector(state => state);

  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isPostModal, setIsPostModal] = useState(false);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const searchedUserUsername = pathname.split('/')[1];

  useEffect(() => {
    dispatch(searchUser(searchedUserUsername));
    dispatch(loadPostsOfUser(searchedUserUsername));
  }, [searchedUserUsername]);

  if (!isAuthenticated && !authLoading) {
    return <Redirect to="/accounts/login" />;
  }

  const toggleProfilePicModal = () => {
    if (searchedUserUsername === authenticatedUser.username) {
      document.body.style = 'overflow: hidden';
      setSettingsModalOpen(!isSettingsModalOpen);
    }
  };

  const handleSelectedFile = e => {
    if (e.target.files[0].size > 1000000) {
      dispatch(
        setAlert('The maximum size for a profile picture is 1mb', 'Error')
      );
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
                  url={searchedUser.profilePic}
                  className={styles.profilePic}
                />
              )}
            </button>
            <Alert alerts={message} style={{ fontSize: '10px' }} />
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
        </header>
        {!postsOfSearchedUser.length && !postsLoading ? (
          <div className={styles.noPostsUploaded}>
            <h2>No posts uploaded yet...</h2>
          </div>
        ) : (
          <div className={styles.profilePostsContainer}>
            {postsOfSearchedUser.map(post => (
              <div
                key={post._id}
                className={styles.profilePost}
                style={{
                  background: `url(${post.media}) no-repeat center center / cover`
                }}
                onClick={() => {
                  document.body.style = 'overflow: hidden';
                  window.history.pushState(
                    {},
                    'post modal path',
                    `/p/${post._id}`
                  );
                  dispatch(searchPostById(post._id));
                  setIsPostModal(!isPostModal);
                }}
              >
                <div className={styles.profilePostOverlay}>
                  <div className={styles.profilePostIconsContainer}>
                    <div className={styles.profilePostLikes}>
                      <AiFillHeart className={styles.profilePostLikeIcon} />
                      <span className={styles.profilePostNumOfLikes}>
                        {post.likes}
                      </span>
                    </div>
                    <div className={styles.profilePostComments}>
                      <BsChatFill className={styles.profilePostCommentsIcon} />
                      <span className={styles.profilePostNumOfComments}>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {searchedPost._id === window.location.pathname.split('/p/')[1] && (
              <PostModal
                isOpen={isPostModal}
                setModalOpen={setIsPostModal}
                username={searchedUserUsername}
              >
                <div
                  style={{
                    background: `black url(${searchedPost.media}) no-repeat center center / cover`,
                    width: '70%',
                    height: '100%'
                  }}
                />
                <div />
              </PostModal>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
