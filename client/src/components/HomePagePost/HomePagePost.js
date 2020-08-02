import React from 'react';
import { Link } from 'react-router-dom';
import HomePagePostHeader from 'components/HomePagePost/HomePagePostHeader/HomePagePostHeader';
import HomePagePostMedia from 'components/HomePagePost/HomePagePostMedia/HomePagePostMedia';
import HomePagePostIconBar from 'components/HomePagePost/HomePagePostIconsBar/HomePagePostIconBar';
import PostLikes from 'components/HomePagePost/PostLikes/PostLikes';
import HomePagePostContent from 'components/HomePagePost/HomePagePostContent/HomePagePostContent';
import CreatedTime from 'components/CreatedTime/CreatedTime';
// import PostCommentForm from 'components/PostCommentForm/PostCommentForm';
// import PostCommentList from 'components/PostCommentList/PostCommentList';
import { postPropType } from 'customPropTypes';
import styles from './HomePagePost.module.scss';

const HomePagePost = ({
  post:
    { likes: numOfLikes,
      comments,
      content,
      user: {
        username = '',
        profilePic = ''
      },
      media,
      created,
      _id: postId,
      isUserLiked
    }
}) => {
  return (
    <article className={styles.postContainer}>
      <HomePagePostHeader username={username} profilePic={profilePic} postId={postId} />
      <HomePagePostMedia media={media} isLike={isUserLiked} postId={postId} />
      <HomePagePostIconBar
        isLike={isUserLiked}
        postId={postId}
      />
      <PostLikes
        likesOfPost={numOfLikes}
        username={username}
        profilePic={profilePic}
        postId={postId}
      />
      <HomePagePostContent username={username} content={content} />
      <Link to={`/p/${postId}`}>
        <CreatedTime created={created} />
      </Link>
      {/* <CommentList />
      <CommentForm /> */}
      {/* comment list */}
      {/* comment form */}
    </article>
  );
};

HomePagePost.propTypes = {
  ...postPropType
};

export default HomePagePost;
