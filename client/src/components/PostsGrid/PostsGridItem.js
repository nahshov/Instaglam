import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postPropType } from 'customPropTypes';
import styles from './PostsGrid.module.scss';
import PostsGridItemContent from './PostsGridItemContent';

const PostsGridItem = (
  { post,
    posts,
    isLink,
    isPostModalOpen,
    setIsPostModalOpen,
    setSearchedPost
  }
) => {
  return (
    <div
      key={post._id}
      className={styles.profilePost}
      onClick={() => {
        if (!isLink) {
          // Setting the searched post in the parent grid component,
          // in order to access it in the modal.
          // Dont want to render a modal for each post
          setSearchedPost(posts.find(p => { return p._id === post._id; }));
          setIsPostModalOpen(!isPostModalOpen);
        }
      }}
    >
      <img alt={post.content} src={post.media} style={{ width: '100%' }} />
      {isLink ? (
        <Link to={`/p/${post._id}`} className={styles.profilePostOverlay}>
          <PostsGridItemContent numOfLikes={post.numOfLikes} numOfComments={post.numOfComments} />
        </Link>
      ) : (
        <div className={styles.profilePostOverlay}>
          <PostsGridItemContent numOfLikes={post.numOfLikes} numOfComments={post.numOfComments} />
        </div>
      ) }
    </div>
  );
};

PostsGridItem.propTypes = {
  post: PropTypes.shape(postPropType).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape(postPropType)).isRequired,
  setSearchedPost: PropTypes.func.isRequired,
  isPostModalOpen: PropTypes.bool.isRequired,
  setIsPostModalOpen: PropTypes.func.isRequired,
  isLink: PropTypes.bool.isRequired
};

export default PostsGridItem;
