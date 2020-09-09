import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { togglePostCommentLike } from 'actions/post/postActions';
import { toggleHomeCommentLike } from 'actions/posts/postActions';
import Button from 'components/Button/Button';
import CreatedTime from 'components/CreatedTime/CreatedTime';
import NumOfLikes from 'components/HomePagePost/NumOfLikes/NumOfLikes';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import Reply from 'components/Comments/Reply/Reply';
import { commentsPropType } from 'customPropTypes';
import styles from './Comment.module.scss';

const Comment = (
  {
    comment,
    isPostPage = false,
    postId,
    onlyReplies,
    setReplyClicked
  }
) => {
  const [shownReplies, setShownReplies] = useState(false);
  const [heartClickLoading, setHeartClickLoading] = useState(false);

  useEffect(() => {}, [comment.user.profilePic]);

  const dispatch = useDispatch();

  const filteredReply = onlyReplies.filter(reply => reply.replyToComment === comment._id);

  const handleLike = async (comment) => {
    setHeartClickLoading(true);

    if (isPostPage) {
      await dispatch(togglePostCommentLike(comment._id, comment.isCommentLiked));
      setHeartClickLoading(false);
    } else {
      await dispatch(toggleHomeCommentLike(comment._id, comment.isCommentLiked, comment.post));
      setHeartClickLoading(false);
    }
  };

  return (
    <div className={styles.comment} style={isPostPage ? { margin: '15px 0px' } : {}}>
      <div className={styles.commentHeader}>
        <div style={{ height: `${isPostPage ? 'auto' : ''}` }} className={styles.commentData}>
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
            heartClickLoading={heartClickLoading}
          />
        </div>
      </div>
      {filteredReply && !!filteredReply.length && isPostPage
         && (
           <>
             <button
               type="button"
               className={styles.replyBar}
               onClick={() => setShownReplies(!shownReplies)}
             >
               <div className={styles.grayLine} />
               <span>
                 {!shownReplies ? `View Replies(${filteredReply.length})` : 'Hide Replies' }
               </span>
             </button>
               {shownReplies && (
                 filteredReply.map(reply => (
                   <Reply setReplyClicked={setReplyClicked} reply={reply} key={reply._id} />
                 )))}
           </>
         )}
      {isPostPage
      && (
        <div className={styles.commentActions} style={!filteredReply.length ? { marginTop: '-5px' } : {}}>
          <Link to={`/p/${postId}`}>
            <CreatedTime created={comment.created} isPost />
          </Link>
          <NumOfLikes
            id={comment._id}
            likes={comment.numOfLikes}
            isSinglePost
            isComment
          />
          <Button
            style={{ margin: '0px 0px 0px 10px', padding: '0', fontSize: '13px', height: 'auto' }}
            btnRole="astext primary"
            onClick={() => setReplyClicked({ wasClicked: true, parentCommentId: comment._id })}
          >
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
