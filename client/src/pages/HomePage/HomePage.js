import React from 'react';
import { useSelector } from 'react-redux';
import styles from 'pages/HomePage/HomePage.module.scss';
import HomePagePost from 'components/HomePagePost/HomePagePost';
import NoPosts from 'components/NoPosts/NoPosts';
import InfiniteScrolling from 'components/InfiniteScrolling/InfiniteScrolling';

const HomePage = () => {
  const { posts, loading } = useSelector(state => state.posts);

  return (
    <InfiniteScrolling>
      <div className={styles.container}>
        {!posts.length && !loading ? <NoPosts /> : !!posts.length && !loading && posts.map(
          post => <HomePagePost key={post._id} post={post} />
        )}
      </div>
    </InfiniteScrolling>
  );
};

export default HomePage;
