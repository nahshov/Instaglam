import React from 'react';
import PropTypes from 'prop-types';
import ModalList from '../ModalList/ModalList';
import Modal from '../Modal';

const FollowModal = ({ title, isModalOpen, setIsModalOpen, ...otherProps }) => {
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
  setIsModalOpen: PropTypes.func.isRequired
};

export default FollowModal;
