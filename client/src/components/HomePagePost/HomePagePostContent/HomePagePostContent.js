import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from 'components/HomePagePost/HomePagePostContent/HomePagePostContent.module.scss';
import { postPropType } from 'customPropTypes';
import Button from 'components/Button/Button';

const HomePagePostContent = ({ username, content }) => {
  const [isMoreBtnPressed, setMoreBtnPressed] = useState(false);

  return (
    <div className={styles.postContent}>
      <div className={isMoreBtnPressed
        ? styles.postContentContainerAfterBtn : styles.postContentContainer}
      >
        <Link to={`/${username}`}>
          <span className={styles.username}>
            {username}
          </span>
        </Link>
        <div className={isMoreBtnPressed ? styles.shownContent : styles.contentWrapper}>
          <span className={styles.readMoreContent}>

            {content}
          </span>
        </div>
        {content.length >= 37 && !isMoreBtnPressed ? <Button className={styles.btnDisplay} btnRole="astext primary morebtn" style={{ height: '' }} onClick={() => { return setMoreBtnPressed(!isMoreBtnPressed); }}> more </Button> : ''}
      </div>
    </div>
  );
};

HomePagePostContent.propTypes = {
  ...postPropType
};

export default HomePagePostContent;
