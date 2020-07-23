import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import HomePagePostHeader from 'components/HomePagePost/HomePagePostHeader/HomePagePostHeader';
import HomePagePostMedia from 'components/HomePagePost/HomePagePostMedia/HomePagePostMedia';
import HomePagePostIconBar from 'components/HomePagePost/HomePagePostIconsBar/HomePagePostIconBar';
import PostLikes from 'components/HomePagePost/PostLikes/PostLikes'
import { postPropType } from 'customPropTypes';
import {loadLikesOfPost, addLikeToPost} from 'actions/likes/likeActions'
import styles from './HomePagePost.module.scss';

const HomePagePost = ({ 
  post: 
    { likesOfPost,
      comments,
      content,
      user: { 
        username = '',
        profilePic = ''
      }, 
      media, 
      created, 
      _id, 
      isUserliked
      }
   }) => {
  const { likes: { likes, fetchLikesLoading, isLikeLoading, isLike }, auth: { user } } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch((loadLikesOfPost));
  }, [likes]);

  const handleSubmit = e => {
    e.preventDefault();
  };
  const userLike = likes.find((like) => like.user === user._id) || false;

  return (

    <article className={styles.postContainer}>
      <HomePagePostHeader username={username} profilePic={profilePic} postId={_id} />
      <HomePagePostMedia media={media} onToggleLike />
      <HomePagePostIconBar isLike={isLike} initialLikeState={isUserliked} isLikeLoading={isLikeLoading} postId={_id} likeId={userLike._id} />
      <PostLikes likes={likesOfPost} />
      <div className={styles.postContentContainer}>
        <Link to={`/${username}`}>
          <span className={styles.username}>
            {username}
          </span>
        </Link>
        <span>{content}</span>
      </div>
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
