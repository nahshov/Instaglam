import React from 'react';
import { commentsPropType } from 'customPropTypes';
import styles from './CommentList.module.scss';
import Comment from '../Comment/Comment';

const CommentList = ({ comments, isHomePage = true }) => (
  <div className={styles.commentListWrapper}>
    {comments.map(comment => (
      <Comment
        key={comment._id}
        comment={isHomePage
          ? {
            ...comment, user: { ...comment.user, profilePic: undefined }
          }
          : comment}
      />
    ))}
  </div>
);

CommentList.defaultProps = {
  isHomePage: true
};

CommentList.propTypes = {
  ...commentsPropType
};

export default CommentList;
