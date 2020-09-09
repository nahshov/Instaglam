import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { HomePageAddAComment } from 'actions/posts/postActions';
import { postAddAComment } from 'actions/post/postActions';
import Button from 'components/Button/Button';
import styles from './CommentForm.module.scss';

const CommentForm = ({
  postId,
  isPostPage = false,
  replyClicked = {
    wasClicked: false,
    parentCommentId: ''
  },
  setReplyClicked = () => {},
  isCommentBubbleClicked,
  setCommentBubbleClicked
}) => {
  const [commentLoading, setCommentLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const textArea = useRef();
  if ((replyClicked && replyClicked.wasClicked) || isCommentBubbleClicked) {
    textArea.current.focus();
  }
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
    if (isPostPage) {
      if (replyClicked && replyClicked.parentCommentId) {
        await dispatch(postAddAComment(postId, inputValue, replyClicked.parentCommentId));
      } else {
        await dispatch(postAddAComment(postId, inputValue));
      }
      setInputValue('');
    } else {
      await dispatch(HomePageAddAComment(postId, inputValue));
      setInputValue('');
    }
    setCommentLoading(false);
  };
  return (
    <form style={{ background: '#fff' }} onSubmit={handleSubmit} className={styles.commentContainer}>
      <textarea
        onBlur={() => {
          if (replyClicked && replyClicked.wasClicked) {
            setReplyClicked({
              ...replyClicked,
              wasClicked: false
            });
          } else if (isCommentBubbleClicked) {
            setCommentBubbleClicked(false);
          }
        }}
        ref={textArea}
        value={inputValue}
        onChange={handleChange}
        id={postId}
        placeholder="Add a comment"
        className={styles.commentInput}
      />
      <Button
        type="submit"
        btnRole="astext"
        disabled={checkDisabled()}
        isLoading={commentLoading}
        className={styles.postButton}
      >
        Post
      </Button>
    </form>

  );
};

CommentForm.defaultProps = {
  isPostPage: false,
  replyClicked: {
    wasClicked: false,
    parentCommentId: ''
  },
  setReplyClicked: () => {}
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  isPostPage: PropTypes.bool,
  replyClicked: PropTypes.shape({
    wasClicked: PropTypes.bool,
    parentCommentId: PropTypes.string
  }),
  setReplyClicked: PropTypes.func,
  isCommentBubbleClicked: PropTypes.bool.isRequired,
  setCommentBubbleClicked: PropTypes.func.isRequired
};

export default CommentForm;
