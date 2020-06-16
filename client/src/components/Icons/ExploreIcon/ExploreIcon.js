import React from 'react';
import { FaCompass } from 'react-icons/fa';
import { FiCompass } from 'react-icons/fi';
import styles from './ExploreIcon.module.scss';

const ExploreIcon = ({ isFilled }) => {
  return (
    <React.Fragment>
      {isFilled ? (
        <FaCompass className={styles.ExploreIcon} />
      ) : (
        <FiCompass className={styles.ExploreIcon} />
      )}
    </React.Fragment>
  );
};

export default ExploreIcon;
