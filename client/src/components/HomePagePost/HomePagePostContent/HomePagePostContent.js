import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'components/HomePagePost/HomePagePostContent/HomePagePostContent.module.scss';
import { postPropType } from 'customPropTypes';

const HomePagePostContent = ({ username, content }) => {
  return (
    <div className={styles.postContentContainer}>
      <Link to={`/${username}`}>
        <span className={styles.username}>
          {username}
        </span>
      </Link>
      <span>
        {content}
      </span>
    </div>
  );
};

HomePagePostContent.propTypes = {
  ...postPropType
};

export default HomePagePostContent;
