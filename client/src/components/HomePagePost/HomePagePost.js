import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomePagePostHeader from 'components/HomePagePost/HomePagePostHeader/HomePagePostHeader';
import HomePagePostMedia from 'components/HomePagePost/HomePagePostMedia/HomePagePostMedia';
import HomePagePostIconBar from 'components/HomePagePost/HomePagePostIconsBar/HomePagePostIconBar';
import NumOfLikes from 'components/HomePagePost/NumOfLikes/NumOfLikes';
import HomePagePostContent from 'components/HomePagePost/HomePagePostContent/HomePagePostContent';
import CreatedTime from 'components/CreatedTime/CreatedTime';
import CommentForm from 'components/Comments/CommentForm/CommentForm';
import CommentList from 'components/Comments/CommentList/CommentList';
import { postPropType } from 'customPropTypes';
import styles from './HomePagePost.module.scss';
import ViewAllComments from '../Comments/ViewAllComments/ViewAllComments';
import PostModal from '../Modals/PostModal/PostModal';

const HomePagePost = ({
  post
}) => {
  const {
    numOfLikes,
    numOfComments,
    content,
    user: {
      username = '',
      profilePic = ''
    },
    media,
    created,
    _id: postId,
    isPostLiked,
    comments
  } = post;
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCommentBubbleClicked, setCommentBubbleClicked] = useState(false);

  return (
    <article className={styles.postContainer}>
      <HomePagePostHeader
        username={username}
        profilePic={profilePic}
        postId={postId}
        className={styles.postHeader}
      />
      <HomePagePostMedia media={media} isLike={isPostLiked} postId={postId} />
      <HomePagePostIconBar
        isCommentBubbleClicked={isCommentBubbleClicked}
        setCommentBubbleClicked={setCommentBubbleClicked}
        isLike={isPostLiked}
        postId={postId}
      />
      <NumOfLikes
        likes={numOfLikes}
        username={username}
        profilePic={profilePic}
        id={postId}
      />
      <HomePagePostContent username={username} content={content} />
      <ViewAllComments numOfComments={numOfComments} setIsPostModalOpen={setIsPostModalOpen} />
      <CommentList
        comments={comments}
        isPostPage={false}
        className={styles.homePagePostCommentList}
      />
      <Link to={`/p/${postId}`}>
        <CreatedTime created={created} />
      </Link>
      {postId && (
        <CommentForm
          postId={postId}
          isCommentBubbleClicked={isCommentBubbleClicked}
          setCommentBubbleClicked={setCommentBubbleClicked}
        />
      )}
      {isPostModalOpen && (
        <PostModal
          isOpen={isPostModalOpen}
          setModalOpen={setIsPostModalOpen}
          postId={postId}
          postProp={post}
        />
      )}
    </article>
  );
};

HomePagePost.propTypes = {
  ...postPropType
};

export default HomePagePost;
