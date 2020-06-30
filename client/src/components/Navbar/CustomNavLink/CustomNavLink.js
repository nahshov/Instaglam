import React, { cloneElement } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomNavLink = ({ to, children, ...props }) => {
  const { pathname } = useLocation();

  // In case of multiple children - return just one
  const singleChild = (children.length && children[0]) || children;
  const myChild = cloneElement(singleChild, { match: pathname === to });

  return (
    <NavLink {...props} exact to={to}>
      {myChild}
    </NavLink>
  );
};

CustomNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default CustomNavLink;
