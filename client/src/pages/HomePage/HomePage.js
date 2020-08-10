import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'pages/HomePage/HomePage.module.scss';
import HomePagePost from 'components/HomePagePost/HomePagePost';
import NoPosts from 'components/NoPosts/NoPosts';
import { getAllPosts, resetPosts } from 'actions/posts/postActions';

let page = 0;

const HomePage = () => {
  const { posts, loading } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  let noMorePosts = false;

  function isScrolling() {
    if
    (window.innerHeight + document.documentElement.scrollTop
      !== document.documentElement.offsetHeight) {
      if (!posts.length) {
        noMorePosts = true;
      }
      return;
    } setIsFetching(true);
  }

  function getMorePosts() {
    page += 1;
    dispatch(getAllPosts(page));
    setIsFetching(false);
  }

  useEffect(() => {
    page = 0;
    dispatch(getAllPosts(page));
    window.addEventListener('scroll', isScrolling);
    return () => {
      window.removeEventListener('scroll', isScrolling);
      dispatch(resetPosts());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isFetching) {
      if (!noMorePosts) {
        getMorePosts();
      }
    }
  }, [isFetching]);

  return (
    <div className={styles.container}>
      {!posts.length && !loading ? <NoPosts /> : !!posts.length && !loading && posts.map(
        post => { return <HomePagePost key={post._id} post={post} />; }
      )}
    </div>
  );
};

export default HomePage;
