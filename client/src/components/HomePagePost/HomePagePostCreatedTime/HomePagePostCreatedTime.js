import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from './HomePagePostCreatedTime.module.scss';

dayjs.extend(relativeTime);

const HomePagePostCreatedTime = ({ postId, created }) => {
  const date = dayjs(created).from(dayjs());
  return (
    <Link to={`/p/${postId}`} className={styles.postAge}>
      {date}
    </Link>
  );
};

export default HomePagePostCreatedTime;
