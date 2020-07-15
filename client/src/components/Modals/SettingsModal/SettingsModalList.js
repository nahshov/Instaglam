import React from 'react';
import PropTypes from 'prop-types';

const SettingsModalList = ({ children }) => (
  <ul>
    {children}
  </ul>
);

SettingsModalList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default SettingsModalList;
