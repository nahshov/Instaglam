import React from 'react';
import PropTypes from 'prop-types';

const SettingsModalListItem = ({ children }) => (
  <li>
    {children}
  </li>
);

SettingsModalListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default SettingsModalListItem;
