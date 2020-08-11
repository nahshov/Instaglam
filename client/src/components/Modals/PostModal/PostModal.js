import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import PostGallery from 'components/PostGallery/PostGallery';
import { changeUrl } from 'utils/changeUrl';
import { postPropType } from 'customPropTypes';
import Modal from 'components/Modals/Modal';
import styles from './PostModal.module.scss';

const PostModal = ({ post, isOpen, setModalOpen, isGallery = false, posts = [] }) => {
  const { pathname: username } = useLocation();

  useEffect(() => {
    changeUrl(`/p/${post._id}`, 'post modal path');

    return () => {
      setModalOpen(!isOpen);
      changeUrl(`${username}`);
    };
  }, [setModalOpen, username, isOpen, post._id]);

  return (
    <Modal
      className={styles.PostModal}
      isOpen={isOpen}
      setModalOpen={setModalOpen}
    >
      <PostGallery post={post} posts={posts} isGallery={isGallery} />
      <div />
    </Modal>
  );
};

PostModal.defaultProps = {
  isGallery: false,
  posts: []
};

PostModal.propTypes = {
  post: PropTypes.shape(postPropType).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  isGallery: PropTypes.bool,
  posts: PropTypes.arrayOf(PropTypes.shape(postPropType))
};

export default PostModal;
