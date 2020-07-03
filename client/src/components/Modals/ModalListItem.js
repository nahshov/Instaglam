import React from 'react';
import PropTypes from 'prop-types';

const ModalListItem = ({ children }) => (
  <li>
    {children}
  </li>
);

ModalListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ModalListItem;
