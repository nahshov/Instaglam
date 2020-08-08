import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalListItem.module.scss';

const ModalListItem = ({ children, ...otherProps }) => {
  return (
    <li className={styles.listItem} {...otherProps}>
      {children}
    </li>
  );
};

ModalListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ModalListItem;
