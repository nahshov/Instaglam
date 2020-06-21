import React, { cloneElement } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomNavLink = ({ to, children }) => {
  const { pathname } = useLocation();

  const myChild = cloneElement(children, { match: pathname === to });
  return (
    <NavLink exact to={to}>
      {myChild}
    </NavLink>
  );
};

CustomNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default CustomNavLink;