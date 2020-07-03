import React from 'react';
import PropTypes from 'prop-types';

const ModalList = ({ children }) => (
  <ul>
    {children}
  </ul>
);

ModalList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ModalList;
