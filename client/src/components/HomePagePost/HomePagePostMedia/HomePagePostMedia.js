import React from 'react';
import { useDispatch } from 'react-redux';
import { postPropType, likePropType } from 'customPropTypes';
import { toggleHomePagePostLike } from 'actions/posts/postActions';
import styles from './HomePagePostMedia.module.scss';

const HomePagePostMedia = ({ media, postId, isLike }) => {
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(toggleHomePagePostLike(postId, isLike));
  };

  return (
    <img alt="post media" src={media} className={styles.postPicture} onDoubleClick={handleLike} />
  );
};

HomePagePostMedia.propTypes = {
  ...postPropType,
  ...likePropType
};

export default HomePagePostMedia;
