import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'components/NavLinks/NavLinks.module.scss';
import { isActive } from 'utils/isActive';
import HomeIcon from 'components/Icons/HomeIcon/HomeIcon';
import ChatIcon from 'components/Icons/ChatIcon/ChatIcon';
import ExploreIcon from 'components/Icons/ExploreIcon/ExploreIcon';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import MobileSearchIcon from 'components/Icons/MobileSearchIcon/MobileSearchIcon';

const NavLinks = () => {
  const [homeIcon, setHomeIcon] = useState(true);

  const [chatIcon, setChatIcon] = useState(true);

  const [exploreIcon, setExploreIcon] = useState(true);

  return (
    <div className={styles.NavLinks}>
      <NavLink exact to="/" isActive={isActive(setHomeIcon)}>
        <HomeIcon isFilled={homeIcon} />
      </NavLink>
      <MobileSearchIcon />
      <NavLink
        className={styles.chatLink}
        exact
        to="/direct/inbox"
        isActive={isActive(setChatIcon)}
      >
        <ChatIcon isFilled={chatIcon} />
      </NavLink>
      <NavLink exact to="/explore" isActive={isActive(setExploreIcon)}>
        <ExploreIcon isFilled={exploreIcon} />
      </NavLink>
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
};

export default NavLinks;
