import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import { commentsPropType } from 'customPropTypes';
import { togglePostCommentLike } from 'actions/post/postActions';
import { toggleHomeCommentLike } from 'actions/posts/postActions';
import { Link } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import NumOfLikes from 'components/HomePagePost/NumOfLikes/NumOfLikes';
import CreatedTime from 'components/CreatedTime/CreatedTime';
import Button from 'components/Button/Button';
import styles from './Comment.module.scss';

const Comment = ({ comment, isPostPage = false, postId }) => {
  console.log(comment)
  const dispatch = useDispatch();
  const handleLike = (comment) => {
    if (isPostPage) {
      dispatch(togglePostCommentLike(comment._id, comment.isCommentLiked));
    } else {
      dispatch(toggleHomeCommentLike(comment._id, comment.isCommentLiked, comment.post));
    }
  };
  useEffect(() => {}, [comment.user.profilePic]);
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <div style={{ height: `${isPostPage ? '30px' : ''}` }} className={styles.commentData}>
          {isPostPage && comment.user.profilePic && <ProfilePic url={comment.user.profilePic} size="medium" />}
          <span>
            <Link to={`/${comment.user.username}`} className={isPostPage ? styles.postPageUsername : styles.homePageUsername}>
              {comment.user.username}
            </Link>
              &nbsp;
          </span>
          <span>
            {comment.content}
          </span>
        </div>
        <div className={styles.commentHeartIcon}>
          <HeartIcon
            isRed
            isFilled={comment.isCommentLiked}
            onClick={() => {
              handleLike(comment);
            }}
          />
        </div>
      </div>
      {isPostPage
      && (
        <div className={styles.commentActions}>
          <Link to={`/p/${postId}`}>
            <CreatedTime created={comment.created} isPost />
          </Link>
          <NumOfLikes postId={postId} likes={comment.numOfLikes} isPost />
          <Button style={{ margin: '0px 0px 0px 10px', padding: '0' }} btnRole="astext primary">
            Reply
          </Button>
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  ...commentsPropType
};

export default Comment;
