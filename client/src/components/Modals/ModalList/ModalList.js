import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalList.module.scss';

const ModalList = ({ children, ...otherProps }) => {
  const classNames = otherProps.className;

  return (
    <ul className={`${styles.list} ${classNames || ''}`} {...otherProps}>
      {children}
    </ul>
  );
};

ModalList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ModalList;
