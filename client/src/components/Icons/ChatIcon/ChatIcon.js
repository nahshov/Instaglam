import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Icons/ChatIcon/ChatIcon.module.scss';
import { FaRegPaperPlane, FaPaperPlane } from 'react-icons/fa';

const ChatIcon = ({ match = false }) => (
  <>
    {match ? (
      <FaPaperPlane className={styles.ChatIcon} />
    ) : (
      <FaRegPaperPlane className={styles.ChatIcon} />
    )}
  </>
);

ChatIcon.defaultProps = {
  match: false
};

ChatIcon.propTypes = {
  match: PropTypes.bool
};

export default ChatIcon;
