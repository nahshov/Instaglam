import React, { useState } from 'react';
import { postPropType } from 'customPropTypes';
import styles from './PostLikes.module.scss';
import FollowModal from '../../Modals/FollowModal/FollowModal';

const PostLikes = ({ likesOfPost, postId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div
        className={styles.likesAmount}
        onClick={() => setModalOpen(true)}
      >
        {likesOfPost}
        &nbsp; likes
      </div>
      {isModalOpen && (
      <FollowModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setModalOpen}
        postId={postId}
        type="Likes"
        isAnimated
      />
      )}
    </div>
  );
};

PostLikes.propTypes = {
  ...postPropType
};

export default PostLikes;
