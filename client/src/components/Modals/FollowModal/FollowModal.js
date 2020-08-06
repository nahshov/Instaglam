import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalList from '../ModalList/ModalList';
import Modal from '../Modal';

const FollowModal = ({ title, setModalTitle, isModalOpen, setIsModalOpen, ...otherProps }) => {
  useEffect(() => {
    return () => {
      setModalTitle('');
    };
  }, []);

  return (
    <Modal isOpen={isModalOpen} setModalOpen={setIsModalOpen} {...otherProps}>
      <ModalList>
        <h1>{title}</h1>

      </ModalList>
    </Modal>
  );
};

FollowModal.propTypes = {
  title: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setModalTitle: PropTypes.func.isRequired
};

export default FollowModal;
