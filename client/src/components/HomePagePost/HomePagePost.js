import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import HomePagePostHeader from 'components/HomePagePost/HomePagePostHeader/HomePagePostHeader';
import HomePagePostMedia from 'components/HomePagePost/HomePagePostMedia/HomePagePostMedia';
import HomePagePostIconBar from 'components/HomePagePost/HomePagePostIconsBar/HomePagePostIconBar';
import PostLikes from 'components/HomePagePost/PostLikes/PostLikes';
import HomePagePostContent from 'components/HomePagePost/HomePagePostContent/HomePagePostContent';
import { postPropType } from 'customPropTypes';
import { loadLikesOfPost, addLikeToPost } from 'actions/likes/likeActions';
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
  const {
    likes:
    { likesOfPost },
    auth: {
      user
    } } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLikesOfPost(postId));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <article className={styles.postContainer}>
      <HomePagePostHeader username={username} profilePic={profilePic} postId={postId} />
      <HomePagePostMedia media={media} onToggleLike />
      <HomePagePostIconBar
        isLike={isUserLiked}
        postId={postId}
      />
      <PostLikes likesOfPost={numOfLikes} />
      <HomePagePostContent username={username} content={content} />
      <Link to="/" className={styles.postAge}>*** ***** AGO</Link>
      <form onSubmit={handleSubmit} className={styles.commentContainer}>
        <textarea id="commentTextArea" placeholder="Add a comment" className={styles.commentInput} />
        <button type="submit" className={styles.postButton}>Post</button>
      </form>
    </article>
  );
};

HomePagePost.propTypes = {
  ...postPropType
};

export default HomePagePost;
