import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Post from 'components/Post/Post';
import { changeUrl } from 'utils/changeUrl';
import { postPropType } from 'customPropTypes';
import styles from './PostGallery.module.scss';

const PostGallery = ({ post = {}, posts, isGallery, authenticatedUserId }) => {
  const [currentPost, setCurrentPost] = useState(post);
  const currentPostIndex = posts ? posts.indexOf(currentPost) : 0;
  useEffect(() => {
    setCurrentPost(post);
  }, [post]);
  let next;
  let prev;
  if (posts) {
    next = () => {
      if (currentPostIndex > posts.length - 1) {
        return;
      }

      changeUrl(`/p/${posts[currentPostIndex + 1]._id}`, 'post modal path');
      setCurrentPost(posts[currentPostIndex + 1]);
    };

    prev = () => {
      if (currentPostIndex < 0) {
        return;
      }

      changeUrl(`/p/${posts[currentPostIndex - 1]._id}`, 'post modal path');
      setCurrentPost(posts[currentPostIndex - 1]);
    };
  }

  return (
    <div className={styles.Gallery}>
      <Post post={currentPost} postId={post._id} authenticatedUserId={authenticatedUserId} />
      {isGallery && (
      <div className={styles.arrows}>
        {!!currentPostIndex && (
        <button className={styles.left} type="button" onClick={prev}>
          <FaChevronLeft />
        </button>
        )}
        {currentPostIndex < posts.length - 1 && (
        <button className={styles.right} type="button" onClick={next}>
          <FaChevronRight />
        </button>
        )}
      </div>
      )}
    </div>
  );
};

PostGallery.propTypes = {
  post: PropTypes.shape(postPropType).isRequired,
  isGallery: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape(postPropType)).isRequired,
  authenticatedUserId: PropTypes.string.isRequired
};

export default PostGallery;
