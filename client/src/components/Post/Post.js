import React, { useState } from 'react';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RiChat3Line } from 'react-icons/ri';
import { GrBookmark } from 'react-icons/gr';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import ShareModalIcon from 'components/Icons/ChatIcon/ChatIcon';
import styles from './Post.module.scss';

const Post = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
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
    </article>
  );
};

export default Post;
