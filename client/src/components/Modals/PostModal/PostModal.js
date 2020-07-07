import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './PostModal.module.scss';

const modalRoot = document.getElementById('modal');

const PostModal = ({ children, setModalOpen, isOpen = false, ...otherProps }) => {
  const node = useRef();
  const el = document.createElement('div');

  if (isOpen) {
    document.body.classList.add('modalOpen');
  }

  const handleClose = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }

    document.body.classList.remove('modalOpen');

    setModalOpen(!isOpen);
  };

  useEffect(() => {
    el.addEventListener('mousedown', handleClose);
    modalRoot.appendChild(el);

    return () => {
      document.body.classList.remove('modalOpen');
      el.removeEventListener('mousedown', handleClose);
      modalRoot.removeChild(el);
    };
  }, [el]);

  return (
    isOpen && createPortal(
      <div className={styles.modalShadow} {...otherProps}>
        <div className={`${styles.mainModalContent}`} ref={node}>
          {children}
        </div>
      </div>,
      el
    )
  );
};

PostModal.defaultProps = {
  isOpen: false
};

PostModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  setModalOpen: PropTypes.func.isRequired
};

export default PostModal;
