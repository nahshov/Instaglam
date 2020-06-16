import React from 'react';
import styles from 'components/Icons/ExploreIcon/ExploreIcon.module.scss';
import { FaCompass } from 'react-icons/fa';
import { FiCompass } from 'react-icons/fi';

const ExploreIcon = ({ isFilled }) => (
  <React.Fragment>
    {isFilled ? (
      <FaCompass className={styles.ExploreIcon} />
    ) : (
      <FiCompass className={styles.ExploreIcon} />
    )}
  </React.Fragment>
);

export default ExploreIcon;
