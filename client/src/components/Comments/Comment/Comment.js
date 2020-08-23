import React from 'react';
import { useDispatch } from 'react-redux';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import { commentsPropType } from 'customPropTypes';
import { toggleCommentLike } from 'actions/posts/postActions';
import { Link } from 'react-router-dom';
import styles from './Comment.module.scss';

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const handleLike = (comment) => {
    dispatch(toggleCommentLike(comment._id, comment.isCommentLiked, comment.post));
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentData}>
        {/* @tood: */}
        {/* {comment.profilePic && <ProfilePic />} */}
        <span>
          <Link to={`/${comment.user.username}`}>
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
