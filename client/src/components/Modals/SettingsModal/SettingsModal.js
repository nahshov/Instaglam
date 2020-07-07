import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './SettingsModal.module.scss';

const modalRoot = document.getElementById('modal');

const SettingsModal = ({
  children,
  setModalOpen,
  isOpen = false,
  ...otherProps
}) => {
  if (isOpen) {
    document.body.classList.add('modalOpen');
  }
  const node = useRef();
  const el = document.createElement('div');

  const handleClose = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }

    document.body.classList.remove('modalOpen');

    setModalOpen(false);
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

SettingsModal.defaultProps = {
  isOpen: false
};

SettingsModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isOpen: PropTypes.bool,
  setModalOpen: PropTypes.func.isRequired
};

export default SettingsModal;
