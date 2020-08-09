import React from 'react';
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

const HomePagePost = ({
  post
}) => {
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

  console.log(post)
  return (
    <article className={styles.postContainer}>
      <HomePagePostHeader username={username} profilePic={profilePic} postId={postId} />
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
      <CommentList post={post} />
      <Link to={`/p/${postId}`}>
        <CreatedTime created={created} />
      </Link>
      {postId && <CommentForm postId={postId} />}
    </article>
  );
};

HomePagePost.propTypes = {
  ...postPropType
};

export default HomePagePost;
