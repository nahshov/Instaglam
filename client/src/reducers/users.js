import {
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAIL,
  SEARCH_SINGLE_USER_SUCCESS,
  SEARCH_SINGLE_USER_FAIL,
  RESET_LOADING_USER_LOADING,
  RESET_LOADING_USERS_LOADING, TOGGLE_FOLLOW,
  RESET_USERS
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
    case TOGGLE_FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          numOfFollowers: state.user.numOfFollowers + payload.numOfFollowers,
          isFollowed: payload.isFollowed
        }
      };
    case RESET_LOADING_USER_LOADING:
      return {
        ...state,
        userLoading: true
      };
    case RESET_LOADING_USERS_LOADING:
      return {
        ...state,
        usersLoading: true
      };
    case RESET_USERS:
      return {
        users: [],
        usersLoading: true,
        user: {},
        userLoading: true,
        error: ''
      };
    default:
      return state;
  }
}
