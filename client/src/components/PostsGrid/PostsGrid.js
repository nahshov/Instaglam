import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PostsGrid.module.scss';
import PostsGridItem from './PostsGridItem';
import PostModal from '../Modals/PostModal/PostModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { postPropType } from '../../customPropTypes';

const PostsGrid = ({ isLink = false, loading = true, posts = [] }) => {
  const [searchedPost, setSearchedPost] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    loading
      ? (<LoadingSpinner style={{ display: 'block', width: '20%', margin: '20px auto' }} />)
      : (
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
            postProp={searchedPost}
            posts={posts}
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
  loading: true
};

PostsGrid.propTypes = {
  isLink: PropTypes.bool,
  posts: PropTypes.arrayOf(PropTypes.shape(postPropType)),
  loading: PropTypes.bool
};

export default PostsGrid;
