import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addAComment } from 'actions/posts/postActions';
import Button from 'components/Button/Button';
import styles from './CommentForm.module.scss';

const CommentForm = ({ postId }) => {
  const [commentLoading, setCommentLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = ((e) => {
    setInputValue(e.target.value);
  });

  const checkDisabled = () => {
    return !inputValue.trim();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!inputValue) return;
    setCommentLoading(true);
    await dispatch(addAComment(postId, inputValue));
    setInputValue('');
    setCommentLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.commentContainer}>
      <textarea value={inputValue} onChange={handleChange} id="commentTextArea" placeholder="Add a comment" className={styles.commentInput} />
      <Button type="submit" btnRole="astext" disabled={checkDisabled()} isLoading={commentLoading} className={styles.postButton}>Post</Button>
    </form>

  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired
};

export default CommentForm;
