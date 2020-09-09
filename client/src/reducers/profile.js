import {
  SET_PROFILE,
  SET_EMPTY_PROFILE,
  TOGGLE_PROFILE_FOLLOWERS_COUNT,
  RESET_PROFILE_LOADING,
  RESET_PROFILE,
  SET_PROFILE_FOLLOWING_COUNT
} from '../actions/profile/profileTypes';

const initialState = {
  profile: {},
  profileLoading: true,
  error: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: payload,
        profileLoading: false,
        error: ''
      };
    case SET_EMPTY_PROFILE:
      return {
        ...state,
        profile: {},
        profileLoading: false,
        error: payload
      };
    case TOGGLE_PROFILE_FOLLOWERS_COUNT:
      return {
        ...state,
        profile: {
          ...state.profile,
          numOfFollowers: state.profile.numOfFollowers + payload.numOfFollowers
        }
      };
    case SET_PROFILE_FOLLOWING_COUNT:
      return {
        ...state,
        profile: {
          ...state.profile,
          numOfFollowing: state.profile.numOfFollowing + payload.numOfFollowing
        }
      };
    case RESET_PROFILE_LOADING:
      return {
        ...state,
        profileLoading: true
      };
    case RESET_PROFILE:
      return {
        profile: {},
        profileLoading: true,
        error: ''
      };
    default:
      return state;
  }
}
