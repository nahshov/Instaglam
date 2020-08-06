import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'pages/HomePage/HomePage.module.scss';
import HomePagePost from 'components/HomePagePost/HomePagePost';
import { getAllPosts, resetPosts } from 'actions/posts/postActions';

let page = 0;

const HomePage = () => {
  const { posts: { posts, loading } } = useSelector(state => { return state; });
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);

  function isScrolling() {
    if
    (window.innerHeight + document.documentElement.scrollTop
      !== document.documentElement.offsetHeight) {
      return;
    } setIsFetching(true);
  }

  function getMorePosts() {
    page += 1;
    dispatch(getAllPosts(page));
    setIsFetching(false);
  }

  useEffect(() => {
    dispatch(resetPosts);
    page = 0;
    console.log('ty');
    dispatch(getAllPosts(page));
    window.addEventListener('scroll', isScrolling);
    return () => window.removeEventListener('scroll', isScrolling);
  }, []);

  useEffect(() => {
    if (isFetching) {
      getMorePosts();
      console.log('hi');
    }
  }, [isFetching]);

  return (
    <div className={styles.container}>
      {posts.length && !loading && posts.map(
        post => { return <HomePagePost key={post._id} post={post} />; }
      )}
    </div>
  );
};

export default HomePage;
