import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RiChat3Line } from 'react-icons/ri';
import { GrBookmark } from 'react-icons/gr';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import ShareModalIcon from 'components/Icons/ChatIcon/ChatIcon';
import styles from './HomePagePost.module.scss';

const HomePagePost = ({ post }) => {
  const { likes, comments, content, user: { username = '', profilePic = '' }, media, created } = post;
  const handleSubmit = e => {
    e.preventDefault();
  };
  // const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <article className={styles.postContainer}>
      <header className={styles.headerPostContainer}>
        <div className={styles.postHeader}>
          <div className={styles.userIdentifier}>
            <Link to={`/${username}`}>
              <ProfilePic url={profilePic} className={styles.profilePicLink} />
            </Link>
            <Link to={`/${username}`}>
              <button type="button" href="#" className={styles.username}>
                {username}
              </button>
            </Link>
          </div>
          <FiMoreHorizontal className={styles.moreIcon} onClick={() => console.log('hello')} />
        </div>
      </header>
      <img alt="post media" src={media} className={styles.postPicture} />
      <div className={styles.iconsWrapper}>
        <div className={styles.leftIconsWrapper}>
          <HeartIcon className={styles.heartIcon} />
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
        <button type="submit" className={styles.postButton}>djaslkdjslksdjakldsajdaskl</button>
      </form>
    </article>
  );
};
export default HomePagePost;
