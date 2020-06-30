import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_ALERT
} from './types';

export const register = ({ fullName, email, username, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    fullName,
    email,
    username,
    password
  });

  try {
    const res = await axios.post('/api/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const { errors } = error.response.data;

    if (errors) {
      dispatch({
        type: SET_ALERT,
        payload: {
          message: errors,
          alertType: 'Error'
        }
      });
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const { message } = error.response.data;

    if (message) {
      // @roiassa:TODO -> create an alert with the error message
      message.forEach((msg) => console.log(msg));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/api/logout');
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error(error);
  }
};
