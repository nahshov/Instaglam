import React, { useEffect, useState } from 'react';
import HomePagePostHeader from 'components/HomePagePost/HomePagePostHeader/HomePagePostHeader';
import HomePagePostMedia from 'components/HomePagePost/HomePagePostMedia/HomePagePostMedia';
import HomePagePostIconBar from 'components/HomePagePost/HomePagePostIconsBar/HomePagePostIconBar';
import PostLikes from 'components/HomePagePost/PostLikes/PostLikes';
import HomePagePostContent from 'components/HomePagePost/HomePagePostContent/HomePagePostContent';
import HomePagePostCreatedTime from 'components/HomePagePost/HomePagePostCreatedTime/HomePagePostCreatedTime'
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
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <article className={styles.postContainer}>
      <HomePagePostHeader username={username} profilePic={profilePic} postId={postId} />
      <HomePagePostMedia media={media} isLike={isUserLiked} postId={postId} />
      <HomePagePostIconBar
        isLike={isUserLiked}
        postId={postId}
      />
      <PostLikes likesOfPost={numOfLikes} />
      <HomePagePostContent username={username} content={content} />
      <HomePagePostCreatedTime postId={postId} created={created} />
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
