import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { postPropType } from 'customPropTypes';
import UserIdentifier from 'components/UserIdentifier/UserIdentifier';
import Button from 'components/Button/Button';
import FollowButton from 'components/FollowButton/FollowButton';
import { FiMoreHorizontal } from 'react-icons/fi';
import HomePageModal from 'components/Modals/HomePageModal/HomePageModal';
import CommentList from 'components/Comments/CommentList/CommentList';
import { togglePostOwnerFollow } from 'actions/post/postActions';
import { setNumOfFollowing } from 'actions/profile/profileActions';
import styles from './Post.module.scss';

const Post = ({ post, authenticatedUserId }) => {
  const dispatch = useDispatch();
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
    numOfLikes,
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
  return (
    <div className={styles.container}>
      <div
        className={styles.media}
        style={{
          background: `url(${media}) no-repeat center center / cover`
        }}
      />
      <div className={styles.postContentContainer}>
        <div className={styles.postContentHeader}>
          <div className={styles.postContentHeaderIdentifier}>
            <UserIdentifier
              className={styles.UserIdentifier}
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
        <CommentList comments={post.comments} isHomePage={false} />
        comments
        commentform
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape(postPropType).isRequired,
  authenticatedUserId: PropTypes.string.isRequired
};
export default Post;
