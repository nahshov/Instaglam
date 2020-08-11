import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import FollowModal from 'components/Modals/FollowModal/FollowModal';
import styles from './ProfilePage.module.scss';

const SocialStatusList = ({ postCount, followingCount, followersCount, userId }) => {
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
          }}
        >
          {`${followingCount || 0}`}
          {' '}
          following
        </Button>
      </li>
      {isModalOpen && modalTitle && userId && (
        <FollowModal
          userId={userId}
          title={modalTitle}
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
