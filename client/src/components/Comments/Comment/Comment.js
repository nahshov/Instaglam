import React from 'react';
import { useDispatch } from 'react-redux';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import { commentsPropType } from 'customPropTypes';
import { togglePostCommentLike } from 'actions/post/postActions';
import { toggleHomeCommentLike } from 'actions/posts/postActions';
import { Link } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import styles from './Comment.module.scss';

const Comment = ({ comment, isPostPage = false }) => {
  const dispatch = useDispatch();
  const handleLike = (comment) => {
    if (isPostPage) {
      dispatch(togglePostCommentLike(comment._id, comment.isCommentLiked));
    } else {
      dispatch(toggleHomeCommentLike(comment._id, comment.isCommentLiked, comment.post));
    }
  };
  return (
    <div className={styles.comment}>
      <div style={{ height: `${isPostPage ? '65px' : ''}` }} className={styles.commentData}>
        {isPostPage && <ProfilePic url={comment.user.profilePic} size="medium" />}
        <span>
          <Link to={`/${comment.user.username}`} className={isPostPage ? styles.postPageUsername : styles.homePageUsername}>
            {comment.user.username}
          </Link>
            &nbsp;
        </span>
        <span>
          {comment.content}
        </span>
      </div>
      <div className={styles.commentHeartIcon}>
        <HeartIcon
          isRed
          isFilled={comment.isCommentLiked}
          onClick={() => {
            handleLike(comment);
          }}
        />
      </div>
    </div>
  );
};

Comment.propTypes = {
  ...commentsPropType
};

export default Comment;
