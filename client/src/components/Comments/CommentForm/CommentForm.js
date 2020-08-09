import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addAComment } from 'actions/posts/postActions';
import styles from './CommentForm.module.scss';

const CommentForm = ({ postId }) => {
  const [disableButton, setDisableButton] = useState(true);
  const textAreaRef = useRef();
  const dispatch = useDispatch();
  const inputValueChanges = (() => {
    return (!textAreaRef.current.value || /^\s/.test(textAreaRef.current.value) ? setDisableButton(true) : setDisableButton(false));
  });
  const handleSubmit = e => {
    e.preventDefault();
    if (!textAreaRef.current.value) return;
    dispatch(addAComment(postId, textAreaRef.current.value));
    textAreaRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentContainer}>
      <textarea ref={textAreaRef} onChange={inputValueChanges} id="commentTextArea" placeholder="Add a comment" className={styles.commentInput} />
      <button type="submit" disabled={disableButton} className={styles.postButton}>Post</button>
    </form>

  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired
};

export default CommentForm;
