import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './PostModal.module.scss';

const modalRoot = document.getElementById('modal');

const PostModal = ({ children, setModalOpen, isOpen = false, username, ...otherProps }) => {
  const node = useRef();
  const el = document.createElement('div');

  const handleClose = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }

    document.body.removeAttribute('style');

    window.history.pushState({}, 'post modal path', `/${username}`);
    setModalOpen(!isOpen);
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
  setModalOpen: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

export default PostModal;
