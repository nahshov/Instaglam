import React from 'react';
import styles from './NoPosts.module.scss';

const NoPosts = () => {
  return (
    <div className={styles.container}>
      <span className={styles.firstRow}><h1>HELLO!</h1></span>
      <br />
      <br />
      <span
        className={styles.secondRow}
      >
        <h2>Looks like there are no posts at the moment...</h2>
      </span>
      <br />
      <br />
      <span
        className={styles.thirdRow}
      >
        <h3>Why wont you be the first one who upload a post!</h3>
      </span>
      <br />
      <br />
      <span className={styles.fourthRow}>
        <h3>To get started, click on the camera to the left of the instaglam logo.</h3>
      </span>
      <br />
      <br />
      <span className={styles.fifthRow}><h1>Enjoy our Instaglam</h1></span>
    </div>
  );
};

export default NoPosts;
