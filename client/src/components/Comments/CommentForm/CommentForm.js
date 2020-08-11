import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addAComment } from 'actions/posts/postActions';
// import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import styles from './CommentForm.module.scss';

const CommentForm = ({ postId }) => {
  // const { loading } = useSelector(state => { return state.posts; });

  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const handleChange = ((e) => {
    setInputValue(e.target.value);
  });

  const checkDisabled = () => {
    return !inputValue.trim();
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!inputValue) return;
    dispatch(addAComment(postId, inputValue));
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentContainer}>
      <textarea value={inputValue} onChange={handleChange} id="commentTextArea" placeholder="Add a comment" className={styles.commentInput} />
      <button type="submit" disabled={checkDisabled()} className={styles.postButton}>Post</button>
      {/* {loading ? <LoadingSpinner style={{ width: '24px' }} /> : setInputValue('') } */}
    </form>

  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired
};

export default CommentForm;
