import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { changeUrl } from 'utils/changeUrl';
import styles from './PostModal.module.scss';

const modalRoot = document.getElementById('modal');

const PostModal = ({ children, setModalOpen, isOpen = false, postId, ...otherProps }) => {
  const { pathname: username } = useLocation();

  const node = useRef();
  const el = document.createElement('div');

  const handleClose = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }

    document.body.removeAttribute('style');

    changeUrl(`${username}`, 'post modal path');
    setModalOpen(!isOpen);
  };

  useEffect(() => {
    document.body.style = 'overflow: hidden';
    changeUrl(`/p/${postId}`, 'post modal path');
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
  setModalOpen: PropTypes.func.isRequired
};

export default PostModal;
