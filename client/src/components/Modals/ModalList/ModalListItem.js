import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalListItem.module.scss';

const ModalListItem = ({ children, ...otherProps }) => {
  const classNames = otherProps.className;

  // eslint-disable-next-line no-param-reassign
  delete otherProps.className;

  return (
    <li className={`${styles.listItem} ${classNames || ''}`} {...otherProps}>
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
