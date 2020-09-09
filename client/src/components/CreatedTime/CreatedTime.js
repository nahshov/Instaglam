import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { postPropType } from 'customPropTypes';

import styles from './CreatedTime.module.scss';

dayjs.extend(relativeTime);

const CreatedTime = ({ created, isPost = false, ...otherProps }) => {
  const date = dayjs(created).from(dayjs());
  return (
    <div className={isPost ? styles.postAge : styles.age} {...otherProps}>
      {date}
    </div>
  );
};

CreatedTime.propTypes = {
  ...postPropType
};

export default CreatedTime;
