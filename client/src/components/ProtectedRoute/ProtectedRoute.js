import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from 'components/Navbar/Navbar';
import { loadUser as loadUserAction } from 'actions/auth';

const ProtectedRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  loadUser,
  ...rest
}) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated && !loading) {
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
  );
};

ProtectedRoute.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool
  }).isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser: loadUserAction })(
  ProtectedRoute
);
