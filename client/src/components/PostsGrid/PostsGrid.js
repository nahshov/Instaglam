import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './PostsGrid.module.scss';
import PostModal from '../Modals/PostModal/PostModal';
import PostsGridItem from './PostsGridItem';

const PostsGrid = ({ posts, isLink = false }) => {
  const { user: searchedUser } = useSelector(state => state.users);
  const [searchedPost, setSearchedPost] = useState(null);
  const [isPostModal, setIsPostModal] = useState(false);

  return (!posts.length ? (
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
          setIsPostModal={setIsPostModal}
          isLink={isLink}
        />
      ))}
      {isPostModal && (
      <PostModal
        isOpen={isPostModal}
        setModalOpen={setIsPostModal}
        username={searchedUser.username}
      >
        <div
          style={{
            background: `black url(${searchedPost.media}) no-repeat center center / cover`,
            width: '70%',
            height: '100%'
          }}
        />
        <div />
      </PostModal>
      )}
    </div>
  ));
};

PostsGrid.defaultProps = {
  isLink: false
};

PostsGrid.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    likes: PropTypes.number,
    comments: PropTypes.number,
    _id: PropTypes.string,
    content: PropTypes.string,
    user: PropTypes.string,
    media: PropTypes.string,
    created: PropTypes.string
  })).isRequired,
  isLink: PropTypes.bool
};

export default PostsGrid;
