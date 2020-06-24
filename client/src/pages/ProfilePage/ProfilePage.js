import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import { Redirect } from 'react-router-dom';
import { logout } from '../../actions/auth';

const ProfilePage = ({ auth: { isAuthenticated, loading }, logout }) => {
  if (!isAuthenticated && !loading) {
    return <Redirect to="/accounts/login" />;
  }

  return (
    <div>
      ProfilePage
      <button
        type="button"
        onClick={async () => {
          logout();
        }}
      >
        LOGOUT
      </button>
    </div>
  );
};

ProfilePage.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(ProfilePage);
