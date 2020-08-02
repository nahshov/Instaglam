import React from 'react';
import { postPropType } from 'customPropTypes';

import styles from './PostLikes.module.scss';

const PostLikes = ({ likesOfPost }) => {
  return (
    <div className={styles.likesAmount}>
      {likesOfPost}
      &nbsp; likes
    </div>
  );
};

PostLikes.propTypes = {
  ...postPropType
};

export default PostLikes;
