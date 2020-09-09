import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts, resetPosts } from 'actions/posts/postActions';
import PropTypes from 'prop-types';

let page = 0;

const InfiniteScrolling = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(true);
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

  const getMorePosts = useCallback(() => {
    page += 1;
    dispatch(getAllPosts(page));
    setIsFetching(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetPosts());
    page = 0;
    if (initialLoad) {
      dispatch(getAllPosts(page, initialLoad));
    }
    window.addEventListener('scroll', isScrolling);
    setInitialLoad(false);
    return () => {
      dispatch(resetPosts());
      window.removeEventListener('scroll', isScrolling);
    };
  }, [dispatch, initialLoad]);

  useEffect(() => {
    if (isFetching && !noMorePosts) {
      getMorePosts();
    } else {
      return;
    }
  }, [isFetching, noMorePosts, getMorePosts]);

  return (
    <div>
      {children}
    </div>
  );
};

InfiniteScrolling.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired

};
export default InfiniteScrolling;
