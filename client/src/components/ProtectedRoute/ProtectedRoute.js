import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from 'components/Navbar/Navbar';
import { loadUser, logout } from 'actions/auth/authActions';
import { createStructuredSelector } from 'reselect';
import { authLoadingSelector, isAuthenticatedSelector } from 'actions/auth/authSelectors';
import styles from './ProtectedRoute.module.scss';

const structuredAuthSelector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  loading: authLoadingSelector
});

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector(structuredAuthSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      {
          !loading && (
          <Route
            {...rest}
            render={(props) => {
              if (!isAuthenticated) {
                dispatch(logout());
                return <Redirect to="/accounts/welcomepage" />;
              }
              if (Component) {
                return (
                  <>
                    <Navbar {...props} />
                    <div className={styles.mainView}>
                      <Component {...props} />
                    </div>
                  </>
                );
              }
            }}
          />
          )
      }
    </>
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
};

export default ProtectedRoute;
