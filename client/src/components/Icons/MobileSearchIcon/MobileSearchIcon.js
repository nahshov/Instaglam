import React from 'react';
import styles from 'components/Icons/MobileSearchIcon/MobileSearchIcon.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';

const MobileSearchIcon = () => {
  return (
    <AiOutlineSearch className={styles.MobileSearchIcon} />
  );
};

export default MobileSearchIcon;
