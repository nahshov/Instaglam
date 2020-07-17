import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal');

const Modal = (
  { children,
    setModalOpen,
    isOpen = false,
    isAnimated = false,
    ...otherProps }
) => {
  const node = useRef();

  const handleClose = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    document.body.removeAttribute('style');

    setModalOpen(!isOpen);
  };

  useEffect(() => {
    document.body.style = 'overflow: hidden';
    modalRoot.addEventListener('mousedown', handleClose);

    return () => {
      modalRoot.removeEventListener('mousedown', handleClose);
    };
  }, [modalRoot]);

  return (
    isOpen && createPortal(
      <div className={styles.modalShadow} {...otherProps}>
        <div className={`${isAnimated ? styles.showModal : ''}`} ref={node}>
          {children}
        </div>
      </div>,
      modalRoot
    )
  );
};

Modal.defaultProps = {
  isOpen: false,
  isAnimated: false
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  setModalOpen: PropTypes.func.isRequired,
  isAnimated: PropTypes.bool
};

export default Modal;
