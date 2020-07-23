import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RiChat3Line } from 'react-icons/ri';
import ShareModalIcon from 'components/Icons/ChatIcon/ChatIcon';
import { GrBookmark } from 'react-icons/gr';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import { toggleLike } from 'actions/likes/likeActions'
import styles from './HomePagePostIconBar.module.scss';

const HomePagePostIconBar = ({ isLike, isUserliked, isLikeLoading, postId, likeId}) => {
  useEffect(() => {

  }, []);
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(toggleLike(postId, likeId, isLike));
  };

  return (

    <div className={styles.iconsWrapper}>
      <div className={styles.leftIconsWrapper}>
        <HeartIcon
          isFilled={!isLikeLoading && isLike}
          isRed
          onClick={handleLike}
        />
        <RiChat3Line className={styles.chatIcon} />
        <ShareModalIcon className={styles.ShareModalIcon} />
      </div>
      <GrBookmark className={styles.bookMark} />
    </div>
  )
}

export default HomePagePostIconBar;
