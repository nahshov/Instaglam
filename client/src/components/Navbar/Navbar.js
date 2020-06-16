import React from 'react';
import Logo from 'components/Logo/Logo.js';
import styles from 'components/Navbar/Navbar.module.scss';
import { Link } from 'react-router-dom';
import SearchInput from 'components/SearchInput/SearchInput.js';
import NavLinks from 'components/NavLinks/NavLinks.js';

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
