import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  getFollowers,
  getFollowing,
  toggleFollowers,
  toggleFollowing,
  getLikers,
  toggleLikersFollow
} from 'actions/follows/followActions';
import { conditionalFollowSelector } from 'actions/follows/followSelectors';
import { createStructuredSelector } from 'reselect';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import FollowButton from 'components/FollowButton/FollowButton';
import { profileSelector } from 'actions/profile/profileSelectors';
import { Link } from 'react-router-dom';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import { setNumOfFollowing } from 'actions/profile/profileActions';
import ModalList from '../ModalList/ModalList';
import styles from './FollowModal.module.scss';
import Modal from '../Modal';
import ModalListItem from '../ModalList/ModalListItem';

const FollowModalSelector = title => createStructuredSelector({
  follows: conditionalFollowSelector(title),
  profile: profileSelector,
  authenticatedUser: authenticatedUserSelector
});

const FollowModal = ({
  type,
  isModalOpen,
  setIsModalOpen,
  userId = '',
  postId = '',
  ...otherProps
}) => {
  const {
    follows,
    profile,
    authenticatedUser
  } = useSelector(state => FollowModalSelector(type)(state));

  const dispatch = useDispatch();

  useEffect(() => {
    switch (type) {
      case 'Followers':
        dispatch(getFollowers(userId));
        break;
      case 'Following':
        dispatch(getFollowing(userId));
        break;
      case 'Likes':
        dispatch(getLikers(postId));
        break;
      default:
        return Promise.resolve();
    }
  }, []);

  const handleFollow = async (user) => {
    switch (type) {
      case 'Followers':
        await dispatch(toggleFollowers(user._id, user.isFollowed));
        if (profile.username === authenticatedUser.username) {
          if (user.isFollowed) {
            dispatch(setNumOfFollowing(-1));
          } else {
            dispatch(setNumOfFollowing(1));
          }
        }
        break;
      case 'Following':
        await dispatch(toggleFollowing(user._id, user.isFollowed));
        if (profile.username === authenticatedUser.username) {
          if (user.isFollowed) {
            dispatch(setNumOfFollowing(-1));
          } else {
            dispatch(setNumOfFollowing(1));
          }
        }
        break;
      case 'Likes':
        await dispatch(toggleLikersFollow(user._id, user.isFollowed));
        break;
      default:
        return Promise.resolve();
    }

    return Promise.resolve();
  };

  const followList = (
    <ModalList className={styles.followList}>
      {
      !follows.follows.length && !follows.loading
        ? (
          <ModalListItem>
            {type === 'Followers' ? 'You do not have any followers yet...' : 'You are not following anyone yet...'}
          </ModalListItem>
        )
        : (follows.follows.map(f => (
          <li key={f._id} className={styles.followItem}>
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
  );

  return (
    <Modal isOpen={isModalOpen} setModalOpen={setIsModalOpen} {...otherProps}>
      <div className={styles.modalContainer}>
        <h1 className={styles.title}>{type}</h1>
        {followList}
      </div>
    </Modal>
  );
};

FollowModal.defaultProps = {
  userId: '',
  postId: ''
};

FollowModal.propTypes = {
  type: PropTypes.string.isRequired,
  userId: PropTypes.string,
  postId: PropTypes.string,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired
};

export default FollowModal;
