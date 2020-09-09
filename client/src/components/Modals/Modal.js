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
    isUploadPost = false,
    handleUploadPostOnClose,
    ...otherProps }
) => {
  const node = useRef();

  window.node = node;

  const handleClose = (e) => {
    e.stopPropagation();

    if (node.current && node.current.contains(e.target)) {
      return;
    }

    setModalOpen(!isOpen);
  };

  useEffect(() => {
    document.body.style = 'overflow: hidden';

    return () => {
      document.body.removeAttribute('style');
      if (isUploadPost) {
        handleUploadPostOnClose();
      }
    };
  }, [handleUploadPostOnClose, isUploadPost]);

  return (
    isOpen && createPortal(
      <div
        className={styles.modalShadow}
        onMouseDown={handleClose}
      >
        <div
          className={`${isAnimated ? styles.showModal : ''}`}
          style={isUploadPost ? { maxHeight: '700px' } : {}}
          {...otherProps}
          ref={node}
        >
          {children}
        </div>
      </div>,
      modalRoot
    )
  );
};

Modal.defaultProps = {
  isOpen: false,
  isUploadPost: false,
  isAnimated: false,
  children: undefined
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  isOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  setModalOpen: PropTypes.func.isRequired,
  isAnimated: PropTypes.bool
};

export default Modal;
