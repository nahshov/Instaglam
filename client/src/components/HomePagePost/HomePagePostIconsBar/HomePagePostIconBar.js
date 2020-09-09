import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RiChat3Line } from 'react-icons/ri';
import ShareModalIcon from 'components/Icons/ChatIcon/ChatIcon';
import BookMarkIcon from 'components/Icons/BookMarkIcon/BookMarkIcon';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import { toggleHomePagePostLike } from 'actions/posts/postActions';
import { togglePostLike } from 'actions/post/postActions';
import { postPropType } from 'customPropTypes';

import styles from './HomePagePostIconBar.module.scss';

const HomePagePostIconBar = ({
  isLike,
  postId,
  isPostPage = false,
  setCommentBubbleClicked
}) => {
  const [heartClickLoading, setHeartClickLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLike = async () => {
    setHeartClickLoading(true);

    if (isPostPage) {
      await dispatch(togglePostLike(postId, isLike));
      setHeartClickLoading(false);
    } else {
      await dispatch(toggleHomePagePostLike(postId, isLike));
      setHeartClickLoading(false);
    }
  };

  const bubbleHandler = () => {
    setCommentBubbleClicked(true);
  };

  return (
    <div className={styles.iconsWrapper}>
      <div className={styles.leftIconsWrapper}>
        <HeartIcon
          isFilled={isLike}
          isRed
          onClick={handleLike}
          heartClickLoading={heartClickLoading}
        />
        <RiChat3Line className={styles.chatIcon} onClick={bubbleHandler} />
        <ShareModalIcon className={styles.ShareModalIcon} />
      </div>
      <BookMarkIcon />
    </div>
  );
};

HomePagePostIconBar.propTypes = {
  ...postPropType
};

export default HomePagePostIconBar;
