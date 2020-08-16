import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomePagePostHeader from 'components/HomePagePost/HomePagePostHeader/HomePagePostHeader';
import HomePagePostMedia from 'components/HomePagePost/HomePagePostMedia/HomePagePostMedia';
import HomePagePostIconBar from 'components/HomePagePost/HomePagePostIconsBar/HomePagePostIconBar';
import PostLikes from 'components/HomePagePost/PostLikes/PostLikes';
import HomePagePostContent from 'components/HomePagePost/HomePagePostContent/HomePagePostContent';
import CreatedTime from 'components/CreatedTime/CreatedTime';
import CommentForm from 'components/Comments/CommentForm/CommentForm';
import CommentList from 'components/Comments/CommentList/CommentList';
import { postPropType } from 'customPropTypes';
import styles from './HomePagePost.module.scss';
import ViewAllComments from '../Comments/ViewAllComments/ViewAllComments';
import PostModal from '../Modals/PostModal/PostModal';

const HomePagePost = ({
  post
}) => {
  const {
    numOfLikes,
    numOfComments,
    content,
    user: {
      username = '',
      profilePic = ''
    },
    media,
    created,
    _id: postId,
    isPostLiked,
    comments
  } = post;

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  console.log(post);

  return (
    <article className={styles.postContainer}>
      <HomePagePostHeader
        username={username}
        profilePic={profilePic}
        postId={postId}
        className={styles.postHeader}
      />
      <HomePagePostMedia media={media} isLike={isPostLiked} postId={postId} />
      <HomePagePostIconBar
        isLike={isPostLiked}
        postId={postId}
      />
      <PostLikes
        likesOfPost={numOfLikes}
        username={username}
        profilePic={profilePic}
        postId={postId}
      />
      <HomePagePostContent username={username} content={content} />
      <ViewAllComments numOfComments={numOfComments} setIsPostModalOpen={setIsPostModalOpen} />
      <CommentList comments={post.comments} />
      <Link to={`/p/${postId}`}>
        <CreatedTime created={created} />
      </Link>
      {postId && <CommentForm postId={postId} />}
      {isPostModalOpen && (
        <PostModal
          isOpen={isPostModalOpen}
          setModalOpen={setIsPostModalOpen}
          post={post}
        />
      )}
    </article>
  );
};

HomePagePost.propTypes = {
  ...postPropType
};

export default HomePagePost;
