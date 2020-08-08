import React from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart } from 'react-icons/ai';
import { BsChatFill } from 'react-icons/bs';
import styles from './PostsGrid.module.scss';

const PostsGridItemContent = ({ numOfLikes = 0, numOfComments = 0 }) => {
  return (
    <div className={styles.profilePostIconsContainer}>
      <div className={styles.profilePostLikes}>
        <AiFillHeart className={styles.profilePostLikeIcon} />
        <span className={styles.profilePostNumOfLikes}>
          {numOfLikes}
        </span>
      </div>
      <div className={styles.profilePostComments}>
        <BsChatFill className={styles.profilePostCommentsIcon} />
        <span className={styles.profilePostNumOfComments}>
          {numOfComments}
        </span>
      </div>
    </div>
  );
};

export default PostsGridItemContent;

PostsGridItemContent.defaultProps = {
  numOfLikes: 0,
  numOfComments: 0
};

PostsGridItemContent.propTypes = {
  numOfLikes: PropTypes.number,
  numOfComments: PropTypes.number
};
