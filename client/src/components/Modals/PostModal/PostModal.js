import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PostGallery from 'components/PostGallery/PostGallery';
import { changeUrl } from 'utils/changeUrl';
import { postPropType } from 'customPropTypes';
import { getPost } from 'actions/post/postActions';
import Modal from 'components/Modals/Modal';
import styles from './PostModal.module.scss';

const PostModal = ({ postProp, postId, isOpen, setModalOpen, isGallery = false, posts = [] }) => {
  const { post } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const { pathname: username } = useLocation();
  useEffect(() => {
    dispatch(getPost(postProp));
  }, []);

  useEffect(() => {
    changeUrl(`/p/${post._id}`, 'post modal path');
    return () => {
      setModalOpen(!isOpen);
      changeUrl(`${username}`);
    };
  }, [setModalOpen, username, isOpen]);
  return (
    <Modal
      className={styles.PostModal}
      isOpen={isOpen}
      setModalOpen={setModalOpen}
    >
      {post._id
      && (
        <PostGallery
          post={post}
          posts={posts}
          isGallery={isGallery}
          currentPostIndex={posts.indexOf(post)}
        />
      )}
    </Modal>
  );
};

PostModal.defaultProps = {
  isGallery: false,
  posts: []
};

PostModal.propTypes = {
  postId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  isGallery: PropTypes.bool,
  posts: PropTypes.arrayOf(PropTypes.shape(postPropType))
};

export default PostModal;
