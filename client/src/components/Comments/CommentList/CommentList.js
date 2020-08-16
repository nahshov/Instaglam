import React, { useState } from 'react';
import PostModal from 'components/Modals/PostModal/PostModal';
import Button from 'components/Button/Button';
import { postPropType } from 'customPropTypes';

import styles from './CommentList.module.scss';
import HomePagePostComments from '../HomePagePostComments/HomePagePostComments';

const CommentList = ({ post }) => {

  const comments = post.comments.length < 2
    ? post.comments
    : [post.comments[0], post.comments[1]];

  return (
    <div>
      <div>
        <HomePagePostComments
          postComments={comments}
          postId={post._id}
        />
      </div>
    </div>
  );
};

CommentList.propTypes = {
  ...postPropType
};

export default CommentList;
