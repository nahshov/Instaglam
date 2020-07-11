import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RiChat3Line } from 'react-icons/ri';
import { GrBookmark } from 'react-icons/gr';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import ShareModalIcon from 'components/Icons/ChatIcon/ChatIcon';
import { getAllPosts } from 'actions/posts/postActions';
import { searchUsers } from 'actions/users/userActions';
import styles from './HomePagePost.module.scss';

const HomePagePost = () => {
  const { posts: { posts }, users: { user } } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
  };
  // const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <article className={styles.postContainer}>
      <header className={styles.headerPostContainer}>
        <div className={styles.postHeader}>
          <div className={styles.userIdentifier}>
            <div className={styles.circle} />
            <a href="#" className={styles.username}>
              name
            </a>
          </div>
          <FiMoreHorizontal className={styles.moreIcon} onClick={() => console.log('hello')} />
        </div>
      </header>
      <div className={styles.postPicture} />
      <div className={styles.iconsWrapper}>
        <div className={styles.leftIconsWrapper}>
          <HeartIcon className={styles.heartIcon} />
          <RiChat3Line className={styles.chatIcon} />
          <ShareModalIcon className={styles.ShareModalIcon} />
        </div>
        <GrBookmark className={styles.bookMark} />
      </div>
      <div className={styles.likesAmount}> **likes</div>
      <div className={styles.postContentContainer}>
        <span className={styles.username}> username </span>
        <span>hey there i am using instaglam</span>
      </div>
      <a href="#" className={styles.postAge}>*** ***** AGO</a>
      <form onSubmit={handleSubmit} className={styles.commentContainer}>
        <textarea id="commentTextArea" className={styles.commentInput} />
        <label htmlFor="commentTextArea" className={styles.commentLabel}>Add a comment...</label>
        <button type="submit" className={styles.postButton}>Post</button>
      </form>
    </article>
  );
};
export default HomePagePost;