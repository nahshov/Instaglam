import React from 'react';
import PropTypes from 'prop-types';
import styles from './PopoverList.module.scss';

const PopoverList = ({ children }) => {
  return (
    <ul className={styles.list}>{children}</ul>
  );
};

PopoverList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default PopoverList;
