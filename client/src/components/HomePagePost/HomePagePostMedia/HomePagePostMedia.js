import React from 'react';
import PropTypes from 'prop-types';
import styles from './HomePagePostMedia.module.scss';

const HomePagePostMedia = ({ media, onToggleLike }) => {
  return (
    <img alt="post media" src={media} className={styles.postPicture} onDoubleClick={() => onToggleLike()} />
  );
};

export default HomePagePostMedia;
