import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import PostGallery from '../../PostGallery/PostGallery';
import Modal from '../Modal';
import { changeUrl } from '../../../utils/changeUrl';
import { postPropType } from '../../../customPropTypes';

const PostModal = ({ post, isOpen, setModalOpen }) => {
  const { pathname: username } = useLocation();

  useEffect(() => {
    changeUrl(`/p/${post._id}`, 'post modal path');

    return () => {
      setModalOpen(!isOpen);
      changeUrl(`${username}`);
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      setModalOpen={setModalOpen}
    >
      <PostGallery post={post} />
      <div />
    </Modal>
  );
};

PostModal.propTypes = {
  post: PropTypes.shape(postPropType).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired
};

export default PostModal;
