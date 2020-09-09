import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import Button from 'components/Button/Button';
import { logout } from 'actions/auth/authActions';
import ProfilePicChanger from 'pages/ProfilePage/ProfilePicChanger';
import { profilePropType } from 'customPropTypes';
import { toggleFollows, getFollows } from 'actions/follows/followActions';
import { setNumOfFollowers } from 'actions/profile/profileActions';
import { followsSelector } from 'actions/follows/followSelectors';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import PropTypes from 'prop-types';
import SocialStatusList from './SocialStatusList';
import FollowButton from '../../components/FollowButton/FollowButton';
import styles from './ProfileHeader.module.scss';

const structuredFollowSelector = createStructuredSelector({
  follows: followsSelector,
  authenticatedUser: authenticatedUserSelector
});

const ProfileHeader = ({ postsCount, profile, isAuthenticatedUser }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { follows, authenticatedUser } = useSelector(structuredFollowSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFollowed(follows.some(follow => (follow._id === profile._id)));
  }, [follows, profile._id]);

  useEffect(() => {
    dispatch(getFollows(authenticatedUser._id, 'following'));
  }, [isFollowed]);

  const handleFollow = async () => {
    await dispatch(toggleFollows(profile._id, isFollowed));
    await dispatch(getFollows(authenticatedUser._id, 'following'));
    if (isFollowed) {
      dispatch(setNumOfFollowers(-1));
    } else {
      dispatch(setNumOfFollowers(1));
    }
  };

  return (
    <header className={styles.profileHeader}>
      <ProfilePicChanger
        searchedUser={profile}
        isAuthenticatedUser={isAuthenticatedUser}
      />
      <h2 className={styles.username}>{profile.username}</h2>
      {isAuthenticatedUser
        ? (
          <div className={styles.profileButtons}>
            <Link className={styles.editLink} to="/accounts/edit">
              <Button style={{ marginRight: '10px' }}>Edit</Button>
            </Link>
            <Button
              className={styles.logoutBtn}
              btnRole="danger"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </div>
        )
        : (
          <FollowButton
            className={styles.profileButtons}
            handleFollow={handleFollow}
            isFollowed={isFollowed}
          />
        )}
      <SocialStatusList
        userId={profile._id}
        postCount={postsCount}
        followersCount={profile.numOfFollowers}
        followingCount={profile.numOfFollowing}
        className={styles.socialStatusList}
      />
      <div className={styles.bioContainer}>
        <h1 className={styles.fullName}>{profile.fullName}</h1>
        <p className={styles.bio}>{profile.bio}</p>
      </div>
    </header>
  );
};

ProfileHeader.propTypes = {
  postsCount: PropTypes.number.isRequired,
  isAuthenticatedUser: PropTypes.bool.isRequired,
  profile: PropTypes.shape(profilePropType).isRequired
};

export default ProfileHeader;
