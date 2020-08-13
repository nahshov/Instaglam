import {
  SET_FOLLOWERS,
  SET_FOLLOWING,
  RESET_FOLLOWERS_LOADING,
  RESET_FOLLOWING_LOADING,
  FOLLOWERS_ERROR,
  FOLLOWING_ERROR,
  RESET_FOLLOWS,
  TOGGLE_FOLLOWERS,
  TOGGLE_FOLLOWING,
  SET_LIKERS,
  TOGGLE_LIKERS_FOLLOW
} from 'actions/follows/followTypes';

const initialState = {
  followersLoading: true,
  followers: [],
  followingLoading: true,
  following: [],
  likers: [],
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
    case SET_LIKERS:
      return {
        ...state,
        followersLoading: false,
        likers: payload
      };
    case SET_FOLLOWING:
      return {
        ...state,
        followingLoading: false,
        following: payload
      };
    case TOGGLE_FOLLOWERS:
      return {
        ...state,
        followersLoading: false,
        followers: state.followers.map(f => {
          if (payload.userId === f._id) {
            return { ...f, isFollowed: payload.isFollowed };
          }
          return f;
        })
      };
    case TOGGLE_FOLLOWING:
      return {
        ...state,
        followingLoading: false,
        following: state.following.map(f => {
          if (payload.userId === f._id) {
            return { ...f, isFollowed: payload.isFollowed };
          }
          return f;
        })
      };
    case TOGGLE_LIKERS_FOLLOW:
      return {
        ...state,
        followingLoading: false,
        likers: state.likers.map(l => {
          if (payload.userId === l._id) {
            return { ...l, isFollowed: payload.isFollowed };
          }
          return l;
        })
      };
    case RESET_FOLLOWERS_LOADING:
      return {
        ...state,
        followersLoading: true
      };
    case RESET_FOLLOWING_LOADING:
      return {
        ...state,
        followersLoading: true
      };
    case RESET_FOLLOWS:
      return {
        followersLoading: true,
        followers: [],
        followingLoading: true,
        following: [],
        error: ''
      };
    case FOLLOWERS_ERROR:
      return {
        ...state,
        error: 'Error loading following',
        followers: []
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
