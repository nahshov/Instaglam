import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'components/Navbar/Navbar.module.scss';
import NavPostUpload from 'components/Navbar/NavUploadPost';
import Logo from 'components/Logo/Logo';
import SearchInput from 'components/SearchInput/SearchInput';
import NavLinks from 'components/Navbar/NavLinks/NavLinks';

const Navbar = () => {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.content}>
        <div className={styles.cameraAndLogoDiv}>
          <NavPostUpload />
          <Link exact="true" to="/" className={styles.Link}>
            <Logo />
          </Link>
        </div>
        <SearchInput />
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
