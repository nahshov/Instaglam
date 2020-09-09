import React from 'react';
import { useSelector } from 'react-redux';
import styles from 'pages/HomePage/HomePage.module.scss';
import HomePagePost from 'components/HomePagePost/HomePagePost';
import NoPosts from 'components/NoPosts/NoPosts';
import InfiniteScrolling from 'components/InfiniteScrolling/InfiniteScrolling';

const HomePage = () => {
  const { posts, loading } = useSelector(state => state.posts);
  // console.log(JSON.stringify(posts));
  // const loading = false;
  // const posts = [
  //   {
  //     numOfLikes: 1,
  //     numOfComments: 1,
  //     _id: '5f590dce14ac63591a93e48d',
  //     content: 'SHTOK KVAR',
  //     user: {
  //       username: '2',
  //       profilePic: 'http://gravatar.com/avatar/1e6fd8e56879c84999cd481255530592?s=180&r=pg&d=mm'
  //     },
  //     media: 'https://storage.googleapis.com/bukcet-instaglam/f111ff33-acec-4270-a1eb-0fe72631fd57.jpeg',
  //     created: '2020-09-09T17:15:58.935Z',
  //     __v: 0,
  //     comments: [
  //       {
  //         numOfLikes: 1,
  //         replyToComment: null,
  //         _id: '5f590e8da6075459a380c1a4',
  //         content: 'asdasdasd',
  //         user: {
  //           _id: '5f590e80a6075459a380c19e',
  //           username: '123456',
  //           profilePic: 'http://gravatar.com/avatar/317fe8b099749d32b8eea573565842d5?s=180&r=pg&d=mm'
  //         },
  //         post: '5f590dce14ac63591a93e48d',
  //         created: '2020-09-09T17:19:09.714Z',
  //         __v: 0
  //       }
  //     ]
  //   },
  //   {
  //     numOfLikes: 0,
  //     numOfComments: 0,
  //     _id: '5f590dac14ac63591a93e485',
  //     content: '',
  //     user: {
  //       username: 'gronichomer',
  //       profilePic: 'http://gravatar.com/avatar/d219af79b45e5891507fda4c4c2139a0?s=180&r=pg&d=mm'
  //     },
  //     media: 'https://storage.googleapis.com/bukcet-instaglam/032edea4-e17d-4a2b-a2be-67575a4221d1.jpeg',
  //     created: '2020-09-09T17:15:24.578Z',
  //     __v: 0,
  //     comments: []
  //   }
  // ];
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
