import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import HomeIcon from 'components/Icons/HomeIcon/HomeIcon';
import ChatIcon from 'components/Icons/ChatIcon/ChatIcon';
import ActivityFeed from 'components/ActivityFeed/ActivityFeed';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import MobileSearchIcon from 'components/Icons/MobileSearchIcon/MobileSearchIcon';
import CustomNavLink from 'components/Navbar/CustomNavLink/CustomNavLink';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import styles from './NavLinks.module.scss';

const NavLinks = () => {
  const { user, loading } = useSelector((state) => { return state.auth; });

  return (
    <div className={styles.NavLinks}>
      <CustomNavLink to="/">
        <HomeIcon />
      </CustomNavLink>
      <MobileSearchIcon />
      <CustomNavLink to="/direct/inbox" className={styles.chatLink}>
        <ChatIcon className={styles.ChatIcon} />
      </CustomNavLink>

      <ActivityFeed />
      <NavLink
        exact
        to={!loading && `/${user.username}`}
        className={styles.profilePicLink}
        activeClassName={styles.activeProfilePic}
      >
        { user.profilePic && !loading ? (
          <ProfilePic
            url={user.profilePic}
            size="medium"
          />
        ) : (
          <LoadingSpinner style={{ width: '24px' }} />
        ) }
      </NavLink>
    </div>
  );
};

export default NavLinks;
