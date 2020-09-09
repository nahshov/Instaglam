import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Post from 'components/Post/Post';
import { changeUrl } from 'utils/changeUrl';
import { postPropType } from 'customPropTypes';
import styles from './PostGallery.module.scss';

const PostGallery = ({ post = {}, posts, isGallery, authenticatedUserId }) => {
  const [currentPost, setCurrentPost] = useState(post);
  const [currentPostIndex, setCurrentPostIndex] = useState(-1);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(
    currentPost.user._id === authenticatedUserId
  );

  useEffect(() => {
    setCurrentPost(post);

    if (isGallery) {
      posts.find((p, i) => {
        if (p._id === currentPost._id) {
          setCurrentPostIndex(i);
          return true;
        }
        return false;
      });
    }
  }, [post, currentPost._id, isGallery, posts]);

  useEffect(() => {
    if (currentPostIndex > -1) {
      changeUrl(`/p/${posts[currentPostIndex]._id}`, 'post modal path');
      setCurrentPost(posts[currentPostIndex]);
      setIsAuthenticatedUser(currentPost.user._id === authenticatedUserId);
    }
  }, [currentPostIndex, authenticatedUserId, currentPost.user._id, posts]);

  let next;
  let prev;
  if (posts) {
    next = () => {
      if (currentPostIndex > posts.length - 1) {
        return;
      }
      setCurrentPostIndex(currentPostIndex + 1);
      // changeUrl(`/p/${posts[currentPostIndex + 1]._id}`, 'post modal path');
      // setCurrentPost(posts[currentPostIndex + 1]);
    };

    prev = () => {
      if (currentPostIndex < 0) {
        return;
      }

      setCurrentPostIndex(currentPostIndex - 1);
      // changeUrl(`/p/${posts[currentPostIndex - 1]._id}`, 'post modal path');
      // setCurrentPost(posts[currentPostIndex - 1]);
    };
  }

  window.posts = posts;
  window.post = post;
  window.isAuthenticatedUser = isAuthenticatedUser;

  return (
    <div className={styles.Gallery}>
      <Post
        isModal
        post={currentPost}
        postId={post._id}
        isAuthenticatedUser={isAuthenticatedUser}
        authenticatedUserId={authenticatedUserId}
      />
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
