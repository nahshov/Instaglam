import React from 'react';
import PropTypes from 'prop-types';
import { FaRegPaperPlane, FaPaperPlane } from 'react-icons/fa';

const ChatIcon = ({ match = false, ...otherProps }) => {
  return (
    <>
      {match ? (
        <FaPaperPlane {...otherProps} />
      ) : (
        <FaRegPaperPlane {...otherProps} />
      )}
    </>
  );
};

ChatIcon.defaultProps = {
  match: false
};

ChatIcon.propTypes = {
  match: PropTypes.bool
};

export default ChatIcon;
