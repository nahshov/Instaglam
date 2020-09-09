import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Post from 'components/Post/Post';
import PostsGrid from 'components/PostsGrid/PostsGrid';
import { getPost } from 'actions/post/postActions';
import { postSelector, postsOfUserSelector } from 'actions/post/postSelectors';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import styles from './PostPage.module.scss';

const postPageStructuredSelector = createStructuredSelector({
  post: postSelector,
  postsOfUser: postsOfUserSelector,
  authenticatedUser: authenticatedUserSelector
});

const PostPage = () => {
  const { post, postsOfUser, authenticatedUser } = useSelector(postPageStructuredSelector);
  const { pathname } = useLocation();
  const searchedPostId = pathname.replace('/p/', '');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(searchedPostId, true));
  }, [searchedPostId, dispatch]);

  return (
    <>
      <div className={styles.container}>
        {
        post
        && post.user && (
        <Post
          post={post}
          isAuthenticatedUser={post.user._id === authenticatedUser._id}
          authenticatedUserId={authenticatedUser._id}
        />
        )
      }
        <PostsGrid posts={postsOfUser.filter(p => p._id !== post._id)} isLink loading={false} />
      </div>
    </>
  );
};

export default PostPage;
