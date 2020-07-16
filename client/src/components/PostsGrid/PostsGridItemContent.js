import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { BsChatFill } from 'react-icons/bs';
import styles from './PostsGrid.module.scss';

const PostsGridItemContent = ({ isLink, post }) => (
  !isLink ? (
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
  ) : (
    <Link to={`/p/${post._id}`} className={styles.profilePostOverlay}>
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
    </Link>
  )
);
export default PostsGridItemContent;

PostsGridItemContent.propTypes = {
  post: PropTypes.shape({
    likes: PropTypes.number,
    comments: PropTypes.number,
    _id: PropTypes.string,
    media: PropTypes.string,
    user: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  isLink: PropTypes.bool.isRequired
};
