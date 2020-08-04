import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import Button from 'components/Button/Button';
import { logout } from 'actions/auth/authActions';
import ProfilePicChanger from 'pages/ProfilePage/ProfilePicChanger';
import { searchedUserPropType } from 'customPropTypes';
import { toggleFollow } from 'actions/users/userActions';
import SocialStatusList from './SocialStatusList';

const ProfileHeader = ({ postsCount, searchedUser, isAuthenticatedUser }) => {
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(toggleFollow(searchedUser._id, searchedUser.isFollowed));
  };

  console.log(searchedUser.isFollowed);

  return (
    <header className={styles.profileHeader}>
      <ProfilePicChanger
        searchedUser={searchedUser}
        isAuthenticatedUser={isAuthenticatedUser}
      />
      <section className={styles.profileInfo}>
        <div className={styles.profileInfoHeader}>
          <h2 className={styles.username}>{searchedUser.username}</h2>
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
              <>
                <Button
                  style={{ marginLeft: '20px', fontWeight: 'bold', background: `${searchedUser.isFollowed ? '#ccc' : ''}` }}
                  btnRole="primary"
                  onClick={handleFollow}
                >
                  {searchedUser.isFollowed ? 'Unfollow' : 'Follow'}
                </Button>
              </>
            )}
        </div>
        <SocialStatusList
          userId={searchedUser._id}
          postCount={postsCount}
          followersCount={searchedUser.numOfFollowers}
          followingCount={searchedUser.numOfFollowing}
        />
        <div className={styles.bioContainer}>
          <h1 className={styles.fullName}>{searchedUser.fullName}</h1>
          <p className={styles.bio}>{searchedUser.bio}</p>
        </div>
      </section>
    </header>
  );
};

ProfileHeader.propTypes = {
  postsCount: PropTypes.number.isRequired,
  isAuthenticatedUser: PropTypes.bool.isRequired,
  searchedUser: PropTypes.shape(searchedUserPropType).isRequired
};

export default ProfileHeader;
