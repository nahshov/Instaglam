import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Post from 'components/Post/Post';
import PostsGrid from 'components/PostsGrid/PostsGrid';
import { getPost } from 'actions/post/postActions';
import { postSelector, postsOfUserSelector } from 'actions/post/postSelectors';

const postPageStructuredSelector = createStructuredSelector({
  post: postSelector,
  postsOfUser: postsOfUserSelector
});

const PostPage = () => {
  const { post, postsOfUser } = useSelector(postPageStructuredSelector);
  const { pathname } = useLocation();
  const searchedPostId = pathname.replace('/p/', '');
  const dispatch = useDispatch();
  console.log(post);
  useEffect(() => {
    dispatch(getPost(searchedPostId, true));
  }, []);
  return (
    <>
      {/* <Post post={post} />
      <PostsGrid posts={postsOfUser} /> */}
    </>
  );
};

export default PostPage;
