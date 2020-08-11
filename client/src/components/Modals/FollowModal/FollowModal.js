import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowers, getFollowing } from 'actions/follows/followActions';
import { conditionalFollowSelector } from 'actions/follows/followSelectors';
import ModalList from '../ModalList/ModalList';
import styles from './FollowModal.module.scss';
import Modal from '../Modal';
import ModalListItem from '../ModalList/ModalListItem';
import ProfilePic from '../../ProfilePic/ProfilePic';
import FollowButton from '../../FollowButton/FollowButton';

const FollowModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  userId,
  ...otherProps }) => {
  const follows = useSelector(state => conditionalFollowSelector(title)(state));

  const dispatch = useDispatch();

  useEffect(() => {
    if (title === 'Followers') {
      dispatch(getFollowers(userId));
    } else {
      dispatch(getFollowing(userId));
    }
  }, []);

  useEffect(() => {
    console.log(follows);
  }, [follows]);

  return (
    <Modal isOpen={isModalOpen} setModalOpen={setIsModalOpen} {...otherProps}>
      <ModalList>
        <h1 className={styles.title}>{title}</h1>
        {
          follows.map(f => (
            <ModalListItem key={f.created} className={styles.followItem}>
              <div className={styles.userInfo}>
                <ProfilePic size="medium" url={f.profilePic} style={{ marginRight: '10px' }} />
                {f.username}
              </div>
              <FollowButton />
            </ModalListItem>
          ))
        }
      </ModalList>
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
