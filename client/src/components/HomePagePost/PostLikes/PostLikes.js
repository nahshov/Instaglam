import React from 'react';
import styles from './PostLikes'
import PropTypes from 'prop-types';

const PostLikes = ({likes}) => {
  return (
    <div className={styles.likesAmount}>
      {likes}
      &nbsp; likes
    </div>
  );
};

export default PostLikes;