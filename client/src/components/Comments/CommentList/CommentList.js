import React from 'react';
import { commentsPropType } from 'customPropTypes';
import styles from './CommentList.module.scss';
import Comment from '../Comment/Comment';

const CommentList = ({ comments, isPostPage = false }) => {
  return (
    <div className={styles.commentListWrapper}>
      {comments.map(comment => (
        <Comment
          key={comment._id}
          comment={comment}
          isPostPage={isPostPage}
        />
      ))}
    </div>
  );
};

CommentList.defaultProps = {
  isPostPage: false
};

CommentList.propTypes = {
  ...commentsPropType
};

export default CommentList;
