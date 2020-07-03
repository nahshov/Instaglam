import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal');

const Modal = ({ children, setSettingsModalOpen, isOpen = false, ...otherProps }) => {
  const node = useRef();
  const el = document.createElement('div');

  const handleClose = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }

    setSettingsModalOpen(false);
  };

  useEffect(() => {
    el.addEventListener('mousedown', handleClose);
    modalRoot.appendChild(el);

    return () => {
      el.removeEventListener('mousedown', handleClose);
      modalRoot.removeChild(el);
    };
  }, [el]);

  return (
    isOpen && createPortal(
      <div className={styles.modalShadow} {...otherProps}>
        <div className={`${styles.mainModalContent} ${styles.showModal}`} ref={node}>
          {children}
        </div>
      </div>,
      el
    )
  );
};

Modal.defaultProps = {
  isOpen: false
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isOpen: PropTypes.bool,
  setSettingsModalOpen: PropTypes.func.isRequired
};

export default Modal;
