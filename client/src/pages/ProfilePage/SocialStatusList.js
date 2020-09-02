import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import FollowModal from 'components/Modals/FollowModal/FollowModal';
import styles from './SocialStatusList.module.scss';

const SocialStatusList = ({ postCount, followingCount, followersCount, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  return (
    <ul className={styles.socialStatusList}>
      <li>
        <div className={styles.postCount}>
          {postCount}
          {' '}
          posts
        </div>
      </li>
      <li>
        <Button
          btnRole="astext"
          onClick={() => {
            setModalType('Followers');
            setIsModalOpen(true);
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
            setModalType('Following');
            setIsModalOpen(true);
          }}
        >
          {`${followingCount || 0}`}
          {' '}
          following
        </Button>
      </li>
      {isModalOpen && modalType && userId && (
        <FollowModal
          userId={userId}
          type={modalType}
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
