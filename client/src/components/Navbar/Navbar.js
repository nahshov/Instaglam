import React from 'react';
import PropTypes from 'prop-types';
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

Navbar.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    block: PropTypes.func.isRequired
  }).isRequired
};

export default Navbar;
