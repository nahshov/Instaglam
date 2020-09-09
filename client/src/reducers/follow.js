import {
  SET_FOLLOWS,
  SET_FOLLOWS_LOADING,
  TOGGLE_FOLLOWS,
  RESET_FOLLOWS
} from 'actions/follows/followTypes';

const initialState = {
  follows: [],
  followsLoading: true,
  error: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FOLLOWS:
      return {
        ...state,
        followsLoading: false,
        follows: payload
      };
    case SET_FOLLOWS_LOADING:
      return {
        ...state,
        followsLoading: payload
      };
    case TOGGLE_FOLLOWS:
      return {
        ...state,
        followsLoading: false,
        follows: state.follows.map(f => {
          if (payload.userId === f._id) {
            return { ...f, isFollowed: payload.isFollowed };
          }
          return f;
        })
      };
    case RESET_FOLLOWS:
      return {
        follows: [],
        followsLoading: true,
        error: ''
      };
    default:
      return state;
  }
}
