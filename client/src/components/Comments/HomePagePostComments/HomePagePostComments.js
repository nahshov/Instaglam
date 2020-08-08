import React from 'react';
import { Link } from 'react-router-dom';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import PropTypes from 'prop-types';
import styles from './HomePagePostComments.module.scss';

const HomePagePostComments = ({ postComments }) => {
  console.log(postComments);

  return (
    <div className={styles.homePagePostCommentUserIdentifier}>
      {postComments.map((comment) => {
        return comment && (
          <div key={comment._id} className={styles.eachComment}>
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

HomePagePostComments.propTypes = {
  postComments: PropTypes.arrayOf({}).isRequired
};

export default HomePagePostComments;
