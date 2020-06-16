import React from 'react';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import styles from './HomeIcon.module.scss';

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
