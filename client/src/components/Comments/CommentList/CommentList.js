import React from 'react';
import { commentsPropType } from 'customPropTypes';
import styles from './CommentList.module.scss';
import Comment from '../Comment/Comment';

const CommentList = ({ comments, isPostPage = false, postId }) => {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentListWrapper}>
        {comments.map(comment => (
          <Comment
            postId={postId}
            key={comment._id}
            comment={comment}
            isPostPage={isPostPage}
          />
        ))}
      </div>
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
