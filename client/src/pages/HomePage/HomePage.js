import React from 'react';
import styles from 'pages/HomePage/HomePage.module.scss';
import Post from '../../components/Post/Post';

const HomePage = () => (
  <div className={styles.container}>
    <Post />
  </div>
);
export default HomePage;
