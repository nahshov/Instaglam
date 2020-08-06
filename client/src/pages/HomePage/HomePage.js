import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'pages/HomePage/HomePage.module.scss';
import HomePagePost from 'components/HomePagePost/HomePagePost';
import { getAllPosts } from 'actions/posts/postActions';

const HomePage = () => {
  const { posts: { posts, loading } } = useSelector(state => { return state; });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  return (
    <div className={styles.container}>
      {posts.length && !loading && posts.map(post => { return <HomePagePost key={post._id} post={post} />; })}
    </div>
  );
};

export default HomePage;
