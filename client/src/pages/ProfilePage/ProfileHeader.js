import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import Button from 'components/Button/Button';
import { logout } from 'actions/auth/authActions';
import ProfilePicChanger from 'pages/ProfilePage/ProfilePicChanger';
import { profilePropType } from 'customPropTypes';
import { toggleProfileFollow } from 'actions/profile/profileActions';
import SocialStatusList from './SocialStatusList';
import FollowButton from '../../components/FollowButton/FollowButton';

const ProfileHeader = ({ postsCount, profile, isAuthenticatedUser }) => {
  const dispatch = useDispatch();

  const handleFollow = async () => {
    await dispatch(toggleProfileFollow(profile._id, profile.isFollowed));
  };

  return (
    <header className={styles.profileHeader}>
      <ProfilePicChanger
        searchedUser={profile}
        isAuthenticatedUser={isAuthenticatedUser}
      />
      <section className={styles.profileInfo}>
        <div className={styles.profileInfoHeader}>
          <h2 className={styles.username}>{profile.username}</h2>
          {isAuthenticatedUser
            ? (
              <>
                <Link className={styles.editLink} to="/accounts/edit">
                  <Button>Edit Profile</Button>
                </Link>
                <Button
                  className={styles.logoutBtn}
                  btnRole="danger"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Button>
              </>
            )
            : (
              <FollowButton handleFollow={handleFollow} isFollowed={profile.isFollowed} />
            )}
        </div>
        <SocialStatusList
          userId={profile._id}
          postCount={postsCount}
          followersCount={profile.numOfFollowers}
          followingCount={profile.numOfFollowing}
        />
        <div className={styles.bioContainer}>
          <h1 className={styles.fullName}>{profile.fullName}</h1>
          <p className={styles.bio}>{profile.bio}</p>
        </div>
      </section>
    </header>
  );
};

ProfileHeader.propTypes = {
  postsCount: PropTypes.number.isRequired,
  isAuthenticatedUser: PropTypes.bool.isRequired,
  profile: PropTypes.shape(profilePropType).isRequired
};

export default ProfileHeader;
