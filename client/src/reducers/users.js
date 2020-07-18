import {
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAIL,
  SEARCH_SINGLE_USER_SUCCESS,
  SEARCH_SINGLE_USER_FAIL,
  RESET_LOADING
} from 'actions/users/userTypes';

const initialState = {
  users: [],
  usersLoading: true,
  user: {},
  userLoading: true,
  error: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        usersLoading: false,
        error: ''
      };
    case SEARCH_USERS_FAIL:
      return {
        ...state,
        users: [],
        usersLoading: false,
        error: payload
      };
    case SEARCH_SINGLE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        userLoading: false,
        error: ''
      };
    case SEARCH_SINGLE_USER_FAIL:
      return {
        ...state,
        user: {},
        userLoading: false,
        error: payload
      };
    case RESET_LOADING:
      return {
        ...state,
        userLoading: true,
        usersLoading: true
      };
    default:
      return state;
  }
}
