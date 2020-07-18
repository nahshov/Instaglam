import React from 'react';
import PropTypes from 'prop-types';
import { postPropType } from 'customPropTypes';
import styles from './Post.module.scss';
import PostConversation from './PostConversation/PostConversation';

const Post = ({ post }) => (
  <div className={styles.container}>
    <div
      className={styles.media}
      style={{
        background: `url(${post.media}) no-repeat center center / cover`
      }}
    />
    <PostConversation isHorizontal />
  </div>
);

Post.propTypes = {
  post: PropTypes.shape(postPropType).isRequired
};
export default Post;
