import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postPropType } from 'customPropTypes';
import UserIdentifier from 'components/UserIdentifier/UserIdentifier';
import Button from 'components/Button/Button';
import FollowButton from 'components/FollowButton/FollowButton';
import { FiMoreHorizontal } from 'react-icons/fi';
import HomePagePostIconBar from 'components/HomePagePost/HomePagePostIconsBar/HomePagePostIconBar';
import HomePageModal from 'components/Modals/HomePageModal/HomePageModal';
import CommentList from 'components/Comments/CommentList/CommentList';
import CommentForm from 'components/Comments/CommentForm/CommentForm';
import PostContent from 'components/Post/PostContent/PostContent';
import CreatedTime from 'components/CreatedTime/CreatedTime';
import NumOfLikes from 'components/HomePagePost/NumOfLikes/NumOfLikes';
import { followsSelector } from 'actions/follows/followSelectors';
import { togglePostLike } from 'actions/post/postActions';
import { setNumOfFollowers } from 'actions/profile/profileActions';
import { toggleFollows, getFollows } from 'actions/follows/followActions';
import styles from './Post.module.scss';

const structuredFollowSelector = createStructuredSelector({
  follows: followsSelector
});

const Post = ({ post, isAuthenticatedUser, authenticatedUserId = '' }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { follows } = useSelector(structuredFollowSelector);
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(togglePostLike(post._id, post.isPostLiked));
  };

  useEffect(() => {
    setIsFollowed(follows.some(follow => (follow._id === post.user._id)));
  }, [follows, post.user._id]);

  const handleFollow = async () => {
    await dispatch(toggleFollows(post.user._id, isFollowed));
    await dispatch(getFollows(authenticatedUserId, 'following'));
    if (isFollowed) {
      dispatch(setNumOfFollowers(-1));
    } else {
      dispatch(setNumOfFollowers(1));
    }
  };

  const {
    comments,
    content,
    user: {
      username = '',
      profilePic = ''
    },
    media,
    created,
    _id: postId,
    isPostLiked
  } = post;

  const [isModalOpen, setModalOpen] = useState(false);
  const [isCommentBubbleClicked, setCommentBubbleClicked] = useState(false);
  const [replyClicked, setReplyClicked] = useState(
    {
      wasClicked: false,
      parentCommentId: ''
    }
  );
  return (
    <div className={styles.container}>
      <div className={styles.media}>
        <img alt="post media" src={media} onDoubleClick={handleLike} />
      </div>
      <div className={styles.cssHelper}>
        <div className={styles.postContentContainer}>
          <div className={styles.postContentHeader}>
            <div className={styles.postContentHeaderIdentifier}>
              <UserIdentifier
                username={username}
                profilePic={profilePic}
              />
              {
                !isAuthenticatedUser
                  && (
                  <FollowButton
                    handleFollow={handleFollow}
                    isFollowed={isFollowed}
                    astext="astext"
                  />
                  )
              }
            </div>
            <Button btnRole="astext">
              <FiMoreHorizontal
                className={styles.moreIcon}
                onClick={() => {
                  setModalOpen(true);
                }}
              />
            </Button>
            {isModalOpen && (
            <HomePageModal
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              postId={postId}
            />
            )}
          </div>
          <div className={styles.contentWrap}>
            <PostContent username={username} profilePic={profilePic} content={content} />
            <Link to={`/p/${postId}`}>
              <CreatedTime created={created} isPost />
            </Link>
          </div>
          {
            comments
            && (
            <CommentList
              replyClicked={replyClicked}
              setReplyClicked={setReplyClicked}
              comments={comments}
              isPostPage
              className={styles.postComments}
              postId={postId}
            />
            )
          }
        </div>

        <div className={styles.iconsAndFormWrapper}>
          <HomePagePostIconBar
            isCommentBubbleClicked={isCommentBubbleClicked}
            setCommentBubbleClicked={setCommentBubbleClicked}
            isPostPage
            isLike={isPostLiked}
            postId={postId}
            className={styles.icons}
          />
          <NumOfLikes likes={post.numOfLikes} postId={postId} />
          <Link to={`/p/${postId}`}>
            <CreatedTime created={created} isPost />
          </Link>
          {postId && !!replyClicked && (
          <CommentForm
            isCommentBubbleClicked={isCommentBubbleClicked}
            setCommentBubbleClicked={setCommentBubbleClicked}
            replyClicked={replyClicked}
            setReplyClicked={setReplyClicked}
            postId={postId}
            isPostPage
          />
          )}
        </div>
      </div>

    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape(postPropType).isRequired,
  isAuthenticatedUser: PropTypes.bool.isRequired,
  authenticatedUserId: PropTypes.string.isRequired
};
export default Post;
