import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'components/NavLinks/NavLinks.module.scss';
import HomeIcon from 'components/Icons/HomeIcon/HomeIcon';
import ChatIcon from 'components/Icons/ChatIcon/ChatIcon';
import ExploreIcon from 'components/Icons/ExploreIcon/ExploreIcon';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import MobileSearchIcon from 'components/Icons/MobileSearchIcon/MobileSearchIcon';
import CustomNavLink from 'components/CustomNavLink/CustomNavLink';

const NavLinks = () => (
  <div className={styles.NavLinks}>
    <CustomNavLink to="/">
      <HomeIcon />
    </CustomNavLink>
    <MobileSearchIcon />
    <CustomNavLink to="/direct/inbox" className={styles.chatLink}>
      <ChatIcon />
    </CustomNavLink>
    <CustomNavLink to="/explore">
      <ExploreIcon />
    </CustomNavLink>
    <HeartIcon />
    <NavLink
      exact
      to="/profile"
      className={styles.profilePicLink}
      activeClassName={styles.activeProfilePic}
    >
      <ProfilePic />
    </NavLink>
  </div>
);

export default NavLinks;
