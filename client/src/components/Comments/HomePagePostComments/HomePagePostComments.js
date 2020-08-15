import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import PropTypes from 'prop-types';
import { toggleCommentLike } from 'actions/posts/postActions';
import { commentsPropType } from 'customPropTypes';
import styles from './HomePagePostComments.module.scss';
const HomePagePostComments = ({ postComments, postId }) => {
  console.log(postComments)
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
  postComments: PropTypes.arrayOf(PropTypes.shape(commentsPropType)).isRequired,
  postId: PropTypes.string.isRequired
};

export default HomePagePostComments;
