import React from 'react';
import { Link } from 'react-router-dom';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import styles from './HomePagePostComments.module.scss';

const HomePagePostComments = ({ postComments }) => {
  console.log(postComments);
  return (
    <div className={styles.homePagePostCommentUserIdentifier}>
      {postComments.map((comment) => {
        return (
          <div className={styles.eachComment}>
            <div className={styles.nameAndContent}>
              <span className={styles.username}>
                <Link to={`/${comment.user.username}`}>
                  {comment.user.username}
                </Link>
              &nbsp;
              </span>
              <span>
                {comment.content}
              </span>
            </div>
            <div>
              <HeartIcon />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomePagePostComments;
