import React from 'react';
import { commentsPropType } from 'customPropTypes';
import styles from './CommentList.module.scss';
import Comment from '../Comment/Comment';

const CommentList = ({ comments, isPostPage = false, postId }) => {
  const onlyComments = comments.filter(comment => !comment.replyToComment);
  const onlyReplies = comments.filter(comment => comment.replyToComment);

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentListWrapper}>
        {onlyComments.map(comment => (
          <Comment
            onlyReplies={onlyReplies}
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
