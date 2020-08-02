import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PostModal from 'components/Modals/PostModal/PostModal';
import Button from 'components/Button/Button';
import { postPropType } from 'customPropTypes';
import { getAllCommentsOfAPost } from 'actions/posts/postActions';

import styles from './CommentList.module.scss';

const CommentList = ({ post }) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const dispatch = useDispatch();
  const commentHandler = () => {
    dispatch(getAllCommentsOfAPost(post._id));
  }
  return (
    <div>
      {post.comments > 2 ? (
        <div className={styles.commentListWrapper}>
          <Button btnRole="astext disabled" onClick={() => { setIsPostModalOpen(true); }}>
            View all
            {' '}
            {post.comments}
            {' '}
            comments
          </Button>
          {isPostModalOpen && (
          <PostModal isOpen={isPostModalOpen} setModalOpen={setIsPostModalOpen} post={post} />
          )}
        </div>
      ) : ''}
    </div>
  );
};

CommentList.propTypes = {
  ...postPropType
};

export default CommentList;
