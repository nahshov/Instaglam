import React from 'react';
import PropTypes from 'prop-types';
import ModalList from '../ModalList/ModalList';
import Modal from '../Modal';

const FollowModal = ({ isModalOpen, setIsModalOpen }) => (
  <Modal isOpen={isModalOpen} setModalOpen={setIsModalOpen}>
    <ModalList>
      <h1>Followers</h1>

    </ModalList>
  </Modal>
);

FollowModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired
};

export default FollowModal;
