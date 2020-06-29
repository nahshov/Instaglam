import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'components/Navbar/Navbar.module.scss';
import Logo from 'components/Logo/Logo';
import SearchInput from 'components/SearchInput/SearchInput';
import NavLinks from 'components/NavLinks/NavLinks';

const Navbar = ({ history }) => (
  <nav className={styles.Navbar}>
    <div className={styles.content}>
      <Link exact="true" to="/" className={styles.Link}>
        <Logo />
      </Link>
      <SearchInput history={history} />
      <NavLinks />
    </div>
  </nav>
);

export default Navbar;
