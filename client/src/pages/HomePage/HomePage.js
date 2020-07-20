import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'pages/HomePage/HomePage.module.scss';
import HomePagePost from 'components/HomePagePost/HomePagePost';
import { getAllPosts } from 'actions/posts/postActions';

const HomePage = () => {
  const { posts: { posts } } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div className={styles.container}>
      {posts.map(post => <HomePagePost post={post} />)}
    </div>
  );
};

export default HomePage;
