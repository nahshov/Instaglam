import React from 'react';
import styles from './commentForm.module.scss';

const CommentForm = () => {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentContainer}>
      <textarea id="commentTextArea" placeholder="Add a comment" className={styles.commentInput} />
      <button type="submit" className={styles.postButton}>Post</button>
    </form>

  );
};

export default CommentForm;
