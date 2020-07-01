import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';
import { Redirect } from 'react-router-dom';
import { logout } from '../../actions/auth';

const ProfilePage = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!isAuthenticated && !loading) {
    return <Redirect to="/accounts/login" />;
  }

  return (
    <div>
      ProfilePage
      <button
        type="button"
        onClick={async () => {
          dispatch(logout());
        }}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default ProfilePage;
