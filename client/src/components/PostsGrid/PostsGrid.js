import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PostsGrid.module.scss';
import PostsGridItem from './PostsGridItem';
import PostModal from '../Modals/PostModal/PostModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { postPropType } from '../../customPropTypes';

const PostsGrid = ({ isLink = false, postsOfUserLoading = true, posts = [] }) => {
  const [searchedPost, setSearchedPost] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    postsOfUserLoading
      ? (<LoadingSpinner style={{ display: 'block', width: '20%', margin: '20px auto' }} />)
      : !posts.length ? (
        <div className={styles.noPostsUploaded}>
          <h2>No posts uploaded yet...</h2>
        </div>
      ) : (
        <div className={styles.gridContainer}>
          {posts.map(post => {
            return (
              <PostsGridItem
                key={post._id}
                post={post}
                posts={posts}
                setSearchedPost={setSearchedPost}
                isPostModalOpen={isPostModalOpen}
                setIsPostModalOpen={setIsPostModalOpen}
                isLink={isLink}
              />
            );
          })}
          {isPostModalOpen && (
          <PostModal
            isGallery
            post={searchedPost}
            isOpen={isPostModalOpen}
            setModalOpen={setIsPostModalOpen}
          />
          )}
        </div>
      ));
};

PostsGrid.defaultProps = {
  isLink: false,
  posts: [],
  postsOfUserLoading: true
};

PostsGrid.propTypes = {
  isLink: PropTypes.bool,
  posts: PropTypes.arrayOf(PropTypes.shape(postPropType)),
  postsOfUserLoading: PropTypes.bool
};

export default PostsGrid;
