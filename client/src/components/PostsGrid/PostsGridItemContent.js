import React from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart } from 'react-icons/ai';
import { BsChatFill } from 'react-icons/bs';
import styles from './PostsGrid.module.scss';

const PostsGridItemContent = ({ likes = 0, comments = 0 }) => (
  <div className={styles.profilePostIconsContainer}>
    <div className={styles.profilePostLikes}>
      <AiFillHeart className={styles.profilePostLikeIcon} />
      <span className={styles.profilePostNumOfLikes}>
        {likes}
      </span>
    </div>
    <div className={styles.profilePostComments}>
      <BsChatFill className={styles.profilePostCommentsIcon} />
      <span className={styles.profilePostNumOfComments}>
        {comments}
      </span>
    </div>
  </div>
);

export default PostsGridItemContent;

PostsGridItemContent.defaultProps = {
  likes: 0,
  comments: 0
};

PostsGridItemContent.propTypes = {
  likes: PropTypes.number,
  comments: PropTypes.number
};
