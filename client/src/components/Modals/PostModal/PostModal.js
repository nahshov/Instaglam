import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PostGallery from 'components/PostGallery/PostGallery';
import { changeUrl } from 'utils/changeUrl';
import { postPropType } from 'customPropTypes';
import { getPost, resetPost } from 'actions/post/postActions';
import { postSelector } from 'actions/post/postSelectors';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import Modal from 'components/Modals/Modal';
import styles from './PostModal.module.scss';

const postModalStructuredSelector = createStructuredSelector({
  post: postSelector,
  authenticatedUser: authenticatedUserSelector
});

const PostModal = ({ postProp, isOpen, setModalOpen, isGallery = false, posts = [] }) => {
  const { post, authenticatedUser } = useSelector(postModalStructuredSelector);
  const dispatch = useDispatch();
  const { pathname: username } = useLocation();
  useEffect(() => {
    // postprop is a post from homepage
    // that helping us get the post without struggling with async problems
    dispatch(getPost(postProp._id));
    return () => {
      dispatch(resetPost());
    };
  }, [dispatch, postProp._id]);

  useEffect(() => {
    changeUrl(`/p/${postProp._id}`, 'post modal path');
    return () => {
      setModalOpen(!isOpen);
      changeUrl(`${username}`);
    };
  }, [setModalOpen, username, isOpen, postProp._id]);
  return (
    <Modal
      className={styles.PostModal}
      isOpen={isOpen}
      setModalOpen={setModalOpen}
    >
      {post._id && authenticatedUser._id
      && (
        <PostGallery
          authenticatedUserId={authenticatedUser._id}
          post={post}
          posts={posts}
          isGallery={isGallery}
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
  isOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  isGallery: PropTypes.bool,
  posts: PropTypes.arrayOf(PropTypes.shape(postPropType)),
  postProp: PropTypes.shape(postPropType).isRequired
};

export default PostModal;
