import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import {
  getFollows,
  toggleFollows,
  resetFollows
} from 'actions/follows/followActions';
import { followsSelector } from 'actions/follows/followSelectors';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import FollowButton from 'components/FollowButton/FollowButton';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { profileSelector } from 'actions/profile/profileSelectors';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import { setNumOfFollowing } from 'actions/profile/profileActions';
import ModalList from '../ModalList/ModalList';
import styles from './FollowModal.module.scss';
import Modal from '../Modal';
import ModalListItem from '../ModalList/ModalListItem';

const FollowModalSelector = createStructuredSelector({
  follows: followsSelector,
  profile: profileSelector,
  authenticatedUser: authenticatedUserSelector
});

const FollowModal = ({
  //  All possible types: 'likes', 'followers', 'following'
  type,
  isModalOpen,
  setIsModalOpen,
  userId = '',
  id = '', // commentId or postId
  isComment = false,
  ...otherProps
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    follows,
    profile,
    authenticatedUser
  } = useSelector(FollowModalSelector);

  type = type.toLowerCase();
  const title = type[0].toUpperCase() + type.substr(1);

  const dispatch = useDispatch();
  useEffect(() => {
    if (type === 'likes') {
      dispatch(getFollows(id, type, isComment))
        .then(() => setIsLoading(false));
    } else {
      dispatch(getFollows(userId, type))
        .then(() => setIsLoading(false));
    }

    return () => {
      dispatch(resetFollows());
    };
  }, [dispatch, id, isComment, type, userId]);

  const handleFollow = async (user) => {
    await dispatch(toggleFollows(user._id, user.isFollowed));

    // if type is not likes,
    // then I am on profile page and need to increase or decrement num of following by 1
    if (type !== 'likes' && profile.username === authenticatedUser.username) {
      if (user.isFollowed) {
        dispatch(setNumOfFollowing(-1));
      } else {
        dispatch(setNumOfFollowing(1));
      }
    }

    return Promise.resolve();
  };

  window.type = type;

  return (
    <Modal isOpen={isModalOpen} setModalOpen={setIsModalOpen} {...otherProps}>
      <div className={styles.modalContainer}>
        <h1 className={styles.title}>{title}</h1>
        {isLoading
          ? (
            <div className={styles.loadingSpinnerDiv}>
              <LoadingSpinner />
            </div>
          )
          : (
            <ModalList className={styles.followList}>
              {
          !follows.length && !follows.loading
            ? (
              <ModalListItem>
                No one likes this yet...
              </ModalListItem>
            )
            : (follows.map(f => (
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
          )}

      </div>
    </Modal>
  );
};

FollowModal.defaultProps = {
  userId: '',
  id: '',
  isComment: false
};

FollowModal.propTypes = {
  isComment: PropTypes.bool,
  type: PropTypes.string.isRequired,
  userId: PropTypes.string,
  id: PropTypes.string,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired
};

export default FollowModal;
