import React from 'react';
import PropTypes from 'prop-types';
import styles from './HomePagePostMedia.module.scss';

const HomePagePostMedia = ({ media }) => {
  return (
    <img alt="post media" src={media} className={styles.postPicture} onDoubleClick={() => console.log('hey')} />
  );
};

export default HomePagePostMedia;
