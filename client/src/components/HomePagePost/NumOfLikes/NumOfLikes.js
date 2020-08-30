import React, { useState } from 'react';
import { postPropType } from 'customPropTypes';
import styles from './NumOfLikes.module.scss';
import FollowModal from '../../Modals/FollowModal/FollowModal';

const NumOfLikes = ({ likes, postId, isPost = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div
        className={isPost ? styles.singlePostLikes : styles.likesAmount}
        onClick={() => setModalOpen(true)}
      >
        {likes}
        {' '}
        likes
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

NumOfLikes.propTypes = {
  ...postPropType
};

export default NumOfLikes;
