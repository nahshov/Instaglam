import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts, resetPosts } from 'actions/posts/postActions';

let page = 0;

const InfiniteScrolling = ({ children }) => {
  const { noMorePosts } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);

  function isScrolling() {
    if
    (window.innerHeight + document.documentElement.scrollTop
      !== document.documentElement.offsetHeight) {
      return;
    }
    setIsFetching(true);
  }

  function getMorePosts() {
    page += 1;
    dispatch(getAllPosts(page));
    setIsFetching(false);
  }

  useEffect(() => {
    page = 0;
    dispatch(resetPosts());
    dispatch(getAllPosts(page));
    window.addEventListener('scroll', isScrolling);
    return () => {
      window.removeEventListener('scroll', isScrolling);
    };
  }, [dispatch]);

  useEffect(() => {
    if (isFetching && !noMorePosts) {
      getMorePosts();
    } else {
      return;
    }
  }, [isFetching]);

  return (
    <div>
      {children}
    </div>
  );
};

export default InfiniteScrolling;
