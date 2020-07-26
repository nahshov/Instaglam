import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RiChat3Line } from 'react-icons/ri';
import ShareModalIcon from 'components/Icons/ChatIcon/ChatIcon';
import BookMarkIcon from 'components/Icons/BookMarkIcon/BookMarkIcon';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import { toggleLike } from 'actions/likes/likeActions';
import { postPropType, likePropType } from 'customPropTypes';

import styles from './HomePagePostIconBar.module.scss';

const HomePagePostIconBar = ({ isLike, hasUserLiked, isLikeLoading,initialLikeState, postId, likeId }) => {
  
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(toggleLike(postId, likeId, isLike));
  };

  return (

    <div className={styles.iconsWrapper}>
      <div className={styles.leftIconsWrapper}>
        <HeartIcon
          isFilled={isLike}
          isRed
          onClick={handleLike}
        />
        <RiChat3Line className={styles.chatIcon} />
        <ShareModalIcon className={styles.ShareModalIcon} />
      </div>
      <BookMarkIcon />
    </div>
  );
};

HomePagePostIconBar.propTypes = {
  ...postPropType,
  ...likePropType
};

export default HomePagePostIconBar;
