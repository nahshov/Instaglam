import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import Modal from 'components/Modals/Modal';
import ModalList from 'components/Modals/ModalList/ModalList';
import { getFollowers, getFollowing } from 'actions/follows/followActions';
import styles from './ProfilePage.module.scss';
import FollowModal from '../../components/Modals/FollowModal/FollowModal';

const SocialStatusList = ({ postCount, userId = '' }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { followers, following } = useSelector(state => state.follow);

  useEffect(() => {
    if (userId) {
      dispatch(getFollowers(userId));
      dispatch(getFollowing(userId));
    }
  }, [userId]);

  return (
    <ul className={styles.socialStatusList}>
      <li>
        <div>
          {postCount}
          {' '}
          posts
        </div>
      </li>
      <li>
        <Button
          btnRole="astext"
          onClick={() => setIsModalOpen(true)}
        >
          {`${followers.length || ''} `}
          {' '}
          followers
        </Button>
      </li>
      <li>
        <Button
          btnRole="astext"
          onClick={() => setIsModalOpen(true)}
        >
          {`${following.length || ''}`}
          {' '}
          following
        </Button>
      </li>
      {isModalOpen && (
        <FollowModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </ul>
  );
};

SocialStatusList.defaultProps = {
  userId: PropTypes.string
};

SocialStatusList.propTypes = {
  postCount: PropTypes.number.isRequired,
  userId: PropTypes.string
};

export default SocialStatusList;
