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
} from 'actions/auth/authTypes';

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      };
    case RESET_AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    case RESET_AUTH:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
}
