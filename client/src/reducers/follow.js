import {
  SET_FOLLOWERS,
  SET_FOLLOWING,
  RESET_FOLLOWERS_LOADING,
  RESET_FOLLOWING_LOADING,
  FOLLOWERS_ERROR, FOLLOWING_ERROR
} from 'actions/follows/followTypes';

const initialState = {
  followersLoading: true,
  followers: [],
  followingLoading: true,
  following: [],
  error: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FOLLOWERS:
      return {
        ...state,
        followersLoading: false,
        followers: payload
      };
    case RESET_FOLLOWERS_LOADING:
      return {
        ...state,
        error: 'Error loading followers',
        followers: []
      };
    case FOLLOWERS_ERROR:
      return {
        ...state,
        error: 'Error loading following',
        followers: []
      };
    case SET_FOLLOWING:
      return {
        ...state,
        followingLoading: false,
        following: payload
      };
    case RESET_FOLLOWING_LOADING:
      return {
        ...state,
        followersLoading: true
      };
    case FOLLOWING_ERROR:
      return {
        ...state,
        followingLoading: false,
        following: []
      };
    default:
      return state;
  }
}
