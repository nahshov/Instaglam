import React, { useState } from 'react';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import styles from './BookMarkIcon.module.scss';

const BookMarkIcon = () => {
  const [isBookMarkIconfilled, setBookMarkIconfilled] = useState(false);
  return (
    <>
      {isBookMarkIconfilled ? (
        <BsBookmarkFill className={styles.bookMark} onClick={() => { return setBookMarkIconfilled(!isBookMarkIconfilled); }} />
      ) : (
        <BsBookmark className={styles.bookMark} onClick={() => { return setBookMarkIconfilled(!isBookMarkIconfilled); }} />
      )}
    </>
  );
};

export default BookMarkIcon;
