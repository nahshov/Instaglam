import React from 'react';
import styles from './HomeIcon.module.scss';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';

const HomeIconButton = ({ isFilled }) => (
  <React.Fragment>
    {isFilled ? (
      <AiFillHome className={styles.HomeIcon} />
    ) : (
      <AiOutlineHome className={styles.HomeIcon} />
    )}
  </React.Fragment>
);

export default HomeIconButton;
