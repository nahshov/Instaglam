import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import FollowModal from 'components/Modals/FollowModal/FollowModal';
import { getFollowers, getFollowing } from 'actions/follows/followActions';
import styles from './ProfilePage.module.scss';

const SocialStatusList = ({ postCount = '', userId = '' }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [follow, setFollow] = useState({
    title: ''
  });

  const { followers, following } = useSelector(state => state.follow);

  useEffect(() => {
    if (userId) {
      if (!followers.length) {
        dispatch(getFollowers(userId));
      }

      if (!following.length) {
        dispatch(getFollowing(userId));
      }
    }
  }, [userId]);

  console.log('render', postCount, userId);

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
            setFollow({
              title: 'Followers'
            });
            setIsModalOpen(true);
          }}
        >
          {`${followers.length || 0} `}
          {' '}
          followers
        </Button>
      </li>
      <li>
        <Button
          btnRole="astext"
          onClick={() => {
            setFollow({
              title: 'Following'
            });
            setIsModalOpen(true);
          }}
        >
          {`${following.length || 0}`}
          {' '}
          following
        </Button>
      </li>
      {isModalOpen && (
        <FollowModal
          title={follow.title}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isAnimated
        />
      )}
    </ul>
  );
};

SocialStatusList.defaultProps = {
  userId: '',
  postCount: ''
};

SocialStatusList.propTypes = {
  postCount: PropTypes.string,
  userId: PropTypes.string
};

export default SocialStatusList;
