import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'components/Navbar/Navbar.module.scss';
import Logo from 'components/Logo/Logo';
import SearchInput from 'components/SearchInput/SearchInput';
import NavLinks from 'components/NavLinks/NavLinks';

const Navbar = ({ profilePic }) => (
  <nav className={styles.Navbar}>
    <div className={styles.content}>
      <Link exact="true" to="/">
        <Logo />
      </Link>
      <SearchInput />
      <NavLinks profilePic={profilePic} />
    </div>
  </nav>
);

export default Navbar;
