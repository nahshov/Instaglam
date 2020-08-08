import React, { useState, useRef } from 'react';
import styles from './CommentForm.module.scss';

const CommentForm = () => {
  const [disableButton, setDisableButton] = useState(true);
  const textAreaRef = useRef();
  const dispatch = useDispatch();
  const inputValueChanges = (() => { return (!textAreaRef.current.value ? setDisableButton(true) : setDisableButton(false)); });
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentContainer}>
      <textarea ref={textAreaRef} onChange={inputValueChanges} id="commentTextArea" placeholder="Add a comment" className={styles.commentInput} />
      <button type="submit" disabled={disableButton} className={styles.postButton} onClick={() => console.log('hi')}>Post</button>
    </form>

  );
};

export default CommentForm;
