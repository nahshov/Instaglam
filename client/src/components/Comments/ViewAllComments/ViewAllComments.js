import React, { useState } from 'react';
import styles from 'components/Comments/ViewAllComments/ViewAllComments.module.scss';
import Button from 'components/Button/Button';
import PostModal from 'components/PostModal/PostModal';

const ViewAllComments = (numOfComments) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <div>
      {
        numOfComments > 2 ? (
          <div className={styles.commentListWrapper}>
            <Button btnRole="astext" onClick={() => setIsPostModalOpen(true)}>
              View all
              {' '}
              {numOfComments}
              {' '}
              comments
            </Button>
            {isPostModalOpen && (
            <PostModal isOpen={isPostModalOpen} setModalOpen={setIsPostModalOpen} post={post} />
            )}
          </div>
        ) : ''
      }

    </div>
  )
}

export default ViewAllComments
