import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHENTICATED_USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_AUTH_LOADING,
  RESET_AUTH
} from './authTypes';
import {
  RESET_POSTS
} from '../posts/postTypes';
import {
  RESET_FOLLOWS
} from '../follows/followTypes';
import { RESET_PROFILE } from '../profile/profileTypes';

export const register = ({ fullName, email, username, password }, setAlert) => {
  return async (
    dispatch
  ) => {
    try {
      dispatch({
        type: RESET_AUTH_LOADING
      });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = {
        fullName,
        email,
        username,
        password
      };

      const res = await axios.post('/api/register', body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (error) {
      const { errors } = error.response.data;

      if (errors) {
        setAlert(errors);
      }

      dispatch({
        type: REGISTER_FAIL
      });
    }
  };
};

export const login = ({ email, password }, setAlert) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: RESET_AUTH_LOADING
      });
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = { email, password };
      const res = await axios.post('/api/login', body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    } catch (error) {
      const { errors } = error.response.data;

      if (errors) {
        setAlert(errors);
      }

      dispatch({
        type: LOGIN_FAIL
      });
    }
  };
};

export const resetState = (dispatch) => {
  dispatch({
    type: RESET_AUTH
  });
  dispatch({
    type: RESET_POSTS
  });
  dispatch({
    type: RESET_FOLLOWS
  });
  dispatch({
    type: RESET_PROFILE
  });
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.post('/api/logout');
      dispatch({ type: LOGOUT });
      resetState(dispatch);
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: RESET_AUTH_LOADING
      });

      const res = await axios.get('/api/me');

      dispatch({
        type: AUTHENTICATED_USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
};

export const uploadProfilePic = (selectedFile) => {
  return async dispatch => {
    try {
      const fd = new FormData();
      fd.append('profilePic', selectedFile);
      await axios.post('/api/me/profilePic', fd);
      dispatch(loadUser());
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const removeProfilePic = () => {
  return async dispatch => {
    try {
      await axios.delete('/api/me/profilePic');
      dispatch(loadUser());
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
};
