import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import ModalList from '../ModalList/ModalList';
import ModalListItem from '../ModalList/ModalListItem';
import Button from '../../Button/Button';

const HomePageModal = ({ postId = '', isModalOpen, setModalOpen }) => (

  <Modal
    isOpen={isModalOpen}
    setModalOpen={setModalOpen}
  >
    <ModalList>
      <ModalListItem>
        <Button btnRole="danger btnBlock astext">Unfollow</Button>
      </ModalListItem>
      <ModalListItem>
        <Link to={`/p/${postId}`}>
          <Button btnRole="btnBlock astext">Go To Post</Button>
        </Link>
      </ModalListItem>
      <ModalListItem>
        <Button btnRole="btnBlock astext">Share</Button>
      </ModalListItem>
      <ModalListItem>
        <Button btnRole="btnBlock astext">Copy Link</Button>
      </ModalListItem>
      <ModalListItem>
        <Button btnRole="btnBlock astext" onClick={() => setModalOpen(false)}>Cancel</Button>
      </ModalListItem>
    </ModalList>
  </Modal>
);

HomePageModal.defaultProps = {
  _id: ''
};
HomePageModal.propTypes = {
  _id: PropTypes.string
};
export default HomePageModal;
