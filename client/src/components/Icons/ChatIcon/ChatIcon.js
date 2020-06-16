import React from 'react';
import styles from 'components/Icons/ChatIcon/ChatIcon.module.scss';
import { FaRegPaperPlane, FaPaperPlane } from 'react-icons/fa';

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
