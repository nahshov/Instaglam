import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import PropTypes from 'prop-types';
import { toggleCommentLike } from 'actions/posts/postActions';
import styles from './HomePagePostComments.module.scss';

const HomePagePostComments = ({ postComments, postId }) => {
  const dispatch = useDispatch();
  const handleLike = (comment) => {
    dispatch(toggleCommentLike(comment._id, comment.isCommentLiked, postId));
  };

  return (
    <div className={styles.homePagePostCommentUserIdentifier}>
      {postComments.map((comment) => {
        return comment && (
          <div key={comment._id} className={styles.eachComment}>
            <div className={styles.nameAndContent}>
              <span className={styles.username}>
                <Link to={`/${comment.user.username}`}>
                  {comment.user.username}
                </Link>
              &nbsp;
              </span>
              <span>
                {comment.content}
              </span>
            </div>
            <div>
              <HeartIcon
                isRed
                isFilled={comment.isCommentLiked}
                onClick={() => {
                  handleLike(comment);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

HomePagePostComments.propTypes = {
  postComments: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    created: PropTypes.string,
    isCommentLiked: PropTypes.bool,
    numOfLikes: PropTypes.number,
    post: PropTypes.string,
    replyToComment: PropTypes.string,
    user: {
      username: PropTypes.string,
      _id: PropTypes.string
    },
    __v: PropTypes.number,
    _id: PropTypes.string
  })).isRequired,
  postId: PropTypes.string.isRequired
};

export default HomePagePostComments;
