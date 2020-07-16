import React from 'react';
import PropTypes from 'prop-types';
import styles from './PostsGrid.module.scss';
import PostsGridItemContent from './PostsGridItemContent';

const PostsGridItem = (
  { post,
    posts,
    isLink,
    isPostModal,
    setSearchedPost,
    setIsPostModal
  }
) => (
  <div
    key={post._id}
    className={styles.profilePost}
    style={{
      background: `url(${post.media}) no-repeat center center / cover`
    }}
    onClick={() => {
      if (!isLink) {
        // Setting searched post in parent grid component, in order to access it in the modal.
        // Dont want to render a modal for each post
        setSearchedPost(posts.find(p => p._id === post._id));
        setIsPostModal(!isPostModal);
      }
    }}
  >
    <PostsGridItemContent post={post} isLink={isLink} />
  </div>
);

PostsGridItem.propTypes = {
  post: PropTypes.shape({
    likes: PropTypes.number,
    comments: PropTypes.number,
    _id: PropTypes.string,
    media: PropTypes.string,
    user: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    likes: PropTypes.number,
    comments: PropTypes.number,
    _id: PropTypes.string,
    media: PropTypes.string,
    user: PropTypes.string,
    content: PropTypes.string
  }).isRequired).isRequired,
  isPostModal: PropTypes.bool.isRequired,
  setSearchedPost: PropTypes.func.isRequired,
  setIsPostModal: PropTypes.func.isRequired,
  isLink: PropTypes.bool.isRequired,
  isVideo: PropTypes.bool.isRequired,
  fileType: PropTypes.string.isRequired
};

export default PostsGridItem;
