import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Icons/ExploreIcon/ExploreIcon.module.scss';
import { FaCompass } from 'react-icons/fa';
import { FiCompass } from 'react-icons/fi';

const ExploreIcon = ({ match }) => (
  <>
    {match ? (
      <FaCompass className={styles.ExploreIcon} />
    ) : (
      <FiCompass className={styles.ExploreIcon} />
    )}
  </>
);

ExploreIcon.propTypes = {
  match: PropTypes.bool.isRequired
};

export default ExploreIcon;
