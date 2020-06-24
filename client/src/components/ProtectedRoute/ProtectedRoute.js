import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from 'components/Navbar/Navbar';
import { loadUser } from 'actions/auth';

const ProtectedRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  loadUser,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      loadUser();

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

ProtectedRoute.propTypes = {
  auth: PropTypes.shape.isRequired,
  component: PropTypes.element.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(ProtectedRoute);
