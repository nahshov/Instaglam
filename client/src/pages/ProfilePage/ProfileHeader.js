import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'components/Button/Button';
import { logout } from 'actions/auth/authActions';
import ProfilePicChanger from 'pages/ProfilePage/ProfilePicChanger';
import { profilePropType } from 'customPropTypes';
import { toggleProfileFollow } from 'actions/profile/profileActions';
import SocialStatusList from './SocialStatusList';
import FollowButton from '../../components/FollowButton/FollowButton';
import styles from './ProfileHeader.module.scss';

const ProfileHeader = ({ postsCount, profile, isAuthenticatedUser }) => {
  const dispatch = useDispatch();

  const handleFollow = async () => {
    await dispatch(toggleProfileFollow(profile._id, profile.isFollowed));
  };

  console.log('profile page');

  return (
    <header className={styles.profileHeader}>
      <ProfilePicChanger
        searchedUser={profile}
        isAuthenticatedUser={isAuthenticatedUser}
      />
      {/* <section className={styles.profileInfo}> */}
      {/* <div className={styles.profileInfoHeader}> */}
      <h2 className={styles.username}>{profile.username}</h2>
      {isAuthenticatedUser
        ? (
          <div className={styles.profileButtons}>
            <Link className={styles.editLink} to="/accounts/edit">
              <Button>Edit</Button>
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
            isFollowed={profile.isFollowed}
          />
        )}
      {/* </div> */}
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
      {/* </section> */}
    </header>
  );
};

ProfileHeader.propTypes = {
  postsCount: PropTypes.number.isRequired,
  isAuthenticatedUser: PropTypes.bool.isRequired,
  profile: PropTypes.shape(profilePropType).isRequired
};

export default ProfileHeader;
