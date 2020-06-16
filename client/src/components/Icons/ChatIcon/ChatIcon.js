import React from 'react';
import { FaRegPaperPlane, FaPaperPlane } from 'react-icons/fa';
import styles from 'components/Icons/ChatIcon/ChatIcon.module.scss';

const ChatIcon = ({ isFilled }) => (
  <React.Fragment>
    {isFilled ? (
      <FaPaperPlane className={styles.ChatIcon} />
    ) : (
      <FaRegPaperPlane className={styles.ChatIcon} />
    )}
  </React.Fragment>
);

export default ChatIcon;
