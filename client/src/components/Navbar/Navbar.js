import React from 'react';
import Logo from '../Logo/Logo.js';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput/SearchInput.js';
import NavLinks from '../NavLinks/NavLinks.js';

const Navbar = () => {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.content}>
        <Link exact="true" to="/">
          <Logo />
        </Link>
        <SearchInput />
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
