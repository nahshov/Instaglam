import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import FollowModal from 'components/Modals/FollowModal/FollowModal';
import { getFollowers, getFollowing } from 'actions/follows/followActions';
import styles from './ProfilePage.module.scss';

const SocialStatusList = ({ postCount, followingCount, followersCount, userId }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

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
          onClick={() => {
            setModalTitle('Followers');
            setIsModalOpen(true);
            dispatch(getFollowers(userId));
          }}
        >
          {`${followersCount || 0} `}
          {' '}
          followers
        </Button>
      </li>
      <li>
        <Button
          btnRole="astext"
          onClick={() => {
            setModalTitle('Following');
            setIsModalOpen(true);
            dispatch(getFollowing(userId));
          }}
        >
          {`${followingCount || 0}`}
          {' '}
          following
        </Button>
      </li>
      {isModalOpen && modalTitle && (
        <FollowModal
          title={modalTitle}
          setModalTitle={setModalTitle}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isAnimated
        />
      )}
    </ul>
  );
};

SocialStatusList.propTypes = {
  postCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired
};

export default SocialStatusList;
