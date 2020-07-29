import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { postsOfUserAndLoadingSelector } from 'actions/posts/postSelectors';
import styles from './PostsGrid.module.scss';
import PostsGridItem from './PostsGridItem';
import PostModal from '../Modals/PostModal/PostModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const PostsGrid = ({ isLink = false }) => {
  const {
    postsOfUser: posts,
    postsOfUserLoading
  } = useSelector(postsOfUserAndLoadingSelector);

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
          {posts.map(post => (
            <PostsGridItem
              key={post._id}
              post={post}
              posts={posts}
              setSearchedPost={setSearchedPost}
              isPostModalOpen={isPostModalOpen}
              setIsPostModalOpen={setIsPostModalOpen}
              isLink={isLink}
            />
          ))}
          {isPostModalOpen && (
          <PostModal
            post={searchedPost}
            isOpen={isPostModalOpen}
            setModalOpen={setIsPostModalOpen}
          />
          )}
        </div>
      ));
};

PostsGrid.defaultProps = {
  isLink: false
};

PostsGrid.propTypes = {
  isLink: PropTypes.bool
};

export default PostsGrid;
