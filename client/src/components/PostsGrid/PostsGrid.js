import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { AiFillHeart } from 'react-icons/ai';
import { BsChatFill } from 'react-icons/bs';
import styles from './PostsGrid.module.scss';
import PostModal from '../Modals/PostModal/PostModal';

const PostsGrid = ({ posts }) => {
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
        <div
          key={post._id}
          className={styles.profilePost}
          style={{
            background: `url(${post.media}) no-repeat center center / cover`
          }}
          onClick={() => {
            document.body.style = 'overflow: hidden';
            window.history.pushState(
              {},
              'post modal path',
              `/p/${post._id}`
            );
            setSearchedPost(posts.find(p => p._id === post._id));
            setIsPostModal(!isPostModal);
          }}
        >
          <div className={styles.profilePostOverlay}>
            <div className={styles.profilePostIconsContainer}>
              <div className={styles.profilePostLikes}>
                <AiFillHeart className={styles.profilePostLikeIcon} />
                <span className={styles.profilePostNumOfLikes}>
                  {post.likes}
                </span>
              </div>
              <div className={styles.profilePostComments}>
                <BsChatFill className={styles.profilePostCommentsIcon} />
                <span className={styles.profilePostNumOfComments}>
                  {post.comments}
                </span>
              </div>
            </div>
          </div>
        </div>
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

PostsGrid.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    likes: PropTypes.number,
    comments: PropTypes.number,
    _id: PropTypes.string,
    content: PropTypes.string,
    user: PropTypes.string,
    media: PropTypes.string,
    created: PropTypes.string
  })).isRequired
};

export default PostsGrid;
