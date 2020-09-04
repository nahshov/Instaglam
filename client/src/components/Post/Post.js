import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { togglePostOwnerFollow, togglePostLike } from 'actions/post/postActions';
import { setNumOfFollowing } from 'actions/profile/profileActions';
import styles from './Post.module.scss';

const Post = ({ post, authenticatedUserId }) => {
  
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(togglePostLike(post._id, post.isPostLiked));
  };
  const handleFollow = async (userId, isFollowed) => {
    await dispatch(togglePostOwnerFollow(userId, isFollowed));

    if (post.user.isFollowed) {
      dispatch(setNumOfFollowing(-1));
    } else {
      dispatch(setNumOfFollowing(1));
    }

    return Promise.resolve();
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
  const [replyClicked, setReplyClicked] = useState(false);
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
                  post.user._id !== authenticatedUserId
                  && (
                  <FollowButton
                    isFollowed={post.user.isFollowed}
                    handleFollow={() => {
                      handleFollow(post.user._id, post.user.isFollowed);
                      return Promise.resolve();
                    }}
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
            <HomePageModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} postId={postId} />)}
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
            isPostPage
            isLike={isPostLiked}
            postId={postId}
            className={styles.icons}
          />
          <NumOfLikes likes={post.numOfLikes} postId={postId} />
          <Link to={`/p/${postId}`}>
            <CreatedTime created={created} isPost />
          </Link>
          {postId && <CommentForm replyClicked={replyClicked} setReplyClicked={setReplyClicked} postId={postId} isPostPage />}
        </div>
      </div>

    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape(postPropType).isRequired,
  authenticatedUserId: PropTypes.string.isRequired
};
export default Post;
