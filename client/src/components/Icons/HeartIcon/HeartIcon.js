import React from 'react';
import styles from 'components/Icons/HeartIcon/HeartIcon.module.scss';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const HeartIcon = ({ isFilled }) => (
  <React.Fragment>
    {isFilled ? (
      <AiFillHeart className={styles.HeartIcon} />
    ) : (
      <AiOutlineHeart className={styles.HeartIcon} />
    )}
  </React.Fragment>
);

export default HeartIcon;
