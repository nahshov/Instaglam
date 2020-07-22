import React from 'react';
import PropTypes from 'prop-types';
import styles from './UploadPostModal.module.scss';

const UploadPostModal = ({ children, isOpen = false, ...otherProps }) => (
  isOpen && (
  <div className={styles.modalShadow} {...otherProps}>
    <div className={`${styles.mainModalContent} ${styles.showModal}`}>
      {children}
    </div>
  </div>
  )
);

UploadPostModal.defaultProps = {
  isOpen: false
};

UploadPostModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

export default UploadPostModal;
