import {
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAIL,
  RESET_USERS_LOADING,
  RESET_USERS
} from '../actions/search/searchTypes';

const initialState = {
  users: [],
  usersLoading: true,
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
    case RESET_USERS_LOADING:
      return {
        ...state,
        usersLoading: true
      };
    case RESET_USERS: {
      return {
        users: [],
        usersLoading: true
      };
    }
    default:
      return state;
  }
}
