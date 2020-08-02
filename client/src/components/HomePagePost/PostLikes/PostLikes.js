import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postPropType } from 'customPropTypes';
import LikeModal from 'components/Modals/LikeModal/LikeModal';
import { getAllLikesOfAPost } from 'actions/posts/postActions';
import styles from './PostLikes.module.scss';

const PostLikes = ({ likesOfPost, postId }) => {
  const { postLikes, loading } = useSelector(state => state.posts);
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const fetchLikes = () => {
    setModalOpen(true);
    dispatch(getAllLikesOfAPost(postId));
  };
  return (
    <div>
      <div
        className={styles.likesAmount}
        onClick={fetchLikes}
      >
        {likesOfPost}
        &nbsp; likes
      </div>
      {isModalOpen && (
      <LikeModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        postLikes={postLikes}
        loading={loading}
      />
      )}
    </div>
  );
};

PostLikes.propTypes = {
  ...postPropType
};

export default PostLikes;
