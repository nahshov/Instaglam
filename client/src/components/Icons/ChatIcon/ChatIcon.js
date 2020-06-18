import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Icons/ChatIcon/ChatIcon.module.scss';
import { FaRegPaperPlane, FaPaperPlane } from 'react-icons/fa';

const ChatIcon = ({ match }) => (
  <>
    {match ? (
      <FaPaperPlane className={styles.ChatIcon} />
    ) : (
      <FaRegPaperPlane className={styles.ChatIcon} />
    )}
  </>
);

ChatIcon.propTypes = {
  match: PropTypes.bool.isRequired
};

export default ChatIcon;
