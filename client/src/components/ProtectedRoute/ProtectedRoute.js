import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from 'components/Navbar/Navbar';
import { loadUser, logout } from 'actions/auth/authActions';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    !loading && (
      <Route
        {...rest}
        render={(props) => {
          if (!isAuthenticated) {
            dispatch(logout());
            return <Redirect to="/accounts/login" />;
          }

          return (
            <>
              <Navbar {...props} />
              <Component {...props} />
            </>
          );
        }}
      />
    )
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
};

export default ProtectedRoute;
