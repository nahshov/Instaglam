import React from 'react';
import { useDispatch } from 'react-redux';
import { RiChat3Line } from 'react-icons/ri';
import ShareModalIcon from 'components/Icons/ChatIcon/ChatIcon';
import BookMarkIcon from 'components/Icons/BookMarkIcon/BookMarkIcon';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import { toggleHomePagePostLike } from 'actions/posts/postActions';
import { togglePostLike } from 'actions/post/postActions';
import { postPropType, likePropType } from 'customPropTypes';

import styles from './HomePagePostIconBar.module.scss';

const HomePagePostIconBar = ({ isLike, postId, isPostPage = false}) => {
  const dispatch = useDispatch();
  const handleLike = () => {
    if (isPostPage) {
      dispatch(togglePostLike(postId, isLike));
    } else {
      dispatch(toggleHomePagePostLike(postId, isLike));
    }
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
