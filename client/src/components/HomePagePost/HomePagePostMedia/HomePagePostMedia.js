import React from 'react';
import { postPropType, likePropType } from 'customPropTypes';
import styles from './HomePagePostMedia.module.scss';

const HomePagePostMedia = ({ media, onToggleLike }) => {
  return (
    <img alt="post media" src={media} className={styles.postPicture} onDoubleClick={() => onToggleLike()} />
  );
};

HomePagePostMedia.propTypes = {
  ...postPropType,
  ...likePropType
};

export default HomePagePostMedia;
