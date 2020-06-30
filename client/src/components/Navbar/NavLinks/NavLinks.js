import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import HomeIcon from 'components/Icons/HomeIcon/HomeIcon';
import ChatIcon from 'components/Icons/ChatIcon/ChatIcon';
import ExploreIcon from 'components/Icons/ExploreIcon/ExploreIcon';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import MobileSearchIcon from 'components/Icons/MobileSearchIcon/MobileSearchIcon';
import CustomNavLink from 'components/Navbar/CustomNavLink/CustomNavLink';
import Spinner from 'assets/img/spinner.gif';
import styles from './NavLinks.module.scss';

const NavLinks = ({ auth: { user, loading } }) => (
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
      {loading ? (
        <img src={Spinner} alt="spinner" />
      ) : (
        <ProfilePic url={user.profilePic} />
      )}
    </NavLink>
  </div>
);

NavLinks.propTypes = {
  auth: PropTypes.shape({ user: PropTypes.object, loading: PropTypes.bool })
    .isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NavLinks);
