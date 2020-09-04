import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { postPropType } from 'customPropTypes';
import styles from './NumOfLikes.module.scss';
import FollowModal from '../../Modals/FollowModal/FollowModal';

const NumOfLikes = ({ likes, id, isSinglePost = false, isComment = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div
        className={isSinglePost ? styles.singlePostLikes : styles.likesAmount}
        onClick={() => setModalOpen(true)}
      >
        {likes}
        {' '}
        likes
      </div>
      {isModalOpen && !!likes && (
      <FollowModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setModalOpen}
        id={id}
        isComment={isComment}
        type="likes"
        isAnimated
      />
      )}
    </div>
  );
};

NumOfLikes.defaultProps = {
  isComment: false
};

NumOfLikes.propTypes = {
  ...postPropType,
  isComment: PropTypes.bool
};

export default NumOfLikes;
