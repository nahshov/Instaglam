import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowers, getFollowing, toggleFollowers, toggleFollowing } from 'actions/follows/followActions';
import { conditionalFollowSelector } from 'actions/follows/followSelectors';
import { createStructuredSelector } from 'reselect';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import FollowButton from 'components/FollowButton/FollowButton';
import { profileSelector } from 'actions/profile/profileSelectors';
import { Link } from 'react-router-dom';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import ModalList from '../ModalList/ModalList';
import styles from './FollowModal.module.scss';
import Modal from '../Modal';
import ModalListItem from '../ModalList/ModalListItem';
import { setNumOfFollowing } from '../../../actions/profile/profileActions';

const FollowModalSelector = title => createStructuredSelector({
  follows: conditionalFollowSelector(title),
  profile: profileSelector,
  authenticatedUser: authenticatedUserSelector
});

const FollowModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  userId,
  ...otherProps }) => {
  const {
    follows,
    profile,
    authenticatedUser
  } = useSelector(state => FollowModalSelector(title)(state));

  const dispatch = useDispatch();

  useEffect(() => {
    if (title === 'Followers') {
      dispatch(getFollowers(userId));
    } else {
      dispatch(getFollowing(userId));
    }
  }, []);

  const handleFollow = (f) => {
    if (title === 'Followers') {
      dispatch(toggleFollowers(f._id, f.isFollowed));
      if (profile.username === authenticatedUser.username) {
        if (f.isFollowed) {
          dispatch(setNumOfFollowing(-1));
        } else {
          dispatch(setNumOfFollowing(1));
        }
      }
    } else {
      dispatch(toggleFollowing(f._id, f.isFollowed));
      if (profile.username === authenticatedUser.username) {
        if (f.isFollowed) {
          dispatch(setNumOfFollowing(-1));
        } else {
          dispatch(setNumOfFollowing(1));
        }
      }
    }
  };

  return (
    <Modal isOpen={isModalOpen} setModalOpen={setIsModalOpen} {...otherProps}>
      <div className={styles.modalContainer}>
        <h1 className={styles.title}>{title}</h1>
        <ModalList className={styles.followList}>
          {
            !follows.length
              ? (
                <ModalListItem>
                  {title === 'Followers' ? 'You do not have any followers yet...' : 'You are not following anyone yet...'}
                </ModalListItem>
              )
              : (follows.map(f => (
                <li key={f.created} className={styles.followItem}>
                  <div className={styles.userInfo}>
                    <ProfilePic size="medium" url={f.profilePic} style={{ marginRight: '10px' }} />
                    <Link className={styles.username} to={`/${f.username}`}>{f.username}</Link>
                  </div>
                  {f.username !== authenticatedUser.username && (
                  <FollowButton
                    handleFollow={() => handleFollow(f)}
                    isFollowed={f.isFollowed}
                  />
                  )}
                </li>
              )))
          }
        </ModalList>
      </div>
    </Modal>
  );
};

FollowModal.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired
};

export default FollowModal;
