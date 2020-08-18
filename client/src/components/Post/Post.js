import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { postPropType } from 'customPropTypes';
import UserIdentifier from 'components/UserIdentifier/UserIdentifier';
import Button from 'components/Button/Button';
import { FiMoreHorizontal } from 'react-icons/fi';
import HomePageModal from 'components/Modals/HomePageModal/HomePageModal';
import CommentList from 'components/Comments/CommentList/CommentList';
import styles from './Post.module.scss';

const Post = ({ post }) => {
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
          <UserIdentifier className={styles.UserIdentifier} username={username} profilePic={profilePic} />
          <Button btnRole="astext">
            <FiMoreHorizontal
              className={styles.moreIcon}
              onClick={() => {
                setModalOpen(true)
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
  post: PropTypes.shape(postPropType).isRequired
};
export default Post;
