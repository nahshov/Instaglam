import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './PostGallery.module.scss';
import { changeUrl } from '../../utils/changeUrl';

const PostGallery = ({ post }) => {
  const { postsOfUser } = useSelector(state => state.posts);
  const [currentPost, setCurrentPost] = useState(post);
  const currentPostIndex = postsOfUser.indexOf(currentPost);

  const next = () => {
    if (currentPostIndex > postsOfUser.length - 1) {
      return;
    }

    changeUrl(`/p/${postsOfUser[currentPostIndex + 1]._id}`, 'post modal path');
    setCurrentPost(postsOfUser[currentPostIndex + 1]);
  };

  const prev = () => {
    if (currentPostIndex < 0) {
      return;
    }

    changeUrl(`/p/${postsOfUser[currentPostIndex - 1]._id}`, 'post modal path');
    setCurrentPost(postsOfUser[currentPostIndex - 1]);
  };

  return (
    <div className={styles.Gallery}>
      <div
        className={styles.media}
        style={{
          background: `url(${currentPost.media})`
        }}
      />
      <div />
      <div className={styles.arrows}>
        {currentPostIndex > 0 && (
        <button className={styles.left} type="button" onClick={prev}>
          <FaChevronLeft />
        </button>
        )}
        {currentPostIndex < postsOfUser.length - 1 && (
        <button className={styles.right} type="button" onClick={next}>
          <FaChevronRight />
        </button>
        )}
      </div>
    </div>
  );
};

PostGallery.propTypes = {
  post: PropTypes.shape({
    likes: PropTypes.number,
    comments: PropTypes.number,
    _id: PropTypes.string,
    media: PropTypes.string,
    user: PropTypes.string,
    content: PropTypes.string
  }).isRequired
};

export default PostGallery;
