import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from 'components/Navbar/Navbar';
import { loadUser } from 'actions/auth';

const ProtectedRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  loadUser,
  ...rest
}) => {
  useEffect(() => {
    loadUser();

    // Figure out why isn't user loading
    console.log(user);
  }, [user]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated && !loading) {
          return <Redirect to="/accounts/login" />;
        }

        return (
          <>
            <Navbar />
            <Component {...props} />
          </>
        );
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  auth: PropTypes.shape.isRequired,
  component: PropTypes.element.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(ProtectedRoute);
