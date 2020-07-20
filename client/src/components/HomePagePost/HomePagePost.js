import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiChat3Line } from 'react-icons/ri';
import { GrBookmark } from 'react-icons/gr';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import ShareModalIcon from 'components/Icons/ChatIcon/ChatIcon';
import HomePagePostHeader from 'components/HomePagePost/HomePagePostHeader/HomePagePostHeader';
// import Button from 'components/Button/Button';
import styles from './HomePagePost.module.scss';

const HomePagePost = ({ post }) => {
  const { likes, comments, content, user: { username = '', profilePic = '' }, media, created, _id } = post;
  const handleSubmit = e => {
    e.preventDefault();
  };
  const [isHeartIconFilled, setHeartIconFilled] = useState(false);

  return (

    <article className={styles.postContainer}>
      <HomePagePostHeader username={username} profilePic={profilePic} _id={_id} />
      <img alt="post media" src={media} className={styles.postPicture} />
      <div className={styles.iconsWrapper}>
        <div className={styles.leftIconsWrapper}>
          <HeartIcon isActive={isHeartIconFilled} isLike onClick={() => setHeartIconFilled(!isHeartIconFilled)} />
          <RiChat3Line className={styles.chatIcon} />
          <ShareModalIcon className={styles.ShareModalIcon} />
        </div>
        <GrBookmark className={styles.bookMark} />
      </div>
      <div className={styles.likesAmount}>
        {likes}
        &nbsp;likes
      </div>
      <div className={styles.postContentContainer}>
        <Link to={`/${username}`}>
          <span className={styles.username}>
            {username}
          </span>
        </Link>
        <span>{content}</span>
      </div>
      <a href="#" className={styles.postAge}>*** ***** AGO</a>
      <form onSubmit={handleSubmit} className={styles.commentContainer}>
        <textarea id="commentTextArea" placeholder="Add a comment" className={styles.commentInput} />
        <button type="submit" className={styles.postButton}>Post</button>
      </form>
    </article>
  );
};
export default HomePagePost;