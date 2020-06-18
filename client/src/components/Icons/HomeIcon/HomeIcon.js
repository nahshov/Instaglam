import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Icons/HomeIcon/HomeIcon.module.scss';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';

const HomeIcon = ({ match }) => (
  <>
    {match ? (
      <AiFillHome className={styles.HomeIcon} />
    ) : (
      <AiOutlineHome className={styles.HomeIcon} />
    )}
  </>
);

HomeIcon.propTypes = {
  match: PropTypes.bool.isRequired
};

export default HomeIcon;
